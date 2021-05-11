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

app.listen(3001, () => {
  console.log("Runnin on port 3001");
});
