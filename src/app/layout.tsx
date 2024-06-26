import Navbar1 from '@/Components/Navbar1/Navbar1'
import Header from '@/Components/Header/Header'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "The Fit Factory",
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
        <Navbar1/>
        {children}
        <Header/>
        <ToastContainer/>
      </body>
    </html>
  );
}
