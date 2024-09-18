const db = require('../config')


const loginUser = (req, res, next) => {
    const username = req.query.username;
    const password = req.query.password;
  
    // Validate input fields
    if (!username) {
      return res.status(400).json({
        status: 400,
        message: 'Missing field: username'
      });
    }
  
    if (!password) {
      return res.status(400).json({
        status: 400,
        message: 'Missing field: password'
      });
    }
  
    // Query the database for the username first
    db.query('SELECT * FROM users WHERE user_name = ?', [username], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ 
          status: 500,
          message: 'Database error',
          error: error 
        });
      }
  
      // Check if the username exists
      if (result.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Username does not exist'
        });
      }
  
      // If username exists, check the password
      const user = result[0];
      if (user.password !== password) {
        return res.status(401).json({
          status: 401,
          message: 'Incorrect password'
        });
      }
  
      // If both username and password are correct
      return res.status(200).json({ 
        status: 200,
        message: 'Login successful',
        Users: result
      });
    });
  };
  
  // Export the loginUser function
  module.exports = { loginUser };
  