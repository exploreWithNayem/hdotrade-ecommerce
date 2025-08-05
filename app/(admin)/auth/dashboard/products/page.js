
"use client";

import { useState } from "react";

export default function AllProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      image: "/products/headphones.jpg",
      priceUSD: 99,
      priceEUR: 89,
      stock: 25,
      category: "Electronics",
      manufacturer: "Sony",
    },
    {
      id: 2,
      name: "Smart Watch",
      image: "/products/watch.jpg",
      priceUSD: 199,
      priceEUR: 180,
      stock: 12,
      category: "Wearables",
      manufacturer: "Apple",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      image: "/products/mouse.jpg",
      priceUSD: 49,
      priceEUR: 44,
      stock: 70,
      category: "Accessories",
      manufacturer: "Logitech",
    },
  ]);

  const handleEdit = (id) => {
    alert("Edit product with ID: " + id);
  };

  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="relative md:ml-64 bg-blueGray-100 mt-[40px]">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-light text-[#0eadef] mb-6">
          All Products
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 border">Image</th>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Manufacturer</th>
                <th className="px-4 py-3 border">Price (USD)</th>
                <th className="px-4 py-3 border">Price (EUR)</th>
                <th className="px-4 py-3 border">Stock</th>
                <th className="px-4 py-3 border">Category</th>
                <th className="px-4 py-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-4 py-2 border">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border font-medium">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 border">{product.manufacturer}</td>
                  <td className="px-4 py-2 border text-green-600 font-semibold">
                    ${product.priceUSD}
                  </td>
                  <td className="px-4 py-2 border text-blue-600 font-semibold">
                    €{product.priceEUR}
                  </td>
                  <td className="px-4 py-2 border">{product.stock}</td>
                  <td className="px-4 py-2 border">{product.category}</td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center gap-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition"
                      >
                        ✏️ Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 transition"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
