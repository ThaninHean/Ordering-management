import React from "react";

const ItemModal = ({ item, onClose, onBuyNow }) => {
  if (!item) return null; // Don't render modal if there's no selected item

  return (
    <div
      className="fixed inset-0 mt-10 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-sm max-w-xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside modal
      >
        {/* Image Section */}
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-72 object-cover"
          />
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-2 text-white text-2xl  hover:text-white-500 transition bg-slate-400 rounded-full w-9 h-9 flex items-center justify-center"
          >
            X
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Item Name */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {item.name}
          </h2>

          {/* Price */}
          <span className="text-xl font-semibold text-green-600">
            ${item.price.toFixed(2)}
          </span>

          {/* Description */}
          <p className="text-gray-600​​  mt-4 mb-6 text-justify leading-relaxed">
            {item.descriptions}
          </p>

          {/* Buy Now Button */}
          <button
            onClick={() => {
              onBuyNow(item);
              onClose(); // Close modal after purchase
            }}
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
