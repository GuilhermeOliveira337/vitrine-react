import { Link } from 'react-router-dom'
import { useCarrinho } from '../context/CarrinhoContext'
import { formatarPreco } from '../utils/formatar'

export function Carrinho() {
  const { itens, valorTotal, alterarQuantidade, remover, limpar } = useCarrinho()

  if (itens.length === 0) {
    return (
      <div className="rounded-lg border border-linha bg-white p-10 text-center">
        <h1 className="font-titulo text-xl font-bold">Seu carrinho está vazio</h1>
        <p className="mt-2 text-sm text-tinta-2">Adicione produtos do catálogo para continuar.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded bg-marca px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Ver catálogo
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="font-titulo text-2xl font-bold tracking-tight">Carrinho</h1>
        <button onClick={limpar} className="text-sm text-tinta-2 underline hover:text-tinta">
          Limpar carrinho
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        {itens.map(({ produto, quantidade }) => (
          <li
            key={produto.id}
            className="flex gap-4 rounded-lg border border-linha bg-white p-3"
          >
            <img
              src={produto.thumbnail}
              alt=""
              className="h-20 w-20 flex-none rounded object-cover"
            />

            <div className="min-w-0 flex-1">
              <Link to={`/produto/${produto.id}`} className="hover:underline">
                <h2 className="truncate font-titulo text-sm font-semibold">{produto.title}</h2>
              </Link>
              <p className="mt-0.5 text-xs text-tinta-2">{formatarPreco(produto.price)} cada</p>

              <div className="mt-2 flex items-center gap-2">
                <label htmlFor={`qtd-${produto.id}`} className="sr-only">
                  Quantidade de {produto.title}
                </label>
                <button
                  onClick={() => alterarQuantidade(produto.id, quantidade - 1)}
                  disabled={quantidade <= 1}
                  aria-label="Diminuir quantidade"
                  className="h-7 w-7 rounded border border-linha text-sm disabled:opacity-40"
                >
                  −
                </button>
                <input
                  id={`qtd-${produto.id}`}
                  type="number"
                  min={1}
                  value={quantidade}
                  onChange={(e) => alterarQuantidade(produto.id, Number(e.target.value))}
                  className="w-14 rounded border border-linha px-2 py-1 text-center text-sm tabular-nums"
                />
                <button
                  onClick={() => alterarQuantidade(produto.id, quantidade + 1)}
                  aria-label="Aumentar quantidade"
                  className="h-7 w-7 rounded border border-linha text-sm"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-none flex-col items-end justify-between">
              <p className="font-titulo text-sm font-bold tabular-nums">
                {formatarPreco(produto.price * quantidade)}
              </p>
              <button
                onClick={() => remover(produto.id)}
                className="text-xs text-tinta-2 underline hover:text-tinta"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between rounded-lg border border-linha bg-white p-5">
        <span className="font-titulo font-semibold">Total</span>
        <span className="font-titulo text-2xl font-bold tabular-nums">
          {formatarPreco(valorTotal)}
        </span>
      </div>
    </>
  )
}
