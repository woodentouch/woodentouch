import apiClient from "../apiClient";

export enum StatsApi {
        WeeklySales = "/stats/getWeeklySales",
        NewClients = "/stats/getNewClients",
        YearlySales = "/stats/getYearlySales",
        ChiffreAffaire = "/stats/getChiffreAffaire",
        Last20Sales = "/stats/getLast20Sales",
        CurrentStock = "/stats/getCurrentStock",
        MonthlySales = "/stats/getMonthlySales",
        BestSellersLastEvent = "/stats/getBestSellersLastEvent",
}

const getWeeklySales = () =>
	apiClient.get<number>({ url: StatsApi.WeeklySales });
const getNewClients = () => apiClient.get<number>({ url: StatsApi.NewClients });
const getYearlySales = () =>
	apiClient.get<number>({ url: StatsApi.YearlySales });
const getChiffreAffaire = () =>
	apiClient.get<number>({ url: StatsApi.ChiffreAffaire });
const getLast20Sales = () =>
        apiClient.get<unknown>({ url: StatsApi.Last20Sales });
const getCurrentStock = () =>
        apiClient.get<number>({ url: StatsApi.CurrentStock });
const getMonthlySales = () =>
        apiClient.get<number>({ url: StatsApi.MonthlySales });
const getBestSellersLastEvent = () =>
        apiClient.get<any[]>({ url: StatsApi.BestSellersLastEvent });

export default {
        getWeeklySales,
        getNewClients,
        getYearlySales,
        getChiffreAffaire,
        getLast20Sales,
        getCurrentStock,
        getMonthlySales,
        getBestSellersLastEvent,
};
