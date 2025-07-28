"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from 'next/navigation'
export  async function login(formData) {
  try {
     await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    redirect('/')

  } catch (error) {
    if (isRedirectError(error)) {
      redirect('/')
    }
  }
}
