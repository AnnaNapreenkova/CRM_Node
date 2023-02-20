const mongoose = require("mongoose");

require("dotenv/config");

const MONGOURI = process.env.MONGOURI;
const MONGOCONFIG = {
  dbName: "megaorion_admin",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
};

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, MONGOCONFIG);
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
