import {
    Getters,
    Mutations,
    Actions,
    Module,
    createMapper,
  } from "vuex-smart-module";
  import Axios from "axios";
  import { store } from "@/store";
  
  const baseUrl = process.env.VUE_APP_API_URL + "/api/v1/partner/";
  /* const mediaUrl = process.env.VUE_APP_API_URL; */
  Axios.defaults.headers.post["Content-Type"] = "application/json";
  
    class PartnerState {
  
      partnerProfile = { user_id: {} };    
      clients = [];  
      error = null;
      token = null;
  
    }
  
    class PartnerGetters extends Getters {  }
  
    class PartnerMutations extends Mutations {
  
      clearPartnerProfile() {
        this.state.partnerProfile = { user_id: {} };
      }
      
      setPartnerProfile(profile) {
        this.state.partnerProfile = profile;
      }  
  
      setClient(client) {
        this.state.clients = client;
      }
  
      clearClient() {
        this.state.client = [];
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
  
    }
  
    class PartnerActions extends Actions {  
      
      //Получить профиль  
      async getPartnerProfile() {
        this.mutations.clearError();
        this.mutations.clearPartnerProfile();
        await Axios.get(baseUrl + "profile/", {
            headers: {
                token: store.getters["UserStore/token"],
              },
        })
          .then((response) => this.mutations.setPartnerProfile(response.data))
          .catch(() => this.mutations.setError(error.response.data));
      }
      //Отредактировать профль
      async patchPartnerProfile({id, payload}) {
        this.mutations.setError(null);
        this.mutations.clearPartnerProfile();
        await Axios.patch(`${baseUrl}patch/${id}`, payload, {
          headers: {
              token: store.getters["UserStore/token"],
            }, 
        })
        .then((response) => this.mutations.setPartnerProfile(response.data.data))
        .then(() => this.actions.getPartnerProfile())
        .catch((error) => this.mutations.setError(error.response.data));
      }


      async postPartnerClient(data) {
        //* Создание клиента
        this.mutations.clearError();
        await Axios.post(baseUrl + "client/", data, {
          headers: {
            token: store.getters["UserStore/token"],
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
          },         
        })
        .then(() => this.actions.getClients())
        .catch((error) => this.mutations.setError(error.response.data));
      }
  
      async getClients(){
        //* Список клиентов
        this.mutations.clearError();
        this.mutations.clearClient();
        await Axios.get(baseUrl + "client/", {
            headers: {
                token: store.getters["UserStore/token"],
              },
        })
  
        .then((response) => this.mutations.setClient(response.data))
        .catch((error) => this.mutations.setError(error.response.data));
      }

      
      //Создание услуги партнером
      async createPartnerService(data){
        //* Список клиентов
        this.mutations.clearError();
        try {
          let service = await Axios.post(baseUrl + "service/", data, {
            headers: {
                token: store.getters["UserStore/token"],
              },
        });
        
        if (service.status == 201) {
          return service.data;
        }

        } catch (error) {
          this.mutations.setError(error.response.data);
        }
      }


       //Получение списка своих услуг партнером
       async getPartnerServices(){
        //* Список клиентов
        this.mutations.clearError();
        try {
          let services = await Axios.get(baseUrl + "services/", {
            headers: {
                token: store.getters["UserStore/token"],
              },
        });
        
        if (services) {
          return services.data;
        }

        } catch (error) {
          this.mutations.setError(error.response.data);
        }
      }


        //Получение списка своих договоров партнером
        async getPartnerAgreements(){
          //* Список клиентов
          this.mutations.clearError();
          try {
            let agreements = await Axios.get(baseUrl + "agreements/", {
              headers: {
                  token: store.getters["UserStore/token"],
                },
          });
          
          if (agreements) {
            return agreements.data;
          }
  
          } catch (error) {
            this.mutations.setError(error.response.data);
          }
        }
      

       //Получение конкретную услугу партнером
       async getPartnerService(id){
        //* Список клиентов
        this.mutations.clearError();
        try {
          let service = await Axios.get(`${baseUrl}service/${id}`, {
            headers: {
                token: store.getters["UserStore/token"],
              },
        });
        
        if (service) {
          return service.data;
        }

        } catch (error) {
          this.mutations.setError(error.response.data);
        }
      }

       
          
  
  
      /* async getClient(id) {
        //* Клиент по id
        this.mutations.clearError();
        this.mutations.clearClient();
        await Axios.get(baseUrl + "client/" + id.toString(), {
            headers: {
                token: store.getters["UserStore/token"],
              },
        })
  
        .then((response) => this.mutations.setClient(response.data))
        .catch((error) => this.mutations.setError(error.response.data));   
  
      } */
  
      
  
      /* async patchClient({ id, data }) {
        // * Изменение клиента
        this.mutations.clearError();
        await Axios.patch(
          `${baseUrl}client/${id.toString()}/`,
          { ...data },
          {
            headers: {
                token: store.getters["UserStore/token"],
              },
          }
        )
          .then(() => this.actions.getClients())
          .catch((error) => this.mutations.setError(error.response.data));
      } */    
  
    }
  
    const partner = new Module({
      getters: PartnerGetters,
      state: PartnerState,
      mutations: PartnerMutations,
      actions: PartnerActions,
    });
    export const PartnerMapper = createMapper(partner);
    export default partner;