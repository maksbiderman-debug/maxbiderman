import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maks Biderman",
  description: "Blog o marketingu cyfrowym i SEO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
