<template>
  <div class="home">
    <HeaderAdmin v-if="profile && profile.role == 'Admin'"/>
    <PartnerHeader v-if="profile && profile.role == 'Partner'"/>

    <Header v-if="(profile && profile.role != 'Admin') && (profile && profile.role != 'Partner') && (profile && profile.role != '')"/>


    <b-container fluid style="padding: 0 50px">
      <b-row>
        <b-col cols="12" md="12">
          <TopMenu v-if="profile" title="Профиль" :user="profile"/>         
          <!-- <ProfileContent v-if="profile && profile.role == 'Admin'" :user="profile" :profile="adminProfile" @change="changeData"/>
          <ProfileContent v-if="profile && profile.role == 'Partner'" :user="profile" :profile="partnerProfile" @change="changeData"/>
          <ProfileContent v-else :user="profile" :profile="clientProfile" @change="changeData"/> -->
          <ProfileContent v-if="currentprofile" :user="profile" :profile="currentprofile" @change="changeData"/>
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header_block.vue";
import HeaderAdmin from "@/components/admin/Header_admin.vue";
import PartnerHeader from "@/components/partner/Header_partner.vue";
import TopMenu from "@/components/Top_Menu.vue";
import ProfileContent from "@/components/ProfileContent.vue";
import { UserMapper } from "@/store/user";
import { ClientMapper } from "@/store/client";
import { PartnerMapper } from "@/store/partner";
import { AdminMapper } from "@/store/admin";
// import { runInThisContext } from "vm";
export default {
  name: "ProfileView",
    components: {
    Header,
    TopMenu,
    ProfileContent,
    HeaderAdmin,
    PartnerHeader
  },
    data() {
    return {
      role: "",
      currentprofile: {}
    };
  },
   computed: {
    ...UserMapper.mapState(["error", "profile"]),
    ...ClientMapper.mapState(["clientProfile"]),
    ...PartnerMapper.mapState(["partnerProfile"]),
    ...AdminMapper.mapState(["adminProfile"]),
  }, 
  methods: {
    ...UserMapper.mapActions(["getUser", "patchUser"]),
    ...ClientMapper.mapActions(["getClientProfile", "patchClientProfile"]),
    ...PartnerMapper.mapActions(["getPartnerProfile", "patchPartnerProfile"]),
    ...AdminMapper.mapActions(["getAdminProfile", "patchAdminProfile"]),

    async pickRole() {
      await this.getUser();
        this.role = this.profile.role;
      // console.log(this.role);
    },

    async changeData(data) {

      console.log("data", data)
      let payload = {...data};
      
      if (this.profile.role == "AdminClient") {   
        let id = this.clientProfile.id;
        await this.patchClientProfile({id, payload});  
        this.currentprofile = this.clientProfile;     
      } else if (this.profile.role == "Partner") {   
        let id = this.partnerProfile.id;             
        await this.patchPartnerProfile({id, payload});
        this.currentprofile = this.partnerProfile;
      } else if (this.profile.role == "Admin") {   
        let id = this.adminProfile.id; 
        await this.patchAdminProfile({id, data});
        this.currentprofile = this.adminProfile;
      }

      // if (data.phone) {
      //   let isFormData = null
      //   payload = {phone: data.phone};
      //   await this.patchUser(payload, isFormData);

      // }


    }
  },
    async mounted() {
        this.pickRole();
        if (this.profile.role == "AdminClient") {
          await this.getClientProfile();
          this.currentprofile = this.clientProfile;
        } else if (this.profile.role == "Partner") {
          await this.getPartnerProfile();
          this.currentprofile = this.partnerProfile;
        } else if (this.profile.role == "Admin") {
          await this.getAdminProfile();
          this.currentprofile = this.adminProfile;
        }
        
        console.log("profile", this.profile);
        console.log("clientprofile", this.clientProfile);
        console.log("partnerprofile", this.partnerProfile);
        console.log("adminprofile", this.adminProfile);
        console.log("currentprofile", this.currentprofile);
    }
  }
 
</script>

<style scoped>
.home {
  display: flex;
}
</style>