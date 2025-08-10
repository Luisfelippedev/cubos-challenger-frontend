import Link from "next/link";
import {
  AuthCard,
  AuthFooter,
  AuthLayout,
  AuthNavBar,
  AuthSigninForm,
} from "src/features/auth/components";

const SignInPage = () => {
  return (
    <AuthLayout.Root>
      <AuthLayout.Header>
        <AuthNavBar />
      </AuthLayout.Header>

      <AuthLayout.Body>
        <AuthCard.Root>
          <AuthCard.Title>Entrar</AuthCard.Title>

          <AuthCard.Body>
            <AuthSigninForm />
          </AuthCard.Body>

          <AuthCard.Footer>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Não tem conta?{" "}
              <Link
                href="/signup"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Cadastre-se
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

export default SignInPage;
