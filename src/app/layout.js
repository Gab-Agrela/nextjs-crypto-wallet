import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import "../styles/globals.css";

export const metadata = {
  title: "CryptoWallet",
};

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="main-container">{children}</main>
      <Footer />
    </>
  );
}
