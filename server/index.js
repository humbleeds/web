const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "gymshark",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  var sql = "SELECT * FROM clients";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const clientName = req.body.clientName;
  const clientGender = req.body.clientGender;
  const clientBirthdate = req.body.clientBirthdate;

  var sql = "INSERT INTO clients (clientName, clientGender, clientBirthdate) VALUES (?,?,?)";
  con.query(
    sql,
    [clientName, clientGender, clientBirthdate],
    function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    }
  );
});

app.delete("/api/delete/:clientName", (req, res) => {
    const name = req.params.clientName;
    const sql = "DELETE FROM clients WHERE clientName = ?"

    con.query(sql, name), (err, result) => {
        if (err) console.log(err);
    };
});

app.get("/api/get-trainers", (req, res) => {
  var sql = "SELECT * FROM trainers";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/api/delete-trainer/:workoutType", (req, res) => {
  const name = req.params.workoutType;
  const sql = "DELETE FROM trainers WHERE workoutType = ?"

  con.query(sql, name), (err, result) => {
      if (err) console.log(err);
  };
});

app.post("/api/insert-trainer", (req, res) => {
  const workoutType = req.body.workoutType;
  const workoutDescription = req.body.workoutDescription;
  const trainerBirthdate = req.body.trainerBirthdate;

  var sql = "INSERT INTO trainers (workoutType, workoutDescription, trainerBirthdate) VALUES (?,?,?)";
  con.query(
    sql,
    [workoutType, workoutDescription, trainerBirthdate],
    function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    }
  );
});

app.get("/api/get-workouts", (req, res) => {
  var sql = "SELECT * FROM workouts";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/api/delete-workout/:workoutType", (req, res) => {
  const name = req.params.workoutType;
  const sql = "DELETE FROM workouts WHERE workoutType = ?"

  con.query(sql, name), (err, result) => {
      if (err) console.log(err);
  };
});

app.post("/api/insert-workout", (req, res) => {
  const workoutType = req.body.workoutType;
  const workoutDescription = req.body.workoutDescription;

  var sql = "INSERT INTO workouts (workoutType, workoutDescription) VALUES (?,?)";
  con.query(
    sql,
    [workoutType, workoutDescription],
    function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    }
  );
});

app.listen(3001, () => {
  console.log("Runnin on port 3001");
});
