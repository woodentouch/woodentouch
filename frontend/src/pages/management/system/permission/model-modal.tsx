import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";
import type { License, Model } from "@/_mock/stock";

export interface ModelModalProps {
	licenses: License[];
	formValue: Partial<Model> & { licenseId?: string };
	title: string;
	show: boolean;
	onOk: (data: Partial<Model> & { licenseId?: string }) => void;
	onCancel: VoidFunction;
}

export default function ModelModal({
	licenses,
	formValue,
	title,
	show,
	onOk,
	onCancel,
}: ModelModalProps) {
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(formValue);
	}, [formValue, form]);

	const handleOk = async () => {
		const values = await form.validateFields();
		onOk(values);
	};

	return (
		<Modal
			forceRender
			title={title}
			open={show}
			onOk={handleOk}
			onCancel={onCancel}
		>
			<Form
				form={form}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 14 }}
				initialValues={formValue}
			>
				<Form.Item
					name="licenseId"
					label="Licence"
					rules={[{ required: true }]}
				>
					<Select
						options={licenses.map((l) => ({ label: l.name, value: l.id }))}
					/>
				</Form.Item>
				<Form.Item name="name" label="Nom" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item
					name="quantity"
					label="Quantité"
					rules={[{ required: true }]}
				>
					<InputNumber style={{ width: "100%" }} min={0} />
				</Form.Item>
				<Form.Item
					name="minStock"
					label="Stock minimum"
					rules={[{ required: true }]}
				>
					<InputNumber style={{ width: "100%" }} min={0} />
				</Form.Item>
			</Form>
		</Modal>
	);
}
