import { CoreLayout } from "@core/components/Layout";
import Navbar from "@core/components/NavBar";
import { ThemeToggleButton } from "@core/components/ThemeToggleButton";

export default function ExamplePage() {
  return (
    <CoreLayout.Root>
      <CoreLayout.Header>
        <CoreLayout.Navbar>
          {/* Exemplo: logo à esquerda e botão tema à direita */}
          <Navbar />
        </CoreLayout.Navbar>

        {/* Conteúdo central do header (centralizado mesmo com navbar sobreposta) */}
        <h1 className="text-4xl font-semibold">Bem-vindo ao site</h1>
      </CoreLayout.Header>

      <CoreLayout.Body>
        <div className="flex-col">
          <h1 className="text-4xl font-semibold h-300">Bem-vindo ao site</h1>
          <h1 className="text-4xl font-semibold h-300">Bem-vindo ao site</h1>
          <h1 className="text-4xl font-semibold h-300">Bem-vindo ao site</h1>
          <h1 className="text-4xl font-semibold h-300">Bem-vindo ao site</h1>
          <h1 className="text-4xl font-semibold h-300">Bem-vindo ao site</h1>
          <h1 className="text-4xl font-semibold h-300">Bem-vindo ao site</h1>
          <h1 className="text-4xl font-semibold h-300">Bem-vindo ao site</h1>
          <h1 className="text-4xl font-semibold h-300">Bem-vindo ao site</h1>
          <h1 className="text-4xl font-semibold h-300">Bem-vindo ao site</h1>
        </div>
      </CoreLayout.Body>
    </CoreLayout.Root>
  );
}
