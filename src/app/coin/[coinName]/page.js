import Image from "next/image";

import styles from "@/styles/CoinDetails.module.css";

export default async function CoinDetail({ params }) {
  const baseUrl = "https://api.coingecko.com/api/v3";
  const endpoint = `/coins/${params.coinName}?tickers=false&community_data=false&developer_data=false&sparkline=true`;
  const response = await fetch(`${baseUrl}${endpoint}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return (
    <div className={styles.container}>
      <h4>{`Rank #${data.market_cap_rank}`}</h4>

      <div className={styles.image}>
        <Image src={data.image.small} width={30} height={30} alt={data.name} />
        <div>
          <span>{data.name}</span>
          <span>{data.symbol.toUpperCase()}</span>
        </div>
      </div>

      <div className={styles.price}>
        <h1>
          {`US${data.market_data.current_price.usd.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}`}
        </h1>
        <span
          className={
            Number(data.market_data.price_change_percentage_24h) > 0
              ? styles.green
              : styles.red
          }
        >
          {data.market_data.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}
