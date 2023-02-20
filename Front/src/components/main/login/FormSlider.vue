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
          phrase: "Аккуратный программист — быстрый программист",
          author: "Билл Гейтс",
        },
        {
          id: 2,
          phrase: "Сегодня ты делаешь код, завтра код делает тебе деньги",
          author: "Стив Джобс",
        },
        {
          id: 3,
          phrase: "Если твой код работает, значит это хороший код",
          author: "Маркус Перссон",
        },
        {
          id: 4,
          phrase:
            "Чтобы понять код мида, нужно быть мидом. Чтобы понять код сеньора, достаточно быть джуном",
          author: "Гейб Логан Ньюэлл",
        },
        {
          id: 5,
          phrase:
            "У каждого языка есть время жизни. За исключением ’Кобола’, конечно",
          author: "Брайан Керниган",
        },
        {
          id: 6,
          phrase: "Настоящий программист гораздо больше читает, чем пишет",
          author: "Линус Торвальдс",
        },
        {
          id: 7,
          phrase:
            "Комментарии в коде должны быть похожими на кружевные трусики: маленькими, прозрачными, и оставляющими достаточно места для воображения",
          author: "Марк Цукерберг",
        },
        {
          id: 8,
          phrase: "Скорость имеет значение",
          author: "Павел Дуров",
        },

        {
          id: 9,
          phrase:
            "Когда я не знаю, с чего начать, я открываю чистый файл и пишу: `// С чего бы начать?`. Дальше всё идёт как-то само собой",
          author: "Расмус Лердорф",
        },
        {
          id: 10,
          phrase: "Если ваша работа не документирована, значит вы не работали",
          author: "Ада Лавлейс",
        },
        {
          id: 11,
          phrase:
            "Писать книги сложнее, чем писать программы. Любой писатель может стать хотя бы посредственным программистом. Обратное, к сожалению, неверно",
          author: "Дональд Эрвин Кнут",
        },
        {
          id: 12,
          phrase:
            "Если над кодом работали 20 человек, значит его можно сделать в 20 раз меньше и в 20 раз быстрее",
          author: "Бьёрн Страуструп",
        },
        {
          id: 13,
          phrase: "Если бы Омар Хайям жил сейчас, он наверняка был бы пиратом",
          author: "Ричард Мэттью Столлман",
        },
        {
          id: 14,
          phrase:
            "На собеседованиях я обычно спрашиваю, часто ли испытуемый использует костыли. Это хороший способ отсеять патологических лжецов",
          author: "Стив Возняк",
        },
        {
          id: 15,
          phrase: "Не ожидайте ухоженных ногтей от первопроходцев",
          author: "Сид Мейер",
        },
        {
          id: 16,
          phrase:
            "Можно сделать довольно большой проект, вообще не прикасаясь к мыши. Но зачем?",
          author: "Алан Кёртис Кэй",
        },
        {
          id: 17,
          phrase: "На длинных дистанциях выигрывают стайеры",
          author: "Брэм Коэн",
        },
        {
          id: 18,
          phrase: "Всегда начинайте со структуры данных",
          author: "Джон Кармак",
        },
        {
          id: 19,
          phrase: "Кофе не помогает программировать, зато он приятен на вкус",
          author: "Джеймс Гослинг",
        },
        {
          id: 20,
          phrase: "Не бывает хороших языков, бывают хорошие программисты",
          author: "Андерс Хейлсберг",
        },
        {
          id: 21,
          phrase:
            "Проще отучить собаку лаять на почтальона, чем отучить админа работать под рутом",
          author: "Кен Томпсон",
        },
        {
          id: 22,
          phrase:
            "Когда-то я был достаточно наивен, надеясь, что мне достаточно будет хорошо выучить один язык",
          author: "Давид Хейнемейер Ханссон",
        },
        {
          id: 23,
          phrase: "Завидую тестировщикам: все хотят с ними дружить",
          author: "Эндрю Таненбаум",
        },
        {
          id: 24,
          phrase:
            "Отдавайте распоряжения в письменном виде: программист вы, в конце концов, или нет?",
          author: "Юкихиро Мацумото",
        },
        {
          id: 25,
          phrase: "И где теперь ваш ассемблер?",
          author: "Ларри Уолл",
        },
        {
          id: 26,
          phrase:
            "Чем опытнее программист, тем лучше он осознаёт всю скудность своих знаний и навыков",
          author: "Крис Хьюз",
        },
        {
          id: 27,
          phrase:
            "Хакер всегда выигрывает в честной схватке, потому что он нечестен",
          author: "Эрик Стивен Рэймонд",
        },
        {
          id: 28,
          phrase: "Идеальному коду место в музее: там ценят всякие древности",
          author: "Питер Нортон",
        },
        {
          id: 29,
          phrase:
            "Не экономьте на дизайне: конечный пользователь ровным счётом ничего не понимает в программировании",
          author: "Дастин Московиц",
        },
        {
          id: 30,
          phrase:
            "Довольно сложно руководить программистом, которому не нужны деньги",
          author: "Стив Возняк",
        },
        {
          id: 31,
          phrase:
            "Выучите LISP, и вы не будете работать ни одного дня в своей жизни. Выучите PHP, и вы таки сумеете заработать себе на кусок хлеба",
          author: "Ричард Мэттью Столлман",
        },
        {
          id: 32,
          phrase:
            "Прежде, чем начать сеанс парного программирования, уберите из комнаты все острые предметы",
          author: "Брендан Эйх",
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