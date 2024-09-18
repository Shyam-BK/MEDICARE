const express = require('express');
const router = express.Router();

const {getAllBooking} = require('../routes/controllers/doc_controller/getAllBookings');
const {getAllServices} = require('../routes/controllers/doc_controller/getALLServices');
const {addServices} = require('../routes/controllers/doc_controller/add_services');
const {updateServices} = require('../routes/controllers/doc_controller/update_services');
const {deleteServices} = require('../routes/controllers/doc_controller/delete_services');
const {updateBookingStatus} = require('../routes/controllers/doc_controller/update_booking_status');
const {getAllConsultation} = require('../routes/controllers/doc_controller/getAllConsultation');
const {updateConsultationStatus} = require('../routes/controllers/doc_controller/update_consultation_status');

router.get('/get_all_booking',getAllBooking);
router.get('/get_all_services',getAllServices);
router.post('/add_services',addServices);
router.put('/update_services',updateServices);
router.delete('/delete_services',deleteServices);
router.put('/update_booking_status',updateBookingStatus);
router.get('/get_all_consultation',getAllConsultation);
router.put('/update_consultation_status',updateConsultationStatus);

module.exports = router;