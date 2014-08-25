'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    security       = require('../lib/security'),
    users          = require('../controllers/users'),
    home           = require('../controllers/home');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());
  // maxAge is in seconds (3600:1hr, 86400:1d), null makes cookie never expire
  app.use(session({store: new RedisStore(), secret:'so safe wow', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  // authentication step
  app.use(security.authenticate);

  app.get('/', home.index);

  app.get('/register', users.new);
  app.post('/register', users.create);
  app.get('/login', users.login);
  app.post('/login', users.authenticate);
  app.delete('/logout', users.logout);

  console.log('Express: Routes Loaded');
};

