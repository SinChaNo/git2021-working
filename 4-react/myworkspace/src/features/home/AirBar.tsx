import { ApexOptions } from "apexcharts";
import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts"

const AirBar = () => {
  const [chartData, setChartData] = useState<{
    options: ApexOptions; 
    serise: {
      name : string;
      data : number[];
    }[];
  }>();
  
  const getData = async () => {
    const result = await axios.get<
      {
        dataTime: string;
        sidoName: string;
        cityName: string;
        pm10Vaule: number;
        pm25Value: number;
      }[]
    >(`${process.env.REACT_APP_API_BASE}/opendata/air/sido/current`);

    const data = result.data;

    // Chart Options, x
    const options: ApexOptions ={
      title: {
        text: `서울 미세먼지 현황 (${result.data[0].dataTime})`,
      },
      xaxis: {
        categories: data.map((item) => item.cityName),
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
              else if(value > 253 && value <= 150) color = "rgb(253, 155, 90)";
              else color = "rgb(255, 89, 89)";
            }
            return color;
          },
        ],
      },
    };
    
    const serise = [
      {
        name: "PM10",
        data: data.map((item) => item.pm10Vaule),
      },
      {
        name: "PM2.5",
        data: data.map((item) => item.pm25Value),
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
  );
};

export default AirBar;