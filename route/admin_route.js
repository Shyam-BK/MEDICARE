
const express = require('express');
const router = express.Router();


const {addDoctor} = require('../routes/controllers/admin_controller/add_doc')
const {getAllDoc} = require('../routes/controllers/admin_controller/get_all_doc')
const {getAllUser} = require('../routes/controllers/admin_controller/get_all_user')
const {AcStatusUpdate} = require('../routes/controllers/admin_controller/ac_status_update')


router.post('/add_doc',addDoctor);
router.get('/get_all_doc',getAllDoc);
router.get('/get_all_user',getAllUser);
router.post('/ac_status_update',AcStatusUpdate);



module.exports = router;