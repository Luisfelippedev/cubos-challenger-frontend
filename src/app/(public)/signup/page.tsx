import Link from "next/link";
import {
  AuthCard,
  AuthFooter,
  AuthLayout,
  AuthNavBar,
  AuthSignUpForm,
} from "src/features/auth/components";

const SignUpPage = () => {
  return (
    <AuthLayout.Root>
      <AuthLayout.Header>
        <AuthNavBar />
      </AuthLayout.Header>

      <AuthLayout.Body>
        <AuthCard.Root>
          <AuthCard.Title>Cadastre-se</AuthCard.Title>

          <AuthCard.Body>
            <AuthSignUpForm />
          </AuthCard.Body>

          <AuthCard.Footer>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Já tem conta?{" "}
              <Link
                href="/signin"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Entre aqui
              </Link>
            </p>
          </AuthCard.Footer>
        </AuthCard.Root>
      </AuthLayout.Body>

      <AuthLayout.Footer>
        <AuthFooter />
      </AuthLayout.Footer>
    </AuthLayout.Root>
  );
};

export default SignUpPage;
