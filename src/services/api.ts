import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rangoo-nest-da5w.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ======================
// TOKEN JWT
// ======================

api.interceptors.request.use((config: { headers: { Authorization: string; }; }) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

// ======================
// PRODUTOS
// ======================

export const getProducts = () =>
  api.get('/produtos');

export const createProduct = (data: any) =>
  api.post('/produtos', data);

export const updateProduct = (
id: number, data: any, _p0: { id: number; nome: string; descricao: string; preco: number; ativo: boolean; imcMin: null; imcMax: null; objetivo: null; categoria: { id: number; nome: string; descricao: string; }; }) =>
  api.put('/produtos', {
    id,
    ...data,
  });

export const deleteProduct = (
  id: number
) =>
  api.delete(`/produtos/${id}`);

// ======================
// CATEGORIAS
// ======================

export const getCategories = () =>
  api.get('/categorias');

export const createCategory = (
  data: any
) =>
  api.post('/categorias', data);

export const updateCategory = (
  id: number,
  data: any
) =>
  api.put('/categorias', {
    id,
    ...data,
  });

export const deleteCategory = (
  id: number
) =>
  api.delete(`/categorias/${id}`);

export default api;