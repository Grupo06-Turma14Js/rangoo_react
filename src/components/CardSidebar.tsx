import React from 'react';
import { X, Trash } from '@phosphor-icons/react';
import { useCart } from './CartContext';




const CartSidebar: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    total,
    isCartOpen,
    setIsCartOpen,
    clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed top-0 right-0 h-full w-full sm:w-105 bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold text-[#31502A]">
            Seu Carrinho
          </h2>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-400 text-sm">
              Seu carrinho está vazio.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border rounded-2xl p-3"
              >
                <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden">
                  {typeof item.foto === 'string' && (
                    <img
                      src={item.foto}
                      alt={item.nome}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">
                    {item.nome}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    Quantidade: {item.quantidade}
                  </p>

                  <p className="font-bold text-[#31502A] mt-2">
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:bg-red-50 rounded-lg p-2 h-fit"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">
              Total
            </span>

            <span className="text-2xl font-black text-[#31502A]">
              R$ {total.toFixed(2)}
            </span>
          </div>

          <button
            className="w-full py-3 rounded-2xl bg-[#31502A] text-white font-bold hover:bg-[#3d6434] transition-all"
            onClick={() => {
              alert('Compra finalizada com sucesso!');
              clearCart();
              setIsCartOpen(false);
            }}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;