
const db = require('../../config')

const getAllBooking = (req, res) => {

    const doc_id = req.query.doc_id;

    if(!doc_id){
        return res.status(200).json({status:200,message:"doc_id field missing"})
    }

    const sql = `SELECT b.booking_id,
    b.user_id,    b.doc_id,    b.status,    b.message,    b.date,    b.payment_status,
    b.payment_id,    u.name,    u.age,    u.email,    u.profile_image,    u.mobile,    u.user_name,
    u.user_type,    u.ac_status,    u.doc_bio,    u.experience,    u.specialist,    u.doc_proof FROM booking b
    JOIN users u ON b.user_id = u.user_id WHERE b.doc_id = ?;`
;

    
    db.query(sql,[doc_id] ,(err, results) => {
        if (err) {
            console.error('Error fetching results from database:', err);
            return res.status(500).json({
                status:500,
                message: 'An error occurred while fetching details'
            });
        }

        // Send the results as a JSON response
        res.status(200).json({
            status:200,
            message: 'Bookings Found',
            booking: results
        });
    });
}

module.exports = {getAllBooking};
