<template>
  <b-col
    cols="12"
    class="mobile-right-nopadding mobile-left-nopadding"
    style="height: 100%"
  >
    <div class="card-wrap">
      <div class="messages-wrap">
        <div class="messages-title-block">
          <div class="messages-title-text-wrap">
            <p class="messages-title">Категории продаж</p>
            <p class="messages-title-text">
              Диаграмма самых популярных типов сделок
            </p>
          </div>
          <a href="#">
            <img class="more-icon" src="../../assets/icons/more.svg" alt="" />
          </a>
        </div>

        <div class="messages-body wow animate__animated animate__fadeIn">
          <div>ТУТ МОГЛА БЫТЬ ВАША ДИАГРАММА</div>
        </div>
      </div>
    </div>
  </b-col>
</template>

<script>
export default {
  name: "CardCategoriesInfo",
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
.checkout-info-wrap,
.messages-title-block {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
.checkout-text-wrap,
.checkout-card-wrap,
.messages-wrap,
.messages-title-text-wrap {
  display: flex;
  flex-flow: column;
}
.messages-title {
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 5px;
}
.messages-title-text {
  font-size: 14px;
  color: #717579;
  margin-bottom: 0px;
}
.messages-body {
  margin-top: 20px;
}
</style>