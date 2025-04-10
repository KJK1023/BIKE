<template>
  <div class="transaction-filter p-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0 fw-bold">전체 거래 내역</h5>
    </div>

    <div class="filter-row d-flex flex-wrap align-items-center">
      <div class="filter-item me-2 position-relative">
        <label class="form-label mb-0 me-2">기간</label>
        <button
          class="btn btn-outline-secondary btn-sm px-3 py-1 d-flex align-items-center"
          type="button"
          @click="toggleDatePicker"
        >
          {{ selectedPeriod }} <i class="bi bi-calendar-event ms-2"></i>
        </button>

        <div
          v-if="showDatePicker"
          class="date-picker-container position-absolute mt-1 p-3 bg-white rounded shadow"
        >
          <div class="d-flex justify-content-between mb-3">
            <div></div>
            <button
              type="button"
              class="btn-close"
              @click="showDatePicker = false"
            ></button>
          </div>

          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="date-input-group">
              <label for="startDate" class="form-label small mb-1"
                >시작일</label
              >
              <input
                type="date"
                id="startDate"
                class="form-control form-control-sm"
                v-model="startDate"
              />
            </div>
            <div class="date-range-separator">~</div>
            <div class="date-input-group">
              <label for="endDate" class="form-label small mb-1">종료일</label>
              <input
                type="date"
                id="endDate"
                class="form-control form-control-sm"
                v-model="endDate"
              />
            </div>
          </div>

          <div class="date-buttons-group d-flex gap-2 justify-content-end">
            <button
              class="btn btn-sm btn-outline-secondary"
              @click="showDatePicker = false"
            >
              취소
            </button>
            <button class="btn btn-sm btn-primary" @click="applyCustomDate">
              적용
            </button>
          </div>
        </div>
      </div>

      <div class="filter-item me-2">
        <label class="form-label mb-0 me-2">유형</label>
        <div class="dropdown d-inline-block">
          <button
            class="btn btn-outline-secondary btn-sm dropdown-toggle px-3 py-1"
            type="button"
            id="typeDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            ref="typeDropdownButton"
          >
            {{
              selectedType === "income"
                ? "입금"
                : selectedType === "expense"
                ? "출금"
                : selectedType
            }}
            <i class="bi bi-chevron-down ms-1"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="typeDropdown">
            <li>
              <a class="dropdown-item" href="#" @click.prevent="setType('전체')"
                >전체</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="setType('income')"
                >입금</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="setType('expense')"
                >출금</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="filter-item me-2">
        <label class="form-label mb-0 me-2">카테고리</label>
        <div class="dropdown d-inline-block">
          <button
            class="btn btn-outline-secondary btn-sm dropdown-toggle px-3 py-1"
            type="button"
            id="categoryDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ selectedCategory }} <i class="bi bi-chevron-down ms-1"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="categoryDropdown">
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="setCategory('전체')"
                >전체</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="setCategory('급여')"
                >급여</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="setCategory('식비')"
                >식비</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="setCategory('쇼핑')"
                >쇼핑</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="setCategory('교통비')"
                >교통비</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="setCategory('문화생활')"
                >문화생활</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useTransactionStore } from "@/stores/transaction-store";

// Emits
const emit = defineEmits(["filter-transactions", "filters-applied"]);

// Store
const transactionStore = useTransactionStore();

// 상태
const selectedPeriod = ref("전체");
const selectedType = ref("전체");
const selectedCategory = ref("전체");
const showDatePicker = ref(false);
const startDate = ref(formatDateForInput(new Date()));
const endDate = ref(formatDateForInput(new Date()));

// 카테고리 매핑
const categoryMap = {
  급여: "salary",
  식비: "food",
  쇼핑: "shopping",
  교통비: "transportation",
  문화생활: "culture",
};
const reverseCategoryMap = Object.fromEntries(
  Object.entries(categoryMap).map(([key, val]) => [val, key])
);

// 날짜 포맷 함수
function formatDateForInput(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateDisplay(date) {
  return formatDateForInput(date);
}

// 날짜 범위 설정
function setPeriod(period) {
  selectedPeriod.value = period;
  const today = new Date();

  if (period === "오늘") {
    startDate.value = formatDateForInput(today);
    endDate.value = formatDateForInput(today);
  } else if (period === "이번 주") {
    const first = today.getDate() - today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(first);
    startDate.value = formatDateForInput(startOfWeek);
    endDate.value = formatDateForInput(today);
  } else if (period === "이번 달") {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    startDate.value = formatDateForInput(startOfMonth);
    endDate.value = formatDateForInput(today);
  } else {
    startDate.value = "";
    endDate.value = "";
  }

  showDatePicker.value = false;
  filterTransactions();
}

function toggleDatePicker() {
  showDatePicker.value = !showDatePicker.value;

  if (showDatePicker.value && selectedPeriod.value === "전체") {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);
    startDate.value = formatDateForInput(lastMonth);
    endDate.value = formatDateForInput(today);
  }
}

function applyCustomDate() {
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);

    if (start <= end) {
      selectedPeriod.value = `${formatDateDisplay(start)} ~ ${formatDateDisplay(
        end
      )}`;
      showDatePicker.value = false;
      filterTransactions();
    } else {
      alert("시작일은 종료일보다 이전이어야 합니다.");
    }
  } else if (!startDate.value && !endDate.value) {
    selectedPeriod.value = "전체";
    showDatePicker.value = false;
    filterTransactions();
  } else {
    alert("시작일과 종료일을 모두 설정해주세요.");
  }
}

function setType(type) {
  selectedType.value = type;
  filterTransactions();
}

function setCategory(category) {
  selectedCategory.value = category;
  filterTransactions();
}

function filterTransactions() {
  const transactions = transactionStore.transactionInfo || [];

  const dateFilter = (tx) => {
    if (selectedPeriod.value === "전체") return true;

    const txDate = new Date(tx.date);
    txDate.setHours(0, 0, 0, 0);

    if (selectedPeriod.value.includes("~")) {
      const [startStr, endStr] = selectedPeriod.value
        .split("~")
        .map((d) => d.trim());
      const start = new Date(startStr);
      const end = new Date(endStr);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return txDate >= start && txDate <= end;
    }

    const today = new Date();
    if (selectedPeriod.value === "오늘") {
      return txDate.toDateString() === today.toDateString();
    }

    if (selectedPeriod.value === "이번 주") {
      const firstDay = new Date(today);
      firstDay.setDate(today.getDate() - today.getDay());
      firstDay.setHours(0, 0, 0, 0);
      return txDate >= firstDay && txDate <= today;
    }

    if (selectedPeriod.value === "이번 달") {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      return txDate >= firstDay && txDate <= today;
    }

    return true;
  };

  const typeFilter = (tx) =>
    selectedType.value === "전체" || tx.type === selectedType.value;

  const categoryFilter = (tx) => {
    if (selectedCategory.value === "전체") return true;
    const engCategory = categoryMap[selectedCategory.value];
    return tx.category === engCategory;
  };

  const filtered = transactions.filter(
    (tx) => dateFilter(tx) && typeFilter(tx) && categoryFilter(tx)
  );

  emit("filter-transactions", filtered);
  emit("filters-applied", {
    period: selectedPeriod.value,
    type: selectedType.value === "전체" ? null : selectedType.value,
    category:
      selectedCategory.value === "전체"
        ? null
        : reverseCategoryMap[categoryMap[selectedCategory.value]],
    dateRange: selectedPeriod.value.includes("~")
      ? {
          start: selectedPeriod.value.split("~")[0].trim(),
          end: selectedPeriod.value.split("~")[1].trim(),
        }
      : null,
  });
}

function handleOutsideClick(e) {
  if (showDatePicker.value) {
    const datepicker = document.querySelector(".date-picker-container");
    const dateButton = document.querySelector(
      ".filter-item .btn-outline-secondary"
    );
    if (
      datepicker &&
      !datepicker.contains(e.target) &&
      (!dateButton || !dateButton.contains(e.target))
    ) {
      showDatePicker.value = false;
    }
  }
}

onMounted(() => {
  // 최초 필터링 실행
  setTimeout(() => {
    filterTransactions();
  }, 500);

  document.addEventListener("click", handleOutsideClick);
});

watch(
  () => showDatePicker.value,
  (visible) => {
    if (!visible) {
      document.removeEventListener("click", handleOutsideClick);
    }
  }
);
</script>

<style scoped>
/* 기존 스타일 그대로 유지 */
.transaction-filter {
  background: #fff;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.filter-row {
  margin-bottom: 0.5rem;
  position: relative;
}

.filter-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  position: relative;
}

.filter-search {
  width: 250px;
}

.dropdown-toggle::after {
  display: none;
}

.btn-outline-secondary {
  border-color: #ced4da;
  color: #212529;
  background-color: #fff;
}

.btn-outline-secondary:hover {
  background-color: #f8f9fa;
  color: #212529;
  border-color: #ced4da;
}

.date-picker-container {
  z-index: 1050;
  min-width: 400px;
  border: 1px solid #dee2e6;
}

.date-range-separator {
  font-weight: bold;
  align-self: flex-end;
  margin-bottom: 8px;
}

.date-input-group {
  flex: 1;
}

/* 모바일 최적화 */
@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-item {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.75rem;
  }

  .filter-search {
    width: 100%;
    margin-top: 0.5rem;
  }

  .dropdown {
    width: 100%;
  }

  .dropdown-toggle {
    width: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .date-picker-container {
    min-width: 300px;
    width: calc(100vw - 30px);
    max-width: 400px;
    left: 0;
  }

  .date-input-group {
    flex: 1;
  }
}
</style>
