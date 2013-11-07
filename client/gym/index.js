var setupPresenter = require('../setupPresenter')
  , template = require('./mainTemplate.hbs')
  , Excerpt = require('../excerpt')
  , dope = require('dope')
  , navigation = require('../navigation')
  , Delegate = require('dom-delegate')
  , sizzle = require('sizzle')
  , keycode = require('keycode')

var Gym = function(options){
  setupPresenter.call(this)
  this.id = options.id
  this.model = new Excerpt({id: this.id})
}

Gym.prototype = {
  init: function(){
    this.model.on('loaded', this.render.bind(this))
    var that = this
    window.addEventListener('keyup', function(e){
      var typedText = sizzle('#typedText', that.element)[0]
      var letter = keycode(e.keyCode)
      if (e.keyCode >= 48 && e.keyCode <= 90) typedText.innerHTML += letter
      if (letter == 'space') typedText.innerHTML += '&nbsp;'
    })
    this.model.load()
  },
  render: function(){
    this.element.innerHTML = template(this.model.data)
    return this
  }
}
module.exports = Gym
