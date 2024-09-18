
const db = require('../../config')

const addServices = (req, res) => {

    const {s_name,s_price,s_des,doc_id} = req.body;

    if(!doc_id){
        return res.status(200).json({status:200,message:"doc_id field missing"})
    }

    if(!s_name){
        return res.status(200).json({status:200,message:"s_name field missing"})
    }
    if(!s_price){
        return res.status(200).json({status:200,message:"s_price field missing"})
    }
    if(!s_des){
        return res.status(200).json({status:200,message:"s_des field missing"})
    }

    const sql = 'INSERT INTO services( s_name, s_price, s_des, doc_id) VALUES (?,?,?,?)';

    
    db.query(sql,[s_name,s_price,s_des,doc_id] ,(err, results) => {
        if (err) {
            console.error('Error fetching results from database:', err);
            return res.status(500).json({
                message: 'An error occurred while fetching details'
            });
        }

        // Send the results as a JSON response
        res.status(200).json({
            status:200,
            message: 'Service Added successfully',
        });
    });
}

module.exports = {addServices};
