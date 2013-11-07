var Gym = require('../client/gym')
  , sizzle = require('sizzle')
  , getkeycode = require('keycode')
var iekeyup = function(k) {
    var oEvent = document.createEvent('KeyboardEvent');

    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     
    Object.defineProperty(oEvent, 'which', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     

    if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent("keyup", true, true, document.defaultView, false, false, false, false, k, k);
    } else {
        oEvent.initKeyEvent("keyup", true, true, document.defaultView, false, false, false, false, k, 0);
    }

    oEvent.keyCodeVal = k;

    if (oEvent.keyCode !== k) {
        alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    }

    document.dispatchEvent(oEvent);
}
function keyup(el, letter)
{
    var keyCode = getkeycode(letter)
    var eventObj = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");
  
    if(eventObj.initEvent){
      eventObj.initEvent("keyup", true, true);
    }
  
    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;
    
    //el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeyup", eventObj); 
    if (eventObj.initEvent) {
      el.dispatchEvent(eventObj) 
    } else {
      iekeyup(keyCode)
    }
} 

describe('Gym page', function(){
  var gym
  beforeEach(function(){
    gym = new Gym({id: 1})
    spyOn(gym.model, 'load')
    gym.init()
    gym.model.data = {
       id: 1,
       title: "Moby dick",
       text: "Ishmael"
     }
    gym.render()
  })
  it('should show the excerpt text', function(){
    var text = sizzle('#excerpt-text', gym.element)
    expect(text[0].textContent).toContain('Ishmael')
  })
  describe('clicking the "n" key', function(){
    beforeEach(function(){
      keyup(document.body, 'o')
    })
    it('should show the letter "o" on the screen', function(){
      var typedText = sizzle('#typedText', gym.element)
      expect(typedText[0].innerHTML).toEqual("o")
    })
    describe('then typing the "e" key', function(){
      it('should show "ne" on the screen', function(){
        keyup(document.body, 'e')
        var typedText = sizzle('#typedText', gym.element)
        expect(typedText[0].innerHTML).toEqual("oe")
      })
    })
  })
  describe('clicking the space key', function(){
    it('should show a space on the screen', function(){
      keyup(document.body, ' ')
      var typedText = sizzle('#typedText', gym.element)
      expect(typedText[0].innerHTML).toEqual("&nbsp;")
    })
  })
})
