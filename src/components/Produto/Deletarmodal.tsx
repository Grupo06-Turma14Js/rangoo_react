import React from 'react';
import { Trash, X } from '@phosphor-icons/react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  productName: string;
  loading?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm z-10 text-center animate-modal-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="p-8">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <Trash
              size={26}
              className="text-red-500"
              weight="fill"
            />
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            Excluir Produto
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-6">
            Tem certeza que deseja excluir{' '}
            <span className="font-semibold text-gray-700">
              "{productName}"
            </span>
            ? Esta ação não poderá ser desfeita.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              Cancelar
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
              ) : null}

              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;