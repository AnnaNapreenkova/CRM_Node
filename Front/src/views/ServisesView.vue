<template>
  <div class="home">
    <Header
      v-if="profile.role == 'AdminClient' || profile.role == 'PartnerClient'"
    />
    <HeaderPartner v-if="profile.role == 'Partner'" />

    <b-container fluid style="padding: 0 50px; overflow-y: auto; height: 100vh;">
      <b-row>
        <b-col cols="12" md="12">
          <TopMenu title="Услуги" :user="profile" />
          <ServisesContent
            :services="services"
            :partnerProfile="partnerProfile"
            
          />
          <h2 class="agreements-title">Договоры</h2>
          <AgreementsContent
            v-if="agreements.length"
            :agreements="agreements"
            :services="services"
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
import HeaderPartner from "@/components/partner/Header_partner.vue";
import TopMenu from "@/components/Top_Menu.vue";
import ServisesContent from "@/components/ServisesContent.vue";
import UserMapper from "@/store/user";
import { ClientMapper } from "@/store/client";
import { PartnerMapper } from "@/store/partner";
import AgreementsContent from "@/components/AgreementsContent.vue";
export default {
  name: "ServicesView",
  components: {
    Header,
    HeaderPartner,
    TopMenu,
    ServisesContent,
    AgreementsContent,
  },

  data() {
    return {
      services: [],
      agreements: [],
      client: false,
    };
  },

  computed: {
    ...UserMapper.mapState(["error", "profile"]),
    ...PartnerMapper.mapState(["partnerProfile"]),
  },

  methods: {
    ...ClientMapper.mapActions(["getClientServices", "getClientAgreements"]),
    ...PartnerMapper.mapActions([
      "getPartnerProfile",
      "getPartnerServices",
      "getPartnerAgreements",
    ]),

    // async getServices() {
    //   let services;
    //   let agreements;
    //   if (this.profile.role != "Partner") {
    //     services = await this.getClientServices();
    //     agreements = await this.getClientAgreements();
    //   } else if (this.profile.role == "Partner") {
    //     services = await this.getPartnerServices();
    //     agreements = await this.getPartnerAgreements();
    //   }

    //   console.log("get services", services);

    //   if (services) {
    //     this.services = services;
    //   }

    //   if (agreements) {
    //     this.agreements = agreements;
    //   }

    //   if (this.profile.role == "Partner") {
    //     await this.getPartnerProfile();
    //   }

    //   console.log("services", services);
    // },

    
  },

  async mounted() {
    console.log("check services");
    // this.getServices;

    let services;
    let agreements;
    if (this.profile.role != "Partner") {
      services = await this.getClientServices();
      agreements = await this.getClientAgreements();
    } else if (this.profile.role == "Partner") {
      services = await this.getPartnerServices();
      agreements = await this.getPartnerAgreements();
    }

    if (services) {
      this.services = services;
    }

    if (agreements) {
      this.agreements = agreements;
    }

    if (this.profile.role == "Partner") {
      await this.getPartnerProfile();
    }
    
    console.log("client services", this.services);

    console.log("client agreements", this.agreements);
  },

  // beforeUpdate() {
  //   this.getServices;

  // }
};
</script>

<style scoped>
.home {
  display: flex;
}
</style>
