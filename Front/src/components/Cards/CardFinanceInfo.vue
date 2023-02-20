<template>
  <b-col cols="12" md="6" class="mobile-left-nopadding" style="height: 100%">
    <div class="card-wrap checkout-card-wrap">
       <div class="blocked-info">
        <p>Находится в разработке</p>
      </div>

      <div
        class="
          checkout-info-wrap
          wow
          animate__animated animate__fadeIn  
        "
      >
        <div class="checkout-text-wrap">
          <p class="checkout-title">Текущий оборот</p>
          <p class="checkout-balance-text">{{ finance }} Р</p>
        </div>
        <a href="#"
          ><img src="../../assets/icons/checkout-icon.svg" alt=""
        /></a>
      </div>
      <p
        class="
          checkout-after-balance-text
          wow
          animate__animated animate__fadeIn  
        "
      >
        <span class="good">+2.7%</span> прирост за неделю
      </p>
      <img
        class="
          checkout-graph-img
          img-fluid
          wow
          animate__animated animate__fadeIn  
        "
        src="../../assets/icons/graph.png"
        alt=""
      />
    </div>
  </b-col>
</template>

<script>
export default {
  name: "CardFinanceInfo",

  data() {
    return {
      finance: 5632.15
    }
  }
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
  position: relative;
}
.card-wrap:hover {
  box-shadow: 0px 0px 15px #36363690;
}

.checkout-title {
  font-size: 16px;
  color: #717579;
  margin-bottom: 5px;
}
.checkout-balance-text {
  font-weight: bold;
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 5px;
}
.checkout-after-balance-text {
  font-size: 14px;
  color: #d7d7d7;
  margin-bottom: 0px;
}
.checkout-after-balance-text > .good {
  color: #09bd3c;
}
.checkout-after-balance-text > .bad {
  color: #fc2e53;
}
.checkout-graph-img {
  margin-top: 30px;
  transition: 0.5s ease;
}
.checkout-graph-img {
  transform: scale(1.1);
}
.checkout-info-wrap,
.messages-title-block {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
</style>