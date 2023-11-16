const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
require('dotenv').config();

//Allowing everything dummy change1
app.use(cors({
  origin: '*'
}));

const db = mysql.createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.use(express.json());

function consumeRAM() {
  return new Promise ((resolve, reject) => {
    const size = 10000000; // Adjust this size to increase or decrease memory usage
    const largeArray = Array.from({ length: size }, () => Math.random());
  
    console.log('RAM consuming function is running...');
  
    // Processing the array in a way that consumes time
    const processedArray = largeArray.map(x => x * Math.random());
  
    console.log('RAM consuming function completed.');
    resolve(processedArray);
  });
}

// db.connect(function(err) {
//   if (err) {
//     console.error('⚠️  Error Connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('✅  Connected as ID: ' + connection.threadId);
// });

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/heavy-endpoint', (req, res) => {
    consumeRAM().then (() => {
      res.status(200).send('Heavy processing completed');
    });
});

app.listen(3001, () => {
  console.log("✅ Server running on port: 3001");
});
