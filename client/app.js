var domready = require('domready')
  , routing = require('./navigation')
  , WelcomeView = require('./welcome')
  , container = null
  , currentPage = null

function run(){
  container = document.getElementById('container')
  if (!container) {
    console.log('no container for the app')
  } else {
    handleRoutes()
  }
}

function handleRoutes() {
 // routing.route(/^customer\/(.+)/, function(path) {
 //   switchTo(TypingGymView, { name: path.split('/')[1] })
 // })

  routing.route(/^$/, function() {
    switchTo(WelcomeView)
  })

  routing.start({
    pushState: false 
  })
}

function switchTo(Presenter, options) {
  if(currentPage) {
    this.container.removeChild(this.container.children[0])
    if (currentPage.detach) currentPage.detach()
  }  
  currentPage = new Presenter(options)
  currentPage.render()
  this.container.appendChild(currentPage.element)
}

domready(run)

