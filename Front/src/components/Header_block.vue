<template>
  <div
    class="wrap client-header ducking-header"
    v-click-outside="externalClick"
    id="header_block"
  >
    <a href="#" class="logo-link">
      <div class="logo-block">
        <!-- <img src="@/assets/icons/logo-mini-megaorion.png" alt="" /> -->
        <img src="@/assets/icons/logo-anim-css.svg" alt="" />
        <div class="text-logo-wrap">
          <p class="company-name clever-animation">Megaorion</p>
          <p class="company-desc clever-animation">Личный кабинет</p>
        </div>
      </div>
    </a>

    <p class="top-menu-text clever-animation"></p>

    <ul class="left-menu-crap">
      <router-link class="home-link" :to="'/client'"
        ><li class="home-tab clever-animation">
          <img src="../assets/icons/home-page-icon.svg" alt="" />
          <p class="mobile-hide clever-animation">Домашняя</p>
        </li></router-link
      >
      <router-link class="project-link" :to="'/services'">
        <li class="project-tab clever-animation">
          <img src="../assets/icons/project-page-icon.svg" alt="" />
          <p class="mobile-hide clever-animation">Услуги</p>
          <div class="notification-bubble mobile-hide">
            <p>{{ services.length }}</p>
          </div>
        </li></router-link
      >
      <router-link class="contacts-link" exact :to="'#'">
        <li class="contacts-tab clever-animation">
          <img src="../assets/icons/contacts-page-icon.svg" alt="" />
          <p class="mobile-hide clever-animation">Контакты</p>
        </li></router-link
      >
      <router-link class="kanban-link" exact :to="'##'">
        <li class="kanban-tab clever-animation">
          <img src="../assets/icons/kanban-page-icon.svg" alt="" />
          <p class="mobile-hide clever-animation">Kanban</p>
          <div class="notification-bubble mobile-hide clever-animation">
            <p>15</p>
          </div>
        </li></router-link
      >
      <router-link class="analytics-link" exact :to="'###'"
        ><li class="analytics-tab clever-animation">
          <img src="../assets/icons/analytics-page-icon.svg" alt="" />
          <p class="mobile-hide clever-animation">Аналитика</p>
        </li></router-link
      >
      <router-link class="calendar-link" exact :to="'####'">
        <li class="calendar-tab clever-animation">
          <img src="../assets/icons/calendar-page-icon.svg" alt="" />
          <p class="mobile-hide clever-animation">Календарь</p>
        </li></router-link
      >
      <!-- <router-link :to="'/'"
        ><li class="messages-tab">
          <img src="../assets/icons/messages-page-icon.svg" alt="" />
          <p>Мессенджер</p>
        </li></router-link
      > -->
      <router-link class="exit-link" :to="'/client'" v-if="isClientInfo">
        <li class="exit-tab clever-animation">
          <img
            src="../assets/icons/exit-logout.svg"
            style="width: 24px; margin-right: 5px"
            alt=""
          />
          <p class="mobile-hide clever-animation">Выход</p>
        </li></router-link
      >
    </ul>
    <b-button variant="123" @click="logOut()" class="offer-try header-exit">
      <img
        src="@/assets/icons/exit-logout.svg"
        class="img-fluidd clever-animation"
        style="width: 24px; filter: brightness(0)"
        alt=""
      />
      <p class="m-0 mobile-hide clever-animation">Выйти</p>
    </b-button>
    <div class="mobile-hide copyright clever-animation">
      <p class="bold-copyright clever-animation">Megaorion Group</p>
      <p class="lil-copyright clever-animation">© 2022 Вcе права защищены</p>
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
// import { PartnerMapper } from "@/store/partner"
import { UserMapper } from "@/store/user";
import { ClientMapper } from "@/store/client";

export default {
  name: "Header_block",
  props: {
    isClientInfo: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  directives: {
    clickOutside: vClickOutside.directive,
  },

  data() {
    return {
      services: [],
    };
  },

  computed: {
    ...UserMapper.mapState(["error", "profile"]),
  },

  methods: {
    ...ClientMapper.mapActions(["getClientServices"]),

    externalClick() {
      var menu = document.querySelector("#header_block");
      menu.classList.remove("duck-you");
    },
    logOut() {
      this.$router.push({ name: "main-login" });
    },
  },

  async mounted() {
    let services = await this.getClientServices();

    if (services) {
      this.services = services;
    }
  },
};
</script>

<style scoped>
.wrap {
  height: 100vh;
  width: 345px;
  display: flex;
  flex-flow: column;
  padding: 35px 20px 20px;
  font-weight: 600;
  border-right: 2px solid rgb(51, 51, 51);
  transition: 0.5s linear;
}
.logo-block {
  display: flex;
  padding: 0 30px;
}
.logo-block > img {
  width: 60px;
  height: auto;
  margin: auto;
  margin-right: 15px;
}
.text-logo-wrap {
  display: flex;
  flex-flow: column;
}

.company-name {
  font-size: 22px;
  line-height: 26px;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  color: #ffffff;
}
.company-desc {
  font-size: 14px;
  font-weight: 500;
  color: #717579;
  margin: 0;
}
.top-menu-text {
  margin: 30px 0 15px 30px;
  color: #ffffff90;
  font-weight: 600;
  font-size: 18px;
}
.offer-try {
  min-width: fit-content;
  padding: 10px 25px;
  background-color: #fff;
  color: #000000 !important;
  text-decoration: none !important;
  transition: 0.5s cubic-bezier(0.7, -1.51, 0.36, 2.19), padding 0s;
  font-weight: 600;
  font-size: 18px;
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
}
.offer-try:hover {
  transform: scale(1.1);
}

.left-menu-crap {
  list-style: none;
  padding: 0;
}
.left-menu-crap > a {
  text-decoration: none !important;
}
.left-menu-crap > a > li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px 30px;
  width: 100%;
  border-radius: 15px;
  background-color: transparent;
  transition: 0.5s cubic-bezier(0.8, 0, 0.2, 1), padding 0s;
  cursor: pointer;
  color: #ffffff;
  text-decoration: none !important;
}
.left-menu-crap > a > .home-tab:hover,
.home-link.router-link-active > .home-tab {
  background-color: #1d5dff;
}
.left-menu-crap > a > .project-tab:hover,
.project-link.router-link-active > .project-tab {
  background-color: #2e93d0;
}
.left-menu-crap > a > .contacts-tab:hover,
.contacts-link.router-link-active > .contacts-tab {
  background-color: rgb(227, 190, 61);
}
.left-menu-crap > a > .kanban-tab:hover,
.kanban-link.router-link-active > .kanban-tab {
  background-color: #bd098a;
}
.left-menu-crap > a > .analytics-tab:hover,
.analytics-link.router-link-active > .analytics-tab {
  background-color: #09bd3c;
}
.left-menu-crap > a > .calendar-tab:hover,
.calendar-link.router-link-active > .calendar-tab {
  background-color: #c500a4;
}
.left-menu-crap > a > .messages-tab:hover,
.messages-link.router-link-active > .messages-tab {
  background-color: #af1921;
}

.left-menu-crap > a > .exit-tab:hover,
.exit-link.router-link-active > .exit-tab {
  background-color: #d0412e;
}

.left-menu-crap > a > li > p {
  font-weight: 500;
  font-size: 18px;
  margin: 0px 0px 0px 25px;
}
.left-menu-crap > a > li > img {
  opacity: 0.6;
  transition: 0.5s ease;
}
.left-menu-crap > a > li:hover > img {
  opacity: 1;
}

.notification-bubble {
  margin-left: 20px;
  border-radius: 10px;
  padding: 7px 7px 5px 7px;
}
.notification-bubble > p {
  color: #ffffff;
  margin-bottom: 0;
  line-height: normal;
  margin-top: 1px;
}
.project-tab > .notification-bubble {
  background-color: #09bd3c;
}
.kanban-tab > .notification-bubble {
  background-color: #1d5dff;
}

.bold-copyright {
  margin: 50px 0 0px 30px;
  font-size: 18px;
  color: #ffffff;
  font-weight: 600;
}
.lil-copyright {
  margin: 10px 0 0px 30px;
  color: #717579;
  font-size: 14px;
  font-weight: 400;
}
.logo-link {
  text-decoration: none;
}
.logo-link > img {
  transition: 0.5s ease;
}

.offer-try {
  padding: 13px 30px;
  background-color: #fff;
  color: #000000 !important;
  text-decoration: none !important;
  transition: 0.5s cubic-bezier(0.8, 0, 0.2, 1), padding 0s;
  font-weight: 600;
  font-size: 18px;
  border-radius: 15px;
  width: 100%;
  display: flex;
  border: 2px solid #fff;
}
.offer-try > p {
  margin-left: 25px !important;
  transition: 0.5s cubic-bezier(0.8, 0, 0.2, 1), padding 0s;
}

.offer-try > img {
  transition: 0.5s cubic-bezier(0.8, 0, 0.2, 1), padding 0s;
}
.offer-try:hover {
  background-color: #000;
  transform: none !important;
}

.offer-try:hover > p {
  color: #fff;
}
.offer-try:hover > img {
  filter: brightness(1) !important;
}
@media (max-width: 1100px) {
  .ducking-header {
    position: fixed;
    background: #161717;
    z-index: 999;
    transition: 1s cubic-bezier(0.86, 0, 0.07, 1);
    transform: translateX(-100%);
  }
  .duck-you {
    transform: translateX(0%) !important;
  }
}

#header_block.mini > .left-menu-crap > a > li > p {
  /* animation: hideElement 1s linear forwards; */
  display: none;
}

#header_block.mini > .top-menu-text {
  /* animation: hideElement 1s linear forwards; */

   opacity: 0;
}

#header_block.mini .company-name {
  /* animation: hideElement 1s linear forwards; */
   display: none;
}

#header_block.mini .company-desc {
  /* animation: hideElement 1s linear forwards; */
}

#header_block.mini .copyright {
  /* animation: hideElement 1s linear forwards; */
   display: none;
}

#header_block.mini {
  width: 110px;
  padding-left: 0;
  padding-right: 0;
  padding-left: 10px;
  padding-right: 10px;
}

#header_block.mini .logo-block > img {
  margin-right: auto;
}

#header_block.mini > .left-menu-crap > a > li > img {
  margin: 0 auto;
}

#header_block.mini .header-exit > p {
  animation: hideElement 1s linear forwards;
}

#header_block.mini .header-exit > img {
  margin-right: 0 !important;
}

#header_block.mini .documents-tab > .notification-bubble {
  animation: hideElement 1s linear forwards;
}
#header_block.mini .project-tab > .notification-bubble {
    display: none;
}

#header_block.mini .kanban-tab > .notification-bubble {
    display: none;
}

#header_block.mini .left-menu-crap > a > li {
  width: fit-content;
  margin: 0 auto 10px;
  padding: 15px 20px;
}
#header_block.mini .left-menu-crap > a > li {
  width: 100%;
  margin: 0 auto 10px;
  padding: 15px 0 !important;
  display: flex;
  justify-content: center;
}
#header_block.mini .left-menu-crap > a > li > p {
  margin: 0;
}
#header_block.mini .left-menu-crap > a > li > .notification-bubble {
  margin: 0;
  padding: 0;
  display: none !important;
}

#header_block.mini .header-exit {
  width: fit-content;
  padding: 10px 18px;
}

#header_block.mini > a > div > .text-logo-wrap {
  visibility: hidden;
  width: 1px !important;
  transform: scale(0.1);
}

#header_block.mini > a > .logo-block {
  padding: 0;
}

#header_block.mini .offer-try {
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
}

#header_block.mini .offer-try > p {
  margin: 0 !important;
  display: none;
}

@keyframes hideElement {
  /* 0% {
    display: block !important;
    opacity: 1;
  } */

  0% {
    /* display: none !important; */
    transform: scale(1);
    opacity: 1;
    width: 100%;
  }
  60% {
    transform: scale(0.01);
    opacity: 0;
    width: 50%;
  }
  100% {
    transform: scale(0.01);
    opacity: 0;
    width: 1px;
    /* display: none !important; */
  }
}

@keyframes showElement {
  0% {
    transform: scale(0.01);
    opacity: 0;
    width: 1px;
  }
  60% {
    transform: scale(0.01);
    opacity: 0;
    width: 50%;
  }
  100% {
    transform: scale(1);
    opacity: 1;
    width: 100%;
  }
}
</style>