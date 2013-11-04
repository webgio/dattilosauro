var WelcomePage = require('../client/welcome')

describe("Welcome page", function(){
  var welcomePage
  var el
  beforeEach(function(){
    welcomePage = new WelcomePage()
    spyOn(welcomePage.excerpts , 'fetch')
    welcomePage.excerpts.collection = [
     {
       id: 1,
       title: "Moby dick",
       text: ""
     },
     {
       id: 22,
       title: "dick",
       text: ""
     }
    ]
    el = welcomePage.render().element
  })
  it("should show text excerpts titles", function(){
    expect(welcomePage).not.toBeNull()
    expect(el).not.toBeUndefined()
    var rows = el.getElementsByClassName('typingtext')
    expect(rows.length).toBe(2)
  })
})
