var express = require('express');
var bodyParser = require('body-parser');
var db = require('./routes/config');

const port = 5000;

const admin = require('./route/admin_route');
const doc = require('./route/doctor_route');
const comm = require('./route/common_route');
const user = require('./route/user_route');


var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/uploads",express.static('uploads'));

// Routes
app.use('/admin', admin);
app.use('/doc', doc);
app.use('/common', comm);
app.use('/user', user);

// Start the server
app.listen(port, () => {
    console.log(`Running on port http://localhost:${port}` );
});
