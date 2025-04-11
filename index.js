const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { DB_NAME } = require("./constants.js");
const { connectDB } = require("./config/connectDB.js");
const userRouter = require("./routes/user.routes.js");
const expensesRouter = require('./routes/expenses.routes.js')
const path = require("path")

// dotenv
dotenv.config({
    path: "./.env"
});

const app = express();

// Port
const PORT = 9000 || process.env.PORT;

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

// Static file
app.use(express.static(path.join(__dirname, "./client/build")))

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

// listen server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})
