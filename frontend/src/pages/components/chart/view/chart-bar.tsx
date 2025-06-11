import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

type Props = {
        categories?: string[];
        data?: number[];
};

const defaultData = [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380];
const defaultCategories = [
        "Italy",
        "Japan",
        "China",
        "Canada",
        "France",
        "Germany",
        "South Korea",
        "Netherlands",
        "United States",
        "United Kingdom",
];

export default function ChartBar({ categories = defaultCategories, data = defaultData }: Props) {
        const chartOptions = useChart({
                stroke: { show: false },
                plotOptions: {
                        bar: { horizontal: true, barHeight: "30%" },
                },
                xaxis: {
                        categories,
                },
        });

        return (
                <Chart type="bar" series={[{ data }]} options={chartOptions} height={320} />
        );
}
