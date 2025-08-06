

import { redirect } from "next/navigation";
import AdminSidebar from "./component/AdminSidebar";
import { auth } from "@/auth"; // your auth() method

export default async function Layout({ children }) {
  const session = await auth();

  // Redirect to login if no session or not admin
  if (!session) {
    redirect("/auth/login"); 
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
