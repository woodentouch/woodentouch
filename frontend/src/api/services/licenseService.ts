import apiClient from "../apiClient";

export interface License {
	id: number;
	name: string;
}

const getLicenses = () => apiClient.get<License[]>({ url: "/licences" });

const addLicense = (name: string) =>
        apiClient.post<void>({ url: "/licences", data: { name } });

export default {
	getLicenses,
	addLicense,
};
