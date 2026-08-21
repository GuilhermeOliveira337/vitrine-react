import { useEffect, useState } from 'react'

/**
 * Atrasa a propagação de um valor. Usado na busca para não disparar
 * uma requisição a cada tecla digitada.
 */
export function useDebounce<T>(valor: T, atraso = 400): T {
  const [valorAtrasado, setValorAtrasado] = useState(valor)

  useEffect(() => {
    const timer = setTimeout(() => setValorAtrasado(valor), atraso)
    return () => clearTimeout(timer)
  }, [valor, atraso])

  return valorAtrasado
}
