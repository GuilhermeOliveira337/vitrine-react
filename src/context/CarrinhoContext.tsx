import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { ItemCarrinho, Produto } from '../types/produto'

interface CarrinhoContexto {
  itens: ItemCarrinho[]
  quantidadeTotal: number
  valorTotal: number
  adicionar: (produto: Produto) => void
  remover: (id: number) => void
  alterarQuantidade: (id: number, quantidade: number) => void
  limpar: () => void
}

const Contexto = createContext<CarrinhoContexto | null>(null)
const CHAVE_STORAGE = 'vitrine:carrinho'

function lerStorage(): ItemCarrinho[] {
  try {
    const bruto = localStorage.getItem(CHAVE_STORAGE)
    return bruto ? (JSON.parse(bruto) as ItemCarrinho[]) : []
  } catch {
    return [] // storage corrompido ou indisponível não pode derrubar a aplicação
  }
}

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>(lerStorage)

  useEffect(() => {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens))
  }, [itens])

  const adicionar = useCallback((produto: Produto) => {
    setItens((atuais) => {
      const existente = atuais.find((i) => i.produto.id === produto.id)
      if (existente) {
        return atuais.map((i) =>
          i.produto.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i,
        )
      }
      return [...atuais, { produto, quantidade: 1 }]
    })
  }, [])

  const remover = useCallback((id: number) => {
    setItens((atuais) => atuais.filter((i) => i.produto.id !== id))
  }, [])

  const alterarQuantidade = useCallback((id: number, quantidade: number) => {
    if (quantidade < 1) return
    setItens((atuais) =>
      atuais.map((i) => (i.produto.id === id ? { ...i, quantidade } : i)),
    )
  }, [])

  const limpar = useCallback(() => setItens([]), [])

  const valor = useMemo<CarrinhoContexto>(() => {
    const quantidadeTotal = itens.reduce((s, i) => s + i.quantidade, 0)
    const valorTotal = itens.reduce((s, i) => s + i.produto.price * i.quantidade, 0)
    return { itens, quantidadeTotal, valorTotal, adicionar, remover, alterarQuantidade, limpar }
  }, [itens, adicionar, remover, alterarQuantidade, limpar])

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCarrinho() {
  const ctx = useContext(Contexto)
  if (!ctx) throw new Error('useCarrinho precisa estar dentro de CarrinhoProvider')
  return ctx
}
