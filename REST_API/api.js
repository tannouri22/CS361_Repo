var  Db = require('./dboperations');
//var  User = require('./User');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
var  app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);



var  port = 3306;
app.listen(port);
console.log('API is runnning at ' + port);