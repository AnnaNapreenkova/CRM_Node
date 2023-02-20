<template>
  <!-- карточка с количеством задач -->
  <b-col cols="12" md="6" class="mobile-right-nopadding mt-4" style="padding-left: 0;">
    <div class="card-wrap h-100">

      <div class="blocked-info" >
        <p>Находится в разработке</p>
      </div>

      <p>Выполнено задач</p>
      <div class="progress-wrap wow animate__animated animate__fadeIn">
        <div class="target-block">
          <div id="progressbar">
            <div></div>
          </div>
          <p><span style="color: #fc2e53">{{ tasks }} </span> осталось до цели</p>
        </div>
        <div class="current-target-number">
          <p>{{ target - tasks }}</p>
        </div>
      </div>
    </div>
  </b-col>
  <!-- карточка с количеством задач -->
</template>

<script>
export default {
  name: "CardTasks",

  data() {
    return {
      tasks: 55,
      target: 100
    }
  }
};
</script>

<style>
.blocked-info{
  position: absolute;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    -60deg,
    #555 0,
    #555 1px,
    transparent 2px,
    transparent 5px
  );
  background-color: #000000bd;
  top: 0;
  left: 0;
  border-radius: 10px;
  transition: 0.5s ease;
  display: flex;
      align-items: center;
    justify-content: center;
    z-index: 1000;
}
.blocked-info > p{
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
</style>

<style scoped>
.card-wrap {
  border-radius: 20px;
  background: #202020;
  width: 100%;
  padding: 30px;
  position: relative;
}
/* карточка с количеством задач */

.target-block,
.project-title-text-wrap {
  display: flex;
  flex-flow: column;
}
.target-block > p {
  margin-top: 10px;
  margin-bottom: 0;
}
.progress-wrap {
  display: flex;
  justify-content: space-between;
  color: #717579;
  align-items: flex-end;
}

#progressbar {
  border-radius: 13px;
  padding: 3px;
  background: #2b2b2b;
}

#progressbar > div {
  background-color: #1d5dff;
  width: 40%;
  /* Adjust with JavaScript */
  height: 10px;
  border-radius: 10px;
}
#progressbar > .green-progress-bar {
  background-color: #09bd3c;
}

.tasks {
  font-size: 14px;
  margin-bottom: 0;
}

.current-target-number > p {
  font-size: 32px;
  font-weight: 900;
  color: #ffffff;
}
.number > p {
  margin-right: 15px;
  font-size: 31px;
  font-weight: 900;
  line-height: 31px;
  margin-top: 10px;
}
.text-wrap > p,
.card-wrap > p {
  margin: 0;
  font-weight: 600;
  margin-bottom: 10px;
}
/* карточка с количеством задач */
.card-wrap {
  transition: 0.5s ease;
  position: relative;
}
.card-wrap:hover {
  box-shadow: 0px 0px 15px #36363690;
}
</style>