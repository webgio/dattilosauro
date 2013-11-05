var EventEmitter = require('events').EventEmitter
  , extend = require('extend')
  , data = require('./testdata.js')
  , _ = require('underscore')

var Excerpt = function(options){
  EventEmitter.call(this)
  this.data = {}
  if (options.id) this.data.id = options.id
}

Excerpt.prototype = {
  load: function(){
    if (!this.data.id) return
    var id = this.data.id
    this.data = _(data).find(function(x){ return x.id == id })
    this.emit('loaded')
  }
}

extend(Excerpt.prototype, EventEmitter.prototype)
module.exports = Excerpt
