import React, { useEffect, useMemo, useState } from 'react';
import {
  MagnifyingGlass,
  Plus,
  ArrowsDownUp,
  Spinner,
} from '@phosphor-icons/react';
import { toast } from 'react-toastify';

import ProductCard from '../../components/Produto/Produtocard';

import { produtoApi, categoriaApi, type ProdutoPayload } from '../../services/api';
import type { Product, Category, ProductFormData } from '../../types';
import ProductModal from '../../components/Produto/Produtomodal';
import CategoryModal from '../../components/Produto/Categoriamodal';
import DeleteModal from '../../components/Produto/Deletarmodal';

type SortOption =
  | 'name'
  | 'price_asc'
  | 'price_desc';

const Products: React.FC = () => {
  // States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] =
    useState<string>('all');

  const [sortOption, setSortOption] =
    useState<SortOption>('name');

  // Modals
  const [productModalOpen, setProductModalOpen] =
    useState(false);

  const [categoryModalOpen, setCategoryModalOpen] =
    useState(false);

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  // Selected product
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [deletingProduct, setDeletingProduct] =
    useState<Product | null>(null);

  // Loading
  const [submittingProduct, setSubmittingProduct] =
    useState(false);

  const [submittingCategory, setSubmittingCategory] =
    useState(false);

  const [deletingProductLoading, setDeletingProductLoading] =
    useState(false);

  // Fetch
  const fetchData = async () => {
    setLoadingProducts(true);

    try {
      const [productsRes, categoriesRes] =
        await Promise.all([
          produtoApi.findAll(),
          categoriaApi.findAll(),
        ]);

      setProducts(productsRes);
      setCategories(categoriesRes);
    } catch (error) {
      toast.error(
        'Erro ao carregar produtos e categorias.'
      );
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.nome
            .toLowerCase()
            .includes(query) ||
          product.descricao
            .toLowerCase()
            .includes(query) ||
          product.objetivo
            ?.toLowerCase()
            .includes(query)
      );
    }

    // Category
    if (activeCategoryFilter !== 'all') {
      result = result.filter(
        (product) =>
          String(product.categoria?.id) ===
          activeCategoryFilter
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortOption === 'price_asc') {
        return a.preco - b.preco;
      }

      if (sortOption === 'price_desc') {
        return b.preco - a.preco;
      }

      return a.nome.localeCompare(
        b.nome,
        'pt-BR'
      );
    });

    return result;
  }, [
    products,
    search,
    activeCategoryFilter,
    sortOption,
  ]);

  // Open create
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setProductModalOpen(true);
  };

  // Open edit
  const handleOpenEdit = (
    product: Product
  ) => {
    setEditingProduct(product);
    setProductModalOpen(true);
  };

  // Open delete
  const handleOpenDelete = (
    product: Product
  ) => {
    setDeletingProduct(product);
    setDeleteModalOpen(true);
  };

  // Submit product
  const handleSubmitProduct = async (
    data: ProductFormData
  ) => {
    setSubmittingProduct(true);

    try {
      const payload = {
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco,
      ativo: data.ativo,
      imcMin: data.imcMin,
      imcMax: data.imcMax,
      objetivo: data.objetivo || null,
      categoria: { id: Number(data.categoria.id) },
      foto: data.foto || null, // ← adicione essa linha
    };

      if (editingProduct) {
        const response =
          await produtoApi.update({ id: editingProduct.id, ...payload } as ProdutoPayload);

        setProducts((prev) =>
          prev.map((product) =>
            product.id === editingProduct.id
              ? response
              : product
          )
        );

        toast.success(
          'Produto atualizado com sucesso!'
        );
      } else {
        const response =
          await produtoApi.create(payload as ProdutoPayload);

        setProducts((prev) => [
          ...prev,
          response,
        ]);

        toast.success(
          'Produto criado com sucesso!'
        );
      }

      setProductModalOpen(false);
    } catch (error) {
      toast.error(
        'Erro ao salvar produto.'
      );
    } finally {
      setSubmittingProduct(false);
    }
  };

  // Delete product
  const handleConfirmDelete =
    async () => {
      if (!deletingProduct) return;

      setDeletingProductLoading(true);

      try {
        await produtoApi.delete(
          deletingProduct.id
        );

        setProducts((prev) =>
          prev.filter(
            (product) =>
              product.id !==
              deletingProduct.id
          )
        );

        toast.success(
          'Produto excluído com sucesso!'
        );

        setDeleteModalOpen(false);
      } catch (error) {
        toast.error(
          'Erro ao excluir produto.'
        );
      } finally {
        setDeletingProductLoading(false);
      }
    };

  // Create category
  const handleCreateCategory =
    async (data: {
      nome: string;
      descricao: string;
    }) => {
      setSubmittingCategory(true);

      try {
        const response =
          await categoriaApi.create(data);

        setCategories((prev) => [
          ...prev,
          response,
        ]);

        toast.success(
          'Categoria criada com sucesso!'
        );
      } catch (error) {
        toast.error(
          'Erro ao criar categoria.'
        );
      } finally {
        setSubmittingCategory(false);
      }
    };

  // Delete category
  const handleDeleteCategory =
    async (id: number) => {
      try {
        await categoriaApi.delete(id);

        setCategories((prev) =>
          prev.filter(
            (category) =>
              category.id !== id
          )
        );

        toast.success(
          'Categoria removida!'
        );
      } catch (error) {
        toast.error(
          'Erro ao remover categoria.'
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-lato">
      {/* Header */}
      <div 
        className="relative w-full pt-32 pb-20 md:pt-25 md:pb-25 bg-cover bg-center bg-no-repeat"
        style={{ 
          // Link de exemplo para os ingredientes no fundo. Você pode trocar por uma imagem local se preferir!
          backgroundImage: "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop')" 
        }}
      >
        {/* Overlay escuro para dar contraste ao texto e deixar premium */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-white/80 text-xs font-bold tracking-widest uppercase mb-2">
              PRODUTOS
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
              Nossas refeições saudáveis
            </h1>

            <p className="text-white/80 text-sm md:text-base max-w-lg font-medium mb-8">
              Explore nosso cardápio completo de refeições nutritivas, elaboradas por chefs e nutricionistas para seu bem-estar.
            </p>

            {/* Botões - agora alinhados à esquerda abaixo do texto */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleOpenCreate}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-bold shadow-sm hover:scale-105 transition-transform duration-300"
              >
                <Plus size={16} weight="bold" />
                Novo Produto
              </button>

              <button
                onClick={() => setCategoryModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-white text-white text-sm font-bold hover:bg-white/10 hover:scale-105 transition-transform duration-300"
              >
                <Plus size={16} weight="bold" />
                Categoria
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              setActiveCategoryFilter(
                'all'
              )
            }
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              activeCategoryFilter ===
              'all'
                ? 'bg-[#31502A] text-white'
                : 'bg-white border border-gray-200 text-gray-600'
            }`}
          >
            Tudo
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setActiveCategoryFilter(
                  String(cat.id)
                )
              }
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                activeCategoryFilter ===
                String(cat.id)
                  ? 'bg-[#31502A] text-white'
                  : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              {cat.nome}
            </button>
          ))}
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-800">
              {filteredProducts.length}{' '}
              produtos
            </h2>
          </div>

          <div className="flex gap-2">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlass
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                size={16}
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Buscar..."
                className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-black"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowsDownUp
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />

              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(
                    e.target
                      .value as SortOption
                  )
                }
                className="pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 text-black bg-white"
              >
                <option value="name">
                  Nome
                </option>

                <option value="price_asc">
                  Menor preço
                </option>

                <option value="price_desc">
                  Maior preço
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Products */}
        {loadingProducts ? (
          <div className="flex justify-center py-24">
            <Spinner size={40} color="#31502A" className="animate-spin" />
          </div>
        ) : filteredProducts.length ===
          0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500">
              Nenhum produto encontrado.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-12">
            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={
                    handleOpenEdit
                  }
                  onDelete={
                    handleOpenDelete
                  }
                />
              )
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <ProductModal
        isOpen={productModalOpen}
        onClose={() =>
          setProductModalOpen(false)
        }
        onSubmit={
          handleSubmitProduct
        }
        product={editingProduct}
        categories={categories}
        loading={submittingProduct}
      />

      <CategoryModal
        isOpen={categoryModalOpen}
        onClose={() =>
          setCategoryModalOpen(false)
        }
        categories={categories}
        onCreateCategory={
          handleCreateCategory
        }
        onDeleteCategory={
          handleDeleteCategory
        }
        loading={submittingCategory}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() =>
          setDeleteModalOpen(false)
        }
        onConfirm={
          handleConfirmDelete
        }
        productName={
          deletingProduct?.nome ??
          ''
        }
        loading={
          deletingProductLoading
        }
      />
    </div>
  );
};

export default Products;