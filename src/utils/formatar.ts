export function formatarPreco(valorEmDolar: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
  }).format(valorEmDolar)
}
