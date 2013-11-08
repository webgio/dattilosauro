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
    keyupcode(el, keyCode)
} 
function keyupcode(el, keyCode) {
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
  var typedText
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
    typedText = sizzle('#typedText', gym.element)
  })
  it('should show the excerpt text', function(){
    var text = sizzle('#excerpt-text', gym.element)
    expect(text[0].textContent).toContain('Ishmael')
  })
  describe('typing the "o" key', function(){
    beforeEach(function(){
      keyup(document.body, 'o')
    })
    it('should show the letter "o" on the screen', function(){
      expect(typedText[0].textContent).toEqual("o")
    })
    describe('then typing the "e" key', function(){
      beforeEach(function(){
        keyup(document.body, 'e')
      })
      it('should show "oe" on the screen', function(){
        expect(typedText[0].textContent).toEqual("oe")
      })
      describe('then clicking backspace', function(){
        it('should show "o" on the screen', function(){
          keyupcode(document.body, 8)
          expect(typedText[0].innerHTML).toEqual("o")
        })
      })
    })
  })
  describe('clicking the space key', function(){
    beforeEach(function(){
      keyup(document.body, ' ')
    })
    it('should show a space on the screen', function(){
      expect(typedText[0].innerHTML).toEqual("&nbsp;")
    })
    describe('then clicking backspace', function(){
      it('should empty line', function(){
        keyupcode(document.body, 8)
        expect(typedText[0].innerHTML).toEqual("")
      })
    })
  })
  
})
