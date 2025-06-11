import { useState } from "react";
import {
       Button,
       Card,
       Modal,
       Table,
       InputNumber,
       Space,
       Typography,
       Input,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";
import { IconButton, Iconify } from "@/components/icon";
import productService, { Product } from "@/api/services/productService";
import statsService from "@/api/services/statsService";
import { useCartItems, useCartActions, CartItem } from "@/store/cartStore";
import { toast } from "sonner";

const VARIANTS = ["M", "S", "XS", "XS offerte"] as const;
const PRICE_MAP: Record<string, number> = {
       M: 80,
       S: 38,
       XS: 14,
       "XS offerte": 0,
};

const LOCAL_PRODUCTS: Product[] = [
       { id_produit: 0, modele: "Dressrossa" },
];

export default function CaissePage() {
        const { data: products } = useQuery({
                queryKey: ["products"],
                queryFn: productService.getProducts,
        });

       const productList = Array.isArray(products) && products.length > 0 ? products : LOCAL_PRODUCTS;

        const { data: lastSales } = useQuery<any[]>({
                queryKey: ["lastSales"],
                queryFn: () => statsService.getLast20Sales() as Promise<any[]>,
        });

        const salesList = Array.isArray(lastSales) ? lastSales : [];

        const items = useCartItems();
        const { addItem, clear, updateQuantity } = useCartActions();
        const [modalOpen, setModalOpen] = useState(false);
        const [search, setSearch] = useState("");
        const [amountModal, setAmountModal] = useState(false);
        const [discountModal, setDiscountModal] = useState(false);
        const [amountValue, setAmountValue] = useState(0);
        const [discountValue, setDiscountValue] = useState(1);

	const columns: ColumnsType<CartItem> = [
		{ title: "Article", dataIndex: "name" },
		{
			title: "Qté",
			dataIndex: "quantity",
			width: 80,
			render: (q, _, index) => (
				<InputNumber min={1} value={q} onChange={(v) => updateQuantity(index as number, Number(v))} />
			),
		},
		{ title: "Prix", dataIndex: "unitPrice", width: 100, render: (p) => `${p}€` },
		{
			title: "Total",
			dataIndex: "unitPrice",
			width: 100,
			render: (p, r) => `${r.quantity * r.unitPrice}€`,
		},
	];

        const onAddItem = (product: Product, variant: string) => {
                addItem({
                        idProduit: product.id_produit,
                        name: `${product.modele} - ${variant}`,
                        variante: variant,
                        unitPrice: PRICE_MAP[variant],
                        quantity: 1,
                });
                setModalOpen(false);
        };

       const onAddAmount = () => {
               if (amountValue > 0) {
                       addItem({
                               idProduit: -1,
                               name: "Montant libre",
                               variante: "",
                               unitPrice: amountValue,
                               quantity: 1,
                       });
               }
               setAmountModal(false);
               setAmountValue(0);
       };

       const onAddDiscount = () => {
               if (discountValue > 0) {
                       addItem({
                               idProduit: -2,
                               name: "Réduction",
                               variante: "",
                               unitPrice: -discountValue,
                               quantity: 1,
                       });
               }
               setDiscountModal(false);
               setDiscountValue(1);
       };

	const total = items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);

	return (
		<Space direction="vertical" size="middle" className="w-full">
                        <Card>
                                {items.length === 0 ? (
                                        <div className="text-center py-10">Ajouter un article ou un montant</div>
                                ) : (
                                        <Table rowKey="name" pagination={false} columns={columns} dataSource={items} />
                                )}
                        </Card>
                       <Card className="flex flex-col gap-4">
                               <Space wrap>
                                       <Button type="primary" onClick={() => setModalOpen(true)}>+ Article</Button>
                                       <Button onClick={() => setAmountModal(true)}>+ Montant</Button>
                                       <Button onClick={() => setDiscountModal(true)}>Réduction</Button>
                               </Space>
                               <Button
                                       type="primary"
                                       block
                                       disabled={items.length === 0}
                                       onClick={() => toast.success("Facturation en cours...")}
                               >
                                       Facturer ({total}€)
                               </Button>
                       </Card>
                        <Modal open={modalOpen} onCancel={() => setModalOpen(false)} footer={null} title="Articles">
                                <Space direction="vertical" className="w-full">
                                        <Input placeholder="Rechercher" value={search} onChange={(e) => setSearch(e.target.value)} />
                                        {productList
                                                .filter((p) =>
                                                        p.modele
                                                                .toLowerCase()
                                                                .includes(search.toLowerCase()),
                                                )
                                                .map((p) => (
                                                <Card key={p.id_produit} className="w-full">
                                                        <Typography.Text>{p.modele}</Typography.Text>
                                                        <div className="mt-2 flex gap-2 flex-wrap">
                                                                {VARIANTS.map((v) => (
                                                                        <Button key={v} onClick={() => onAddItem(p, v)}>
                                                                                {v} ({PRICE_MAP[v]}€)
                                                                        </Button>
                                                                ))}
                                                        </div>
                                                </Card>
                                        ))}
                                </Space>
                        </Modal>
                        <Modal open={amountModal} onOk={onAddAmount} onCancel={() => setAmountModal(false)} okText="Ajouter" cancelText="Annuler" title="Montant libre">
                                <InputNumber autoFocus className="w-full" min={0} value={amountValue} onChange={(v) => setAmountValue(Number(v))} />
                        </Modal>
                        <Modal open={discountModal} onOk={onAddDiscount} onCancel={() => setDiscountModal(false)} okText="Ajouter" cancelText="Annuler" title="Réduction">
                                <Space className="w-full" direction="vertical">
                                        <div className="flex gap-2">
                                                {[1, 2, 5].map((d) => (
                                                        <Button key={d} onClick={() => setDiscountValue(d)}>{d}€</Button>
                                                ))}
                                        </div>
                                        <InputNumber className="w-full" min={0} value={discountValue} onChange={(v) => setDiscountValue(Number(v))} />
                                </Space>
                        </Modal>
                        {salesList.length > 0 && (
                                <Card>
                                        <Typography.Title level={5}>Dernières ventes</Typography.Title>
                                        <Table
                                                size="small"
                                                pagination={false}
                                                rowKey="id_panier"
                                                dataSource={salesList.slice(0, 10)}
                                                columns={[
                                                        { title: "Date", dataIndex: "dateAjout" },
                                                        {
                                                                title: "Total",
                                                                dataIndex: "prix_panier",
                                                                render: (v: number) => `${v}€`,
                                                        },
                                                        { title: "Paiement", dataIndex: "mode_paiement" },
                                                ]}
                                        />
                                </Card>
                        )}
                </Space>
        );
}
