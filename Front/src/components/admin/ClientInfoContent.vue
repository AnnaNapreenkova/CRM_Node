<template>
  <section id="content-dashboard">
    <b-container fluid class="container-inside">
      <b-row>
        <b-col class="left-content" cols="12" lg="6">
          <b-row style="margin: 0">
            <!-- <CardClients /> -->
            <CardTasks />
            <CardDeals/>
            <!-- <CardPayment class="mt-4" /> -->
            <CardDealsInfo class="mt-4" />
            <!-- <CardProjects /> -->
            <AgreementsContent :hidden="false"/>
          </b-row>
        </b-col>
        <b-col class="right-content" cols="12" lg="6">
          <b-row style="margin: 0">
            <!-- <CardFinanceInfo /> -->
            <!-- <CardProgress /> -->
            <CardBanner />
            <CardMessages class="mt-4" />
            <!-- <CardCategoriesInfo class="mt-4"/> -->
            <ServicesInfoContent />
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import CardClients from "@/components/Cards/CardClients.vue";
import CardTasks from "@/components/Cards/CardTasks.vue";
import CardDeals from "@/components/Cards/CardDeals.vue";
import CardPayment from "@/components/Cards/CardPayment.vue";
import CardDealsInfo from "@/components/Cards/CardDealsInfo.vue";
import CardProjects from "@/components/Cards/CardProjects.vue";
import CardFinanceInfo from "@/components/Cards/CardFinanceInfo.vue";
import CardProgress from "@/components/Cards/CardProgress.vue";
import CardBanner from "@/components/Cards/CardBanner.vue";
import CardMessages from "@/components/Cards/CardMessages.vue";
import CardCategoriesInfo from "@/components/Cards/CardCategoriesInfo.vue";
import AgreementsContent from "@/components/AgreementsContent.vue";
import ServicesInfoContent from "@/components/ServicesInfoContent.vue";

export default {
  name: "HomeContent",
  components: {
    CardClients,
    CardTasks,
    CardDeals,
    CardPayment,
    CardDealsInfo,
    CardProjects,
    CardFinanceInfo,
    CardProgress,
    CardBanner,
    CardMessages,
    CardCategoriesInfo,
    AgreementsContent,
    ServicesInfoContent
  },
};
</script>

<style scoped>
#content-dashboard {
  height: calc(100vh - 120px);
  padding-top: 20px;
  padding-bottom: 50px;
  overflow-y: auto;
}
.container-inside,
.container-inside > .row > .col-md-6 {
  padding: 0 !important;
}
.container-inside > .row {
  margin: 0;
}

@media (max-width: 1100px) {
  .left-content,
  .right-content {
    padding: 0;
  }
}
</style>

<style>
@media (max-width: 1100px) {
  .mobile-left-nopadding {
    padding-left: 0;
  }
  .mobile-right-nopadding {
    padding-right: 0;
  }
}
</style>