import Image from "next/image";

import styles from "@/styles/CoinDetails.module.css";
import LineChart from "@/components/LineChart";

async function getCoinDetails(id) {
  const baseUrl = "https://api.coingecko.com/api/v3";
  const endpoint = `/coins/${id}?tickers=false&community_data=false&developer_data=false&sparkline=true`;
  const response = await fetch(`${baseUrl}${endpoint}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data;
}

export default async function CoinDetail({ params }) {
  const data = await getCoinDetails(params.coinName);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h4>{`Rank #${data.market_cap_rank}`}</h4>

        <div className={styles.image}>
          <Image
            src={data?.image?.small}
            width={30}
            height={30}
            alt={data.name}
          />
          <div>
            <span>{data.name}</span>
            <span>{data.symbol.toUpperCase()}</span>
          </div>
        </div>

        <div className={styles.price}>
          <h1>
            {`US${Number(data.market_data.current_price.usd).toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}`}
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

        <div className={styles.btc_value}>
          <h1>
            {data.market_data.current_price.btc.toFixed(8)}
            <span>BTC</span>
          </h1>
          <span
            className={
              Number(
                data.market_data.price_change_percentage_24h_in_currency.btc
              ) > 0
                ? styles.green
                : styles.red
            }
          >
            {data.market_data.price_change_percentage_24h_in_currency.btc.toFixed(
              2
            )}
            %
          </span>
        </div>

        <div className={styles.market_data}>
          <div>
            <h1>
              Capitalização de mercado
              <span>{`US${Number(
                data.market_data.market_cap.usd
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}`}</span>
            </h1>
            <h1>
              Volume de negociação de 24 h
              <span>{`US${Number(
                data.market_data.total_volume.usd
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}`}</span>
            </h1>
            <h1>
              Avaliação totalmente diluída
              <span>{`US${Number(
                data.market_data.fully_diluted_valuation.usd
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}`}</span>
            </h1>
          </div>
          <div>
            <h1>
              Fornecimento circulante
              <span>
                {Number(data.market_data.total_supply).toLocaleString("pt-BR")}
              </span>
            </h1>
            <h1>
              Fornecimento total
              <span>
                {Number(data.market_data.max_supply).toLocaleString("pt-BR")}
              </span>
            </h1>
            <h1>
              Fornecimento máx.
              <span>
                {Number(data.market_data.circulating_supply).toLocaleString(
                  "pt-BR"
                )}
              </span>
            </h1>
          </div>
        </div>
        <LineChart data={data.market_data.sparkline_7d.price} />
      </div>
    </div>
  );
}
