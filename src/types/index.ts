export interface Category {
  id: number;
  nome: string;
  descricao: string;
}

export type Objetivo =
  | 'emagrecimento'
  | 'ganho-massa'
  | 'diabetico'
  | 'sem-lactose'
  | 'sem-gluten';

export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  ativo: boolean;

  imcMin: number | null;
  imcMax: number | null;

  objetivo: Objetivo | null;

  categoria: Category;
}

export interface ProductFormData {
  nome: string;
  descricao: string;
  preco: number;
  ativo: boolean;

  imcMin: number | null;
  imcMax: number | null;

  objetivo: Objetivo | null;

  categoria: {
    id: number;
  };
}

export interface CategoryFormData {
  nome: string;
  descricao: string;
}

export type SortOption =
  | 'name'
  | 'price_asc'
  | 'price_desc';