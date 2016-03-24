var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var employees = require('./routes/employees.js');
var deletetask = require("./routes/deletetask.js");

// bring in pg module
var pg = require('pg');

var connectionString;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/employees_db';
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/employees', employees);
app.use("/deletetask", deletetask);


//connect and set table if none
pg.connect(connectionString, function(err, client, done){
  if (err) {
    console.log('Error connecting to DB!', err);
    //TODO end process with error code
  } else {
    var query = client.query('CREATE TABLE IF NOT EXISTS employees (' +
    'id SERIAL PRIMARY KEY,' +
    'firstname varchar(80),' +
    'lastname varchar(80),' +
    'emp_id varchar(20),' +
    'title varchar(80),' +
    'salary integer);'
  );

  query.on('end', function(){
    console.log('Successfully ensured schema exists');
    done();
  });

  query.on('error', function() {
    console.log('Error creating schema!');
    //TODO exit(1)
    done();
  });
}
});




app.get('/*', function(req, res) {
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
