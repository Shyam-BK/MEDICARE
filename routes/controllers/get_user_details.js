
const db = require('../config')

const getUserDetails = (req, res) => {

    const user_id = req.query.user_id;

    if (!user_id) {
        return res.status(200).json({status:200,message:"user_id field missing"})
    }

    const sql = 'SELECT * FROM users where user_id = ?';

    const userID = user_id;

    db.query(sql,[userID] ,(err, results) => {
        if (err) {
            console.error('Error fetching results from database:', err);
            return res.status(500).json({
                status:500,
                message: 'An error occurred while fetching details'
            });
        }

        
        if (results == 0) {
            return res.status(200).json({
                status:404,
                message: 'User not found'
            });
        }

        // Send the results as a JSON response
        return res.status(200).json({
            status:200,
            message: 'User retrieved successfully',
            Users: results
        });
    });
}

module.exports = {getUserDetails};
