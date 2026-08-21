export interface Produto {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  category: string
  thumbnail: string
  images: string[]
}

export interface RespostaProdutos {
  products: Produto[]
  total: number
  skip: number
  limit: number
}

export interface ItemCarrinho {
  produto: Produto
  quantidade: number
}
