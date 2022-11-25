// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs361_tannoura',
    password        : 'figgypudding@22',
    database        : 'cs361_tannoura'
})

exports.asyncQuery = (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, function (err, rows) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};
// Export it for use in our applicaiton
module.exports.pool = pool;
