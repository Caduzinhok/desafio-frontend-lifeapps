import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/state/providers";
import Favicon from '/public/favicon.ico';


const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "E-commerce Life",
  description: "Sua loja online com os melhores produtos de vestuário.",
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Providers>
        <body
          className={`${roboto.className} antialiased`}
        >
          {children}
        </body>
      </Providers>
    </html>
  );
}
