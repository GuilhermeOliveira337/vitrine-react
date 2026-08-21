import { Link } from 'react-router-dom'
import type { Produto } from '../types/produto'
import { useCarrinho } from '../context/CarrinhoContext'
import { formatarPreco } from '../utils/formatar'

export function CartaoProduto({ produto }: { produto: Produto }) {
  const { adicionar } = useCarrinho()

  return (
    <li className="group flex flex-col overflow-hidden rounded-lg border border-linha bg-white transition hover:border-tinta-2">
      <Link
        to={`/produto/${produto.id}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
      >
        <div className="aspect-square overflow-hidden bg-papel">
          <img
            src={produto.thumbnail}
            alt={produto.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <p className="text-[11px] uppercase tracking-wider text-tinta-2">{produto.category}</p>
        <Link to={`/produto/${produto.id}`} className="mt-1 hover:underline">
          <h3 className="font-titulo text-sm font-semibold leading-snug">{produto.title}</h3>
        </Link>

        <div className="mt-auto pt-3">
          <p className="font-titulo text-base font-bold tabular-nums">
            {formatarPreco(produto.price)}
          </p>
          <button
            onClick={() => adicionar(produto)}
            className="mt-2 w-full rounded bg-marca px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </li>
  )
}
