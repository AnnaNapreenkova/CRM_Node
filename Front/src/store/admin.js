import {
  Getters,
  Mutations,
  Actions,
  Module,
  createMapper,
} from "vuex-smart-module";
import Axios from "axios";
import { store } from "@/store";


const baseUrl = process.env.VUE_APP_API_URL + "/api/v1/admin";
/* const mediaUrl = process.env.VUE_APP_API_URL; */

Axios.defaults.headers.post["Content-Type"] = "application/json";
/* Axios.defaults.headers = 
{
  origin: "*",
  methods: ["GET", "POST"],
}; */

  class AdminState {
    adminProfile = { user_id: {} };
    
    //для списков пользователей
    adminUsers = [];
    adminClients = [];
    partnerClients = [];
    adminPartners = [];
    //для профиля одного пользователя
    account = {};
    client = {};

    //договоры
    agreements = [];

    //договор
    agreement = {};


    //услуги
    services = [];

    //услуга
    service = {};


    //общее
    error = null;
    token = null;

  }

  class AdminGetters extends Getters {  }

  class AdminMutations extends Mutations {
 
    
    setAdminProfile(profile) {
      this.state.adminProfile = profile;
    }

    clearAdminProfile() {
      this.state.adminProfile = {};
    }

    setError(error) {
      this.state.error = error;
    }
  
    clearError() {
      this.state.error = null;
    }
  
    setToken(token) {
      this.state.token = token;
    }
  
    clearToken() {
      this.state.token = null;
    }

    //Списки пользователей
    setAdminUsers(users) {
      this.state.adminUsers = users;  
    }
    clearAdminUsers() {
      this.state.adminUsers = [];
    }

    setAdminClients(users) {
      this.state.adminClients = users;  
    }
    clearAdminClients() {
      this.state.adminClients = [];
    }

    setPartnerClients(users) {
      this.state.partnerClients = users;  
    }
    clearPartnerClients() {
      this.state.partnerClients = [];
    }

    setAdminPartners(users) {
      this.state.adminPartners = users;  
    }
    clearAdminPartners() {
      this.state.adminPartners = [];
    }

    //Аккаутнт пользователя
    setUser(user) {
      this.state.account = user;
    }

    clearUser() {
      this.state.user = {};
    }

    //Профили клиентов
    setClient(client) {
      this.state.client = client;
    }  
    clearClient() {
      this.state.client = {};
    }

    //Договоры
    setAgreements(agreements) {
      this.state.agreements = agreements;
    }
    clearAgreements() {
      this.state.agreements = [];
    }

    //Договор
    setAgreement(agreement) {
      this.state.agreement = agreement;
    }
    clearAgreement() {
      this.state.agreement = {};
    }

    //Подключенная услуги клиента
    setServices(service) {
      this.state.services = service;
    }
    clearServices() {
      this.state.services = [];
    }

    //Подключенная услуга
    setService(service) {
      this.state.service = service;
    }
    clearService() {
      this.state.service = {};
    }

  }

  class AdminActions extends Actions {
    //Получение списков клиентов
    async getAdminClients() {
      this.mutations.clearError();
      this.mutations.clearAdminClients();
      await Axios
        .get(baseUrl + "/clients", {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })
        .then((response) => this.mutations.setAdminClients(response.data))
        .catch((error) => this.mutations.setError(error.response.data));
    }

    //Получение списков партнеров
    async getAdminPartners() {
      this.mutations.clearError();
      this.mutations.clearAdminPartners();
      await Axios
        .get(baseUrl + "/partners", {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })
        .then((response) => this.mutations.setAdminPartners(response.data))
        .catch((error) => this.mutations.setError(error.response.data));
    } 

     //Получение списков пользователей
     async getPartnerClients(id) {
      this.mutations.clearError();
      this.mutations.clearPartnerClients();
      await Axios
        .get(`${baseUrl}/partner/clients/${id}`, {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })
        .then((response) => this.mutations.setPartnerClients(response.data))
        .catch((error) => this.mutations.setError(error.response.data));
    }

    //Получение аккаунта клиента по id
    async getUserDetails(id) {
      this.mutations.clearError();
      this.mutations.clearUser(); 
      await Axios.get(
        baseUrl + "/account/" + id.toString(),
        {
          headers: {
            token: store.getters["UserStore/token"],
          },
        }
      )
      .then((response) => this.mutations.setUser(response.data))
      .catch((error) => this.mutations.setError(error.response.data));    
    }
    //Получение профилей по id
    async getClientDetails(id) {
      // * Получение подробнной информации о клиенте по id
      this.mutations.clearError();
      this.mutations.clearClient();
      await Axios.get(
        baseUrl + "/client/" + id.toString(),  
        {
          headers: {
            token: store.getters["UserStore/token"],
          },
        }
      )
        .then((response) => this.mutations.setClient(response.data))
        .catch((error) => this.mutations.setError(error.response.data));
    }

    //Получение списка договоров
    async getAgreements() {
      this.mutations.clearError();     
      try {
        let agreements = await Axios.get(baseUrl + "/agreements", {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })

        if (agreements) {
          return agreements.data
        }

      } catch (error) {
        this.mutations.setError(error.response.data);
      }      
     
    }


    //Получение списка услуг
    async getAllServices() {
      this.mutations.clearError();     
      try {
        let services = await Axios.get(baseUrl + "/services", {
          headers: {
            token: store.getters["UserStore/token"],
          },
        })

        if (services) {
          return services.data
        }

      } catch (error) {
        this.mutations.setError(error.response.data);
      }      
     
    }

    //Получение договоров клиента
    async getClientAgreements(id) {
      this.mutations.clearError();     
      try {
        let agreements = await Axios.get(
          baseUrl + "/agreements/" + id.toString(),  
          {
            headers: {
              token: store.getters["UserStore/token"],
            },
          }
        );
        if (agreements) {
          return agreements.data;
        }

      } catch (error) {
        console.log("agreements error", error);
        this.mutations.setError(error.response.data)

      }      
    }

    //Договора конкретной услуги
    async getServiceAgreements(serviceId) {
      console.log("id service agreement", serviceId)
      this.mutations.clearError();     
      try {
        let agreements = await Axios.get(
          baseUrl + "/service/agreements/" + serviceId.toString(),  
          {
            headers: {
              token: store.getters["UserStore/token"],
            },
          }
        );
        if (agreements) {
          return agreements.data;
        }

      } catch (error) {
        console.log("agreements error", error);
        this.mutations.setError(error.response.data)

      }      
    }

    //Создание договора для клиента
    async postAgreement({id, data}) {
      console.log("data agreement", data);
      console.log("id agreement", id);
      this.mutations.clearError();
      this.mutations.clearAgreements();
      await Axios.post(`${baseUrl}/agreement/`, data, {
        headers: {
          token: store.getters["UserStore/token"],
        },
      })
      .then((response) => this.mutations.setAgreements(response.data))
      .then(() => this.actions.getClientAgreements(id))
      .catch((error) => {console.log("error", error), this.mutations.setError(error.response.data)});
    }


    //Измменение соглашению с клиентом
    async patchAgreement({id, data}) {
      this.mutations.clearError();
      this.mutations.clearAgreement();
      await Axios.patch(
        baseUrl + "/agreement/" + id.toString(), data,  
        {
          headers: {
            token: store.getters["UserStore/token"],
          },
        }
      )
      .then((response) => this.mutations.setAgreement(response.data))
      .catch((error) => this.mutations.setError(error.response.data));
    }



    //Получение всех услуг клиента по id клиента
    async getServices(id) {
      this.mutations.clearError();
      this.mutations.clearServices();
      await Axios.get(
        baseUrl + "/services/" + id.toString(),  
        {
          headers: {
            token: store.getters["UserStore/token"],
          },
        }
      )
      .then((response) => this.mutations.setServices(response.data))
      .catch((error) => this.mutations.setError(error.response.data));
    }


    //Получение конкретную услугу клиента по id услуги
    async getService(id) {
      this.mutations.clearError();
      this.mutations.clearService();
      await Axios.get(
        baseUrl + "/service/" + id.toString(),  
        {
          headers: {
            token: store.getters["UserStore/token"],
          },
        }
      )
      .then((response) => this.mutations.setService(response.data))
      .catch((error) => this.mutations.setError(error.response.data));
    }


    //Изменение подключенную услугу
    async patchService({id, data}) {
      this.mutations.clearError();
      this.mutations.clearService();
      await Axios.patch(
        baseUrl + "/service/" + id.toString(), data,  
        {
          headers: {
            token: store.getters["UserStore/token"],
          },
        }
      )
      .then((response) => this.mutations.setService(response.data))
      .catch((error) => this.mutations.setError(error.response.data));
    }


    //Регистрация пользователей
    async postClient(user) {
      this.mutations.clearError();
      await Axios.post(baseUrl + "/user", user, {
        headers: {
          token: store.getters["UserStore/token"],
        },
          
        })              
        .then(() => this.actions.getAdminClients())
        .then(() => this.actions.getAdminPartners())
        // .then(() => location.reload())
        .catch((error) => this.mutations.setError(error.response.data));
    }

    //Регистрация партнеров
    async postPartner(user) {
      this.mutations.clearError();
      await Axios.post(baseUrl + "/user", user, {
        headers: {
          token: store.getters["UserStore/token"],
        },
          
        })              
        // .then(() => this.actions.getAdminPartners())
        // .then(() => location.reload())
        .catch((error) => {console.log("error", error), this.mutations.setError(error.response.data)});
    }

    //Отправка email админу
    async postEmail(data) {
      
      this.mutations.clearError();      
      await Axios.post(`${baseUrl}/sendemail/`, data, {
        headers: {
          token: store.getters["UserStore/token"],
        },
      })
      .then((response) => console.log(response.data))      
      .catch((error) => this.mutations.setError(error.response.data));
    }


    //Получение профиля админа
    async getAdminProfile() {
      this.mutations.clearError();
      this.mutations.clearAdminProfile();
      await Axios.get(
        baseUrl + "/profile",  
        {
          headers: {
            token: store.getters["UserStore/token"],
          },
        }
      )
      .then((response) => this.mutations.setAdminProfile(response.data))
      .catch((error) => this.mutations.setError(error.response.data));
    }


    //Изменение профиля админа
    async patchAdminProfile({id, data}) {
      console.log("admindata", data)
      this.mutations.clearError();
      this.mutations.clearAdminProfile();
      await Axios.patch(
        baseUrl + "/changeprofile/" + id.toString(), data,  
        {
          headers: {
            token: store.getters["UserStore/token"],
          },
        }
      )
      .then((response) => this.mutations.setAdminProfile(response.data))
      .catch((error) => this.mutations.setError(error.response.data));
    }

  }

  const Admin = new Module({
    getters: AdminGetters,
    state: AdminState,
    mutations: AdminMutations,
    actions: AdminActions,
  });
  export const AdminMapper = createMapper(Admin);
  export default Admin;