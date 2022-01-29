import { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ApexCharts from "react-apexcharts";

import { IHistory } from "./interface";
import { getOhlc } from "../components/api";
import { Loader, ChartWrapper, ChartTabs, Tab } from "../components/CustomElements";

function toTimestamp(strDate: string) {
  return Math.floor(Date.parse(strDate));
}

function toFixedFloat(num: number, digits: number) {
  return parseFloat(num.toFixed(digits));
}

function Chart() {
  const { coinId } = useParams();
  const { id } = useContext(ThemeContext);
  
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("week");
  const { data: history } = useQuery<IHistory[]>([period, coinId], () => getOhlc(coinId!, period));
  const data = [] as number[][];
  history?.map(h => {
    data.push([
      toTimestamp(h.time_close),
      toFixedFloat(h.open, 2),
      toFixedFloat(h.high, 2),
      toFixedFloat(h.low, 2),
      toFixedFloat(h.close, 2)
    ]);
  });

  return (
    history ? (
      <ChartWrapper>
        <ApexCharts
          type="candlestick"
          series={[{ data: data }]}
          options={{
            theme: {
              mode: id,
            },
            chart: {
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#ff0000",
                  downward: "#0097e6"
                }
              }
            },
            grid: { show: false },
            xaxis: {
              type: "datetime",
              crosshairs: {
                show: false
              },
            },
            yaxis: {
              show: false,
            },
          }}
        />
        <ChartTabs>
          <Tab isActive={period === "day"} onClick={() => setPeriod("day")} >day</Tab>
          <Tab isActive={period === "week"} onClick={() => setPeriod("week")} >week</Tab>
          <Tab isActive={period === "month"} onClick={() => setPeriod("month")} >month</Tab>
          <Tab isActive={period === "year"} onClick={() => setPeriod("year")} >year</Tab>
        </ChartTabs>
      </ChartWrapper>
    ) : (
      <Loader />
    )
  );
}

export default Chart;
