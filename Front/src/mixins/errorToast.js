import toastMixin from "./toast";
import { UserMapper } from "@/store/user";
export default {
  mixins: [toastMixin],
  methods: {
    ...UserMapper.mapActions(["signOut"]),
    async errorToast(error) {
      if (error.message) {
        await this.signOut();
        this.toast(
          "Ошибка",
          "Срок сессии истек. Войдите в кабинет еще раз",
          "danger"
        );
        setTimeout(() => this.$router.push({ name: "main-login" }), 2000);
      } else if (error.errors) {
        error.errors.forEach((err) => {
          this.toast("Ошибка", err.msg, "danger");
        });
      } else if (error.msg) {
        this.toast("Ошибка", error.msg, "danger");
      }
    },
  },
};
