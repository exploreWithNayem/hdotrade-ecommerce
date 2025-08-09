import localFont from "next/font/local";
const myFont = localFont({ src: "./../public/fonts/lws4.woff2" });

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ToastProvider from "@/providers/ToastProvider";
import { cartCleanUp } from "@/database/queries";
import { CartProvider } from "@/providers/CartContext";

export const metadata = {
  title: "Hdotrade- Home",
  description:
    "Appropriately integrate technically sound value with scalable infomediaries negotiate sustainable strategic theme areas",
  openGraph: {
    images: [
      "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    ],
  },
};

export default async function RootLayout(props) {
  const { children } = props;

  const session = await auth();
  // const language = await getLang(lang);
  await cartCleanUp();
  return (
    <html suppressHydrationWarning lang="en" className="bg-[#ffffff] ">
      <SessionProvider session={session}>
        <CartProvider>
          <body className={myFont.className} suppressHydrationWarning={true}>
            <ToastProvider>{children}</ToastProvider>

            <div id="modal-root-content" />
          </body>
        </CartProvider>
      </SessionProvider>
    </html>
  );
}
