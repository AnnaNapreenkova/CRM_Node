<template>
  <section id="servises-content">
    <button
      class="services-filter__add"
      type="button"
      v-if="
        profile.role == 'Admin' ||
        (partnerProfile &&
          (partnerProfile.functionality == 'client' ||
            partnerProfile.functionality == 'all'))
      "
      @click="show = true"
    >
      + Новая услуга
    </button>
    <b-container fluid class="container-inside">
      <b-row>
        <b-col cols="12" md="6" lg="4" xl="4">
          <!-- <router-link
            class="profile-link"
            :to="`/service/${
              services
                ? services.filter((item) => item.service_type == '0').length
                  ? services.filter((item) => item.service_type == '0')[0].id
                  : service_name[0]
                : null
            }`"
          > -->
          <div
            :class="[
              services
                ? services.filter((item) => item.service_type == '0').length
                  ? ''
                  : 'blocked-servise'
                : null,
            ]"
            class="wrap-servise" style="position: relative;"
          >
                <div
                  id="tooltip-target-info1"
                  class="notification-counter-docs"
                  
                ><p>{{
                    `${
                    processServices.filter(
                      (service) => service.service_type == "0"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "0")
                      .length
                  }`
                }}</p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-info1"
                  triggers="hover"
                
                >
                 <span>Всего оформлено <strong>действующих</strong> документов на данную услугу {{
                  `${
                    processServices.filter(
                      (service) => service.service_type == "0"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "0")
                      .length
                  }`
                }}</span>
                </b-tooltip>
                </div>
            <div class="servise-title wow animate__animated animate__fadeIn">
              <img
                src="../assets/icons/placeholder.png"
                alt=""
                style="margin: auto 15px auto 0"
              />
              <div class="project-title-text-wrap" >
               
         

                <p class="project-title-text">Collocation</p>
                
                <p class="project-title-after-text">
                  Сохранность вашего оборудования
                </p>
              </div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
              "
            >
              <div style="display: flex">
                <p
                  id="tooltip-target-servise"
                  class="servise-tag serv-tag mt-3"
                ></p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-servise"
                  triggers="hover"
                >
                  Услуга, предоставляемая нашей компанией для
                  <strong>обслуживания!</strong>
                </b-tooltip>
                <p
                  id="tooltip-target-hardware"
                  class="servise-tag hardware-tag mt-3"
                  style="margin-left: 10px"
                ></p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-hardware"
                  triggers="hover"
                >
                  Эта услуга связана с <strong>оборудованием</strong>
                </b-tooltip>
                <p
                  id="tooltip-target-period"
                  class="servise-tag period-tag mt-3"
                  style="margin-left: 10px"
                ></p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-period"
                  triggers="hover"
                >
                  Это <strong>периодическая</strong> услуга
                </b-tooltip>
              </div>

              <!-- <p v-if="services && services.filter((item) => item.service_type == '0')[0]" class="project-title-after-text">{{ `До ${thismoment(services.filter((item) => item.service_type == '0')[0].end_data).format("DD-MM-YYYY")}`}}</p>
                <p v-else class="project-title-after-text">Срок сервиса не определен</p> -->
            </div>
          </div>
          <!-- </router-link
          > -->
        </b-col>

        <b-col cols="12" md="6" lg="4" xl="4">
          <!-- <router-link
            class="profile-link"
            :to="`/service/${
              services
                ? services.filter((item) => item.service_type == '1').length
                  ? services.filter((item) => item.service_type == '1')[0].id
                  : service_name[1]
                : null
            }`"
          > -->
          <div
            :class="[
              services
                ? services.filter((item) => item.service_type == '1').length
                  ? ''
                  : 'blocked-servise'
                : null,
            ]"
         class="wrap-servise" style="position: relative;"
          >
                <div
                  id="tooltip-target-info2"
                  class="notification-counter-docs"
                  
                ><p>{{
                    `${
                    processServices.filter(
                      (service) => service.service_type == "1"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "1")
                      .length
                  }`
                }}</p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-info2"
                  triggers="hover"
                
                >
                 <span>Всего оформлено <strong>действующих</strong> документов на данную услугу {{
                  `${
                    processServices.filter(
                      (service) => service.service_type == "1"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "1")
                      .length
                  }`
                }}</span>
                </b-tooltip>
                </div>
            <div class="servise-title wow animate__animated animate__fadeIn">
              <img
                src="../assets/icons/placeholder.png"
                alt=""
                style="margin: auto 15px auto 0"
              />
              <div class="project-title-text-wrap">
                <p class="project-title-text">Разработка сайта</p>
                <!-- <span>{{
                  `${
                    processServices.filter(
                      (service) => service.service_type == "1"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "1")
                      .length
                  }`
                }}</span> -->
                <p class="project-title-after-text">
                  Качественно, быстро и стильно!
                </p>
              </div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
              "
            >
              <div style="display: flex">
                <p
                  id="tooltip-target-develop"
                  class="servise-tag develop-tag mt-3"
                ></p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-develop"
                  triggers="hover"
                >
                  Услуга <strong>разработки</strong> от нашей компании!
                </b-tooltip>
              </div>

              <!-- <p v-if="services && services.filter((item) => item.service_type == '1')[0] && services.filter((item) => item.service_type == '1')[0].end_data" class="project-title-after-text">{{ `До ${thismoment(services.filter((item) => item.service_type == '1')[0].end_data).format("DD-MM-YYYY")}`}}</p>
                <p v-else class="project-title-after-text">Срок сервиса не определен</p> -->
            </div>
          </div>
          <!-- </router-link
          > -->
        </b-col>

        <b-col cols="12" md="6" lg="4" xl="4">
          <!-- <router-link
            class="profile-link"
            :to="`/service/${
              services
                ? services.filter((item) => item.service_type == '2').length
                  ? services.filter((item) => item.service_type == '2')[0].id
                  : service_name[2]
                : null
            }`"
          > -->
          <div
            :class="[
              services
                ? services.filter((item) => item.service_type == '2').length
                  ? ''
                  : 'blocked-servise'
                : null,
            ]"
            class="wrap-servise" style="position: relative;"
          >
                <div
                  id="tooltip-target-info3"
                  class="notification-counter-docs"
                  
                ><p>{{
                   `${
                    processServices.filter(
                      (service) => service.service_type == "2"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "2")
                      .length
                  }`
                }}</p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-info3"
                  triggers="hover"
                
                >
                 <span>Всего оформлено <strong>действующих</strong> документов на данную услугу {{
                  `${
                    processServices.filter(
                      (service) => service.service_type == "2"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "2")
                      .length
                  }`
                }}</span>
                </b-tooltip>
                </div>
            <div class="servise-title wow animate__animated animate__fadeIn">
              <img
                src="../assets/icons/placeholder.png"
                alt=""
                style="margin: auto 15px auto 0"
              />
              <div class="project-title-text-wrap">
                <p class="project-title-text">Администрирование серверов</p>
                <!-- <span>{{
                  `${
                    processServices.filter(
                      (service) => service.service_type == "2"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "2")
                      .length
                  }`
                }}</span> -->
                <p class="project-title-after-text">
                  Качественное обслуживание
                </p>
              </div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
              "
            >
              <div style="display: flex">
                <p
                  id="tooltip-target-servise1"
                  class="servise-tag serv-tag mt-3"
                ></p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-servise1"
                  triggers="hover"
                >
                  Услуга, предоставляемая нашей компанией для
                  <strong>обслуживания!</strong>
                </b-tooltip>
                <p
                  id="tooltip-target-hardware1"
                  class="servise-tag hardware-tag mt-3"
                  style="margin-left: 10px"
                ></p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-hardware1"
                  triggers="hover"
                >
                  Эта услуга связана с <strong>оборудованием</strong>
                </b-tooltip>
                <p
                  id="tooltip-target-period1"
                  class="servise-tag period-tag mt-3"
                  style="margin-left: 10px"
                ></p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-period1"
                  triggers="hover"
                >
                  Это <strong>периодическая</strong> услуга
                </b-tooltip>
              </div>

              <!-- <p v-if="services && services.filter((item) => item.service_type == '2')[0]" class="project-title-after-text">{{ `До ${thismoment(services.filter((item) => item.service_type == '2')[0].end_data).format("DD-MM-YYYY")}`}}</p>
                <p v-else class="project-title-after-text">Срок сервиса не определен</p> -->
            </div>
          </div>
          <!-- </router-link> -->
        </b-col>

        <b-col cols="12" md="6" lg="4" xl="4">
          <!-- <router-link
            class="profile-link"
            :to="`/service/${
              services
                ? services.filter((item) => item.service_type == '3').length
                  ? services.filter((item) => item.service_type == '3')[0].id
                  : service_name[3]
                : null
            }`"
          > -->
          <div
            :class="[
              services
                ? services.filter((item) => item.service_type == '3').length
                  ? ''
                  : 'blocked-servise'
                : null,
            ]"
            class="wrap-servise" style="position: relative;"
          >
                <div
                  id="tooltip-target-info3"
                  class="notification-counter-docs"
                  
                ><p>{{
                    `${
                    processServices.filter(
                      (service) => service.service_type == "3"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "3")
                      .length
                  }`
                }}</p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-info3"
                  triggers="hover"
                
                >
                 <span>Всего оформлено <strong>действующих</strong> документов на данную услугу {{
                  `${
                    processServices.filter(
                      (service) => service.service_type == "3"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "3")
                      .length
                  }`
                }}</span>
                </b-tooltip>
                </div>
            <div class="servise-title wow animate__animated animate__fadeIn">
              <img
                src="../assets/icons/placeholder.png"
                alt=""
                style="margin: auto 15px auto 0"
              />
              <div class="project-title-text-wrap">
                <p class="project-title-text">Доработка 1С</p>
                <!-- <span>{{
                  `${
                    processServices.filter(
                      (service) => service.service_type == "3"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "3")
                      .length
                  }`
                }}</span> -->
                <p class="project-title-after-text">
                  Развитие системы под ваши нужды
                </p>
              </div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
              "
            >
              <div style="display: flex">
                <p
                  id="tooltip-target-develop1"
                  class="servise-tag develop-tag mt-3"
                ></p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-develop1"
                  triggers="hover"
                >
                  Услуга, предоставляемая нашей компанией для
                  <strong>обслуживания!</strong>
                </b-tooltip>
                <p
                  id="tooltip-target-hardware2"
                  class="servise-tag hardware-tag mt-3"
                  style="margin-left: 10px"
                ></p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-hardware2"
                  triggers="hover"
                >
                  Эта услуга связана с <strong>оборудованием</strong>
                </b-tooltip>
              </div>

              <!-- <p v-if="services && services.filter((item) => item.service_type == '3')[0] && services.filter((item) => item.service_type == '3')[0].end_data != null" class="project-title-after-text">{{ `До ${thismoment(services.filter((item) => item.service_type == '3')[0].end_data).format("DD-MM-YYYY")}`}}</p>
                <p v-else class="project-title-after-text">Срок сервиса не определен</p> -->
            </div>
          </div>
          <!-- </router-link> -->
        </b-col>

        <b-col cols="12" md="6" lg="4" xl="4">
          <!-- <router-link
            class="profile-link"
            :to="`/service/${
              services
                ? services.filter((item) => item.service_type == '4').length
                  ? services.filter((item) => item.service_type == '4')[0].id
                  : service_name[4]
                : null
            }`"
          > -->
          <div
            :class="[
              services
                ? services.filter((item) => item.service_type == '4').length
                  ? ''
                  : 'blocked-servise'
                : null,
            ]"
           class="wrap-servise" style="position: relative;"
          >
                <div
                  id="tooltip-target-info4"
                  class="notification-counter-docs"
                  
                ><p>{{
                    `${
                    processServices.filter(
                      (service) => service.service_type == "4"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "4")
                      .length
                  }`
                }}</p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-info4"
                  triggers="hover"
                
                >
                 <span>Всего оформлено <strong>действующих</strong> документов на данную услугу {{
                  `${
                    processServices.filter(
                      (service) => service.service_type == "4"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "4")
                      .length
                  }`
                }}</span>
                </b-tooltip>
                </div>
            <div class="servise-title wow animate__animated animate__fadeIn">
              <img
                src="../assets/icons/placeholder.png"
                alt=""
                style="margin: auto 15px auto 0"
              />
              <div class="project-title-text-wrap">
                <p class="project-title-text">Сопровождение 1С</p>
                <!-- <span>{{
                  `${
                    processServices.filter(
                      (service) => service.service_type == "4"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "4")
                      .length
                  }`
                }}</span> -->
                <p class="project-title-after-text">
                  Мы подберем для вас <strong>индивидуальный тариф</strong> по
                  Вашим требованиям
                </p>
              </div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
              "
            >
              <div style="display: flex">
                <p
                  id="tooltip-target-servise2"
                  class="servise-tag serv-tag mt-3"
                ></p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-servise2"
                  triggers="hover"
                >
                  Услуга, предоставляемая нашей компанией для
                  <strong>обслуживания!</strong>
                </b-tooltip>

                <p
                  id="tooltip-target-period3"
                  class="servise-tag period-tag mt-3"
                  style="margin-left: 10px"
                ></p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-period3"
                  triggers="hover"
                >
                  Это <strong>периодическая</strong> услуга
                </b-tooltip>
              </div>

              <!-- <p v-if="services && services.filter((item) => item.service_type == '4')[0]" class="project-title-after-text">{{ `До ${thismoment(services.filter((item) => item.service_type == '4')[0].end_data).format("DD-MM-YYYY")}`}}</p>
                <p v-else class="project-title-after-text">Срок сервиса не определен</p> -->
            </div>
          </div>
          <!-- </router-link> -->
        </b-col>

        <b-col cols="12" md="6" lg="4" xl="4">
          <!-- <router-link
            class="profile-link"
            :to="`/service/${
              services
                ? services.filter((item) => item.service_type == '5').length
                  ? services.filter((item) => item.service_type == '5')[0].id
                  : service_name[5]
                : null
            }`"
          > -->
          <div
            :class="[
              services
                ? services.filter((item) => item.service_type == '5').length
                  ? ''
                  : 'blocked-servise'
                : null,
            ]"
            class="wrap-servise" style="position: relative;"
          >
                <div
                  id="tooltip-target-info5"
                  class="notification-counter-docs"
                  
                ><p>{{
                    `${
                    processServices.filter(
                      (service) => service.service_type == "5"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "5")
                      .length
                  }`
                }}</p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-info5"
                  triggers="hover"
                
                >
                 <span>Всего оформлено  <strong>действующих</strong> документов на данную услугу {{
                  `${
                    processServices.filter(
                      (service) => service.service_type == "5"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "5")
                      .length
                  }`
                }}</span>
                </b-tooltip>
                </div>
            <div class="servise-title wow animate__animated animate__fadeIn">
              <img
                src="../assets/icons/placeholder.png"
                alt=""
                style="margin: auto 15px auto 0"
              />
              <div class="project-title-text-wrap">
                <p class="project-title-text">Облачное хранилище</p>
                <!-- <span>{{
                  `${
                    processServices.filter(
                      (service) => service.service_type == "5"
                    ).length
                  } из ${
                    services.filter((service) => service.service_type == "5")
                      .length
                  }`
                }}</span> -->
                <p class="project-title-after-text">
                  Ваши файлы будут находиться на
                  <strong>надежных серверах</strong>.
                </p>
              </div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
              "
            >
              <div style="display: flex">
                <p
                  id="tooltip-target-period4"
                  class="servise-tag period-tag mt-3"
                ></p>
                <b-tooltip
                  placement="bottom"
                  target="tooltip-target-period4"
                  triggers="hover"
                >
                  Это <strong>периодическая</strong> услуга
                </b-tooltip>
              </div>

              <!-- <p v-if="services && services.filter((item) => item.service_type == '5')[0]" class="project-title-after-text">{{ `До ${thismoment(services.filter((item) => item.service_type == '5')[0].end_data).format("DD-MM-YYYY")}`}}</p>
                <p v-else class="project-title-after-text">Срок сервиса не определен</p> -->
            </div>
          </div>
          <!-- </router-link> -->
        </b-col>

        <b-col v-if="isHidden" cols="12" class="mt-4">
          <div class="offer-wrap">
            <div class="offer-text-wrap wow animate__animated animate__fadeIn">
              <p class="offer-title">Не нашли подходящих услуг?</p>
              <p class="offer-text">
                Закажите звонок, и мы перезвоним вам в
                <strong>течении 10 минут</strong><br />для индивидуального
                заказа!
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

    <SupportCallModal v-if="isHidden"
   
    />

    <!-- <b-modal
      id="modal-prevent-closing1"
      v-model="showCallModal"
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
            src="../assets/pictures/logo_on_black.png"
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
            @click="calling"
            class="offer-try modal-try"
            style="margin-bottom: 40px"
            >Отправить</b-button
          >
        </b-col>
      </b-row>
    </b-modal> -->

    <ModalAddService
      :show="show"
      :services="services"
      :partnerProfile="partnerProfile"
      @close="show = false"
      @add="addService"
    />
  </section>
</template>

<script>
import ModalAddService from "@/components/partner/ModalAddService.vue";
import { PartnerMapper } from "@/store/partner";
import { NotificationMapper } from "@/store/notification";
import { AdminMapper } from "@/store/admin";
import { UserMapper } from "@/store/user";
import SupportCallModal from "@/components/SupportCallModal.vue";
import moment from "moment";
export default {
  name: "ServisesContent",
  components: { ModalAddService, SupportCallModal },
  data() {
    return {
      phone_feedback: "",
      phoneState_feedback: null,
      name_feedback: "",
      nameState_feedback: null,
      service_name: [
        "collocation",
        "development",
        "administration",
        "modification",
        "escort_1C",
        "cloud",
      ],
      show: false,
      thismoment: moment,
      showCallModal: false,
      processServices: [],
    };
  },
  props: {
    isHidden: {
      type: Boolean,
      default: true,
    },
    services: {
      type: Array,
    },

    partnerProfile: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...UserMapper.mapState(["profile"]),
  },

  methods: {
    ...PartnerMapper.mapActions(["createPartnerService"]),
    ...NotificationMapper.mapActions(["postNotification"]),
    ...AdminMapper.mapActions(["postEmail"]),

    async calling() {
      let data = {
        user: "admin",
        from: this.profile.id,
        type: "call",
        title: "Запрос для звонка",
        text: `Клиент ${this.profile.surname} ${this.profile.name}, ${this.profile.patronim} попросил обратный звонок`,
        link: `detail/${this.profile.id}`,
      };

      await this.postNotification(data);

      await this.postEmail(this.profile);
      this.showCallModal = false;
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },

    async addService(data) {
      await this.createPartnerService(data);
      this.$emit("addservice");

      console.log("services", this.services);
    },
  },

  beforeUpdate() {
    this.processServices = this.services.filter(
      (service) => service.service_status == "in_work"
    );
    console.log("services", this.services);
    console.log("processServices", this.processServices);
  },

  mounted() {
     this.processServices = this.services.filter(
      (service) => service.service_status == "in_work"
    );
     console.log("services", this.services);
    console.log("processServices", this.processServices);
    console.log("client services content", this.services);
  }
};
</script>

<style scoped>
.services-filter__add {
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

.services-filter__add:hover {
  background: none;
}

.services-filter__add {
  margin-right: 0;
  order: 2;
  transition: 0.3s;
}

#servises-content {
  height: calc(100vh - 120px);
  padding-top: 20px;
  padding-bottom: 50px;
}
.container-inside {
  padding: 0 !important;
  overflow: hidden;
}
.container-inside > .row > .col-md-6 {
  margin: 15px 0;
}

.wrap-servise {
  border-radius: 10px;
  background: #202020;
  width: 100%;
  padding: 30px;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  transition: 0.5s ease;
}

.servise-title {
  display: flex;
  margin-bottom: 20px;
}

.servise-title img {
  margin-top: 0 !important;
}

.project-title-text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 0px;
  color: #ffffff;
  word-break: break-all;
}
.project-title-after-text {
  font-size: 14px;
  color: #717579;
  margin-bottom: 0;
}
.servise-tag {
  padding: 10px;
  width: fit-content;
  border-radius: 10px;
}

.serv-tag,
.period-tag,
.hardware-tag,
.develop-tag,
.project-tag {
  margin-bottom: 0;
}

.serv-tag {
  background: rgba(234, 201, 71, 0.75);
  color: #eac947;
}
.hardware-tag {
  color: #2251f8;
  background: rgba(34, 81, 248, 0.75);
}
.period-tag {
  background: rgba(255, 74, 85, 0.75);
  color: #ff4a55;
}
.develop-tag {
  background: rgba(204, 74, 255, 0.75);
  color: rgba(204, 74, 255);
}
.project-tag {
  background: rgba(74, 255, 98, 0.75);
  color: rgba(74, 255, 98);
}

.offer-wrap {
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
.offer-try {
  min-width: fit-content;
  padding: 10px 25px;
  background-color: #fff;
  color: #000000 !important;
  text-decoration: none !important;
  transition: 0.5s cubic-bezier(0.7, -1.51, 0.36, 2.19);
  font-weight: 600;
  font-size: 18px;
  border-radius: 10px;
}
.offer-try:hover {
  transform: scale(1.1);
}
.form-group {
  margin: 15px 0;
}
.bank-info-input {
  margin: 10px 0;
}
</style>

<style>
.modal-header-feedback-custom {
  color: #fff;
  background: linear-gradient(30.43deg, #1d3573 19.43%, #3f8392 87.63%);
  padding-top: 15px;
  padding-bottom: 15px;
}
.modal-footer-feedback-custom {
  color: #fff;
  background: linear-gradient(212.43deg, #1d3573 19.43%, #3f8392 87.63%);
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
}
.modal-content-feedback-custom {
  border-radius: 20px;
  background: #202020;
  color: #ffffff;
  text-align: center;
}

.modal-content-feedback-custom .modal-send-first {
  color: #000 !important;
}

.modal-content-feedback-custom .modal-send-second {
  color: #fff !important;
}

.modal-content-feedback-custom > .modal-body {
  padding-right: 80px;
  padding-left: 80px;
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

.blocked-servise {
  position: relative;
}
.blocked-servise::after {
  content: "";
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
  top: 0;
  left: 0;
  border-radius: 10px;
  transition: 0.5s ease;
}
.blocked-servise:hover {
  transform: scale(1.03);
}
.blocked-servise:hover::after {
  content: "";
  background: repeating-linear-gradient(
    -60deg,
    transparent 0,
    transparent 1px,
    transparent 2px,
    transparent 5px
  );
  display: none;
}
.profile-link {
  color: #ffffff;
  text-decoration: none !important;
}
</style>


<style>
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
}
.modal-content-feedback-custom {
  border-radius: 20px;
  background: transparent;
  color: #ffffff;
  text-align: center;
  box-shadow: 6px 6px 6px #1b1a1f, -6px -6px 6px #24232661;
}

.modal-content-feedback-custom .modal-send-first {
  color: #000 !important;
}

.modal-content-feedback-custom .modal-send-second {
  color: #fff !important;
}

.modal-content-feedback-custom > .modal-body {
  padding: 0;
  overflow: hidden;
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

.notification-counter-docs {
  position: absolute;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 7px 7px 5px 7px;
  top: 4px;
  right:4px;
    background-color: #1d5dff;
}

.notification-counter-docs > p {
  color: #ffffff;
  margin-bottom: 0;
  line-height: normal;
  margin-top: 1px;
  font-weight: 700;
}



</style>