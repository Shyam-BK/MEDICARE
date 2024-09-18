
const db = require('../../config')

const getAllConsultation = (req, res) => {

    const doc_id = req.query.doc_id;

    if(!doc_id){
        return res.status(200).json({status:200,message:"doc_id field missing"})
    }

    const sql = `SELECT c.consultation_id,c.reason,c.status,c.date,u.user_id,u.name,u.age,u.email,u.profile_image,u.mobile FROM consultation c
                    JOIN users u ON c.user_id = u.user_id WHERE c.doc_id = ?;`;

    
    db.query(sql,[doc_id] ,(err, results) => {
        if (err) {
            console.error('Error fetching results from database:', err);
            return res.status(500).json({
                message: 'An error occurred while fetching details'
            });
        }

        if (results.length == 0) {
            return res.status(200).json({
                status: 200,
                message: 'consultation Not found'
            });
        }

        // Send the results as a JSON response
        res.status(200).json({
            message: 'consultation Found',
            Consultation: results
        });
    });
}

module.exports = {getAllConsultation};
