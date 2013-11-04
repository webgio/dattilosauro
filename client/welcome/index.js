var setupPresenter = require('../setupPresenter')
  , template = require('./indexTemplate.hbs')
  , Excerpts = require('../excerpts')
  , dope = require('dope')
  , navigation = require('../navigation')

var View = function(options) {
    setupPresenter.call(this) 
    this.excerpts = new Excerpts()
    console.log('Welcome presenter created')
}

View.prototype = {
  init: function(){
    this.excerpts.on('reset', this.render.bind(this))
    this.excerpts.fetch()
    this.delegate.on('click', '.typingtext', this.onTextClicked)
    console.log('Welcome presenter initalized')
  },
  render: function(){
    this.element.innerHTML = template({
      texts: this.excerpts.collection
    })
    console.log('Welcome presenter rendered')
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
