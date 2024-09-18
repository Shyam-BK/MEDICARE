
const express = require('express');
const router = express.Router();

const {docBooking} =require('../routes/controllers/user_controller/doc_booking');
const {consultatioRequest} =require('../routes/controllers/user_controller/con_request');



router.post('/doc_booking',docBooking);
router.post('/con_request',consultatioRequest);




module.exports = router;