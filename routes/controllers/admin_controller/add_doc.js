const db = require("../../config");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/"; // The folder where images will be stored

    // Check if the directory exists
    if (!fs.existsSync(uploadDir)) {
      // If the directory doesn't exist, create it
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Callback to specify the destination
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const addDoctor = (req, res) => {
  // Handle multiple file uploads
  upload.fields([
    { name: "doc_proof", maxCount: 1 },
    { name: "profile_image", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error uploading files",
      });
    }

    const {
      name,
      email,
      mobile,
      user_name,
      password,
      user_type,
      doc_bio,
      experience,
      specialist,
    } = req.body;

    // Check if req.files exists before accessing it
    const doc_proof =
      req.files && req.files["doc_proof"]
        ? req.files["doc_proof"][0].filename
        : null;
    const profile_image =
      req.files && req.files["profile_image"]
        ? req.files["profile_image"][0].filename
        : null;

    // Validate required fields
    if (
      !name ||
      !email ||
      !mobile ||
      !user_name ||
      !password ||
      !user_type ||
      !doc_bio ||
      !experience ||
      !specialist
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // Check if the username already exists
    const checkUsernameSql = "SELECT user_id FROM users WHERE user_name = ?";
    db.query(checkUsernameSql, [user_name], (err, results) => {
      if (err) {
        console.error("Error checking username:", err);
        return res.status(500).json({
          message: "An error occurred while checking the username",
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          message: "Username already exists",
        });
      }

      // Insert doctor into the database
      const sql = `
                INSERT INTO users (name, email, mobile, user_name, password, user_type, doc_bio, experience, specialist, doc_proof, profile_image)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
      const values = [
        name,
        email,
        mobile,
        user_name,
        password,
        user_type,
        doc_bio,
        experience,
        specialist,
        doc_proof ? "/uploads/" + doc_proof : null,
        profile_image ? "/uploads/" + profile_image : null,
      ];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Error inserting doctor into database:", err);
          return res.status(500).json({
            message: "An error occurred while adding the doctor",
          });
        }

        const sqlSelect = `
                    SELECT * FROM users
                    WHERE user_id = ?
                `;

        const doctorId = result.insertId;

        db.query(sqlSelect, [doctorId], (err, rows) => {
          if (err) {
            console.error("Error fetching doctor from database:", err);
            return res.status(500).json({
              message: "An error occurred while retrieving the doctor data",
            });
          }

          return res.status(200).json({
            status: 200,
            message: "Doctor added successfully",
            doctor: rows[0], // Return the specific fields of the newly added doctor
          });
        });
      });
    });
  });
};

module.exports = { addDoctor };
