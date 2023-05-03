require("dotenv").config();

const express = require("express");
const app = express();

const mainRouter = require("./routes/main");
const connectDB = require("./db/connect");

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

const connString = process.env.MONGO_DB_URI;
const port = process.env.PORT || 3001;

// Routes

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", mainRouter);

// Middlewares

app.use(errorHandlerMiddleware);
app.use(notFound);

const StartServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`App connected on port ${port}...`);
    });

    await connectDB(connString);
    console.log("Database Connected...");
  } catch (error) {
    console.log(error);
  }
};

StartServer();
