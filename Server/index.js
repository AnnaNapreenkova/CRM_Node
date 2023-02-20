const express = require("express");
const app = express();
const InitiateMongoServer = require("./config/db");
const cors = require("cors");
const http = require("http").Server(app);
// const io = require("socket.io")(http)
const cron = require('node-cron');
// const cronTab = require('./scripts/cron')
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    //credentials: true,
  },
})
const path = require("path");

// cron.schedule('* * * * * *', () => {
//   console.log('running a task every minute');
// });

// cronTab.taskminute;

require("dotenv/config");

// Routes imports
const routes = require("./routes");
// Подключение к Базе данных
InitiateMongoServer();



// Статика
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.get('/', (req, res) => res.sendFile(__dirname + "/public/index.html"));

io.on("connection", (socket) => {
  console.log("Socket connected");
  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", msg);
  })
})

// Middleware
app.use(express.json());
app.use(cors());
app.disable("etag");
const PORT = process.env.PORT || 5000;



routes.forEach((route) => {  

  app.use("/api/v1/" + route.name, route.router);
});

http.listen(PORT, (req, res) => console.log(`App listen on port ${PORT}`));
