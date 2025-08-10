"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@core/components/ui/Input";
import Button from "@core/components/ui/Button";
import { useSignInForm } from "./useSigninForm";
import { SignInFormData, signInSchema } from "./signinFormSchema";

export const SigninForm = () => {
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
        type="password"
        label="Senha"
        placeholder="••••••••"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        variant="primary"
        type="submit"
        size="small"
        disabled={mutation.isPending}
        fullWidth
        className="mt-2"
      >
        {mutation.isPending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
};
