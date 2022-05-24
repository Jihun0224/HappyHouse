<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "HouseDetailChart",
  components: { LineChartGenerator },
  props: {
    chartId: {
      type: String,
      default: "아파트 거래 평균 가격",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 200,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
    aptName: String,
    avgList: Array,
    myAptName: String,
    myHomeAvgList: Array,
  },

  data() {
    return {
      chartData: {
        labels: [...Array(12)].map((v, i) => i + 1 + "월"),
        datasets: [
          {
            label: this.aptName,
            backgroundColor: "#f87979",
            data: this.avgList,
          },
          {
            label: this.myAptName,
            backgroundColor: "#7acbf9",
            data: this.myHomeAvgList,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>