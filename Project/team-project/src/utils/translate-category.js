export const translateCategory = (type) => {
  const categoryMap = {
    salary: "급여",
    allowance: "용돈",
    food: "식비",
    transportation: "교통비",
    team_dinner: "회식",
    shopping: "쇼핑",
    culture: "문화생활",
    etc: "기타",
  };

  return categoryMap[type] || "기타";
};
