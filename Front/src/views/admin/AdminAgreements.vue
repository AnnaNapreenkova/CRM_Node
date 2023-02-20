<template>
  <div class="home">
    <Header />
    <b-container fluid style="padding: 0 50px">
      <b-row>
        <b-col cols="12" md="12">
          <TopMenu v-if="profile" title="Договоры" :user="profile" />
          <div v-if="!showspin && !agreements.length" class="spinner">
            <dot-loader
              :loading="spinloading"
              :color="spincolor"
              :size="spinsize"
            ></dot-loader>
          </div>
          <AgreementsContent
            v-else
            :agreements="agreements"
            :services="services"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/admin/Header_admin.vue";
import TopMenu from "@/components/Top_Menu.vue";
import AgreementsContent from "@/components/AgreementsContent.vue";
import DotLoader from "vue-spinner/src/DotLoader.vue";

import { UserMapper } from "@/store/user";
import { AdminMapper } from "@/store/admin";

export default {
  name: "AdminAgreementsView",
  components: {
    Header,
    TopMenu,
    AgreementsContent,
    DotLoader,
  },
  data() {
    return {
      show: false,
      agreements: [],
      spinsize: "300",
      spinwidth: "100",
      spinheight: "100",
      spincolor: "#1d3573",
      spinloading: true,
      showspin: false,
      services: []
    };
  },

  computed: {
    ...UserMapper.mapState(["error", "profile"]),
    ...AdminMapper.mapState(["clients"]),
  },
  methods: {
    ...AdminMapper.mapActions(["getAgreements", "getAllServices", "getServiceAgreements"]),
    async allAgreements() {
      await this.getAgreements();
    },
  },
  async mounted() {
    let agreements;
    if (this.$route.params.service) {
      console.log("service agreements");
      agreements = await this.getServiceAgreements(this.$route.params.service);
      
    } else {
      console.log("agreements agreements1");
      agreements = await this.getAgreements();
    }
    
    if (agreements) {
      this.agreements = agreements;
      this.showspin = true;
    }

    let services = await this.getAllServices();
    if (services) {
      this.services = services;
      this.showspin = true;
    }

    console.log("agreements", this.services);
  },
};
</script>

<style scoped>
.home {
  display: flex;
}

.spinner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>