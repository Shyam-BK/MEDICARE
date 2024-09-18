
const db = require('../../config')

const getAllServices = (req, res) => {

    const doc_id = req.query.doc_id;

    if(!doc_id){
        return res.status(200).json({status:200,message:"doc_id field missing"});
    }

    const sql = 'SELECT * FROM services where doc_id = ?';

    
    db.query(sql,[doc_id] ,(err, results) => {
        if (err) {
            console.error('Error fetching results from database:', err);
            return res.status(500).json({
                message: 'An error occurred while fetching details'
            });
        }

        if(results == 0){
            return res.status(200).json({
                status:404,
                message:'Not Found'

            });
        }

        // Send the results as a JSON response
        res.status(200).json({
            status:200,
            message: 'Services Found',
            Services: results
        });
    });
}

module.exports = {getAllServices};
