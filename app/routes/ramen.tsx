// @ts-nocheck

import { MetaFunction } from "@remix-run/react";
import BackToTopButton from "~/components/layout/BackToTop";
import configs from "~/configs/configs";
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { useEffect } from "react";

ChartJS.register(
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const lineChartOptions = {
  responsive: true,
  elements: {
    point: {
      pointStyle: "rect",
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "month",
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Weight (kg)",
      },
    },
  },
};

const data = {
  labels: [
    "2024-02-17",
    "2024-02-24",
    "2024-03-07",
    "2024-03-15",
    "2024-03-25",
    "2024-04-05",
    "2024-04-13",
    "2024-04-16",
    "2024-04-21",
    "2024-04-23",
    "2024-04-30",
    "2024-05-03",
    "2024-05-06",
    "2024-05-09",
    "2024-05-15",
    "2024-05-20",
    "2024-05-22",
    "2024-05-25",
    "2024-05-27",
    "2024-06-01",
    "2024-06-02",
    "2024-06-04",
    "2024-06-08",
    "2024-06-09",
    "2024-06-11",
    "2024-06-15",
    "2024-06-17",
    "2024-06-19",
    "2024-06-21",
    "2024-06-22",
    "2024-06-24",
    "2024-06-27",
    "2024-07-02",
    "2024-07-03",
    "2024-07-05",
    "2024-07-15",
    "2024-07-18",
    "2024-07-20",
    "2024-07-22",
    "2024-07-23",
    "2024-07-25",
    "2024-07-29",
    "2024-07-30",
    "2024-07-31",
    "2024-08-06",
    "2024-08-08",
    "2024-08-10",
    "2024-08-16",
    "2024-08-20",
    "2024-08-25",
    "2024-08-28",
    "2024-09-09",
    "2024-09-13",
    "2024-09-18",
    "2024-09-23",
    "2024-09-27",
  ],
  datasets: [
    {
      label: "Weight of Ramen",
      data: [
        3.7, 4, 4.15, 4.2, 4.7, 4.9, 5.35, 5.4, 5.65, 5.7, 6.05, 5.85, 6.05,
        6.1, 6.1, 6.35, 6.3, 6.2, 6.35, 6.4, 6.5, 6.55, 6.6, 6.6, 6.7, 6.85,
        6.85, 6.95, 6.95, 7.05, 7.1, 7.15, 7.3, 7.4, 7.5, 7.55, 7.8, 7.9, 7.8,
        7.9, 7.85, 7.8, 8.05, 8.2, 8.1, 8.15, 8.2, 8.25, 8.4, 8.5, 8.55, 8.6,
        8.7, 8.9, 8.75, 9,
      ],
    },
  ],
};

export const meta: MetaFunction = () => {
  return [
    { title: `Ramen the maine coon` },
    {
      name: "description",
      content: `Ramen the Maine coon, ${configs.navBar.name}'s pet`,
    },
    {
      name: "keywords",
      content: `${configs.navBar.name}, pet, ramen`,
    },
    { name: "author", content: configs.navBar.name },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export default function Ramen() {
  if (window.location.hash === "#weight-chart")
    useEffect(() => {
      document.getElementById("weight-chart")?.scrollIntoView();
    }, []);

  return (
    <div className="mx-4 mt-8 md:mx-0 md:mt-12">
      <h1 className="text-3xl my-2 md:text-5xl font-blackOpsOne font-bold text-center w-full">
        Meet my cat <span className="italic">Ramen 🍜</span>
      </h1>
      <img
        src="pictures/cat/ramen.jpg"
        alt="Ramen"
        className="w-72 mt-2 md:mt-6 mx-auto md:my-auto rounded-lg"
      />
      <div className="mt-6 mx-auto w-fit flex flex-col items-center justify-center font-courierPrime text-2xl">
        <div>
          <p>
            <span className="font-bold">Name:</span> Ramen 🍜
          </p>
          <p>
            <span className="font-bold">DOB:</span> 2023/10/15 🎂
          </p>
          <p>
            <span className="font-bold">Gender:</span> Other 🫣
          </p>
          <p>
            <span className="font-bold">Breed:</span> Maine Coon 🐯
          </p>
          <p>
            <span className="font-bold">Favorite Food:</span> Beef 🐂
          </p>
        </div>
      </div>
      <div className="text-2xl font-courierPrime my-4">
        While not enjoying food or snacks, Ramen loves birding and making bread:
      </div>
      <div className="flex flex-col md:flex-row w-full items-center justify-between">
        <img
          className="w-full md:w-1/2"
          src="pictures/cat/birding.jpg"
          alt="ramen-birding"
        ></img>
        <img
          className="w-full md:w-5/12 mt-8 md:mt-0"
          src="pictures/cat/biscuits.gif"
          alt="ramen-making-bread"
        ></img>
      </div>
      <div className="text-2xl font-courierPrime my-4">
        Ramen is a great example of how cats can act doggy:
      </div>
      <div className="flex flex-col w-full items-center justify-between">
        <img
          className="w-full md:w-1/2"
          src="pictures/cat/walk.jpg"
          alt="ramen-walking"
        ></img>
        <img
          className="w-full md:w-5/12 mt-8"
          src="pictures/cat/dog.gif"
          alt="ramen-dogging"
        ></img>
      </div>
      <div className="text-2xl font-courierPrime my-4 ml-6">
        Ramen is growing fast!
      </div>
      <Line
        id="weight-chart"
        options={lineChartOptions}
        data={data}
        className="mt-4 mb-48"
      />
      <BackToTopButton></BackToTopButton>
    </div>
  );
}
