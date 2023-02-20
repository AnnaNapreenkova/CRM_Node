import {
    Getters,
    Mutations,
    Actions,
    Module,
    createMapper,
  } from "vuex-smart-module";
  import Axios from "axios";
  import { store } from "@/store";
  
  const baseUrl = process.env.VUE_APP_API_URL + "/api/v1/client/";
  /* const mediaUrl = process.env.VUE_APP_API_URL; */
  Axios.defaults.headers.post["Content-Type"] = "application/json";
  
    class ClientState {
  
      clientProfile = { user_id: {} };      
      clientservices = [];      
      error = null;
      token = null;
  
    }
  
    class ClientGetters extends Getters {  }
  
    class ClientMutations extends Mutations {
  
      clearClientProfile() {
        this.state.clientProfile = { user_id: {} };
      }
      
      setClientProfile(client) {
        this.state.clientProfile = client;
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
  
    class ClientActions extends Actions {  
      
      //Получить профиль  
      async getClientProfile() {
        this.mutations.clearError();
        this.mutations.clearClientProfile();
        await Axios.get(baseUrl + "profile/", {
            headers: {
                token: store.getters["UserStore/token"],
              },
        })
          .then((response) => this.mutations.setClientProfile(response.data))
          .catch(() => this.mutations.setError(error.response.data));
      }


      //Отредактировать профль
      async patchClientProfile({id, payload}) {
        this.mutations.setError(null);
        this.mutations.clearClientProfile();
        await Axios.patch(`${baseUrl}patch/${id}`, payload, {
          headers: {
              token: store.getters["UserStore/token"],
            }, 
        })
        .then((response) => this.mutations.setClientProfile(response.data.data))
        .catch((error) => this.mutations.setError(error.response.data));
      }

      //Получить сервисов клиента  
      async getClientServices() {

        this.mutations.clearError();
        try {
          let services = await Axios.get(baseUrl + "services", {
            headers: {
                token: store.getters["UserStore/token"],
              },
        });        

        if(services.status == 200) {          
          return services.data;
        }

        } catch (error)
        {
          this.mutations.setError(error.response.data);
        }
      }


       //Получение договоров клиента 
       async getClientAgreements() {

        this.mutations.clearError();
        try {
          let agreements = await Axios.get(baseUrl + "agreements", {
            headers: {
                token: store.getters["UserStore/token"],
              },
        });        

        if(agreements.status == 200) {          
          return agreements.data;
        }

        } catch (error)
        {
          this.mutations.setError(error.response.data);
        }
      }



      
  
    }
  
    const client = new Module({
      getters: ClientGetters,
      state: ClientState,
      mutations: ClientMutations,
      actions: ClientActions,
    });
    export const ClientMapper = createMapper(client);
    export default client;