<template>
   <b-col cols="12" style="height: 100%" class="mobile-right-nopadding mobile-left-nopadding">
        <div class="card-wrap">
          <div class="messages-wrap ">
            <div class="messages-title-block">
              <div class="messages-title-text-wrap">
                <p class="messages-title">Сообщения</p>
                <p class="messages-title-text">
                  Просмотрите последние полученые сообщения здесь
                </p>
              </div>
              <a href="#" class="new-message-btn"><p>Новый чат</p></a>
            </div>

            <div class="messages-body wow animate__animated animate__fadeIn  ">
              <!-- сообщение 1 -->
              <div class="messages-row">
                <div class="avatar-and-message">
                  <div class="avatar avatar-message">
                    <img class="messages-photo" src="../../assets/icons/placeholder.png" alt="" />
                    <img
                      src="../../assets/icons/online-dot.svg"
                      alt=""
                      class="online-img"
                    />
                  </div>

                  <div class="message-text-wrap">
                    <p id="user-name" class="user-name">Джон Кармак</p>
                    <p id="user-message" class="user-message">
                      Ну как там с деньгами?
                    </p>
                  </div>
                </div>

                <div class="date-and-more">
                  <p class="date-sent">26 минут назад</p>
                  <a href="#"
                    ><img  class="more-icon" src="../../assets/icons/more.svg" alt=""
                  /></a>
                </div>
              </div>
              <!-- сообщение 1 -->
              <!-- сообщение 2 -->
              <div class="messages-row">
                <div class="avatar-and-message">
                  <div class="avatar avatar-message">
                    <img class="messages-photo" src="../../assets/icons/placeholder.png" alt="" />
                    <img
                      src="../../assets/icons/online-dot.svg"
                      alt=""
                      class="online-img"
                    />
                  </div>

                  <div class="message-text-wrap">
                    <p id="user-name" class="user-name">Адриан Кармак</p>
                    <p id="user-message" class="user-message">
                      Какими ещё деньгами?
                    </p>
                  </div>
                </div>

                <div class="date-and-more">
                  <p class="date-sent">26 минут назад</p>
                  <a href="#"
                    ><img class="more-icon" src="../../assets/icons/more.svg" alt=""
                  /></a>
                </div>
              </div>
              <!-- сообщение 2 -->
              <!-- сообщение 3 -->
              <div class="messages-row">
                <div class="avatar-and-message">
                  <div class="avatar avatar-message">
                    <img class="messages-photo" src="../../assets/icons/placeholder.png" alt="" />
                    <img
                      src="../../assets/icons/online-dot.svg"
                      alt=""
                      class="online-img"
                    />
                  </div>

                  <div class="message-text-wrap">
                    <p id="user-name" class="user-name">Петя Кармак</p>
                    <p id="user-message" class="user-message">
                      Которые я вложил в капитал прожиточного минимума.
                    </p>
                  </div>
                </div>

                <div class="date-and-more">
                  <p class="date-sent">26 минут назад</p>
                  <a href="#"
                    ><img class="more-icon" src="../../assets/icons/more.svg" alt=""
                  /></a>
                </div>
              </div>
              <!-- сообщение 3 -->
              <!-- сообщение 4 -->
              <div class="messages-row">
                <div class="avatar-and-message">
                  <div class="avatar avatar-message">
                    <img class="messages-photo" src="../../assets/icons/placeholder.png" alt="" />
                    <img
                      src="../../assets/icons/online-dot.svg"
                      alt=""
                      class="online-img"
                    />
                  </div>

                  <div class="message-text-wrap">
                    <p id="user-name" class="user-name">Вася Кармак</p>
                    <p id="user-message" class="user-message">
                      Ты пьяный или кто, сынок?
                    </p>
                  </div>
                </div>

                <div class="date-and-more">
                  <p class="date-sent">26 минут назад</p>
                  <a href="#"
                    ><img class="more-icon" src="../../assets/icons/more.svg" alt=""
                  /></a>
                </div>
              </div>
              <!-- сообщение 4 -->
              <!-- сообщение 5 -->
              <div class="messages-row">
                <div class="avatar-and-message">
                  <div class="avatar avatar-message">
                    <img class="messages-photo" src="../../assets/icons/placeholder.png" alt="" />
                    <img
                      src="../../assets/icons/online-dot.svg"
                      alt=""
                      class="online-img"
                    />
                  </div>

                  <div class="message-text-wrap">
                    <p id="user-name" class="user-name">Твой батя</p>
                    <p id="user-message" class="user-message">
                      Да ни фига!
                    </p>
                  </div>
                </div>

                <div class="date-and-more">
                  <p class="date-sent">26 минут назад</p>
                  <a href="#"
                    ><img class="more-icon" src="../../assets/icons/more.svg" alt=""
                  /></a>
                </div>
              </div>
              <!-- сообщение 5 -->
            </div>
          </div>
        </div>
      </b-col>
</template>

<script>
export default {
name: "CardMessages",
}
</script>

<style scoped>
.checkout-info-wrap,
.messages-title-block {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
.checkout-text-wrap,
.checkout-card-wrap,
.messages-wrap,
.messages-title-text-wrap {
  display: flex;
  flex-flow: column;
}
.card-wrap {
  border-radius: 20px;
  background: #202020;
  width: 100%;
  padding: 30px;
}
.card-wrap {
  transition: 0.5s ease;
}
.card-wrap:hover {
  box-shadow: 0px 0px 15px #36363690;
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
.new-message-btn {
  background: #1d5dff;
  border-radius: 10px;
  padding: 20px 35px 18px 35px;
  display: flex;
  align-items: center;
  min-width: 175px;
  justify-content: center;
  margin: auto 0;
  transition: 0.5s ease;
  text-decoration: none;
}
.new-message-btn:hover {
  transform: scale(1.1);
}
.new-message-btn > p {
  line-height: 18px;
  text-decoration: none !important;
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  margin: 0;
}

.messages-photo {
  background: #C4C4C4;
  border-radius: 10px;
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.messages-body {
  margin-top: 20px;
}
.messages-row,
.avatar-and-message,
.date-and-more {
  display: flex;
  flex-flow: row;
}
.avatar-and-message {
  width: 75%;
}
.messages-row {
  margin: 20px 0;
  justify-content: space-between;
}
.message-text-wrap {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.avatar {
  position: relative;
  margin-right: 25px;
}
.online-img {
  position: absolute;
  bottom: 0;
  right: -10px;
}
.user-name {
  font-weight: 600;
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 5px;
}
.user-message {
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
  margin: 0;
  white-space: nowrap; /* Отменяем перенос текста */
  overflow: hidden; /* Обрезаем содержимое */
  padding-right: 5px; /* Поля */
  text-overflow: ellipsis; /* Многоточие */
  max-width: 250px;
}
.date-sent {
  margin: auto 30px 0 0;
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  color: #717579;
}


.more-icon {
  transition: 0.3s ease;
  opacity: 0.6;
}
.more-icon:hover {
  opacity: 1;
}
</style>