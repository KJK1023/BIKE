import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import * as userApi from "@/api/userAPI";

export const useUserStore = defineStore("userstore", () => {
  const state = reactive({
    userInfo: [],
  });

  const fetchUser = async () => {
    try {
      const users = await userApi.getCurrentUser();
      state.userInfo = users;
    } catch (error) {
      console.error("유저 정보를 불러오는 데 실패했습니다.", error);
    }
  };

  const userInfo = computed(() => state.userInfo);

  return {
    userInfo,
    fetchUser,
  };
});
