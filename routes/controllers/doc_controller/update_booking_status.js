
const db = require('../../config')

const updateBookingStatus = (req, res) => {

    const status = req.query.status;
    const booking_id = req.query.booking_id;

   
    if(!status){
        return res.status(200).json({status:200,message:"status field missing"})
    }
    if(!booking_id){
        return res.status(200).json({status:200,message:"booking_id field missing"})
    }

    const sql = 'UPDATE booking SET status=? WHERE booking_id = ?;';

    
    db.query(sql,[status,booking_id] ,(err, results) => {
        if (err) {
            console.error('Error fetching results from database:', err);
            return res.status(500).json({
                message: 'An error occurred while fetching details'
            });
        }

        if (results.affectedRows === 0) {
            return res.status(200).json({
                status: 200,
                message: 'booking Not found'
            });
        }

        // Send the results as a JSON response
        res.status(200).json({
            status:200,
            message: 'booking Updated successfully',
        });
    });
}

module.exports = {updateBookingStatus};
