const db = require("../../config");

const updateServices = (req, res) => {
  const { s_name, s_price, s_des, doc_id, services_id } = req.body;

  if (!doc_id) {
    return res
      .status(400)
      .json({ status: 400, message: "doc_id field missing" });
  }

  if (!s_name) {
    return res
      .status(400)
      .json({ status: 400, message: "s_name field missing" });
  }
  if (!s_price) {
    return res
      .status(400)
      .json({ status: 400, message: "s_price field missing" });
  }
  if (!s_des) {
    return res
      .status(400)
      .json({ status: 400, message: "s_des field missing" });
  }
  if (!services_id) {
    return res
      .status(400)
      .json({ status: 400, message: "services_id field missing" });
  }

  const sql =
    "UPDATE services SET s_name = ?, s_price = ?, s_des = ? WHERE doc_id = ? AND services_id = ?;";

  db.query(
    sql,
    [s_name, s_price, s_des, doc_id, services_id],
    (err, results) => {
      if (err) {
        console.error("Error updating service in database:", err);
        return res.status(500).json({
          status: 500,
          message: "An error occurred while updating the service",
          error: err,
        });
      }

      console.log("Update Results:", results);

      if (results.affectedRows === 0) {
        return res.status(404).json({
          status: 404,
          message: "Service not found or no changes made",
        });
      }

      // Send the results as a JSON response
      res.status(200).json({
        status: 200,
        message: "Service updated successfully",
      });
    }
  );
};

module.exports = { updateServices };
