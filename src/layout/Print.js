import React, { useState, useRef } from "react";

function App() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    customerName: "",
    customerAddress: "",
    customerContact: "",
    taxRate: 0,
    items: [],
  });

  const [currentItem, setCurrentItem] = useState({
    description: "",
    quantity: 1,
    unitPrice: 0,
  });

  const invoiceRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { ...currentItem, total: currentItem.quantity * currentItem.unitPrice }],
    });
    setCurrentItem({ description: "", quantity: 1, unitPrice: 0 });
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (invoiceData.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const printInvoice = () => {
    const originalContent = document.body.innerHTML;
    const printContent = invoiceRef.current.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload page to reset to original state
  };

  return (
    <div className="p-6 max-w-4xl mx-auto shadow-blue-800 border-[5px]">
      <h1 className="text-2xl font-bold mb-4">Invoice</h1>
      <div className="form mb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            className="border rounded p-2"
            value={invoiceData.invoiceNumber}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            className="border rounded p-2"
            value={invoiceData.customerName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="customerAddress"
            placeholder="Customer Address"
            className="border rounded p-2"
            value={invoiceData.customerAddress}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="customerContact"
            placeholder="Customer Contact"
            className="border rounded p-2"
            value={invoiceData.customerContact}
            onChange={handleInputChange}
          />
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="border rounded p-2"
            value={currentItem.description}
            onChange={handleItemChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="border rounded p-2"
            value={currentItem.quantity}
            onChange={handleItemChange}
          />
          <input
            type="number"
            name="unitPrice"
            placeholder="Unit Price"
            className="border rounded p-2"
            value={currentItem.unitPrice}
            onChange={handleItemChange}
          />
        </div>
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Add Item
        </button>

        <div className="mt-6">
          <label className="block mb-1">Tax Rate (%)</label>
          <input
            type="number"
            name="taxRate"
            placeholder="Tax Rate (%)"
            className="border rounded p-2 w-full"
            value={invoiceData.taxRate}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="invoice " ref={invoiceRef}>
        <h2 className="text-xl font-semibold mb-4">Invoice Preview</h2>
        <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
        <p><strong>Customer:</strong> {invoiceData.customerName}</p>
        <p><strong>Address:</strong> {invoiceData.customerAddress}</p>
        <p><strong>Contact:</strong> {invoiceData.customerContact}</p>

        <table className="table-auto w-full mt-4 border-collapse border border-gray-200">
          <thead>
            <tr className=" bg-orange-400">
              <th className="border border-gray-300 p-2 text-left">Description</th>
              <th className="border border-gray-300 p-2 text-right">Quantity</th>
              <th className="border border-gray-300 p-2 text-right">Unit Price</th>
              <th className="border border-gray-300 p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="border border-gray-600">
            {invoiceData.items.map((item, index) => (
              <tr key={index} className="border-[2px]">
                <td className="border-[1px] border-gray-300 p-2 ">{item.description}</td>
                <td className="border-[1px] border-gray-300 p-2 text-right">{item.quantity}</td>
                <td className="border-[1px] border-gray-300 p-2 text-right">${item.unitPrice}</td>
                <td className="border-[1px] border-gray-300 p-2 text-right">${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-right">
          <p className="   text-lg"><strong>Subtotal:</strong> ${calculateSubtotal().toFixed(2)}</p>
          <p className=""><strong>Tax:</strong> ${calculateTax().toFixed(2)}</p>
          <p className="bg-orange-400 float-right text-center text-lg"><strong>Total:</strong> ${calculateTotal().toFixed(2)}</p>
        </div>
      </div>

      <button
        onClick={printInvoice}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
      >
        Print Invoice
      </button>
    </div>
  );
}

export default App;
