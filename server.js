let express = require("express");
const dbConfig = require("./Configurations/db.config");
const UserRouter = require("./Routes/user.route");
var app = express();
require("dotenv").config();
var bodyParser = require("body-parser");
const BlogRouter = require("./Routes/article.route");
var cookieParser = require("cookie-parser");
const CommentRouter = require("./Routes/comments.route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

let PORT = process.env.PORT || 8081;

// Router Level Middleware
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/blog", BlogRouter);
app.use("/api/v1/comment", CommentRouter);

app.listen(PORT, async () => {
  await dbConfig();
  console.log(`Listening to the port:${PORT}`);
});
