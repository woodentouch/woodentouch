import apiClient from "../apiClient";

export interface Product {
	id: number;
	model: string;
	size?: string;
	quantity: number;
	stockMinimum: number;
}

const getProducts = (licenseId: number) =>
        apiClient.get<Product[]>({ url: `/produits/${licenseId}` });

const addProduct = (data: {
	licenseId: number;
	model: string;
	quantity: number;
	stockMinimum: number;
}) => apiClient.post<void>({ url: "/produits", data });

export default {
	getProducts,
	addProduct,
};
