import { Form, Input, InputNumber, Modal } from "antd";
import { useEffect } from "react";
import type { Product } from "@/api/services/productService";

export interface VariantModalProps {
    formValue: Partial<Product>;
    title: string;
    show: boolean;
    onOk: (data: Partial<Product>) => void;
    onCancel: VoidFunction;
}

export default function VariantModal({ formValue, title, show, onOk, onCancel }: VariantModalProps) {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(formValue);
    }, [formValue, form]);

    const handleOk = async () => {
        const values = await form.validateFields();
        const { quantity, stockMinimum } = values;
        onOk({ quantity, stockMinimum });
    };

    return (
        <Modal forceRender title={title} open={show} onOk={handleOk} onCancel={onCancel}>
            <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} initialValues={formValue}>
                <Form.Item name="size" label="Taille">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="quantity" label="Quantité" rules={[{ required: true }]}>
                    <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="stockMinimum" label="Stock minimum" rules={[{ required: true }]}>
                    <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="value" label="Valeur">
                    <InputNumber disabled style={{ width: "100%" }} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
