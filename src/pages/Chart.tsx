import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ApexCharts from "react-apexcharts";

import { IHistory } from "./interface";
import { getHistory } from "../components/api";
import { Loader } from "../components/CustomElements";

function toTimestamp(strDate: string) {
  return Math.floor(Date.parse(strDate));
}

function Chart() {
  const { coinId } = useParams();
  const { data: history } = useQuery<IHistory[]>(["history", coinId], () => getHistory(coinId!));
  const data = [] as number[][];
  history?.map(h => {
    data.push([toTimestamp(h.time_close), h.open, h.high, h.low, h.close]);
  });
  console.log(data);

  return (
    history ? (
      <ApexCharts
        type="candlestick"
        series={[{data: data}]}
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            height: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: false },
          yaxis: {
            show: false,
          },
          xaxis: {
            type: "datetime",
            labels: { show: false },
            crosshairs: {
              show: false
            },
          },
        }}
        height="500px"
        width="500px"
      />
    ): (
      <Loader />
    )
    );
}

export default Chart;
