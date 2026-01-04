export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserApiResponse {
    success: boolean;
    data: {
        id: string;
        name: string;
        email: string;
        role: string;
        created_at: string;
        updated_at: string;
    };
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginApiResponse {
    success: boolean;
    message: string;
    data: {
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
    };
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User | null;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface TokenPayload {
    sub: string;
    email: string;
    exp: number;
    iat: number;
}

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    isAuthenticated: boolean;
    isHydrated: boolean;
}

export interface AuthActions {
    setTokens: (accessToken: string, refreshToken: string) => void;
    setUser: (user: User) => void;
    login: (response: LoginResponse) => void;
    logout: () => void;
    setHydrated: (hydrated: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

export interface ApiError {
    message: string;
    statusCode: number;
    error?: string;
}
