<template>
  <div id="app">
    <div v-if="!lilscreen"><router-view /></div>
    <div v-else>
      <div
        class="text-center"
        style="
          min-height: 100vh;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
        "
      >
        <h1 style="padding: 0px 40px; line-height: 1.5">
          СИСТЕМА НЕ ПОДДЕРЖИВАЕТ ЭКРАНЫ С ТАКИМ МАЛЕНЬКИМ РАЗРЕШЕНИЕМ.<br />ПОЖАЛУЙСТА,
          ПЕРЕВЕРНИТЕ ВАШ ПЛАНШЕТ ИЛИ ТЕЛЕФОН В ПОРТРЕТНЫЙ РЕЖИМ.
        </h1>
        <img
          class="signinup-logo w-50 mt-5"
          src="@/assets/logo_on_black.png"
          alt="Логотип"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      lilscreen: false,
    };
  },
  methods: {
    darkThemeSwitch() {

      if (localStorage.getItem('lightmode')) {
        const darkThemeLink = document.querySelector("#dark-theme-style");

        if (darkThemeLink) {
          const parentNode = darkThemeLink.parentNode;
          parentNode.removeChild(darkThemeLink);
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
        }
      }
    },
  },
  mounted() {
    if (window.screen.width < 1280) {
      this.lilscreen = true;
    }

      this.darkThemeSwitch();
  },
};
</script>
<style>

.toast:not(.show) {
   display: block;
}


/* @media (prefers-color-scheme: light) {
  @import "../src/assets/lightmode";
} */
p {
  margin: 0;
  font-weight: 300;
}
body {
  margin: 0;
  font-family: Comfortaa !important;
}
#app {
  font-family: Comfortaa;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  background-color: #161717;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  transition: 0.5s ease;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

a {
  cursor: pointer !important;
}

/* #app {
  color: #000000 !important;
  background-color: #F2F2F2!important;
}
.left-menu-crap > a > li {
  color: #000000 !important;
}
.left-menu-crap > a > li > img,
.menu-block > img {
  filter: brightness(0);
}
.card-wrap,
.profile-avatar-wrap,
.profile-info-wrap,
.wrap-servise,
.wrap-card,
.wrap-tickets {
  background-color: #fff !important;
}
#progressbar {
  background-color: #b0bcbc;
}
.current-target-number > p,
.menu-block > h1,
.profile-block,
.progress-title,
.progress-text,
.company-name,
.bold-copyright,
.messages-title,
.project-title-text,
.user-name,
.user-message,
.checkout-balance-text,
.ticket-title-wrap > .title,
.message-textarea {
 color: #171B1E !important;
}
.top-menu-text{
  color: #16171790 !important;
}
.left-menu-crap > a > li:hover, .message-get, .message-send {
  color: #fff !important;
}
.left-menu-crap > a > li:hover > img {
  filter: brightness(1);
}
.border-project {
  border: 2px solid #fff6f617 !important;
}
.offer-wrap {
  background: linear-gradient( 212.43deg, #8bd1e6 19.43%, #38dbff 87.63% ) !important;
}
.icon-to-dark,
.settings > img,
.servise-cons-wrap {
  filter: brightness(0) !important;
}
.card-wrap:hover {
  box-shadow: 6px 6px 6px #1b1a1f17, -6px -6px 6px #24232612 !important;
}
.progress {
  background-color: #535557 !important;
}
.light-style {
  background-color: #161717 !important;
  color: #ffffff !important;
}
.blocked-servise::after {
  background: repeating-linear-gradient(
    -60deg,
    #55555521 0,
    #55555521 1px,
    transparent 2px,
    transparent 5px
  );
}
.bank-info {
  color: #ff9b00;
  background: rgba(239, 197, 27, 0.15);
}
.button-send:hover {
  background: #1d3573!important;
  color: #fff!important;
  transform: scale(1.03);
}
.wrap{
  border-right: 2px solid rgb(51, 51, 51, 0.15)!important;
} */
</style>
