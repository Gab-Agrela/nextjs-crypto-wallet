import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import "@/styles/globals.css";

export const metadata = {
  title: "CryptoWallet",
};

export default function Layout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="main-container">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
