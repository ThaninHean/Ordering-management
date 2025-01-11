import React, { useState } from "react";
import { menuItems } from "../mockData/products";
import ItemModal from "./detail_screen"; // Import the modal component
import ShoppingCart from "./card"; // Import the ShoppingCart component

function Overview_page() {
  const [menu, setMenu] = useState(menuItems || []);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item for modal
  const [cart, setCart] = useState([]); // Cart state

  // handle button buy
  const handleBuyNow = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id, increment) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + increment }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove items with quantity <= 0
    );
  };

  const categories = [
    { name: "Breakfast", img: "https://cdn-icons-png.flaticon.com/512/1518/1518976.png" },
    { name: "Lunch", img: "https://cdn-icons-png.flaticon.com/512/2082/2082045.png" },
    { name: "Dinner", img: "https://cdn-icons-png.flaticon.com/512/4639/4639426.png" },
    { name: "Soup", img: "https://cdn-icons-png.flaticon.com/512/395/395247.png" },
    { name: "Desserts", img: "https://cdn-icons-png.flaticon.com/512/7182/7182828.png" },
    { name: "Side Dish", img: "https://cdn-icons-png.flaticon.com/512/282/282465.png" },
    { name: "Appetizer", img: "https://cdn-icons-png.flaticon.com/512/1851/1851131.png" },
    { name: "Beverages", img: "https://cdn-icons-png.flaticon.com/512/9418/9418705.png" },
  ];

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Categories */}
          {categories.map((category) => (
            <button
              key={category.name}
              className="px-4 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all ease-in-out duration-300 flex items-center justify-center"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-6 h-6 mr-2"
              />
              {category.name}
            </button>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <input
            type="text"
            placeholder="Search Your Menu Here"
            className="w-1/3 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out duration-300"
          />
        </div>
      </header>

      <main>
        <h2 className="text-xl font-bold mb-3">Menu</h2>
        <div className="flex">
          {/* Menu Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-3/4">
            {Array.isArray(menu) && menu.length > 0 ? (
              menu.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-lg rounded-md overflow-hidden flex flex-col transform transition-transform hover:scale-105"
                  onClick={() => openModal(item)} // Open modal on item click
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h3 className="text-lg font-semibold">{item.name}</h3>

                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent modal from opening
                          handleBuyNow(item);
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No menu items available.</p>
            )}
          </div>
          {/* Shopping Cart */}
          <div className="w-1/4 pl-4">
            <div className="sticky top-6">
              <ShoppingCart cart={cart} updateQuantity={updateCartQuantity} />
            </div>
          </div>
        </div>
      </main>

      {/* Modal for item details */}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={closeModal} // Close the modal
          onBuyNow={handleBuyNow} // Handle Buy Now action
        />
      )}
    </div>
  );
}

export default Overview_page;
