<template>
  <div class="home">
    <Header />
    <b-container fluid style="padding: 0 50px;">
      <b-row>       
        <b-col cols="12" md="12">
          <TopMenu v-if="profile" title="Партнёры" :user="profile"/>
            <PartnersContent />     
        </b-col>
      </b-row>     
    </b-container>
     <ModalAddPartner :show="show" @close="show = false" @add="addUser" />
  </div>
</template>

<script>
import Header from "@/components/admin/Header_admin.vue";
import TopMenu from "@/components/Top_Menu.vue";
import PartnersContent from "@/components/admin/PartnersContent.vue";
import ModalAddPartner from "@/components/admin/ModalAddPartner.vue";
import { AdminMapper } from "@/store/admin";
import { UserMapper } from "@/store/user";
export default {
 name: "PartnersTab",

  components: {
    Header,
    TopMenu,
    PartnersContent,
    ModalAddPartner,
  },
 data() {
    return {      
      show: false,
    }
  },
  computed: {
    ...UserMapper.mapState(["profile"], ["adminUsers"]),
    ...UserMapper.mapState(["error", "profile"]),

  },

  methods: {
    ...AdminMapper.mapActions(["postPartner", "getAdminPartners"]),
    async adminPartner() {
      await this.getAdminPartners();
    },

    async addUser(user) {       
      await this.postPartner(user);
      if (!this.error) {
        if (user.role == "Partner") {
          this.toast.info(
            "Успешно",
            "Партнер успешно создан",
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
