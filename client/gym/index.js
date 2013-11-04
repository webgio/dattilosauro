var domify = require('domify')
  , template = require('./mainTemplate.hbs')
  , Excerpt = require('../excerpts')
  , dope = require('dope')
  , navigation = require('../navigation')
  , Delegate = require('dom-delegate')

var Gym = function(options){
  options = options || {}
  this.element = options.element || domify('<div></div>')
}
Gym.prototype = {
  render: function(){
    this.element.innerHTML = template({
      excerpt: this.excerpt
    })
    return this
  }
}
module.exports = Gym
