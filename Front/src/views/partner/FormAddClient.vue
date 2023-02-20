<template>
  <div class="contaiter-fluid ml-3 mr-4">
    <div class="contaiter container-parent-page mt-4 mx-2">
      <div class="row ml-4">
        <div class="col-md-5 mt-4">
          <h1>Добавить клиента</h1>
        </div>
      </div>
      <h2 class="mt-2">Новый пользователь</h2>
      <div class="row admin-inputs mt-3">
        <p class="my-auto" style="width: 90px">ФИО:</p>
        <input
          v-model="newUser.name"
          placeholder="ФИО нового пользователя"
          class="my-1"
        />
      </div>
      <div class="row admin-inputs">
        <p class="my-auto" style="width: 90px">E-mail:</p>
        <input
          v-model="newUser.email"
          placeholder="Email нового пользователя"
          class="my-1"
        />
      </div>
      <div class="row admin-inputs">
        <p class="my-auto" style="width: 90px">Телефон:</p>
        <input
          v-model="newUser.phone"
          placeholder="Телефон нового пользователя"
          class="my-1"
        />
      </div>
      <div class="col-md-12">
        <div class="form-group my-3 pt-2">
          <button @click="addClient">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserMapper } from "@/store/user";
import { PartnerMapper } from "@/store/partner";
import toast from "@/scripts/toast";

export default {
  name: "FormAddClient",

  props: {
    client: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      newUser: {
        name: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    toast,
    ...PartnerMapper.mapActions(["postUser"]),

    async addClient() {
      //   let payload = new FormData();

      //  Object.entries(this.clientProfileList).forEach((entry) => {
      //    payload.append(entry[0], entry[1]);
      //  });
      //  payload.set("partner", this.profile.id);

      let payload = {
        surname: this.newUser.name.split(" ")[0],
        name: this.newUser.name.split(" ")[1],
        patronim: this.newUser.name.split(" ")[2],
        email: this.newUser.email,
        phone: this.newUser.phone,
        role: "PartnerClient",
      };

      await this.postUser(payload);

      if (!this.error) {
        this.toast("Выполнено", "Клиент успешно создан", "success");
      } else {
        this.toast(
          "Ошибка",
          "Клиент с таким email-ом уже существует",
          this.error,
          "danger"
        );
      }
      this.$router.push({ name: "partner-cab" });
    },
  },

  computed: {
    ...UserMapper.mapState(["token", "profile", { profileError: "error" }]),

    clientProfileList() {
      return {
        surname: this.newUser.name.split(" ")[0],
        name: this.newUser.name.split(" ")[1],
        patronim: this.newUser.name.split(" ")[2],
        email: this.newUser.email,
        phone: this.newUser.phone,
        role: "PartnerClient",
      };
    },
  },
};
</script>

<style scoped>
.form-inline .form-control {
  max-width: 100% !important;
  width: 100% !important;
}
</style>
