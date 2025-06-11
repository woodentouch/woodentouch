import { useState } from "react";
import {
	Button,
	Card,
	Dropdown,
	Menu,
	Popconfirm,
	Tag,
	InputNumber,
	Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";

import { IconButton, Iconify } from "@/components/icon";
import { type License, type Model, STOCK_DATA } from "@/_mock/stock";
import ModelModal, { type ModelModalProps } from "./model-modal";
import LicenseModal, { type LicenseModalProps } from "./license-modal";

interface ModelRow extends Model {
	licenseId: string;
}

export default function StockPage() {
	const [licenses, setLicenses] = useState<License[]>(STOCK_DATA);
	const [modelModalProps, setModelModalProps] = useState<ModelModalProps>({
		licenses,
		formValue: {},
		title: "New Model",
		show: false,
		onOk: (data) => {
			const { licenseId, ...rest } = data;
			if (!licenseId) return;
			setLicenses((prev) =>
				prev.map((l) =>
					l.id === licenseId
						? {
								...l,
								models: [
									...l.models,
									{ id: Date.now().toString(), ...rest } as Model,
								],
							}
						: l,
				),
			);
			setModelModalProps((p) => ({ ...p, show: false }));
		},
		onCancel: () => setModelModalProps((p) => ({ ...p, show: false })),
	});
	const [licenseModalProps, setLicenseModalProps] = useState<LicenseModalProps>(
		{
			formValue: {},
			title: "New Licence",
			show: false,
			onOk: (data) => {
				setLicenses((prev) => [
					...prev,
					{ id: Date.now().toString(), name: data.name ?? "", models: [] },
				]);
				setLicenseModalProps((p) => ({ ...p, show: false }));
			},
			onCancel: () => setLicenseModalProps((p) => ({ ...p, show: false })),
		},
	);

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
					setModelModalProps((p) => ({ ...p, show: true }));
				}
			}}
		/>
	);


	const deleteModel = (licenseId: string, modelId: string) => {
		setLicenses((prev) =>
			prev.map((l) =>
				l.id === licenseId
					? { ...l, models: l.models.filter((m) => m.id !== modelId) }
					: l,
			),
		);
	};

	const updateModel = (
		licenseId: string,
		modelId: string,
		data: Partial<Model>,
	) => {
		setLicenses((prev) =>
			prev.map((l) =>
				l.id === licenseId
					? {
							...l,
							models: l.models.map((m) =>
								m.id === modelId ? { ...m, ...data } : m,
							),
						}
					: l,
			),
		);
	};

        const modelColumns: ColumnsType<ModelRow> = [
                {
                        title: "Name",
                        dataIndex: "name",
                },
                {
                        title: "Quantité",
                        dataIndex: "quantity",
                },
                {
                        title: "Stock Minimum",
                        dataIndex: "minStock",
			render: (min, record) => (
				<InputNumber
					min={0}
					value={min}
					onChange={(v) =>
						updateModel(record.licenseId, record.id, { minStock: Number(v) })
					}
				/>
			),
		},
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
								title: "Edit",
								formValue: { ...record, licenseId: record.licenseId },
								onOk: (data) => {
									updateModel(record.licenseId, record.id, {
										name: data.name ?? record.name,
										quantity: data.quantity ?? record.quantity,
										minStock: data.minStock ?? record.minStock,
									});
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
							<Iconify
								icon="mingcute:delete-2-fill"
								size={18}
								className="text-error"
							/>
						</IconButton>
					</Popconfirm>
				</div>
			),
		},
	];

	const licenseColumns: ColumnsType<License> = [
		{
			title: "Licence",
			dataIndex: "name",
			render: (name) => <Tag color="processing">{name}</Tag>,
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
					expandedRowRender: (record) => {
						const data: ModelRow[] = record.models.map((m) => ({
							...m,
							licenseId: record.id,
						}));
						return (
							<Table
								rowKey="id"
								columns={modelColumns}
								dataSource={data}
								pagination={false}
							/>
						);
					},
				}}
				dataSource={licenses}
				pagination={false}
			/>
			<ModelModal {...modelModalProps} licenses={licenses} />
			<LicenseModal {...licenseModalProps} />
		</Card>
	);
}
