<template>
  <div class="home">
    <Header v-if="profile && profile.role=='Admin'"/>
    <HeaderPartner v-if="profile && profile.role=='Partner'"/>
    <b-container fluid style="padding: 0 50px;">
      <b-row>       
        <b-col cols="12" md="12">
          <TopMenu v-if="profile" title="Клиенты" :user="profile"/>
            <ClientsContent />     
        </b-col>
      </b-row>      
    </b-container>
     <!-- <ModalAddClient :show="show" @close="show = false" @add="addUser" /> -->
  </div>
</template>

<script>
import Header from "@/components/admin/Header_admin.vue";
import HeaderPartner from "@/components/partner/Header_partner.vue";
import TopMenu from "@/components/Top_Menu.vue";
import ClientsContent from "@/components/admin/ClientsContent.vue";
import ModalAddClient from "@/components/admin/ModalAddClient.vue";
import { AdminMapper } from "@/store/admin";
import { UserMapper } from "@/store/user";
export default {
 name: "ClientsTab",
 data() {
    return {      
      show: false,
    }
  },
  components: {
    Header,
    HeaderPartner,
    TopMenu,
    ClientsContent,
    ModalAddClient,
  },

  computed: {
    ...AdminMapper.mapState(["adminUsers"]),
    ...UserMapper.mapState(["error", "profile"]),

  },

  methods: {
    ...AdminMapper.mapActions(["postClient", "getAdminClients"]),
    async adminClient() {
      await this.getAdminClients();
    },

    async addUser(user) {       
      await this.postClient(user);
      if (!this.error) {
        if (user.role == "AdminClient") {
          this.toast.info(
            "Успешно",
            "Клиент успешно создан",
            "success"
          );
        }
      } else {
        this.toast.info("Ошибка", "Такой email уже сушествует", "danger");
      }
    },    
  },
  async mounted() {}
};
</script>

<style scoped>
.home{
  display: flex;
}
</style>
