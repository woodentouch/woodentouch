import apiClient from "@/api/apiClient";
import type { Permission } from "#/entity";

export const getPermissions = async (): Promise<Permission[]> => {
    return await apiClient.get<Permission[]>({ url: "/permissions" });
};

export const createPermission = async (data: Permission): Promise<void> => {
    await apiClient.post<void>({ url: "/permissions", data });
};

export const updatePermission = async (data: Permission): Promise<void> => {
    await apiClient.put<void>({ url: `/permissions/${data.id}`, data });
};

export const deletePermission = async (id: string): Promise<void> => {
    await apiClient.delete<void>({ url: `/permissions/${id}` });
};