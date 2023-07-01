import Image from "next/image";
import Link from "next/link";

import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <div className={styles.logo}>
        <Link href="/" legacyBehavior>
          <a>
            <Image
              src="/images/doge.png"
              width={50}
              height={50}
              alt="DogeCoin"
            />
            <h1>CryptoWallet</h1>
          </a>
        </Link>
      </div>
      <ul className={styles.links}>
        <Link href="/" legacyBehavior>
          <a>Moedas</a>
        </Link>
        <Link href="/wallet" legacyBehavior>
          <a>Carteira</a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a>Sobre</a>
        </Link>
      </ul>
    </nav>
  );
}
