import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Table.module.css";

async function getData() {
  const baseUrl = "https://api.coingecko.com/api/v3";
  const endpoint =
    "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
  const response = await fetch(`${baseUrl}${endpoint}`, {
    next: { revalidate: 300 },
  });
  const data = await response.json();
  return data;
}

export default async function CoinsList() {
  const data = await getData();
  const getCoinId = (string) => {
    const regExp = /\/(\d+)\//;
    const number = string.match(regExp)[1];
    return number;
  };

  return (
    <div className={styles.container}>
      <table className={styles.darkTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Moeda</th>
            <th>Preço</th>
            <th>24 h</th>
            <th>Volume</th>
            <th>Capitalização de Mercado</th>
            <th>Últimos 7 dias</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((coin, index) => (
            <tr key={index}>
              <td className={styles["light-text-color"]}>{index + 1}</td>
              <td className={styles.link}>
                <Link href={`/coin/${coin.id}`} legacyBehavior>
                  <a>
                    <div className={styles.image}>
                      <Image
                        src={coin.image}
                        width={20}
                        height={20}
                        alt={coin.name}
                      />
                      <div>
                        <span>{coin.name}</span>
                        <span className={styles["light-text-color"]}>
                          {coin.symbol.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              </td>
              <td className={styles["light-text-color"]}>
                {Number(coin.current_price).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td
                className={
                  Number(coin.price_change_percentage_24h) > 0
                    ? styles.green
                    : styles.red
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className={styles["light-text-color"]}>
                {Number(coin.total_volume).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td className={styles["light-text-color"]}>
                {Number(coin.market_cap).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td>
                <Image
                  src={`https://www.coingecko.com/coins/${getCoinId(
                    coin.image
                  )}/sparkline.svg`}
                  width={130}
                  height={50}
                  alt="sparkline"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
