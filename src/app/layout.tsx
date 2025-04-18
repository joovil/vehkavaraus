import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Navbar from "@/components/Navbar/Navbar";
import ResendVerification from "@/components/ResendVerification";
import SessionProviderClient from "@/components/SessionProviderClient";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";

const geistSans = localFont({
  src: "./styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const circular = localFont({
  src: [
    {
      path: "./styles/fonts/CircularStd-Black.woff",
      style: "black",
    },
    {
      path: "./styles/fonts/CircularStd-Bold.woff",
      style: "bold",
    },
    {
      path: "./styles/fonts/CircularStd-Medium.woff",
      style: "medium",
    },
    {
      path: "./styles/fonts/CircularStd-Book.woff",
      style: "normal",
    },
  ],
  variable: "--font-circular",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Rent-A-Game",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // NOTE: Themes aren't implemented at this point due to time constraints
  // const cookieStore = await cookies();
  // const theme = cookieStore.get("theme");
  const session = await auth();

  return (
    <html
      lang="en"
      className="h-full w-screen"
      // data-theme={theme?.value as "light" | "dark"}
    >
      <body
        className={`${circular.variable} ${geistSans.variable} ${geistMono.variable} mx-auto w-3/4 pb-8 antialiased min-[1500px]:w-1/2`}
      >
        <SessionProviderClient session={session}>
          <Navbar />

          <ResendVerification />

          {children}
        </SessionProviderClient>
      </body>
    </html>
  );
}
