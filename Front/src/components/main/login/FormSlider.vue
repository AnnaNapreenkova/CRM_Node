<template>
  <div class="form-slider-wrapper">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <div class="slick-wrapper">
      <VueSlickCarousel
        :arrows="false"
        :dots="true"
        :autoplay="true"
        :autoplaySpeed="5000"
        :slidesToShow="1"
      >
        <div v-for="phrase in phrasesToShow" :key="phrase.id" class="slider-item">
          <h2 class="slider-title">{{phrase.phrase}}</h2>
          <p class="slider-text">
            {{phrase.author}}
          </p>
        </div>
        <!-- <div class="slider-item">
          <h2 class="slider-title">{{ phrasesToShow[0].phrase }}</h2>
          <p class="slider-text">
            {{ phrasesToShow[0].author }}
          </p>
        </div>
        <div class="slider-item">
          <h2 class="slider-title">{{ phrasesToShow[1].phrase }}</h2>
          <p class="slider-text">
            {{ phrasesToShow[1].author }}
          </p>
        </div>
        <div class="slider-item">
          <h2 class="slider-title">{{ phrasesToShow[2].phrase }}</h2>
          <p class="slider-text">
            {{ phrasesToShow[2].author }}
          </p>
        </div>
        <div class="slider-item">
          <h2 class="slider-title">{{ phrasesToShow[3].phrase }}</h2>
          <p class="slider-text">
            {{ phrasesToShow[3].author }}
          </p>
        </div>
        <div class="slider-item">
          <h2 class="slider-title">{{ phrasesToShow[4].phrase }}</h2>
          <p class="slider-text">
            {{ phrasesToShow[4].author }}
          </p>
        </div> -->
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "FormSlider",
  components: { VueSlickCarousel },
  data() {
    return {
      phrases: [
        {
          id: 1,
          phrase: "???????????????????? ?????????????????????? ??? ?????????????? ??????????????????????",
          author: "???????? ??????????",
        },
        {
          id: 2,
          phrase: "?????????????? ???? ?????????????? ??????, ???????????? ?????? ???????????? ???????? ????????????",
          author: "???????? ??????????",
        },
        {
          id: 3,
          phrase: "???????? ???????? ?????? ????????????????, ???????????? ?????? ?????????????? ??????",
          author: "???????????? ??????????????",
        },
        {
          id: 4,
          phrase:
            "?????????? ???????????? ?????? ????????, ?????????? ???????? ??????????. ?????????? ???????????? ?????? ??????????????, ???????????????????? ???????? ????????????",
          author: "???????? ?????????? ????????????",
        },
        {
          id: 5,
          phrase:
            "?? ?????????????? ?????????? ???????? ?????????? ??????????. ???? ?????????????????????? ??????????????????, ??????????????",
          author: "???????????? ????????????????",
        },
        {
          id: 6,
          phrase: "?????????????????? ?????????????????????? ?????????????? ???????????? ????????????, ?????? ??????????",
          author: "?????????? ??????????????????",
        },
        {
          id: 7,
          phrase:
            "?????????????????????? ?? ???????? ???????????? ???????? ???????????????? ???? ?????????????????? ??????????????: ????????????????????, ??????????????????????, ?? ???????????????????????? ???????????????????? ?????????? ?????? ??????????????????????",
          author: "???????? ??????????????????",
        },
        {
          id: 8,
          phrase: "???????????????? ?????????? ????????????????",
          author: "?????????? ??????????",
        },

        {
          id: 9,
          phrase:
            "?????????? ?? ???? ????????, ?? ???????? ????????????, ?? ???????????????? ???????????? ???????? ?? ????????: `// ?? ???????? ???? ?????????????`. ???????????? ?????? ???????? ??????-???? ???????? ??????????",
          author: "???????????? ??????????????",
        },
        {
          id: 10,
          phrase: "???????? ???????? ???????????? ???? ??????????????????????????????, ???????????? ???? ???? ????????????????",
          author: "?????? ??????????????",
        },
        {
          id: 11,
          phrase:
            "???????????? ?????????? ??????????????, ?????? ???????????? ??????????????????. ?????????? ???????????????? ?????????? ?????????? ???????? ???? ???????????????????????????? ??????????????????????????. ????????????????, ?? ??????????????????, ??????????????",
          author: "?????????????? ?????????? ????????",
        },
        {
          id: 12,
          phrase:
            "???????? ?????? ?????????? ???????????????? 20 ??????????????, ???????????? ?????? ?????????? ?????????????? ?? 20 ?????? ???????????? ?? ?? 20 ?????? ??????????????",
          author: "?????????? ????????????????????",
        },
        {
          id: 13,
          phrase: "???????? ???? ???????? ?????????? ?????? ????????????, ???? ?????????????????? ?????? ???? ??????????????",
          author: "???????????? ???????????? ????????????????",
        },
        {
          id: 14,
          phrase:
            "???? ???????????????????????????? ?? ???????????? ??????????????????, ?????????? ???? ???????????????????? ???????????????????? ??????????????. ?????? ?????????????? ???????????? ?????????????? ???????????????????????????? ????????????",
          author: "???????? ????????????",
        },
        {
          id: 15,
          phrase: "???? ???????????????? ?????????????????? ???????????? ???? ????????????????????????????",
          author: "?????? ??????????",
        },
        {
          id: 16,
          phrase:
            "?????????? ?????????????? ???????????????? ?????????????? ????????????, ???????????? ???? ???????????????????? ?? ????????. ???? ???????????",
          author: "???????? ???????????? ??????",
        },
        {
          id: 17,
          phrase: "???? ?????????????? ???????????????????? ???????????????????? ??????????????",
          author: "???????? ????????",
        },
        {
          id: 18,
          phrase: "???????????? ?????????????????? ???? ?????????????????? ????????????",
          author: "???????? ????????????",
        },
        {
          id: 19,
          phrase: "???????? ???? ???????????????? ??????????????????????????????, ???????? ???? ?????????????? ???? ????????",
          author: "???????????? ??????????????",
        },
        {
          id: 20,
          phrase: "???? ???????????? ?????????????? ????????????, ???????????? ?????????????? ????????????????????????",
          author: "???????????? ??????????????????",
        },
        {
          id: 21,
          phrase:
            "?????????? ?????????????? ???????????? ?????????? ???? ????????????????????, ?????? ?????????????? ???????????? ???????????????? ?????? ??????????",
          author: "?????? ??????????????",
        },
        {
          id: 22,
          phrase:
            "??????????-???? ?? ?????? ???????????????????? ????????????, ??????????????, ?????? ?????? ???????????????????? ?????????? ???????????? ?????????????? ???????? ????????",
          author: "?????????? ???????????????????? ??????????????",
        },
        {
          id: 23,
          phrase: "?????????????? ??????????????????????????: ?????? ?????????? ?? ???????? ??????????????",
          author: "?????????? ??????????????????",
        },
        {
          id: 24,
          phrase:
            "?????????????????? ???????????????????????? ?? ???????????????????? ????????: ?????????????????????? ????, ?? ?????????? ????????????, ?????? ???????",
          author: "?????????????? ????????????????",
        },
        {
          id: 25,
          phrase: "?? ?????? ???????????? ?????? ???????????????????",
          author: "?????????? ????????",
        },
        {
          id: 26,
          phrase:
            "?????? ?????????????? ??????????????????????, ?????? ?????????? ???? ???????????????? ?????? ?????????????????? ?????????? ???????????? ?? ??????????????",
          author: "???????? ????????",
        },
        {
          id: 27,
          phrase:
            "?????????? ???????????? ???????????????????? ?? ?????????????? ??????????????, ???????????? ?????? ???? ????????????????",
          author: "???????? ???????????? ??????????????",
        },
        {
          id: 28,
          phrase: "???????????????????? ???????? ?????????? ?? ??????????: ?????? ?????????? ???????????? ??????????????????",
          author: "?????????? ????????????",
        },
        {
          id: 29,
          phrase:
            "???? ?????????????????? ???? ??????????????: ???????????????? ???????????????????????? ???????????? ???????????? ???????????? ???? ???????????????? ?? ????????????????????????????????",
          author: "???????????? ????????????????",
        },
        {
          id: 30,
          phrase:
            "???????????????? ???????????? ???????????????????? ??????????????????????????, ???????????????? ???? ?????????? ????????????",
          author: "???????? ????????????",
        },
        {
          id: 31,
          phrase:
            "?????????????? LISP, ?? ???? ???? ???????????? ???????????????? ???? ???????????? ?????? ?? ?????????? ??????????. ?????????????? PHP, ?? ???? ???????? ?????????????? ???????????????????? ???????? ???? ?????????? ??????????",
          author: "???????????? ???????????? ????????????????",
        },
        {
          id: 32,
          phrase:
            "????????????, ?????? ???????????? ?????????? ?????????????? ????????????????????????????????, ?????????????? ???? ?????????????? ?????? ???????????? ????????????????",
          author: "?????????????? ??????",
        },
      ],

      phrasesToShow: [],
      // password: "",
    };
  },
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },
  },

  created() {
    while (this.phrasesToShow.length < 5) {
      let random = this.getRandomInt(0, this.phrases.length - 1);
      let elem = this.phrases.splice(random, 1)[0];
      this.phrasesToShow.push(elem);
    }

    console.log(this.phrasesToShow);
  },
};
</script>

<style lang="scss" scoped>
// @import compass;

// n is number of stars required
@function multiple-box-shadow($n) {
  $value: "#{random(2000)}px #{random(2000)}px #FFF";
  @for $i from 2 through $n {
    $value: "#{$value} , #{random(2000)}px #{random(2000)}px #FFF";
  }

  @return unquote($value);
}

$shadows-small: multiple-box-shadow(700);
$shadows-medium: multiple-box-shadow(200);
$shadows-big: multiple-box-shadow(100);

html {
  height: 100%;
  overflow: hidden;
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(-2000px);
  }
}

#stars {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: $shadows-small;
  animation: animStar 50s linear infinite;

  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: $shadows-small;
  }

  #stars2 {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: $shadows-medium;
    animation: animStar 100s linear infinite;

    &:after {
      content: " ";
      position: absolute;
      top: 2000px;
      width: 2px;
      height: 2px;
      background: transparent;
      box-shadow: $shadows-medium;
    }

    #stars3 {
      width: 4px;
      height: 4px;
      background: transparent;
      box-shadow: $shadows-big;
      animation: animStar 150s linear infinite;

      &:after {
        content: " ";
        position: absolute;
        top: 2000px;
        width: 4px;
        height: 4px;
        background: transparent;
        box-shadow: $shadows-big;
      }
    }
  }
}

.form-slider-wrapper {
  background-color: #131117;
  width: 50%;
  height: 100%;
  background: radial-gradient(
    ellipse at bottom,
    #1b2735 0%,
    #090a0f 100%
  ) !important;
}

.slick-wrapper {
  padding: 25px 70px 45px;
}

.slider-item {
  margin-top: 224px;
  max-width: 99%;
}

.slider-title {
  font-weight: 700;
  font-size: 35px;
  line-height: 1.3;
  color: #ffffff;
  margin-bottom: 25px;
}

.slider-text {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #d4d1da;
  margin-bottom: 0;
}
</style>

<style>
ul.slick-dots {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  height: 2px;
  z-index: 10;
}

.slick-dots {
  width: auto;
}

ul.slick-dots li {
  margin: 0;
  width: auto;
  height: auto;
  margin-right: 10px;
  padding: 20px 0;
}

ul.slick-dots li:last-child {
  margin-right: 0;
}

ul.slick-dots li.slick-active button {
  background-color: #fff;
}

.slick-dots li button {
  display: block;
  background: rgba(255, 255, 255, 0.3);
  width: 40px;
  height: 2px;
  padding: 0;
  transition: 0.3s;
}

.slick-dots li button:before {
  display: none;
}
</style>