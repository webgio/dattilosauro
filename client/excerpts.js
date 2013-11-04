var EventEmitter = require('events').EventEmitter
  , extend = require('extend')
var data = require('./testdata.js')
var Excerpts = function(){
  EventEmitter.call(this)
  this.collection = []
}
Excerpts.prototype = {
  fetch: function(){
    this.collection = data
    this.emit('reset')
  }
}
extend(Excerpts.prototype, EventEmitter.prototype)
module.exports = Excerpts
