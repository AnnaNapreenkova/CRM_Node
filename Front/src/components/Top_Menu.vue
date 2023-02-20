<template>
  <section class="menu-section">
    <a href="#" class="menu-link">
      <div @click="show_menu()" ref="dropdown" class="menu-block">
        <img src="../assets/icons/burger.svg" alt="" />
        <h1>{{ title }}</h1>
      </div>
    </a>
    <div class="menu-wrap">
      <!-- <input class="menu-search" placeholder="Поиск..." type="text" /> -->
      <div class="menu-notifications">
        <div
          id="notification-bell"
          class="notification-icon bell profile-popup"
          @click="clickbell"
        >
          <img
            class="icon-to-dark"
            src="../assets/icons/notifications.svg"
            alt=""
          />
          <div v-if="notifications" class="notification-counter">
            <p>
              {{
                notifications.length
                  ? notifications.filter(
                      (notification) => notification.read == false
                    ).length
                  : 0
              }}
            </p>
          </div>

          <b-popover
            class="pr-3"
            target="notification-bell"
            placement="bottom"
            triggers="focus hover"
          >
            <PopoverNotifications
              :notifications="notifications"
              @modal="shownote"
            />
          </b-popover>
        </div>
        <router-link :to="'/tickets'">
          <div id="notification-email" class="notification-icon email">
            <img
              class="icon-to-dark"
              src="../assets/icons/messages.svg"
              alt=""
            />
            <div v-if="mails" class="notification-counter">
              <p>{{ newMessages }}</p>
            </div>
          </div>
        </router-link>
        <div id="notification-calendar" class="notification-icon calendar">
          <img
            class="icon-to-dark"
            src="../assets/icons/calendar-page-icon.svg"
            alt=""
          />
          <div v-if="events" class="notification-counter">
            <p>{{ events }}</p>
          </div>
        </div>
        <router-link class="notification-icon settings" :to="'/profile'">
          <img src="../assets/icons/settings.svg" alt="" />
        </router-link>
      </div>

      <div class="profile-link"
        ><div class="profile-block">
          <!-- <img class="profile-logo" src="../assets/icons/placeholder.png" alt="" /> -->
          <img class="profile-logo" :src="user.img || require(`@/assets/pictures/square-avatar-placeholder.jpg`)" alt="" />
          <div class="profile-info">
            <p class="profile-name">{{ user.surname }} {{ user.name }}</p>
            <p class="profile-email">{{ user.email }}</p>
          </div>
          <div class="profile-language">
            <p>RUS</p>
            <img class="top-menu-arrow" src="../assets/icons/arrow.svg" alt="" />
          </div></div
      ></div>
    </div>
    <b-modal v-model="modalShow" body-class="modal-notification-body" footer-class="modal-notification-footer" centered ok-only hide-header>
      <div>
        <ul>
          <li
            @click="shownote(notification.link)"
            v-for="notification in notifications"
            :key="notification.id"
          >
            <p style="font-weight: 500; margin-bottom: 10px;">{{ notification.title }}</p>
            <p>{{ notification.text }}</p>
            <hr />
          </li>
        </ul>
      </div>
    </b-modal>
  </section>
</template>
 
 <script>
import PopoverNotifications from "@/components/PopoverNotifications.vue";
import { NotificationMapper } from "@/store/notification";
import { TicketsMapper } from "@/store/tickets";
import moment from "moment";
export default {
  name: "Top_Menu",
  components: { PopoverNotifications },
  props: {
    title: String,
    user: {
      type: Object,
      required: true,
    },

    // tickets: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data() {
    return {
      showMenu: false,
      modalShow: false,
      // title: "",
      text: "",
      email: "",
      // notifications: 1,
      mails: 1,
      events: 1,
      tickets: []
    };
  },

  computed: {
    ...NotificationMapper.mapState(["notifications", "lastnotifications"]),

    newMessages() {
      let messages = this.tickets.filter(ticket => ticket.read == false).length;
     
      return messages;
    }
  },

  methods: {
    ...NotificationMapper.mapActions([
      "getNotifications",
      "getLastNotifications",
      "patchNotification",
    ]),

    ...TicketsMapper.mapActions([
      "getTickets",      
    ]),

    show_menu: function () {
      // var menu = document.querySelector("#header_block");
      // menu.classList.add("menuclass");
      const headerBlock = document.querySelector('#header_block');
      let cleverAnims = document.getElementsByClassName('clever-animation');
     
      if(headerBlock.classList.contains('mini')) {
        headerBlock.classList.remove('mini');
        localStorage.removeItem('mini');

         headerBlock.style.transition = "0.5s";

      for(let i = 0; i < cleverAnims.length; i++){
          cleverAnims[i].style.transition = "0.5s";
          cleverAnims[i].style.animationDuration = "1s";
        } 
      } else {
        headerBlock.classList.add('mini');
        localStorage.setItem('mini', true);

        
      }
    },

    clickbell() {
      this.modalShow = true;
    },

    async shownote(link, id = 0) {
      this.$router.push(link);

      if (id > 0) {
        let data = {
          read: true,
        };

        await this.patchNotification({ id, data });
      }
    },
  },

  async mounted() {
    const headerBlock = document.querySelector('#header_block');
    let cleverAnims = document.getElementsByClassName('clever-animation');

    if(localStorage.getItem('mini')) {
    headerBlock.classList.add('mini');

    headerBlock.style.transition = "0s";

    for(let i = 0; i < cleverAnims.length; i++){
      cleverAnims[i].style.transition = "0s";
      cleverAnims[i].style.animationDuration = "0s";
    } 

   
    } else {
      headerBlock.classList.remove('mini');
      localStorage.removeItem('mini');
    }

    

    let tickets = await this.getTickets();
    console.log("tickets", tickets);

    if (tickets) {
      this.tickets = tickets.data;
      this.tickets.forEach(ticket=>ticket.createdAt = moment(ticket.createdAt).format("L"));
      console.log("currentTickets", this.tickets);
    }

    
    console.log("user_top_menu", this.user);

    await this.getNotifications();
    // await this.getLastNotifications();

    console.log("user", this.user);
  },
};
</script>
 
<style>
.popover-body{
  max-height: 65vh;
  overflow-y: auto;
  padding-bottom:0px;
}
.popover-row > div > div> h3{
  font-size: 1.15rem;
  padding-top: 10px;
}
.popover-row > div > div> p{
  font-size: 0.9rem;
  margin-bottom: 0;
}
.modal-notification-footer{
  border-color: transparent;
}
.modal-notification-body{
  padding-top: 40px;
  padding-bottom: 0;

    max-height: 50vh;
      overflow-y: auto;
}

</style>

<style scoped>
.profile-popup {
  transition: 0.1s linear;
}
/* .profile-popup:hover,
.profile-popup:focus,
.profile-popup:active {
  background: rgba(237, 135, 25, 0.28);
} */

.menu-section {
  display: flex;
  padding: 30px 0;
  justify-content: space-between;
}
.menu-wrap {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.menu-block {
  display: flex;
  align-items: center;
}
.menu-link {
  color: #ffffff;
  text-decoration: none !important;
  transition: 0.5s ease-in-out;
  margin: auto 0;
}
.menu-link > div > img {
  transition: 0.5s;
}
.menu-link:hover > div > img {
  transform: rotate(90deg);
}
.menu-block > img {
  margin-right: 30px;
}
.menu-block > h1 {
  font-size: 32px;
  line-height: 32px;
  font-weight: 700;
  margin: 0;
}
.menu-notifications {
  display: flex;
  align-items: center;
}
.notification-icon {
  position: relative;
  margin: 0px 25px;
}

.notification-counter {
  position: absolute;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 7px 7px 5px 7px;
  top: -20px;
  right: -20px;
}
.bell > .notification-counter {
  background-color: #1d5dff;
}
.email > .notification-counter {
  background-color: #d0412e;
}
.calendar > .notification-counter {
  background-color: #09bd3c;
}
.notification-counter > p {
  color: #ffffff;
  margin-bottom: 0;
  line-height: normal;
  margin-top: 1px;
  font-weight: 700;
}
.profile-block {
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-search {
  padding: 15px;
  border-radius: 15px;
  background: #2b2b2b;
  border: 1px solid #2b2b2b !important;
  outline: none !important;
  color: #fff;
}

.top-menu-arrow {
  filter: brightness(2);
}

.profile-logo {
  background: #c4c4c4;
  border-radius: 10px;
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.profile-info {
  margin-left: 15px;
  display: flex;
  flex-flow: column;
  justify-content: center;
}
.profile-name {
  font-weight: 600;
  margin-bottom: 0px;
}
.profile-email {
  margin-bottom: 0;
  color: #cdd5dd;
}
.profile-language {
  margin-left: 20px;
  display: flex;
  padding: 13px 15px 6px 15px;
  border-radius: 10px;
  border: 2.5px solid #1d5dff;
}
.profile-language > p {
  margin: 0;
  margin-right: 15px;
  font-weight: bold;
  color: #1d5dff;
}

.settings,
.bell {
  transition: 0.5s ease;
}
.settings:hover {
  transform: rotate(360deg);
}

.bell:hover > img,
.email > img,
.calendar > img {
  cursor: pointer;
  box-shadow: 0 0 0 rgba(44, 204, 196, 0.4);
  border-radius: 10px;
}
.bell:hover > img {
  animation: pulse-blue 1s, ring 1.5s;
}
.email:hover > img {
  animation: pulse-red 1s, ring 1.5s;
}
.calendar:hover > img {
  animation: pulse-green 1s, ring 1.5s;
}

@keyframes pulse-blue {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(44, 193, 204, 0.8);
  }
  70% {
    -webkit-box-shadow: 0 0 0 20px rgba(44, 199, 204, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(44, 199, 204, 0);
  }
}
@keyframes pulse-red {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 103, 44, 0.8);
  }
  70% {
    -webkit-box-shadow: 0 0 0 20px rgba(204, 148, 44, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 116, 44, 0);
  }
}
@keyframes pulse-green {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(44, 204, 84, 0.8);
  }
  70% {
    -webkit-box-shadow: 0 0 0 20px rgba(63, 204, 44, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(49, 204, 44, 0);
  }
}
@keyframes ring {
  0% {
    -webkit-transform: rotateZ(0);
  }
  9% {
    -webkit-transform: rotateZ(30deg);
  }
  19% {
    -webkit-transform: rotateZ(-30deg);
  }
  26% {
    -webkit-transform: rotateZ(18deg);
  }
  32% {
    -webkit-transform: rotateZ(-16deg);
  }
  40% {
    -webkit-transform: rotateZ(14deg);
  }
  47% {
    -webkit-transform: rotateZ(-12deg);
  }
  55% {
    -webkit-transform: rotateZ(10deg);
  }
  62% {
    -webkit-transform: rotateZ(-8deg);
  }
  69% {
    -webkit-transform: rotateZ(6deg);
  }
  75% {
    -webkit-transform: rotateZ(-4deg);
  }
  80% {
    -webkit-transform: rotateZ(2deg);
  }
  85% {
    -webkit-transform: rotateZ(-1deg);
  }
  90% {
    -webkit-transform: rotateZ(1deg);
  }
  100% {
    -webkit-transform: rotateZ(0);
  }
}
.profile-link {
  color: #ffffff;
  text-decoration: none !important;
}



@media (max-width: 1500px) {
  .menu-search {
    display: none;
  }
}
@media (max-width: 1100px) {
  .menu-block > h1 {
    font-size: 24px;
  }
  .notification-icon {
    position: relative;
    margin: 0px 15px;
  }
  .profile-language,
  .profile-email {
    display: none;
  }
  .profile-link {
    margin-left: 15px;
  }
}
</style>