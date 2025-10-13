import "./globals.css";
import type { Metadata } from "next";
import I18nProvider from "@/components/i18n/I18nProvider";
export const metadata: Metadata = { title: "Layer Moon Staging", description: "Home staging + Inventory admin" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><I18nProvider>{children}</I18nProvider></body></html>);
}
