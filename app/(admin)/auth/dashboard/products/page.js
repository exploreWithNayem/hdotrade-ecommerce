"use client";

import { getProducts } from "@/database/queries";
import Image from "next/image";
import { useEffect, useState } from "react";
import placeholder from "@/public/client/banner/placeholder.png";
export default function AllProducts() {
  const [products, setProducts] = useState([]);


  const handleEdit = (id) => {
    alert("Edit product with ID: " + id);
  };

  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };



  useEffect(() => {
    const productsFetch = async () => {
      try {
     
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    productsFetch();
  }, []);

  console.log('products here..', products)

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
                  <td className="px-4 py-2 border flex justify-center">
                    <Image
                      src={product?.image || placeholder}
                      alt={product?.name}
                      width={80}
                      height={80}
                    />
                  </td>
                  <td className="px-4 py-2 border font-medium">
                    {product?.name}
                  </td>
                  <td className="px-4 py-2 border">
                    {product?.manufacturerId}
                  </td>
                  <td className="px-4 py-2 border text-green-600 font-semibold">
                    ${product?.price?.usd}
                  </td>
                  <td className="px-4 py-2 border text-blue-600 font-semibold">
                    €{product?.price?.eur}
                  </td>
                  <td className="px-4 py-2 border">{product?.quantity}</td>
                  <td className="px-4 py-2 border">{product?.categoryId}</td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center gap-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(product?._id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition"
                      >
                        ✏️ Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(product?._id)}
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
