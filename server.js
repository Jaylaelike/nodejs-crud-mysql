var express = require("express");
var cors = require("cors");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "ap-southeast.connect.psdb.cloud",
  user: "3caze3qqk8ffsyct4jvv",
  password: "pscale_pw_b1swGEmrEL77Zrnp6zjAU1r6QWBAKl2XzoQMIzwJrbf",
  database: "crud_nodejs",
  ssl: {
    rejectUnauthorized: true,
  },
});

var app = express();
app.use(cors());
app.use(express.json());

app.get("/api/users", function (req, res, next) {
  connection.query(
    "SELECT * FROM `users` WHERE 1;",
    function (err, results, fields) {
      res.json(results);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

app.get("/api/users/:id", function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `users` WHERE `id` = ?",
    [id],
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to Get users id !!!" });
        }
        return res
          .status(200)
          .json({ message: `GET users id ${id} successfully.`, status: "ok", user: results[0]});
      }
      //res.json(results);
    }
  );
});

app.post("/api/users/create", function (req, res, next) {
  connection.query(
    "INSERT INTO `users` (`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?, ?, ?, ?, ?)",
    [
      req.body.fname,
      req.body.lname,
      req.body.username,
      req.body.password,
      req.body.avatar,
    ],
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to create users !!!" });
        }
        return res
          .status(200)
          .json({ message: "Create users successfully.", status: "ok" });
      }
      //res.json(results);
      // res.json({ results: results, status: "ok" });
    }
  );
});

app.put("/api/users/update", function (req, res, next) {
  connection.query(
    "UPDATE `users` SET `fname`=?, `lname`=?, `username`=?, `password`=?, `avatar`=? WHERE id = ?",
    [
      req.body.fname,
      req.body.lname,
      req.body.username,
      req.body.password,
      req.body.avatar,
      req.body.id,
    ],
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to update users !!!" });
        }
        return res
          .status(200)
          .json({ message: "Updated users successfully.", status: "ok" });
      }
      // res.json(results);
    }
  );
});

app.delete("/api/users/delete", function (req, res, next) {
  connection.query(
    "DELETE FROM `users` WHERE id = ?",
    [req.body.id],
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to delete users !!!" });
        }
        return res
          .status(200)
          .json({ message: "Delete users successfully.", status: "ok" });
      }

      //res.json(results);
    }
  );
});

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`);
});
