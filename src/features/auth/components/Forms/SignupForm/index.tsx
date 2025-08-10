"use client";

import Link from "next/link";
import { Button } from "@core/components/ui/Button";
import { Input } from "@core/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signUpSchema = z
  .object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Confirmação deve ter ao menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="pandafilmes@gmail.com"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <Input
        id="password"
        type="password"
        label="Senha"
        placeholder="••••••••"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Input
        id="confirmPassword"
        type="password"
        label="Confirme a senha"
        placeholder="••••••••"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <Button
        variant="primary"
        type="submit"
        size="small"
        disabled={isSubmitting}
        fullWidth
        className="mt-2"
      >
        Cadastrar
      </Button>
    </form>
  );
};
