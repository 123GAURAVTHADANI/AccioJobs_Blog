let express = require("express");
const dbConfig = require("./Configurations/db.config");
const UserRouter = require("./Routes/user.route");
var app = express();
require("dotenv").config();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let PORT = process.env.PORT || 8081;

// Router Level Middleware
app.use("/api/v1/user", UserRouter);

app.listen(PORT, async () => {
  await dbConfig();
  console.log(`Listening to the port:${PORT}`);
});
