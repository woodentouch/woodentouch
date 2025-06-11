import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

interface ChartPieProps {
	series: number[];
	labels: string[];
	colors?: string[]; // <-- Added colors prop
}

export default function ChartPie({ series, labels, colors }: ChartPieProps) {
	const chartOptions = useChart({
		labels: labels,
		legend: {
			horizontalAlign: "center",
		},
		stroke: {
			show: false,
		},
		dataLabels: {
			enabled: true,
			dropShadow: {
				enabled: false,
			},
		},
		tooltip: {
			fillSeriesColor: false,
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: false,
					},
				},
			},
		},
		colors: colors, // <-- Passed colors to chart options
	});

	return (
		<Chart type="pie" series={series} options={chartOptions} height={320} />
	);
}
