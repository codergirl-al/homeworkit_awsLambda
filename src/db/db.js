const mongoose = require("mongoose");
const DBConnect = process.env.DB;
require("../models/subject.model");
require("../models/task.model");
require("../models/class.model");

mongoose.Promise = global.Promise;
let isConnected;
module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }
  console.log("=> using new database connection");
  return mongoose
    .connect(DBConnect, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((db) => {
      isConnected = db.connections[0].readyState;
    });
};
