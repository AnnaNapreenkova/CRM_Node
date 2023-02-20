<template>
  <!-- карточка с текущими задачами -->
  <b-col cols="12" class="mobile-right-nopadding" style="padding-left: 0; margin: 15px 0">
    <div class="card-wrap">
      <div class="messages-wrap">
        <div class="messages-title-block">
          <div class="messages-title-text-wrap">
            <p class="messages-title">Важные проекты</p>
            <p class="messages-title-text">
              Прикрепляйте задачи и анализируйте их прогресс!
            </p>
          </div>
          <a href="#"> <img src="../../assets/icons/more.svg" alt="" /> </a>
        </div>

        <div
          class="
            messages-body
            wow
            animate__animated animate__fadeIn  
          "
        >
          <b-row class="projects-row">
            <b-col cols="12" sm="6">
              <div class="wrap-project">
                <div class="project-title">
                  <img
                    class="project-photo"
                    style="margin-right: 15px"
                    src="../../assets/icons/placeholder.png"
                    alt=""
                  />
                  <div class="project-title-text-wrap">
                    <p class="project-title-text">Kleon Studios</p>
                    <p class="project-title-after-text">Creative Agency</p>
                  </div>
                </div>
                <p class="project-title-text">
                  Landing Page Kleon Websites Development
                </p>
                <p class="project-title-after-text mt-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium...
                </p>

                <div class="project-tags-wrapper">
                  <p class="project-tag website-tag mt-3">ВЕБ-САЙТ</p>
                </div>
              </div>
            </b-col>
            <b-col cols="12" sm="6">ТУТ МОГЛА БЫТЬ ВАША ДИАГРАММА</b-col>

            <div class="my-3 w-100"></div>

            <b-col cols="12" sm="6">
              <div class="wrap-project border-project">
                <div class="project-title">
                  <img
                    class="project-photo"
                    style="margin-right: 15px"
                    src="../../assets/icons/placeholder.png"
                    alt=""
                  />
                  <div class="project-title-text-wrap">
                    <p class="project-title-text">Kleon Studios</p>
                    <p class="project-title-after-text">Creative Agency</p>
                  </div>
                </div>
                <p class="project-title-text">
                  Landing Page Kleon Websites Development
                </p>
                <p class="project-title-after-text mt-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium...
                </p>

                <div style="display: flex; flex-wrap: wrap;">
                  <p class="project-tag mobile-tag mt-3">МОБИЛЬНАЯ</p>
                  <p class="project-tag cms-tag mt-3">
                    CMS
                  </p>
                </div>

                <div class="target-block mt-2">
                  <div id="progressbar">
                    <div class="green-progress-bar"></div>
                  </div>
                  <div
                    class="mt-2"
                    style="display: flex; justify-content: space-between"
                  >
                    <p class="tasks">
                      <span style="font-weight: 600">12</span> задач выполнено
                    </p>
                    <p class="deadline">До: 12.05.2022</p>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col cols="12" sm="6">
              <div class="wrap-project border-project">
                <div class="project-title">
                  <img
                    class="project-photo"
                    style="margin-right: 15px"
                    src="../../assets/icons/placeholder.png"
                    alt=""
                  />
                  <div class="project-title-text-wrap">
                    <p class="project-title-text">Kleon Studios</p>
                    <p class="project-title-after-text">Creative Agency</p>
                  </div>
                </div>
                <p class="project-title-text">
                  Landing Page Kleon Websites Development
                </p>
                <p class="project-title-after-text mt-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium...
                </p>

                <div style="display: flex; flex-wrap: wrap;">
                  <p class="project-tag seo-tag mt-3">SEO</p>
                  <p
                    class="project-tag marketing-tag mt-3"
                  >
                    МАРКЕЙТИНГ
                  </p>
                </div>

                <div class="target-block mt-2">
                  <div id="progressbar">
                    <div class="green-progress-bar"></div>
                  </div>
                  <div
                    class="mt-2"
                    style="display: flex; justify-content: space-between"
                  >
                    <p class="tasks">
                      <span style="font-weight: 600">12</span> задач выполнено
                    </p>
                    <p class="deadline">До: 12.05.2022</p>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col cols="12" sm="6">
              <div class="wrap-project border-project">
                <div class="project-title">
                  <img
                    class="project-photo"
                    style="margin-right: 15px"
                    src="../../assets/icons/placeholder.png"
                    alt=""
                  />
                  <div class="project-title-text-wrap">
                    <p class="project-title-text">Kleon Studios</p>
                    <p class="project-title-after-text">Creative Agency</p>
                  </div>
                </div>
                <p class="project-title-text">
                  Landing Page Kleon Websites Development
                </p>
                <p class="project-title-after-text mt-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium...
                </p>

                <div style="display: flex; flex-wrap: wrap;">
                  <p class="project-tag mobile-tag mt-3">МОБИЛЬНАЯ</p>
                  <p
                    class="project-tag website-tag mt-3"
                  >
                    ВЕБ-САЙТ
                  </p>
                </div>

                <div class="target-block mt-2">
                  <div id="progressbar">
                    <div class="green-progress-bar"></div>
                  </div>
                  <div
                    class="mt-2"
                    style="display: flex; justify-content: space-between"
                  >
                    <p class="tasks">
                      <span style="font-weight: 600">12</span> задач выполнено
                    </p>
                    <p class="deadline">До: 12.05.2022</p>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col cols="12" sm="6">
              <div class="wrap-project border-project">
                <div class="project-title">
                  <img
                    class="project-photo"
                    style="margin-right: 15px"
                    src="../../assets/icons/placeholder.png"
                    alt=""
                  />
                  <div class="project-title-text-wrap">
                    <p class="project-title-text">Kleon Studios</p>
                    <p class="project-title-after-text">Creative Agency</p>
                  </div>
                </div>
                <p class="project-title-text">
                  Landing Page Kleon Websites Development
                </p>
                <p class="project-title-after-text mt-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium...
                </p>

                <div style="display: flex; flex-wrap: wrap;">
                  <p class="project-tag desktop-tag mt-3">ПРИЛОЖЕНИЕ</p>
                </div>

                <div class="target-block mt-2">
                  <div id="progressbar">
                    <div class="green-progress-bar"></div>
                  </div>
                  <div
                    class="mt-2"
                    style="display: flex; justify-content: space-between"
                  >
                    <p class="tasks">
                      <span style="font-weight: 600">12</span> задач выполнено
                    </p>
                    <p class="deadline">До: 12.05.2022</p>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>

          <div class="mt-4 pt-3" style="display: flex; justify-content: center">
            <a href="#" class="project-pin-more">Прикрепить ещё проект</a>
          </div>
        </div>
      </div>
    </div>
  </b-col>
  <!-- карточка с текущими задачами -->
</template>

<script>
export default {
  name: "CardProjects",
};
</script>

<style scoped>
.messages-body {
  margin-top: 25px;
}

.messages-wrap,
.messages-title-text-wrap {
  display: flex;
  flex-flow: column;
}
.messages-wrap,
.messages-title-text-wrap {
  display: flex;
  flex-flow: column;
}
.messages-title {
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 5px;
}
.messages-title-text {
  font-size: 14px;
  color: #717579;
  margin-bottom: 0px;
}
.messages-title-block {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
.card-wrap {
  border-radius: 20px;
  background: #202020;
  width: 100%;
  padding: 30px;
}

.project-photo {
  background: #C4C4C4;
  border-radius: 10px;
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.project-title {
  display: flex;
  margin-bottom: 20px;
}

.projects-row > .col-sm-6 {
  padding: 0 !important;
}
.project-title-text-wrap {
  justify-content: center;
}
.project-title-text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 0px;
  color: #ffffff;
}
.project-title-after-text {
  font-size: 14px;
  color: #717579;
  margin-bottom: 0;
}

.project-tags-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.project-tag {
  font-size: 12px;
  margin-bottom: 0px;
  padding: 7px 15px 5px 15px;
  width: fit-content;
  border-radius: 4px;
  margin-right: 10px;
}

.project-tag:last-child {
  margin-right: 0;
}

.wrap-project {
  padding: 15px;
}
.website-tag {
  color: #2251f8;
  background: rgba(34, 81, 248, 0.15);
}
.mobile-tag {
  background: rgba(39, 176, 168, 0.15);
  color: #27b0a8;
}
.cms-tag {
  background: rgba(49, 24, 200, 0.15);
  color: #3118c8;
}
.marketing-tag {
  background: rgba(255, 74, 85, 0.15);
  color: #ff4a55;
}
.seo-tag {
  background: rgba(234, 201, 71, 0.15);
  color: #eac947;
}
.desktop-tag {
  background: rgba(255, 74, 85, 0.15);
  color: #fc2e53;
}
.project-pin-more {
  padding: 10px 50px 5px 50px;
  border: 1px solid #1d5dff;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #1d5dff;
  text-decoration: none;
  transition: 0.5s ease;
}
.project-pin-more:hover {
  transform: scale(1.1);
  color: #ffffff!important;
  background-color: #1d5dff;
}
.border-project {
  border: 2px solid #2b2b2b;
}

.deadline {
  font-size: 14px;
  color: #717579;
  margin-bottom: 0;
}
.card-wrap {
  transition: 0.5s ease;
}
.card-wrap:hover {
  box-shadow: 0px 0px 15px #36363690;
}

</style>