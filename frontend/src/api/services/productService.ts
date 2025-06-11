import apiClient from "../apiClient";

export enum ProductApi {
	Products = "/produits",
}

export interface Product {
	id_produit: number;
	modele: string;
}

const getProducts = () => apiClient.get<Product[]>({ url: ProductApi.Products });

export default { getProducts };
