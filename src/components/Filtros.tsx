import { useCategorias } from '../hooks/useProdutos'

interface Props {
  busca: string
  onBuscaChange: (v: string) => void
  categoria: string
  onCategoriaChange: (v: string) => void
}

export function Filtros({ busca, onBuscaChange, categoria, onCategoriaChange }: Props) {
  const { data: categorias } = useCategorias()

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <label htmlFor="busca" className="sr-only">
          Buscar produtos
        </label>
        <input
          id="busca"
          type="search"
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          placeholder="Buscar produtos…"
          className="w-full rounded border border-linha bg-white px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-marca"
        />
      </div>

      <div className="sm:w-56">
        <label htmlFor="categoria" className="sr-only">
          Filtrar por categoria
        </label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => onCategoriaChange(e.target.value)}
          disabled={Boolean(busca.trim())}
          className="w-full rounded border border-linha bg-white px-4 py-2.5 text-sm disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-marca"
        >
          <option value="">Todas as categorias</option>
          {categorias?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
