import { useQuery } from '@tanstack/react-query'
import { buscarCategorias, buscarProduto, buscarProdutos } from '../api/produtos'

export function useProdutos(busca: string, categoria: string, pagina: number) {
  return useQuery({
    queryKey: ['produtos', busca, categoria, pagina],
    queryFn: () => buscarProdutos({ busca, categoria, pagina }),
    placeholderData: (anterior) => anterior, // mantém a lista na tela ao paginar
  })
}

export function useProduto(id: string) {
  return useQuery({
    queryKey: ['produto', id],
    queryFn: () => buscarProduto(id),
    enabled: Boolean(id),
  })
}

export function useCategorias() {
  return useQuery({
    queryKey: ['categorias'],
    queryFn: buscarCategorias,
    staleTime: 1000 * 60 * 60, // categorias mudam pouco
  })
}
