import apiClient from "../apiClient";

export interface License {
	id: number;
	name: string;
}

// Prefixing endpoints with /api here would lead to double /api/api when
// combined with the axios baseURL which is already set to '/api'.
// Therefore we call the backend routes directly.
const getLicenses = async (): Promise<License[]> => {
    const raw = await apiClient.get<any[]>({ url: "/licenses" });
    return raw.map((l) => ({
        id: l.id ?? l.id_license,
        name: l.name ?? l.name_license,
    }));
};

const addLicense = (name: string) =>
    apiClient.post<void>({ url: "/addLicense", data: { name } });

export default {
	getLicenses,
	addLicense,
};
