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
import AnalysisCard from "./analysis-card";
import AnalysisNews from "./analysis-news";
import AnalysisOrderTimeline from "./analysis-order-timeline";
import AnalysisTasks from "./analysis-tasks";
import AnalysisTrafficCard from "./analysis-traffic-card";
import CurrentDownload from "@/pages/dashboard/workbench/current-download";
//import NewInvoice from "./new-invoice";

function Analysis() {
	return (
		<div className="p-2">
			<Typography.Title level={2}>Hi, Welcome back woody woodies🪵</Typography.Title>
			<Row gutter={[16, 16]} justify="center">
				<Col lg={6} md={12} span={24}>
					<AnalysisCard
						cover={glass_bag}
						title="48K"
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
						title="1200"
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
						title="13 340€"
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
						title="234"
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
					{/*<NewInvoice />*/}
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
						<ChartBar />
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
