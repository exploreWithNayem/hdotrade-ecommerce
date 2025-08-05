"use client";

import { useState } from "react";
import AddAdminForm from "../admin-components/addAdmin";

export default function AdminPage() {
  const [admins, setAdmins] = useState([
    { id: 1, username: "admin1", email: "admin1@example.com" },
    { id: 2, username: "admin2", email: "admin2@example.com" },
  ]);


  const handleDelete = (id) => {
    const filtered = admins.filter((admin) => admin.id !== id);
    setAdmins(filtered);
  };

  const handleEdit = (id) => {
    alert("Edit admin with ID: " + id);
    // You can open a modal or navigate to an edit page
  };


 

    const handleAddAdmin = (admin) => {
      setAdmins((prev) => [...prev, admin]);
    };
  return (
    <div className="relative md:ml-64 bg-blueGray-100">
      <div className="flex flex-col md:flex-row gap-8 p-6 mt-20">
        {/* Right Panel (Admin List) */}
        <div className="w-full md:w-2/3 bg-white rounded shadow p-6 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Admin List</h2>
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{admin.username}</td>
                  <td className="px-4 py-2 border">{admin.email}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleEdit(admin.id)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <AddAdminForm onAdd={handleAddAdmin} />
      </div>
    </div>
  );
}
