import { useEffect, useState } from 'react'
import { PRODUTOS_POR_PAGINA } from '../api/produtos'
import { CartaoProduto } from '../components/CartaoProduto'
import { Carregando, Erro, Vazio } from '../components/Estados'
import { Filtros } from '../components/Filtros'
import { Paginacao } from '../components/Paginacao'
import { useDebounce } from '../hooks/useDebounce'
import { useProdutos } from '../hooks/useProdutos'

export function Catalogo() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('')
  const [pagina, setPagina] = useState(1)

  const buscaComAtraso = useDebounce(busca)

  // Trocar filtro tem que voltar para a primeira página, senão o usuário
  // cai numa página que não existe no novo recorte.
  useEffect(() => {
    setPagina(1)
  }, [buscaComAtraso, categoria])

  const { data, isPending, isError, refetch, isFetching } = useProdutos(
    buscaComAtraso,
    categoria,
    pagina,
  )

  const totalPaginas = data ? Math.ceil(data.total / PRODUTOS_POR_PAGINA) : 0

  return (
    <>
      <div className="mb-6">
        <h1 className="font-titulo text-2xl font-bold tracking-tight">Catálogo</h1>
        <p className="mt-1 text-sm text-tinta-2">
          {data ? `${data.total} produtos disponíveis` : 'Carregando catálogo…'}
        </p>
      </div>

      <Filtros
        busca={busca}
        onBuscaChange={setBusca}
        categoria={categoria}
        onCategoriaChange={setCategoria}
      />

      {isPending && <Carregando />}
      {isError && <Erro onTentarNovamente={() => refetch()} />}
      {!isPending && !isError && data.products.length === 0 && <Vazio busca={buscaComAtraso} />}

      {!isPending && !isError && data.products.length > 0 && (
        <>
          <ul
            className={`grid grid-cols-2 gap-4 transition-opacity sm:grid-cols-3 lg:grid-cols-4 ${
              isFetching ? 'opacity-60' : 'opacity-100'
            }`}
          >
            {data.products.map((p) => (
              <CartaoProduto key={p.id} produto={p} />
            ))}
          </ul>
          <Paginacao pagina={pagina} totalPaginas={totalPaginas} onMudar={setPagina} />
        </>
      )}
    </>
  )
}
