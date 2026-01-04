import apiClient from "./api-client";
import { useAuthStore } from "@/store/use-auth-store";
import type {
    LoginRequest,
    LoginResponse,
    LoginApiResponse,
    RegisterRequest,
    RegisterResponse,
    RefreshTokenResponse,
    User,
    UserApiResponse,
} from "@/types/auth";

export async function login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginApiResponse>("/v1/auth/login", data);

    const normalizedResponse: LoginResponse = {
        accessToken: response.data.data.access_token,
        refreshToken: response.data.data.refresh_token,
        user: null,
    };

    useAuthStore.getState().login(normalizedResponse);

    await getCurrentUser();

    return normalizedResponse;
}

export async function register(
    data: Omit<RegisterRequest, "confirmPassword">
): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
        "/v1/auth/register",
        data
    );

    return response.data;
}

export async function refreshToken(
    refreshToken: string
): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>(
        "/v1/auth/refresh",
        { refreshToken }
    );

    useAuthStore.getState().setTokens(response.data.accessToken, response.data.refreshToken);

    return response.data;
}

export async function logout(): Promise<void> {
    try {
        const token = useAuthStore.getState().refreshToken;

        if (token) {
            await apiClient.post("/v1/auth/logout", { refresh_token: token });
        }
    } catch {
        console.warn("Logout API call failed, proceeding with local logout");
    } finally {
        useAuthStore.getState().logout();
    }
}

export async function getCurrentUser(): Promise<User> {
    const response = await apiClient.get<UserApiResponse>("/v1/auth/me");

    const normalizedUser: User = {
        id: response.data.data.id,
        name: response.data.data.name,
        email: response.data.data.email,
        role: response.data.data.role,
        createdAt: response.data.data.created_at,
        updatedAt: response.data.data.updated_at,
    };

    useAuthStore.getState().setUser(normalizedUser);

    return normalizedUser;
}

export const authService = {
    login,
    register,
    refreshToken,
    logout,
    getCurrentUser,
};

export default authService;
