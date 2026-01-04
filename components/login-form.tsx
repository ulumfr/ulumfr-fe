"use client";

import { useState } from "react";
import { GalleryVerticalEnd, Loader2, Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import type { LoginFormData } from "@/schemas/auth-schema";

interface LoginFormProps extends React.ComponentProps<"div"> {
  onToggleForm?: () => void;
}

export function LoginForm({ className, onToggleForm, ...props }: LoginFormProps) {
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name as keyof LoginFormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (error) {
      clearError();
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof LoginFormData, string>> = {};

    if (!formData.email) {
      errors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Format email tidak valid";
    }

    if (!formData.password) {
      errors.password = "Password wajib diisi";
    } else if (formData.password.length < 6) {
      errors.password = "Password minimal 6 karakter";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await login(formData);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center mb-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Selamat Datang Kembali</h1>
            <FieldDescription className="text-muted-foreground">
              Masuk menggunakan email dan password terdaftar.
            </FieldDescription>
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className={fieldErrors.email ? "border-destructive" : ""}
              autoComplete="email"
            />
            {fieldErrors.email && (
              <FieldError className="text-destructive">{fieldErrors.email}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className={cn(
                  "pr-10",
                  fieldErrors.password ? "border-destructive" : ""
                )}
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {fieldErrors.password && (
              <FieldError className="text-destructive">
                {fieldErrors.password}
              </FieldError>
            )}
          </Field>

          <Field className="mt-4">
            <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </Button>
          </Field>

          <div className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <button
              type="button"
              onClick={onToggleForm}
              className="font-medium text-primary underline-offset-4 hover:underline cursor-pointer"
            >
              Daftar sekarang
            </button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
