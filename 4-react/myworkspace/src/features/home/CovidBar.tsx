import { ApexOptions } from "apexcharts";
import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts"

const CovidBar = () => {
  const [chartData, setChartData] = useState<{
    options: ApexOptions;
    serise: {
        name : string;
        data : number[];
    }[];
  }>();
    // 데이터 받아오는 구간
  const getData = async () => {
    const result = await axios.get<
      {
        stdDay: String;
        gubun: String;
        incDec: number;
        defCnt: number;
        // overFlowCnt: number;
        // localOccCnt: number;
      }[]
    >(`${process.env.REACT_APP_API_BASE}/opendata/covid/sido/current/`);

    const data = result.data;

    const options: ApexOptions = {
      title: {
        text: `전국 코로나 현황 (${result.data[0].stdDay})`,
      },
      xaxis: {
        categories: data.map((item) => item.gubun),
      },
      fill: {
        colors: [
          ({ value, seriesIndex } : { value: number; seriesIndex: number }) => {
            console.log(value);
            console.log(seriesIndex);

            let color = "";

            if (seriesIndex === 0) {
              if (value <= 30) color = "rgb(50, 161, 255)";
              else if (value > 30 && value <= 80) color = "rgb(0, 199, 60)";
              else if (value > 80 && value <= 150) color = "rgb(253, 155, 90)";
              else color = "rgb(255, 89, 89)";
            } else {
              if (value <= 15) color = "rgb(50, 161, 255)";
              else if(value > 15 && value <= 35) color = "rgb(0, 199, 60)";
              else if(value > 35 && value <= 150) color = "rgb(253, 155, 90)";
              else color = "rgb(255, 89, 89)";
            }
            return color;
          },
        ],
      },
    };

    const serise = [
      {
        name: "전일 대비 증감",
        data: data.map((item) => item.incDec)
      },
      {
        name: "확진자 수",
        data: data.map((item) => item.defCnt)
      },
    ];

    setChartData({ options, serise });
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <div>
      {chartData && (
        <Chart 
          options = {chartData?.options}
          series = {chartData?.serise}
          type = "bar"
          width = "1000"
          height = "400"
        />
      )}
    </div>
  )
}

export default CovidBar;