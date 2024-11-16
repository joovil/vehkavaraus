import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/SessionProvider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const circular = localFont({
  src: [
    {
      path: "./fonts/CircularStd-Black.woff",
      style: "black",
    },
    {
      path: "./fonts/CircularStd-Bold.woff",
      style: "bold",
    },
    {
      path: "./fonts/CircularStd-Medium.woff",
      style: "medium",
    },
    {
      path: "./fonts/CircularStd-Book.woff",
      style: "normal",
    },
  ],
  variable: "--font-circular",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" className="h-full">
      <body
        className={`${circular.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
