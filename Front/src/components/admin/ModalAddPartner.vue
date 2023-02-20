<template>
  <b-modal
    hide-footer
    hide-header
    centered
    dialog-class="modal-dialog-client-custom"
    content-class="modal-content-client-custom"
    header-class="modal-header-client-custom"
    footer-class="modal-footer-client-custom"
    v-model="showDialog"
    @hidden="$emit('close')"
  >
    
    <!-- <button
      @click="$emit('close')"
      class="btn-invisible-button absolute-block close-modal-icon"
    >      
    </button> -->
    <div class="w-100 m-0 modal-body pl-3 h-auto pb-0">
      <h2 class="client-header-custom">Новый партнер</h2>

      <!-- <form class="client-form" @submit.stop.prevent="handleSubmit"> -->
      <!-- <form class="client-form" >
        <div class="row client-inputs mt-3">
          <input
            v-model="newUser.name"
            placeholder="ФИО"
            type="text"
            class="form-control pl-3"
          />
        </div>
        <div class="row client-inputs">
          <input
            v-model="newUser.email"
            placeholder="Email"
            type="text"
            class="form-control pl-3"
          />
        </div>
        <div class="row client-inputs">
          <input
            type="text"
            class="form-control pl-3"
            v-mask="'+7(###)###-##-##'"
            placeholder="Телефон"
            v-model="newUser.phone"
          />
        </div>

        <div class="button-wrapper">
          <button
            @click.prevent="
              $emit('add', user);
              $emit('close');
            "
            class="btn-modal-create-user"
          >
            Создать
          </button>
        </div>
      </form> -->

      <form class="client-form">
        <div class="row client-inputs client-inputs-services mt-3">
          <div
            class="service-input-wrapper"
            @click="showList"
            ref="clientInputOpened"
          >
            <div class="input-block"></div>
            <input
              ref="clientInput"              
              placeholder="Тип партнера"
              type="text"
              class="form-control pl-3"
              style="cursor: pointer"
            />
          </div>
          <ul
            class="service-list list-index"
            ref="serviceList"
            v-show="isClientList"
          >
            <li
              class="service-item"
              v-for="(item, i) in clientList"
              :key="item"
              @click="chooseClient(item, i)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="row client-inputs mt-3">
          <input
            v-if="isClientType == 0"
            v-model="newUser.name"
            placeholder="ФИО"
            type="text"
            class="form-control pl-3"
          />
          <input
            v-if="isClientType == 1"
            v-model="newUser.name"
            placeholder="Наименование"
            type="text"
            class="form-control pl-3"
          />
          <input
            v-if="isClientType == 2"
            v-model="newUser.orgName"
            placeholder="Наименование"
            type="text"
            class="form-control pl-3"
          />
        </div>
        <div
          v-if="isClientType == 1 || isClientType == 2"
          class="row client-inputs mt-3"
        >
          <input
            v-model="newUser.inn"
            placeholder="ИНН"
            type="text"
            v-mask="'############'"
            class="form-control pl-3"
          />
        </div>
        <div v-if="isClientType == 2" class="row client-inputs mt-3">
          <input
            v-model="newUser.kpp"
            placeholder="КПП"
            type="text"
            v-mask="'#########'"
            class="form-control pl-3"
          />
        </div>
        <div v-if="isClientType == 2" class="row client-inputs mt-3">
          <input
            v-model="newUser.ogrn"
            placeholder="ОГРН"
            type="text"
            v-mask="'#############'"
            class="form-control pl-3"
          />
        </div>
        <div class="row client-inputs">
          <input
            v-model="newUser.email"
            placeholder="Email"
            type="text"
            class="form-control pl-3"
          />
        </div>
        <div class="row client-inputs">
          <input
            type="text"
            class="form-control pl-3"
            v-mask="'+7(###)###-##-##'"
            placeholder="Телефон"
            v-model="newUser.phone"
          />
        </div>
        <div class="row client-inputs">
          <input
            type="text"
            class="form-control pl-3"            
            placeholder="Партнерский процент"
            v-model="newUser.percent"
          />
        </div>

        <div v-if="isClientType == 2" class="row client-inputs mt-3">
          <input
            v-model="newUser.person"
            placeholder="Контактное лицо"
            type="text"
            class="form-control pl-3"
          />
        </div>
        <div v-if="isClientType == 2" class="row client-inputs mt-3">
          <input
            v-model="newUser.post"
            placeholder="Должность"
            type="text"
            class="form-control pl-3"
          />
        </div>

        <div class="button-wrapper">
          <button
            @click.prevent="
              $emit('add', user);
              $emit('close');
            "
            class="btn-modal-create-user"
          >
            Создать
          </button>
        </div>
      </form>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "ModalAddPartner",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        phone: "",
        orgName: "",
        type: "",
        inn: "",
        kpp: "",
        ogrn: "",
        person: "",
        post: "",
        percent: null,
        role: "Partner",
      },

      clientList: [
        "Физическое лицо",
        "Индивидуальный предприниматель",
        "Юридическое лицо",
      ],
      isClientList: false,
      isClientType: 0,
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.show;
      },
      set() {
        this.$emit("update:show");
      },
    },
    user() {
      return {
        surname: this.newUser.name.split(" ")[0],
        name: this.newUser.name.split(" ")[1],
        patronim: this.newUser.name.split(" ")[2],
        orgName: this.newUser.orgName,
        email: this.newUser.email,
        phone: this.newUser.phone,
        inn: this.newUser.inn,
        kpp: this.newUser.kpp,
        ogrn: this.newUser.ogrn,
        person: this.newUser.person,
        percent: this.newUser.percent,
        post: this.newUser.post,
        role: this.newUser.role,
        func: "none",
      };
    },
  },

  methods: {
    chooseClient(item, index) {
      this.$refs.clientInput.setAttribute("placeholder", item);
      this.$refs.clientInput.setAttribute("value", item);
      this.$refs.clientInput.classList.add("input-color");
      this.isClientList = false;
      this.$refs.clientInputOpened.classList.remove("opened");

      this.isClientType = index;
    },

    showList() {
      this.isClientList = !this.isClientList;
      this.$refs.clientInputOpened.classList.toggle("opened");
    },
  },
};
</script>

<style scoped>
.service-input-wrapper {
  padding: 0 !important;
  position: relative;
  width: 100%;
}

.service-input-wrapper:before {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  background: url(@/assets/icons/dropdown-arrow.svg) no-repeat center / cover;
  right: 10px;
  top: 10px;
  transform-origin: 50%;
  transition: 0.5s;
}

.service-input-wrapper.opened:before {
  transform: rotate(180deg);
}

.service-list {
  list-style: none;
  text-align: left;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  background-color: #292b3c;
  max-height: 150px;
  overflow-y: auto;
  padding: 0;
}

.list-index {
  z-index: 1000;
}

.service-item {
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: 0.3s;
}

.service-item:hover {
  background-color: #7a7a7a;
}

.service-item:last-child {
  border-bottom: none;
}

.select {
  width: 50%;
  background-color: #c9c9c9;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: #000;
}
h2 {
  font-size: 22px;
  font-weight: 500;
  line-height: 27px;
  color: #000;
}
.modal-body {
  height: 400px;
  width: 465px;
  display: flex;
  flex-flow: column nowrap;
}
.close-modal-icon {
  top: 10px;
  right: 10px;
  height: 15px;
  width: 15px;
}
.close-modal-icon > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.admin-inputs > input {
  background: unset;
  border: none;
  outline: none;
  width: 300px;
  height: 30px;
  margin: 0;
  border-radius: 0 !important;
  border-bottom: 1px solid #2b2a29;
  border-radius: 5px;
}
.admin-inputs > input:focus {
  border: none;
  outline: none;
  border-bottom: 1px solid #2b2a29;
}
.btn-modal-create-user {
  background: #9276e4;
  border: none;
  height: 35px;
  width: 90px;
  border-radius: 40px;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  transition: 0.5s ease;
}
.btn-modal-create-user:hover {
  box-shadow: 0px 0px 15px #00000030;
}
.btn-modal-create-user:focus,
.btn-modal-create-user:active {
  transform: scale(1.05);
}
</style>

<style>

.modal-content-client-custom {
  border-radius: 20px;
  background: transparent;
  color: #ffffff;
  text-align: center;
  box-shadow: 6px 6px 6px #1b1a1f, -6px -6px 6px #24232661;
  background-image: radial-gradient( circle at 0% 0%, #373b52, #252736 51%, #1d1e26 );
}
.modal-content-client-custom > .modal-body {
  padding: 20px;
  padding-top: 0;
  overflow: hidden;
}
.modal-try {
  background: #1d5dff;
  color: #ffffff !important;
  border: none;
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



.modal-content-client-custom .client-header-custom {
  margin: 5px auto;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
}

.modal-content-client-custom .client-form {
  display: flex;
  flex-wrap: wrap;
}

.modal-content-client-custom .form-control {
  margin: 15px 0;
  width: 100%;
  margin: 0 !important;
  color: #bfd2ff;
  background: rgba(57, 63, 84, 0.8);
  border-radius: 2px;
  padding: 23px 20px;
  border: none;
}

.modal-content-client-custom .client-inputs {
  width: 100%;
  margin: 15px 0;
  position: relative;
}

.modal-content-client-custom .client-inputs:after {
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
  -webkit-animation: gradient 3s linear infinite;
  animation: gradient 3s linear infinite;
}

.button-wrapper {
  width: 100%;
  padding-top: 15px;
}

.modal-content-client-custom .btn-modal-create-user {
  display: inline-block;
  margin: 0 auto;
  width: auto;
  height: auto;
  background: #1d5dff;
  color: #ffffff !important;
  border: none;
  text-decoration: none !important;
  transition: 0.5s cubic-bezier(0.7, -1.51, 0.36, 2.19);
  font-weight: 600;
  font-size: 18px;
  border-radius: 10px;
  /* min-width: fit-content; */
  padding: 10px 25px;
}

.modal-content-client-custom .btn-modal-create-user:hover {
  transform: scale(1.1);
}

@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}
</style>