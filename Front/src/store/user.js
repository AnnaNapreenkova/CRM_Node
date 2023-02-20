import {
  Getters,
  Mutations,
  Actions,
  Module,
  createMapper,
} from "vuex-smart-module";
import Axios from "axios";

Axios.defaults.headers.post["Content-Type"] = "application/json";

const baseUrl =
  process.env.VUE_APP_API_URL + "/api/v1/user";
// const media_url = process.env.VUE_APP_API_URL;

class UserState {
  token = null;
  profile = {};
  online = false;
  error = null;
}

class UserGetters extends Getters {
  get token() {
    return this.state.token;
  }
  get role() {
    return this.state.profile.role;
  }
  get online() {
    return this.state.online;
  }
}

class UserMutations extends Mutations {
  setToken(token) {
    this.state.token = token;
  }
  setProfile(profile) {    
    this.state.profile = profile;
  }
  setError(error) {
    this.state.error = error;
  }
  setOnline() {
    this.state.online = true;
  }
  clearOnline() {
    this.state.online = false;
  }
}

class UserActions extends Actions {
  //Регистрация
  async signUp(payload) {
    this.mutations.setError(null);
    await Axios.post(baseUrl + "/signup", { ...payload })
      .then((response) => this.mutations.setToken(response.data.token))
      .catch((error) => this.mutations.setError(error.response.data));
  }
  
  //Логин
  async signIn(payload) {
    this.mutations.setError(null);
    await Axios.post(baseUrl + "/login", payload)
      .then((response) =>  this.mutations.setToken(response.data.token))
      .then(() =>  this.mutations.setOnline())
      .catch((error) => this.mutations.setError(error.response.data));
  }

  //Выход
  async signOut() {
    this.mutations.setError(null);
    this.mutations.clearOnline();
    this.mutations.setProfile(null);
  }

  //Восстановление пароля 
  async ForgetPassword(payload) {   
    this.mutations.setError(null);
    await Axios.patch(baseUrl + "/reset_password", {...payload})
    .then((response) => this.mutations.setToken(response.data.token))
    .catch((error) => this.mutations.setError(error.response.data));
  }

  //Получение данных пользователя
  async getUser() {
    this.mutations.setError(null);
    // this.mutations.setProfile(null);
    await Axios.get(baseUrl + "/account", {
      headers: {
        token: this.state.token,
      },
    })
      .then((response) => this.mutations.setProfile(response.data))
      .catch((error) => this.mutations.setError(error.response.data));
  }
  //Изменение данных профиля
  async patchProfile(payload, isFormData) {
    let headers = {
      token: this.state.token,
    };
    isFormData ? (headers["Content-Type"] = "multipart/form-data") : null;
    this.mutations.setError(null);
    await Axios.patch(baseUrl + "/profile", payload, { headers })
      .then((response) => this.mutations.setProfile(response.data.data))
      .catch((error) => this.mutations.setError(error.response.data));
  }
  // Получение пользователя по id
  async getUserById(id) {
    this.mutations.setError(null);
    try {
      const response = await Axios.get(baseUrl + "/" + id, {
        headers: {
          token: this.state.token,
        },
      });
      if (response.status == 200) {
        return response.data;
      }
    } catch (error) {
      this.mutations.setError(error.response.data);
    }
  }

  async patchUser(data, isFormData) {
    let headers = {
      token: this.state.token,
    };
    isFormData ? (headers["Content-Type"] = "multipart/form-data") : null;
    this.mutations.setError(null);
    await Axios.patch(baseUrl, data, { headers }).catch((error) =>
      this.mutations.setError(error.response.data)
    );
  }

  async patchUserById({ id, data }, isFormData) {
    let headers = {
      token: this.state.token,
    };
    isFormData ? (headers["Content-Type"] = "multipart/form-data") : null;
    this.mutations.setError(null);
    await Axios.patch(baseUrl + "/" + id, data, { headers }).catch((error) =>
      this.mutations.setError(error.response.data)
    );
  }
}
const user = new Module({
  state: UserState,
  getters: UserGetters,
  mutations: UserMutations,
  actions: UserActions,
});
export const UserMapper = createMapper(user);
export default user;
