import apiClient from "../apiClient";

export interface License {
	id: number;
	name: string;
}

const getLicenses = () => apiClient.get<License[]>({ url: "/api/licenses" });

const addLicense = (name: string) => apiClient.post<void>({ url: "/api/addLicense", data: { name } });

export default {
	getLicenses,
	addLicense,
};
