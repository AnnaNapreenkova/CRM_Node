<template>
  <section id="profile-content">
    <b-container fluid class="container-inside">
      <b-row>
        <!-- Правая половина контента профиля -->
        <b-col cols="12" lg="4">
          <div class="profile-avatar-wrap" style="padding-bottom: 15px">
            <!-- <img
              src="../assets/pictures/artemiy.jpeg"
              alt=""
              class="avatar wow animate__animated animate__fadeIn"
            /> -->
            <img v-if="user"
              :src="user.img || require(`@/assets/pictures/square-avatar-placeholder.jpg`)"
              alt=""
              class="avatar wow animate__animated animate__fadeIn"
            />
            <!-- <a
              href="#"
              class="avatar-info wow animate__animated animate__fadeIn"
              >Изменить картинку</a
            > -->
            <div class="row">
                <div class="col-md-12">
                  <div class="form-group text-center">
                    <input
                      @change="chooseAvatar()"
                      ref="file"
                      type="file"
                      class="form-control-file"
                      id="photo-load"
                    />
                    <label
                      for="photo-load"
                      class="mx-auto pointer load-photo-text avatar-info wow animate__animated animate__fadeIn"
                      >Загрузить фото</label
                    >
                  </div>
                </div>
              </div>

            <a
              href="#"
              v-b-modal.modal-prevent-closing
              class="bank-info wow animate__animated animate__fadeIn"
              >Изменить банковскую информацию</a
            >
          </div>
          <div class="profile-avatar-wrap mt-3" style="padding: 15px 30px">
            <div
              class="mt-3"
              style="
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: space-between;
              "
            >
              <h3 style="font-size: 22 px">Тема:</h3>
              <div style="display: flex; align-items: center">
                <p style="margin-bottom: 0; font-weight: 500; font-size: 16px">
                  Темная
                </p>
                <input
                  @click="darkThemeSwitch"
                  type="checkbox"
                  class="toggle"
                  style="margin: 0 15px"
                />
                <p style="margin-bottom: 0; font-weight: 500; font-size: 16px">
                  Светлая
                </p>
              </div>
            </div>
          </div>
        </b-col>

        <!-- Правая половина контента профиля -->
        <!-- Левая половина контента профиля -->
        <b-col cols="12" lg="8">
          <div class="profile-info-wrap" style="padding: 15px 30px">
            <div
              class="profile-info-title wow animate__animated animate__fadeIn"
            >
              <h2>Контактная информация</h2>
              <a href="#" v-b-modal.modal-prevent-personal class="avatar-info"
                >Изменить</a
              >
            </div>
            <div class="d-flex h-100">
              <div style="width: 50%">
                <div
                  style="
                    display: flex;
                    flex-flow: column;
                    justify-content: space-between;
                    height: 100%;
                  "
                  class="wow animate__animated animate__fadeIn"
                >
                  <div v-if="user" class="profile-info">
                    <label for="">Фамилия</label>
                    <p class="full-name">{{ user.surname }}</p>
                    <label for="">Имя</label>
                    <p class="full-name">{{ user.name }}</p>
                    <label for="">Отчество</label>
                    <p class="full-name">{{ user.patronim }}</p>
                  </div>
                  <div v-if="user" class="profile-info">
                    <label style="margin-top: 15px" for=""
                      >Адрес электронной почты</label
                    >
                    <p class="email">{{ user.email }}</p>
                    <label style="margin-top: 15px" for=""
                      >Номер телефона</label
                    >
                    <p class="phone">{{ user.phone }}</p>
                    <label for="">Наименование компании</label>
                    <p class="company-name">Megaorion Group</p>
                  </div>
                </div>
              </div>
              <div style="50%">
                <div
                  style="
                    display: flex;
                    flex-flow: column;
                    justify-content: space-between;
                    height: 100%;
                  "
                  class="wow animate__animated animate__fadeIn"
                >
                  <div class="profile-info">
                    <label for="">ИНН</label>
                    <p class="full-name">{{ profile ? profile.inn ? profile.inn : "ИНН отсутствует" : null }}</p>
                    <label for="">ОГРНИП</label>
                    <p class="full-name">{{ profile ? profile.ogrn ? profile.ogrn : "ОГРНИП отсутствует" : null }}</p>
                    <label for="">Р/С</label>
                    <p class="full-name">{{ profile ? profile.rs ? profile.rs : "Р/С отсутствует" : null }}</p>
                  </div>
                  <div class="profile-info">
                    <label style="margin-top: 15px" for="">КПП</label>
                    <p class="email">{{ profile ? profile.kpp ? profile.kpp : "КПП отсутствует" : null }}</p>
                    <label style="margin-top: 15px" for="">К/С</label>
                    <p class="email">{{ profile ? profile.cs ? profile.cs : "К/С отсутствует" : null }}</p>
                    <label for="">БИК</label>
                    <p class="company-name">{{ profile ? profile.bik ? profile.bik : "ИНН отсутствует" : null }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <!-- Левая половина контента профиля -->
        <b-col cols="12" class="mt-4">
          <div class="offer-wrap">
            <div class="offer-text-wrap wow animate__animated animate__fadeIn">
              <p class="offer-title">Желаете стать нашим партнёром?</p>
              <p class="offer-text">
                Приводите клиентов для предоставления услуг, чтобы получить
                <br />Д<strong>процентный доход с прибыли!</strong><br />Доход
                от 5% со сделки с клиентом!
              </p>
            </div>
            <a
              class="offer-try wow animate__animated animate__fadeIn"
              v-b-modal.modal-prevent-closing1
              >Заказать звонок</a
            >
          </div>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      scrollable
      centered
      content-class="modal-content-bank-custom"
      header-class="modal-header-bank-custom"
      footer-class="modal-footer-bank-custom"
      hide-footer
    >
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5 class="feedback-header-custom">Банковская информация</h5>
        <b-button class="close-modal-custom" variant="danger" @click="close()">
          x
        </b-button>
      </template>
      <form
        class="custom-form-bank"
        ref="form"
       
      >
        <!-- <div
          label="Номер телефона"
          label-for="phone-input"
          invalid-feedback="Введите номер телефона"
          v-mask="'+7(###) ###-##-##'"
          :state="phoneState"
          class="webflow-style-input form-group"
        >
          <input
            placeholder="Номер телефона"
            class="bank-info-input"
            id="phone-input"
            v-mask="'+7(###) ###-##-##'"
            v-model="phone"
            :state="phoneState"
            required
          />
        </div> -->

        <div
          label="ИНН"
          label-for="inn-input"
          invalid-feedback="Введите ИНН"
          :state="innState"
          class="webflow-style-input form-group"
        >
          <input
            placeholder="ИНН"
            class="bank-info-input"
            id="inn-input"
            v-model="inn"
            v-mask="'############'"
            :state="innState"
            required
          />
        </div>

        <div
          label="ОГРНИП"
          label-for="orgnip-input"
          invalid-feedback="Введите ОГРНИП"
          :state="orgnipState"
          class="webflow-style-input form-group"
        >
          <input
            placeholder="ОГРНИП"
            class="bank-info-input"
            id="orgnip-input"
            v-model="orgnip"
            v-mask="'#############'"
            :state="orgnipState"
            required
          />
        </div>

        <div
          label="Р/С"
          label-for="rs-input"
          invalid-feedback="Введите Р/С"          
          :state="rsState"
          class="webflow-style-input form-group"
        >
          <input
            placeholder="Р/С"
            id="rs-input"
            class="bank-info-input"
            v-model="rs"
            v-mask="'####################'"
            :state="rsState"
            required
          />
        </div>

         <div
          label="КПП"
          label-for="kpp-input"
          invalid-feedback="Введите КПП"
          :state="kppState"
          class="webflow-style-input form-group"
        >
          <input
            placeholder="КПП"
            id="kpp-input"
            class="bank-info-input"
            v-model="kpp"
            v-mask="'#########'"
            :state="kppState"
            required
          />
        </div>

        <div
          label="К/С"
          label-for="cs-input"
          invalid-feedback="Введите К/С"
          :state="csState"
          class="webflow-style-input form-group"
        >
          <input
            placeholder="К/С"
            class="bank-info-input"
            id="cs-input"
            v-model="cs"
            v-mask="'####################'"
            :state="csState"
            required
          />
        </div>

        <div
          label="БИК"
          label-for="bik-input"
          invalid-feedback="Введите БИК"
          :state="bikState"
          class="webflow-style-input form-group"
        >
          <input
            placeholder="БИК"
            class="bank-info-input"
            id="bik-input"
            v-model="bik"
            v-mask="'#########'"
            :state="bikState"
            required
          />
        </div>
      </form>

       <b-button @click="changeRequisites" class="offer-try modal-try">Изменить</b-button>

      <!-- <template #modal-footer="{ changeRequisites }">
        <b-button @click="changeRequisites" class="offer-try modal-try">Изменить</b-button>
      </template> -->
    </b-modal>

    <b-modal
      id="modal-prevent-personal"
      ref="modal"
      scrollable
      centered
      content-class="modal-content-bank-custom"
      header-class="modal-header-bank-custom"
      footer-class="modal-footer-bank-custom"
    >
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5 class="feedback-header-custom">Личные данные</h5>
        <b-button class="close-modal-custom" variant="danger" @click="close()">
          x
        </b-button>
      </template>
      <form
        class="custom-form-bank personal-data"
        ref="form"
        @submit.stop.prevent="handleSubmit"
      >
        <div
          label="Фамилия"
          label-for="secondName-input"
          invalid-feedback="Введите вашу фамилию"
          :state="profile_secondNameState"
          class="webflow-style-input form-group"
        >
          <input
            placeholder="Ваша фамилия"
            class="bank-info-input"
            id="secondName-input"
            v-model="profile_secondName"
            :state="profile_secondNameState"
            required
          />
        </div>
        <div
          label="Имя"
          label-for="firstName-input"
          invalid-feedback="Введите ваше имя"
          :state="profile_firstNameState"
          class="webflow-style-input form-group"
        >
          <input
            placeholder="Ваше имя"
            class="bank-info-input"
            id="firstName-input"
            v-model="profile_firstName"
            :state="profile_firstNameState"
            required
          />
        </div>       

        <div
          label="Отчество"
          label-for="thirdName-input"
          invalid-feedback="Введите ваше отчество"
          :state="profile_thirdNameState"
          class="webflow-style-input form-group"
        >
          <input
            placeholder="Ваше отчество"
            class="bank-info-input"
            id="thirdName-input"
            v-model="profile_thirdName"
            :state="profile_thirdNameState"
            required
          />
        </div>

        <div
          label="Телефон"
          label-for="phone-input"
          invalid-feedback="Введите ваш телефон"
          :state="profile_phoneState"
          v-mask="'+7(###) ###-##-##'"
          class="webflow-style-input form-group"
        >
          <input
            placeholder="Ваш телефон"
            class="bank-info-input"
            id="thirdName-input"
            v-model="profile_phone"
            :state="profile_phoneState"
            required
          />
        </div>

        <div
          label="email"
          label-for="email-input"
          invalid-feedback="Введите ваш email"
          :state="profile_emailState"
          class="webflow-style-input form-group"
        >
          <input
            placeholder="Ваш email"
            class="bank-info-input"
            id="email-input"
            v-model="profile_email"
            :state="profile_emailState"
            required
          />
        </div>
      </form>

      <template #modal-footer="{ ok }">
        <b-button @click="changeProfile" class="offer-try modal-try">Сохранить</b-button>
        <b-button @click="ok()" class="offer-try modal-try">Закрыть</b-button>
      </template>
    </b-modal>

    <b-modal
      id="modal-prevent-closing1"
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
        <b-col cols="12" md="5" class="feed-left">
          <h2 style="margin-top: 55px; margin-bottom: 20px">Закажите звонок</h2>
          <img
            src="../assets/pictures/logo_on_black.png"
            class="img-fluid"
            alt=""
            style="padding: 0px 20px"
          />
          <p style="margin-top: 30px; font-size: 16px; font-weight: 900;">
            Оператор свяжется с вами<br />в течении <strong>10 минут!</strong>
          </p>
        </b-col>
        <b-col
          cols="12"
          md="7"
          style="
            align-items: center;
            display: flex;
            flex-flow: column;
            border-left: 5px solid rgba(30, 30, 30, 0.2);
            background: #212330;
          "
          class="feed-right"
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
                :state="phoneState_feedback"
                required
              />
            </div>
          </form>
          <b-button
            @click="ok()"
            class="offer-try modal-try modal-send-second"
            style="margin-bottom: 40px"
            >Отправить</b-button
          >
        </b-col>
      </b-row>
    </b-modal>
  </section>
</template>

<script>
import UserMapper from "@/store/user";

export default {
  name: "ProfileContent",
  props: {
    user: {
      type: Object,
      required: true,
    },

    profile: {
      type: Object,
    }
  },
  data() {
    return {
      // для модалки с изменением банковских данных      

      inn: "",
      innState: null,

      orgnip: "",
      orgnipState: null,

      rs: "",
      rsState: null,

      kpp: "",
      kppState: null,

      cs: "",
      csState: null,

      bik: "",
      bikState: null,

      // для модалки обратной связи

      phone_feedback: "",
      phoneState_feedback: null,

      name_feedback: "",
      nameState_feedback: null,

      email: "",
      emailState: null,

      // для модалки с изменением личных данных

      profile_firstName: "",
      profile_firstNameState: null,

      profile_secondName: "",
      profile_secondNameState: null,

      profile_thirdName: "",
      profile_thirdNameState: null,

      profile_phone: "",
      profile_phoneState: null,

      profile_email: "",
      profile_emailState: null,
      
    };
  },
  methods: {

    ...UserMapper.mapActions(["getUser","patchUser"]),

    async changeProfile() {
      let data = {
        surname: this.profile_secondName ? this.profile_secondName : this.user.secondName,
        name: this.profile_firstName ? this.profile_firstName : this.user.name,
        patronim: this.profile_thirdName ? this.profile_thirdName : this.user.patronim,
        phone: this.profile_phone ? this.profile_phone : this.user.phone,
        email: this.profile_email ? this.profile_email : this.user.email,
      };
      let isFormData = null
      await this.patchUser(data, isFormData);
      await this.getUser()  
       this.$bvModal.hide("modal-prevent-personal");    
    },

    async chooseAvatar() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("img", this.file);
      // await this.changeAvatar(formData);
      let isFormData = true;
      await this.patchUser(formData, isFormData);
      location.reload();
    },

    changeRequisites() {
      let data = {
        inn: this.inn ? this.inn : this.profile.inn,
        ogrn: this.orgnip ? this.orgnip : this.profile.ogrn,
        rs: this.rs ? this.rs : this.profile.rs,
        cs: this.cs ? this.cs : this.profile.cs,
        bik: this.bik ? this.bik : this.profile.bik,
        kpp: this.kpp ? this.kpp : this.profile.kpp,
      }

      this.$emit("change", data);
      this.$bvModal.hide("modal-prevent-closing");

    },


    darkThemeSwitch() {

      const toggleBtn = document.querySelector('.toggle');

      const darkThemeLink = document.querySelector("#dark-theme-style");
      if (darkThemeLink) {
        const parentNode = darkThemeLink.parentNode;
        parentNode.removeChild(darkThemeLink);
        localStorage.removeItem('lightmode');
        toggleBtn.classList.remove('checked');
      } else {
        const darkThemeLinkEl = document.createElement("link");
        darkThemeLinkEl.setAttribute("rel", "stylesheet");
        
        if(window.location.hostname == 'localhost') {
          darkThemeLinkEl.setAttribute("href", "http://localhost:8080/css/lightmode.css");
        } else if (window.location.hostname == 'lk.megaorion.ru') {
          darkThemeLinkEl.setAttribute("href", "https://lk.megaorion.ru/css/lightmode.css");
        }

        darkThemeLinkEl.setAttribute("type", "text/css");
        darkThemeLinkEl.setAttribute("id", "dark-theme-style");
        const docHead = document.querySelector("head");
        docHead.append(darkThemeLinkEl);
        localStorage.setItem('lightmode', true);
        toggleBtn.classList.add('checked');
      }
    },
    loadCss(href) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;

      link.type = "text/css";
      document.head.appendChild(link);
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
        this.$bvModal.hide("modal-prevent-closing1");
        this.$bvModal.hide("modal-prevent-personal");
      });
    },
  },

  mounted() {
    if (this.user) {
      console.log("user", this.user);
      console.log("profile", this.profile);
    }

    const toggleBtn = document.querySelector('.toggle');

    if(localStorage.getItem('lightmode')) {
      toggleBtn.classList.add('checked');
    } else {
      toggleBtn.classList.remove('checked');
      localStorage.removeItem('lightmode');
    }
  }
};
</script>

<style scoped>

.form-control-file {
  display: none;

}

.phone {
  font-weight: 500;
  font-size: 18px;
}

#profile-content {
  height: calc(100vh - 120px);
  padding-top: 20px;
  padding-bottom: 50px;
  overflow-y: auto;
}
.container-inside {
  padding: 0 !important;
  overflow: hidden;
}
.container-inside > .row > .col-md-6 {
  margin: 15px 0;
}

.profile-info-wrap,
.profile-avatar-wrap {
  border-radius: 20px;
  background: #202020;
  width: 100%;
  padding: 30px;
  height: 100%;
  display: flex;
  flex-flow: column;
}
.profile-avatar-wrap {
  align-items: center;
  height: unset;
}
.avatar {
  border-radius: 100%;
  outline: 9px solid #ffffff;
   width: 250px;
  height: 250px;
  margin-bottom: 20px;
  object-fit: cover;
}
.avatar-info {
  color: #fff;
  background: rgb(29, 93, 255);
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  margin-bottom: 0px;
  padding: 7px 15px 5px 15px;
  width: fit-content;
  border-radius: 4px;
  cursor: pointer;

  margin-top: 40px;
  transition: 0.5s ease;
}
.avatar-info:hover {
  color: #ffffff;
  background: rgba(34, 81, 248);
}
.bank-info {
  margin-top: 20px;
  color: #ffffff;
  background: rgb(227, 190, 61);
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
  color: #000;
  background: rgb(255, 221, 97);
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

.feed-left {
  background: rgb(33, 35, 48);
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
  background: radial-gradient(
    circle at 0% 0%,
    #373b52,
    #252736 51%,
    #1d1e26
  );
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

.modal-send-second {
  color: #fff !important;
}

.modal-content-feedback-custom > .modal-body {
  padding: 0;
  overflow: hidden;
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


  background-color: rgba(0,0,0, 0.4);

}

@supports (backdrop-filter: blur(5px)) {
   .modal-backdrop {
     backdrop-filter: blur(5px);
     background: url('@/assets/pictures/blur-modal-bg.png') no-repeat center / cover !important;
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

.toggle.checked {
  border-color: rgba(0,0,0, 0.2);
  background: none;
}

.toggle.checked:after {
  transform: translatex(20px);
  background: #000;
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
</style>