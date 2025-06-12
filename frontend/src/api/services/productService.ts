import apiClient from "../apiClient";

export interface Product {
        id: number;
        model: string;
        size: string;
        quantity: number;
        stockMinimum: number;
}

// Endpoints shouldn't start with /api because axios baseURL already uses it.
// `licenseId` is optional; when omitted or invalid the backend should return all
// products. Use a query parameter instead of a dynamic segment so we can simply
// drop the parameter when no licence is selected.
const getProducts = (licenseId?: number) => {
       const params: Record<string, number> = {};
       if (typeof licenseId === "number" && !Number.isNaN(licenseId)) {
               params.licenseId = licenseId;
       }
       return apiClient.get<Product[]>({ url: "/products", params });
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
