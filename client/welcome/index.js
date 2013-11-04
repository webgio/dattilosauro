var domify = require('domify')
  , template = require('./indexTemplate.hbs')
  , Excerpts = require('../excerpts')
  , dope = require('dope')
  , navigation = require('../navigation')
  , Delegate = require('dom-delegate')

var View = function(options) {
  options = options || {}
  this.element = options.element || domify('<div></div>')
  this.excerpts = new Excerpts()
  this.excerpts.on('reset', this.render.bind(this))
  this.excerpts.fetch()
  this.delegate = new Delegate(this.element)
  this.delegate.on('click', '.typingtext', this.onTextClicked)
  console.log('typingWelcomeView started')
}

View.prototype = {
  render: function(){
    this.element.innerHTML = template({
      texts: this.excerpts.collection
    })
    return this
  },
  onTextClicked: function(e, row) {
    e.preventDefault()
    navigation.update("/typingGym/" + dope.dataset(row).id, {trigger: true})
  },
  detach: function(){
    this.delegate.destroy()
  }
}

module.exports = View
