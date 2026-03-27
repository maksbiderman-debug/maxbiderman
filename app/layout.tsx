import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import SchemaOrg from "./components/SchemaOrg";

export const metadata: Metadata = {
  title: "Maks Biderman",
  description:
    "Piszę o digital marketingu, organizuję wiedzę i agreguje ciekawe narzędzia. Głównie dla siebie, ale może przyda się też Tobie.",
  metadataBase: new URL("https://maxbiderman.pl"),
  openGraph: {
    title: "Maks Biderman",
    description:
      "Piszę o digital marketingu, organizuję wiedzę i agreguje ciekawe narzędzia. Głównie dla siebie, ale może przyda się też Tobie.",
    url: "https://maxbiderman.pl",
    siteName: "Maks Biderman",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Maks Biderman",
    description:
      "Piszę o digital marketingu, organizuję wiedzę i agreguje ciekawe narzędzia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SchemaOrg type="WebSite" />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
