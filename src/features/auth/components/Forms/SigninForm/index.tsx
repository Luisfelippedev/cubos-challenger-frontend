"use client";
import { Button } from "@core/components/ui/Button";
import { Input } from "@core/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
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

      <Button
        variant="primary"
        type="submit"
        size="small"
        disabled={isSubmitting}
        fullWidth
        className="mt-2"
      >
        Entrar
      </Button>
    </form>
  );
};
