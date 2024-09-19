var express = require("express");
var bodyParser = require("body-parser");
var db = require("./routes/config"); // Ensure this is configured correctly

const port = 5000;

const admin = require("./route/admin_route");
const doc = require("./route/doctor_route");
const comm = require("./route/common_route");
const user = require("./route/user_route");

var app = express();

// Middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static file serving
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

// CORS configuration
const cors = require("cors");
app.use(cors()); // By default, this allows all origins. Adjust as necessary for your use case.

// Routes for serving HTML files
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/Login-Form-main/index.html");
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/public/admin/index.html");
});

app.get("/doctor", (req, res) => {
  res.sendFile(__dirname + "/public/doctor/index.html");
});

app.get("/user", (req, res) => {
  res.sendFile(__dirname + "/public/user/index.html");
});

// Routes for API endpoints
app.use("/admin", admin);
app.use("/doc", doc);
app.use("/common", comm);
app.use("/user", user);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
