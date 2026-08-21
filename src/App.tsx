import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Cabecalho } from './components/Cabecalho'
import { CarrinhoProvider } from './context/CarrinhoContext'
import { Carrinho } from './pages/Carrinho'
import { Catalogo } from './pages/Catalogo'
import { DetalheProduto } from './pages/DetalheProduto'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CarrinhoProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Cabecalho />
          <main className="mx-auto max-w-6xl px-4 py-8">
            <Routes>
              <Route path="/" element={<Catalogo />} />
              <Route path="/produto/:id" element={<DetalheProduto />} />
              <Route path="/carrinho" element={<Carrinho />} />
            </Routes>
          </main>
        </BrowserRouter>
      </CarrinhoProvider>
    </QueryClientProvider>
  )
}
