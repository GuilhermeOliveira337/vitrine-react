import axios from 'axios'
import type { Produto, RespostaProdutos } from '../types/produto'

/**
 * Cliente HTTP único para a API. Concentrar a baseURL aqui evita repetir
 * a URL em cada chamada e facilita trocar de ambiente depois.
 */
const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
})

export const PRODUTOS_POR_PAGINA = 12

export async function buscarProdutos(params: {
  busca: string
  categoria: string
  pagina: number
}): Promise<RespostaProdutos> {
  const { busca, categoria, pagina } = params
  const skip = (pagina - 1) * PRODUTOS_POR_PAGINA

  // A API tem endpoints diferentes para busca, categoria e listagem geral.
  // A decisão de qual usar fica aqui, e não no componente.
  let url = '/products'
  const query: Record<string, string | number> = {
    limit: PRODUTOS_POR_PAGINA,
    skip,
  }

  if (busca.trim()) {
    url = '/products/search'
    query.q = busca.trim()
  } else if (categoria) {
    url = `/products/category/${categoria}`
  }

  const { data } = await api.get<RespostaProdutos>(url, { params: query })
  return data
}

export async function buscarProduto(id: string): Promise<Produto> {
  const { data } = await api.get<Produto>(`/products/${id}`)
  return data
}

export async function buscarCategorias(): Promise<string[]> {
  const { data } = await api.get<string[]>('/products/category-list')
  return data
}
