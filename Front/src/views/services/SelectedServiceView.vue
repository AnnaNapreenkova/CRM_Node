<template>
  <div class="home">
    <!-- <Header /> -->
    <HeaderAdmin v-if="online && profile.role == 'Admin'" />
    <PartnerHeader v-if="online && profile.role == 'Partner'" />

    <Header
      v-if="
        online &&
        profile.role != 'Admin' &&
        online &&
        profile.role != 'Partner' &&
        (online && profile.role) != ''
      "
    />
    <b-container fluid style="padding: 0 50px">
      <b-row>
        <b-col cols="12" md="12">
          <TopMenu v-if="profile" title="Услуги" :user="profile" />
          <!-- <SelectedServiceContent v-if="currentservice.client" :service="currentservice"/> -->
          <CallocationServiceContent
            v-if="currentservice.service_type == 0"
            :service="currentservice"
            @servicePaid="servicePaid"
            @agreementChange="changeService"
            @updateServiceDate="changeService"
          />
          <DevelopmentServiceContent
            v-if="currentservice.service_type == 1"
            :service="currentservice"
            @servicePaid="servicePaid"
            @agreementChange="changeService"
            @updateServiceDate="changeService"
          />
          <Revision1CServiceContent
            v-if="currentservice.service_type == 3"
            :service="currentservice"
            @servicePaid="servicePaid"
            @agreementChange="changeService"
            @updateServiceDate="changeService"
          />
          <AdministrationServiceContent
            v-if="currentservice.service_type == 2"
            :service="currentservice"
            @servicePaid="servicePaid"
            @agreementChange="changeService"
            @updateServiceDate="changeService"
          />
          <Support1CServiceContent
            v-if="currentservice.service_type == 4"
            :service="currentservice"
            @servicePaid="servicePaid"
            @agreementChange="changeService"
            @updateServiceDate="changeService"
          />
          <CloudServiceContent
            v-if="currentservice.service_type == 5"
            :service="currentservice"
            @servicePaid="servicePaid"
            @agreementChange="changeService"
            @updateServiceDate="changeService"
          />
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
// import SelectedServiceContent from "@/components/services/SelectedServiceContent.vue";
import CallocationServiceContent from "@/components/services/CallocationServiceContent.vue";
import DevelopmentServiceContent from "@/components/services/DevelopmentServiceContent.vue";
import AdministrationServiceContent from "@/components/services/AdministrationServiceContent.vue";
import Revision1CServiceContent from "@/components/services/Revision1CServiceContent.vue";
import Support1CServiceContent from "@/components/services/Support1CServiceContent.vue";
import CloudServiceContent from "@/components/services/CloudServiceContent.vue";
import { UserMapper } from "@/store/user";
import { AdminMapper } from "@/store/admin";
import { PartnerMapper } from "@/store/partner";

export default {
  name: "SelectedServiseView",
  components: {
    Header,
    HeaderAdmin,
    PartnerHeader,
    TopMenu,
    // SelectedServiceContent,
    CallocationServiceContent,
    DevelopmentServiceContent,
    AdministrationServiceContent,
    Revision1CServiceContent,
    Support1CServiceContent,
    CloudServiceContent,
  },

  data() {
    return {
      currentservice: {},
    };
  },

  computed: {
    ...UserMapper.mapState(["error", "profile", "online"]),
    ...AdminMapper.mapState(["service"]),
  },

  methods: {
    ...AdminMapper.mapActions(["getService", "patchService", "patchAgreement"]),
    ...PartnerMapper.mapActions(["getPartnerService"]),

    async servicePaid() {
      let id = this.$route.params.service;
      let data = { service_status: "in_work" };

      await this.patchService({ id, data });
      this.getCurrentService();

      console.log("currentservice", this.currentservice);
    },

    changeService() {
      this.getCurrentService();
    },

    async getCurrentService() {
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

      console.log("getServicesNew", this.currentservice);
    },
  },

  async mounted() {
    this.getCurrentService();

    console.log("currentservice", this.currentservice);
  },
};
</script>

<style scoped>
.home {
  display: flex;
}
</style>
