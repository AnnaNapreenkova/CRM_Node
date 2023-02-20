import {
  Getters,
  Mutations,
  Actions,
  Module,
  createMapper,
} from "vuex-smart-module";
import Axios from "axios";
import { store } from "@/store";


const baseUrl = process.env.VUE_APP_API_URL + "/api/v1/notification";
/* const mediaUrl = process.env.VUE_APP_API_URL; */

Axios.defaults.headers.post["Content-Type"] = "application/json";
/* Axios.defaults.headers = 
{
  origin: "*",
  methods: ["GET", "POST"],
}; */

  class NotificationState {
    adminProfile = { user_id: {} };
    
    //список уведомлении
    notifications = [];

    //список последних 5 уведомлении
    lastnotifications = [];
   
    //уведомления
    notification = {};

    //общее
    error = null;
    
  }

  class NotificationGetters extends Getters {  }

  class NotificationMutations extends Mutations { 
    
    setNotifications(notifications) {      
      this.state.notifications = notifications;      
    }

    clearNotifications() {
      this.state.notifications = [];
    }

    setNotification(notification) {
      this.state.notification = notification;
    }

    clearNotification() {
      this.state.notification = {};
    }

    setLastNotifications(notifications) {
      this.state.notifications = notifications;
    }

    clearLastNotifications() {
      this.state.notifications = [];
    }

    setError(error) {
      this.state.error = error;
    }
  
    clearError() {
      this.state.error = null;
    } 
   

  }

  class NotificationActions extends Actions {


     //Создание уведомлении
     async postNotification(data) {

      this.mutations.clearError();
      this.mutations.clearNotification();
      await Axios.post(`${baseUrl}`, data, {
        headers: {
          token: store.getters["UserStore/token"],
        },
      })
      .then((response) => this.mutations.setNotification(response.data))      
      .catch((error) => this.mutations.setError(error.response.data));
    }

    //Получение уведомлении по id пользователя
    async getNotificationsById(id) {
      this.mutations.clearError();
      this.mutations.clearNotifications();
      await Axios
        .get(`${baseUrl}/notifications/${id}`, {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })
        .then((response) => this.mutations.setNotifications(response.data))
        .catch((error) => this.mutations.setError(error.response.data));
    }

    //Получение последних 5 уведомлении по id пользователя
    async getLastNotificationsById(id) {
      this.mutations.clearError();
      this.mutations.clearLastNotifications();
      await Axios
        .get(`${baseUrl}/last/${id}`, {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })
        .then((response) => this.mutations.setLastNotifications(response.data))
        .catch((error) => this.mutations.setError(error.response.data));
    }

    //Получение уведомлении по токену пользователя
    async getNotifications() {
      this.mutations.clearError();
      this.mutations.clearNotifications();
      await Axios
        .get(`${baseUrl}/notifications`, {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })
        .then((response) => this.mutations.setNotifications(response.data))
        .catch((error) => this.mutations.setError(error.response.data));

        
    }

    //Получение последних 5 уведомлении по токену пользователя
    async getLastNotifications() {
      this.mutations.clearError();
      this.mutations.clearLastNotifications();
      await Axios
        .get(`${baseUrl}/last`, {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })
        .then((response) => this.mutations.setLastNotifications(response.data))
        .catch((error) => this.mutations.setError(error.response.data));
    }

     //Получение конкретного уведомление по id
     async getNotification(id) {
      this.mutations.clearError();
      this.mutations.clearNotification();
      await Axios
        .get(`${baseUrl}/${id}`, {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })
        .then((response) => this.mutations.setNotification(response.data))
        .catch((error) => this.mutations.setError(error.response.data));
    }


    //Изменение уведомлении
    async patchNotification({id, data}) {
      this.mutations.clearError();
      this.mutations.clearNotification();
      await Axios
        .patch(`${baseUrl}/${id}`, data, {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })
        .then((response) => this.mutations.setNotification(response.data))
        .catch((error) => this.mutations.setError(error.response.data));
    }
  }

  const Notification = new Module({
    getters: NotificationGetters,
    state: NotificationState,
    mutations: NotificationMutations,
    actions: NotificationActions,
  });
  export const NotificationMapper = createMapper(Notification);
  export default Notification;