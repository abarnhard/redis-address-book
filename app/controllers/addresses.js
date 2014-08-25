'use strict';

var Address = require('../models/address');

exports.index = function(req, res){
  Address.find(req.session.userId, function(err, addresses){
    res.render('addresses/index', {addresses:addresses});
  });
};

exports.new = function(req, res){
  res.render('addresses/new');
};

exports.create = function(req, res){
  req.body.userId = req.session.userId;
  Address.create(req.body, function(err, address){
    res.redirect('/addresses');
  });
};

