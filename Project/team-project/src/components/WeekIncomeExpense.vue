<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">주간 수익/지출 현황</h5>
              <button class="btn btn-link text-primary p-0">전체 보기</button>
            </div>
            <div class="row mt-3">
              <div
                v-for="(item, index) in weeklyData"
                :key="index"
                class="col text-center"
              >
                <div class="small text-muted">{{ item.day }}</div>
                <div class="fw-bold text-success">
                  +{{ formatNumber(item.income) }}
                </div>
                <div class="fw-bold text-danger">
                  -{{ formatNumber(item.expense) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeekIncomeExpense",
  data() {
    return {
      weeklyData: [
        { day: "월", income: 50000, expense: 32000 },
        { day: "화", income: 15000, expense: 28000 },
        { day: "수", income: 0, expense: 45000 },
        { day: "목", income: 3200000, expense: 22000 },
        { day: "금", income: 10000, expense: 35000 },
        { day: "토", income: 20000, expense: 68000 },
        { day: "일", income: 0, expense: 42000 },
      ],
    };
  },
  methods: {
    formatNumber(num) {
      return num.toLocaleString("ko-KR");
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.btn-link {
  text-decoration: none;
}
</style>
