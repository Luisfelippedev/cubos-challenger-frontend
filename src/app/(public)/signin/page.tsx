import Image from "next/image";
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
            <div className="relative">
              <Image
                src={"/images/mascot/panda-right-angle.png"}
                alt="Header background"
                priority
                quality={100}
                width={260}
                height={260}
                className="absolute -bottom-50 -left-80 z-[1] select-none pointer-events-none hidden lg:block"
              />
            </div>
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
