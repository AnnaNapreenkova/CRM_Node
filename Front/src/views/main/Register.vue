<template>
  <section id="login" class="signinup-bg">
    <div
      class="container full-height-container animate__animated animate__fadeIn"
    >
      <div class="wrapper">
        <div class="row w-100 justify-content-center">
          <FormRegister role="Admin" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FormRegister from "@/components/main/register/FormRegister.vue";

export default {
  components: {
    FormRegister,
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
}
.full-height-container {
  height: 100vh;
}
.wrapper {
  display: flex;
  height: 100%;
  width: 600px;
  margin: auto;
  justify-content: center;
  align-items: center;
}
</style>