// User types for admin users list

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
    created_at: string;
    updated_at?: string;
}

export interface UserListApiResponse {
    success: boolean;
    data: User[];
}
