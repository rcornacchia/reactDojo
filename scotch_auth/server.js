const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const jwt        = require('jsonwebtoken');
const config     = require('./config');
const User       = require('./app/models/user');
const port       = process.env.PORT || 8080;

mongoose.connect(config.database);

app.set('secretsecret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// routes
app.get('/', function(req, res) {
    res.send('Hello, the API is at http://localhost:' + port + '/api');
});

app.get('/setup', function(req, res) {
    const rob = new User({
        name: 'Rob Cornacchia',
        password: 'password123',
        admin: true
    });

    rob.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({ success: true });
    });
});

const apiRoutes = express.Router();

// TODO: route to authenticate a user
// TODO: route middleware to veriy a token

// route to show a welcome message
apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the API'});
});

// route to return all users
apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

app.use('/api', apiRoutes);

app.listen(port);
console.log('server started on port: ' + port);
