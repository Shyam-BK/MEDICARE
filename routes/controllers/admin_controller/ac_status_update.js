
    const db = require('../../config')

    const AcStatusUpdate = (req, res) => {

        const user_id = req.query.user_id;

        const sql = 'SELECT * FROM users where user_id = ?';

        const userId = user_id;

        if(!userId){
            return res.status(200).json({status:200,message:`user_id field missing`})
        }

        db.query(sql,[userId] ,(err, results) => {
            if (err) {
                console.error('Error fetching results from database:', err);
                return res.status(500).json({
                    message: 'An error occurred while fetching details'
                });
            }

            if (results.length > 0) {

                let ac_status = results[0].ac_status;
                // console.log('AC Status:', ac_status);
            
                const dea = 'Deactivated';
                const active = 'Active';
            
                const newStatus = ac_status === 'Active' ? dea : active;
            
                const updatesql = `UPDATE users SET ac_status = ? WHERE user_id = ?;`;
            
                db.query(updatesql, [newStatus, userId], (err, result) => {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).json({status: 500, message: `${err.message}`});
                    }
            
                    return res.status(200).json({status: 200, message: `Account ${newStatus}`});
                });
            } else{
                return res.status(200).json({status:404,message:"User Id Not Found"})
            }
        
        });
    }

    module.exports = {AcStatusUpdate};
