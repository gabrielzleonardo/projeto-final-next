import "./globals.css";
import { Roboto, Poppins } from "next/font/google";
import { NextAuthProvider } from "./providers";




const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "food explorer",
  description: "Os melhores pratos para você",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} ${poppins.variable} font-roboto`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
