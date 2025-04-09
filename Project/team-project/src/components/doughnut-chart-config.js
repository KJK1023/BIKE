export const rawData = [
  { label: "식비", value: 300, color: "#EE6666" },
  { label: "교통비", value: 120, color: "#91CC75" },
  { label: "회식", value: 80, color: "#FAC858" },
  { label: "쇼핑", value: 50, color: "#5470C6" },
  { label: "문화생활", value: 10, color: "#73C0DE" },
];

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  cutout: "60%",
};
