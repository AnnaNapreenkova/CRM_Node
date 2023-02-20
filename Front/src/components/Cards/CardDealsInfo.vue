<template>
  <!-- карточка с диаграммой сделок за месяц -->
  <b-col
    cols="12"
    class="mobile-right-nopadding"
    style="padding-left: 0; margin: 15px 0"
  >
    <div class="card-wrap">
      <div class="blocked-info">
        <p>Находится в разработке</p>
      </div>
      <div class="messages-wrap">
        <div class="messages-title-block">
          <div class="messages-title-text-wrap">
            <p class="messages-title">Статистика по сделкам</p>
          </div>
          <a href="#"> <img src="../../assets/icons/more.svg" alt="" /> </a>
        </div>
      </div>
      <div class="messages-body wow animate__animated animate__fadeIn">
        ТУТ МОГЛА БЫТЬ ВАША ДИАГРАММА
        <img class="img-fluid" src="../../assets/icons/graph1.png" alt="" />
      </div></div
  ></b-col>
  <!-- карточка с диаграммой сделок за месяц -->
</template>

<script>
export default {
  name: "CardDealsInfo",
};
</script>

<style scoped>
.messages-body {
  margin-top: 25px;
}

.card-wrap {
  border-radius: 20px;
  background: #202020;
  width: 100%;
  padding: 30px;
}
.messages-wrap,
.messages-title-text-wrap {
  display: flex;
  flex-flow: column;
}
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
.messages-title-block {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
.card-wrap {
  transition: 0.5s ease;
  position: relative;
}
.card-wrap:hover {
  box-shadow: 0px 0px 15px #36363690;
}
</style>