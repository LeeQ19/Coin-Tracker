import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import ApexCharts from "react-apexcharts";

import { IHistory } from "./interface";
import { getOhlc } from "../components/api";
import { Loader, ChartWrapper, ChartTabs, Tab } from "../components/CustomElements";
import { isDarkAtom } from "../atoms";

function toTimestamp(strDate: string) {
  return Math.floor(Date.parse(strDate));
}

function toFixedFloat(num: number, digits: number) {
  return parseFloat(num.toFixed(digits));
}

function Chart() {
  const { coinId } = useParams();
  const isDark = useRecoilValue(isDarkAtom);

  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("week");
  const { data: history } = useQuery<IHistory[]>([period, coinId], () => getOhlc(coinId!, period));
  const data = history?.map(h => {
    return [
      toTimestamp(h.time_open),
      toFixedFloat(h.open, 3),
      toFixedFloat(h.high, 3),
      toFixedFloat(h.low, 3),
      toFixedFloat(h.close, 3),
    ];
  });

  return history ? (
    <ChartWrapper>
      <ApexCharts
        type="candlestick"
        series={[{ data: data }]}
        options={{
          theme: {
            mode: (isDark ? "dark" : "light"),
          },
          chart: {
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          tooltip: {
            x: {
              show: false,
            },
            custom: function ({ seriesIndex, dataPointIndex, w }) {
              const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
              const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
              const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
              const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
              return (
                `<div class="apexcharts-tooltip-candlestick" style="display: grid; gap: 5px; padding: 5px;" >
                  <div>
                    Open: 
                    <span class="value" >
                      $ ${o.toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                  </div>
                  <div>
                    High: 
                    <span class="value" >
                      $ ${h.toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                  </div>
                  <div>
                    Low: 
                    <span class="value" >
                      $ ${l.toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                  </div>
                  <div>
                    Close: 
                    <span class="value" >
                      $ ${c.toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                  </div>
                </div>`
              );
            },
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: "#ff0000",
                downward: "#0097e6",
              },
            },
          },
          grid: { show: false },
          xaxis: {
            type: "datetime",
            crosshairs: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
        }}
        height="100%"
      />
      <ChartTabs>
        <Tab isActive={period === "day"} onClick={() => setPeriod("day")}>
          day
        </Tab>
        <Tab isActive={period === "week"} onClick={() => setPeriod("week")}>
          week
        </Tab>
        <Tab isActive={period === "month"} onClick={() => setPeriod("month")}>
          month
        </Tab>
        <Tab isActive={period === "year"} onClick={() => setPeriod("year")}>
          year
        </Tab>
      </ChartTabs>
    </ChartWrapper>
  ) : (
    <Loader />
  );
}

export default Chart;
