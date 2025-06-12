import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import type { License } from "@/_mock/stock";

export interface LicenseModalProps {
	formValue: Partial<License>;
	title: string;
	show: boolean;
	onOk: (data: Partial<License>) => void;
	onCancel: VoidFunction;
}

export default function LicenseModal({
	formValue,
	title,
	show,
	onOk,
	onCancel,
}: LicenseModalProps) {
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
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
				initialValues={formValue}
			>
				<Form.Item name="name" label="Nom" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
}
