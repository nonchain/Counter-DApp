"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider
          activeChain="polygon"
          clientId={process.env.CLIENT_ID} // You can get a client id from dashboard settings
        >
          <ToastContainer />
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
