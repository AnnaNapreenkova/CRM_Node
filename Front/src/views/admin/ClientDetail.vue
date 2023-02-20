<template>
  <div class="home">
    <Header v-if="profile.role=='Admin'"/>
    <HeaderPartner v-if="profile.role=='Partner'"/>
    <b-container fluid style="padding: 0 50px;">
      <b-row>       
        <b-col cols="12" md="12">
          <TopMenu title="Клиент" :user="profile"/> 
          <ClientDetailContent/>          
        </b-col>
      </b-row>      
    </b-container>    
  </div>
</template>

<script>
import Header from "@/components/admin/Header_admin.vue";
import HeaderPartner from "@/components/partner/Header_partner.vue";
import TopMenu from "@/components/Top_Menu.vue";
import ClientDetailContent from "@/components/admin/ClientDetailContent.vue"
import { AdminMapper } from "@/store/admin";
import { UserMapper } from "@/store/user";
export default {
 name: "ClientsDetail",
 data() {
    return {      
      show: false,
    }
  },
  components: {
    Header,
    HeaderPartner,
    TopMenu,
    ClientDetailContent
  },

  computed: {
    ...AdminMapper.mapState(["adminUsers"]),
    ...UserMapper.mapState(["error", "profile"]),

  },

  methods: {
    
  },
  mounted() {
  }
};
</script>

<style scoped>
.home{
  display: flex;
}
</style>
