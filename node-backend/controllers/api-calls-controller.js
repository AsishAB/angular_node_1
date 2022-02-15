const fetch = require("node-fetch");
const db = require('../db/server');

var headers = new fetch.Headers();
headers.append("X-CSCAPI-KEY", "API_KEY");

var requestOptions = {
method: 'GET',
headers: headers,
redirect: 'follow'
};


exports.getAllCountries = (req, res, next) => {
    db.query(`SELECT * from tbl_countries`, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result.rows);
    });

}

exports.getStatesFromCountries = (req, res, next) => {
    db.query(`SELECT * from tbl_states where country_id=$1`,[req.params.id], (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result.rows);
    });

}

exports.getCitiesFromState = (req, res, next) => {
    db.query(`SELECT * from tbl_cities where state_id=$1`,[req.params.id], (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result.rows);
    });

}

// router.get("/get-all-countries",(req, res, next) => {
//     fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
//         .then(response => response.text())
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));
// });