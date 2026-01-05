import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useAuthStore } from "@/store/use-auth-store";
import type { RefreshTokenResponse, ApiError } from "@/types/auth";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = useAuthStore.getState().accessToken || Cookies.get("accessToken");

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
            const isAuthEndpoint = originalRequest.url?.includes("/auth/login") || originalRequest.url?.includes("/auth/register") || originalRequest.url?.includes("/auth/refresh");

            if (isAuthEndpoint) {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return apiClient(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken =
                    useAuthStore.getState().refreshToken || Cookies.get("refreshToken");

                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                const response = await axios.post<RefreshTokenResponse>(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/refresh`,
                    { refreshToken },
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                useAuthStore.getState().setTokens(accessToken, newRefreshToken);

                processQueue(null, accessToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }

                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as AxiosError, null);
                useAuthStore.getState().logout();

                if (typeof window !== "undefined") {
                    toast.error("Session expired", {
                        description: "Please login again to continue.",
                        duration: 10000,
                    });
                    window.location.href = "/auth";
                }

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
