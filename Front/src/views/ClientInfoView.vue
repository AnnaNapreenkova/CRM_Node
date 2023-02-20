<template>
  <div class="home">
    <Header :isClientInfo="true"/>
    <b-container fluid style="padding: 0 50px;">
      <b-row>
       
        <b-col cols="12" md="12">
          <TopMenu title="О клиенте"/>
          <ClientInfoContent />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header_block.vue";
import TopMenu from "@/components/Top_Menu.vue";
import ClientInfoContent from "@/components/admin/ClientInfoContent.vue";

export default {
  name: "ClientInfoView",
  components: {
    Header,
    TopMenu,
    ClientInfoContent,
  },
};
</script>

<style scoped>
.home{
  display: flex;
}
</style>