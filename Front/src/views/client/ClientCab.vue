<template>
  <div class="home">
    <Header />
    <b-container fluid style="padding: 0 50px;">
      <b-row>
               
        <b-col cols="12" md="12">
          <TopMenu title="Домашняя" :user="profile"/>
          <UserHomeContent/>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header_block.vue";
import TopMenu from "@/components/Top_Menu.vue";
import UserHomeContent from "@/components/UserHomeContent.vue";
import { UserMapper } from "@/store/user"
// import moment from "moment";


export default {
  name: "UserHomeView",
  components: {
    Header,
    TopMenu,
    UserHomeContent,
  }, 

  computed: {
    ...UserMapper.mapState(["error", "profile"]),
  }, 
  
  mounted() {

   console.log("profile clientCab", this.profile);

  }

 
};
</script>

<style scoped>
.home{
  display: flex;
}
</style>
