<template>
  <section id="service-selected-content">
    <b-container fluid class="container-inside">
      <b-row>
        <b-col cols="12" md="6" lg="6">
          <div class="wrap-card">
            <div
              class="wow animate__animated animate__fadeIn"
              style="display: flex; align-items: center"
            >
              <p class="service-title">Collocation</p>
              <p
                id="target-servise"
                class="dot-tag"
                style="margin-left: 20px"
              ></p>
              <p
                id="target-hardware"
                class="dot-tag"
                style="margin-left: 10px"
              ></p>
              <p
                id="target-period"
                class="dot-tag"
                style="margin-left: 10px"
              ></p>
            </div>

            <p class="wow animate__animated animate__fadeIn">
              Размещение сервера отличается от услуги Dedicated, в рамках
              которой вы арендуете сервер. В Colocation же происходит размещение
              оборудования, принадлежащего вам. Такая разновидность
              хостинг‑услуги хорошо подойдёт для сформированных проектов,
              владельцы которых уже определились с подходящей конфигурацией
              оборудования.
            </p>
          </div>

          <div
            class="
              mt-4
              wrap-card
              price-card
              wow
              animate__animated animate__fadeInRight
            "
            style="flex-flow: row; align-items: center"
          >
            <p>
              Цена:<br /><strong
                >{{ `от ${currentService.service_price} руб/мес` }}
              </strong>
            </p>
            <a
              class="
                offer-try
                light-style
                wow
                animate__animated animate__fadeIn
              "
              style="display: none"
              v-b-modal.modal-prevent-closing1
              >Заказать</a
            >
            <a
              v-if="profile.role == 'Admin'"
              class="
                offer-try
                light-style
                wow
                animate__animated animate__fadeIn
              "
              @click="$emit('servicePaid')"
              >Оплачено</a
            >
            <a
              v-if="profile.role == 'Admin'"
              class="
                offer-try
                light-style
                wow
                animate__animated animate__fadeIn
              "
              @click="showModalService = true"
              >Продлить</a
            >
          </div>
        </b-col>

        <b-col
          cols="12"
          md="6"
          lg="6"
          style="display: flex; justify-content: center; align-items: center"
        >
          <img
            src="@/assets/pictures/123.png"
            style="max-height: 400px"
            alt=""
          />
        </b-col>

        <b-col cols="12" class="mt-3">
          <div class="wrap-card">
            <div class="mb-3" style="display: flex; align-items: center">
              <p class="service-title wow animate__animated animate__fadeIn">
                Информация о приобретенной услуге
              </p>
              <p
                id="target-servise"
                class="dot-tag"
                style="margin-left: 20px"
              ></p>
              <p
                id="target-hardware"
                class="dot-tag"
                style="margin-left: 10px"
              ></p>
              <p
                id="target-period"
                class="dot-tag"
                style="margin-left: 10px"
              ></p>
            </div>

            <b-progress
              style="font-size: 20px; font-weight: 600; border-radius: 10px"
              show-progress
              animated
              :max="service.days"
              height="2rem"
              class="wow animate__animated animate__flipInX"
            >
              <b-progress-bar :value="value">
                <span
                  >Осталось:
                  <strong>{{ value }} из {{ service.days }} дней</strong></span
                >
              </b-progress-bar>
            </b-progress>

            <p
              class="mt-4 wow animate__animated animate__flipInX"
              style="font-size: 18px"
            >
              В приобретенный пакет услуг по размещению серверов входит:
            </p>

            <b-row class="mt-3 mb-4" style="align-items: center">
              <b-col cols="12" md="4" class="h-100">
                <div
                  class="
                    servise-cons-wrap
                    wow
                    animate__animated animate__fadeIn
                  "
                  style="display: flex"
                >
                  <img
                    src="@/assets/pictures/service/computer-screen.svg"
                    alt=""
                  />
                  <p style="margin-bottom: 0px; margin-left: 10px">
                    Приоритетное реагирование на проблемы (до 10 минут)
                  </p>
                </div>
              </b-col>
              <b-col cols="12" md="4" class="h-100">
                <div
                  class="
                    servise-cons-wrap
                    wow
                    animate__animated animate__fadeIn
                  "
                  style="display: flex"
                >
                  <img src="@/assets/pictures/service/database.svg" alt="" />
                  <p style="margin-bottom: 0px; margin-left: 10px">
                    Настройка и оптимизация работы баз данных
                  </p>
                </div>
              </b-col>
              <b-col cols="12" md="4" class="h-100">
                <div
                  class="
                    servise-cons-wrap
                    wow
                    animate__animated animate__fadeIn
                  "
                  style="display: flex"
                >
                  <img src="@/assets/pictures/service/shield.svg" alt="" />
                  <p style="margin-bottom: 0px; margin-left: 10px">
                    Защита от DDoS-атак, настройка Firewall
                  </p>
                </div>
              </b-col>
            </b-row>

            <b-row style="align-items: center">
              <b-col cols="12" md="4" class="h-100">
                <div
                  class="
                    servise-cons-wrap
                    wow
                    animate__animated animate__fadeIn
                  "
                  style="display: flex"
                >
                  <img src="@/assets/pictures/service/web-browser.svg" alt="" />
                  <p style="margin-bottom: 0px; margin-left: 10px">
                    Аудит и оптимизация инфрастуктуры сервера
                  </p>
                </div>
              </b-col>
              <b-col cols="12" md="4" class="h-100">
                <div
                  class="
                    servise-cons-wrap
                    wow
                    animate__animated animate__fadeIn
                  "
                  style="display: flex"
                >
                  <img src="@/assets/pictures/service/web-domain.svg" alt="" />
                  <p style="margin-bottom: 0px; margin-left: 10px">
                    Ежеминутный мониторинг сервера и сайтов 24/7
                  </p>
                </div>
              </b-col>
              <b-col cols="12" md="4" class="h-100">
                <div
                  class="
                    servise-cons-wrap
                    wow
                    animate__animated animate__fadeIn
                  "
                  style="display: flex"
                >
                  <img
                    src="@/assets/pictures/service/file-transfer.svg"
                    alt=""
                  />
                  <p style="margin-bottom: 0px; margin-left: 10px">
                    Организация и контроль резервного копирования
                  </p>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>

 <b-col cols="12" class="mt-4">
        <h2 class="agreements-title mt-5">Договоры</h2>

        <AgreementsContent
          v-if="agreements.length"
          :agreements="agreements"
          :services="services"
          @agreementChange="changeService"
        />
 </b-col>
        <b-col cols="12" class="mt-4">
          <div class="wrap-card">
            <div class="mb-3" style="display: flex; align-items: center">
              <p class="service-title wow animate__animated animate__fadeIn">
                Технологические партнёры
              </p>
              <p
                id="target-servise"
                class="dot-tag"
                style="margin-left: 20px"
              ></p>
              <p
                id="target-hardware"
                class="dot-tag"
                style="margin-left: 10px"
              ></p>
              <p
                id="target-period"
                class="dot-tag"
                style="margin-left: 10px"
              ></p>
            </div>
            <div
              class="parthners-images"
              style="display: flex; flex-wrap: wrap; align-items: center"
            >
              <img
                class="wow animate__animated animate__flipInX animate__delay-1s"
                src="@/assets/pictures/logo-apc.svg"
                alt=""
              />
              <img
                class="wow animate__animated animate__flipInX animate__delay-1s"
                src="@/assets/pictures/logo-cisco.svg"
                alt=""
              />
              <img
                class="wow animate__animated animate__flipInX animate__delay-1s"
                src="@/assets/pictures/logo-dell.svg"
                alt=""
              />
              <img
                class="wow animate__animated animate__flipInX animate__delay-1s"
                src="@/assets/pictures/logo-intel.svg"
                alt=""
              />
              <img
                class="wow animate__animated animate__flipInX animate__delay-1s"
                src="@/assets/pictures/logo-ispsystem.svg"
                alt=""
              />
              <img
                class="wow animate__animated animate__flipInX animate__delay-1s"
                src="@/assets/pictures/logo-juniper.svg"
                alt=""
              />
              <img
                class="wow animate__animated animate__flipInX animate__delay-1s"
                src="@/assets/pictures/logo-microsoft.svg"
                alt=""
              />
              <img
                class="wow animate__animated animate__flipInX animate__delay-1s"
                src="@/assets/pictures/logo-openstack.svg"
                alt=""
              />
              <img
                class="wow animate__animated animate__flipInX animate__delay-1s"
                src="@/assets/pictures/logo-seagate.svg"
                alt=""
              />
              <img
                class="wow animate__animated animate__flipInX animate__delay-1s"
                src="@/assets/pictures/logo-vmware.svg"
                alt=""
              />
            </div>
          </div>
        </b-col>

        <b-col cols="12" class="mt-3">
          <div class="offer-wrap">
            <div class="offer-text-wrap wow animate__animated animate__fadeIn">
              <p class="offer-title">Возникли проблемы, или вопросы?</p>
              <p class="offer-text">
                Закажите звонок, и мы перезвоним вам в
                <strong>течении 10 минут</strong>!
              </p>
            </div>
            <a
              class="offer-try wow animate__animated animate__fadeIn"
              v-b-modal.modal-prevent-closing1
              >Заказать звонок</a
            >
          </div>
        </b-col>
      </b-row>
    </b-container>

    <SupportCallModal
      :showCallModal="showCallModal"
      @showCallModal="showCallModal = false"
    />

    <!-- <b-modal
      id="modal-prevent-closing1"
      ref="modal"
      scrollable
      centered
      dialog-class="modal-dialog-feedback-custom"
      content-class="modal-content-feedback-custom"
      header-class="modal-header-feedback-custom"
      footer-class="modal-footer-feedback-custom"
      hide-header
      hide-footer
    >
      <b-row style="margin: 0">
        <b-col cols="12" md="5">
          <h2 style="margin-top: 55px; margin-bottom: 20px">Закажите звонок</h2>
          <img
            src="@/assets/pictures/logo_on_black.png"
            class="img-fluid"
            alt=""
            style="padding: 0px 20px"
          />
          <p style="margin-top: 30px; font-size: 16px">
            Оператор свяжется с вами<br />в течении <strong>10 минут!</strong>
          </p>
        </b-col>
        <b-col
          cols="12"
          md="7"
          style="
            align-items: center;
            display: flex;
            flex-flow: column;
            border-left: 5px solid rgba(30, 30, 30, 0.2);
            background: #212330;
          "
        >
          <form
            style="width: 75%; padding-top: 40px; padding-bottom: 30px"
            ref="form"
            @submit.stop.prevent="handleSubmit"
          >
            <div
              id="group-for-name"
              label-for="name-input_feedback"
              invalid-feedback="Напишите, как к вам обращаться"
              :state="nameState_feedback"
              class="webflow-style-input form-group"
            >
              <input
                placeholder="Ваше имя"
                class="bank-info-input"
                id="name-input_feedback"
                v-model="name_feedback"
                :state="nameState_feedback"
                required
              />
            </div>

            <div
              id="group-for-phone"
              label-for="phone-input_feedback"
              invalid-feedback="Введите номер телефона"
              :state="phoneState_feedback"
              class="webflow-style-input form-group mt-4"
            >
              <input
                placeholder="Ваш номер телефона"
                class="bank-info-input"
                id="phone-input_feedback"
                v-model="phone_feedback"
                :state="phoneState_feedback"
                required
              />
            </div>
          </form>
          <b-button
            @click="ok()"
            class="offer-try modal-try"
            style="margin-bottom: 40px"
            >Отправить</b-button
          >
        </b-col>
      </b-row>
    </b-modal> -->

    <b-modal
      v-model="showModalService"
      id="modal-extend-service"
      ref="modal"
      scrollable
      centered
      dialog-class="modal-dialog-feedback-custom"
      content-class="modal-content-feedback-custom"
      header-class="modal-header-feedback-custom"
      footer-class="modal-footer-feedback-custom"
      hide-header
      hide-footer
    >
      <b-row style="margin: 0">
        <b-col cols="12" md="5">
          <h2 style="margin-top: 35px; margin-bottom: 20px">
            Продление услуги
          </h2>
          <img
            src="@/assets/pictures/logo_on_black.png"
            class="img-fluid"
            alt=""
            style="padding: 0px 20px"
          />
        </b-col>
        <b-col
          class="service-data-modal"
          cols="12"
          md="7"
          style="
            align-items: center;
            display: flex;
            flex-flow: column;
            border-left: 5px solid rgba(30, 30, 30, 0.2);
            background: #212330;
          "
        >
          <form
            v-if="
              this.profile.role == 'Admin' || this.profile.role == 'Partner'
            "
            style="width: 75%; padding-top: 40px; padding-bottom: 30px"
            ref="form"
          >
            <div
              id="group-for-name"
              label-for="name-input_feedback"
              class="webflow-style-input form-group"
            >
              <input
                placeholder="Называние сервиса"
                class="bank-info-input"
                id="name-input_feedback"
                v-model="serviceName"
                required
              />
            </div>

            <div
              id="group-for-phone"
              label-for="phone-input_feedback"
              invalid-feedback="Введите новую дату окончания сервиса"
              class="webflow-style-input form-group mt-4"
            >
              <input
                placeholder="Новая дата окончание сервиса"
                type="date"
                class="bank-info-input"
                id="phone-input_feedback"
                v-model="serviceDate"
                required
              />
            </div>
          </form>

          <b-button
            v-if="
              this.profile.role == 'Admin' || this.profile.role == 'Partner'
            "
            @click="updateService"
            class="offer-try modal-try modal-send-first"
            style="margin-bottom: 40px: color: #fff;"
            >Отправить</b-button
          >

          <div v-else class="client-notification">
            <div class="notification">
              <p>Вы действительно хотите продлить услугу?</p>
            </div>

            <div class="client-notification-buttons">
              <b-button
                @click="createNotification(true)"
                class="offer-try modal-try notification-button"
                style="margin-bottom: 40px"
                >Да</b-button
              >

              <b-button
                @click="createNotification(false)"
                class="offer-try modal-try"
                style="margin-bottom: 40px"
                >Нет</b-button
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal
      v-model="showControlModal"
      id="modal-extend-service"
      ref="modal"
      scrollable
      centered
      dialog-class="modal-dialog-feedback-custom"
      content-class="modal-content-feedback-custom"
      header-class="modal-header-feedback-custom"
      footer-class="modal-footer-feedback-custom"
      hide-header
      hide-footer
    >
      <b-row style="margin: 0">
        <b-col cols="12" md="5">
          <h2 style="margin-top: 35px; margin-bottom: 20px">
            Неправильная дата
          </h2>
          <img
            src="@/assets/pictures/logo_on_black.png"
            class="img-fluid"
            alt=""
            style="padding: 0px 20px"
          />
        </b-col>
        <b-col
          cols="12"
          md="7"
          style="
            align-items: center;
            display: flex;
            flex-flow: column;
            border-left: 5px solid rgba(30, 30, 30, 0.2);
            background: #212330;
          "
        >
          <div class="client-notification">
            <div class="notification">
              <p>Нельзя выбирать дату меньше чем дата окончания сервиса!</p>
            </div>

            <div class="client-notification-buttons">
              <b-button
                @click="showControlModal = false"
                class="offer-try modal-try notification-button"
                style="margin-bottom: 40px"
                >OK</b-button
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </b-modal>
  </section>
</template>

<script>
import moment from "moment";
import { ClientMapper } from "@/store/client";
import { AdminMapper } from "@/store/admin";
import { UserMapper } from "@/store/user";
import { NotificationMapper } from "@/store/notification";
import SupportCallModal from "../SupportCallModal.vue";
import AgreementsContent from "@/components/AgreementsContent.vue";

export default {
  name: "CallocationServiceContent",

  components: {
    SupportCallModal,
    AgreementsContent,
  },

  props: {
    service: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      value: 0,
      max: 90,
      nameState_feedback: "",
      name_feedback: "",
      phoneState_feedback: "",
      phone_feedback: "",
      serviceName: "",
      serviceDate: "",
      showModalService: false,
      showControlModal: false,
      showCallModal: false,
      agreements: [],
      currentService: {},

      clientservices: [],
      // service: {},

      service_name: [
        "collocation",
        "development",
        "administration",
        "modification",
        "escort_1C",
        "cloud",
      ],

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
    ...AdminMapper.mapState(["client", "account", "services"]),
    ...UserMapper.mapState(["error", "profile"]),
    ...ClientMapper.mapState(["clientProfile"]),
  },

  methods: {
    ...ClientMapper.mapActions(["getClientServices", "getClientProfile"]),
    ...AdminMapper.mapActions([
      "getUserDetails",
      "getClientDetails",
      "getServices",
      "patchService",
      "getServiceAgreements",
    ]),
    ...NotificationMapper.mapActions(["postNotification", "getNotification"]),

    async updateService() {
      let id = this.service.id;
      let a = moment(this.serviceDate);
      let b = moment();
      let c = moment(this.service.end_data);

      console.log("a", a);
      console.log("b", b);

      let days = a.diff(b, "days") + 1;
      let control = a.diff(c, "days");

      if (days > 0 && control > 0) {
        let data = {
          end_data: this.serviceDate,
          days: days,
        };

        await this.patchService({ id, data });
        this.createNotification(true, this.service.client, "admin", days);
        this.$emit("updateServiceDate");
      } else {
        this.showControlModal = true;
      }

      this.showModalService = false;
    },

    async createNotification(
      approval,
      user = "admin",
      role = "client",
      days = null
    ) {
      // if (this.profile.role == "PartnerClient") {
      //   user = this.clientProfile.partner;
      // }

      if (!approval) {
        this.showModalService = false;
      } else {
        let title;
        let text;
        if (role == "admin") {
          title = "Сервис продлен";
          text = `Ваш сервис ${
            this.serviceList[this.service.service_type]
          } продлен до ${days} дней.`;
        } else {
          title = "Запрос на продление сервиса";
          text = `Клиент ${this.profile.surname} ${this.profile.name}, ${
            this.profile.patronim
          } попросил продлить услугу ${
            this.serviceList[this.service.service_type]
          }.`;
        }

        let data = {
          user: user,
          from: this.profile.id,
          type: "service",
          title: title,
          text: text,
          link: `service/${this.service.id}`,
        };

        await this.postNotification(data);
        this.showModalService = false;
      }
    },

    async getAgreements() {
      let agreements = await this.getServiceAgreements(
        this.$route.params.service
      );

      if (agreements) {
        this.agreements = agreements;
      }

      console.log("newAgreements", this.agreements);
    },

    changeService() {
      this.$emit("agreementChange");
    },

    serviceValue() {
      let a = moment(this.service.end_data);
      let b = moment();

      console.log("a", a);
      console.log("b", b);

      this.value = a.diff(b, "days") + 1;
    },
  },

  watch: {
    service: {
      handler(val, oldVal) {
        this.getAgreements();
        this.currentService = this.service;
        this.serviceValue();
      },
    },
  },

  async mounted() {
    // let service_type = this.service_name.findIndex(
    //   (el) => el == this.$route.params.service_name
    // );

    // console.log("type", service_type);
    // console.log("services", this.services);

    // if (this.profile.role == "Admin") {
    //   this.service = this.services.filter(
    //     (service) => service.service_type == service_type
    //   )[0];
    // } else {
    //   let services = await this.getClientServices();

    //   if (services) {
    //     this.clientservices = services;
    //   }

    //   this.service = this.clientservices.filter(
    //     (service) => service.service_type == service_type
    //   )[0];
    // }

    console.log("profile", this.profile);

    this.serviceValue();

    this.serviceName = this.serviceList[this.service.service_type];

    console.log("1");
    if (
      this.profile.role == "AdminClient" ||
      this.profile.role == "PartnerClient"
    ) {
      await this.getClientProfile();
    }

    console.log("2");

    console.log("value", this.value);
    console.log("service", this.service);

    let agreements = await this.getServiceAgreements(
      this.$route.params.service
    );

    if (agreements) {
      this.agreements = agreements;
    }

    this.currentService = this.service;
  },
};
</script>

<style scoped>
.notification-button {
  margin-right: 20px;
}

.client-notification {
  padding: 20px 0 20px 0;
}

.client-notification-buttons {
  display: flex;
  justify-content: center;
}

#service-selected-content {
  height: calc(100vh - 120px);
  padding-top: 20px;
  padding-bottom: 50px;
  overflow-y: auto;
  font-family: Comfortaa;
}
.container-inside {
  padding: 0 !important;
  overflow: hidden;
}
.container-inside > .row > .col-md-6 {
  margin: 15px 0;
}

.wrap-card {
  border-radius: 20px;
  background: #202020;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  transition: 0.5s ease;
}

.service-title {
  font-size: 32px;
  font-weight: 500;
}



.service-tag,
.hardware-tag,
.period-tag {
  padding: 20px 30px;
}
.service-tag > p,
.hardware-tag > p,
.period-tag > p {
  margin: 0;
}
.service-tag {
  background: rgba(234, 201, 71, 0.15);
  color: #eac947;
}
.hardware-tag {
  color: #2251f8;
  background: rgba(34, 81, 248, 0.15);
}
.period-tag {
  background: rgba(255, 74, 85, 0.15);
  color: #ff4a55;
}
.dot-tag {
  padding: 10px;
  width: fit-content;
  border-radius: 10px;
}
#target-servise {
  background: rgba(234, 201, 71, 0.5);
  transition: 0.3s ease-in-out;
}
#target-hardware {
  background: rgba(34, 81, 248, 0.5);
  transition: 0.3s ease-in-out;
}
#target-period {
  background: rgba(255, 74, 85, 0.5);
  transition: 0.3s ease-in-out;
}
#target-servise:hover {
  background: rgba(234, 201, 71, 1);
}
#target-hardware:hover {
  background: rgba(34, 81, 248, 1);
}
#target-period:hover {
  background: rgba(255, 74, 85, 1);
}
.offer-try {
  min-width: fit-content;
  padding: 10px 25px;
  background-color: #fff;
  color: #000000;
  text-decoration: none !important;
  transition: 0.5s cubic-bezier(0.7, -1.51, 0.36, 2.19);
  font-weight: 600;
  font-size: 18px;
  border-radius: 10px;
  margin-bottom: 40px;

}
.price-card {
  padding: 20px 30px;
}
.price-card > p {
  font-size: 24px;
  margin: 0;
}
.offer-try:hover {
  transform: scale(1.1);
}
.parthners-images > img {
  width: 20%;
  height: 90px;
  object-fit: contain;
  padding: 15px 15px;
  filter: drop-shadow(0px 0px 1px #ffffff);
  transition: 0.3s ease-in-out;
}

.parthners-images > img:hover {
  transform: rotate(3deg) scale(1.1);
}

.servise-cons-wrap {
  transition: 0.5s cubic-bezier(0.63, -0.72, 0.28, 1.73);
}
.servise-cons-wrap:hover {
  transform: scale(1.03) rotate(-3deg);
}

.offer-wrap {
  margin-top: 15px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(212.43deg, #1d3573 19.43%, #3f8392 87.63%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  padding: 30px 40px;
  /* margin-top: 15px; */
}
.offer-text-wrap {
  display: flex;
  flex-flow: column;
}
.offer-title {
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
}

.offer-try:hover {
  transform: scale(1.1);
}
</style>

<style >
.form-group {
  margin: 15px 0;
}
.bank-info-input {
  margin: 10px 0;
}

.modal-header-feedback-custom,
.modal-header-bank-custom {
  color: #fff;
  padding-top: 15px;
  padding-bottom: 0px;
  margin-bottom: -10px;
  border-bottom: none;
}
.modal-footer-feedback-custom,
.modal-footer-bank-custom {
  justify-content: center;
  padding-top: 0px;
  padding-bottom: 20px;
  color: #fff;
  border-top: none;
}
.modal-header-feedback-custom {
  background: transparent;
}
.modal-footer-feedback-custom {
  background: transparent;
}

.modal-header-bank-custom {
  background: transparent;
}
.modal-footer-bank-custom {
  background: transparent;
}

.modal-content-bank-custom {
  border-radius: 20px;
  background: transparent;
  color: #ffffff;
  text-align: center;
  background-color: #2d2e33;
  box-shadow: 6px 6px 6px #1b1a1f, -6px -6px 6px #24232661;
}
.modal-content-bank-custom > .modal-body {
  padding-right: 20px;
  padding-left: 20px;
  overflow: hidden;
  background-image: radial-gradient(
    circle at 0% 0%,
    #373b52,
    #252736 51%,
    #1d1e26
  );
}
.modal-content-feedback-custom {
  border-radius: 20px;
  background: transparent;
  color: #ffffff;
  text-align: center;
  box-shadow: 6px 6px 6px #1b1a1f, -6px -6px 6px #24232661;
}
.modal-content-feedback-custom > .modal-body {
  padding: 0;
  overflow: hidden;
  background-image: radial-gradient(
    circle at 0% 0%,
    #373b52,
    #252736 51%,
    #1d1e26
  );
}


#group-for-phone > label {
  margin-top: 30px;
  font-weight: 600;
  font-size: 18px;
}
#group-for-name > label {
  font-weight: 600;
  font-size: 18px;
}
.feedback-header-custom {
  margin: 5px auto;
  font-size: 20px;
  font-weight: 600;
}
.close-modal-custom {
  font-size: 20px;
  font-weight: 600;
  padding-right: 14px;
  padding-left: 14px;
  padding-top: 3px;
  border-radius: 100px;
  display: none;
}
.custom-form-bank {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.custom-form-bank > .form-group {
  margin: 15px 0;
  width: 48%;
}
.profile-info > label {
  font-weight: 300;
}
.modal-backdrop {
  opacity: 1;
  /* background-color: unset;
  background-image: radial-gradient(
    circle at 0% 0%,
    #373b52,
    #252736 51%,
    #1d1e26
  ); */


  background-color: rgba(0,0,0, 0.4);

}

@supports (backdrop-filter: blur(5px)) {
   .modal-backdrop {
     backdrop-filter: blur(5px);
     background: url('@/assets/pictures/blur-modal-bg.png') no-repeat center / cover !important;
   }
}

@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}

.webflow-style-input {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 2px;
  padding: 0 20px;
  background: rgba(57, 63, 84, 0.8);
}
.webflow-style-input:after {
  content: "";
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 999;
  height: 2px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  background-position: 0% 0%;
  background: linear-gradient(
    to right,
    #b294ff,
    #57e6e6,
    #feffb8,
    #57e6e6,
    #b294ff,
    #57e6e6
  );
  background-size: 500% auto;
  animation: gradient 3s linear infinite;
}

.webflow-style-input input {
  flex-grow: 1;
  color: #bfd2ff;
  vertical-align: middle;
  border-style: none;
  background: transparent;
  outline: none;
}
.webflow-style-input input::-webkit-input-placeholder {
  color: #7881a1;
}
.modal-dialog-feedback-custom {
  max-width: 900px;
}
.col-md-8 > form {
  padding: 30px 40px;
  width: 75%;
}

.modal-send-first {
  color: #000 !important;
}

.modal-send-second {
  color: #fff !important;
}
</style>