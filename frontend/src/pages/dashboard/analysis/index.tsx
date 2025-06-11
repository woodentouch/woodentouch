import glass_bag from "@/assets/images/glass/ic_glass_bag.png";
import glass_buy from "@/assets/images/glass/ic_glass_buy.png";
import glass_message from "@/assets/images/glass/ic_glass_message.png";
import glass_users from "@/assets/images/glass/ic_glass_users.png";
import { Iconify } from "@/components/icon";
import ChartBar from "@/pages/components/chart/view/chart-bar";
import ChartMixed from "@/pages/components/chart/view/chart-mixed";
import ChartPie from "@/pages/components/chart/view/chart-pie";
import ChartRadar from "@/pages/components/chart/view/chart-radar";
import { themeVars } from "@/theme/theme.css";
import { Card, Col, Row, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import statsService from "@/api/services/statsService";
import AnalysisCard from "./analysis-card";
import AnalysisNews from "./analysis-news";
import AnalysisOrderTimeline from "./analysis-order-timeline";
import AnalysisTasks from "./analysis-tasks";
import AnalysisTrafficCard from "./analysis-traffic-card";
import CurrentDownload from "@/pages/dashboard/workbench/current-download";
import NewInvoice from "../workbench/new-invoice";

function Analysis() {
	const { data: chiffreAffaire } = useQuery({
		queryKey: ["chiffreAffaire"],
		queryFn: statsService.getChiffreAffaire,
	});
	const { data: newClients } = useQuery({
		queryKey: ["newClients"],
		queryFn: statsService.getNewClients,
	});
	const { data: totalStockValue } = useQuery({
		queryKey: ["totalStockValue"],
		queryFn: statsService.getTotalStockValue,
	});
	const { data: monthlySales } = useQuery({
		queryKey: ["monthlySales"],
		queryFn: statsService.getMonthlySales,
	});
	const { data: bestSellers } = useQuery({
		queryKey: ["bestSellersLastEvent"],
		queryFn: statsService.getBestSellersLastEvent,
	});
	const { data: licenseStats } = useQuery({
		queryKey: ["licenseSalesStats"],
		queryFn: statsService.getLicenseSalesStats,
	});

	// Exclude 'support' entries and sort descending
	const filteredBestSellers = bestSellers
		?.filter(
			(s) =>
				!s.productName.toLowerCase().includes("support") &&
				!s.licenseName.toLowerCase().includes("support")
		)
		.sort((a, b) => b.total - a.total) || [];
	// Transform best sellers for bar chart by total revenue
	const bestSellersData = filteredBestSellers.map((s) => s.total);
	const bestSellersCategories = filteredBestSellers.map(
		(s) => `${s.productName} (${s.licenseName})`
	);

	// Group license stats into top 4 and 'Other'
	const sortedLicenseStats =
		licenseStats
			?.filter((s) => !s.licenseName.toLowerCase().includes("support"))
			.sort((a, b) => b.percentage - a.percentage) || [];
	const totalCount = sortedLicenseStats.reduce((sum, s) => sum + s.count, 0);
	const top4 = sortedLicenseStats.slice(0, 4);
	const otherCount = sortedLicenseStats
		.slice(4)
		.reduce((sum, s) => sum + s.count, 0);
	const pieData = [...top4];
	if (otherCount > 0) {
		pieData.push({
			licenseName: "Other",
			count: otherCount,
			percentage: (otherCount * 100) / totalCount,
		});
	}
	const licenseStatsData = pieData.map((s) => s.count);
	const licenseStatsLabels = pieData.map((s) => s.licenseName);

	// Define high-contrast colors
	const barColors = filteredBestSellers.map((_, i) =>
		i % 2 === 0
			? themeVars.colors.palette.success.default
			: themeVars.colors.palette.error.default
	);
	// Replace pieColors with a fixed high-contrast palette for pieData
	const allPieColors = [
		themeVars.colors.palette.info.default,
		themeVars.colors.palette.success.default,
		themeVars.colors.palette.warning.default,
		themeVars.colors.palette.error.default,
		themeVars.colors.palette.secondary.default,
	];
	const pieColors = allPieColors.slice(0, pieData.length);

	return (
		<div className="p-2">
			<Typography.Title level={2}>
				Hi, Welcome back woody woodies🪵
			</Typography.Title>
			<Row gutter={[16, 16]} justify="center">
				<Col lg={6} md={12} span={24}>
					<AnalysisCard
						cover={glass_bag}
						title={
							chiffreAffaire !== undefined
								? `${chiffreAffaire.toLocaleString("fr-FR")} €`
								: "--"
						}
						subtitle="Chiffre d'affaire"
						style={{
							color: themeVars.colors.palette.success.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.success.defaultChannel}, .2)`,
						}}
					/>
				</Col>
				<Col lg={6} md={12} span={24}>
					<AnalysisCard
						cover={glass_users}
						title={
							newClients !== undefined
								? newClients.toLocaleString("fr-FR")
								: "--"
						}
						subtitle="clients cette année"
						style={{
							color: themeVars.colors.palette.info.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.info.defaultChannel}, .2)`,
						}}
					/>
				</Col>
				<Col lg={6} md={12} span={24}>
					<AnalysisCard
						cover={glass_buy}
						title={
							totalStockValue !== undefined
								? `${totalStockValue.toLocaleString("fr-FR")} €`
								: "--"
						}
						subtitle="Stock Actuel"
						style={{
							color: themeVars.colors.palette.warning.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.warning.defaultChannel}, .2)`,
						}}
					/>
				</Col>
				<Col lg={6} md={12} span={24}>
					<AnalysisCard
						cover={glass_message}
						title={
							monthlySales !== undefined
								? `${monthlySales.toLocaleString("fr-FR")} €`
								: "--"
						}
						subtitle="Ventes ce mois"
						style={{
							color: themeVars.colors.palette.error.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.error.defaultChannel}, .2)`,
						}}
					/>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-8" justify="center">
				<Col span={24} lg={12} xl={16}>
					{/* <Card title=""> */}
					<NewInvoice />
					{/* </Card> */}
				</Col>
				{/* <Col span={24} lg={12} xl={8}>
					<Card title="Plateforme de ventes">
						<ChartBar />
					</Card>
				</Col> */}
			</Row>

			<Row gutter={[16, 16]} className="mt-8" justify="center">
				<Col span={24} lg={12} xl={16}>
					<Card title="Best-sellers de la dernière convention">
						{/* Display bestSellers data here */}
						{bestSellersData.length > 0 &&
							bestSellersCategories.length > 0 ? (
							<ChartBar
								series={bestSellersData}
								categories={bestSellersCategories}
								colors={barColors} // Pass colors to ChartBar
							/>
						) : (
							"No data available"
						)}
					</Card>
				</Col>
				<Col span={24} lg={12} xl={8}>
					<Card title="Plateforme de ventes">
						{/* Display licenseStats data here */}
						{licenseStatsData.length > 0 && licenseStatsLabels.length > 0 ? (
							<ChartPie
								series={licenseStatsData}
								labels={licenseStatsLabels}
								colors={pieColors} // Pass colors to ChartPie
							/>
						) : (
							"No data available"
						)}
					</Card>
				</Col>
			</Row>

			{/* <Row gutter={[16, 16]} className="mt-8">
				<Col span={24} lg={12} xl={8}>
					<Card title="Historique des Ventes">
						<AnalysisOrderTimeline	 />
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-8" justify="center">
				<Col span={24} lg={12} xl={16}>
					<Card title="Best-sellers de la derniére convention">
						<ChartBar />
					</Card>
				</Col>
				<Col span={24} lg={12} xl={8}>
					<Card title="Mode de Paiement">
						<ChartPie />
					</Card>
				</Col>
			</Row> */}
		</div>
	);
}

export default Analysis;
