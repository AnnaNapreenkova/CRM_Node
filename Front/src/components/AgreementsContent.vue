<template>
  <section id="agreements-content">
    <div class="agreements-filter">
      <div class="agreements-filter__tabs">
        <button
          class="agreements-filter__tab active"
          type="button"
          @click="changeStatus('all', $event)"
        >
          Все
        </button>
        <button
          class="agreements-filter__tab"
          type="button"
          @click="changeStatus('process', $event)"
        >
          В процессе
        </button>
        <button
          class="agreements-filter__tab"
          type="button"
          @click="changeStatus('pending', $event)"
        >
          Ожидание
        </button>
        <button
          class="agreements-filter__tab"
          type="button"
          @click="changeStatus('closed', $event)"
        >
          Закрыто
        </button>
      </div>
      
    </div>
    <ul class="agreements-list" v-if="currentAgreements.length">
      <li
        class="agreements-list__item"
        v-for="(agreement, i) in paginatedAgreements.filter(
          (agreement) => agreement.doc_type == 'agreement'
        )"
        :key="i"
        @click="extAgreements.length ? showExtAgreement(agreement.id) : null "
        
         
      >
        <div class="agreements-list__block">
          <div class="agreements-list__first">
            <div class="agreements-list__number">
              {{ agreement.doc_number }}
            </div>
            <h3 class="agreements-list__title">{{ agreement.doc_name }}</h3>
          </div>
          <div class="agreements-list__second">
            <div class="agreements-list__background">
              <svg
                class="agreements-list__icon"
                width="20"
                height="24"
                viewBox="0 0 20 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.2961 8.6858C19.1797 8.44064 18.9325 8.28427 18.661 8.28427H11.6088L15.8773 1.06083C16.0057 0.843469 16.0077 0.573844 15.8826 0.354609C15.7574 0.135375 15.5244 -9.37014e-05 15.2719 4.86277e-08L9.24682 0.000656299C8.99679 0.000750049 8.76556 0.1335 8.6396 0.349453L0.731791 13.905C0.6049 14.1224 0.60401 14.3911 0.729401 14.6094C0.854791 14.8277 1.08734 14.9624 1.3391 14.9624H8.34635L6.30542 23.1263C6.22554 23.4457 6.37812 23.7779 6.67249 23.9255C6.7729 23.9757 6.88057 24 6.98721 24C7.19327 24 7.39521 23.9094 7.53237 23.7413L19.2058 9.43186C19.3774 9.22148 19.4126 8.93105 19.2961 8.6858Z"
                  fill="white"
                />
              </svg>
            </div>
            <div class="agreements-list__wrapper">
              <p class="agreements-list__dtitle">Дата</p>
              <p class="agreements-list__date">
                {{ formatDate(agreement.createdAt) }}
              </p>
            </div>
          </div>
          <div class="agreements-list__third" v-if="hidden">
            <!--  <img class="agreements-list__avatar" :src="require(`@/assets/pictures/agreements/${document.avatar}`)" alt=""> -->
            <div class="agreements-list__wrap">
              <div
                v-if="$route.params.service && profile.role == 'Admin'"
                class="agreements-list__client"
              >
                Договора
              </div>
              <!-- <a
                class="client-watch"
                @click.prevent="pushToUser(agreement.client)"
                >Перейти к клиенту</a
              > -->
              <a
                v-if="$route.params.service && profile.role == 'Admin'"
                class="client-watch"
                @click.prevent="pushToService('agreement', agreement.services)"
                >Перейти к договорам</a
              >

              <div
                v-if="!$route.params.service"
                class="agreements-list__client"
              >
                Услуга
              </div>

              <a
                v-if="!$route.params.service"
                class="client-watch"
                @click.prevent="pushToService('service', agreement.services)"
                >Перейти к услуге</a
              >
            </div>
          </div>
          <div class="agreements-list__fourth" v-if="hidden">
            <div
              class="agreements-list__progress"
              :class="{
                green: agreement.doc_status == 'process',
                orange: agreement.doc_status == 'pending',
              }"
              v-if="hidden"
            >
              {{ docStatus[agreement.doc_status] }}
            </div>
          </div>
          <button class="agreements-list__options" type="button" @click="showAgreementModal('ext_agreement', agreement)">
            +
          </button>
        </div>
        <transition v-if="showExt == agreement.id && extAgreements.filter(
                (extagreement) => extagreement.head_agreement == agreement.id
              ).length" name="fade">
          <ul class="agreements-list agreements-list--sublist">
            <li
              class="agreements-list__item agreements-list__subitem"
              v-for="(extagreement, i) in extAgreements.filter(
                (extagreement) => extagreement.head_agreement == agreement.id
              )"    
              :key="i"
            >
              <div class="agreements-list__block">
                <div class="agreements-list__first">
                  <div class="agreements-list__number">
                    {{ extagreement.doc_number }}
                  </div>
                  <h3 class="agreements-list__title">
                    {{ extagreement.doc_name }}
                  </h3>
                </div>
                <div class="agreements-list__second">
                  <div class="agreements-list__background">
                    <svg
                      class="agreements-list__icon"
                      width="20"
                      height="24"
                      viewBox="0 0 20 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.2961 8.6858C19.1797 8.44064 18.9325 8.28427 18.661 8.28427H11.6088L15.8773 1.06083C16.0057 0.843469 16.0077 0.573844 15.8826 0.354609C15.7574 0.135375 15.5244 -9.37014e-05 15.2719 4.86277e-08L9.24682 0.000656299C8.99679 0.000750049 8.76556 0.1335 8.6396 0.349453L0.731791 13.905C0.6049 14.1224 0.60401 14.3911 0.729401 14.6094C0.854791 14.8277 1.08734 14.9624 1.3391 14.9624H8.34635L6.30542 23.1263C6.22554 23.4457 6.37812 23.7779 6.67249 23.9255C6.7729 23.9757 6.88057 24 6.98721 24C7.19327 24 7.39521 23.9094 7.53237 23.7413L19.2058 9.43186C19.3774 9.22148 19.4126 8.93105 19.2961 8.6858Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div class="agreements-list__wrapper">
                    <p class="agreements-list__dtitle">Дата</p>
                    <p class="agreements-list__date">
                      {{ formatDate(extagreement.createdAt) }}
                    </p>
                  </div>
                </div>
                <div class="agreements-list__third" v-if="hidden">
                  <div class="agreements-list__wrap">
                    <div
                      v-if="$route.params.service && profile.role == 'Admin'"
                      class="agreements-list__client"
                    >
                      Договора
                    </div>

                    <a
                      v-if="$route.params.service && profile.role == 'Admin'"
                      class="client-watch"
                      @click.prevent="
                        pushToService('agreement', agreement.services)
                      "
                      >Перейти к договорам</a
                    >

                    <div
                      v-if="!$route.params.service"
                      class="agreements-list__client"
                    >
                      Услуга
                    </div>

                    <a
                      v-if="!$route.params.service"
                      class="client-watch"
                      @click.prevent="pushToService(extagreement.services)"
                      >Перейти к услуге</a
                    >
                  </div>
                </div>
                <div class="agreements-list__fourth" v-if="hidden">
                  <div
                    class="agreements-list__progress"
                    :class="{
                      green: extagreement.doc_status == 'process',
                      orange: extagreement.doc_status == 'pending',
                    }"
                    v-if="hidden"
                  >
                    {{ docStatus[extagreement.doc_status] }}
                  </div>
                </div>
                <button class="agreements-list__options" type="button" @click="showAgreementModal('ext_agreement', agreement)">
                  +
                </button>
              </div>
            </li>
            <div class="flexend">
              <!-- <button
                class="agreements-filter__add"
                type="button"
                v-if="hidden"
                @click="showAgreementModal('ext_agreement', agreement)"
              >
                + Дополнительное соглашение
              </button> -->
            </div>
          </ul>
        </transition>
      </li>
    </ul>
    <div class="agreements-footer">
      <p class="mt-3">Текущая страница: {{ currentPage }}</p>
      <b-row>
        <b-col md="6" class="my-1">
          <b-pagination
            @change="onPageChanged"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
          >
          </b-pagination>
        </b-col>
      </b-row>
    </div>
    <ModalAddAgreement
      :show="show"
      :currentAgreement="currentAgreement"
      :agreementType="agreementType"
      :services="services"
      @close="show = false"
      @add="addAgreement"
    />
  </section>
</template>

<script>
import ModalAddAgreement from "@/components/admin/ModalAddAgreement.vue";
// import toast from "@/scripts/toastMixin";
import moment from "moment";
import { AdminMapper } from "@/store/admin";
import { UserMapper } from "@/store/user";
export default {
  name: "AgreementsContent",
  components: {
    ModalAddAgreement,
  },

  props: {
    hidden: {
      type: Boolean,
      default: true,
    },
    agreements: {
      type: Array,
    },

    services: {
      type: Array,
    },
  },
  data() {
    return {
      paginatedAgreements: [],
      perPage: 5,
      currentPage: 1,
      show: false,

      currentAgreements: [],
      currentAgreement: {},
      agreementType: "",

      docStatus: {
        process: "Подписано/оплачено",
        pending: "Ожидание",
        close: "Закрыто",
      },

      extAgreements: [],
      showExt: 0,

      serviceList: [
        "Collocation",
        "Разработка сайта",
        "Администрирование серверов",
        "Доработка 1С",
        "Сопровождение 1С",
        "Облачное хранилище",
      ],
    };
  },
  computed: {
    ...UserMapper.mapState(["profile"]),
    rows() {
      return this.currentAgreements.length;
    },
  },
  methods: {
    ...AdminMapper.mapActions(["postAgreement", "getClientAgreements"]),

    showAgreementModal(type = "agreement", agreement = {}) {
      console.log("type", type);

      this.currentAgreement = agreement;
      this.agreementType = type;

      this.show = true;
    },

    showExtAgreement(id) {
      if (this.showExt == id) {
        this.showExt = 0;
      } else {
        this.showExt = id;
      }
    },

    async addAgreement(agreement) {
      // let id = this.$route.params.id;
      let id = agreement.client;
      let data = { ...agreement };

      await this.postAgreement({ id, data });
      if (!this.error) {
        let agreements = await this.getClientAgreements(id);
        if (agreements) {
          this.currentAgreements = agreements;
        }

        this.extAgreements = this.currentAgreements.filter(
          (item) => item.doc_type == "ext_agreement"
        );

        console.log("extAgreements", this.extAgreements);

        this.paginate(this.perPage, 0, this.currentAgreements);

        this.$emit("agreementChange");

        console.log("current agreements", this.currentAgreements);
        this.toast("Успешно", "договор успешно создан", "success");
      } else {
        this.toast("Ошибка", "Ошибка при создании договора", "danger");
      }
    },

    changeStatus(type, event) {
      let actives = [...document.getElementsByClassName("active")];

      actives.forEach((active) => active.classList.remove("active"));

      //  for (let i = 0; i < actives.length; i++) {
      //    actives[i].classList.remove("active");
      //  }

      console.log("type", type);
      console.log("agreements", this.agreements);
     

      event.target.classList.add("active");

      if (type == "all") {
        this.currentAgreements = this.agreements;
      } else {
        this.currentAgreements = this.agreements.filter(
          (agreement) => agreement.doc_status == type
        );
      }
      console.log("currentagreements", this.currentAgreements);
      this.paginate(this.perPage, 0, this.currentAgreements);

      
    },

    paginate(page_size, page_number, agreements) {
      // this.currentAgreements = this.agreements;
      // let itemsToParse = this.currentAgreements;
      
      this.paginatedAgreements = agreements.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    onPageChanged(page) {
      // let agreements = this.agreements;
      this.paginate(this.perPage, page - 1, this.currentAgreements);
    },

    pushToService(type, id) {
      // this.$router.push({ name: "client-detail", params: { id: id } });
      if (type == "agreement") {
        this.$router.push({
          name: "agreements-service-view",
          params: { serviceId: id },
        });
      } else if (type == "service") {
        this.$router.push({
          name: "service-selected",
          params: { service: id },
        });
      }
    },
    formatDate(date) {
      return moment(date).format("DD.MM.YYYY");
    },

    getAgreements() {
      this.currentAgreements = this.agreements;

      this.extAgreements = this.agreements.filter(
        (item) => item.doc_type == "ext_agreement"
      );

      this.paginate(this.perPage, 0, this.currentAgreements);

      console.log("update agreements", this.currentAgreements, this.extAgreements);
    },
  },


  async mounted() {
    this.currentAgreements = this.agreements;

    this.extAgreements = this.agreements.filter(
      (item) => item.doc_type == "ext_agreement"
    );

    this.paginate(this.perPage, 0, this.currentAgreements);

    console.log("current agreements", this.currentAgreements);
  },

  watch: {
    agreements: {
      handler(val, oldVal) {
        this.getAgreements();
      }
    }
  },

 
};
</script>

<style scoped>
.flexend {
  display: flex;
  justify-content: flex-end;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

ul {
  list-style: none;
}

#agreements-content {
  margin-top: 20px;
}

.agreements-filter {
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin-bottom: 30px;
}

.agreements-filter__wrapper {
  display: flex;
  align-items: center;
}

.agreements-filter__tabs {
  border-bottom: 1px solid #2b2b2b;
  display: flex;
}

.agreements-filter__tab {
  background: none;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #717579;
  padding: 0 15px 15px;
  transition: 0.5s color;
}

.agreements-filter__tab:hover {
  color: #fff;
}

.agreements-filter__tab.active {
  color: #fff;
  border-bottom: 2px solid #fff;
}

.agreements-filter__add {
  border: none;
  background: #1d5dff;
  border-radius: 10px;
  color: #ffffff;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  padding: 10px 35px 10px 30px;
  margin-right: 53px;
  border: 2px solid #1d5dff;
  transition: 0.5s;
}

.agreements-filter__add:hover {
  background: none;
}

.agreements-filter__type {
  background: none;
  border: none;
}

.agreements-filter__type:first-child {
  margin-right: 30px;
}

.agreements-list__avatar {
  width: 75px;
  height: 75px;
}

.agreements-list {
  padding-left: 0;
  margin-bottom: 40px;
}

.agreements-list__item {
  background: #202020;
  box-shadow: 0px 9px 57px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 20px;
  cursor: pointer;
}

.agreements-list__item:last-child {
  margin-bottom: 0;
}

.agreements-list__block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.agreements-list__number {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: #00b7fd;
  margin-bottom: 7px;
}

.agreements-list__title {
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #ffffff;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 0;
}

.agreements-list__second {
  display: flex;
  align-items: center;
}

.agreements-list__background {
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1d5dff;
  border-radius: 10px;
  margin-right: 10px;
}

.agreements-list__dtitle {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #717579;
  margin-bottom: 4px;
}

.agreements-list__date {
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: #ffffff;
  margin-bottom: 0;
}

.agreements-list__third {
  display: flex;
  align-items: center;
}

.agreements-list__avatar {
  width: 55px;
  height: 55px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
}

.agreements-list__client {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #717579;
  margin-bottom: 4px;
}

.agreements-list__name {
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: #ffffff;
  margin-bottom: 0;
}

.agreements-list__progress {
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #ffffff;
  padding: 14px 19px;
  background: #ff4a55;
  border-radius: 10px;
  text-transform: uppercase;
  min-width: 300px;
  width: 100%;
}

.agreements-list__item .agreements-list {
  margin-bottom: 0;
  margin-top: 45px;
}

.agreements-list__progress.blue {
  background: #1d5dff;
}

.agreements-list__progress.orange {
  background: #ffab2d;
}

.agreements-list__progress.green {
  background: #09bd3c;
}

.agreements-list .flexend .agreements-filter__add {
  margin-right: 0;
}

.agreements-list__options {
  background: #1d5dff;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: baseline;
  border: none;
  color: #fff;
  font-size: 25px;
}

.agreements-list__subitem {
  border: 2px solid #fff;
}

.agreements-list__subitem .agreements-list__options {
  display: none;
}

.agreements-list__first {
  width: 100%;
  max-width: 319px;
  white-space: nowrap;
  margin-right: 15px;
}

.agreements-list__second {
  max-width: 160px;
  width: 100%;
  margin-right: 15px;
}

.agreements-list__third {
  max-width: 300px;
  width: 100%;
  margin-right: 15px;
}

.agreements-list__fourth {
  max-width: max-content;
  width: 100%;
  margin-right: 20px;
}

.agreements-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 50px;
}

.agreements-footer__info {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #717579;
  opacity: 0.4;
  margin-bottom: 0;
}

.agreements-footer__wrapper {
  display: flex;
  align-items: center;
}

.agreements-footer__pagination {
  padding: 0;
  display: flex;
  margin-left: 15px;
  margin-right: 19px;
  margin-bottom: 0;
  background: none;
  border: 1px solid #1d3573;
  border-radius: 10px;
  overflow: hidden;
}

.agreements-footer__link {
  display: block;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: #1d5dff;
  text-decoration: none;
  padding: 15px 25px 10px;
  border-radius: 10px;
  transition: 0.5s;
}

.agreements-footer__item.active .agreements-footer__link {
  color: #ffffff;
  background: #1d3573;
}

.agreements-footer__link:hover {
  color: #fff;
  background-color: #202020;
}

.agreements-footer__btn {
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: #1d5dff;
  background: none;
  border: 1px solid #3b4cb8;
  border-radius: 10px;
  position: relative;
  padding-top: 15px;
  padding-bottom: 10px;
  transition: 0.5s;
}

.agreements-footer__btn:hover {
  background: #3b4cb8;
  color: #fff;
}

.agreements-footer__btn--prev:hover:before {
  background: url(@/assets/pictures/agreements/agreements-arrow-next-hover.svg);
}

.agreements-footer__btn--next:hover:before {
  background: url(@/assets/pictures/agreements/agreements-arrow-next-hover.svg);
}

.agreements-footer__btn--prev {
  padding-right: 25px;
  padding-left: 60px;
}

.agreements-footer__btn--prev:before {
  content: "";
  position: absolute;
  width: 24px;
  height: 25px;
  background: url(@/assets/pictures/agreements/agreements-arrow-next.svg)
    no-repeat center / cover;
  transform: rotate(180deg);
  left: 26px;
  transition: 0.5s;
}

.agreements-footer__btn--next {
  padding-right: 55px;
  padding-left: 20px;
}

.agreements-footer__btn--next:before {
  content: "";
  position: absolute;
  width: 24px;
  height: 25px;
  background: url(@/assets/pictures/agreements/agreements-arrow-next.svg)
    no-repeat center / cover;
  right: 20px;
  transition: 0.5s;
}

@media (max-width: 1583px) {
  .agreements-list__progress {
    font-size: 0;
    width: 15px;
    height: 15px;
    padding: 0;
    border-radius: 100%;
    min-width: unset;
  }

  .agreements-list__item {
    position: relative;
  }

  .agreements-list__fourth {
    max-width: auto;
    width: auto;
    position: absolute;
    margin-right: 0;
    right: 15px;
    top: 15px;
  }
}

@media (max-width: 1363px) {
  .agreements-list__block {
    justify-content: flex-start;
  }

  .agreements-list__third {
    max-width: auto;
    width: auto;
    /* margin: auto; */
  }

  .agreements-list__second {
    max-width: auto;
    width: auto;
  }

  .agreements-list__first {
    max-width: 235px;
  }

  /* .agreements-list__options {
    padding: 0;
    margin-left: auto;
  } */

  .agreements-filter {
    align-items: start;
  }

  .agreements-filter__block {
    margin-bottom: 30px;
  }

  .agreements-filter__wrapper {
    flex-direction: column;
    align-items: end;
  }

  .agreements-filter__add {
    margin-right: 0;
    order: 2;
    transition: 0.3s;
  }

  .agreements-footer__info {
    width: 100%;
    order: 2;
  }

  .agreements-footer__wrapper {
    margin-bottom: 20px;
  }
}

@media (max-width: 1200px) {
  .agreements-footer__info {
    width: auto;
    order: -1;
  }

  .agreements-footer__wrapper {
    margin-bottom: 0;
  }
}

@media (max-width: 1100px) {
  .agreements-list__block {
    justify-content: space-between;
  }

  /* .agreements-list__options {
    margin-left: 0;
  } */

  .agreements-list__third {
    max-width: 300px;
    width: 100%;
    /* margin: 0 auto; */
  }
}


</style>