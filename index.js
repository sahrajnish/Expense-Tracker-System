const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { DB_NAME } = require("./constants.js");
const { connectDB } = require("./config/connectDB.js");
const userRouter = require("./routes/user.routes.js");
const expensesRouter = require('./routes/expenses.routes.js')
const path = require("path")
const fs = require("fs")

// dotenv
dotenv.config({
    path: "./.env"
});

const app = express();

// Port
const PORT = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// connectDB
connectDB(`${process.env.MONGODB_URI}/${DB_NAME}`)

// User routes
app.use('/api/v1/users', userRouter)

// transaction routes
app.use('/api/v1/userExpenses', expensesRouter)

const buildPath = path.resolve(__dirname, "./client/build");

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(buildPath, "index.html"));
  });
} else {
  console.error("⚠️ client/build folder not found. Did you run npm run build?");
}


// listen server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})
