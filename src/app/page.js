import Table from "@/components/Table";
import styles from "@/styles/Home.module.css";

export default async function Home() {
  const baseUrl = "https://api.coingecko.com/api/v3";
  const endpoint = "/global";
  const response = await fetch(`${baseUrl}${endpoint}`, {
    next: { revalidate: 60 },
  });
  const { data } = await response.json();
  return (
    <div className={styles.container}>
      <h2>Preços das criptomoedas por ordem de capitalização de mercado</h2>
      <h4>
        O valor de mercado global das criptomoedas variou{" "}
        <span
          className={
            Number(data.market_cap_change_percentage_24h_usd) > 0
              ? styles.green
              : styles.red
          }
        >
          {`${data.market_cap_change_percentage_24h_usd.toFixed(2)}% `}
        </span>
        nas últimas 24 horas
      </h4>
      <h4>{`A moeda com maior dominância de mercado é o Bitcoin com ${data.market_cap_percentage.btc.toFixed(
        2
      )}% seguido pelo Ethereum com ${data.market_cap_percentage.eth.toFixed(
        2
      )}%`}</h4>
      <Table />
    </div>
  );
}
