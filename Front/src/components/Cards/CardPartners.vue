<template>
  <!-- карточка с количеством клиентов -->
  <b-col cols="12" md="6" style="padding-left: 0">
    <div class="card-wrap clients-bg">
      <div class="text-wrap wow animate__animated animate__fadeIn">
        <p>Всего партнеров</p>
        <div class="number">
          <p>{{ partners.length }}</p>
          <div class="statistics">
            <img src="@/assets/icons/arrow.svg" alt="" />
            <p>
              {{
                partnerpercent >= 0
                  ? `+${partnerpercent.toFixed(2)}%`
                  : `${partnerpercent.toFixed(2)}%`
              }}
            </p>
            <p>за месяц</p>
          </div>
        </div>
      </div>
    </div>
  </b-col>
  <!-- карточка с количеством клиентов -->
</template>

<script>
import moment from "moment";
export default {
  name: "CardPartners",
  props: {
    // adminUsers: {
    //   type: Array,
    //   default: () => [],
    // },
    partners: {
      type: Array,
    },
  },

  data() {
    return {
      lastmonth: [],
      currentmonth: [],
      allmonth: [],
      allpercent: 0,
    };
  },

  computed: {
    partnerpercent() {
      if (this.allmonth.length) {
        this.allpercent = 100 / this.allmonth.length;
      }

      let currentpercent = this.allpercent * this.currentmonth.length;
      let lastpercent = this.allpercent * this.lastmonth.length;

      return currentpercent - lastpercent;
    },
  },

  mounted() {
    this.partners.forEach((partner) => {
      this.allmonth.push(moment(partner.createdAt).month());

      if (
        moment(partner.createdAt).year() == moment().year() ||
        (moment(partner.createdAt).month() == 12 &&
          moment().year() - moment(partner.createdAt).year() == 1)
      ) {
        if (moment(partner.createdAt).month() == moment().month()) {
          this.currentmonth.push(moment(partner.createdAt).month());
        } else if (moment().month() - moment(partner.createdAt).month() == 1) {
          this.lastmonth.push(moment(partner.createdAt).month());
        }
      }
    });
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
/* карточка с количеством клиентов */

.text-wrap {
  display: flex;
  flex-flow: column;
  width: 100%;
}
.text-wrap > p,
.card-wrap > p {
  margin: 0;
  font-weight: 600;
  margin-bottom: 10px;
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
.statistics > p {
  font-size: 16px;
  font-weight: 600;
  color: green;
}
.clients-bg {
  height: 100%;
  background-image: url(../../assets/icons/clients-card-bg.png);
  background-repeat: no-repeat;
  background-size: 75px;
  background-position-x: 85%;
  background-position-y: center;
}
/* карточка с количеством клиентов */
.card-wrap {
  transition: 0.5s ease;
}
.card-wrap:hover {
  box-shadow: 0px 0px 15px #36363690;
}
</style>