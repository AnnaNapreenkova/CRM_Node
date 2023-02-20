<template>
  <div class="home">
    <!-- <Header /> -->
    <HeaderAdmin v-if="online && profile.role == 'Admin'"/>
    <PartnerHeader v-if="online && profile.role == 'Partner'"/>

    <Header v-if="(online && profile.role != 'Admin') && (online && profile.role != 'Partner') && (online && profile.role) != ''"/>
    <b-container fluid style="padding: 0 50px">
      <b-row>
        <b-col cols="12" md="12">
          <TopMenu v-if="profile" title="Услуги" :user="profile"/>
          <CallocationServiceContent v-if="currentservice.client" :service="currentservice"/>
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header_block.vue";
import HeaderAdmin from "@/components/admin/Header_admin.vue";
import PartnerHeader from "@/components/partner/Header_partner.vue";
import TopMenu from "@/components/Top_Menu.vue";
import CallocationServiceContent from "@/components/services/CallocationServiceContent.vue";
import { UserMapper } from "@/store/user";
import { AdminMapper } from "@/store/admin"
import { PartnerMapper } from "@/store/partner";



export default {
  name: "CallocationServiceView",
  components: {
    Header,
    HeaderAdmin,
    PartnerHeader,
    TopMenu,
    CallocationServiceContent,
  }, 

  data() {
    return {
      currentservice: {}
    }

  },

  computed: {
    ...UserMapper.mapState(["error", "profile", "online"]),
    ...AdminMapper.mapState(["service"]),
    
  }, 

  methods: {
    ...AdminMapper.mapActions(["getService"]),
    ...PartnerMapper.mapActions(["getPartnerService"]),
    

  },

  async mounted() {
    let service;
    if (this.profile.role != "Partner") {
      await this.getService(this.$route.params.service);
      service = this.service;
    } else if (this.profile.role == "Partner") {
      service = await this.getPartnerService(this.$route.params.service);      
    }

    if (service) {
        this.currentservice = service;
      }
    

    console.log("currentservice", this.currentservice);

  }
  
 
};
</script>

<style scoped>
.home {
  display: flex;
}

</style>
