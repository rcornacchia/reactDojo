const AuthenticationController = require('./controllers/authentication'),
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const REQUIRE_ADMIN = "Admin",
      REQUIRE_OWNER = "Owner",
      REQUIRE_CLIENT = "Client",
      REQUIRE_MEMBER = "Member";

module.exports = function(app) {
    // initializing route groups
    const apiRoutes = express.Router(),
          authRoutes = express.Router();

    // set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);

    // registration route
    authRoutes.post('/register', AuthenticationController.register);

    // login route
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    // set url for API group routes
    app.use('/api', apiRoutes);
}
