import { useState } from "react";
import { Button, Card, Modal, Table, InputNumber, Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";
import { IconButton, Iconify } from "@/components/icon";
import productService, { Product } from "@/api/services/productService";
import { useCartItems, useCartActions, CartItem } from "@/store/cartStore";
import { toast } from "sonner";

const VARIANTS = ["M", "S", "XS", "XS offerte"] as const;
const PRICE_MAP: Record<string, number> = {
	M: 80,
	S: 35,
	XS: 25,
	"XS offerte": 0,
};

export default function CaissePage() {
	const { data: products } = useQuery({
		queryKey: ["products"],
		queryFn: productService.getProducts,
	});

	const items = useCartItems();
	const { addItem, clear, updateQuantity } = useCartActions();
	const [modalOpen, setModalOpen] = useState(false);

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

	const total = items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);

	return (
		<Space direction="vertical" size="middle" className="w-full">
			<Card className="border-b flex justify-between">
				<IconButton onClick={() => history.back()}>
					<Iconify icon="mdi:close" />
				</IconButton>
				<div className="flex gap-2">
					<IconButton>
						<Iconify icon="mdi:tag-outline" />
					</IconButton>
					<IconButton onClick={clear}>
						<Iconify icon="mdi:trash-can-outline" />
					</IconButton>
					<IconButton>
						<Iconify icon="mdi:dots-horizontal" />
					</IconButton>
				</div>
			</Card>
			<Card>
				{items.length === 0 ? (
					<div className="text-center py-10">Ajouter un article ou un montant</div>
				) : (
					<Table rowKey="name" pagination={false} columns={columns} dataSource={items} />
				)}
			</Card>
			<Card className="flex justify-between items-center">
				<div>
					<Button type="primary" onClick={() => setModalOpen(true)}>
						+ Article
					</Button>
				</div>
				<Button type="primary" disabled={items.length === 0} onClick={() => toast.success("Facturation en cours...")}>
					Facturer ({total}€)
				</Button>
			</Card>
			<Modal open={modalOpen} onCancel={() => setModalOpen(false)} footer={null} title="Articles">
				<Space direction="vertical" className="w-full">
					{products?.map((p) => (
						<Card key={p.id_produit} className="w-full">
							<Typography.Text>{p.modele}</Typography.Text>
							<div className="mt-2 flex gap-2 flex-wrap">
								{VARIANTS.map((v) => (
									<Button key={v} onClick={() => onAddItem(p, v)}>
										{v}
									</Button>
								))}
							</div>
						</Card>
					))}
				</Space>
			</Modal>
		</Space>
	);
}
