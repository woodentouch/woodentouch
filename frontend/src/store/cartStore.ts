import { create } from "zustand";

export interface CartItem {
	idProduit: number;
	name: string;
	variante: string;
	unitPrice: number;
	quantity: number;
}

type CartStore = {
        items: CartItem[];
        actions: {
                addItem: (item: CartItem) => void;
                removeItem: (index: number) => void;
                clear: () => void;
                updateQuantity: (index: number, quantity: number) => void;
        };
};

const useCartStore = create<CartStore>((set) => ({
	items: [],
	actions: {
                addItem: (item) =>
                        set((state) => {
                                const idx = state.items.findIndex(
                                        (i) => i.idProduit === item.idProduit && i.variante === item.variante,
                                );
                                if (idx !== -1) {
                                        const items = [...state.items];
                                        items[idx].quantity += item.quantity;
                                        return { items };
                                }
                                return { items: [...state.items, item] };
                        }),
                removeItem: (index) =>
                        set((state) => {
                                const items = [...state.items];
                                items.splice(index, 1);
                                return { items };
                        }),
                clear: () => set({ items: [] }),
		updateQuantity: (index, quantity) =>
			set((state) => {
				const items = [...state.items];
				if (items[index]) {
					items[index].quantity = quantity;
				}
				return { items };
			}),
	},
}));

export const useCartItems = () => useCartStore((s) => s.items);
export const useCartActions = () => useCartStore((s) => s.actions);

export default useCartStore;
