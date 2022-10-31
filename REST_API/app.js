const express = require("express");
const app = express();
const port = 3306;

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({extname: ".hbs"}));
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public')); 

// Database
var db = require('./database/db-connector');

//Global
let userId;

app.get('/', function(req,res)
  {
  res.render('start')
});

app.get('/login.hbs', function(req,res)
  {
  res.render('login')
});

app.get('/signup.hbs', function(req,res)
  {
  res.render('signup')
});

app.get('/home.hbs', function(req,res)
  {
  res.render('home')
});

app.post('/pattern-preview.hbs', function(req,res)
{
  let data = req.body;
  let id = parseInt(req.body.idOfPattern);
  let query1 =`SELECT * FROM Pattern WHERE idPattern = ${id};`;
      db.pool.query(query1, function(error, rows, fields){
          if(error){
              console.log(error);
              res.sendStatus(400);
          } else {
              res.render('pattern-preview', {data: rows});
          }
      })
})

app.get('/database.hbs', function(req,res)
  {
    let query1 =`SELECT * FROM Pattern WHERE isPublished = true;`;
      db.pool.query(query1, function(error, rows, fields){
          if(error){
              console.log(error);
              res.sendStatus(400);
          } else {
              res.render('database', {data: rows});
          }
      })
});

app.get('/library.hbs', function(req,res)
  {
    let query1 =`SELECT Pattern.name FROM Pattern INNER JOIN Library ON Pattern.idPattern = Library.Pattern_idPattern WHERE Library.User_idUser = ${userId};`;
      db.pool.query(query1, function(error, rows, fields){
          if(error){
              console.log(error);
          } else {
              res.render('library', {data: rows});
          }
      })
});

app.get('/workspace.hbs', function(req,res){
  //query the patterns in Library where isAuthor is true
  let query1 = `SELECT Pattern.name FROM Pattern INNER JOIN Library ON Pattern.idPattern = Library.Pattern_idPattern WHERE Library.isAuthor = "true";`
  db.pool.query(query1, function(error, rows, fields){
    if(error){
        console.log(error);
        res.sendStatus(400);
    } else {
      res.render('workspace', {data: rows});
    }
})
  
});

app.get('/add-pattern.hbs', function(req,res){
  res.render('add-pattern')
});

app.get('/add-product.hbs', function(req,res){
  res.render('add-product')
});

app.get('/update-pattern.hbs', function(req,res){
  res.render('update-pattern')
});

app.post('/verify-user', function(req, res){
  const data = req.body;

  let query1 =`SELECT idUser FROM User WHERE User.email = '${data['username']}' AND User.password = '${data['password']}';`;
      db.pool.query(query1, function(error, rows, fields){
          if(error){
              console.log(error);
              res.sendStatus(400);
          } else {
            if (rows.length == 0){
              res.render('login', {data : [{ value : false }]});
            } else {
              //save the userId as a global to be used in other queries
              userId = rows[0].idUser;
              res.redirect('/home.hbs');
            } 
          }
      })
});

app.post('/add-user', function(req, res){
  const data = req.body;
  console.log(data);

  let query1 =`INSERT INTO User (email, password) VALUES ('${data['username']}', '${data['password']}');`;
      db.pool.query(query1, function(error, rows, fields){
          if(error){
              console.log(error);
              res.sendStatus(400);
          } else {
              res.redirect('/login.hbs');
          }
      })
});

//add a pattern and it's associated tags
//create an input box with an onClick
// when the button is clicked, first add the tag to the html
//then add a call to fetch that fetches a route handler, which adds the tag to the database

//on page submission
//automatically add the pattern to the individual's library
//then, route back to the workspace page
app.post('/pattern-form', function(req, res){
  const data = req.body;

  //call microservice for PDF and Image Storage
  //then, add the fields to SQL
  let query1 =`INSERT INTO Pattern(name, description, price, image_path, instructions, isPublished) VALUES ('${data['pattern-name']}', '${data['description']}', '${data['price']}', '${data['image']}','${data['pattern-file']}','${data['published']}');`;
      db.pool.query(query1, function(error, rows, fields){
          if(error){
              console.log(error);
              res.sendStatus(400);
          } else {
              res.redirect('/workspace.hbs');
          }
      })
});


app.post('/product-form', function(req, res){
  const data = req.body;

  //call microservice for PDF and Image Storage
  //then, add the fields to SQL
  let query1 =`INSERT INTO Product(startDate, endDate, cost, Pattern_idPattern) VALUES ('${data['start-date']}', '${data['end-date']}','${data['cost']}','[value-4]');`;
      db.pool.query(query1, function(error, rows, fields){
          if(error){
              console.log(error);
              res.sendStatus(400);
          } else {
              res.redirect('/workspace.hbs');
          }
      })
});

//onkeyup for product search query the database for Patterns where pattern name is "like"

//delete a pattern
app.post('/delete-pattern', function(req,res){
  let data = req.body;
  let primaryKey = parseInt(data.primaryKey);
  console.log(`Here is your id = '${primaryKey}'`);
  let query1 = `DELETE FROM Pattern WHERE idPattern = ${primaryKey}`;

        db.pool.query(query1, function(error, rows, fields){
            if (error) {
              console.log(error);
              res.sendStatus(400);
            } else {
              res.redirect('/workspace.hbs');
            }
})});

//update a pattern
app.post('/update-pattern', function(req,res){
  let data = req.body;
  let primaryKey = parseInt(data.updatePrice);
  

  queryUpdate = `UPDATE Intersection_Beds_People SET endDate = '${data.updateEndDate}' WHERE Intersection_Beds_People.primaryKey = '${primaryKey}'`;

        db.pool.query(queryUpdate, function(error, rows, fields){
            if (error) {
              console.log(error);
              res.sendStatus(400);
            } else {
              res.redirect('/workspace.hbs');
           }
})});

//include functionality to delete and update a product? 
//view a product?





//save a pattern into your library - pattern preview page


//form filter for database
app.post("/database-filter", (req, res) =>
{
  res.send("hello there");
})

//form filter for library


app.listen(port, () => {
  console.log(`Craft app listening at http://localhost:${port}`);
});