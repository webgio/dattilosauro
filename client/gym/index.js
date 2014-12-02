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
      var typedText = sizzle('#typedText', that.element)[0]
      if (e.keyCode == 8) {
        e.stopPropagation()
        e.preventDefault()
        typedText.textContent = typedText.textContent.substr(0, typedText.textContent.length - 1)
        return false
      } 
    })
    window.addEventListener('keypress', function(e){
    //document.onkeypress = function (e) {
      e = e || window.event; 
      var charCode = e.charCode || e.keyCode, 
          character = String.fromCharCode(charCode);
      var typedText = sizzle('#typedText', that.element)[0]
      console.log('pressed', charCode, character)
      e.stopPropagation()
      e.preventDefault()
      // var letter = keycode(e.keyCode)
      if (charCode !== 32 && charCode !== 13) {
      //   if (e.shiftKey) letter = letter.toUpperCase()
         typedText.textContent += character
      }
      // if (e.keyCode == 219) typedText.textContent += 'è' 
      // if (e.keyCode >= 97 && e.keyCode <= 122) typedText.textContent += letter
      if (charCode === 32) {
        typedText.innerHTML += '&nbsp;'
      }
      if (charCode === 13) {
        typedText.innerHTML += '<br />'
      }
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
