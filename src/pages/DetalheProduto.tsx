import { Link, useParams } from 'react-router-dom'
import { Erro } from '../components/Estados'
import { useCarrinho } from '../context/CarrinhoContext'
import { useProduto } from '../hooks/useProdutos'
import { formatarPreco } from '../utils/formatar'

export function DetalheProduto() {
  const { id = '' } = useParams()
  const { data: produto, isPending, isError, refetch } = useProduto(id)
  const { adicionar } = useCarrinho()

  if (isPending) {
    return (
      <div className="grid gap-8 md:grid-cols-2" aria-busy="true">
        <div className="aspect-square animate-pulse rounded-lg bg-linha" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded bg-linha" />
          <div className="h-4 w-full animate-pulse rounded bg-linha" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-linha" />
        </div>
      </div>
    )
  }

  if (isError) return <Erro onTentarNovamente={() => refetch()} />

  return (
    <article>
      <Link to="/" className="mb-6 inline-block text-sm text-tinta-2 hover:underline">
        ← Voltar ao catálogo
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-linha bg-white">
          <img
            src={produto.images[0] ?? produto.thumbnail}
            alt={produto.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-tinta-2">{produto.category}</p>
          <h1 className="mt-2 font-titulo text-3xl font-bold tracking-tight">{produto.title}</h1>

          <div className="mt-3 flex items-center gap-3 text-sm text-tinta-2">
            <span className="tabular-nums">★ {produto.rating.toFixed(1)}</span>
            <span aria-hidden>·</span>
            <span className="tabular-nums">{produto.stock} em estoque</span>
          </div>

          <p className="mt-5 leading-relaxed text-tinta-2">{produto.description}</p>

          <p className="mt-6 font-titulo text-3xl font-bold tabular-nums">
            {formatarPreco(produto.price)}
          </p>

          <button
            onClick={() => adicionar(produto)}
            className="mt-4 w-full rounded bg-marca px-6 py-3 font-semibold text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca sm:w-auto"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </article>
  )
}
