<template>
  <div class="container p-0 popover-notification">
    <div v-for="Notice in notifications.filter(notification => notification.read == false)" :key="Notice.id" :index="Notice.id">
      <div class="popover-row pointer pt-2 ">
        <div :id="Notice.id" class="row">
          <div @click="clicknote(Notice.link, Notice.id)" class="col-md-12 py-0">
            
              {{ Notice.createdAt }} 
              <h3>{{ Notice.title }}</h3>
              <p>{{ Notice.text }}</p>
            
          </div>
        </div>
        <hr class="notification-hr  p-0" />
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "PopoverNotifications",

  props: {
    notifications: {
      type: Array,
    },
  },

  data() {
    return {
      NotificationsList: [
        // {
        //   id: 0,
        //   date: "Сегодня",
        //   description: "у Вас тренинг “Название тренинга”",
        //   time: "в 19:00",
        // },
        // {
        //   id: 1,
        //   date: "Завтра",
        //   description: "у Вас тренинг “Название тренинга”",
        //   time: "в 18:00",
        // },
        // {
        //   id: 2,
        //   date: "Через 3 дня",
        //   description: "у Вас тренинг “Название тренинга”",
        //   time: "в 18:00",
        // },
      ],
      
    };
  },

  methods: {
    clicknote(link, id) {    
      this.$emit("modal", link, id);
    },

    
  },
};
</script>

<style>
.margin-bottom {
  margin-bottom: 10px;
}

</style>