import apiClient from "../apiClient";

export interface Product {
	id: number;
	model: string;
	size?: string;
	quantity: number;
	stockMinimum: number;
}

// Endpoints shouldn't start with /api because axios baseURL already uses it.
// licenseId is optional; if undefined, the backend should return all products
// instead of filtering by license. This prevents URLs like `/products/[object Object]`.
const getProducts = (licenseId?: number) => {
       const url = licenseId !== undefined ? `/products/${licenseId}` : "/products";
       return apiClient.get<Product[]>({ url });
};

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
