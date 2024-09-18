
const db = require('../../config')

const getAllDoc = (req, res) => {
    const sql = 'SELECT * FROM users where user_type = ?';

    const doc_type = "doctor";

    db.query(sql,[doc_type] ,(err, results) => {
        if (err) {
            console.error('Error fetching doctors from database:', err);
            return res.status(500).json({
                message: 'An error occurred while fetching doctors'
            });
        }

        if (results.length === 0) {
            return res.status(200).json({
                status: 404,
                message: 'Doctors Not found'
            });
        }

        // Send the results as a JSON response
        res.status(200).json({
            status: 200,
            message: 'Doctors retrieved successfully',
            Doctors: results
        });
    });
}

module.exports = {getAllDoc};
