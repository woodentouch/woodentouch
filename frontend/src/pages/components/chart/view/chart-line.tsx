import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";
import { useQuery } from "@tanstack/react-query";
import statsService from "@/api/services/statsService";

export default function ChartLine() {
        const { data } = useQuery({
                queryKey: ["averageBasketByWeek"],
                queryFn: statsService.getAverageBasketByWeek,
        });

        const series = [
                {
                        name: "Panier moyen",
                        data: data ? data.map((d) => d.average) : [],
                },
        ];

        const chartOptions = useChart({
                xaxis: {
                        categories: data ? data.map((d) => `S${d.week}`) : [],
                },
                tooltip: {
                        y: {
                                formatter: (value: number) => `${value.toFixed(2)} €`,
                        },
                        marker: { show: false },
                },
        });

        return (
                <Chart type="line" series={series} options={chartOptions} height={320} />
        );
}
