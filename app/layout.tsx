import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layer Moon Staging",
  description: "Home staging website + inventory (EN/中文)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
