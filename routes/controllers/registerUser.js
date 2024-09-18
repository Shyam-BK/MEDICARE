const multer = require("multer");
const path = require("path");
const db = require("../config");

// Set up storage engine for profile image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Allow any file type
    const extname = path.extname(file.originalname).toLowerCase();
    if (extname) {
      return cb(null, true);
    } else {
      cb("Error: Invalid file!");
    }
  },
}).single("profileImage");

// Register User Function
const registerUser = (req, res) => {
  upload(req, res, (uploadError) => {
    if (uploadError) {
      return res.status(200).json({ status: 400, message: uploadError });
    }

    const {
      name,
      age,
      email,
      mobile,
      user_name,
      password,
      confirm,
      user_type,
    } = req.body;

    // Validation
    if (
      !name ||
      !age ||
      !email ||
      !mobile ||
      !user_name ||
      !password ||
      !confirm ||
      !user_type
    ) {
      return res
        .status(200)
        .json({ status: 400, message: "All fields are required." });
    }

    if (password !== confirm) {
      return res
        .status(200)
        .json({
          status: 400,
          message: "Password and confirm password do not match.",
        });
    }

    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber) || ageNumber < 18) {
      return res
        .status(200)
        .json({
          status: 400,
          message: "Age must be a number and at least 18.",
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(200)
        .json({ status: 400, message: "Invalid email address." });
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      return res
        .status(200)
        .json({ status: 400, message: "Mobile number must be 10 digits." });
    }

    // If the profile image is optional, check if a file was uploaded
    let profileImage = req.file ? req.file.filename : null;

    // Check if user_name already exists
    const checkUserSql = "SELECT * FROM users WHERE user_name = ?";
    db.query(checkUserSql, [user_name], (checkErr, checkResult) => {
      if (checkErr) {
        return res
          .status(200)
          .json({ status: 500, message: "Database error", error: checkErr });
      }

      if (checkResult.length > 0) {
        return res
          .status(200)
          .json({
            status: 400,
            message: "Username already exists. Please choose another one.",
          });
      }

      // Insert into database
      const sql =
        "INSERT INTO users (name, age, email, mobile, user_name, password, user_type, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [
        name,
        age,
        email,
        mobile,
        user_name,
        password,
        user_type,
        profileImage ? "/uploads/" + profileImage : null,
      ];

      db.query(sql, values, (err, result) => {
        if (err) {
          return res
            .status(200)
            .json({ status: 500, message: "Database error", error: err });
        }

        res.status(200).json({
          status: 200,
          message: "User data inserted successfully.",
          user: {
            id: result.insertId,
            name,
            age,
            email,
            mobile,
            user_name,
            user_type,
            profileImage: profileImage ? "/uploads/" + profileImage : null,
          },
        });
      });
    });
  });
};

module.exports = { registerUser };
