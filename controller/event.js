"use strict";
const pool = require("../config/db_config");

module.exports.GET_TASK = async (req, res, next) => {
  try {
    let status = req.body.status;
    console.log(status);
    if (status) {
      let sql = "SELECT * FROM todo WHERE isActive=? ORDER BY id DESC";
      result = await pool.query(sql, [status]);
    } else {
      let sql = "SELECT * FROM todo ORDER BY id DESC";
      var result = await pool.query(sql);
    }

    res.status(200).json({
      message: "Data Fetched",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      errMessage: err.message,
    });
  }
};

module.exports.ADD_TASK = async (req, res, next) => {
  try {
    let task = req.body.task;
    if (task) {
      let sql = "INSERT INTO todo(task_name) VALUES (?)";
      let result = await pool.query(sql, [task]);
      let task_id = result.insertId;
      res.status(200).json({
        message: "Task Added",
        taskId: task_id,
      });
    } else {
      res.status(400).json({
        message: "Missing Required Field",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      errMessage: err.message,
    });
  }
};

module.exports.DELETE_TASK = async (req, res, next) => {
  try {
    let task_id = req.params.id;
    if (task_id) {
      let sql = "DELETE FROM todo WHERE id=?";
      let result = await pool.query(sql, [task_id]);
      res.status(200).json({
        message: "Task Deleted",
      });
    } else {
      res.status(400).json({
        message: "Missing Required Field",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      errMessage: err.message,
    });
  }
};

module.exports.EDIT_TASK = async (req, res, next) => {
  try {
    let task_id = req.params.id;
    let task_name = req.body.task;
    if (task_id && task_name) {
      let check_sql = "SELECT * FROM todo WHERE id=?";
      let [check_result] = await pool.query(check_sql, [task_id]);
      if (check_result) {
        let sql = "UPDATE todo set task_name=? WHERE id=?";
        let result = await pool.query(sql, [task_name, task_id]);
        res.status(200).json({
          message: "Task Edited",
        });
      } else {
        res.status(400).json({
          message: "Task Doesn't Exist",
        });
      }
    } else {
      res.status(400).json({
        message: "Missing Required Field",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      errMessage: err.message,
    });
  }
};

module.exports.MARK_COMPLETE = async (req, res, next) => {
  try {
    var task_id = req.params.id;
    if (task_id) {
      let check_sql = "SELECT * FROM todo WHERE id=?";
      let [check_result] = await pool.query(check_sql, [task_id]);
      if (check_result) {
        let sql = "UPDATE todo set isActive=? WHERE id=?";
        let result = await pool.query(sql, [0, task_id]);
        res.status(200).json({
          message: "Task Completed",
        });
      } else {
        res.status(400).json({
          message: "Task Doesn't Exist",
        });
      }
    } else {
      res.status(400).json({
        message: "Missing Required Field",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      errMessage: err.message,
    });
  }
};
