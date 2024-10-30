let mongoose = require("mongoose");
function dbConfig() {
  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connected to DB");
    });
}

module.exports = dbConfig;
// mongoose Options / string options
