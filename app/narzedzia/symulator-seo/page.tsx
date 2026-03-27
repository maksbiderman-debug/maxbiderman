import type { Metadata } from "next";
import SimulatorClient from "./SimulatorClient";

export const metadata: Metadata = {
  title: "Symulator SEO — jak Google i AI widzi Twoją stronę | Maks Biderman",
  description:
    "Interaktywne narzędzie: włącz i wyłącz elementy strony i sprawdź jak reaguje Googlebot, jak RAG decyduje o cytowaniu i jak zmienia się score Authority / Relevance / Extractability.",
};

export default function SimulatorSeoPage() {
  return <SimulatorClient />;
}
