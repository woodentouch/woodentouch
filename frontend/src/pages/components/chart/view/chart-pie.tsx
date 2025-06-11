import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

type Props = { labels?: string[]; data?: number[] };

const defaultSeries = [44, 55, 13, 43];
const defaultLabels = ["DBZ", "OnePiece", "Europe", "Africa"];

export default function ChartPie({ labels = defaultLabels, data = defaultSeries }: Props) {
        const chartOptions = useChart({
                labels,
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
	});

        return <Chart type="pie" series={data} options={chartOptions} height={320} />;
}
