import type { Metadata } from "next";
import "./globals.css";
import { circularBold } from "./fonts/fonts";

export const metadata: Metadata = {
  title: "Vehkavaraus",
  description: "Vehkapolku renting service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${circularBold.variable} antialiased`}>{children}</body>
    </html>
  );
}
