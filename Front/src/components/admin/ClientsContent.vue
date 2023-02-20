<template>
  <section id="content-clients">
    <b-container fluid class="container-inside">
      <div class="client-col">
        <div class="search">
          <input
            type="text"
            name="seacrh"
            placeholder="Найти"
            class="search-clients"
            id=""
          />
        </div>
        <b-row>
          <b-col class="client-wrapper">
            <button
              class="
                agent-file-load
                p-0
                py-2
                btn-admin-change-data
                new-user-width
                client-refresh
              "
              @click="adminClient"
            >
              Обновить список
            </button>
            <div class="wrap-users-info">
              <div class="row px-3">
                <button
                  @click="show = true"
                  class="
                    agent-file-load
                    p-0
                    py-2
                    btn-admin-change-data
                    new-user-width
                    client-add
                  "
                >
                  <p>+ Добавить</p>
                </button>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>

      <div v-if="!showspin && !currentclients.length" class="spinner">
        <!-- <b-spinner variant="primary"></b-spinner> -->
        <!-- <ring-loader :loading="spinloading" :color="spincolor" :size="spinsize"></ring-loader> -->
        <dot-loader
          :loading="spinloading"
          :color="spincolor"
          :size="spinsize"
        ></dot-loader>
        <!-- <scale-loader
      :loading="spinloading"
      :color="spincolor"
      :height="spinheight"
      :width="spinwidth"
    ></scale-loader>

     <fade-loader
      :loading="spinloading"
      :color="spincolor"
      :height="spinheight"
      :width="spinwidth"
    ></fade-loader> -->
      </div>

<div v-else style="height: 62vh;">
  <b-row v-if="profile && profile.role=='Partner'" >
        <b-col
          cols="6"
          md="4"
          lg="3"
          v-for="(client, i) in paginatedUsers"
          :key="i"
          class="client-wrap"
        >
          <div class="client-item" :key="usersKey">
            <div class="client-avatar-wrapper offline">
              <!-- <img
                    class="client-avatar"
                    :src="client.img ? client.img : '@/assets/icons/placeholder.png'"
                    alt=""
                  /> -->
              <img
                v-if="profile && profile.role == 'Admin'"
                class="client-avatar"
                :src="client.img || require(`@/assets/pictures/square-avatar-placeholder.jpg`)"
                alt=""
              />
              <img
                v-if="profile && profile.role == 'Partner'"
                class="client-avatar"
                :src="client.user.img || require(`@/assets/pictures/square-avatar-placeholder.jpg`)"
                alt=""
              />
            </div>
            <div class="text-client-info">
              <p class="client-name">
                {{ client.user.surname }} {{ client.user.name }} {{ client.user.patronim }}
              </p>
              <p class="client-email">{{ client.user.email }}</p>
              <p class="client-company">{{ client.user.company }}</p>
              <a
                class="client-watch"
                href="#"
                @click.prevent="pushToUser(client)"
                >Перейти в профиль</a
              >
            </div>
          </div>
        </b-col>
        <div class="overflow-auto"></div>
      </b-row>

        <b-row v-else >
        <b-col
          cols="6"
          md="4"
          lg="3"
          v-for="(client, i) in paginatedUsers"
          :key="i"
          class="client-wrap"
        >
          <div class="client-item" :key="usersKey">
            <div class="client-avatar-wrapper offline">
              <!-- <img
                    class="client-avatar"
                    :src="client.img ? client.img : '@/assets/icons/placeholder.png'"
                    alt=""
                  /> -->
              <img
                v-if="profile && profile.role == 'Admin'"
                class="client-avatar"
                :src="client.img || require(`@/assets/pictures/square-avatar-placeholder.jpg`)"
                alt=""
              />
              <img
                v-if="profile && profile.role == 'Partner'"
                class="client-avatar"
                :src="client.user.img || require(`@/assets/pictures/square-avatar-placeholder.jpg`)"
                alt=""
              />
            </div>
            <div v-if="pathForAdmin" class="text-client-info">
              <p class="client-name">
                {{ client.user.surname }} {{ client.user.name }} {{ client.user.patronim }}
              </p>
              <p class="client-email">{{ client.user.email }}</p>
              <p class="client-company">{{ client.user.company }}</p>
              <a
                class="client-watch"
                href="#"
                @click.prevent="pushToUser(client)"
                >Перейти в профиль</a
              >
            </div>
            <div v-else class="text-client-info">
              <p class="client-name">
                {{ client.surname }} {{ client.name }} {{ client.patronim }}
              </p>
              <p class="client-email">{{ client.email }}</p>
              <p class="client-company">{{ client.company }}</p>
              <a
                class="client-watch"
                href="#"
                @click.prevent="pushToUser(client)"
                >Перейти в профиль</a
              >
            </div>
          </div>
        </b-col>
        <div class="overflow-auto"></div>
      </b-row>
</div>

    
      <div class="empty-height" ></div>
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
    </b-container>
    <ModalAddClient :show="show" @close="show = false" @add="addUser" />
  </section>
</template>

<script>
import ModalAddClient from "@/components/admin/ModalAddClient.vue";
import DotLoader from "vue-spinner/src/DotLoader.vue";
import { AdminMapper } from "@/store/admin";
import { PartnerMapper } from "@/store/partner";
import { UserMapper } from "@/store/user";
// import { NotificationMapper } from "@/store/notification";
import toast from "@/scripts/toast";
import moment from "moment";
export default {
  name: "ClientsContent",
  components: {
    ModalAddClient,
    DotLoader,
  },
  data() {
    return {
      show: false,
      paginatedUsers: [],
      perPage: 8,
      currentPage: 1,
      currentclients: [],
      usersKey: 0,
      spinsize: "300",
      spinwidth: "100",
      spinheight: "100",
      spincolor: "blue",
      spinloading: true,
      showspin: false,


      pathForAdmin: false,

      // serviceList: [
      //   "Collocation",
      //   "Разработка сайта",
      //   "Администрирование серверов",
      //   "Доработка 1С",
      //   "Сопровождение 1С",
      //   "Облачное хранилище",
      // ],
    };
  },
  computed: {
    ...UserMapper.mapState(["profile"]),
    ...AdminMapper.mapState(["adminClients", "adminUsers", "partnerClients"]),
    ...PartnerMapper.mapState(["clients"]),

    rows() {
      return this.adminClients.length;
    },
  },

  methods: {
    toast,
    ...AdminMapper.mapActions(["postClient", "getAdminClients"]),
    ...PartnerMapper.mapActions(["getClients", "postPartnerClient"]),
    // ...NotificationMapper.mapActions(["postNotification"]),
    async adminClient() {
      // await this.getAdminClients();
      // this.currentclients = this.adminClients;
      // this.paginate(this.perPage, page - 1);
      // this.$forceUpdate();
      this.usersKey += 1;
    },
    paginate(page_size, page_number, currentclients) {
      let itemsToParse = currentclients;
      this.paginatedUsers = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    onPageChanged(page) {      
      // this.paginate(this.perPage, page - 1);
      this.getclients(page); 
    },

    pushToUser(client) {
      if (this.profile.role == "Admin" && client.role) {
        this.$router.push({ name: "client-detail", params: { id: client.id } });
      } else if (
        this.profile.role == "Partner" ||
        client.user.role == "PartnerClient"
      ) {
        this.$router.push({
          name: "client-detail",
          params: { id: client.user.id },
        });
      }
    },

    async addUser(user) {
      if (user.service == 1 || user.service == 3) {
        (user.end_data = null), (user.days = null), (user.monthly = false);
      } else {
        user.end_data = moment().add(1, "M");
        let a = moment(user.end_data);
        let b = moment();

        user.days = a.diff(b, "days") + 1;
        user.monthly = true;
      }

      if (this.profile.role == "Admin" && this.$route.path == "/clients") {
        user.role = "AdminClient";
        await this.postClient(user);
        // console.log("adminclients", this.adminClients);
        // this.currentclients = this.adminClients;
        this.getclients(0); 
        
      } else if (
        this.profile.role == "Partner" &&
        this.$route.path == "/partner/clients"
      ) {
        user.role = "PartnerClient";
        await this.postPartnerClient(user);
        // this.currentclients = this.clients;
        this.getclients(0);                

        // let data = {
        //   user: 'admin',
        //   from: this.profile.id,
        //   type: "service",
        //   title: 'Добавление сервиса для клиента партнера',
        //   text: `Партнер ${this.profile.surname} ${this.profile.name} ${this.profile.patronim} попросил добавить услугу ${this.serviceList[user.checkedService]}  для своего клиента ${user.surname} ${user.name} ${user.patronim}`,
        //   link: ``,
        // };

        // await this.postNotification(data);
      }

      if (!this.error) {
        // if (user.role == "AdminClient") {
        this.toast("Успешно", "Клиент успешно создан", "success");
        // }
      } else {
        this.toast("Ошибка", "Такой email уже сушествует", "danger");
      }

      await this.getAdminClients(0);
    },

    async getclients(page) {

       if (this.profile.role == "Admin" && this.$route.path == "/clients") {
      await this.getAdminClients();
      this.currentclients = this.adminClients;
      if (this.adminClients) {
        this.showspin = true;
        console.log("showspin1", this.showspin);
      }
      console.log("1");
    } else if (
      this.profile.role == "Partner" &&
      this.$route.path == "/partner/clients"
    ) {
      await this.getClients();
      this.currentclients = this.clients;
      if (this.clients) {
        this.showspin = true;
        console.log("showspin2", this.showspin);
      }
      console.log("2");
    } else if (
      this.profile.role == "Admin" &&
      this.$route.path == "/partner/clients"
    ) {
      this.currentclients = this.partnerClients;
      if (this.partnerClients) {
        this.showspin = true;
        console.log("showspin3", this.showspin);
      }
      console.log("3");
    }

    console.log("currentclients", this.currentclients);
    this.paginate(this.perPage, page, this.currentclients);

  },
  },
  mounted(){
    if(window.location.pathname == "/partner/clients"){
      this.pathForAdmin = true;
    }
    
  },
  async created() {

    this.getclients(0); 
    
    console.log("currentclients mounted", this.currentclients);

    
  },
};
</script>

<style scoped>
.spinner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

ul {
  list-style: none;
}

.client-wrapper {
  display: flex;
}

.client-col {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.client-add {
  background: #1d5dff;
  border-radius: 10px;
  border: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #ffffff;
  padding: 10px 30px 10px 25px !important;
}

.client-add p {
  margin-bottom: 0;
  font-weight: 500;
}

.client-refresh {
  background: #1d5dff;
  border-radius: 10px;
  border: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #ffffff;
  margin-right: 10px;
  padding: 10px 30px 10px 25px !important;
}

.client-wrap {
  margin-top: 30px;
}

.client-item {
  background-color: #202020;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  align-items: flex-start;
  height: 100%;
  border: 2px solid #1d5dff;
}

.client-name {
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #ffffff;
  margin-bottom: 10px;
}

.client-email {
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #717579;
  margin-bottom: 10px;
}

.client-company {
  margin-bottom: 0;
}

.client-watch {
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #1d5dff;
  text-decoration: none;
  cursor: pointer;
}

.client-avatar-wrapper {
  margin-right: 20px;
  position: relative;
}

.client-avatar-wrapper:after {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  background: #ccc;
  border: 4px solid #202020;
  border-radius: 100%;
  bottom: -3px;
  right: -3px;
}

.client-avatar-wrapper.online:after {
  background: #09bd3c;
}

.client-avatar-wrapper.offline:after {
  background: #d0412e;
}

.client-avatar {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 9px;
}

.search {
  position: relative;
}

.search:after {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  right: 7%;
  top: 33%;
  background: url("../../assets/icons/search-icon.svg") no-repeat center / cover;
}

.search-clients {
  max-width: 316px;
  width: 100%;
  padding: 20px 50px 20px 20px;
  border-radius: 10px;
  background: #202020;
  color: #fff;
  border: none;
}

.search-clients:focus {
  outline: none;
}

.agreements-footer {
  display: flex;
  justify-content: space-between;
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
  padding: 16px 27px 12px;
  border-radius: 10px;
}

.agreements-footer__item.active .agreements-footer__link {
  color: #ffffff;
  background: #1d3573;
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
  padding-bottom: 11px;
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
}

.agreements-footer__btn--next {
  padding-right: 54px;
  padding-left: 21px;
}

.agreements-footer__btn--next:before {
  content: "";
  position: absolute;
  width: 24px;
  height: 25px;
  background: url(@/assets/pictures/agreements/agreements-arrow-next.svg)
    no-repeat center / cover;
  right: 20px;
}
</style>

<style>
.page-link {
  position: relative;
  display: block;
  color: #1d5dff !important;
  text-decoration: none;
  background-color: transparent !important;
  border: 1px solid #1d5dff !important;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding: 10px 15px;
  border-radius: 10px;
  font-weight: 500;
  margin: 0 10px;
}

.page-link:hover {
  color: #fff !important;
  border: 1px solid #1d5dff !important;
  background-color: #1d5dff !important;
}
</style>
