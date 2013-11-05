var Gym = require('../client/gym')
  , sizzle = require('sizzle')

describe('Gym page', function(){
  it('should show the excerpt text', function(){
    var gym = new Gym({id: 1})
    spyOn(gym.model, 'load')
    gym.init()
    gym.model.data = {
       id: 1,
       title: "Moby dick",
       text: "Ishmael"
     }
    gym.render()
    var text = sizzle('#excerpt-text', gym.element)
    expect(text[0].textContent).toContain('Ishmael')
  })
})
