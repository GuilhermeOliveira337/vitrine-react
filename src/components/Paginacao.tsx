interface Props {
  pagina: number
  totalPaginas: number
  onMudar: (p: number) => void
}

export function Paginacao({ pagina, totalPaginas, onMudar }: Props) {
  if (totalPaginas <= 1) return null

  return (
    <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Paginação">
      <button
        onClick={() => onMudar(pagina - 1)}
        disabled={pagina <= 1}
        className="rounded border border-linha bg-white px-4 py-2 text-sm font-medium transition hover:bg-linha disabled:cursor-not-allowed disabled:opacity-40"
      >
        Anterior
      </button>
      <span className="text-sm tabular-nums text-tinta-2">
        Página {pagina} de {totalPaginas}
      </span>
      <button
        onClick={() => onMudar(pagina + 1)}
        disabled={pagina >= totalPaginas}
        className="rounded border border-linha bg-white px-4 py-2 text-sm font-medium transition hover:bg-linha disabled:cursor-not-allowed disabled:opacity-40"
      >
        Próxima
      </button>
    </nav>
  )
}
