import React from 'react';
import {
  PencilSimple,
  Trash,
} from '@phosphor-icons/react';
import type { Product } from '../../types';
import { useCart } from '../CartContext';
import { session } from '../../services/api';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const { addToCart } = useCart();

  const usuario = session.getUsuario();
  const isAdmin = usuario != null && 'tipo' in usuario && usuario.tipo === 'admin';

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.preco);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-1 flex flex-col">
      <div className="relative h-44 bg-linear-to-br from-[#31502A]/10 to-[#31502A]/5 flex items-center justify-center">

        {product.foto ? (
          <img
            src={product.foto}
            alt={`Foto de ${product.nome}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-5xl">🥗</span>
        )}

        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#31502A] text-white text-xs font-semibold shadow">
          {product.categoria.nome}
        </span>

        {product.ativo && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-400 text-amber-900 text-xs font-bold shadow">
            Destaque
          </span>
        )}

        {isAdmin && (
          <div className="absolute bottom-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(product)}
              className="p-2 rounded-full bg-white shadow-md text-[#31502A] hover:bg-[#31502A] hover:text-white transition-colors"
            >
              <PencilSimple size={14} weight="bold" />
            </button>

            <button
              onClick={() => onDelete(product)}
              className="p-2 rounded-full bg-white shadow-md text-red-400 hover:bg-red-500 hover:text-white transition-colors"
            >
              <Trash size={14} weight="bold" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">
          {product.nome}
        </h3>

        <p className="text-xs text-gray-400 line-clamp-3 mb-4 flex-1">
          {product.descricao}
        </p>

        {product.objetivo && (
          <div className="mb-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#31502A]/10 text-[#31502A] font-medium">
              {product.objetivo}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-lg font-black text-gray-800">
            {formattedPrice}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="px-4 py-1.5 rounded-xl bg-[#31502A] text-white text-xs font-bold hover:bg-[#3d6434] hover:scale-105 transition-all active:scale-95"
          >
            Pedir Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;