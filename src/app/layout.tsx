import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./Components/Nav.js";
import Footer from "./Components/Footer.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
        {/* <Footer /> */}
        {/* <script src="../path/to/flowbite/dist/flowbite.min.js"></script> */}
      </body>
    </html>
  );
}
