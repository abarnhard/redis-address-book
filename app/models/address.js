'use strict';

var Mongo = require('mongodb');

function Address(o){
  this.name = o.name;
  this.email = o.email;
  this.color = o.color;
  this.userId = Mongo.ObjectID(o.userId);
}

Object.defineProperty(Address, 'collection', {
  get: function(){return global.mongodb.collection('addresses');}
});

Address.create = function(obj, cb){
  var a = new Address(obj);
  Address.collection.save(a, cb);
};

Address.find = function(userId, cb){
  userId = Mongo.ObjectID(userId);
  Address.collection.find({userId:userId}).toArray(cb);
};

Address.all = function(cb){
  Address.collection.find().toArray(cb);
};

module.exports = Address;

