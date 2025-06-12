import apiClient from "../apiClient";

export interface Product {
	id: number;
	model: string;
	size?: string;
	quantity: number;
	stockMinimum: number;
}

// Endpoints shouldn't start with /api because axios baseURL already uses it.
const getProducts = (licenseId: number) =>
    apiClient.get<Product[]>({ url: `/products/${licenseId}` });

const addProduct = (data: {
	licenseId: number;
	model: string;
	quantity: number;
	stockMinimum: number;
}) => apiClient.post<void>({ url: "/addProduct", data });

export default {
	getProducts,
	addProduct,
};
