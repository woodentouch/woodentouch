export interface Model {
	id: string;
	name: string;
	quantity: number;
	minStock: number;
}

export interface License {
	id: string;
	name: string;
	models: Model[];
}

export const STOCK_DATA: License[] = [
	{
		id: "lic1",
		name: "Dragon Ball",
		models: [{ id: "m1", name: "Goku", quantity: 10, minStock: 5 }],
	},
	{
		id: "lic2",
		name: "Attack on Titan",
		models: [{ id: "m2", name: "Eren", quantity: 8, minStock: 3 }],
	},
];
