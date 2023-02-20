<template>
  <b-modal
    id="modal-prevent-closing1"
    v-model="showCallModal"
    ref="modal"
    scrollable
    centered
    dialog-class="modal-dialog-feedback-custom"
    content-class="modal-content-feedback-custom"
    header-class="modal-header-feedback-custom"
    footer-class="modal-footer-feedback-custom"
    hide-header
    hide-footer
  >
    <b-row style="margin: 0">
      <b-col cols="12" md="5">
        <h2 style="margin-top: 55px; margin-bottom: 20px">Закажите звонок</h2>
        <img
          src="@/assets/pictures/logo_on_black.png"
          class="img-fluid"
          alt=""
          style="padding: 0px 20px"
        />
        <p style="margin-top: 30px; font-size: 16px">
          Оператор свяжется с вами<br />в течении <strong>10 минут!</strong>
        </p>
      </b-col>
      <b-col
        class="partner-call-modal"
        cols="12"
        md="7"
        style="
          align-items: center;
          display: flex;
          flex-flow: column;
          border-left: 5px solid rgba(30, 30, 30, 0.2);
          background: #212330;
        "
      >
        <form
          style="width: 75%; padding-top: 40px; padding-bottom: 30px"
          ref="form"
          @submit.stop.prevent="handleSubmit"
        >
          <div
            id="group-for-name"
            label-for="name-input_feedback"
            invalid-feedback="Напишите, как к вам обращаться"
            :state="nameState_feedback"
            class="webflow-style-input form-group"
          >
            <input
              placeholder="Ваше имя"
              class="bank-info-input"
              id="name-input_feedback"
              v-model="name_feedback"
              :state="nameState_feedback"
              required
            />
          </div>

          <div
            id="group-for-phone"
            label-for="phone-input_feedback"
            invalid-feedback="Введите номер телефона"
            v-mask="'+7(###) ###-##-##'"
            :state="phoneState_feedback"
            class="webflow-style-input form-group mt-4"
          >
            <input
              placeholder="Ваш номер телефона"
              class="bank-info-input"
              id="phone-input_feedback"
              v-model="phone_feedback"
              v-mask="'+7(###) ###-##-##'"
              :state="phoneState_feedback"
              required
            />
          </div>
        </form>
        <b-button
          @click="calling"
          class="offer-try modal-try modal-send-btn"
          style="margin-bottom: 40px; color: #fff;"
          >Отправить</b-button
        >
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { AdminMapper } from "@/store/admin";
import { UserMapper } from "@/store/user";
import { NotificationMapper } from "@/store/notification";
export default {
  name: "SupportCallModal",

  data() {
    return {
      nameState_feedback: "",
      name_feedback: "",
      phoneState_feedback: "",
      phone_feedback: "",
    };
  },

  props: {
      showCallModal: {
          type: Boolean,
          default: false
  },
  },

  computed: {
    ...UserMapper.mapState(["error", "profile"]),
  },

  methods: {
    ...AdminMapper.mapActions(["postEmail"]),
    ...NotificationMapper.mapActions(["postNotification", "getNotification"]),

    async calling() {
      let data = {
        user: "admin",
        from: this.profile.id,
        type: "call",
        title: "Запрос для звонка",
        text: `Клиент ${this.profile.surname} ${this.profile.name} ${this.profile.patronim} попросил обратный звонок`,
        link: `detail/${this.profile.id}`,
      };

      await this.postNotification(data);

      await this.postEmail(this.profile);
      // this.$emit("showCallModal");
      this.$bvModal.hide("modal-prevent-closing1");

    },
  },
};
</script>

<style>
.modal-dialog-feedback-custom {
  max-width: 900px;
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
  background-image: radial-gradient(
    circle at 0% 0%,
    #373b52,
    #252736 51%,
    #1d1e26
  );
}


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

.bank-info-input {
  margin: 10px 0;
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

#group-for-phone > label {
  margin-top: 30px;
  font-weight: 600;
  font-size: 18px;
}
#group-for-name > label {
  font-weight: 600;
  font-size: 18px;
}

.form-group {
  margin: 15px 0;
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

.bank-info-input {
  margin: 10px 0;
}

.offer-try {
  min-width: fit-content;
  padding: 10px 25px;
  background-color: #fff;
  color: #000000;
  text-decoration: none !important;
  transition: 0.5s cubic-bezier(0.7, -1.51, 0.36, 2.19);
  font-weight: 600;
  font-size: 18px;
  border-radius: 10px;
}

.offer-try:hover {
  transform: scale(1.1);
}

.modal-send-first {
  color: #000 !important;
}

.modal-send-second {
  color: #fff !important;
}

</style>