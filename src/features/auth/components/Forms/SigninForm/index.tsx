"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@core/components/ui/Input";
import Button from "@core/components/ui/Button";
import { useSignInForm } from "./useSigninForm";
import { SignInFormData, signInSchema } from "./signinFormSchema";
import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

export const SigninForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: zodResolver(signInSchema) });

  const mutation = useSignInForm();

  const onSubmit = (data: SignInFormData) => mutation.mutate(data);

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

      <Button
        variant="primary"
        type="submit"
        disabled={mutation.isPending}
        fullWidth
        className="mt-2"
      >
        {mutation.isPending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
};
