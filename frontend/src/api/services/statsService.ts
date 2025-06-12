import apiClient from "../apiClient";
import type { BestSellerDTO, LicenseStatDTO, WeeklyAverageDTO } from "#/api";

export enum StatsApi {
	WeeklySales = "/stats/getWeeklySales",
	MonthlySales = "/stats/getMonthlySales",
	NewClients = "/stats/getNewClients",
	YearlySales = "/stats/getYearlySales",
	ChiffreAffaire = "/stats/getChiffreAffaire",
	Last20Sales = "/stats/getLast20Sales",
	TotalStockValue = "/stats/getTotalStockValue",
	TotalStockCount = "/stats/getTotalStockCount",
	BestSellersLastEvent = "/stats/getBestSellersLastEvent",
        LicenseSalesStats = "/stats/getLicenseSalesStats",
        AverageBasketByWeek = "/stats/getAverageBasketByWeek",
}

const getWeeklySales = () =>
	apiClient.get<number>({ url: StatsApi.WeeklySales });
const getMonthlySales = () =>
	apiClient.get<number>({ url: StatsApi.MonthlySales });
const getNewClients = () =>
	apiClient.get<number>({ url: StatsApi.NewClients });
const getYearlySales = () =>
	apiClient.get<number>({ url: StatsApi.YearlySales });
const getChiffreAffaire = () =>
	apiClient.get<number>({ url: StatsApi.ChiffreAffaire });
const getLast20Sales = () =>
	apiClient.get<unknown>({ url: StatsApi.Last20Sales });
const getTotalStockValue = () =>
	apiClient.get<number>({ url: StatsApi.TotalStockValue });
const getTotalStockCount = () =>
        apiClient.get<number>({ url: StatsApi.TotalStockCount });
const getBestSellersLastEvent = () =>
        apiClient.get<BestSellerDTO[]>({ url: StatsApi.BestSellersLastEvent });
const getLicenseSalesStats = () =>
        apiClient.get<LicenseStatDTO[]>({ url: StatsApi.LicenseSalesStats });
const getAverageBasketByWeek = () =>
        apiClient.get<WeeklyAverageDTO[]>({ url: StatsApi.AverageBasketByWeek });

export default {
	getWeeklySales,
	getMonthlySales,
	getNewClients,
	getYearlySales,
	getChiffreAffaire,
	getLast20Sales,
	getTotalStockValue,
	getTotalStockCount,
        getBestSellersLastEvent,
        getLicenseSalesStats,
        getAverageBasketByWeek,
};
