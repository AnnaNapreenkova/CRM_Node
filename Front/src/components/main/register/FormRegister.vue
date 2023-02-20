<template>
  <div class="signinup mx-auto">
    <div class="m-0 align-items-center signinup__header-blue">
      <!-- <div class="col-4"><p class="white-link my-auto">{{ version.textversion }}</p></div> -->

      <img style="width: 90px; margin-right: 15px;" src="@/assets/icons/logo-mini-megaorion.png" alt="" />
      <h1 class="header-text my-auto">Регистрация</h1>
    </div>
    <div
      class="row m-0 align-items-center signinup__content"
      style="display: flex; justify-content: center"
    >
      <div class="col text-center">
        <form>
          <div class="form-group mt-4 pt-2">
            <input
              type="email"
              class="form-control pl-3"
              placeholder="E-mail"
              v-model="email"
            />
          </div>
          <div class="form-group my-4">
            <input
              type="text"
              class="form-control pl-3"
              v-mask="'+7(###)###-##-##'"
              placeholder="Телефон"
              v-model="phone"
            />
          </div>
          <div class="form-group">
            <b-button
              @click="register()"
              class="btn form__button offer-try"
              style="margin-top: 10px; margin-bottom: 10px"
            >
              <p class="my-auto">Зарегистрироваться</p>
            </b-button>

            <p
              class="mt-3 registered-link"
              @click="$router.push({ name: 'main-login' })"
            >
              Если вы уже зарегистрированы, нажмите сюда
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { UserMapper } from "@/store/user";

export default {
  name: "FormRegister",
  props: {
    role: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      email: "",
      phone: "",
    };
  },
  computed: {
    ...UserMapper.mapState(["error"]),
    registerForm() {
      return {
        email: this.email,
        phone: this.phone,
        role: this.role,
      };
    },
    sendCodeButtonDisable() {
      return this.phone.length < 15;
    },
    registerButtonDisabled() {
      return !(this.email && this.phone);
    },
  },
  methods: {
    ...UserMapper.mapActions({ signUp: "signUp" }),
    async register() {
      await this.signUp(this.registerForm);
      if (!this.error) {
        this.toast(
          "Вы успешно зарегистрировались",
          "Пароль для входа отправлен на вашу почту",
          "success"
        );
        setTimeout(this.toLogin, 2000);
      } else {
        /* this.errorToast(this.error); */
      }
    },
    toLogin() {
      this.$router.push({ name: "main-login" });
    },
  },
};
</script>

<style scoped>
h1{
  color: #fff;
}
.signinup {
  align-items: center;
  background: linear-gradient(212.43deg, #3f8392 19.43%, #1d3573 87.63%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  padding: 30px 40px;
}
.text-right {
  text-align: right;
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
  background-color: #fff;
}
.registered-link {
  cursor: pointer;
  font-weight: 500;
  transition: 0.5s cubic-bezier(0.7, -1.51, 0.36, 2.19);
}
.registered-link:hover {
  transform: scale(1.1);
}

.signinup__header-blue{
  display: flex;
  justify-content: center;
  flex-flow: row;
  align-items: center;
}
.form-control {
  border-radius: 10px;
  color: #000;
}

</style>
