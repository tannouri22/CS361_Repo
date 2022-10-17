const express = require("express");
const db = require('./db');
const app = express();
const port = 3306;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.get("/sun", (req, res) => {
    try{
        console.log("helo");
        res.json(db.query(
            `SELECT * from Users`
        ));
    } catch {
        console.err(err);
    }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});