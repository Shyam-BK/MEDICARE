
const db = require('../../config')

const getAllUser = (req, res) => {
    const sql = 'SELECT * FROM users where user_type = ?';

    const doc_type = "User";

    db.query(sql,[doc_type] ,(err, results) => {
        if (err) {
            console.error('Error fetching results from database:', err);
            return res.status(500).json({
                message: 'An error occurred while fetching details'
            });
        }

        if (results.length === 0) {
            return res.status(200).json({
                status: 200,
                message: 'User Not found'
            });
        }

        // Send the results as a JSON response
        res.status(200).json({
            message: 'User retrieved successfully',
            users: results
        });
    });
}

module.exports = {getAllUser};
