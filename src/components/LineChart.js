"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function LineChart({ data }) {
  const firstValue = data[0];
  const lastValue = data[data.length - 1];

  const options = {
    title: {
      text: "Gráfico dos últimos 7 dias",
      style: {
        color: "whitesmoke",
      },
    },
    chart: {
      type: "area",
      backgroundColor: "transparent",
    },
    xAxis: {
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      title: "",
      min: Math.min(...data),
      labels: {
        style: {
          color: "whitesmoke",
        },
        formatter: function () {
          return `US${this.value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}`;
        },
      },
      gridLineColor: "#2a2a2a",
    },
    tooltip: {
      formatter: function () {
        return `US${this.y.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}`;
      },
    },
    plotOptions: {
      area: {
        marker: {
          enabled: false,
        },
        lineWidth: 2,
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [],
        },
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "",
        data: data,
        color: lastValue < firstValue ? "#dc2626" : "#10a271",
      },
    ],
  };

  if (lastValue < firstValue) {
    options.plotOptions.area.fillColor.stops = [
      [0, "#dc2626"], // Cor inicial do degradê (vermelho)
      [1, "transparent"], // Cor final do degradê
    ];
  } else if (lastValue > firstValue) {
    options.plotOptions.area.fillColor.stops = [
      [0, "#10a271"], // Cor inicial do degradê (verde)
      [1, "transparent"], // Cor final do degradê
    ];
  }
  return (
    <div style={{ width: "100%", marginTop: "30px" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
