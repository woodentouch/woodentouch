import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";
import type { License, Model } from "@/_mock/stock";

export interface ModelModalProps {
        licenses: License[];
        formValue: Partial<Model> & { licenseId?: string; newSize?: string };
        title: string;
        show: boolean;
        isEdit?: boolean;
        onOk: (data: Partial<Model> & { licenseId?: string; newSize?: string }) => void;
        onCancel: VoidFunction;
}

export default function ModelModal({
        licenses,
        formValue,
        title,
        show,
        isEdit,
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
                                {!isEdit && (
                                        <>
                                                <Form.Item label="Quantité">
                                                        <div className="flex items-center gap-2">
                                                                <Button
                                                                        size="small"
                                                                        onClick={() => {
                                                                                const v = form.getFieldValue("quantity") || 0;
                                                                                form.setFieldsValue({ quantity: Math.max(0, v - 1) });
                                                                        }}
                                                                >
                                                                        -
                                                                </Button>
                                                                <Form.Item name="quantity" noStyle rules={[{ required: true }]}>
                                                                        <InputNumber style={{ flex: 1 }} min={0} />
                                                                </Form.Item>
                                                                <Button
                                                                        size="small"
                                                                        onClick={() => {
                                                                                const v = form.getFieldValue("quantity") || 0;
                                                                                form.setFieldsValue({ quantity: v + 1 });
                                                                        }}
                                                                >
                                                                        +
                                                                </Button>
                                                        </div>
                                                        {formValue.quantity !== undefined && (
                                                                <div className="text-xs text-gray-500 mt-1">
                                                                        Stock précédent : {formValue.quantity}
                                                                </div>
                                                        )}
                                                </Form.Item>
                                                <Form.Item name="minStock" label="Stock minimum" rules={[{ required: true }]}>
                                                        <InputNumber style={{ width: "100%" }} min={0} />
                                                </Form.Item>
                                        </>
                                )}
                                {isEdit && (
                                        <Form.Item name="newSize" label="Nouvelle taille">
                                                <Input placeholder="Ex: XL" />
                                        </Form.Item>
                                )}
                        </Form>
                </Modal>
        );
}
