
const db = require('../config')

const getBookingDetails = (req, res) => {

    const booking_id = req.query.booking_id;

    if (!booking_id) {
        return res.status(200).json({status:200,message:"booking_id field missing"})
    }

    const sql = 'SELECT * FROM booking where booking_id = ?';

    const ID = booking_id;

    db.query(sql,[ID] ,(err, results) => {
        if (err) {
            console.error('Error fetching results from database:', err);
            return res.status(500).json({
                status:500,
                message: 'An error occurred while fetching details'
            });
        }


        if (results == 0) {
            return res.status(200).json({
                status:404,
                message: 'booking not found'
            });
        }

        // Send the results as a JSON response
        res.status(200).json({
            status:200,
            message: 'Booking retrieved successfully',
            Booking: results
        });
    });
}

module.exports = {getBookingDetails};
