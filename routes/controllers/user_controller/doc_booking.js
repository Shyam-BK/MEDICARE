const db = require('../../config');

const docBooking = (req, res) => {

    const {user_id,doc_id,status,message} = req.body;

    if(!user_id){
        return res.status(200).json({status:200,message:"user_id field missing"})
    }
    if(!doc_id){
        return res.status(200).json({status:200,message:"doc_id field missing"})
    }
    if(!status){
        return res.status(200).json({status:200,message:"status field missing"})
    }
    if(!message){
        return res.status(200).json({status:200,message:"message field missing"})
    }
   

    const sql = 'INSERT INTO booking(user_id, doc_id, status, message) VALUES (?,?,?,?)';

    
    db.query(sql,[user_id,doc_id,status,message] ,(err, results) => {
        if (err) {
            console.error('Error fetching results from database:', err);
            return res.status(200).json({
                status:500,
                message: 'An error occurred while fetching details'
            });
        }

        // Send the results as a JSON response
        res.status(200).json({
            status:200,
            message: 'Booking successful',
        });
    });
}

module.exports = {docBooking};
 