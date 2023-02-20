<template>
  <div class="signinup mx-auto ">
    <div class="m-0 signinup__header-blue">
      <h1 class="signinup__title">Вход</h1>
      <p class="signinup__subtitle">С возвращением!</p>
    </div>
    <div
      class="row m-0 align-items-center signinup__content"
      style="justify-content: center; display: flex"
    >
      <div class="col" style="padding: 0;">
        <form>
          <div class="form-group" style="margin-bottom: 20px;">
            <input
              type="email"
              class="form-control"
              placeholder="E-mail"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <input
              v-on:keyup.enter="login"
              type="password"
              class="form-control"
              placeholder="Пароль"
              v-model="password"
            />
          </div>
          <div class="form-group signin-wrapper">

                <b-button @click="login()" class="signin-login-btn offer-try modal-try color-white"
                  >Войти</b-button
                >
                <b-button
                  @click="showResetModal = !showResetModal"
                  class="signin-forget-btn offer-try modal-try color-white"
                  >Забыли пароль?</b-button
                >
          </div>
        </form>
      </div>
    </div>
    <div class="signinup-footer">
      <img class="signinup-logo" src="@/assets/logo_on_black.png" alt="Логотип">
    </div>
    <b-modal
      title="Забыли пароль?"
      centered
      content-class="forgot-pass-modal"
      v-model="showResetModal"
      cancel-title="Отмена"
      ok-title="Прислать пароль"
      @ok="changePassword"
    >
      <p>Введите адрес вашей электронной почты.</p>

      <div
        label="Ваш e-mail"
        label-for="inputEmail"
        invalid-feedback="Введите ваш email"
        class="webflow-style-input form-group"
      >
        <input
          placeholder="Ваш e-mail"
          class="bank-info-input"
          id="inputEmail"
          v-model="inputEmail"
          required
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { UserMapper } from "@/store/user";
import { PartnerMapper } from "@/store/partner"
export default {
  name: "FormLogin",
  data() {
    return {
      errors: [],
      password: "",
      email: "",
      phone: "",
      inputEmail: "",
      showResetModal: false,
    };
  },
  props: {
    type: Number,
  },
  computed: {
    ...UserMapper.mapState(["error", "profile"]),
    ...PartnerMapper.mapState(["partnerProfile"]),

    payload() {
      return {
        email: this.email,
        password: this.password,
      };
    },
    loginButtonDisabled() {
      return !(this.email && this.password);
    },
    userLinks() {
      return {
        Admin: "admin-cab",
        Manager: "manager-cab",
        AdminClient: "client-cab",
        PartnerClient: "client-cab",          
        Partner: "partner-cab"      
         
      };
    },
  },
  methods: {
    ...UserMapper.mapActions(["signIn", "getUser", "signOut", "ForgetPassword"]),
    async login() {
      await this.signIn(this.payload);
      if (!this.error) {
        await this.getUser();
        if (!this.profile.isBaned) {
          this.$router.push({ name: this.userLinks[this.profile.role] });
        } else {
          await this.toast(
            "Бан",
            `Данный аккаунт заблокирован.
            Причина блокировки: ${this.profile.banReason || "Неизвестна"}`,
            "danger"
          );
          this.signOut();
        }             
      } else {
        this.errorToast(this.error);
      }
    },
    async changePassword() {
      let data = { email: this.inputEmail };
      await this.ForgetPassword(data);
      await this.toast("Новый пароль выслан на почту");
      this.showPasswordModal = false;
    },
  },
};
</script>
<style>
.forgot-pass-modal{
  color: #fff!important;
  background-color: transparent;

  border-radius: 15px;
  box-shadow: 8px 8px 8px #1b1a1f, -8px -8px 8px #24232661;
}
.modal-header {
  border-bottom: none;
}
.modal-footer{
  border-top: none;

}
.close{
  display: none;
}
</style>

<style>
.forgot-pass-modal {
  color: #fff !important;
  background-color: transparent;

  border-radius: 15px;
  box-shadow: 8px 8px 8px #1b1a1f, -8px -8px 8px #24232661;
}
.modal-header {
  border-bottom: none;
}
.modal-footer {
  border-top: none;
}
.close {
  display: none;
}
</style>

<style scoped>
h1 {
  color: #fff;
}

.signinup {
  align-items: center;
  border-radius: 20px;
  padding: 30px 0;
  max-width: 360px;
}

.signinup__title {
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  color: #FFFFFF;
  margin-bottom: 12px;
}

.signinup__subtitle {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
  margin-bottom: 32px;
}

.text-right {
  text-align: right;
}

.form-control {
  background-color: #131117;
  border-radius: 12px;
  color: #fff;
  padding: 25px 15px;
  border: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  /* border: 3px solid #3870FF60; */
  box-shadow: 0px 0px 5px #3870FF60;
  transition: 0.5s ease;
}

.form-control:hover, .form-control:focus{
  box-shadow: 0px 0px 10px #3870FF;
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-group:first-child .form-control:first-child {
  margin-bottom: 10px;
}

.form-group:nth-child(2) .form-control {
  margin-bottom: 30px;
}

.signin-wrapper {
  display: flex;
  flex-direction: column;
}

.signin-login-btn {
  margin-bottom: 25px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
  padding: 15px;
  background: #1d5dff;
  border-radius: 12px;
  border: none;
}

.signin-forget-btn {
  background: none !important;
  border: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #3870FF;
  padding: 0;
  outline: none;
}

.signin-forget-btn:focus{
  outline: none !important;
}

.signinup-footer {
  width: 100%;
  margin-top: 80px;
}

.signinup-logo {
  max-width: 100%;
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
  margin: 0;
  min-width: 100%;
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
  padding: 10px 0;
}
.webflow-style-input input::-webkit-input-placeholder {
  color: #7881a1;
}

.color-white {
  color: #fff !important;
}
</style>
