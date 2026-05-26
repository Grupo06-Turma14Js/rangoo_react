import React, { useEffect, useState } from 'react';
import { X } from '@phosphor-icons/react';
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
  foto: string; 
};

const emptyForm: ProductModalFormState = {
  nome: '',
  descricao: '',
  preco: '',
  ativo: true,
  imcMin: '',
  imcMax: '',
  objetivo: '',
  foto: '',
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

  useEffect(() => {
    if (product) {
      setForm({
        nome: product.nome,
        descricao: product.descricao,
        preco: product.preco.toString(),
        ativo: product.ativo,
        imcMin: product.imcMin != null ? String(Number(product.imcMin)) : '',
        imcMax: product.imcMax != null ? String(Number(product.imcMax)) : '',
        objetivo: product.objetivo ?? '',
        foto: (product as any).foto ?? '', 
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ProductFormData = {
    nome: form.nome,
    descricao: form.descricao,
    preco: Number(form.preco),
    ativo: form.ativo,
    imcMin: form.imcMin === '' ? null : Number(form.imcMin),
    imcMax: form.imcMax === '' ? null : Number(form.imcMax),
    objetivo: form.objetivo === '' ? null : (form.objetivo as ProductFormData['objetivo']),
    categoria: { id: form.categoria.id },
    foto: form.foto || null,
  };

  console.log('2. payload do modal:', payload); // ← e aqui
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
          
          {/* URL da Imagem */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              URL da Foto (Link da Imagem)
            </label>
            <input
              type="url"
              name="foto"
              value={form.foto}
              onChange={handleChange}
              placeholder="Cole o link da imagem aqui..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#31502A]/30 focus:border-[#31502A] text-sm"
            />
            {/* Pré-visualização da imagem caso o link seja inserido */}
            {form.foto && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Pré-visualização:</p>
              <img
                src={`${form.foto}?t=${Date.now()}`}
                alt="Preview do link inserido"
                className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.onerror = null;
                  img.style.display = 'none';
                  const msg = img.nextElementSibling as HTMLElement;
                  if (msg) msg.style.display = 'block';
                }}
              />
              <p className="text-xs text-red-500 mt-1" style={{ display: 'none' }}>
                Link inválido ou imagem não encontrada.
              </p>
            </div>
            )}
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