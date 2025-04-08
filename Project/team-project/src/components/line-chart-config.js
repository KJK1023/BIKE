export const data = {
  labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
  datasets: [
    {
      label: "수입",
      borderColor: "#4f48dc",
      backgroundColor: "#ffffff",
      data: [3100000, 3200000, 3150000, 3300000, 3150000, 3450000],
    },
    {
      label: "지출",
      borderColor: "#DC2626",
      backgroundColor: "#ffffff",
      data: [2800000, 2200000, 2600000, 2450000, 2300000, 2500000],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
};
