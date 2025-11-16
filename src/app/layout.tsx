import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Query Router",
  description: "Pick the best compute. Always!",
  icons: {
    icon: "/assets/images/router-icon-200.png", //"/vercel.svg",
    shortcut: "/assets/images/router-icon-200.png",
    apple: "/assets/images/router-icon-200.png",
    // icon: "/assets/images/router-icon-200.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
