import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shrimple - The Daily Word Game",
  description: "Change the word. Find the shrimp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
