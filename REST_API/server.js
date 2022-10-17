const express = require('express');
const bodyParser = require('body-parser');
var connection  = require('express-myconnection'); 
var mysql = require('mysql');


const app = express(); 
app.use(bodyParser.json());

app.use(
        connection(mysql,{
          host            : 'classmysql.engr.oregonstate.edu',
          user            : 'cs340_tannoura',
          password        : '9051',
          database        : 'cs340_tannoura',
          port : 3306, 
        },'pool'));

app.post('/nothing',(req,res)=>{ });

app.get('/sun', (req,res) => {
    console.log("hi there!");
    var query = connection.request().query("SELECT * from Users");
});

app.listen(3306, ()=> {
    console.log(`app is running on port 3306`);
});
