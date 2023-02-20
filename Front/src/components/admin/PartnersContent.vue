<template>
  <section id="content-partners">
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
              @click="adminPartner"
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

      <div v-if="!showspin && !adminPartners.length" class="spinner">
        <dot-loader
          :loading="spinloading"
          :color="spincolor"
          :size="spinsize"
        ></dot-loader>
      </div>
<div v-else style="height: 62vh;">
      <b-row  >
        <b-col
          cols="6"
          md="4"
          lg="3"
          v-for="(partner, i) in paginatedUsers"
          :key="i"
          class="client-wrap"
        >
          <div class="client-item">
            <div class="client-avatar-wrapper offline">
              <img class="client-avatar" :src="partner.img || require(`@/assets/pictures/square-avatar-placeholder.jpg`)" alt="" />
            </div>

            <div class="text-client-info">
              <p class="client-name">
                {{ partner.surname }} {{ partner.name }} {{ partner.patronim }}
              </p>
              <p class="client-email">{{ partner.email }}</p>
              <p class="client-company">{{ partner.company }}</p>
              <div>
                <a
                  class="client-watch"
                  href="#"
                  @click.prevent="pushToUser(partner)"
                  >Перейти в профиль</a
                >
              </div>
              <div>
                <a
                  class="client-watch"
                  href=""
                  @click.prevent="pushToUserClient(partner)"
                  >Посмотреть клиентов партнера</a
                >
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
</div>
      <div class="empty-height"></div>
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
    <ModalAddPartner :show="show" @close="show = false" @add="addUser" />
  </section>
</template>

<script>
import toast from "@/scripts/toast";
import ModalAddPartner from "@/components/admin/ModalAddPartner.vue";
import DotLoader from "vue-spinner/src/DotLoader.vue";
import { AdminMapper } from "@/store/admin";
import { UserMapper } from "@/store/user";
export default {
  name: "PartnersContent",
  components: {
    ModalAddPartner,
    DotLoader,
  },
  data() {
    return {
      show: false,
      paginatedUsers: [],
      perPage: 8,
      currentPage: 1,
      spinsize: "300",
      spinwidth: "100",
      spinheight: "100",
      spincolor: "#1d3573",
      spinloading: true,
      showspin: false
    };
  },
  computed: {
    ...UserMapper.mapState(["profile"]),
    ...AdminMapper.mapState(["adminUsers", "adminPartners"]),
    rows() {
      return this.adminPartners.length;
    },
  },

  methods: {
    toast,
    ...AdminMapper.mapActions([
      "postPartner",
      "getAdminPartners",
      "getPartnerClients",
    ]),
    paginate(page_size, page_number, adminPartners) {
      let itemsToParse = adminPartners;
      this.paginatedUsers = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1, this.adminPartners);
    },

    async adminPartner() {
      await this.getAdminPartners();
      this.paginate(this.perPage, 0, this.adminPartners);
    },

    async addUser(user) {
      await this.postPartner(user);
      await this.getAdminPartners();
      console.log("adminpartners", this.adminPartners);
      this.paginate(this.perPage, 0, this.adminPartners);
      if (!this.error) {
        if (user.role == "Partner") {
          this.toast("Успешно", "Партнер успешно создан", "success");
        }
      } else {
        this.toast("Ошибка", "Такой email уже сушествует", "danger");
      }

      await this.getAdminPartners();
    },

    pushToUser(client) {
      if (this.profile.role == "Admin") {
        this.$router.push({ name: "client-detail", params: { id: client.id } });
      } else if (this.profile.role == "Partner") {
        this.$router.push({
          name: "client-detail",
          params: { id: client.user.id },
        });
      }
    },

    async pushToUserClient(client) {
      await this.getPartnerClients(client.id);

      this.$router.push({ name: "clients-cab" });
    },
  },
  async mounted() {
    await this.getAdminPartners();
    this.paginate(this.perPage, 0, this.adminPartners);
    if (this.adminPartners) {
      this.showspin = true;
    }
    console.log("showspin", this.showspin);
    console.log("adminPartners", this.adminPartners);
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

.client-refresh p {
  margin-bottom: 0;
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