import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import * as userApi from '@/api/userAPI';

export const useTransactionStore = defineStore('transaction', () => {
  const state = reactive({
    transactionInfo: [],
  });

  // 거래 정보 가져오기
  const fetchTransaction = async () => {
    try {
      const users = await userApi.getCurrentUser();
      const userId = users[0]?.userId;

      if (!userId) {
        throw new Error('사용자 정보에 id가 없습니다.');
      }

      const response = await userApi.getTransactionsByUserId(userId);
      state.transactionInfo = response;
    } catch (error) {
      console.error('거래 정보를 불러오는 데 실패했습니다.', error);
    }
  };

  const transactionInfo = computed(() => state.transactionInfo);

  const addTransaction = async (newTransaction) => {
    try {
      await userApi.post('/api/transaction', newTransaction);
      await fetchTransaction(); // 추가 후 거래목록 다시 불러오기
    } catch (error) {
      console.error('거래 추가에 실패했습니다.', error);
    }
  };

  return {
    transactionInfo,
    fetchTransaction,
    addTransaction, // 이거 추가!
  };
});
