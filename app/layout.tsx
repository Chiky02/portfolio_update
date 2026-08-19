import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Juan Ballen | Ingeniero de Sistemas",
  description:
    "Portafolio de Juan Ballen, Ingeniero de Sistemas. Desarrollo web, datos y experiencias interactivas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
