<template>
  <section id="dataBody" class="animate__animated animate__fadeIn no-select">
  

  <div class="contaiter-fluid relative-block mt-2">
    <div class="row no-select">
      <div class="col pt-4 my-auto">
        <p class="header-admin m-0">Кабинет партнера</p>
      </div>
      <div class="col pt-4 my-auto">
        <button @click="exit">Выйти</button>
      </div>
    </div>
  </div>
  <div class="col pt-4 my-auto">
        <button @click="toAdd">Добавить клиента</button>
      </div>  
  <b-row>
        <button @click="partnerUser">Клиенты</button>
        <b-col>
           <PartnerUsersForm @add="show = true" :users="partnerUser" />           
        </b-col>
      </b-row>                 
  </section>
</template>

<script>
import { UserMapper } from "@/store/user";
import toast from "@/scripts/toast";
import PartnerUsersForm from "@/components/partner/PartnerUsersForm.vue";
import PartnerMapper from "@/store/partner"

export default {
  name: "Analytics",
  components: {
    PartnerUsersForm    
  },
  data() {
    return {};
  },
  computed: {
    ...UserMapper.mapState(["profile"], ["clients"]),
    ...UserMapper.mapGetters(["role"])     
  },
  methods: {   
    toast,

    ...UserMapper.mapActions(["signOut" ]),
    ...PartnerMapper.mapActions(["getClients"]),


    async partnerUser() {
      await this.getClients();
    },

    async exit() {

      await this.signOut();
      this.$router.push({ name: "main-login" });
    },
    async toAdd() {
      await this.$router.push({ name: "client-add" });
    },    
  },
  async mounted() {
    await this.getClients();
  }
};
</script>

<style scoped>
.bold-text {
  font-weight: 700;
}

.header-admin {
  font-weight: 500;
  font-size: 30px;
  line-height: 37px;
  font-weight: 500;
}
.orange-bold-text {
  font-size: 16px;
  font-weight: 600;
  color: #e4690b;
}
.green-bold-text {
  font-weight: bold;
  font-size: 16px;
  color: #1c8845;
}
.hr-agent {
  border: 1px dashed #c4c4c4;
  margin: 0;
  margin-top: 5px;
  margin-bottom: 5px;
}
.data-download-anketa {
  border: unset;
  background: #4d4db8;
  border-radius: 3px;
  height: 30px;
  width: 180px;
  padding: 0;
}
.data-download-anketa > p {
  font-weight: 500;
  font-size: 14px;
  color: #fefefe;
}

/* кнопочки */

.agent-data-button {
  border: 1.5px solid #9276e4;
  background: #00000000;
  box-sizing: border-box;
  height: 35px;
  width: 235px;
  border-radius: 40px;
  padding: 0;
  transition: 0.5s ease;
}
.agent-data-button > p {
  font-weight: 500;
  font-size: 14px;
  margin: auto;
  color: #2b2a29;
}
.agent-data-button:hover > p {
  color: #fefefe;
}
.agent-data-button:hover {
  background: #9276e4;
}
.agent-data-button:focus,
.agent-data-button:active {
  background: #9276e4;
  transform: scale(1.05);
}

.btn-ban-agent,
.btn-unban-agent {
  font-size: 14px;
  line-height: 17px;
  color: #fefefe;
  border-radius: 3px;

  width: 200px;
  height: 30px;
  outline: none;
  border: none;
  transition: 0.5s ease;
}
.btn-ban-agent {
  background: #f22929;
}
.btn-unban-agent {
  background: #67b42b;
}
.btn-ban-agent:hover,
.btn-unban-agent:hover {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
}
.btn-ban-agent:active,
.btn-ban-agent:focus,
.btn-unban-agent:active,
.btn-unban-agent:focus {
  transform: scale(1.05);
}

.modal-content {
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 900;
}
</style>