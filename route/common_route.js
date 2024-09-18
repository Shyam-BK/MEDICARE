
const express = require('express');
const router = express.Router();

const {getUserDetails} = require('../routes/controllers/get_user_details')
const {getBookingDetails} = require('../routes/controllers/get_booking_details')
const {registerUser} = require('../routes/controllers/registerUser')
const {loginUser} = require('../routes/controllers/loginUser')
const {updateUser} = require('../routes/controllers/update_user_profile')


router.get('/get_user_details',getUserDetails);
router.get('/get_booking_details',getBookingDetails);
router.post('/register_user',registerUser);
router.post('/login_user',loginUser);
router.post('/update_profile',updateUser);

module.exports = router;