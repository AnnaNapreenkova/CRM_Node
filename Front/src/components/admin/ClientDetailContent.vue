<template>
  <section id="client-detail">
    <b-container fluid class="container-inside">
      <b-row class="main-row">
        <!-- Правая половина контента профиля -->
        <b-col cols="12" class="info-wrapper">
          <b-row>
            <b-col cols="12" lg="4">
              <div class="profile-avatar-wrap">
                <!-- <img
                  src="@/assets/pictures/artemiy.jpeg"
                  alt=""
                  class="avatar wow animate__animated animate__fadeIn"
                /> -->
                <img
                  :src="
                    account.img ||
                    require(`@/assets/pictures/square-avatar-placeholder.jpg`)
                  "
                  alt=""
                  class="avatar wow animate__animated animate__fadeIn"
                />
              </div>
            </b-col>
            <b-col cols="12" lg="8">
              <div class="main-wrapper">
                <h2 class="contact-title">Контактная информация</h2>
                <div class="d-flex h-100 w-100">
                  <div style="width: 100%">
                    <div
                      style="
                        display: flex;
                        justify-content: space-between;
                        height: 100%;
                      "
                      class="wow animate__animated animate__fadeIn"
                    >
                      <div class="profile-info">
                        <label for="">Фамилия</label>
                        <p class="full-name">{{ account.surname }}</p>
                        <label for="">Имя</label>
                        <p class="full-name">{{ account.name }}</p>
                        <label for="">Отчество</label>
                        <p class="full-name">{{ account.patronim }}</p>
                      </div>
                      <div class="profile-info">
                        <label for="">Адрес электронной почты</label>
                        <p class="email">{{ account.email }}</p>
                        <label for="">Номер телефона</label>
                        <p class="phone">{{ account.phone }}</p>
                        <label for="">Наименование компании</label>
                        <p class="company-name">{{ client.company || "-" }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>

        <!-- Правая половина контента профиля -->
        <!-- Левая половина контента профиля -->
        <b-col cols="12" style="padding-top: 30px">
          <h2>Услуги</h2>
          <ServisesContent
            style="height: auto"
            :isHidden="false"
            :services="services"
            @addservice="getAllServices"
          />
          <h2 class="agreements-title">Договоры</h2>
          <AgreementsContent
            v-if="agreements.length"
            :agreements="agreements"
            :services="services"
          />
        </b-col>
        <!-- Левая половина контента профиля -->
        <b-col cols="12" class="mt-4">
          <div class="offer-wrap">
            <div class="offer-text-wrap wow animate__animated animate__fadeIn">
              <p class="offer-title">Желаете стать нашим партнёром?</p>
              <p class="offer-text">
                Приводите клиентов для предоставления услуг, чтобы получить
                <br /><strong>процентный доход с прибыли!</strong><br />Доход от
                5% со сделки с клиентом!
              </p>
            </div>
            <!-- <a
              class="offer-try wow animate__animated animate__fadeIn"
              v-b-modal.modal-prevent-closing1
              >Заказать звонок</a
            > -->
            <a
              class="offer-try wow animate__animated animate__fadeIn"
              v-b-modal.modal-prevent-closing1
              >Заказать звонок</a
            >
          </div>
        </b-col>
      </b-row>
    </b-container>
    <SupportCallModal
      :showCallModal="showCallModal"
      @showCallModal="showCallModal = false"
    />
  </section>
</template>

<script>
import { AdminMapper } from "@/store/admin";
import AgreementsContent from "@/components/AgreementsContent.vue";
import ServisesContent from "@/components/ServisesContent.vue";
import SupportCallModal from "../SupportCallModal.vue";

export default {
  name: "ClientDetailContent",
  data() {
    return {
      shown: false,
      agreements: [],
      showCallModal: false,
    };
  },
  components: {
    AgreementsContent,
    ServisesContent,
    SupportCallModal,
  },
  computed: {
    ...AdminMapper.mapState(["client", "account", "services"]),
  },
  methods: {
    ...AdminMapper.mapActions([
      "getUserDetails",
      "getClientDetails",
      "getServices",
      "getClientAgreements",
    ]),
    async getDetails() {
      await this.getUserDetails(this.$route.params.id);
      await this.getClientDetails(this.$route.params.id);
      await this.getServices(this.$route.params.id);
      await this.getClientAgreements(this.$route.params.id);
    },

    async getAllServices() {
      // await this.getUserDetails(this.$route.params.id);
      // await this.getClientDetails(this.$route.params.id);
      await this.getServices(this.$route.params.id);
      let agreements = await this.getClientAgreements(this.$route.params.id);
      if (agreements) {
        this.agreements = agreements;
      }

      console.log("services", this.services);
    },
  },

  async mounted() {
    await this.getUserDetails(this.$route.params.id);
    await this.getClientDetails(this.$route.params.id);
    await this.getServices(this.$route.params.id);
    let agreements = await this.getClientAgreements(this.$route.params.id);
    if (agreements) {
      this.agreements = agreements;
    }
    console.log("agreements", this.agreements);
    console.log("client", this.client);
    console.log("services", this.services);
  },
};
</script>

<style scoped>
#client-detail {
  height: calc(100vh - 120px);
  padding-top: 20px;
  padding-bottom: 50px;
  overflow-y: auto;
}

.agreements-title {
  margin-bottom: 35px;
}

.phone {
  font-weight: 500;
  font-size: 18px;
}

.info-wrapper {
  border-radius: 20px;
  background: #202020;
  margin-bottom: 20px;
  padding: 30px;
}

.profile-info-wrap,
.profile-avatar-wrap {
  border-radius: 20px;
  background: #202020;
  width: 100%;

  height: 100%;
  display: flex;
  flex-flow: row;
}
.profile-avatar-wrap {
  justify-content: center;
  align-items: flex-start;
  height: unset;
  /* padding-top: 45px; */
  /* padding-bottom: 15px; */
}

.avatar {
  border-radius: 100%;
  outline: 9px solid #ffffff;
  width: 250px;
  height: 250px;
  object-fit: cover;
  /* margin-bottom: 50px; */
  align-self: center;
  /* margin-right: 80px; */
  /* margin-bottom: 30px; */
}
.avatar-info {
  color: #2251f8;
  background: rgba(34, 81, 248, 0.15);
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  margin-bottom: 0px;
  padding: 7px 15px 5px 15px;
  width: fit-content;
  border-radius: 4px;

  margin-top: 40px;
  transition: 0.5s ease;
}
.avatar-info:hover {
  color: #ffffff;
  background: rgba(34, 81, 248);
}
.bank-info {
  margin-top: 20px;
  color: #eac947;
  background: rgba(234, 201, 71, 0.15);
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  margin-bottom: 0px;
  padding: 7px 15px 5px 15px;
  width: fit-content;
  border-radius: 4px;
  transition: 0.5s ease;
}
.bank-info:hover {
  color: #ffffff;
  background: rgb(161, 139, 49);
}

.profile-info-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}
.profile-info-title > h2 {
  font-weight: 600;
}
.profile-info-title > .avatar-info {
  margin-top: 0;
}

.full-name,
.email,
.company-name {
  font-size: 18px;
  font-weight: 500;
}

.offer-wrap {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(212.43deg, #1d3573 19.43%, #3f8392 87.63%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  padding: 25px 40px;
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
.modal-try {
  background: #1d5dff;
  color: #ffffff !important;
  border: none;
}
.offer-text {
  margin-bottom: 0;
}

.form-group {
  margin: 15px 0;
}
.bank-info-input {
  margin: 10px 0;
}
.close {
  background: red;
}
.modal-content {
  border-radius: 15px;
}

.personal-data > .form-group {
  margin: 15px 0;
  width: 100%;
  max-width: 100%;
}
</style>

<style>
.modal-header-feedback-custom,
.modal-header-bank-custom {
  color: #fff;
  padding-top: 15px;
  padding-bottom: 0px;
  margin-bottom: -10px;
  border-bottom: none;
}
.modal-footer-feedback-custom,
.modal-footer-bank-custom {
  justify-content: center;
  padding-top: 0px;
  padding-bottom: 20px;
  color: #fff;
  border-top: none;
}
.modal-header-feedback-custom {
  background: transparent;
}
.modal-footer-feedback-custom {
  background: transparent;
}

.modal-header-bank-custom {
  background: transparent;
}
.modal-footer-bank-custom {
  background: transparent;
}

.modal-content-bank-custom {
  border-radius: 20px;
  background: transparent;
  color: #ffffff;
  text-align: center;
  background-color: #2d2e33;
  box-shadow: 6px 6px 6px #1b1a1f, -6px -6px 6px #24232661;
}
.modal-content-bank-custom > .modal-body {
  padding-right: 20px;
  padding-left: 20px;
  overflow: hidden;
}
.modal-content-feedback-custom {
  border-radius: 20px;
  background: transparent;
  color: #ffffff;
  text-align: center;
  box-shadow: 6px 6px 6px #1b1a1f, -6px -6px 6px #24232661;
}
.modal-content-feedback-custom > .modal-body {
  padding: 0;
  overflow: hidden;
}
.modal-content-feedback-custom .modal-send-first {
  color: #000 !important;
}

.modal-content-feedback-custom .modal-send-second {
  color: #fff !important;
}

#group-for-phone > label {
  margin-top: 30px;
  font-weight: 600;
  font-size: 18px;
}
#group-for-name > label {
  font-weight: 600;
  font-size: 18px;
}
.feedback-header-custom {
  margin: 5px auto;
  font-size: 20px;
  font-weight: 600;
}
.close-modal-custom {
  font-size: 20px;
  font-weight: 600;
  padding-right: 14px;
  padding-left: 14px;
  padding-top: 3px;
  border-radius: 100px;
  display: none;
}
.custom-form-bank {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.custom-form-bank > .form-group {
  margin: 15px 0;
  width: 48%;
}
.profile-info > label {
  font-weight: 300;
}
.modal-backdrop {
  opacity: 1;
  /* background-color: unset;
  background-image: radial-gradient(
    circle at 0% 0%,
    #373b52,
    #252736 51%,
    #1d1e26
  ); */

  background-color: rgba(0, 0, 0, 0.4);
}

@supports (backdrop-filter: blur(5px)) {
  .modal-backdrop {
    backdrop-filter: blur(5px);
    background: url("@/assets/pictures/blur-modal-bg.png") no-repeat center /
      cover !important;
  }
}

@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}

.webflow-style-input {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 2px;
  padding: 0 20px;
  background: rgba(57, 63, 84, 0.8);
}
.webflow-style-input:after {
  content: "";
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 999;
  height: 2px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  background-position: 0% 0%;
  background: linear-gradient(
    to right,
    #b294ff,
    #57e6e6,
    #feffb8,
    #57e6e6,
    #b294ff,
    #57e6e6
  );
  background-size: 500% auto;
  animation: gradient 3s linear infinite;
}

.webflow-style-input input {
  flex-grow: 1;
  color: #bfd2ff;
  vertical-align: middle;
  border-style: none;
  background: transparent;
  outline: none;
}
.webflow-style-input input::-webkit-input-placeholder {
  color: #7881a1;
}
.modal-dialog-feedback-custom {
  max-width: 900px;
}
.col-md-8 > form {
  padding: 30px 40px;
  width: 75%;
}

input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}
input[type="checkbox"]:focus {
  outline: 0;
}

.toggle {
  height: 32px;
  width: 52px;
  border-radius: 16px;
  display: inline-block;
  position: relative;
  margin: 0;
  border: 2px solid #474755;
  background: linear-gradient(180deg, #2d2f39 0%, #1f2027 100%);
  transition: all 0.2s ease;
}
.toggle:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 1px 2px rgba(44, 44, 44, 0.2);
  transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
}
.toggle.checked {
  border-color: rgba(0, 0, 0, 0.2);
  background: none;
}

.toggle.checked:after {
  transform: translatex(20px);
  background: #000;
}
</style>
