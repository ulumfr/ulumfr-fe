import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid"),
    password: z
        .string()
        .min(1, "Password wajib diisi")
        .min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, "Nama wajib diisi")
            .min(2, "Nama minimal 2 karakter")
            .max(100, "Nama maksimal 100 karakter"),
        email: z
            .string()
            .min(1, "Email wajib diisi")
            .email("Format email tidak valid"),
        password: z
            .string()
            .min(1, "Password wajib diisi")
            .min(6, "Password minimal 6 karakter")
            .max(50, "Password maksimal 50 karakter"),
        confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password tidak cocok",
        path: ["confirmPassword"],
    });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;