global.__base = __dirname + '/';

let express        = require('express');
let bodyParser     = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
let path = require('path');
let app  = express();
let port = 8181;
var cors = require('cors')

//connect to MongoDB
mongoose.connect('mongodb://localhost/Events');
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    // we're connected!
});

//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.use(cors());
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__base, '/app/ngApp/dist')));

require(path.join(__base, 'app/proxy'))(app, {});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});