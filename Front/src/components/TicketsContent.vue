<template>
  <section id="tickets-content" class="tickets-content">
    <b-container fluid class="container-inside">
      <!-- <div
        v-if="profile.role != 'Admin'"
        class="wrap-tickets mb-5"
        style="padding: 3em; height: max-content"
      >
        <b-row>
          <div class="col-12">
            <button
              class="ticket__create-btn"
              @click="showTicketForm = !showTicketForm"
            >
              + Создать новый тикет
            </button>
          </div>

          <transition v-if="showTicketForm" name="fade">
            <div class="ticket-wrapper col-6">
              <form action="">
                <div class="row client-inputs client-inputs-services mt-3">
                  <input
                    id="ticket-theme"
                    type="text"
                    v-model="ticketTitle"
                    placeholder="Введите тему тикета"
                    class="
                      form-control
                      pl-3
                      row
                      client-inputs client-inputs-services
                      mt-3
                    "
                  />
                </div>
                <div class="row">
                  <div class="select-service col-12">
                    <div
                      class="row client-inputs client-inputs-services mt-3 mr-5"
                    >
                      <div
                        class="service-input-wrapper"
                        @click="showList(1)"
                        ref="serviceInputOpened"
                      >
                        <div class="input-block"></div>
                        <input
                          ref="serviceInput"
                          v-model="serviceItem"
                          placeholder="Услуга"
                          type="text"
                          class="form-control pl-3 ticket-self-input"
                          style="cursor: pointer"
                        />
                      </div>
                      <ul
                        class="service-list list-index"
                        ref="serviceList"
                        v-show="isServiceList"
                      >
                        <li
                          class="service-item"
                          v-for="(item, i) in serviceList"
                          :key="i"
                          @click="chooseService(item, i)"
                        >
                          {{ item }}
                        </li>
                      </ul>
                    </div>

                  <div class="row client-inputs client-inputs-services mt-3">
                    <div
                      class="service-input-wrapper"
                      @click="showList(2)"
                      ref="detailInputOpened"
                    >
                      <div class="input-block"></div>
                      <input
                        ref="serviceDetailInput"
                        v-model="detailService"
                        placeholder="Продукт"
                        type="text"
                        class="form-control pl-3"
                        style="cursor: pointer"
                      />
                    </div>
                    <ul
                      class="service-list list-index"
                      ref="serviceList"
                      v-show="serviceDetailList"
                    >
                      <li
                        class="service-item"
                        v-for="(item, i) in serviceDetail"
                        :key="i"
                        @click="chooseDetail(item)"
                      >
                        <div class="input-block"></div>
                        <input
                          ref="serviceDetailInput"
                          v-model="detailService"
                          placeholder="Детальная услуга"
                          type="text"
                          class="form-control pl-3"
                          style="cursor: pointer"
                        />
                        </li>
                        </ul>
                      </div>
                      <ul
                        class="service-list list-index"
                        ref="serviceList"
                        v-show="serviceDetailList"
                      >
                        <li
                          class="service-item"
                          v-for="(item, i) in serviceDetail"
                          :key="i"
                          @click="chooseDetail(item)"
                        >
                          {{
                            `Id сервиса: ${item.id}, Цена: ${item.service_price}`
                          }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="row client-inputs client-inputs-services mt-3">
                  <textarea
                    name=""
                    id="ticket-text"
                    cols="30"
                    rows="5"
                    style="width: 100%"
                    v-model="ticketMessage"
                    placeholder="Введите текст тикета"
                    class="
                      form-control
                      pl-3
                      row
                      client-inputs client-inputs-services
                      mt-3
                      mr-5
                    "
                  ></textarea>
                </div>
              </form>

              <div class="send-block">
                <button @click="createTiccet" class="button-send">
                  Отправить
                </button>
                <input
                  id="loadFile"
                  ref="ticketFile"
                  type="file"
                  style="display: none"
                />
                <a class="file-attach" href="#">
                  <label for="loadFile"
                    ><img src="../assets/icons/file.svg" alt=""
                  /></label>
                </a>
              </div>
            </div>
          </transition>
        </b-row>
      </div> -->

      <div
        v-if="profile.role != 'Admin'"
        class="wrap-tickets mb-5"
        style="padding: 3em; height: max-content"
      >
        <b-row>
          <div class="col-12">
            <button class="ticket__create-btn" @click="showTicketForm = !showTicketForm">+ Создать новый тикет</button>
          </div>

          <transition v-if="showTicketForm" name="fade">
            <div class="ticket-wrapper col-6">
              <form action="">
                
                <div class="row client-inputs client-inputs-services mt-3">
                  <input
                  id="ticket-theme"
                  type="text"
                  v-model="ticketTitle"
                  placeholder="Введите тему тикета"
                  class="form-control pl-3 row client-inputs client-inputs-services mt-3"
                />
                </div>
                <div class="row">
                  <div class="select-service col-12">
                  <div class="row client-inputs client-inputs-services mt-3 mr-5">
                    <div
                      class="service-input-wrapper"
                      @click="showList(1)"
                      ref="serviceInputOpened"
                    >
                      <div class="input-block"></div>
                      <input
                        ref="serviceInput"
                        v-model="serviceItem"
                        placeholder="Услуга"
                        type="text"
                        class="form-control pl-3 ticket-self-input"
                        style="cursor: pointer"
                      />
                    </div>
                    <ul
                      class="service-list list-index"
                      ref="serviceList"
                      v-show="isServiceList"
                    >
                      <li
                        class="service-item"
                        v-for="(item, i) in serviceList"
                        :key="i"
                        @click="chooseService(item, i)"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </div>

                  <div class="row client-inputs client-inputs-services mt-3">
                    <div
                      class="service-input-wrapper"
                      @click="showList(2)"
                      ref="detailInputOpened"
                    >
                      <div class="input-block"></div>
                      <input
                        ref="serviceDetailInput"
                        v-model="detailService"
                        placeholder="Продукт"
                        type="text"
                        class="form-control pl-3"
                        style="cursor: pointer"
                      />
                    </div>
                    <ul
                      class="service-list list-index"
                      ref="serviceList"
                      v-show="serviceDetailList"
                    >
                      <li
                        class="service-item"
                        v-for="(item, i) in serviceDetail"
                        :key="i"
                        @click="chooseDetail(item)"
                      >
                        {{ `Id сервиса: ${item.id}, Цена: ${item.service_price}` }}
                      </li>
                    </ul>
                  </div>
                </div>
                </div>

                
                <div class="row client-inputs client-inputs-services mt-3">
                  <textarea
                  name=""
                  id="ticket-text"
                  cols="30"
                  rows="5"
                  style="width: 100%"
                  v-model="ticketMessage"
                  placeholder="Введите текст тикета"
                  class="form-control pl-3 row client-inputs client-inputs-services mt-3 mr-5"
                ></textarea>
                </div>
              </form>

              <div class="send-block">
                <button @click="createTiccet" class="button-send">Отправить</button>
                <input
                  id="loadFile"
                  ref="ticketFile"
                  type="file"
                  style="display: none"
                />
                <a class="file-attach" href="#">
                  <label for="loadFile"
                    ><img src="../assets/icons/file.svg" alt=""
                  /></label>
                </a>
              </div>
            </div>
          </transition>
        </b-row>
      </div>
      
      <div class="wrap-tickets">
        <b-row>
          <b-col
            cols="12"
            md="4"
            lg="4"
            xl="4"
            style="height: 100%; overflow-y: auto; padding-top: 20px; padding-bottom: 20px"
            class="wow animate__animated animate__fadeIn"
          >
            <div class="title-tickets">
              <p>
                Ваши тикеты <span>{{ actualTickets.length }}</span>
              </p>
            </div>

            <div>
              <b-tabs content-class="mt-3">
                <b-tab class="messages-tab" title="Актуальные" active>
                  <p v-if="profile.role == 'Admin'" class="type-of-ticket">
                    Клиенты
                  </p>

                  <div
                    @click="getMessages(ticket.id)"
                    v-for="ticket in actualTickets.filter(
                      (ticket) =>
                        ticket.user.role == 'AdminClient' ||
                        ticket.user.role == 'PartnerClient'
                    )"
                    :key="ticket.id"
                    class="ticket-wrap"
                  >
                    <!-- <img
                      v-if="ticket.read"
                      src="../assets/icons/checked.svg"
                      alt=""
                      class="checked"
                    /> -->
                    <!-- <img src="../assets/icons/placeholder.png" alt="" /> -->
                    <img
                      :src="
                        ticket.user.img
                          ? ticket.user.img
                          : require('../assets/icons/placeholder.png')
                      "
                      alt=""
                      class="userimg"
                    />
                    <div class="title-message-wrap">
                      <div class="ticket-title-wrap">
                        <p class="title">{{ ticket.title }}</p>
                        <p class="time">{{ ticket.createdAt }}</p>
                        <div
                          v-if="!ticket.read"
                          class="circle"
                        >
                          1
                        </div>
                      </div>
                      <p>{{ ticket.theme }}</p>
                    </div>
                  </div>

                  <p v-if="profile.role == 'Admin'" class="type-of-ticket mt-3">
                    Партнеры
                  </p>
                  <div
                    @click="getMessages(ticket.id)"
                    v-for="ticket in actualTickets.filter(
                      (ticket) => ticket.user.role == 'Partner'
                    )"
                    :key="ticket.id"
                    class="ticket-wrap"
                  >
                    <!-- <img
                      v-if="ticket.read"
                      src="../assets/icons/checked.svg"
                      alt=""
                      class="checked"
                    /> -->
                    <img
                      :src="
                        ticket.user.img
                          ? ticket.user.img
                          : require('../assets/icons/placeholder.png')
                      "
                      alt=""
                      class="userimg"
                    />
                    <div class="title-message-wrap">
                      <div class="ticket-title-wrap">
                        <p class="title">{{ ticket.title }}</p>
                        <p class="time">{{ ticket.createdAt }}</p>
                        <div
                          v-if="!ticket.read"
                          class="circle"
                        >
                          1
                        </div>
                      </div>
                      <p>{{ ticket.theme }}</p>
                    </div>
                  </div>
                </b-tab>
                <b-tab title="Архив" class="messages-tab">
                  <p v-if="profile.role == 'Admin'" class="type-of-ticket">
                    Клиенты
                  </p>

                  <div
                    @click="getMessages(ticket.id)"
                    v-for="ticket in archiveTickets.filter(
                      (ticket) =>
                        ticket.user.role == 'AdminClient' ||
                        ticket.user.role == 'PartnerClient'
                    )"
                    :key="ticket.id"
                    class="ticket-wrap"
                  >
                    <!-- <img
                      v-if="ticket.read"
                      src="../assets/icons/checked.svg"
                      alt=""
                      class="checked"
                    /> -->
                    <!-- <img src="../assets/icons/placeholder.png" alt="" /> -->
                    <img
                      :src="
                        ticket.user.img
                          ? ticket.user.img
                          : require('../assets/icons/placeholder.png')
                      "
                      alt=""
                      class="userimg"
                    />
                    <div class="title-message-wrap">
                      <div class="ticket-title-wrap">
                        <p class="title">{{ ticket.title }}</p>
                        <p class="time">{{ ticket.createdAt }}</p>

                        <div
                         v-if="!ticket.read"
                          class="circle"
                        >
                          1
                        </div>
                      </div>
                      <p>{{ ticket.theme }}</p>
                    </div>
                  </div>

                  <p v-if="profile.role == 'Admin'" class="type-of-ticket mt-3">
                    Партнеры
                  </p>
                  <div
                    @click="getMessages(ticket.id)"
                    v-for="ticket in archiveTickets.filter(
                      (ticket) => ticket.user.role == 'Partner'
                    )"
                    :key="ticket.id"
                    class="ticket-wrap"
                  >
                    <!-- <img
                      v-if="ticket.read"
                      src="../assets/icons/checked.svg"
                      alt=""
                      class="checked"
                    /> -->
                    <img
                      :src="
                        ticket.user.img
                          ? ticket.user.img
                          : require('../assets/icons/placeholder.png')
                      "
                      alt=""
                      class="userimg"
                    />
                    <div class="title-message-wrap">
                      <div class="ticket-title-wrap">
                        <p class="title">{{ ticket.title }}</p>
                        <p class="time">{{ ticket.createdAt }}</p>
                        <div
                          v-if="!ticket.read"
                          class="circle"
                        >
                          1
                        </div>
                      </div>
                      <p>{{ ticket.theme }}</p>
                    </div>
                  </div>
                </b-tab>
              </b-tabs>
            </div>
          </b-col>

          <b-col
            class="wow animate__animated animate__fadeIn"
            cols="12"
            md="8"
            lg="8"
            xl="8"
            style="
              display: flex;
              flex-flow: column;
              justify-content: space-between;
              padding-left: 20px;
              padding-right: 40px;
            "
          >
            <div class="messages-bg-wrap">
              <div class="messages-title-wrap">
              <div
                v-if="currentMessages.length"
                class="ticket-wrap title-wrap-message"
              >
                <!-- <img src="../assets/icons/placeholder.png" alt="" /> -->
                <img
                  :src="
                    currentMessages[0].user.img
                      ? profile.role == 'Admin'
                        ? currentMessages[0].user.img
                        : require('../assets/icons/placeholder.png')
                      : require('../assets/icons/placeholder.png')
                  "
                  alt=""
                  class="userimg"
                />
                <div class="title-message-wrap">
                  <div class="ticket-title-wrap">
                    <p v-if="profile.role == 'Admin'" class="title">
                      {{ currentMessages[0].user.surname }}
                      {{ currentMessages[0].user.name }}
                      {{ currentMessages[0].user.patronim }}
                    </p>
                    <p v-else>Megaorion</p>
                  </div>
                  <div
                    v-if="profile.role == 'Admin' && currentMessages.length"
                    @click="openService"
                    class="message-service"
                  >
                    Услуга, связанная с тикетом
                  </div>
                  <!-- <p>Был в сети 15 минут назад</p> -->
                </div>
              </div>
              <div class="message-icons">
                <img
                  src="../assets/icons/star.svg"
                  style="margin-right: 15px"
                  alt=""
                  class="star"
                />
                <img class="messages-option" src="../assets/icons/more.svg" alt="" />
              </div>
            </div>

            

            <div class="message-wrap">
              <div class="chat-wrap">
                <!-- <div v-for="message in currentMessages" :key="message.id" class="message-send">Слушай</div> -->
                <div
                  v-for="message in currentMessages"
                  :key="message.id"
                  :class="
                    message.user.id == profile.id
                      ? 'message-get'
                      : 'message-send'
                  "
                  class="message-get"
                >
                  {{ message.text }}
                </div>
                <!-- <div class="message-send">Прив</div> -->
                <!-- <div class="message-send">
                  Слушай, ну как работают паддинги, Артём? Я не понимаю.
                </div>
                 <div class="message-send">
                  Слушай, ну как работают паддинги, Артём? Я не понимаю.
                </div> -->
                <!-- <div class="message-send">
                  Слушай, ну как работают паддинги, Артём? Я не понимаю.
                </div> -->
                <!-- <div class="date-send">{{ message.createdAt }}</div> -->
                <!-- <div class="message-get">
                  Как же ты меня достал, Леха, я тебе 6 раз это показал и
                  обьяснил!
                </div>
                <div class="message-get">Ты тупой дебил</div>
                <div class="date-get">16:15 14 марта, 2022</div> -->
                <!-- <div class="message-send">
                  Ублюдок, мать твою, а ну, иди сюда, говно собачье, а? Что,
                  сдуру решил ко мне лезть? Ты, засранец вонючий, мать твою, а?
                  Ну, иди сюда, попробуй меня трахнуть - я тебя сам трахну,
                  ублюдок, онанист чёртов, будь ты проклят! Иди, идиот, трахать
                  тебя и всю твою семью! Говно собачье, жлоб вонючий, дерьмо,
                  сука, падла! Иди сюда, мерзавец, негодяй, гад! Иди сюда, ты,
                  говно, жопа!
                </div>
                 <div class="message-send">
                  Ублюдок, мать твою, а ну, иди сюда, говно собачье, а? Что,
                  сдуру решил ко мне лезть? Ты, засранец вонючий, мать твою, а?
                  Ну, иди сюда, попробуй меня трахнуть - я тебя сам трахну,
                  ублюдок, онанист чёртов, будь ты проклят! Иди, идиот, трахать
                  тебя и всю твою семью! Говно собачье, жлоб вонючий, дерьмо,
                  сука, падла! Иди сюда, мерзавец, негодяй, гад! Иди сюда, ты,
                  говно, жопа!
                </div> -->
                <div class="date-send">16:25 14 марта, 2022</div>
              </div>

              <div v-if="currentMessages.length" class="message-type-form">
                <textarea
                  :class="{ deactive: currentMessages[0].ticket.close == true }"
                  v-model="ticketMessage"
                  placeholder="Ваше сообщение..."
                  class="message-textarea"
                  name=""
                  id="textMessage"
                ></textarea>
                <div class="send-block">
                  <div>
                    <button
                    :class="{
                      deactive: currentMessages[0].ticket.close == true,
                    }"
                    @click="createMessage"
                    class="button-send"
                  >
                    Отправить
                  </button>
                  <input
                    id="loadFile"
                    ref="messageFile"
                    type="file"
                    style="display: none"
                  />
                  <a class="file-attach" href="#">
                    <label for="loadFile"
                      ><img src="../assets/icons/file.svg" alt=""
                    /></label>
                  </a>
                  </div>
                  <button
                  v-if="profile.role == 'Admin' && currentMessages.length"
                  @click="closeTicket"
                  class="button-close"
                  >
                    Закрыть тикет
                  </button>
                </div>
              </div>
            </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </section>
</template>

<script>
import moment from "moment";
import { TicketsMapper } from "@/store/tickets";
import { UserMapper } from "@/store/user";
export default {
  name: "TicketsContent",

  props: {
    tickets: {
      type: Array,
      default: () => [],
    },

    ticket: {
      type: Object,
      default: () => {},
    },

    messages: {
      type: Array,
      default: () => [],
    },

    services: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      currentMessages: [],

      ticketTitle: "",
      ticketMessage: "",
      isServiceList: "",
      serviceDetailList: false,
      checkedService: "",
      detailService: "",
      selectedService: "",

      serviceItem: "",

      servicesList: [
        "Collocation",
        "Разработка сайта",
        "Администрирование серверов",
        "Доработка 1С",
        "Сопровождение 1С",
        "Облачное хранилище",
      ],

      showTicketForm: false,
    };
  },

  computed: {
    ...UserMapper.mapState(["error", "profile", "online"]),

    actualTickets() {
      return this.tickets.filter((ticket) => ticket.close == false).sort((a, b) => (new Date(b.update)) - (new Date(a.update)));
    },

    archiveTickets() {
      return this.tickets.filter((ticket) => ticket.close == true).sort((a, b) => (new Date(b.update)) - (new Date(a.update)));
    },

    serviceList() {
      return [
        ...new Set(this.services.map(({ service_type }) => service_type)),
      ].map((service_type) => this.servicesList[service_type]);
    },

    serviceDetail() {
      return this.services.filter(
        (service) => service.service_type == this.checkedService
      );
    },

    lastMessageTime() {
      let lastMessage;

      if (this.currentMessages.length) {
        moment.locale("ru");
        lastMessage = moment(
          this.currentMessages[this.currentMessages.length - 1].updatedAt
        ).format("LLL");
      }
      return lastMessage;
    },
  },

  // watch: {

  //   tickets() {
  //     this.currentTickets()

  //   }

  // },

  methods: {
    ...TicketsMapper.mapActions([
      "getTickets",
      "getTicket",
      "postTicket",
      "patchTicket",
      "getTicketMessages",
      "postTicketMessage",
      "getMessageById",
      "patchMessageById",
    ]),

    openService() {
      console.log("ticket service", this.currentMessages[0].ticket.service);
      this.$router.push({
        path: `service/${this.currentMessages[0].ticket.service}`,
      });
    },

    async closeTicket() {
      let data = { close: true };
      let id = this.currentMessages[0].ticket.id;
      await this.patchTicket({ id, data });
    },

    showList(type) {
      if (type == 1) {
        this.isServiceList = !this.isServiceList;
        this.$refs.serviceInputOpened.classList.toggle("opened");
      } else if (type == 2) {
        this.serviceDetailList = !this.serviceDetailList;
        this.$refs.detailInputOpened.classList.toggle("opened");
      }
    },

    chooseService(item, index) {
      this.$refs.serviceInput.setAttribute("placeholder", item);
      this.$refs.serviceInput.setAttribute("value", item);
      this.$refs.serviceInput.classList.add("input-color");
      this.isServiceList = false;
      this.$refs.serviceInputOpened.classList.remove("opened");
      this.checkedService = index;
    },

    chooseDetail(item) {
      this.$refs.serviceDetailInput.classList.add("input-color");

      this.serviceDetailList = false;
      this.$refs.detailInputOpened.classList.remove("opened");

      this.detailService = `Id сервиса: ${item.id}, Цена: ${item.service_price}`;
      this.selectedService = item.id;
    },

    createTiccet() {
      let file = this.$refs.ticketFile.files[0];
      let formData = new FormData();
      formData.append("file", file);

      let ticcetData = {
        ticketTitle: this.ticketTitle,
        messageTitle: this.ticketTitle,
        text: this.ticketMessage,
        file: formData,
        service: this.selectedService,
      };

      this.$emit("createTiccet", ticcetData);
      this.ticketMessage = "";
    },

    async getMessages(id) {

      let messages = await this.getTicketMessages(id);
      if (messages) {
        this.currentMessages = messages.data;
        console.log("currentmessages", this.currentMessages);
        this.currentMessages.map(
          (message) =>
            (message.createdAt = moment(message.createdAt).format("L"))
        );
      }      

      this.currentMessages.forEach(async (message) => {
        if (message.user.id != this.profile.id && message.read == false) {
          let data = { read: true };
          let id = message.id;
          await this.patchMessageById({ id, data });
        }
      });

      this.$emit("gettickets");

      // this.ticketMessage = "";
    },

    createMessage() {
      let file = this.$refs.messageFile.files[0];
      let formData = new FormData();
      formData.append("file", file);

      let messageData = {
        title: this.currentMessages[0].title,
        text: this.ticketMessage,
        file: formData,
        ticket: this.currentMessages[0].ticket.id,
      };

      this.$emit("createMessage", messageData);
      this.getMessages(this.currentMessages[0].ticket.id);
      this.ticketMessage = "";
    },
  },

  // created() {
  //   if (this.tickets.length) {
  //     this.currentTickets = this.tickets;
  //     this.currentTickets = this.tickets.map((ticket) => ({...ticket, createdAt: moment(ticket.createdAt).format("L")}));

  //     console.log("currenttickets", this.currentTickets);
  //     console.log("tickets", this.tickets);
  //   }
  // },
};
</script>

<style scoped>
.userimg {
  height: 50px;
  width: 50px;
}

.circle {
  background-color: #09bd3c;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}


.messages-bg-wrap {
  background-color: #343434;
  height: 100% !important;
  /* padding: 20px 15px; */
  padding: 20px 15px 20px 30px;
  border-radius: 20px;
}

.message-service {
  /* padding: 5px 20px; */
  text-decoration: underline;
  color: #f90;
  font-weight: 700;
  cursor: pointer;
}

/* .select-service {
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 20px;
  margin-left: 7.5em;
  width: 70%;
} */

.client-inputs-services {
  position: relative;
  margin-right: 5%;
}

.service-input-wrapper {
  padding: 0 !important;
  position: relative;
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

.modal-content-client-custom .form-control {
  margin: 15px 0;
  width: 100%;
  margin: 0 !important;
  color: #bfd2ff;
  background: rgba(57, 63, 84, 0.8);
  border-radius: 2px;
  padding: 10px 20px;
  border: none;
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

#tickets-content {
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

.wrap-tickets {
  border-radius: 20px;
  background: #202020;
  width: 100%;
  padding: 0;
  height: 78vh;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  transition: 0.5s ease;
}
.wrap-tickets > .row,
.wrap-tickets > .row > .col-md-4 {
  height: 100%;
}
.wrap-tickets > .row > .col-md-4 {
  padding-right: 0;
}
.title-tickets > p {
  font-weight: 600;
  font-size: 24px;
  padding: 0px 30px;
}
.title-tickets > p > span {
  font-size: 18px;
  color: #717579;
  margin-left: 10px;
}
.type-of-ticket {
  color: #9ca2a8;
  font-weight: 600;
  padding: 0px 30px;
}
.ticket-wrap {
  padding: 15px 30px;
  display: flex;
  align-items: flex-start;
  position: relative;
  transition: 0.5s ease-in-out;
  cursor: pointer;
}
.ticket-wrap:hover {
  background: #1d357350;
}
.ticket-wrap > .checked {
  position: absolute;
  bottom: 12px;
  right: 30px;
  margin: 0;
  width: 25px;
}
.ticket-wrap > img {
  margin-right: 20px;
  border-radius: 10px;
  min-width: 50px !important;
  max-width: 50px;
  height: 50px;
  object-fit: cover;
  
}
.title-message-wrap {
  display: flex;
  flex-flow: column;
  width: 100%;
}
.ticket-title-wrap {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.ticket-title-wrap > p {
  margin-bottom: 5px;
}
.ticket-title-wrap > .title {
  font-weight: 700;
  font-size: 17px;
  color: #fff;
  margin-bottom: 0;
}
.ticket-title-wrap > .time {
  font-weight: 400;
  font-size: 12px;
  color: #717579;
}
.title-message-wrap > p {
  color: #717579;
  font-weight: 400;
  margin: 0;
}

.messages-title-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  padding-right: 15px;
}
.title-wrap-message {
  background: none !important;
  padding: 5px 20px;
  padding-left: 0;
}
.message-textarea {
  border: 2px solid #1d5dff;
  box-sizing: border-box;
  border-radius: 14px;
  width: 100%;
  height: 110px;
  background: transparent;
  color: #fff;
  padding: 10px 20px;
  outline: none;
  resize: none;
}
.button-send {
  border-radius: 10px;
  font-size: 20px;
  font-weight: 900;
  background: #1d5dff;
  padding: 20px 30px;
  color: #fff;
  border: none;
  transition: 0.8s cubic-bezier(0.77, 0, 0.18, 1);
}
.button-send:hover {
  background: #fff;
  color: #1d5dff;
}

.button-close {
  background: #d0412e;
  border-radius: 10px;
  border: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #ffffff;
  padding: 10px 25px 10px 25px;
  transition: 0.8s cubic-bezier(0.77, 0, 0.18, 1);
}

.button-close:hover {
  background: #fff;
  color: #d0412e;
}

.send-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
}

.file-attach {
  margin-left: 30px;
}
.file-attach > img {
  width: 30px;
  transition: 0.8s cubic-bezier(0.66, -0.91, 0.25, 1.84);
  border-radius: 10px;
}
.file-attach > img:hover {
  transform: scale(1.5);
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

.message-get {
  background: #585858;
  border-radius: 14px 14px 14px 0px;
  /* padding: 15px 20px 11px 10px; */
  padding: 13px;
  width: fit-content;
  max-width: 70%;
  margin: 10px 0;
  font-size: 14px;
}
.message-send {
  background: #1d5dff;
  border-radius: 14px 14px 0px 14px;
  /* padding: 15px 10px 11px 20px; */
  padding: 13px;
  width: fit-content;
  margin-left: auto;
  max-width: 70%;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  margin-right: 10px;
}

.message-type-form {
  padding-right: 15px;
}

.chat-wrap {
  margin-bottom: 30px;
  /* height: fit-content; */
  height: 39vh;
  overflow-y: auto;
}
.date-get {
  color: #717579;
  font-size: 14px;
  font-weight: 400;
  margin: 10px 0px 0px 0px;
}
.date-send {
  color: #717579;
  text-align: right;
  font-size: 14px;
  font-weight: 900;
  margin: 10px auto 0;
  width: fit-content;
}

.star {
  transition: 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.star:hover {
  transform: rotate(180deg);
}

.ticket__create-btn {
  border: none;
  background: #1d5dff;
  border-radius: 10px;
  color: #ffffff;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  padding: 10px 35px 10px 30px;
  margin-right: 53px;
  border: 2px solid #1d5dff;
  transition: 0.5s;
}

.client-inputs-services {
  position: relative;
}

.client-inputs {
  width: 100%;
  margin: 15px 0 0;
  position: relative;
}

.client-inputs::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.client-inputs:after {
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

@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}

.service-input-wrapper {
  width: 100%;
}

.ticket__theme-title {
  display: block;
  font-size: 25px;
  margin-bottom: 20px;
}

.ticket-wrapper {
  padding-top: 30px;
}

.form-control {
  margin: 15px 0;
  width: 100%;
  margin: 0 !important;
  color: #bfd2ff;
  background: rgba(57, 63, 84, 0.8);
  border-radius: 2px;
  padding: 23px 20px;
  border: none;
}

.input-color::placeholder {
  color: #bfd2ff;
}

</style>

<style>

.tickets-content .nav-tabs {
  padding-left: 30px;
  border: none;
} 

.tickets-content .nav-item {
  width: 50% !important;
} 

.tickets-content .nav-link {
  width: 100% !important;
  text-align: center;
  color: #fff;
  transition: 0.5s;
  border: none;
} 

.nav-tabs .nav-link.active{
    color: #fff;
    background-color: #1d5dff;
    border-color: #1d5dff;
}

.nav-tabs .nav-link:not(.active):hover {
  background-color: #505050;
}

</style>