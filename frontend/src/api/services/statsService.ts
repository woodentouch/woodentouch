import apiClient from "../apiClient";

export enum StatsApi {
	WeeklySales = "/stats/getWeeklySales",
	NewClients = "/stats/getNewClients",
	YearlySales = "/stats/getYearlySales",
	ChiffreAffaire = "/stats/getChiffreAffaire",
	Last20Sales = "/stats/getLast20Sales",
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

export default {
	getWeeklySales,
	getNewClients,
	getYearlySales,
	getChiffreAffaire,
	getLast20Sales,
};
