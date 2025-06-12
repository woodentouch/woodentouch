import apiClient from "../apiClient";

export interface Product {
	id: number;
	model: string;
	size?: string;
	quantity: number;
	stockMinimum: number;
}

const getProducts = () => apiClient.get<Product[]>({ url: "/produits" });

const getProductsByLicense = (licenseId: number) =>
        apiClient.get<Product[]>({ url: `/produits/${licenseId}` });

const addProduct = (data: {
	licenseId: number;
	model: string;
	quantity: number;
	stockMinimum: number;
}) => apiClient.post<void>({ url: "/produits", data });

export default {
        getProducts,
        getProductsByLicense,
        addProduct,
};
