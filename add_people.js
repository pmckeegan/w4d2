
const settings = require("./settings"); // settings.json
// const moment = require('moment');


var knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password :settings.password,
      database : settings.database
    }
  });

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthdate = process.argv[4];



knex('famous_people')


.insert({first_name: firstName, last_name: lastName, birthday: birthdate})
.returning ('*') 
.then(rows => console.log(rows))
.finally(function() {
    knex.destroy();
  });


// moment(birthdate).format('YYYY-MM-DD')