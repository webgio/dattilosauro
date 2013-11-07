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
    window.addEventListener('keydown', function(e) {
      if (e.keyCode == 8) {
        e.stopPropagation()
        e.preventDefault()
        return false
      } 
    })
    window.addEventListener('keyup', function(e){
      e.stopPropagation()
      e.preventDefault()
      var typedText = sizzle('#typedText', that.element)[0]
      var letter = keycode(e.keyCode)
      if (e.keyCode >= 48 && e.keyCode <= 90) typedText.innerHTML += letter
      if (e.keyCode == 8) typedText.innerHTML = typedText.innerHTML.substr(0, typedText.innerText.length - 1)
      if (letter == 'space') typedText.innerHTML += '&nbsp;'
      return false
    })
    this.model.load()
  },
  render: function(){
    this.element.innerHTML = template(this.model.data)
    return this
  }
}
module.exports = Gym
