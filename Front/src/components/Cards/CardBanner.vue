<template>
  <b-col cols="12" class="mobile-right-nopadding mobile-left-nopadding">
    <div class="offer-wrap">
      <div class="offer-text-wrap wow animate__animated animate__fadeIn">
        <p class="offer-title">Контролируйте выполнение вашего проекта</p>
        <p class="offer-text">
          Позвольте системе от Megaorion оптимизировать<br />ваш бизнес-процесс
        </p>
      </div>
      <!-- <a class="offer-try wow animate__animated animate__fadeIn" href="#"
        >Попробовать</a
      > -->
    </div>
  </b-col>
</template>

<script>
export default {
  name: "CardBanner",
};
</script>

<style scoped>
.card-wrap {
  border-radius: 20px;
  background: #202020;
  width: 100%;
  padding: 30px;
}
.card-wrap {
  transition: 0.5s ease;
}
.card-wrap:hover {
  box-shadow: 0px 0px 15px #36363690;
}

.offer-wrap {
  display: flex;
  flex-flow: row;
  align-items: center;
  background: linear-gradient(212.43deg, #1d3573 19.43%, #3f8392 87.63%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  padding: 30px 40px;
  /* margin-top: 15px; */
}
.offer-text-wrap {
  display: flex;
  flex-flow: column;
}

.offer-title {
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
}
.offer-try {
  min-width: fit-content;
  padding: 10px 25px;
  background-color: #fff;
  color: #000000 !important;
  text-decoration: none !important;
  transition: 0.5s cubic-bezier(0.7, -1.51, 0.36, 2.19);
  font-weight: 600;
  font-size: 18px;
  border-radius: 10px;
}
.offer-try:hover {
  transform: scale(1.1);
}

@keyframes progress {
  0% {
    --percentage: 0;
  }
  100% {
    --percentage: var(--value);
  }
}
</style>