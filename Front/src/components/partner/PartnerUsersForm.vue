<template>
  <div class="row mt-2">
    <div class="col">
      <div style="transition: 1s ease" class="white-bg pt-4 pl-4 pr-4 pb-0">
        <p class="m-0 pl-3 mt-2 mb-3 data-header">Список пользователей</p>

        <div class="wrap-users-info">
          <div class="row px-3 w-100 base-child-info-text">
            <p class="my-1">Главный аккаунт:</p>            
          </div>
          <div class="row px-3">            
        </div>
        </div>
        <b-collapse v-model="opened">
          <hr class="hr-branch mt-3" />
          <b-card
            class="no-border pt-0"
            v-for="user in userList"
            :key="user.id"
          >
            <div class="row w-100 base-child-info-text">
              <p class="my-1" style="width: 110px">{{ user.role }}:</p>
              <p class="my-1 semi-bold-text">{{ user.name }}</p>
               <p class="my-1 semi-bold-text">{{ user.email }}</p>
            </div>
          </b-card>
        </b-collapse>

        <!-- </transition> -->
        <div class="row py-3">
          <button
            @click="opened = !opened"
            class="ml-auto p-0 btn-show-accounts"
          >
            <transition name="fade">
              <p v-if="!opened" class="m-0">Показать все аккаунты</p>
              <p v-else class="m-0">Скрыть все аккаунты</p>
            </transition>          
          </button>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: "PartnerUsers",
  data() {
    return {
      opened: false,
    };
  },
  props: {
    clients: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    userList() {
      if (this.clients.length) {
        return this.clients.map((i) => {
          return {
            name: `${i.surname} ${i.name} ${i.patronim}`,
            role: i.role,            
            email: i.email
          };
        });
      }
      return [];
    },
  },
};
</script>
<style>
.data-header {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #2b2a29;
}
.base-child-info-text {
  font-size: 1rem;
  color: #2b2a29;
}
.child-info-hr {
  border: 0.1px dashed #c4c4c4;
}

.change-data-width {
  width: 165px;
}
.new-user-width {
  width: 210px;
  margin-right: 2.5rem;
}
.btn-admin-change-data {
  border: 1.5px solid #9276e4;
  background: #ffffff00;
  box-sizing: border-box;
  border-radius: 40px;

  height: 35px;
  transition: 0.5s ease;
}
.btn-admin-change-data > p {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin: 0;
  color: #2b2a29;
}
.btn-admin-change-data:hover > p {
  color: #ffffff;
}
.btn-admin-change-data:hover {
  background: #9276e4;
  border: 1.5px solid #9276e4;
  box-shadow: 0px 0px 15px #00000030;
}
.btn-admin-change-data:focus,
.btn-admin-change-data:active {
  border: 1.5px solid #9276e4;
  transform: scale(1.05);
}
.info-height {
  height: 275px;
}
.wrap-users-info {
  height: 150px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.wrap-hidden-users {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.arrow-diagramm {
  height: 12px;
  margin: 0;
  transition: 0.5s ease;
}
.btn-show-accounts {
  background: #ffffff00;
  border: none;

  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}
.hidden {
  visibility: hidden;
}
.overlay {
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  z-index: 1000;
  transition: 0.5s ease;
}
.overlay_invisible {
  background: none;
  z-index: -1000;
  display: none;
}
</style>