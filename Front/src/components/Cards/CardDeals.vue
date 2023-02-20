<template>
  <!-- карточка с количеством сделок за месяц -->
  <b-col cols="12" md="6" style="padding-left: 0">
    <div class="card-wrap deals-bg">

      <div class="blocked-info">
        <p>Находится в разработке</p>
      </div>

      <div class="text-deals-wrap wow animate__animated animate__fadeIn">
        <div class="number">
          <p>{{ deals }}</p>
        </div>
        <p class="total-deals">Всего сделок</p>
        <p class="deals-from-last">
          <span style="color: #fc2e53">-2% </span> чем в прошлом месяце
        </p>
      </div>
    </div>
  </b-col>
  <!-- карточка с количеством сделок за месяц -->
</template>

<script>
export default {
  name: "CardDeals",

  data() {
    return {
      deals: 552,
    };
  },
};
</script>

<style scoped>
.card-wrap {
  border-radius: 20px;
  background: #202020;
  width: 100%;
  padding: 30px;
}
.text-wrap > p,
.card-wrap > p {
  margin: 0;
  font-weight: 600;
  margin-bottom: 10px;
}
.text-deals-wrap {
  display: flex;
  flex-flow: column;
}
.total-deals {
  margin-top: 10px;
  margin-bottom: 10px;
}
.deals-from-last {
  margin-bottom: 0;
  color: #717579;
  font-size: 14px;
}
.number {
  display: flex;
  align-items: center;
}
.statistics > p,
.number > p {
  margin: 0;
}
.number > p {
  margin-right: 15px;
  font-size: 31px;
  font-weight: 900;
  line-height: 31px;
  margin-top: 10px;
}
.deals-bg {
  height: 100%;
  background-image: url(../../assets/icons/deals-bg.png);
  background-repeat: no-repeat;
  background-size: 100px;
  background-position-x: 85%;
  background-position-y: 30%;
}
.card-wrap {
  transition: 0.5s ease;
  position: relative;
}
.card-wrap:hover {
  box-shadow: 0px 0px 15px #36363690;
}
</style>