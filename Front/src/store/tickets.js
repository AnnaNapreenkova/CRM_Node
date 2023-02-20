import {
  Getters,
  Mutations,
  Actions,
  Module,
  createMapper,
} from "vuex-smart-module";
import Axios from "axios";
import { store } from "@/store";


const baseUrl = process.env.VUE_APP_API_URL + "/api/v1/support";
/* const mediaUrl = process.env.VUE_APP_API_URL; */

Axios.defaults.headers.post["Content-Type"] = "application/json";
/* Axios.defaults.headers = 
{
  origin: "*",
  methods: ["GET", "POST"],
}; */

class TicketsState {

  tickets = [];
  ticket = {};
  error = null;


}

class TicketsGetters extends Getters { }

class TicketsMutations extends Mutations {


  setTickets(tickets) {
    this.state.tickets = tickets;
  }

  clearTickets() {
    this.state.tickets = [];
  }

  setTicket(ticket) {
    this.state.ticket = ticket;
  }

  clearTicket() {
    this.state.ticket = {};
  }

  setError(error) {
    this.state.error = error;
  }

  clearError() {
    this.state.error = null;
  }

}

class TicketsActions extends Actions {

  //Получение списка тикетов
  async getTickets() {
    this.mutations.clearError();

    try {
      let tickets = await Axios
        .get(baseUrl, {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })

      if (tickets) {
        return tickets;
      }

    } catch (error) {
      this.mutations.setError(error.response.data);

    }

  }

  //Получение одного тикета по id
  async getTicket(id) {
    this.mutations.clearError();

    try {
      let ticket = await Axios
        .get(`${baseUrl}/${id}`, {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })

      if (ticket) {
        return ticket;
      }

    } catch (error) {
      this.mutations.setError(error.response.data)

    }

  }

  //Создание тикета
  async postTicket(data) {
    console.log("data", data);
    this.mutations.clearError();
    this.mutations.clearTicket();
    await Axios
      .post(baseUrl, data, {
        headers: {
          token: store.getters["UserStore/token"],
          
        },
      })
      .then((response) => this.mutations.setTickets(response.data))
      .catch((error) => this.mutations.setError(error.response.data));
  }

  //Изменение тикета
  async patchTicket({id, data}) {
    this.mutations.clearError();
    this.mutations.clearTicket();
    await Axios.patch(
      `${baseUrl}/${id}`, data,
      {
        headers: {
          token: store.getters["UserStore/token"],          
        },
      }
    )
      .then((response) => this.mutations.setTicket(response.data))
      .catch((error) => this.mutations.setError(error.response.data));
  }

  //Получение списка сообщении одного тикета
  async getTicketMessages(ticketId) {
    this.mutations.clearError();

    try {
      let tickets = await Axios
        .get(`${baseUrl}/messages/${ticketId}`, {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })

      if (tickets) {
        return tickets;
      }

    } catch (error) {
      this.mutations.setError(error.response.data);

    }

  }

   //Создание сообщении тикета
   async postTicketMessage(data) {
    this.mutations.clearError();

    try {
      let tickets = await Axios
        .post(`${baseUrl}/message/`, data, {
          headers: {
            token: store.getters["UserStore/token"],
            // "Content-Type": "multipart/form-data"
          },
        })

      if (tickets) {
        return tickets;
      }

    } catch (error) {
      this.mutations.setError(error.response.data);

    }

  }

  //Получение сообщении по id
  async getMessageById(id) {
    this.mutations.clearError();

    try {
      let tickets = await Axios
        .get(`${baseUrl}/message/${id}`, {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })

      if (tickets) {
        return tickets;
      }

    } catch (error) {
      this.mutations.setError(error.response.data);

    }

  }

  //Изменение сообщении по id
  async patchMessageById({id, data}) {
    this.mutations.clearError();

    try {
      let tickets = await Axios
        .patch(`${baseUrl}/message/${id}`, data, {
          headers: {
            token: store.getters["UserStore/token"],
            // "Content-Type": "multipart/form-data"
          },
        })

      if (tickets) {
        return tickets;
      }

    } catch (error) {
      this.mutations.setError(error.response.data);

    }

  }




}

const Tickets = new Module({
  getters: TicketsGetters,
  state: TicketsState,
  mutations: TicketsMutations,
  actions: TicketsActions,
});
export const TicketsMapper = createMapper(Tickets);
export default Tickets;