export const translateCategory = (type) => {
  const categoryMap = {
    salary: "급여",
    allowance: "용돈",
    food: "식비",
    transportation: "교통비",
    회식: "team_dinner",
    쇼핑: "shopping",
    문화생활: "culture",
    기타: "etc",
  };

  return categoryMap[type] || "기타";
};
