const express = require("express");
const app = express();
const port = 3306;
const multer = require('multer');
const cors = require("cors");
var request = require('request-promise');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({extname: ".hbs"}));
app.set('view engine', '.hbs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public')); 

// Database
var db = require('./database/db-connector');

//Saving state of user - session and cookie parser
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const COOKIE_SECRET = 'cookie_monster_slippers';

app.use(cookieParser(COOKIE_SECRET));

app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: COOKIE_SECRET,
  cookie: { maxAge: 3600000 },
  path: "localhost:3306"
}));

//Microservice Functions
/////////////////////////////////////////////////////////////////
async function uploadImage(image_name, req) {
  var data = { image_name: image_name }

  var options = {
      method: 'POST',
      uri: 'http://127.0.0.1:5608/uploadImage',
      body: data,
      json: true
  };

  var sendrequest = await request(options)
      .then(function (parsedBody) {
          let result;
          git_path = parsedBody['git_path'];
          file_name = parsedBody['file_name'];
          file_type = parsedBody['file_type'];

          let query1;
          let dbs = req.body;
          if (file_type === "image"){
            query1 = `UPDATE Pattern SET image_path = '${git_path}', image_name = '${file_name}' WHERE name = '${dbs['pattern-name']}' AND description = '${dbs['description']}' AND price = '${dbs['price']}';`
          } 
          if (file_type === "pdf") {
            query1 = `UPDATE Pattern SET instructions = '${git_path}', file_name = '${file_name}' WHERE name = '${dbs['pattern-name']}' AND description = '${dbs['description']}' AND price = '${dbs['price']}';`
          }
          
          db.pool.query(query1, function(error){
            if(error){ console.log(error); }
            else {console.log("upload successful!\n")}
          })
      })
      .catch(function (err) {
          console.log(err);
      });
}

async function deleteImage(image_name) {

  var data = { image_name: image_name }
  var options = {
      method: 'POST',
      uri: 'http://127.0.0.1:5608/deleteImage',
      body: data,
      json: true
  };
  var sendrequest = await request(options)
      .then(function (parsedBody) {
          let result;
          result = parsedBody['message'];
          console.log(result);
      })
      .catch(function (err) {
          console.log("yeah this is the problem");
      });
}
////////////////////////////////////////////////////////////////

//Route Handlers
////////////////////////////////////////////////////////////////
app.get('/', (req,res) => {res.render('start')});

app.get('/login.hbs', (req,res) => {res.render('login')} );

app.get('/signup.hbs', (req,res) => {res.render('signup')});

app.get('/home.hbs', (req,res) => {res.render('home')});

app.get('/add-pattern.hbs', (req,res) => {res.render('add-pattern')});

app.get('/add-product.hbs', (req,res) => {res.render('add-product')});

app.get('/database.hbs', (req,res) => {
    let query1 =`SELECT * FROM Pattern WHERE isPublished = true;`;
      db.pool.query(query1, function(error, rows){
          if(error){ console.log(error); }
          else { res.render('database', {data: rows});}
      })
});

app.get('/library.hbs', (req,res) => {
    let query1 =`SELECT * FROM Pattern INNER JOIN Library ON Pattern.idPattern = Library.Pattern_idPattern WHERE Library.User_idUser = ${req.session.userId};`;
      db.pool.query(query1, function(error, rows){
          if(error){ console.log(error); }
          else { res.render('library', {data: rows}); }
      })
});

app.get('/workspace.hbs', async(req,res) => {
  //query the patterns in Library where isAuthor is true
  //console.log(req.session);
  let query1 = `SELECT * FROM Pattern INNER JOIN Library ON Pattern.idPattern = Library.Pattern_idPattern WHERE Library.isAuthor = 1 AND Pattern.isPublished = 0;`
  let rows = await db.asyncQuery(query1);
  res.render('workspace', {data: rows}); 
});

//for login page
app.post('/verify-user', (req, res) => {
  const data = req.body;
  let query1 =`SELECT idUser FROM User WHERE User.email = '${data['username']}' AND User.password = '${data['password']}';`;
      db.pool.query(query1, function(error, rows){
          if(error){console.log(error);}
          else {
            if (rows.length == 0){ res.render('login', {data : [{ value : false }]}); }
            else {
              req.session.userId = rows[0].idUser;
              req.session.path = "localhost:3306";
              res.redirect('/home.hbs');
            } 
          }
      })
});

//for sign up page
app.post('/add-user', (req, res) => {
  const data = req.body;
  let query1 =`INSERT INTO User (email, password) VALUES ('${data['username']}', '${data['password']}');`;
      db.pool.query(query1, function(error){
          if(error){ console.log(error); }
          else { res.redirect('/login.hbs'); }
      })
});

//from library, clicking on a pattern will either
// result in an update pattern page or a preview
app.post('/preview-or-update', (req,res) => {
  let id = parseInt(req.body.idOfPattern);
  let query1 =`SELECT * FROM Pattern INNER JOIN Library ON Pattern.idPattern = Library.Pattern_idPattern WHERE idPattern = ${id};`;
      db.pool.query(query1, function(error, rows){
          if(error){ console.log(error); }
          else {
              if (rows[0].isAuthor == 1){
                res.render('update-pattern', {data: rows});
              } 
              else if (rows[0].isPublished == 1){
                res.render('pattern-preview', {data: rows});
              } 
          }
      })
})


//takes you to pattern preview via the database page
app.post('/ppreview', async function(req,res) {
  let data = req.body;
  let id = parseInt(req.body.idOfPattern);
  let query1 =`SELECT * FROM Pattern WHERE idPattern = ${id};`;
      db.pool.query(query1, async function(error, rows1){
          if(error){
              console.log(error);
              res.sendStatus(400);
          } else {
              let query2 =`SELECT * FROM Library WHERE Pattern_idPattern = ${id} AND User_idUser = ${req.session.userId};`;
              let rows = await db.asyncQuery(query2);
              //add check that makes sure a user cannot unsave their own pattern
                if (rows.length !== 0){
                  console.log(rows);
                  if (rows[0].isAuthor == 1){res.render('pattern-preview', {data: rows1});} 
                  else {res.render('pattern-preview', {data: rows1, saved : [{ value : true }]});}
                } else {
                  console.log("not in library")
                  res.render('pattern-preview', {data: rows1, saved : [{ value : false }]});
                }
          }
      })
})

//form that is called from a pattern preview page to add an associated product
app.post('/add-product-from-preview', function(req,res) {
  let data = req.body;
  let id = parseInt(req.body.idOfPattern);
  let query1 =`SELECT * FROM Pattern WHERE idPattern = ${id};`;
      db.pool.query(query1, function(error, rows){
          if (error){ console.log(error); }
          else {
              res.render('add-product-with-id', {data: rows});
          }
      })
})

//this is the update pattern page that is displayed in the UI, prepoulated with the pattern info.
app.post('/update-pattern', function(req,res){
  let data = req.body;
  console.log(data);
  let id = parseInt(req.body.idPattern);
  let query1 =`SELECT * FROM Pattern WHERE idPattern = ${id};`;
      db.pool.query(query1, function(error, rows){
          if(error){
              console.log(error);
              res.sendStatus(400);
          } else {
              res.render('update-pattern', {data: rows});
          }
      })
});

//required storage must be initialized before 
//being called in the "/pattern-form" route handler
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, __dirname + "/uploads");
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  },
});
const Data = multer({ storage: storage });

//form used to save the pattern to the DB
app.post('/pattern-form', Data.any("files"), async (req, res) => {
  try{
    //upload form data
    let dbs = req.body;
    let query1 =`INSERT INTO Pattern(name, description, price) VALUES ('${dbs['pattern-name']}', '${dbs['description']}', '${dbs['price']}'); `;
    db.pool.query(query1, async function(error){
    if(error){console.log(error)} 
    else {
      if (req.files !== undefined){
        if (req.files[0] !== undefined){
          let file1 = await uploadImage(req.files[0].originalname, req);
        }
        if (req.files[1] !== undefined){
          let file2 = await uploadImage(req.files[1].originalname, req);
        }
      }
      addToLibrary(req);
      addPatternTags(req);
      req.session.path = "localhost:3306";
      res.redirect('/workspace.hbs');
    }
  })  
  } catch(error){
    console.log(error)
  }
});

function addToLibrary(input) {
  let data = input.body;
  let query = `SELECT Pattern.idPattern FROM Pattern  WHERE name = '${data['pattern-name']}' AND description ='${data['description']}' AND price = '${data['price']}';`;
  db.pool.query(query, function(error, rows){
    if (error){ console.log(error); }
    else {
      patternId = rows[0]['idPattern'];
      let query2 = `INSERT INTO Library (User_idUser, Pattern_idPattern, isAuthor) VALUES ('${input.session.userId}', '${patternId}', 1);`;
      db.pool.query(query2, (error) => {
        if(error){ console.log(error)}
        else{ console.log("successfully added to library!")}
      })
    }
  })
}

function addPatternTags(input) {
  let data = input.body;
  let query = `SELECT Pattern.idPattern FROM Pattern  WHERE name = '${data['pattern-name']}' AND description ='${data['description']}' AND price = '${data['price']}';`;
  db.pool.query(query, function(error, rows){
    if (error){ console.log(error); }
    else {
      patternId = rows[0]['idPattern'];
      //create a for loop for each tag
      for (let i=1; i<10; i++){
        let tagName = "crafttag" + i.toString();
        if (data[tagName] == undefined){continue;}
        else {
            //otherwise, go ahead and add the tag to the query
            let query2 = `INSERT INTO Intersection_Pattern_Tag (Pattern_idPattern, Tag_tagName) VALUES ('${patternId}', '${data[tagName]}');`;
            db.pool.query(query2, (error) => {
              if(error){ console.log(error)}
              else{ console.log(`successfully added ${data[tagName]} to library!`)}
            })
        }
      }
    }
  })
}

//publishing the pattern when it is first created involves:
// 1. creating the pattern and setting it to published
// 2. adding to Library
// 3. adding associated tags
// 4. adding images/pdf to file storage
app.post('/publish-pattern-in-adding', Data.any("files"), async (req, res)=>{
  try{
    let dbs = req.body;
    console.log(dbs);
    let query1 =`INSERT INTO Pattern(name, description, price, isPublished) VALUES ('${dbs['pattern-name']}', '${dbs['description']}', '${dbs['price']}', 1); `;
    db.pool.query(query1, async function(error){
    if(error){ console.log(error); }
    else {
      //need to check if req.files is undefined
      if (req.files !== undefined){
        if (req.files[0] !== undefined){ await uploadImage(req.files[0].originalname, req);}
        if (req.files[1] !== undefined){ await uploadImage(req.files[1].originalname, req); }
      }
      addToLibrary(req);
      addPatternTags(req);
      req.session.path = "localhost:3306";
      res.redirect('/workspace.hbs');
    }
    })  
  } catch(error){console.log(error)}
});

//publishing the pattern after an update requires: (WIP)
// 1. updating associated tags
// 2. updating images/pdf in file storage
// 3. setting the pattern to isPublished = true
app.post('/publish-pattern-in-updating', Data.any("files"), async (req, res)=>{

  //we will make the updates and publish the pattern
  try{
    let dbs = req.body;
    let query1 =`INSERT INTO Pattern(name, description, price, isPublished) VALUES ('${dbs['pattern-name']}', '${dbs['description']}', '${dbs['price']}', 1); `;
    db.pool.query(query1, async function(error){
    if(error){ console.log(error); }
    else {
      //need to check if req.files is undefined
      if (req.files !== undefined){
        if (req.files[0] !== undefined){ await uploadImage(req.files[0].originalname, req);}
        if (req.files[1] !== undefined){ await uploadImage(req.files[1].originalname, req); }
      }
      addPatternTags(req);
      req.session.path = "localhost:3306";
      res.redirect('/workspace.hbs');
    }
    })  
  } catch(error){console.log(error)}
});

app.post('/product-form', function(req, res){
  const data = req.body;
  let id = parseInt(req.body.idOfPattern);
  let query1 =`INSERT INTO Product(startDate, endDate, cost, Pattern_idPattern) VALUES ('${data['start-date']}', '${data['end-date']}','${data['cost']}','${id}');`;
      db.pool.query(query1, function(error){
          if(error){ console.log(error); }
          else {
              req.session.path = "localhost:3306";
              res.redirect('/workspace.hbs');
          }
      })
});

//deleting a pattern
app.delete('/delete-pattern', async function(req,res){
  let data = req.body;
  let primaryKey = parseInt(data.idPattern);
  let query = `SELECT image_name, file_name FROM Pattern WHERE idPattern = '${primaryKey}';`;
  let rows = await db.asyncQuery(query);
  //call the microservice to remove the image/pdf from Git Storage
  //must check that the image and/or pdf exist before trying to delete them!!!!!
  if (rows.length !== 0){
    if (rows[0]['image_name'] !== null){ await deleteImage(rows[0]['image_name']);}
    if (rows[0]['file_name'] !== null){ await deleteImage(rows[0]['file_name']);}
  }
              
  let query1 = `DELETE FROM Pattern WHERE idPattern = '${primaryKey}';`;
  await db.asyncQuery(query1);
  req.session.path = "localhost:3306";
});

//updating a pattern
app.post('/update-form', Data.any("files"), async(req,res) => {
  let data = req.body;
  let id = parseInt(data.idPattern);

  //will add a new image/pdf and delete the old one from the file storage
  if (req.files !== undefined){
    for (file in req.files) {
      if (req.files[file] !== undefined){
        await uploadImage(req.files[file].originalname, req);
        if (req.files.fieldname === "image" && data['image_name'] !== '') { await deleteImage(data['image_name']); }
        if (req.files.fieldname === "file" && data['file_name'] !== '') { await deleteImage(data['file_name']);}
      }
    }
  }

  queryUpdate = `UPDATE Pattern SET price = '${data.price}', name = '${data['pattern-name']}', description = '${data.description}'  WHERE Pattern.idPattern = ${id};`
        db.pool.query(queryUpdate, function(error){
            if (error) { console.log(error); }
            else { res.redirect('/workspace.hbs'); }
        })  
});

//include functionality to delete and update a product? 
//view a product?


app.post('/remove-from-library', function(req, res){
  let data = req.body;
  let id = parseInt(req.body.idOfPattern);
  let query1 =`DELETE FROM Library WHERE Pattern_idPattern= '${id}' AND User_idUser = '${req.session.userId}';`;
      db.pool.query(query1, function(error, rows, fields){
          if(error){ console.log(error); }
          else {
              //rerender the pattern preview page with the pattern id
              console.log("removed from library");
              req.session.path = "localhost:3306";
              res.redirect('/workspace.hbs');
          }
      })
});

app.post('/save-to-library', function(req, res){
  let data = req.body;
  let id = parseInt(req.body.idOfPattern);
  let query1 =`INSERT INTO Library (User_idUser, Pattern_idPattern, isAuthor) VALUES ('${req.session.userId}', ${id}, 'false');`;
      db.pool.query(query1, function(error){
          if(error){ console.log(error); }
          else {
              //rerender the pattern preview page with the pattern id
              console.log("saved to library");
              req.session.path = "localhost:3306";
              res.redirect('/workspace.hbs');
          }
      })
});

//form filter for database
app.post("/database-filter", (req, res) => {
  let query = `SELECT * FROM Pattern INNER JOIN Intersection_Pattern_Tag ON Pattern.idPattern = Intersection_Pattern_Tag.Pattern_idPattern WHERE Pattern.isPublished = 1`;
  let final_query = queryForPatterns(query, req.body);
  db.pool.query(final_query, function(error, rows){
    if (error) {console.log(error)}
    else { 
      res.render('database', {data: rows});
    }
  })
})

//form filter for library
app.post("/library-filter", (req, res) => {
  let query = `SELECT * FROM Pattern
  INNER JOIN Library ON Pattern.idPattern = Library.Pattern_idPattern
  INNER JOIN Intersection_Pattern_Tag ON Pattern.idPattern = Intersection_Pattern_Tag.Pattern_idPattern`;
  let final_query = queryForPatterns(query, req.body);
  db.pool.query(final_query, function(error, rows){
    if (error) {console.log(error)}
    else { 
      res.render('database', {data: rows});
    }
  })
})

function queryForPatterns(querySource, data){
//check for craft tags
for (let i=1; i<10; i++){
  let tagName = "crafttag" + i.toString();
  if (data[tagName] === undefined){continue;}
  else {
      //otherwise, append the tag to the query
      let appending_string = ` AND Intersection_Pattern_Tag.Tag_tagName = '${data[tagName]}'`;
      querySource += appending_string;
    }
}
//check the value of price tag, if present, then add to query
if (data['pricetag'] !== undefined){
  price = parseInt(data['pricetag']);
  if (price === 0){ querySource += ` AND Pattern.price = 0`}
  else if (price === 10) { querySource += ` AND Pattern.price > 10`}
  else { 
  let upperlimit = price + 5;
  querySource += ` AND Pattern.price >= price AND Pattern.price <= ${upperlimit}`;
  }
}
//check the value of searchbar, if present, then add to query
if (data['searchbar'] !== ''){
  querySource += ` AND (Pattern.name LIKE '${data['searchbar']}' OR Pattern.description LIKE '${data['searchbar']}')`
}
//append a semicolon to the end of the query
querySource += ";";
return querySource;
}

app.listen(port, () => {
  console.log(`Craft app listening at http://localhost:${port}`);
});