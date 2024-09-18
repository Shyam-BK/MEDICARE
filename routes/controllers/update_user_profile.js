const multer = require('multer');
const path = require('path');
const db = require('../config');

// Set up storage engine for profile image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const extname = path.extname(file.originalname).toLowerCase();
    if (extname) {
      return cb(null, true);
    } else {
      cb('Error: Invalid file!');
    }
  }
}).single('profileImage');

// Update User Function
const updateUser = (req, res) => {
  upload(req, res, (uploadError) => {
    
    if (uploadError) {
      return res.status(200).json({ status: 400, message: uploadError });
    }

    const { user_id, name, age, email, mobile } = req.body;

    // Validation
    if (!user_id || !name || !age || !email || !mobile) {
      return res.status(200).json({ status: 400, message: 'All fields are required.' });
    }

    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber) || ageNumber < 18) {
      return res.status(200).json({ status: 400, message: 'Age must be a number and at least 18.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(200).json({ status: 400, message: 'Invalid email address.' });
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(200).json({ status: 400, message: 'Mobile number must be 10 digits.' });
    }

    let profileImageUpdateQuery = '';
    let profileImageValues = [];

    // If a profile image is uploaded, include it in the update
    if (req.file) {
      const profileImage = req.file.filename;
      profileImageUpdateQuery = ', profile_image = ?';
      profileImageValues.push('/uploads/' + profileImage);
    }

    // Update user query
    const sql = `UPDATE users 
                 SET name = ?, age = ?, email = ?, mobile = ?${profileImageUpdateQuery}
                 WHERE user_id = ?`;

    const values = [name, age, email, mobile, ...profileImageValues, user_id];

    // Execute the query
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ status: 500, message: 'Database error', error: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ status: 404, message: 'User not found.' });
      }

      res.status(200).json({
        status: 200,
        message: 'User updated successfully.',
        user: {
          id: user_id,
          name,
          age,
          email,
          mobile,
          profileImage: req.file ? '/uploads/' + req.file.filename : 'No change'
        }
      });
    });
  });
};

module.exports = { updateUser };
