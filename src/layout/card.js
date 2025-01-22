import React, { useEffect } from "react";

function ShoppingCart({ cart, updateQuantity }) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalPrice = subtotal;

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className=" ml-3 bg-gray-200 p-3 rounded-md shadow-md max-h-screen sm:max-h-[75vh] md:max-h-[80vh] lg:max-h-[90vh] overflow-auto">
      <div className="flex justify-between items-center">
      <h2 className="text-lg font-bold mb-4 text-center sm:text-left">Shopping Cart</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Create Order</button>

      </div>
      <hr className="my-1" />
      {cart.length === 0 ? (
        <p className="text-center mt-10">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {/* Cart Items */}
          <ul className="max-h-64 sm:max-h-80 overflow-y-auto space-y-2">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-2 rounded shadow space-y-4 sm:space-y-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 sm:ml-4 text-center sm:text-left">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Order Summary */}
      {cart.length > 0 && (
        <div className="mt-6 space-y-4 bg-white p-5 rounded shadow">
          <ul className="space-y-2">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center text-sm sm:text-base"
              >
                <span className="truncate w-1/3 text-center sm:text-left">
                  {item.name}
                </span>
                <span className="w-1/3 text-center">x {item.quantity}</span>
                <span className="w-1/3 text-center sm:text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="bg-blue-500 text-white w-full py-2 rounded mt-4 hover:bg-blue-600 transition">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
