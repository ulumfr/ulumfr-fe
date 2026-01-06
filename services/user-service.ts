import apiClient from "./api-client";
import type { User, UserListApiResponse } from "@/types/user";

export async function getUsers(): Promise<User[]> {
    const response = await apiClient.get<UserListApiResponse>("/v1/admin/users");
    return response.data.data;
}

export const userService = {
    getUsers,
};

export default userService;
