/**
 * Os quatro estados que toda tela que busca dados precisa tratar:
 * carregando, erro, vazio e sucesso. Ficam juntos aqui para que
 * nenhuma tela "esqueça" um deles.
 */

export function Carregando({ quantidade = 12 }: { quantidade?: number }) {
  return (
    <ul
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      aria-busy="true"
      aria-label="Carregando produtos"
    >
      {Array.from({ length: quantidade }).map((_, i) => (
        <li key={i} className="rounded-lg border border-linha bg-white p-3">
          <div className="mb-3 aspect-square animate-pulse rounded bg-linha" />
          <div className="mb-2 h-3 w-4/5 animate-pulse rounded bg-linha" />
          <div className="h-3 w-2/5 animate-pulse rounded bg-linha" />
        </li>
      ))}
    </ul>
  )
}

export function Erro({ onTentarNovamente }: { onTentarNovamente: () => void }) {
  return (
    <div role="alert" className="rounded-lg border border-linha bg-white p-8 text-center">
      <p className="font-titulo text-lg font-semibold">Não consegui carregar os produtos</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-tinta-2">
        A conexão com a API falhou. Pode ser instabilidade momentânea da rede.
      </p>
      <button
        onClick={onTentarNovamente}
        className="mt-5 rounded bg-marca px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
      >
        Tentar novamente
      </button>
    </div>
  )
}

export function Vazio({ busca }: { busca: string }) {
  return (
    <div className="rounded-lg border border-linha bg-white p-8 text-center">
      <p className="font-titulo text-lg font-semibold">Nenhum produto encontrado</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-tinta-2">
        {busca
          ? `Não há resultados para "${busca}". Tente outro termo ou limpe o filtro.`
          : 'Não há produtos nesta categoria.'}
      </p>
    </div>
  )
}
