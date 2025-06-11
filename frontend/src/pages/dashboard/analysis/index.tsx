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
        const { data: yearlySales } = useQuery({
                queryKey: ["yearlySales"],
                queryFn: statsService.getYearlySales,
        });
        const { data: weeklySales } = useQuery({
                queryKey: ["weeklySales"],
                queryFn: statsService.getWeeklySales,
        });
        const { data: currentStock } = useQuery({
                queryKey: ["currentStock"],
                queryFn: statsService.getCurrentStock,
        });
        const { data: monthlySales } = useQuery({
                queryKey: ["monthlySales"],
                queryFn: statsService.getMonthlySales,
        });
        const { data: bestSellers } = useQuery({
                queryKey: ["bestSellersLastEvent"],
                queryFn: statsService.getBestSellersLastEvent,
        });

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
                                                        currentStock !== undefined
                                                                ? currentStock.toLocaleString("fr-FR")
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
                                        <Card title="Best-sellers de la derniére convention">
                                                <ChartBar
                                                        categories={bestSellers?.map((b) => b.name) || []}
                                                        data={bestSellers?.map((b) => b.quantity) || []}
                                                />
                                        </Card>
                                </Col>
				<Col span={24} lg={12} xl={8}>
					<Card title="Manga 2025">
						<ChartPie />
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-8" justify="center">
				<Col span={24} lg={12} xl={16}>
					<Card title="Best Sellers 2025">
						<ChartBar />
					</Card>
				</Col>
				<Col span={24} lg={12} xl={8}>
					<Card title="Plateforme de ventes">
						<ChartPie />
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
