const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
dotenv.config();

//mongodb connection
connectDB();

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/teacher", require("./routes/teacheRoutes"));

// routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "server running",
  });
});

// listen port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(
    `Server Running successful in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
