import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

interface ChartBarProps {
	series: number[];
	categories: string[];
	colors?: string[]; // Accept optional colors prop
}

export default function ChartBar({ series, categories, colors }: ChartBarProps) {
	const chartOptions = useChart({
		stroke: { show: false },
		plotOptions: {
			bar: { horizontal: true, barHeight: "30%" },
		},
		xaxis: {
			categories: categories,
		},
		colors: colors, // Pass colors to chart options
	});

	return (
		<Chart
			type="bar"
			series={[{ data: series }]}
			options={chartOptions}
			height={320}
		/>
	);
}
