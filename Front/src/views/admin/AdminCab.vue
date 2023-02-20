<template>
  <div class="home">
    <Header />
    <b-container fluid style="padding: 0 50px;">
      <b-row>       
        <b-col cols="12" md="12">
          <TopMenu v-if="profile" title="Сводка" :user="profile"/>
          <HomeContent/>       
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/admin/Header_admin.vue";
import TopMenu from "@/components/Top_Menu.vue";
import HomeContent from "@/components/HomeContent.vue";
import { UserMapper } from "@/store/user"

export default {
 name: "AdminCab",
 data() {
    return {      
      show: false,
    }
  },
  components: {
    Header,
    TopMenu,
    HomeContent,
  },
  computed: {
    ...UserMapper.mapState(["error", "profile"]),
  }, 
};
</script>

<style scoped>
.home{
  display: flex;
}
</style>
