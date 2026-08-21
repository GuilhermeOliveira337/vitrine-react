import { Link, NavLink } from 'react-router-dom'
import { useCarrinho } from '../context/CarrinhoContext'

export function Cabecalho() {
  const { quantidadeTotal } = useCarrinho()

  return (
    <header className="sticky top-0 z-20 border-b border-linha bg-papel/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link
          to="/"
          className="font-titulo text-lg font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
        >
          Vitrine<span className="text-marca">.</span>
        </Link>

        <nav className="ml-auto flex items-center gap-1 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded px-3 py-2 font-medium transition ${isActive ? 'bg-marca-claro text-marca' : 'hover:bg-linha'}`
            }
          >
            Produtos
          </NavLink>
          <NavLink
            to="/carrinho"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded px-3 py-2 font-medium transition ${isActive ? 'bg-marca-claro text-marca' : 'hover:bg-linha'}`
            }
          >
            Carrinho
            {quantidadeTotal > 0 && (
              <span
                className="min-w-5 rounded-full bg-marca px-1.5 py-0.5 text-center text-[11px] font-bold tabular-nums text-white"
                aria-label={`${quantidadeTotal} itens no carrinho`}
              >
                {quantidadeTotal}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
