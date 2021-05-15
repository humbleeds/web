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
  const trainerName = req.body.trainerName;
  const trainerSkill = req.body.trainerSkill;
  const trainerBirthdate = req.body.trainerBirthdate;

  var sql = "INSERT INTO trainers (trainerName, trainerSkill, trainerBirthdate) VALUES (?,?,?)";
  con.query(
    sql,
    [trainerName, trainerSkill, trainerBirthdate],
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
      console.log(result);
    }
  );
});

app.put("/api/update-workout-name", (req, res) => {
  const newWorkoutType = req.body.newWorkoutType;
  const workoutType = req.body.workoutType;
  const sql = "UPDATE workouts SET workoutType = ? WHERE workoutType = ?"

  con.query(
    sql,
    [newWorkoutType, workoutType],
    function (err, result) {
      if (err) throw err;
      console.log(result);
    }
  );
});

app.put("/api/update-workout-description", (req, res) => {
  const newWorkoutDescription = req.body.newWorkoutDescription;
  const workoutType = req.body.workoutType;
  const sql = "UPDATE workouts SET workoutDescription = ? WHERE workoutType = ?"

  con.query(
    sql,
    [newWorkoutDescription, workoutType],
    function (err, result) {
      if (err) throw err;
      console.log(result);
    }
  );
});

app.get("/api/get-discounts", (req, res) => {
  var sql = "SELECT * FROM discounts";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/api/delete-discount/:discountDescription", (req, res) => {
  const name = req.params.discountDescription;
  const sql = "DELETE FROM discounts WHERE discountDescription = ?"

  con.query(sql, name), (err, result) => {
      if (err) console.log(err);
  };
});

app.post("/api/insert-discount", (req, res) => {
  const discountDescription = req.body.discountDescription;
  const discountDuration = req.body.discountDuration;

  var sql = "INSERT INTO discounts (discountDescription, discountDuration) VALUES (?,?)";
  con.query(
    sql,
    [discountDescription, discountDuration],
    function (err, result) {
      if (err) throw err;
      console.log(result);
    }
  );
});

app.put("/api/update-discount-duration", (req, res) => {
  const newDiscountDuration = req.body.newDiscountDuration;
  const discountDescription = req.body.discountDescription;
  const sql = "UPDATE discounts SET discountDuration = ? WHERE discountDescription = ?"

  con.query(
    sql,
    [newDiscountDuration, discountDescription],
    function (err, result) {
      if (err) throw err;
      console.log(result);
    }
  );
});

app.get("/api/get-memberships", (req, res) => {
  var sql = "SELECT * FROM memberships";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/api/delete-membership/:membershipClient", (req, res) => {
  const name = req.params.membershipClient;
  const sql = "DELETE FROM memberships WHERE membershipsClient = ?"

  con.query(sql, name), (err, result) => {
      if (err) console.log(err);
  };
});

app.post("/api/insert-membership", (req, res) => {
  const membershipClient = req.body.membershipClient;
  const membershipTrainer = req.body.membershipTrainer;
  const membershipWorkout = req.body.membershipWorkout;
  const membershipDiscount = req.body.membershipDiscount;
  const membershipDuration = req.body.membershipDuration;
  const membershipPrice = req.body.membershipPrice;

  var sql = "INSERT INTO memberships (membershipClient, membershipWorkout, membershipTrainer, membershipDiscount, membershipPrice, membershipDuration) VALUES (?,?,?,?,?,?)";
  con.query(
    sql,
    [membershipClient, membershipWorkout, membershipTrainer, membershipDiscount, membershipPrice, membershipDuration],
    function (err, result) {
      if (err) throw err;
      console.log(result);
    }
  );
});

app.put("/api/update-membership-duration", (req, res) => {
  const newMembershipDuration = req.body.newMembershipDuration;
  const membershipClient = req.body.membershipClient;
  const sql = "UPDATE memberships SET membershipDuration = ? WHERE membershipClient = ?"

  con.query(
    sql,
    [newMembershipDuration, membershipClient],
    function (err, result) {
      if (err) throw err;
      console.log(result);
    }
  );
});

app.listen(3001, () => {
  console.log("Runnin on port 3001");
});
