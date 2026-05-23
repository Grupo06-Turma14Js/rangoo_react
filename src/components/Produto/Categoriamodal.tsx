
import React, { useState } from 'react';
import { X, Trash, Plus } from '@phosphor-icons/react';
import type { Category } from '../../types';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onCreateCategory: (data: {
    nome: string;
    descricao: string;
  }) => Promise<void>;
  onDeleteCategory: (id: number) => Promise<void>;
  loading?: boolean;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  categories,
  onCreateCategory,
  onDeleteCategory,
  loading = false,
}) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !descricao.trim()) return;

    await onCreateCategory({
      nome: nome.trim(),
      descricao: descricao.trim(),
    });

    setNome('');
    setDescricao('');
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);

    try {
      await onDeleteCategory(id);
    } finally {
      setDeletingId(null);
    }
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
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 animate-modal-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-[#31502A]">
              Gerenciar Categorias
            </h2>

            <p className="text-sm text-gray-400 mt-0.5">
              {categories.length} categorias cadastradas
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Form */}
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome da categoria..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#31502A]/30 focus:border-[#31502A] text-gray-800 placeholder-gray-300 text-sm transition"
            />

            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição da categoria..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#31502A]/30 focus:border-[#31502A] text-gray-800 placeholder-gray-300 text-sm transition resize-none"
            />

            <button
              type="submit"
              disabled={
                loading ||
                !nome.trim() ||
                !descricao.trim()
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#31502A] text-white hover:bg-[#3d6434] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
            >
              <Plus size={18} weight="bold" />

              {loading ? 'Criando...' : 'Adicionar Categoria'}
            </button>
          </form>

          {/* Category list */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {categories.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                Nenhuma categoria cadastrada ainda.
              </div>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {cat.nome}
                    </p>

                    <p className="text-xs text-gray-400 mt-0.5">
                      {cat.descricao}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(cat.id)}
                    disabled={deletingId === cat.id}
                    className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {deletingId === cat.id ? (
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-red-400/40 border-t-red-400 rounded-full" />
                    ) : (
                      <Trash size={16} />
                    )}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={onClose}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;