const db = require('../../config');

const consultatioRequest = (req, res) => {

    const {reason,status,user_id,doc_id} = req.body;

    if(!reason){
        return res.status(200).json({status:200,message:"reason field missing"})
    }
    if(!doc_id){
        return res.status(200).json({status:200,message:"doc_id field missing"})
    }
    if(!status){
        return res.status(200).json({status:200,message:"status field missing"})
    }
    if(!user_id){
        return res.status(200).json({status:200,message:"user_id field missing"})
    }
   

    const sql = 'INSERT INTO consultation(reason, status, user_id, doc_id) VALUES (?,?,?,?)';

    
    db.query(sql,[reason,status,user_id,doc_id] ,(err, results) => {
        if (err) {
            console.error('Error fetching results from database:', err);
            return res.status(500).json({
                message: 'An error occurred while fetching details'
            });
        }

        // Send the results as a JSON response
        res.status(200).json({
            status:200,
            message: 'consultation request sented successfully',
        });
    });
}

module.exports = {consultatioRequest};
 