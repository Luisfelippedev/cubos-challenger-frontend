"use client";

import Link from "next/link";
import Button from "@core/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "@core/components/ui/Input";
import { useSignUpForm } from "./useSignupForm";
import { SignUpFormData, signUpSchema } from "./signupFormSchema";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useSignUpForm();

  const onSubmit = (data: SignUpFormData) => {
    mutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        id="name"
        type="text"
        label="Nome"
        placeholder="Seu nome completo"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

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
        disabled={mutation.isPending}
        fullWidth
        className="mt-2"
      >
        {mutation.isPending ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
};
