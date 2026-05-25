// src/components/products/ProductModal.tsx

import React, { useEffect, useState, useRef } from 'react';
import { X, UploadSimple, Image as ImageIcon, Trash } from '@phosphor-icons/react';
import type { Category, Product, ProductFormData } from '../../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => Promise<void>;
  product?: Product | null;
  categories: Category[];
  loading?: boolean;
}

const OBJECTIVES = [
  { label: 'Emagrecimento', value: 'emagrecimento' },
  { label: 'Ganho de Massa', value: 'ganho-massa' },
  { label: 'Diabético', value: 'diabetico' },
  { label: 'Sem Lactose', value: 'sem-lactose' },
  { label: 'Sem Glúten', value: 'sem-gluten' },
];

type ProductModalFormState = Omit<
  ProductFormData,
  'preco' | 'imcMin' | 'imcMax' | 'objetivo'
> & {
  preco: string;
  imcMin: string;
  imcMax: string;
  objetivo: string;
  foto: string; // Adicionado campo de foto (Base64 ou URL)
};

const emptyForm: ProductModalFormState = {
  nome: '',
  descricao: '',
  preco: '',
  ativo: true,
  imcMin: '',
  imcMax: '',
  objetivo: '',
  foto: '', // Inicializando vazio
  categoria: {
    id: 0,
  },
};

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
  categories,
  loading = false,
}) => {
  const [form, setForm] = useState<ProductModalFormState>(emptyForm);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setForm({
        nome: product.nome,
        descricao: product.descricao,
        preco: product.preco.toString(),
        ativo: product.ativo,
        imcMin: product.imcMin?.toString() ?? '',
        imcMax: product.imcMax?.toString() ?? '',
        objetivo: product.objetivo ?? '',
        foto: (product as any).foto ?? '', // Puxando a foto caso exista no produto editado
        categoria: product.categoria?.id
          ? { id: product.categoria.id }
          : { id: 0 },
      });
    } else {
      setForm(emptyForm);
    }
  }, [product, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (name === 'categoria') {
      setForm((prev) => ({
        ...prev,
        categoria: {
          id: Number(value),
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Função para lidar com o upload da imagem e converter para Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          foto: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para remover a imagem atual
  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, foto: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ProductFormData = {
      nome: form.nome,
      descricao: form.descricao,
      preco: Number(form.preco),
      ativo: form.ativo,
      imcMin: form.imcMin === '' ? null : Number(form.imcMin),
      imcMax: form.imcMax === '' ? null : Number(form.imcMax),
      objetivo:
        form.objetivo === '' ? null : (form.objetivo as ProductFormData['objetivo']),
      categoria: {
        id: form.categoria.id,
      },
      // Aqui enviamos a foto (se o seu backend esperar outro nome, altere aqui)
      ...(form.foto && { foto: form.foto }),
    };

    console.log(payload);

    await onSubmit(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10 animate-modal-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-[#31502A]">
              {product ? 'Editar Produto' : 'Adicionar Produto'}
            </h2>

            <p className="text-sm text-gray-400 mt-0.5">
              {product
                ? 'Atualize as informações do produto'
                : 'Preencha os dados do novo produto'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Upload de Imagem */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Imagem do Produto
            </label>
            
            <div className="flex items-center gap-4">
              {form.foto ? (
                <div className="relative w-24 h-24 rounded-xl border border-gray-200 overflow-hidden group">
                  <img 
                    src={form.foto} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash size={20} className="text-white" weight="fill" />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-[#31502A] hover:border-[#31502A] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <ImageIcon size={24} weight="regular" />
                  <span className="text-[10px] font-semibold mt-1 uppercase tracking-wider">Upload</span>
                </div>
              )}
              
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <UploadSimple size={16} />
                  Escolher imagem
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  Formatos aceitos: JPG, PNG, WEBP. Tamanho max: 2MB.
                </p>
              </div>
            </div>
          </div>

          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              placeholder="Nome do produto"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#31502A]/30 focus:border-[#31502A] text-sm"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Descrição
            </label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Descrição do produto..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#31502A]/30 focus:border-[#31502A] text-sm resize-none"
            />
          </div>

          {/* Preço + Categoria */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Preço
              </label>
              <input
                type="number"
                name="preco"
                value={form.preco}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                placeholder="29.90"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#31502A]/30 focus:border-[#31502A] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Categoria
              </label>
              <select
                name="categoria"
                value={form.categoria.id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#31502A]/30 focus:border-[#31502A] text-sm"
              >
                <option value="">Selecionar...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* IMC */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                IMC Mínimo
              </label>
              <input
                type="number"
                name="imcMin"
                value={form.imcMin}
                onChange={handleChange}
                step="0.1"
                min="0"
                placeholder="18.5"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#31502A]/30 focus:border-[#31502A] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                IMC Máximo
              </label>
              <input
                type="number"
                name="imcMax"
                value={form.imcMax}
                onChange={handleChange}
                step="0.1"
                min="0"
                placeholder="24.9"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#31502A]/30 focus:border-[#31502A] text-sm"
              />
            </div>
          </div>

          {/* Objetivo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Objetivo
            </label>
            <select
              name="objetivo"
              value={form.objetivo}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#31502A]/30 focus:border-[#31502A] text-sm"
            >
              <option value="">Selecionar objetivo...</option>
              {OBJECTIVES.map((obj) => (
                <option key={obj.value} value={obj.value}>
                  {obj.label}
                </option>
              ))}
            </select>
          </div>

          {/* Ativo */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Produto Ativo
              </p>
              <p className="text-xs text-gray-400">
                Produto disponível para venda
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="ativo"
                checked={form.ativo}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#31502A]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#31502A]" />
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#31502A] text-white text-sm font-semibold hover:bg-[#3d6434] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
              ) : null}
              {product ? 'Salvar Alterações' : 'Adicionar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;