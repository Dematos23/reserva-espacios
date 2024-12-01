import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/loading.css";
import "../styles/homeLogo.css";
import "../styles/classes.css";
import Nav from "../components/Nav";
import LoginContextProvider from "../context/loginContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Veddy",
  description: "Gestor de citas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginContextProvider>
          <Nav />
          <div className="mt-20">{children}</div>
        </LoginContextProvider>
      </body>
    </html>
  );
}
