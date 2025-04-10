import axios from 'axios';

// 공통 GET
export const get = async (url, params) => {
  try {
    console.log('[GET]', url, params);
    const { data } = await axios.get(url, { params });
    return data;
  } catch (e) {
    console.log('[ERROR]', e);
    return [];
  }
};

// 공통 POST
export const post = async (url, body) => {
  try {
    console.log('[POST]', url, body);
    const { data } = await axios.post(url, body);
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
};

// 공통 PUT
export const put = async (url, body) => {
  try {
    console.log('[PUT]', url, body);
    const { data } = await axios.put(url, body);
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
};

// 공통 DELETE
export const remove = async (url, params) => {
  try {
    console.log('[DELETE]', url, params);
    const { data } = await axios.delete(url, { params });
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
};

// 현재 유저 id "aaa" 고정
export const getCurrentUser = async () => {
  try {
    const data = await get('/api/user', { id: 'aaa' });
    return data;
  } catch (e) {
    console.error('[getCurrentUser ERROR]', e);
    return null;
  }
};

// 유저 ID로 트랜잭션 가져오기
export const getTransactionsByUserId = async (userId) => {
  try {
    const data = await get('/api/transaction', { id: userId });
    return data;
  } catch (e) {
    console.error('[getTransactionsByUserId ERROR]', e);
    return [];
  }
};

// 수정된 postTransaction 함수
export const postTransaction = async (transaction) => {
  try {
    const transactionData = {
      id: 'aaa', // 예시로 고정된 유저 ID, 나중에 동적으로 처리 가능
      type: transaction.type,
      date: transaction.date,
      category: transaction.category,
      amount: transaction.amount,
      memo: transaction.content, // 내용은 'memo'로 저장
    };

    const response = await axios.post('/api/transaction', transactionData); // json-server URL
    return response.data;
  } catch (e) {
    console.error('Error posting transaction', e);
    throw e;
  }
};
