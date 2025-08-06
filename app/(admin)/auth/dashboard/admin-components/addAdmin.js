"use client";

import { useState } from "react";

export default function AddAdminForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const validate = () => {
  const newErrors = {};
  const emailRegex = /^\S+@\S+\.\S+$/;
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (!formData.name.trim()) newErrors.name = "Name is required";

  if (!formData.email.trim()) newErrors.email = "Email is required";
  else if (!emailRegex.test(formData.email))
    newErrors.email = "Invalid email address";

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else {
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    else if (!symbolRegex.test(formData.password))
      newErrors.password = "Password must include at least one symbol";
  }

  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  return newErrors;
};


const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    const newAdmin = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdmin),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      // Optional callback to parent
      onAdd?.({
        id: Date.now(),
        ...newAdmin,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setSuccess("Admin successfully added.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setErrors({ api: error.message });
    }
  }
};

  return (
    <div className="w-full md:w-[600px] bg-white rounded shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create An Admin
          </button>
          {success && <p className="text-green-600 mt-2">{success}</p>}
        </div>
      </form>
    </div>
  );
}
