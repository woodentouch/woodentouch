import { Space, Tag, Typography } from "antd";
import Table, { type ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";

import Card from "@/components/card";
import { IconButton, Iconify } from "@/components/icon";
import Scrollbar from "@/components/scrollbar";
import salesService, { type SalesData, type SalesItem } from "@/api/services/salesService";

interface PanierDataType {
	key: string;
	vente: string; // Combined list of products
	prix: string;  // Total price of the panier
	canal_de_vente: string;
	action: string;
	dateAjout: string;
}

export default function NewInvoice() {
	const { data: salesData, isLoading, error } = useQuery({
		queryKey: ['latest-sales'],
		queryFn: () => salesService.getLatestSales(),
	});

	// Transform API data to match table format - one row per panier
	const tableData: PanierDataType[] = salesData?.map((panier: SalesData) => {
		// Calculate total price (remove € sign, convert to number, sum, then add € sign back)
		const totalPrice = panier.items
			.reduce((sum, item) => sum + parseFloat(item.prix.replace('€', '')), 0)
			.toFixed(1) + '€';

		return {
			key: `${panier.panierId}`,
			vente: panier.items.map(item => item.vente).join(' • '), // Use bullet points instead of commas
			prix: totalPrice,
			canal_de_vente: panier.canal_de_vente,
			action: "•••",
			dateAjout: panier.dateAjout,
		};
	})
		// Sort by date descending (newest first)
		?.sort((a, b) => new Date(b.dateAjout).getTime() - new Date(a.dateAjout).getTime())
		// Limit to most recent 20 
		?.slice(0, 20)
		|| [];

	const columns: ColumnsType<PanierDataType> = [
		{
			title: "Vente",
			dataIndex: "vente",
			key: "vente",
			render: (text) => (
				<Typography.Text
					style={{
						maxWidth: 300,
						display: 'block',
						whiteSpace: 'normal',
						lineHeight: '1.5em'
					}}
				>
					{text}
				</Typography.Text>
			),
		},
		{
			title: "Prix Total",
			dataIndex: "prix",
			key: "prix",
			render: (text) => <span>{text}</span>,
		},
		{
			title: "Canal de vente",
			key: "canal_de_vente",
			dataIndex: "canal_de_vente",
			render: (status) => {
				let color = "success";
				if (status === "Made in Asia") color = "cyan";
				if (status === "Site internet") color = "green";
				if (status === "Etsy") color = "orange";
				if (status === "Japan Expo 2025") color = "blue";
				if (status === "Paris Manga 2025") color = "purple";
				return <Tag color={color}>{status}</Tag>;
			},
		},
		{
			title: "Date",
			dataIndex: "dateAjout",
			key: "dateAjout",
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

	return (
		<Card className="flex-col">
			<header className="self-start">
				<Typography.Title level={5}>Dernières ventes</Typography.Title>
			</header>
			<main className="w-full">
				<Scrollbar>
					<Table
						columns={columns}
						dataSource={tableData}
						loading={isLoading}
						pagination={false}
					/>
				</Scrollbar>
			</main>
		</Card>
	);
}