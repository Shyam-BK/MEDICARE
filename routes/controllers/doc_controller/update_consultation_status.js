
const db = require('../../config')

const updateConsultationStatus = (req, res) => {

    const status = req.query.status;
    const consultation_id = req.query.consultation_id;

   
    if(!status){
        return res.status(200).json({status:200,message:"status field missing"})
    }
    if(!consultation_id){
        return res.status(200).json({status:200,message:"consultation_id field missing"})
    }

    const sql = 'UPDATE consultation SET status=? WHERE consultation_id = ?;';

    
    db.query(sql,[status,consultation_id] ,(err, results) => {
        if (err) {
            console.error('Error fetching results from database:', err);
            return res.status(500).json({
                message: 'An error occurred while fetching details'
            });
        }

        if (results.affectedRows === 0) {
            return res.status(200).json({
                status: 200,
                message: 'Consultation Not found'
            });
        }

        // Send the results as a JSON response
        res.status(200).json({
            status:200,
            message: 'Consultation Updated successfully',
        });
    });
}

module.exports = {updateConsultationStatus};
