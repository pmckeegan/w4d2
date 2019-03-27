const pg = require("pg");
const settings = require("./settings"); // settings.json
const moment = require('moment');

const config = {
    host : settings.host,
    port : settings.port, 
    database : settings.database,
    user : settings.user,
    password : settings.password
};

const name = process.argv[ 2 ];

let client = new pg.Client( config );


    client.connect((err) => {
        if (err) {
        return console.error("Connection Error", err);
        }
        console.log ('Searching.... '); 
        client.query(`SELECT * FROM famous_people WHERE first_name LIKE CONCAT ( '%', $1::text, '%' )`, [name], displayNames);
    });

function displayNames(err, result) {
    if (err) {
    return console.error("error running query", err);
    }
        console.log("Found", result.rows.length, "person(s) with the name", name, ":")
    
        var count = 1
    result.rows.forEach( function (row) {
        let m = moment(row.birthday);
        console.log ("- ", count++, ":", row.first_name, row.last_name, ", born",  m.format("YYYY-MM-DD"));
    });
    client.end();
};
