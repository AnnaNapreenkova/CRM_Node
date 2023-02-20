<template>
  <section id="login" class="signinup-bg">
    <div
      class="full-height-container animate__animated animate__fadeIn"
    >
      <div class="wrapper">
        <div class="row w-100">
          <FormLogin style="align-self: center;" :type="1" />
          <FormSlider />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FormLogin from "@/components/main/login/FormLogin.vue";
import FormSlider from "@/components/main/login/FormSlider.vue";

export default {
  components: {
    FormLogin,
    FormSlider
  },
};
</script>

<style scoped>
.signinup-bg{
  /* background-image: url('../../assets/pictures/bg.jpg'); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  background-color: #19171D;
  overflow: hidden;
}
.full-height-container {
  
  height: 100vh;
}
.wrapper {
  display: flex;
  height: 100%;
  justify-content: center;
  margin: auto;
}
</style>