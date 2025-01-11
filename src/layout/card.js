import React from "react";

function ShoppingCart({ cart, updateQuantity }) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-300 p-2 rounded-md shadow-lg max-h-100">
      <h2 className="text-lg font-bold mb-2">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-white p-2 rounded shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-4">
          <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
