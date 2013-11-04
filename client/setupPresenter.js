var domify = require('domify')
  , Delegate = require('dom-delegate')
var setupPresenter = function(){
    this.element = domify('<div></div>')
    this.delegate = new Delegate(this.element)
}
module.exports = setupPresenter
