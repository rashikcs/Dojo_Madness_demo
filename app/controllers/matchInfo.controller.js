const request = require("request");

const options = {  
    url: 'https://api.opendota.com/api/proMatches',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
};

var data = null

// Fetch all Customers
request(options, function(err, res, body) {  
    data = JSON.parse(body);
});
			
exports.getAll = (req, res) => {
	console.log("--->Get All matchInfo: \n");
    res.send(data); 
};