<template>
  <div class="notfound-container">
    <h1>404</h1>
    <p>페이지를 찾을 수 없습니다.</p>
    <RouterLink to="/" class="home-link">홈으로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.notfound-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9fafb;
  color: #4b5563;
  text-align: center;
}
.notfound-container h1 {
  font-size: 100px;
  margin: 0;
}
.notfound-container p {
  margin: 20px 0;
  font-size: 24px;
}
.home-link {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4b5563;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s;
}
.home-link:hover {
  background-color: #374151;
}
</style>
