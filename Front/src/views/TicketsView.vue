<template>
  <div class="home">
    <!-- <Header /> -->
    <HeaderAdmin v-if="online && profile.role == 'Admin'" />
    <PartnerHeader v-if="online && profile.role == 'Partner'" />

    <Header
      v-if="
        online &&
        profile.role != 'Admin' &&
        online &&
        profile.role != 'Partner' &&
        (online && profile.role) != ''
      "
    />
    <b-container fluid style="padding: 0 50px">
      <b-row>
        <b-col cols="12" md="12">
          <TopMenu v-if="profile" title="Ваши тикеты" :user="profile" />

          <TicketsContent
            :tickets="tickets"
            :ticket="ticket"
            :messages="messages"
            :services="services"
            @createTiccet="createTiccet"
            @createMessage="createMessage"
            @gettickets="getCurrentTickets"
          />

          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header_block.vue";
import HeaderAdmin from "@/components/admin/Header_admin.vue";
import PartnerHeader from "@/components/partner/Header_partner.vue";
import TopMenu from "@/components/Top_Menu.vue";
import TicketsContent from "@/components/TicketsContent.vue";
import { UserMapper } from "@/store/user";
import { TicketsMapper } from "@/store/tickets";
import { ClientMapper } from "@/store/client";
import moment from "moment";

export default {
  name: "TicketsView",
  components: {
    Header,
    HeaderAdmin,
    PartnerHeader,
    TopMenu,
    TicketsContent,
  },

  data() {
    return {
      tickets: [],
      ticket: {},
      messages: [],
      message: {},
      services: [],
    };
  },

  computed: {
    ...UserMapper.mapState(["error", "profile", "online"]),
  },

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

    ...ClientMapper.mapActions(["getClientServices"]),

    async createTiccet(data) {
      console.log("data", data);

      await this.postTicket(data);

      let tickets = await this.getTickets();

      if (tickets) {
        this.tickets = tickets.data;
        this.tickets.forEach(
          (ticket) => (ticket.createdAt = moment(ticket.createdAt).format("L"))
        );
        console.log("currentTickets", this.tickets);
      }
    },

    async createMessage(data) {
      await this.postTicketMessage(data);

      let tickets = await this.getTickets();
      console.log("tickets", tickets);

      if (tickets) {
        this.tickets = tickets.data;
        this.tickets.forEach(
          (ticket) => (ticket.createdAt = moment(ticket.createdAt).format("L"))
        );
        console.log("currentTickets", this.tickets);
      }
    },

    async getCurrentTickets() {
      let tickets = await this.getTickets();
    console.log("tickets", tickets);

    if (tickets) {
      this.tickets = tickets.data;
      this.tickets.forEach(
        (ticket) => (ticket.createdAt = moment(ticket.createdAt).format("L"))
      );
      console.log("currentTickets", this.tickets);
    }

    }
  },

  async created() {

    this.getCurrentTickets();    

    let services = await this.getClientServices();

    if (services) {
      this.services = services;
    }
  },
};
</script>

<style scoped>
.home {
  display: flex;
}
</style>
