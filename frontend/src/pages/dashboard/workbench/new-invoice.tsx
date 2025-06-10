import { Space, Tag, Typography } from "antd";
import Table, { type ColumnsType } from "antd/es/table";

import Card from "@/components/card";
import { IconButton, Iconify } from "@/components/icon";
import Scrollbar from "@/components/scrollbar";

interface DataType {
	key: string;
	id: string;
	category: string;
	price: string;
	status: string;
}

export default function NewInvoice() {
	const columns: ColumnsType<DataType> = [
		{
			title: "Vente",
			dataIndex: "id",
			key: "id",
			render: (text) => <span>{text}</span>,
		},
		// {
		// 	title: "Manga",
		// 	dataIndex: "category",
		// 	key: "category",
		// },
		{
			title: "Prix",
			dataIndex: "price",
			key: "price",
			render: (text) => <span>{text}</span>,
		},
		{
			title: "canal de vente",
			key: "status",
			dataIndex: "status",
			render: (_status) => {
				const status = _status as string;
				let color = "success";
				if (status === "Progress") color = "gold";
				if (status === "Out of Date") color = "red";
				return <Tag color={color}>{status}</Tag>;
			},
		},
		{
			title: "Action",
			key: "action",
			render: () => (
				<Space size="middle">
					<IconButton>
						<Iconify icon="fontisto:more-v-a" />
					</IconButton>
				</Space>
			),
		},
	];

	const data: DataType[] = [
		{
			key: "1",
			id: "Guts(M), Casca Guts(M)",
			category: "Android",
			price: "180€",
			status: "Made in Asia",
		},
		{
			key: "2",
			id: "Goku(S)",
			category: "Mac",
			price: "35€",
			status: "Site internet",
		},
		{
			key: "3",
			id: "Gear V(S) ",
			category: "Windows",
			price: "35€",
			status: "Etsy",
		},
		{
			key: "4",
			id: "INV-1993",
			category: "Android",
			price: "$85.21",
			status: "Paid",
		},
		{
			key: "5",
			id: "INV-1993",
			category: "Android",
			price: "$85.21",
			status: "Paid",
		},
		{
			key: "6",
			id: "INV-1993",
			category: "Android",
			price: "$85.21",
			status: "Paid",
		},
		{
			key: "7",
			id: "INV-1993",
			category: "Android",
			price: "$85.21",
			status: "Paid",
		},
		{
			key: "8",
			id: "INV-1993",
			category: "Android",
			price: "$85.21",
			status: "Paid",
		},
		{
			key: "9",
			id: "INV-1993",
			category: "Android",
			price: "$85.21",
			status: "Paid",
		},
	];

	return (
		<Card className="flex-col">
			<header className="self-start">
				<Typography.Title level={5}>Dernieres ventes</Typography.Title>
			</header>
			<main className="w-full">
				<Scrollbar>
					<Table columns={columns} dataSource={data} />
				</Scrollbar>
			</main>
		</Card>
	);
}
