var domify = require('domify')
  , template = require('./indexTemplate.hbs')
  , data = require('../testdata.js')
  , dope = require('dope')
  , navigation = require('../navigation')
  , Delegate = require('dom-delegate')

var View = function(options) {
  options = options || {}
  this.element = options.element || domify('<div></div>')
  this.texts = data
  this.element.innerHTML = template(this)
  this.delegate = new Delegate(this.element)
  this.delegate.on('click', '.typingtext', this.onTextClicked)
  console.log('typingWelcomeView started')
}

View.prototype = {
  onTextClicked: function(e, row) {
    e.preventDefault()
    navigation.update("/typingGym/" + dope.dataset(row).id, {trigger: true})
  },
  detach: function(){
    this.delegate.destroy()
  }
}

module.exports = View
