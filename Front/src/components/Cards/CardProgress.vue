<template>
  <b-col cols="12" md="6" class="mobile-right-nopadding">
    <div class="card-wrap" style="height: 100%">
      <div
        class="
          anim-wrap
          wow
          animate__animated animate__fadeIn  
        "
      >
      <div class="">
        <div
          role="progressbar"
          aria-valuenow="39"
          aria-valuemin="0"
          aria-valuemax="100"
          style="--value: 39"
        ></div>
        <p
          class="
            on-progress-text
            my-3
            wow
            animate__animated animate__fadeIn  
          "
        >
          Процесс выполнения <span>50%</span>
        </p>
         </div>
        <div class="">
          <p class="progress-title">
            Lorem ipsum, dolor sit amet consectetur adipisicing.
          </p>
          <p
            class="
              progress-text
              wow
              animate__animated animate__fadeIn  
            "
          >
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem
          </p>
        </div>
      </div>
    </div>
  </b-col>
</template>

<script>
export default {
  name: "CardProgress",
};
</script>

<style scoped>
.card-wrap {
  border-radius: 20px;
  background: #202020;
  width: 100%;
  padding: 30px;
}
.card-wrap {
  transition: 0.5s ease;
}
.card-wrap:hover {
  box-shadow: 0px 0px 15px #36363690;
}
@property --percentage {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
.anim-wrap{
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: 100%;
}
[role="progressbar"] {
  --percentage: var(--value);
  --primary: #1d3573;
  --secondary: #2b2b2b;
  --thirdly: #1b7aaf;
  --size: 100%;
  animation: progress 2s 0.5s forwards;
  width: var(--size);
  aspect-ratio: 2 / 1;
  border-radius: 50% / 100% 100% 0 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

[role="progressbar"]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: conic-gradient(
    from 0.75turn at 50% 100%,
    var(--thirdly) calc(var(--percentage) * 1% / 2),
    var(--secondary) calc(var(--percentage) * 1% / 2 + 0.1%)
  );
  mask: radial-gradient(at 50% 100%, white 55%, transparent 55.5%);
  mask-mode: alpha;
  -webkit-mask: radial-gradient(at 50% 100%, #0000 55%, #000 55.5%);
  -webkit-mask-mode: alpha;
}

[role="progressbar"]::after {
  counter-reset: percentage var(--value);
  content: counter(percentage) "%";
  font-family: Helvetica, Arial, sans-serif;
  font-size: calc(var(--size) / 5);
  color: var(--primary);
}
.on-progress-text {
  color: #717579;
  font-weight: 600;
  font-size: 18px;
  width: 100;
  text-align: center;
}
.on-progress-text > span {
  color: #09bd3c;
}

.progress-title {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
}
.progress-text {
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #ffffff;
}
</style>