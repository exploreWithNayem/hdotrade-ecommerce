"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import JoditRich from "./RichText";
import { getProductById } from "@/database/queries";

export default function AddUpdate({ updateId = false }) {
  console.log("update...", updateId);

  const [form, setForm] = useState({
    name: "",
    image: "", // Now a single string for the image URL
    priceUSD: "",
    priceEUR: "",
    discountUSD: "",
    discountEUR: "",
    reviewsNumber: "",
    ratings: "",
    manufacturerId: "",
    categoryId: "",
    description: "",
    sizes: [],
    colors: [],
    quantity: "",
    visibility: "public",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoading, setIsLoading] = useState(!!updateId);
  const [featuresInput, setFeaturesInput] = useState("");

  const MAX_IMAGE_SIZE_MB = 1;
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_imageBB_key;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("details.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        details: { ...prev.details, [key]: value },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (updateId) {
      const fetchProduct = async () => {
        try {
          const product = await getProductById(updateId);

          console.log("product....", product);

          setForm({
            name: product.name,
            image: product.image,
            priceUSD: product.price?.usd?.toString() || "",
            priceEUR: product.price?.eur?.toString() || "",
            discountUSD: product.discountPrice?.usd?.toString() || "",
            discountEUR: product.discountPrice?.eur?.toString() || "",
            reviewsNumber: product.reviewsNumber?.toString() || "0",
            ratings: product.ratings?.toString() || "0",
            manufacturerId: product.manufacturerId?.toString() || "",
            categoryId: product.categoryId?.toString() || "",
            description: product.description || "",
            sizes: product.sizes || [],
            colors: product.colors || [],
            quantity: product.quantity?.toString() || "0",
            visibility: product.visibility || "public",
            features: product.features || [],
            sku: product.sku || "",
          });

          if (product.image) {
            setImagePreview(product.image);
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to load product data");
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    }
  }, [updateId]);

  useEffect(() => {
    async function fetchManufacturers() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-manufacture`
        );
        if (!res.ok) throw new Error("Failed to fetch manufacturers");
        const data = await res.json();
        setManufacturers(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchManufacturers();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-categories`
        );
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      alert(`Image size exceeds ${MAX_IMAGE_SIZE_MB}MB limit`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImageFile(file);
    setImagePreview(previewUrl);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setForm((prev) => ({ ...prev, image: "" }));
  };

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return data.data.url; // Return the image URL from ImgBB
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = form.image;

      // Upload image to ImgBB if a new one was selected
      if (imageFile) {
        imageUrl = await uploadImageToImgBB(imageFile);
      }

      // Prepare the product data with image URL
      const productData = {
        ...form,
        image: imageUrl,
        price: {
          usd: form.priceUSD,
          eur: form.priceEUR,
        },
        discountPrice: {
          usd: form.discountUSD || undefined,
          eur: form.discountEUR || undefined,
        },
        isActive: true,
      };

      // Determine the API endpoint and method based on updateId
      const endpoint = updateId
        ? `/api/update-product?id=${updateId}`
        : "/api/add-product";

      const method = updateId ? "PUT" : "POST";

      // Send the product data to your API
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success(
          updateId
            ? "Product updated successfully!"
            : "Product added successfully!",
          { position: "bottom-right" }
        );

        // Reset form after successful submission if it's a create operation
        if (!updateId) {
          setForm({
            name: "",
            image: "",
            priceUSD: "",
            priceEUR: "",
            discountUSD: "",
            discountEUR: "",
            reviewsNumber: "0",
            ratings: "0",
            manufacturerId: "",
            categoryId: "",
            description: "",
            sizes: [],
            colors: [],
            quantity: "0",
            visibility: "public",
            features: [],
            sku: "",
          });
          setImageFile(null);
          setImagePreview("");
        }
      } else {
        throw new Error(data?.message || "Error processing product");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message || "An error occurred while submitting the form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const Label = ({ children, required }) => (
    <label className="block text-sm font-medium mb-1">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl text-[#0eadef]  font-bold mb-6">
        {" "}
        {updateId ? "Update Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label required>Name</Label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <Label required>Image</Label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-2 rounded"
          />

          {imagePreview && (
            <div className="mt-4">
              <div className="relative w-48 h-48">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label required>Price (USD)</Label>
            <input
              type="number"
              name="priceUSD"
              required
              value={form.priceUSD}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <Label required>Price (EUR)</Label>
            <input
              type="number"
              name="priceEUR"
              required
              value={form.priceEUR}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <Label>Discount (USD)</Label>
            <input
              type="number"
              name="discountUSD"
              value={form.discountUSD}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <Label>Discount (EUR)</Label>
            <input
              type="number"
              name="discountEUR"
              value={form.discountEUR}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div>
          <Label required>Description</Label>
          <JoditRich setForm={setForm} form={form} />
        </div>

        <div>
          <Label>Manufacturer</Label>
          <select
            name="manufacturerId"
            value={form.manufacturerId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select manufacturer</option>
            {manufacturers.map((manu) => (
              <option key={manu._id} value={manu._id}>
                {manu.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label>Category</Label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label required>Visibility</Label>
          <select
            name="visibility"
            required
            value={form.visibility}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label required>Quantity</Label>
            <input
              type="number"
              name="quantity"
              required
              value={form.quantity}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#0eadef] text-white px-4 py-2 rounded hover:bg-[#049cde] disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import JoditRich from "./RichText";
// import { getProductById } from "@/database/queries";

// export default function AddUpdate({ updateId = false }) {
//   const [form, setForm] = useState({
//     name: "",
//     image: "",
//     priceUSD: "",
//     priceEUR: "",
//     discountUSD: "",
//     discountEUR: "",
//     reviewsNumber: "0",
//     ratings: "0",
//     manufacturerId: "",
//     categoryId: "",
//     description: "",
//     sizes: [],
//     colors: [],
//     quantity: "0",
//     visibility: "public",
//     features: [],
//     sku: "",
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [manufacturers, setManufacturers] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoading, setIsLoading] = useState(!!updateId);
//   const [featuresInput, setFeaturesInput] = useState("");

//   const MAX_IMAGE_SIZE_MB = 1;
//   const IMGBB_API_KEY = process.env.NEXT_PUBLIC_imageBB_key;

//   // Fetch product data when updateId exists
//   useEffect(() => {
//     if (updateId) {
//       const fetchProduct = async () => {
//         try {
//           const res = await fetch(
//             `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-product?id=${updateId}`
//           );
//           if (!res.ok) throw new Error("Failed to fetch product");
//           const product = await res.json();

//           setForm({
//             name: product.name,
//             image: product.image,
//             priceUSD: product.price?.usd?.toString() || "",
//             priceEUR: product.price?.eur?.toString() || "",
//             discountUSD: product.discountPrice?.usd?.toString() || "",
//             discountEUR: product.discountPrice?.eur?.toString() || "",
//             reviewsNumber: product.reviewsNumber?.toString() || "0",
//             ratings: product.ratings?.toString() || "0",
//             manufacturerId: product.manufacturerId?.toString() || "",
//             categoryId: product.categoryId?.toString() || "",
//             description: product.description || "",
//             sizes: product.sizes || [],
//             colors: product.colors || [],
//             quantity: product.quantity?.toString() || "0",
//             visibility: product.visibility || "public",
//             features: product.features || [],
//             sku: product.sku || "",
//           });

//           if (product.image) {
//             setImagePreview(product.image);
//           }
//         } catch (err) {
//           console.error(err);
//           toast.error("Failed to load product data");
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchProduct();
//     }
//   }, [updateId]);

//   // Fetch manufacturers and categories
//   useEffect(() => {
//     async function fetchManufacturers() {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-manufacture`
//         );
//         if (!res.ok) throw new Error("Failed to fetch manufacturers");
//         const data = await res.json();
//         setManufacturers(data);
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     async function fetchCategories() {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-categories`
//         );
//         if (!res.ok) throw new Error("Failed to fetch categories");
//         const data = await res.json();
//         setCategories(data);
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     fetchManufacturers();
//     fetchCategories();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
//       toast.error(`Image size exceeds ${MAX_IMAGE_SIZE_MB}MB limit`);
//       return;
//     }

//     const previewUrl = URL.createObjectURL(file);
//     setImageFile(file);
//     setImagePreview(previewUrl);
//   };

//   const handleRemoveImage = () => {
//     setImageFile(null);
//     setImagePreview("");
//     setForm((prev) => ({ ...prev, image: "" }));
//   };

//   const handleAddFeature = () => {
//     if (featuresInput.trim() && !form.features.includes(featuresInput.trim())) {
//       setForm((prev) => ({
//         ...prev,
//         features: [...prev.features, featuresInput.trim()],
//       }));
//       setFeaturesInput("");
//     }
//   };

//   const handleRemoveFeature = (index) => {
//     setForm((prev) => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index),
//     }));
//   };

//   const uploadImageToImgBB = async (imageFile) => {
//     const formData = new FormData();
//     formData.append("image", imageFile);

//     try {
//       const response = await fetch(
//         `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) throw new Error("Image upload failed");
//       const data = await response.json();
//       return data.data.url;
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       let imageUrl = form.image;

//       // Upload new image if selected
//       if (imageFile) {
//         imageUrl = await uploadImageToImgBB(imageFile);
//       }

//       // Prepare product data
//       const productData = {
//         name: form.name,
//         image: imageUrl,
//         price: {
//           usd: parseFloat(form.priceUSD),
//           eur: parseFloat(form.priceEUR),
//         },
//         discountPrice: {
//           usd: form.discountUSD ? parseFloat(form.discountUSD) : undefined,
//           eur: form.discountEUR ? parseFloat(form.discountEUR) : undefined,
//         },
//         reviewsNumber: parseInt(form.reviewsNumber),
//         ratings: parseFloat(form.ratings),
//         manufacturerId: form.manufacturerId,
//         categoryId: form.categoryId,
//         description: form.description,
//         sizes: form.sizes,
//         colors: form.colors,
//         quantity: parseInt(form.quantity),
//         visibility: form.visibility,
//         features: form.features,
//         sku: form.sku,
//         isActive: true,
//       };

//       // Determine API endpoint and method based on updateId
//       const url = updateId
//         ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/update-product?id=${updateId}`
//         : `${process.env.NEXT_PUBLIC_SITE_URL}/api/add-product`;

//       const method = updateId ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(productData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success(
//           updateId
//             ? "Product updated successfully!"
//             : "Product added successfully!",
//           { position: "bottom-right" }
//         );

//         // Reset form if it was an add operation
//         if (!updateId) {
//           setForm({
//             name: "",
//             image: "",
//             priceUSD: "",
//             priceEUR: "",
//             discountUSD: "",
//             discountEUR: "",
//             reviewsNumber: "0",
//             ratings: "0",
//             manufacturerId: "",
//             categoryId: "",
//             description: "",
//             sizes: [],
//             colors: [],
//             quantity: "0",
//             visibility: "public",
//             features: [],
//             sku: "",
//           });
//           setImageFile(null);
//           setImagePreview("");
//         }
//       } else {
//         throw new Error(data?.message || "Operation failed");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error(error.message || "An error occurred");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const Label = ({ children, required }) => (
//     <label className="block text-sm font-medium mb-1">
//       {children} {required && <span className="text-red-500">*</span>}
//     </label>
//   );

//   if (isLoading) {
//     return (
//       <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-10">
//         <h2 className="text-2xl text-[#0eadef] font-bold mb-6">Edit Product</h2>
//         <div className="text-center py-10">Loading product data...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-10">
//       <h2 className="text-2xl text-[#0eadef] font-bold mb-6">
//         {updateId ? "Edit Product" : "Add Product"}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Label required>Product Name</Label>
//             <input
//               type="text"
//               name="name"
//               required
//               value={form.name}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <Label>SKU</Label>
//             <input
//               type="text"
//               name="sku"
//               value={form.sku}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               placeholder="Leave blank to auto-generate"
//             />
//           </div>
//         </div>

//         <div>
//           <Label>Product Image</Label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="w-full border p-2 rounded"
//           />
//           {imagePreview && (
//             <div className="mt-4">
//               <div className="relative w-48 h-48">
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   className="w-full h-full object-cover rounded border"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleRemoveImage}
//                   className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Label required>Price (USD)</Label>
//             <input
//               type="number"
//               name="priceUSD"
//               required
//               min="0"
//               step="0.01"
//               value={form.priceUSD}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//           <div>
//             <Label required>Price (EUR)</Label>
//             <input
//               type="number"
//               name="priceEUR"
//               required
//               min="0"
//               step="0.01"
//               value={form.priceEUR}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//           <div>
//             <Label>Discount Price (USD)</Label>
//             <input
//               type="number"
//               name="discountUSD"
//               min="0"
//               step="0.01"
//               value={form.discountUSD}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//           <div>
//             <Label>Discount Price (EUR)</Label>
//             <input
//               type="number"
//               name="discountEUR"
//               min="0"
//               step="0.01"
//               value={form.discountEUR}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//         </div>

//         <div>
//           <Label required>Description</Label>
//           <JoditRich
//             value={form.description}
//             onChange={(content) =>
//               setForm((prev) => ({ ...prev, description: content }))
//             }
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Label>Manufacturer</Label>
//             <select
//               name="manufacturerId"
//               value={form.manufacturerId}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select manufacturer</option>
//               {manufacturers.map((manu) => (
//                 <option key={manu._id} value={manu._id}>
//                   {manu.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <Label>Category</Label>
//             <select
//               name="categoryId"
//               value={form.categoryId}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <Label>Reviews Count</Label>
//             <input
//               type="number"
//               name="reviewsNumber"
//               min="0"
//               value={form.reviewsNumber}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//           <div>
//             <Label>Rating (0-5)</Label>
//             <input
//               type="number"
//               name="ratings"
//               min="0"
//               max="5"
//               step="0.1"
//               value={form.ratings}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//           <div>
//             <Label required>Quantity</Label>
//             <input
//               type="number"
//               name="quantity"
//               required
//               min="0"
//               value={form.quantity}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//         </div>

//         <div>
//           <Label>Product Features</Label>
//           <div className="flex gap-2 mb-2">
//             <input
//               type="text"
//               value={featuresInput}
//               onChange={(e) => setFeaturesInput(e.target.value)}
//               className="flex-1 border p-2 rounded"
//               placeholder="Add product feature"
//             />
//             <button
//               type="button"
//               onClick={handleAddFeature}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Add
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {form.features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
//               >
//                 <span>{feature}</span>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveFeature(index)}
//                   className="ml-2 text-red-500"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <Label required>Visibility</Label>
//           <select
//             name="visibility"
//             required
//             value={form.visibility}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           >
//             <option value="public">Public (Visible to everyone)</option>
//             <option value="private">Private (Hidden from store)</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="bg-[#0eadef] text-white px-6 py-2 rounded hover:bg-[#049cde] disabled:bg-blue-300 transition-colors"
//           disabled={isSubmitting}
//         >
//           {isSubmitting
//             ? updateId
//               ? "Updating..."
//               : "Creating..."
//             : updateId
//             ? "Update Product"
//             : "Create Product"}
//         </button>
//       </form>
//     </div>
//   );
// }
