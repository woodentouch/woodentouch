import { useState, useEffect } from "react";
import { Button, Card, Dropdown, Menu, Popconfirm, Tag, Table, Collapse } from "antd";
import type { ColumnsType } from "antd/es/table";

import { IconButton, Iconify } from "@/components/icon";
import type { License, Model } from "@/_mock/stock";
import type { Product } from "@/api/services/productService";
import licenseService from "@/api/services/licenseService";
import productService from "@/api/services/productService";
import ModelModal, { type ModelModalProps } from "./model-modal";
import LicenseModal, { type LicenseModalProps } from "./license-modal";
import VariantModal, { type VariantModalProps } from "./variant-modal";

interface ModelRow extends Model {
        licenseId: string;
        variants: Variant[];
        value: number;
}

interface Variant extends Product {
        licenseId: string;
        modelId: string;
}

export default function StockPage() {
        const [licenses, setLicenses] = useState<License[]>([]);
        const [expandedLicenses, setExpandedLicenses] = useState<string[]>([]);

        const fetchLicenses = async () => {
                try {
                        const data = await licenseService.getLicenses();
                        setLicenses(
                                data.map((l) => ({
                                        id: String(l.id),
                                        name: l.name,
                                        models: [],
                                })),
                        );
                } catch {
                        alert("Failed to load licenses");
                }
        };

       const loadProducts = async (licenseId?: string) => {
               try {
                       const products = await productService.getProducts(
                               licenseId ? Number(licenseId) : undefined,
                       );
                       const grouped = new Map<string, ModelRow>();
                       products.forEach((p) => {
                                const key = p.model;
                                let model = grouped.get(key);
                                if (!model) {
                                model = {
                                        id: String(p.id),
                                        name: p.model,
                                        quantity: 0,
                                        minStock: p.stockMinimum,
                                        licenseId: String(p.licenseId),
                                        variants: [],
                                        value: 0,
                                };
                                grouped.set(key, model);
                        }
                        model.quantity += p.quantity;
                        model.value += p.value;
                        model.variants.push({
                                ...p,
                                licenseId: String(p.licenseId),
                                modelId: model.id,
                        });
                });
                setLicenses((prev) =>
                        prev.map((l) =>
                                l.id === licenseId
                                                ? { ...l, models: Array.from(grouped.values()) }
                                                : l,
                                ),
                        );
                } catch (e) {
                        alert("Failed to load products");
                }
       };

	// biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
	useEffect(() => {
		fetchLicenses();
	}, []);
        const [modelModalProps, setModelModalProps] = useState<ModelModalProps>({
                licenses,
                formValue: {},
                title: "New Model",
                show: false,
                isEdit: false,
                onOk: async (data) => {
			const { licenseId, name, quantity, minStock } = data;
			if (!licenseId) return;
			try {
				await productService.addProduct({
					licenseId: Number(licenseId),
					model: name ?? "",
					quantity: quantity ?? 0,
					stockMinimum: minStock ?? 0,
				});
				await loadProducts(licenseId);
				setModelModalProps((p) => ({ ...p, show: false }));
			} catch (e) {
				alert("Failed to add product");
			}
		},
		onCancel: () => setModelModalProps((p) => ({ ...p, show: false })),
	});
        const [licenseModalProps, setLicenseModalProps] = useState<LicenseModalProps>({
                formValue: {},
                title: "New Licence",
                show: false,
                onOk: async (data) => {
                        try {
                                await licenseService.addLicense(data.name ?? "");
                                await fetchLicenses();
                                setLicenseModalProps((p) => ({ ...p, show: false }));
                        } catch (e) {
                                alert("Failed to add license");
                        }
                },
                onCancel: () => setLicenseModalProps((p) => ({ ...p, show: false })),
        });

        const [variantModalProps, setVariantModalProps] = useState<VariantModalProps>({
                formValue: {},
                title: "Edit Variant",
                show: false,
                onOk: () => {},
                onCancel: () => setVariantModalProps((p) => ({ ...p, show: false })),
        });

	const openNewMenu = (
		<Menu
			items={[
				{ key: "lic", label: "Créer une nouvelle licence" },
                                { key: "model", label: "Ajouter un modèle" },
			]}
			onClick={(info) => {
                                if (info.key === "lic") {
                                        setLicenseModalProps((p) => ({ ...p, show: true }));
                                } else {
                                        setModelModalProps((p) => ({ ...p, show: true, licenses, isEdit: false, formValue: {} }));
                                }
			}}
		/>
	);

        const deleteModel = (licenseId: string, modelId: string) => {
                setLicenses((prev) =>
                        prev.map((l) => (l.id === licenseId ? { ...l, models: l.models.filter((m) => m.id !== modelId) } : l)),
                );
        };

        const updateModel = (
                licenseId: string,
                modelId: string,
                data: Partial<Model> & { licenseId?: string },
        ) => {
                setLicenses((prev) => {
                        let moved: Model | null = null;
                        const updated = prev.map((l) => {
                                if (l.id !== licenseId) return l;
                                const models = l.models.map((m) => {
                                        if (m.id !== modelId) return m;
                                        const next = { ...m, ...data };
                                        moved = next;
                                        return next;
                                });
                                return { ...l, models };
                        });

                        if (data.licenseId && data.licenseId !== licenseId && moved) {
                                return updated.map((l) =>
                                        l.id === data.licenseId
                                                ? { ...l, models: [...l.models, { ...moved, licenseId: data.licenseId }] }
                                                : l.id === licenseId
                                                  ? { ...l, models: l.models.filter((m) => m.id !== modelId) }
                                                  : l,
                                );
                        }
                        return updated;
                });
        };

        const updateLicense = (licenseId: string, name: string) => {
                setLicenses((prev) => prev.map((l) => (l.id === licenseId ? { ...l, name } : l)));
        };

        const updateVariant = (
                licenseId: string,
                modelId: string,
                size: string,
                data: Partial<Product>,
        ) => {
                setLicenses((prev) =>
                        prev.map((l) => {
                                if (l.id !== licenseId) return l;
                                const models = l.models.map((m) => {
                                        if (m.id !== modelId) return m;
                                        let found = false;
                                        const variants = m.variants.map((v) => {
                                                if (v.size === size) {
                                                        found = true;
                                                        return { ...v, ...data };
                                                }
                                                return v;
                                        });
                                        if (!found) {
                                                variants.push({
                                                        id: Date.now(),
                                                        model: m.name,
                                                        size,
                                                        quantity: data.quantity ?? 0,
                                                        stockMinimum: data.stockMinimum ?? 0,
                                                        value: data.value ?? 0,
                                                        licenseId: Number(licenseId),
                                                        modelId: m.id,
                                                } as Variant);
                                        }
                                        const quantity = variants.reduce((sum, v) => sum + (v.quantity || 0), 0);
                                        const value = variants.reduce((sum, v) => sum + (v.value || 0), 0);
                                        return { ...m, variants, quantity, value };
                                });
                                return { ...l, models };
                        }),
                );
        };

        const modelColumns: ColumnsType<ModelRow> = [
                {
                        title: "Modèle",
                        dataIndex: "name",
                        render: (name: string, record) => {
                                const val = typeof record.value === "number" ? record.value : 0;
                                return `${name} (${val.toFixed(2)}€)`;
                        },
                },
                { title: "Stock Minimum", dataIndex: "minStock" },
                {
                        title: "Status",
                        dataIndex: "quantity",
                        render: (_, record) => {
                                let color = "success";
				let text = "Satisfaisant";
				if (record.quantity === 0) {
					color = "error";
					text = "Stock zéro";
				} else if (record.quantity < record.minStock) {
					color = "warning";
					text = "Graveur nécessaire";
				}
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: "Action",
			key: "action",
			align: "center",
			render: (_, record) => (
				<div className="flex justify-end text-gray">
					<IconButton
						onClick={() =>
                                                        setModelModalProps({
                                                                ...modelModalProps,
                                                                licenses,
                                                                show: true,
                                                                isEdit: true,
                                                                title: "Edit",
                                                                formValue: { ...record, licenseId: record.licenseId },
                                                                onOk: (data) => {
                                                                        updateModel(record.licenseId, record.id, {
                                                                                name: data.name ?? record.name,
                                                                                licenseId: data.licenseId ?? record.licenseId,
                                                                        });
                                                                        if (data.newSize) {
                                                                                updateVariant(record.licenseId, record.id, data.newSize, {} as Product);
                                                                        }
                                                                        setModelModalProps((p) => ({ ...p, show: false }));
                                                                },
                                                        })
                                                }
                                        >
						<Iconify icon="solar:pen-bold-duotone" size={18} />
					</IconButton>
					<Popconfirm
						title="Supprimer"
						okText="Yes"
						cancelText="No"
						onConfirm={() => deleteModel(record.licenseId, record.id)}
					>
						<IconButton>
							<Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
						</IconButton>
					</Popconfirm>
				</div>
			),
                },
        ];

        const variantColumns: ColumnsType<Variant> = [
                {
                        title: "Taille",
                        dataIndex: "size",
                },
                { title: "Quantité", dataIndex: "quantity" },
                { title: "Stock Minimum", dataIndex: "stockMinimum" },
                {
                        title: "Status",
                        dataIndex: "quantity",
                        render: (_, record) => {
                                let color = "success";
                                let text = "Satisfaisant";
                                if (record.quantity === 0) {
                                        color = "error";
                                        text = "Stock zéro";
                                } else if (record.quantity < record.stockMinimum) {
                                        color = "warning";
                                        text = "Graveur nécessaire";
                                }
                                return <Tag color={color}>{text}</Tag>;
                        },
                },
                {
                        title: "Valeur",
                        dataIndex: "value",
                        render: (v: number = 0) => `${v.toFixed(2)}€`,
                },
                {
                        title: "Action",
                        key: "action",
                        align: "center",
                        render: (_, record) => (
                                <IconButton
                                        onClick={() =>
                                                setVariantModalProps({
                                                        ...variantModalProps,
                                                        show: true,
                                                        title: "Edit Variant",
                                                        formValue: record,
                                                        onOk: (data) => {
                                                                updateVariant(
                                                                        record.licenseId!,
                                                                        record.modelId!,
                                                                        record.size,
                                                                        data,
                                                                );
                                                                setVariantModalProps((p) => ({ ...p, show: false }));
                                                        },
                                                })
                                        }
                                >
                                        <Iconify icon="solar:pen-bold-duotone" size={18} />
                                </IconButton>
                        ),
                },
        ];

        const licenseColumns: ColumnsType<License> = [
                {
                        title: "Licence",
                        dataIndex: "name",
                        render: (_, record) => (
                                <div className="flex items-center gap-2">
                                        <Tag color="processing">{record.name}</Tag>
                                        <IconButton
                                                onClick={() =>
                                                        setLicenseModalProps({
                                                                ...licenseModalProps,
                                                                show: true,
                                                                title: "Edit Licence",
                                                                formValue: { ...record },
                                                                onOk: (data) => {
                                                                        updateLicense(record.id, data.name ?? record.name);
                                                                        setLicenseModalProps((p) => ({ ...p, show: false }));
                                                                },
                                                        })
                                                }
                                        >
                                                <Iconify icon="solar:pen-bold-duotone" size={18} />
                                        </IconButton>
                                </div>
                        ),
                },
        ];

	return (
		<Card
			title="Stock"
			extra={
				<Dropdown overlay={openNewMenu} trigger={["click"]}>
					<Button type="primary">New</Button>
				</Dropdown>
			}
		>
			<Table
				rowKey="id"
				columns={licenseColumns}
                                expandable={{
                                        expandedRowKeys: expandedLicenses,
                                        onExpand: (exp, record) => {
                                                setExpandedLicenses((keys) =>
                                                        exp
                                                                ? Array.from(new Set([...keys, record.id]))
                                                                : keys.filter((k) => k !== record.id),
                                                );
                                                if (exp) loadProducts(record.id);
                                        },
                                        expandedRowRender: (record) => {
                                                const panels = record.models.map((m) => {
                                                        const val = typeof m.value === "number" ? m.value : 0;
                                                        let color: "success" | "warning" | "error" = "success";
                                                        let text = "Satisfaisant";
                                                        if (m.quantity === 0) {
                                                                color = "error";
                                                                text = "Stock zéro";
                                                        } else if (m.quantity < m.minStock) {
                                                                color = "warning";
                                                                text = "Graveur nécessaire";
                                                        }
                                                        const header = (
                                                                <div className="flex items-center justify-between">
                                                                        <Tag color="processing">{`${m.name} (${val.toFixed(2)}€)`}</Tag>
                                                                        <div className="flex items-center gap-2">
                                                                                <Tag color={color}>{text}</Tag>
                                                                                <IconButton
                                                                                        onClick={() =>
                                                        setModelModalProps({
                                                                ...modelModalProps,
                                                                licenses,
                                                                show: true,
                                                                isEdit: true,
                                                                title: "Edit",
                                                                formValue: { ...m, licenseId: record.id },
                                                                onOk: (data) => {
                                                                        updateModel(record.id, m.id, {
                                                                                name: data.name ?? m.name,
                                                                                licenseId: data.licenseId ?? record.id,
                                                                        });
                                                                        if (data.newSize) {
                                                                                updateVariant(record.id, m.id, data.newSize, {} as Product);
                                                                        }
                                                                        setModelModalProps((p) => ({ ...p, show: false }));
                                                                },
                                                        })
                                                }
                                        >
                                                                                        <Iconify icon="solar:pen-bold-duotone" size={18} />
                                                                                </IconButton>
                                                                                <Popconfirm
                                                                                        title="Supprimer"
                                                                                        okText="Yes"
                                                                                        cancelText="No"
                                                                                        onConfirm={() => deleteModel(record.id, m.id)}
                                                                                >
                                                                                        <IconButton>
                                                                                                <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
                                                                                        </IconButton>
                                                                                </Popconfirm>
                                                                        </div>
                                                                </div>
                                                        );
                                                        return {
                                                                key: m.id,
                                                                label: header,
                                                                children: (
                                                                        <Table
                                                                                rowKey="size"
                                                                                columns={variantColumns}
                                                                                dataSource={m.variants}
                                                                                pagination={false}
                                                                        />
                                                                ),
                                                        };
                                                });
                                                return <Collapse items={panels} />;
                                        },
                                }}
                                dataSource={licenses}
                                pagination={false}
                        />
                        <ModelModal {...modelModalProps} licenses={licenses} />
                        <LicenseModal {...licenseModalProps} />
                        <VariantModal {...variantModalProps} />
                </Card>
        );
}
