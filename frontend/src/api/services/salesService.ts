import apiClient from '../apiClient';

// Item within a panier
export interface SalesItem {
    vente: string;
    prix: string;
}

// Entire panier with items
export interface SalesData {
    panierId: number;
    dateAjout: string;
    canal_de_vente: string;
    items: SalesItem[];
}

class SalesService {
    getLatestSales() {
        return apiClient.get<SalesData[]>({ url: '/paniers/latest-sales' });
    }

    createSale(data: unknown) {
        return apiClient.post<void>({ url: '/ventes/register', data });
    }
}

const salesService = new SalesService();

export default salesService;
