"use client";

import Button from "@core/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@core/components/ui/Input";
import { useSignUpForm } from "./useSignupForm";
import { SignUpFormData, signUpSchema } from "./signupFormSchema";
import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
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
        type={showPassword ? "text" : "password"}
        label="Senha"
        placeholder="••••••••"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        endAdornment={
          <button
            type="button"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            onClick={() => setShowPassword((v) => !v)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
      />

      <Input
        id="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        label="Confirme a senha"
        placeholder="••••••••"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        endAdornment={
          <button
            type="button"
            aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
            onClick={() => setShowConfirmPassword((v) => !v)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
      />

      <Button
        variant="primary"
        type="submit"
        disabled={mutation.isPending}
        fullWidth
        className="mt-2"
      >
        {mutation.isPending ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
};
