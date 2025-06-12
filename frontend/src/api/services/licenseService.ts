import apiClient from "../apiClient";

export interface License {
	id: number;
	name: string;
}

// Prefixing endpoints with /api here would lead to double /api/api when
// combined with the axios baseURL which is already set to '/api'.
// Therefore we call the backend routes directly.
const getLicenses = () => apiClient.get<License[]>({ url: "/licenses" });

const addLicense = (name: string) =>
    apiClient.post<void>({ url: "/addLicense", data: { name } });

export default {
	getLicenses,
	addLicense,
};
