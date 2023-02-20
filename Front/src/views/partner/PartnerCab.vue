<template>
  <div class="home">
    <div class="partner-modal" v-show="functionality == 'none'">
      <div class="partner-modal__wrapper">
        <h3 class="partner-modal__title">Выберите тип взаимодействия</h3>
        <div class="partner-modal__block">
          <button class="partner-modal__button" @click="changeType(`client`)">
            Продолжить как клиент
          </button>
          <button class="partner-modal__button" @click="changeType(`agent`)">
            Продолжить как клиент-партнер
          </button>
          <button class="partner-modal__button" @click="changeType(`all`)">
            Оба варианта
          </button>
        </div>
      </div>
    </div>
    <Header />
    <b-container fluid style="padding: 0 50px">
      <b-row>
        <b-col cols="12" md="12">
          <TopMenu title="Домашняя" :user="profile" />
          <HomeContent />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/partner/Header_partner.vue";
import TopMenu from "@/components/Top_Menu.vue";
import HomeContent from "@/components/HomeContent.vue";
import { UserMapper } from "@/store/user";
import { PartnerMapper } from "@/store/partner";

export default {
  name: "PartnerCab",
  components: {
    Header,
    TopMenu,
    HomeContent,
  },
  //Если functionality == none, ограничить функционал и спросить какой смешарик к нам пришел
  data() {
    return {
      functionality: "",
    };
  },
  computed: {
    ...UserMapper.mapState(["error", "profile"]),
    ...PartnerMapper.mapState(["partnerProfile"]),
  },
  methods: {
    ...PartnerMapper.mapActions(["getPartnerProfile", "patchPartnerProfile"]),

    async changeType(partnertype) {
      let id = this.partnerProfile.id;
      let payload = { functionality: partnertype };

      await this.patchPartnerProfile({ id, payload });

      await this.getPartnerProfile();
      if (this.partnerProfile) {
        this.functionality = this.partnerProfile.functionality;
      }
      console.log(this.functionality);
    },
  },

  async mounted() {
    await this.getPartnerProfile();
    if (this.partnerProfile) {
      this.functionality = this.partnerProfile.functionality;
    }
    console.log(this.functionality);
  },
};
</script>

<style scoped>
.home {
  display: flex;
}

.partner-modal {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background-color: #000000c9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
}

.partner-modal__wrapper {
  position: absolute;
  max-width: 500px;
  width: 100%;
  margin: auto;
  z-index: 9999;
  padding: 35px 30px;
  background: #000;
  text-align: center;
  border-radius: 3px;
  overflow: hidden;
}

.partner-modal__wrapper:before {
  content: "";
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  height: auto;
  width: auto;
  z-index: -1;
  border-radius: inherit;
  background: inherit;
  background: linear-gradient(
    90deg,
    #0ebeff,
    #ffdd40,
    #ae63e4,
    #47cf73,
    #0ebeff,
    #ffdd40,
    #ae63e4,
    #47cf73
  );
  background-size: 200% 200%;
  animation: rainbow-border 5.5s linear infinite;
}

.partner-modal__wrapper:after {
  content: "";
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  height: auto;
  width: auto;
  z-index: -1;
  border-radius: inherit;
  background: inherit;
  margin: 3px;
  animation: rainbow-border 1.5s linear infinite;
}

@keyframes rainbow-border {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

.partner-modal__title {
  margin: 5px auto 30px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
}

.partner-modal__block {
  display: flex;
  flex-direction: column;
}

.partner-modal__button {
  display: inline-block;
  width: auto;
  height: auto;
  background: #1d3573;
  color: #ffffff !important;
  border: none;
  text-decoration: none !important;
  transition: 0.5s cubic-bezier(0.7, -1.51, 0.36, 2.19);
  font-weight: 600;
  font-size: 18px;
  border-radius: 10px;
  /* min-width: fit-content; */
  padding: 10px 25px;
  margin-bottom: 15px;
}

/* .partner-modal__button:first-child {
  margin-bottom: 15px;
} */
</style>
