import { defineStore } from "pinia";
import { ref } from "vue";
import { formatDate } from "@/utils/format-date";

export const useCalendarStore = defineStore("calendar", () => {
  const selectedDate = ref(formatDate(new Date()));
  return { selectedDate };
});
