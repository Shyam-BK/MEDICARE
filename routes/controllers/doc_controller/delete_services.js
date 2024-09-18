
const db = require('../../config')

const deleteServices = (req, res) => {

    const service_id = req.query.service_id;

    if(!service_id){
        return res.status(200).json({status:200,message:"service_id field missing"})
    }


    const sql = 'DELETE FROM services WHERE services_id=?';

    const id = service_id;
    
    db.query(sql,[id] ,(err, results) => {
        if (err) {
            console.error('Error fetching results from database:', err);
            return res.status(500).json({
                message: 'An error occurred while fetching details'
            });
        }

        if (results.affectedRows === 0) {
            return res.status(200).json({
                status: 200,
                message: 'Service Not found'
            });
        }

        // Send the results as a JSON response
        res.status(200).json({
            status:200,
            message: 'Service deleted successfully',
            result:results
        });
    });
}

module.exports = {deleteServices};
