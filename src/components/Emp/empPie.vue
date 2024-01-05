<template>
  <div>
    <canvas id="emp-chart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "Emp chart",
  props: ["statdata"],
  setup(props) {
    const data = {
      labels: ["Total Registration", "Payment Success", "Payment Failure"],
      datasets: [
        {
          label: "My First Dataset",
          data: [
            props.statdata[0].totalReg,
            props.statdata[0].totalPaySuc,
            props.statdata[0].totalPayFail,
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const config = {
      type: "pie",
      data: data,
    };
    onMounted(() => {
      // console.log("mounted");
      Chart.register(...registerables);
      const ctx = document.getElementById("emp-chart");
      new Chart(ctx, config);
    });
  },
};
</script>

<style>
</style>