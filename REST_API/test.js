var request = require('request-promise');
  
async function returnImage(image_name) {
  
    var data = {
        image_name: image_name
    }
  
    var options = {
        method: 'POST',
        uri: 'http://127.0.0.1:5608/returnImage',
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
            console.log(err);
        });
}

async function uploadImage(image_name, pattern_id) {
  
    var data = {
        image_name: image_name,
        pattern_id: pattern_id
    }
  
    var options = {
        method: 'POST',
        uri: 'http://127.0.0.1:5608/uploadImage',
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
            console.log(err);
        });
}
  
async function deleteImage(image_name) {
  
    var data = {
        image_name: image_name
    }
  
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
            console.log(err);
        });
}

async function clearlocalStorage() {
  
    var data = {}
  
    var options = {
        method: 'POST',
        uri: 'http://127.0.0.1:5608/clearLocalStorage',
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
            console.log(err);
        });
}

deleteImage("f99e9f2d2732421abd756144eb8c0fde.jpg");