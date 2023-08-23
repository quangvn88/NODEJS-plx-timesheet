const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 80;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Body Parser
const { bodyParser } = require('./middleware/parser');
bodyParser(app);

//Router Main server
const routerServer = require("./routes/server")
app.use(routerServer);

app.listen(PORT, function () {
    console.log("Server listening on port " + PORT);
});