const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const blogRoutes = require("../backend/routes/blog");
const authRoutes = require("../backend/routes/auth");

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
//cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes middleware
app.use(blogRoutes);
app.use(authRoutes);

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
