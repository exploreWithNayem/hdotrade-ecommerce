"use client";
import CheckoutForm from "./CheckoutForm";
import CartedItem from "./CartedItem";
import { useState, useRef } from "react";
import { clearCardlist, placeOrder } from "@/database/queries";
import { toast } from "react-toastify";
import { serverRevalidate } from "@/utils/serverRev";
import { useRouter } from "next/navigation";

export default function ControllCheckout({ summery, langCode }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    region: "",
    address: "",
    city: "",
    phone: "",
    email: "",
  });
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process form data here
    if (formRef.current.checkValidity()) {
      const order = await placeOrder(formData);

      if (order) {
        toast.success("Order placed successfully!", {
          position: "bottom-right",
        });
        await clearCardlist(summery?.userId);
        setFormData(null);
        await serverRevalidate();
        router.push(`/${langCode}/account`);
      } else {
        toast.error("Something went wrong!");
      }
    } else {
      formRef.current.reportValidity();
    }
  };

  return (
    <>
      <CheckoutForm
        ref={formRef}
        formData={formData}
        handleChange={handleChange}
      />

      <div className="col-span-4 border border-gray-200 p-4 rounded">
        <CartedItem summery={summery} />
        <button
          onClick={handleSubmit}
          className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
        >
          Place order
        </button>
      </div>
    </>
  );
}
