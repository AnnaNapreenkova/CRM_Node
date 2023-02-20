<template>
  <b-modal
    hide-footer
    hide-header
    centered
    v-model="showDialog"
    @hidden="$emit('close')"
  >
    <button
      @click="$emit('close')"
      class="btn-invisible-button absolute-block close-modal-icon"
    >      
    </button>
    <div class="w-100 m-0 modal-body pl-3">
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

      <p class="mt-3 semi-bold-text">Права доступа:</p>      
      <b-form-checkbox
        @change="          
          newUser.partner = true;
          newUser.AdminClient = false;
        "
        v-model="newUser.partner"
        name="checkbox-1"
        class="mt-1"
      >
        <span class="ml-3">Партнер</span>
      </b-form-checkbox>
      <b-form-checkbox
        @change="          
          newUser.partner = false;
          newUser.AdminClient = true;
        "
        v-model="newUser.AdminClient"
        name="checkbox-1"
        class="mt-1"
      >
        <span class="ml-3">Клиент</span>
      </b-form-checkbox>
      <button
        @click="
          ;$emit('add', user)
          $emit('close');
        "
        class="btn-modal-create-user mt-5"
      >
        Создать
      </button>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "ModalAddUser",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        phone: "",       
        partner: false,
        AdminClient: false
      }
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.show;
      },
      set() {
        this.$emit("update:show");
      }
    },
    user() {
      return {
        surname: this.newUser.name.split(" ")[0],
        name: this.newUser.name.split(" ")[1],
        patronim: this.newUser.name.split(" ")[2],
        email: this.newUser.email,
        phone: this.newUser.phone,
        role:  this.newUser.partner
          ? "Partner"
          : this.newUser.AdminClient
          ? "AdminClient"
          : ""
      };
    }
  }
};
</script>

<style scoped>
.select {
  width: 50%;
  background-color: #c9c9c9;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: #000;
}
h2 {
  font-size: 22px;
  font-weight: 500;
  line-height: 27px;
  color: #000;
}
.modal-body {
  height: 400px;
  width: 465px;
  display: flex;
  flex-flow: column nowrap;
}
.close-modal-icon {
  top: 10px;
  right: 10px;
  height: 15px;
  width: 15px;
}
.close-modal-icon > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.admin-inputs > input {
  background: unset;
  border: none;
  outline: none;
  width: 300px;
  height: 30px;
  margin: 0;
  border-radius: 0 !important;
  border-bottom: 1px solid #2b2a29;
  border-radius: 5px;
}
.admin-inputs > input:focus {
  border: none;
  outline: none;
  border-bottom: 1px solid #2b2a29;
}
.btn-modal-create-user {
  background: #9276e4;
  border: none;
  height: 35px;
  width: 90px;
  border-radius: 40px;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  transition: 0.5s ease;
}
.btn-modal-create-user:hover {
  box-shadow: 0px 0px 15px #00000030;
}
.btn-modal-create-user:focus,
.btn-modal-create-user:active {
  transform: scale(1.05);
}
</style>
