;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    currentPage.detach()
  }  
  currentPage = new Presenter(options)
  this.container.appendChild(currentPage.element)
}

domready(run)


},{"./navigation":2,"./welcome":4,"domready":9}],2:[function(require,module,exports){
var LocationBar = require('location-bar')
module.exports = new LocationBar()

},{"location-bar":12}],3:[function(require,module,exports){
module.exports = [
  {
    id: 1,
    title: "Moby dick",
    text: "Call me Ishmael. Some years ago--never mind how long precisely --having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen, and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off--then, I account it high time to get to sea as soon as I can."
  },
  {
    id: 2,
    title: "The Adventures of Tom Sawyer",
    text: "\"TOM!\" No answer.  \"TOM!\" No answer.  \"What's gone with that boy, I wonder? You TOM!\" No answer.  The old lady pulled her spectacles down and looked over them about the room; then she put them up and looked out under them. She seldom or never looked through them for so small a thing as a boy; they were her state pair, the pride of her heart, and were built for \"style,\" not service -- she could have seen through a pair of stove-lids just as well. She looked perplexed for a moment, and then said, not fiercely, but still loud enough for the furniture to hear: \"Well, I lay if I get hold of you I'll -- \" She did not finish, for by this time she was bending down and punching under the bed with the broom, and so she needed breath to punctuate the punches with. She resurrected nothing but the cat.  \"I never did see the beat of that boy!\""
  },
  {
    id: 3,
    title: "Divine Comedy",
    text: "IN the midway of this our mortal life, I found me in a gloomy wood, astray Gone from the path direct: and e'en to tell It were no easy task, how savage wild That forest, how robust and rough its growth, Which to remember only, my dismay Renews, in bitterness not far from death.  Yet to discourse of what there good befell, All else will I relate discover'd there.  How first I enter'd it I scarce can say, Such sleepy dullness in that instant weigh'd My senses down, when the true path I left, But when a mountain's foot I reach'd, where clos'd The valley, that had pierc'd my heart with dread, I look'd aloft, and saw his shoulders broad Already vested with that planet's beam, Who leads all wanderers safe through every way."
  }
]

},{}],4:[function(require,module,exports){
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

},{"../navigation":2,"../testdata.js":3,"./indexTemplate.hbs":5,"dom-delegate":7,"domify":8,"dope":10}],5:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <ul><a href=\"\" class=\"typingtext\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></ul>\n  ";
  return buffer;
  }

  buffer += "<div>Choose a text to practice typing</div>\n<ul>\n  ";
  stack1 = helpers.each.call(depth0, depth0.texts, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });

},{"handlebars-runtime":11}],6:[function(require,module,exports){
/*jshint browser:true, node:true*/

'use strict';

module.exports = Delegate;

/**
 * DOM event delegator
 *
 * The delegator will listen
 * for events that bubble up
 * to the root node.
 *
 * @constructor
 * @param {Node|string} [root] The root node or a selector string matching the root node
 */
function Delegate(root) {
  if (root) {
    this.root(root);
  }

  /**
   * Maintain a map of listener
   * lists, keyed by event name.
   *
   * @type Object
   */
  this.listenerMap = {};

  /** @type function() */
  this.handle = Delegate.prototype.handle.bind(this);
}

/**
 * @protected
 * @type ?boolean
 */
Delegate.tagsCaseSensitive = null;

/**
 * Start listening for events
 * on the provided DOM element
 *
 * @param  {Node|string} [root] The root node or a selector string matching the root node
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.root = function(root) {
  var listenerMap = this.listenerMap;
  var eventType;

  if (typeof root === 'string') {
    root = document.querySelector(root);
  }

  // Remove master event listeners
  if (this.rootElement) {
    for (eventType in listenerMap) {
      if (listenerMap.hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, this.captureForType(eventType));
      }
    }
  }

  // If no root or root is not
  // a dom node, then remove internal
  // root reference and exit here
  if (!root || !root.addEventListener) {
    if (this.rootElement) {
      delete this.rootElement;
    }
    return this;
  }

  /**
   * The root node at which
   * listeners are attached.
   *
   * @type Node
   */
  this.rootElement = root;

  // Set up master event listeners
  for (eventType in listenerMap) {
    if (listenerMap.hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, this.captureForType(eventType));
    }
  }

  return this;
};

/**
 * @param {string} eventType
 * @returns boolean
 */
Delegate.prototype.captureForType = function(eventType) {
  return eventType === 'error';
};

/**
 * Attach a handler to one
 * event for all elements
 * that match the selector,
 * now or in the future
 *
 * The handler function receives
 * three arguments: the DOM event
 * object, the node that matched
 * the selector while the event
 * was bubbling and a reference
 * to itself. Within the handler,
 * 'this' is equal to the second
 * argument.
 *
 * The node that actually received
 * the event can be accessed via
 * 'event.target'.
 *
 * @param {string} eventType Listen for these events (in a space-separated list)
 * @param {string|undefined} selector Only handle events on elements matching this selector, if undefined match root element
 * @param {function()} handler Handler function - event data passed here will be in event.data
 * @param {Object} [eventData] Data to pass in event.data
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.on = function(eventType, selector, handler, eventData) {
  var root, listenerMap, matcher, matcherParam, self = this;

  if (!eventType) {
    throw new TypeError('Invalid event type: ' + eventType);
  }

  // handler can be passed as
  // the second or third argument
  if (typeof selector === 'function') {
    handler = selector;
    selector = null;
    eventData = handler;
  }

  // Normalise undefined eventData to null
  if (eventData === undefined) {
    eventData = null;
  }

  if (typeof handler !== 'function') {
    throw new TypeError('Handler must be a type of Function');
  }

  root = this.rootElement;
  listenerMap = this.listenerMap;

  // Add master handler for type if not created yet
  if (!listenerMap[eventType]) {
    if (root) {
      root.addEventListener(eventType, this.handle, this.captureForType(eventType));
    }
    listenerMap[eventType] = [];
  }

  if (!selector) {
    matcherParam = null;

    // COMPLEX - matchesRoot needs to have access to
    // this.rootElement, so bind the function to this.
    matcher = this.matchesRoot.bind(this);

  // Compile a matcher for the given selector
  } else if (/^[a-z]+$/i.test(selector)) {

    // Lazily check whether tag names are case sensitive (as in XML or XHTML documents).
    if (Delegate.tagsCaseSensitive === null) {
      Delegate.tagsCaseSensitive = document.createElement('i').tagName === 'i';
    }

    if (!Delegate.tagsCaseSensitive) {
      matcherParam = selector.toUpperCase();
    } else {
      matcherParam = selector;
    }

    matcher = this.matchesTag;
  } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
    matcherParam = selector.slice(1);
    matcher = this.matchesId;
  } else {
    matcherParam = selector;
    matcher = this.matches;
  }

  // Add to the list of listeners
  listenerMap[eventType].push({
    selector: selector,
    eventData: eventData,
    handler: handler,
    matcher: matcher,
    matcherParam: matcherParam
  });

  return this;
};

/**
 * Remove an event handler
 * for elements that match
 * the selector, forever
 *
 * @param {string} [eventType] Remove handlers for events matching this type, considering the other parameters
 * @param {string} [selector] If this parameter is omitted, only handlers which match the other two will be removed
 * @param {function()} [handler] If this parameter is omitted, only handlers which match the previous two will be removed
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.off = function(eventType, selector, handler) {
  var i, listener, listenerMap, listenerList, singleEventType, self = this;

  // Handler can be passed as
  // the second or third argument
  if (typeof selector === 'function') {
    handler = selector;
    selector = null;
  }

  listenerMap = this.listenerMap;
  if (!eventType) {
    for (singleEventType in listenerMap) {
      if (listenerMap.hasOwnProperty(singleEventType)) {
        this.off(singleEventType, selector, handler);
      }
    }

    return this;
  }

  listenerList = listenerMap[eventType];
  if (!listenerList || !listenerList.length) {
    return this;
  }

  // Remove only parameter matches
  // if specified
  for (i = listenerList.length - 1; i >= 0; i--) {
    listener = listenerList[i];

    if ((!selector || selector === listener.selector) && (!handler || handler === listener.handler)) {
      listenerList.splice(i, 1);
    }
  }

  // All listeners removed
  if (!listenerList.length) {
    delete listenerMap[eventType];

    // Remove the main handler
    if (this.rootElement) {
      this.rootElement.removeEventListener(eventType, this.handle, this.captureForType(eventType));
    }
  }

  return this;
};


/**
 * Handle an arbitrary event.
 *
 * @param {Event} event
 */
Delegate.prototype.handle = function(event) {
  var i, l, root, listener, returned, listenerList, target, /** @const */ EVENTIGNORE = 'ftLabsDelegateIgnore';

  if (event[EVENTIGNORE] === true) {
    return;
  }

  target = event.target;
  if (target.nodeType === Node.TEXT_NODE) {
    target = target.parentNode;
  }

  root = this.rootElement;
  listenerList = this.listenerMap[event.type];

  // Need to continuously check
  // that the specific list is
  // still populated in case one
  // of the callbacks actually
  // causes the list to be destroyed.
  l = listenerList.length;
  while (target && l) {
    for (i = 0; i < l; i++) {
      listener = listenerList[i];

      // Bail from this loop if
      // the length changed and
      // no more listeners are
      // defined between i and l.
      if (!listener) {
        break;
      }

      // Check for match and fire
      // the event if there's one
      //
      // TODO:MCG:20120117: Need a way
      // to check if event#stopImmediateProgagation
      // was called. If so, break both loops.
      if (listener.matcher.call(target, listener.matcherParam, target)) {
        returned = this.fire(event, target, listener);
      }

      // Stop propagation to subsequent
      // callbacks if the callback returned
      // false
      if (returned === false) {
        event[EVENTIGNORE] = true;
        return;
      }
    }

    // TODO:MCG:20120117: Need a way to
    // check if event#stopProgagation
    // was called. If so, break looping
    // through the DOM. Stop if the
    // delegation root has been reached
    if (target === root) {
      break;
    }

    l = listenerList.length;
    target = target.parentElement;
  }
};

/**
 * Fire a listener on a target.
 *
 * @param {Event} event
 * @param {Node} target
 * @param {Object} listener
 * @returns {boolean}
 */
Delegate.prototype.fire = function(event, target, listener) {
  var returned, oldData;

  if (listener.eventData !== null) {
    oldData = event.data;
    event.data = listener.eventData;
    returned = listener.handler.call(target, event, target);
    event.data = oldData;
  } else {
    returned = listener.handler.call(target, event, target);
  }

  return returned;
};

/**
 * Check whether an element
 * matches a generic selector.
 *
 * @type function()
 * @param {string} selector A CSS selector
 */
Delegate.prototype.matches = (function(el) {
  if (!el) return;
  var p = el.prototype;
  return (p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector);
}(HTMLElement));

/**
 * Check whether an element
 * matches a tag selector.
 *
 * Tags are NOT case-sensitive,
 * except in XML (and XML-based
 * languages such as XHTML).
 *
 * @param {string} tagName The tag name to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */
Delegate.prototype.matchesTag = function(tagName, element) {
  return tagName === element.tagName;
};

/**
 * Check whether an element
 * matches the root.
 *
 * @param {?String} selector In this case this is always passed through as null and not used
 * @param {Element} element The element to test with
 * @returns boolean
 */
Delegate.prototype.matchesRoot = function(selector, element) {
  return this.rootElement === element;
};

/**
 * Check whether the ID of
 * the element in 'this'
 * matches the given ID.
 *
 * IDs are case-sensitive.
 *
 * @param {string} id The ID to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */
Delegate.prototype.matchesId = function(id, element) {
  return id === element.id;
};

/**
 * Short hand for off()
 * and root(), ie both
 * with no parameters
 *
 * @return void
 */
Delegate.prototype.destroy = function() {
  this.off();
  this.root();
};

},{}],7:[function(require,module,exports){
/*jshint browser:true, node:true*/

'use strict';

/**
 * @preserve Create and manage a DOM event delegator.
 *
 * @version 0.3.0
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
var Delegate = require('./delegate');

module.exports = function(root) {
  return new Delegate(root);
};

module.exports.Delegate = Delegate;

},{"./delegate":6}],8:[function(require,module,exports){

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Wrap map from jquery.
 */

var map = {
  option: [1, '<select multiple="multiple">', '</select>'],
  optgroup: [1, '<select multiple="multiple">', '</select>'],
  legend: [1, '<fieldset>', '</fieldset>'],
  thead: [1, '<table>', '</table>'],
  tbody: [1, '<table>', '</table>'],
  tfoot: [1, '<table>', '</table>'],
  colgroup: [1, '<table>', '</table>'],
  caption: [1, '<table>', '</table>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
  th: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  _default: [0, '', '']
};

/**
 * Parse `html` and return the children.
 *
 * @param {String} html
 * @return {Array}
 * @api private
 */

function parse(html) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) throw new Error('No elements were generated.');
  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = document.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = document.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  var els = el.children;
  if (1 == els.length) {
    return el.removeChild(els[0]);
  }

  var fragment = document.createDocumentFragment();
  while (els.length) {
    fragment.appendChild(el.removeChild(els[0]));
  }

  return fragment;
}

},{}],9:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2012 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()
}('domready', function (ready) {

  var fns = [], fn, f = false
    , doc = document
    , testEl = doc.documentElement
    , hack = testEl.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , addEventListener = 'addEventListener'
    , onreadystatechange = 'onreadystatechange'
    , readyState = 'readyState'
    , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
    , loaded = loadedRgx.test(doc[readyState])

  function flush(f) {
    loaded = 1
    while (f = fns.shift()) f()
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f)
    flush()
  }, f)


  hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, fn)
      flush()
    }
  })

  return (ready = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left')
          } catch (e) {
            return setTimeout(function() { ready(fn) }, 50)
          }
          fn()
        }()
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn)
    })
})

},{}],10:[function(require,module,exports){
/*!
 * dope         HTML attributes/dataset module
 * @link        http://github.com/ryanve/dope
 * @license     MIT
 * @copyright   2012 Ryan Van Etten
 * @version     2.2.1
 */

/*jshint expr:true, sub:true, supernew:true, debug:true, node:true, boss:true, devel:true, evil:true, 
  laxcomma:true, eqnull:true, undef:true, unused:true, browser:true, jquery:true, maxerr:100 */

(function(root, name, make) {
    typeof module != 'undefined' && module['exports'] ? module['exports'] = make() : root[name] = make();
}(this, 'dope', function() {

    // developers.google.com/closure/compiler/docs/api-tutorial3
    // developers.google.com/closure/compiler/docs/js-for-compiler

    var doc = document
      , xports = {}
      , effins = xports['fn'] = {}
      , owns = xports.hasOwnProperty
      , DMS = typeof DOMStringMap != 'undefined'
      , parseJSON = typeof JSON != 'undefined' && JSON.parse
      , queryMethod = 'querySelectorAll' 
      , QSA = !!doc[queryMethod] || !(queryMethod = 'getElementsByTagName')
      , queryEngine = function(s, root) {
            return s ? (root || doc)[queryMethod](s) : []; 
        }
      , camels = /([a-z])([A-Z])/g            // lowercase next to uppercase
      , dashB4 = /-(.)/g                      // finds chars after hyphens
      , csvSsv = /\s*[\s\,]+\s*/              // splitter for comma *or* space-separated values
      , cleanAttr = /^[\[\s]+|\s+|[\]\s]+$/g  // replace whitespace, trim [] brackets
      , cleanPre = /^[\[\s]?(data-)?|\s+|[\]\s]?$/g // replace whitespace, trim [] brackets, trim prefix
      , escDots = /\\*\./g                    // find periods w/ and w/o preceding backslashes
      , ssv = /\s+/
      , trimmer = /^\s+|\s+$/
      , trim = ''.trim ? function(s) {
            return null == s ? '' : s.trim(); 
        } : function(s) {
            return null == s ? '' : s.replace(trimmer, ''); 
        };
    
    /**
     * @return  {string}
     */
    function camelHandler(all, letter) { 
        return letter.toUpperCase();
    }

    /**
     * Convert  'data-pulp-fiction' to 'pulpFiction'. Non-scalars return an
     * empty string. number|boolean coerces to string. (opposite: datatize())
     * @param   {string|number|boolean|*}  s
     * @return  {string}
     */
    function camelize(s) {
        if (typeof s != 'string')
            return typeof s == 'number' || typeof s == 'boolean' ? '' + s : ''; 
        // Remove data- prefix and convert remaining dashed string to camelCase:
        return s.replace(cleanPre, '').replace(dashB4, camelHandler); // -a to A
    }

    /**
     * Convert  'pulpFiction' to 'data-pulp-fiction' OR 47 to 'data-47'
     * Invalid types return an empty string. (opposite: camelize())
     * @param   {string|number|*}  s
     * @return  {string}
     */
    function datatize(s) {
        if (typeof s == 'string') s = s.replace(cleanPre, '$1').replace(camels, '$1-$2'); // aA to a-A
        else s = typeof s == 'number'  ? '' + s : '';
        return s ? ('data-' + s.toLowerCase()) : s;
    }

    /**
     * Convert a stringified primitive into its correct type.
     * @param {string|*}  s
     */
    function parse(s) {
        var n; // undefined, or becomes number
        return typeof s != 'string' || !s ? s
            : 'false' === s ? false
            : 'true' === s ? true
            : 'null' === s ? null
            : 'undefined' === s || (n = (+s)) || 0 === n || 'NaN' === s ? n
            : s;
    }

    /**
     * @param   {Object|Array|*}  list
     * @param   {Function}        fn     
     * @param   {(Object|*)=}     scope
     * @param   {boolean=}        compact 
     * @return  {Array}
     */
    function map(list, fn, scope, compact) {
        var l, i = 0, v, u = 0, ret = [];
        if (list == null) return ret;
        compact = true === compact;
        for (l = list.length; i < l;) {
            v = fn.call(scope, list[i], i++, list);
            if (v || !compact) ret[u++] = v;
        }
        return ret;
    }
    
    /** 
     * special-case DOM-node iterator optimized for internal use
     * @param {Object|Array}  ob
     * @param {Function}      fn
     * @param {*=}            param
     */
    function eachNode(ob, fn, param) {
        for (var l = ob.length, i = 0; i < l; i++)
            ob[i] && ob[i].nodeType && fn(ob[i], param);
        return ob;
    }

    /**
     * internal-use function to iterate a node's attributes
     * @param {Object}        el
     * @param {Function}      fn
     * @param {(boolean|*)=}  exp
     */
    function eachAttr(el, fn, exp) {
        var test, n, a, i, l;
        if (!el.attributes) return;
        test = typeof exp == 'boolean' ? /^data-/ : test;
        for (i = 0, l = el.attributes.length; i < l;) {
            if (a = el.attributes[i++]) {
                n = '' + a.name;
                test && test.test(n) !== exp || null == a.value || fn.call(el, a.value, n, a);
            }
        }
    }

    /**
     * Get object containing an element's data attrs.
     * @param  {Node}  el
     * @return {DOMStringMap|Object|undefined}
     */
    function getDataset(el) {
        var ob;
        if (!el || 1 !== el.nodeType) return;  // undefined
        if (ob = DMS && el.dataset) return ob; // native
        ob = {}; // Fallback plain object cannot mutate the dataset via reference.
        eachAttr(el, function(v, k) {
            ob[camelize(k)] = '' + v;
        }, true);
        return ob;
    }

    /**
     * @param  {Node}     el
     * @param  {Object=}  ob
     */
    function resetDataset(el, ob) {
        if (!el) return;
        var n, curr = el.dataset;
        if (curr && DMS) {
            if (curr === ob) return;
            for (n in curr) delete curr[n];
        }
        ob && dataset(el, ob);
    }
    
    /**
     * @param  {Node}      el
     * @param  {Object}    ob
     * @param  {Function}  fn
     */
    function setViaObject(el, ob, fn) {
        for (var n in ob)
            owns.call(ob, n) && fn(el, n, ob[n]);
    }
    
    /**
     * @param  {Object|Array|Function}  el
     * @param  {(string|Object|*)=}     k
     * @param  {*=}                     v
     */    
    function attr(el, k, v) {
        el = el.nodeType ? el : el[0];
        if (!el || !el.setAttribute) return;
        k = typeof k == 'function' ? k.call(el) : k;
        if (!k) return;
        if (typeof k == 'object') {
            // SET-multi
            setViaObject(el, k, attr);
        } else {
            if (void 0 === v) {
                // GET
                k = el.getAttribute(k); // repurpose
                return null == k ? v : '' + k; // normalize
            }
            // SET
            v = typeof v == 'function' ? v.call(el) : v;
            v = '' + v; // normalize inputs
            el.setAttribute(k, v);
            return v; // the curr value
        }
    }
    
    /**
     * @param  {Object|Array|Function}  el
     * @param  {(string|Object|*)=}     k
     * @param  {*=}                     v
     */    
    function dataset(el, k, v) {
        var exact, kFun = typeof k == 'function';
        el = el.nodeType ? el : el[0];
        if (!el || !el.setAttribute) return;
        if (void 0 === k && v === k) return getDataset(el);
        k = kFun ? k.call(el) : k;

        if (typeof k == 'object' && (kFun || !(exact = void 0 === v && datatize(k[0])))) {
            // SET-multi
            kFun && deletes(el);
            k && setViaObject(el, k, dataset);
        } else {
            k = exact || datatize(k);
            if (!k) return;
            if (void 0 === v) {
                // GET
                k = el.getAttribute(k); // repurpose
                return null == k ? v : exact ? parse(k) : '' + k; // normalize
            }
            // SET
            v = typeof v == 'function' ? v.call(el) : v;
            v = '' + v; // normalize inputs
            el.setAttribute(k, v);
            return v; // current value
        }
    }

    /**
     * @param  {Node}                   el
     * @param  {(Array|string|number)=} keys
     */
    function deletes(el, keys) {
        var k, i = 0;
        el = el.nodeType ? el : el[0];
        if (!el || !el.removeAttribute)
            return;
        if (void 0 === keys) {
            resetDataset(el); 
        } else {
            keys = typeof keys == 'string' ? keys.split(ssv) : [].concat(keys);
            while (i < keys.length) {
                k = datatize(keys[i++]);
                k && el.removeAttribute(k);
            }
        }
    }
    
    /**
     * @param  {Node}                el
     * @param  {Array|string|number} keys
     */
    function removeAttr(el, keys) {
        var i = 0;
        el = el.nodeType ? el : el[0];
        if (el && el.removeAttribute) {
            for (keys = typeof keys == 'string' ? keys.split(ssv) : [].concat(keys); i < keys.length; i++) {
                keys[i] && el.removeAttribute(keys[i]);
            }
        }
    }

    /**
     * Convert list of attr names or data- keys into a selector.
     * @param   {Array|string|number|*}  list
     * @param   {boolean=}               prefix
     * @param   {boolean=}               join
     * @return  {string|Array}
     */
    function toAttrSelector(list, prefix, join) {
        var l, s, i = 0, j = 0, emp = '', arr = [];
        prefix = true === prefix;
        list = typeof list == 'string' ? list.split(csvSsv) : typeof list == 'number' ? '' + list : list;
        for (l = list.length; i < l;) {
            s = list[i++];
            s = prefix ? datatize(s) : s.replace(cleanAttr, emp);
            s && (arr[j++] = s);
        }
        // Escape periods to allow atts like `[data-the.wh_o]`
        // @link api.jquery.com/category/selectors/
        // @link stackoverflow.com/q/13283699/770127
        return false === join ? arr : j ? '[' + arr.join('],[').replace(escDots, '\\\\.') + ']' : emp;
    }

    /**
     * Get elements matched by a data key.
     * @param   {Array|string}  list   array or CSV or SSV data keys
     * @return  {Array|*}
     */     
    xports['queryData'] = QSA ? function(list, root) {
        // Modern browsers, IE8+
        return false === root ? toAttrSelector(list, true, root) : queryEngine(toAttrSelector(list, true), root);
    } : function(list, root) {
        // == FALLBACK ==
        list = toAttrSelector(list, true, false);
        return false === root ? list : queryAttrFallback(list, root); 
    };
    
    /**
     * Get elements matched by an attribute name.
     * @param   {Array|string}  list   array or CSV or SSV data keys
     * @return  {Array|*}
     */     
    xports['queryAttr'] = QSA ? function(list, root) {
        // Modern browsers, IE8+
        return false === root ? toAttrSelector(list, root, root) : queryEngine(toAttrSelector(list), root);
    } : function(list, root) {
        // == FALLBACK ==
        list = toAttrSelector(list, false, false);
        return false === root ? list : queryAttrFallback(list, root); 
    };
    
    /**
     * @param {Array|string}  list   is an array of attribute names (w/o bracks)
     * @param {Object=}       root
     */
    function queryAttrFallback(list, root) {
        var j, i, e, els, l = list.length, ret = [], u = 0;
        if (!l) return ret;
        els = queryEngine('*', root);
        for (j = 0; (e = els[j]); j++) {
            i = l; // reset i for each outer iteration
            while (i--) {// each attr name
                if (attr(e, list[i]) != null) {
                    ret[u++] = e; // ghetto push
                    break; // prevent pushing same elem twice
                }
            }
        }
        return ret;
    }
    
    // Expose remaining top-level methods:
    xports['map'] = map;
    xports['parse'] = parse;

    /**
     * @param  {string|*}  s
     * @since  2.1.0
     */
    xports['parseJSON'] = function(s) {
        s = parse(s);
        if (typeof s == 'string') {
            try {
                s = parseJSON(trim(s));
            } catch (e) {}
        }
        return s;
    };

    xports['trim'] = trim;
    xports['qsa'] = queryEngine;
    xports['attr'] = attr;
    xports['removeAttr'] = removeAttr;
    xports['dataset'] = dataset;
    xports['deletes'] = deletes;
    xports['camelize'] = camelize;
    xports['datatize'] = datatize;

    /**
     * @this    {Object|Array}
     * @param   {*=}   k
     * @param   {*=}   v
     */
    effins['dataset'] = function(k, v) {
        var kMulti = typeof k == 'object' ? !(void 0 === v && datatize(k[0])) : typeof k == 'function';
        if (void 0 === v && !kMulti)
            return dataset(this[0], k); // GET
        return (k = kMulti ? k : datatize(k)) ? eachNode(this, function(e, x) {
            x = typeof v == 'function' ? v.call(e) : v;
            kMulti ? dataset(e, k, x) : e.setAttribute(k, '' + x); 
        }) : void 0 === v ? v : this;
    };

    /**
     * @this    {Object|Array}
     * @param   {*=}   k
     * @param   {*=}   v
     */    
    effins['attr'] = function(k, v) {
        var kMulti = typeof k == 'object' || typeof k == 'function';
        if (void 0 === v && !kMulti)
            return attr(this[0], k); // GET
        return k ? eachNode(this, function(e, x) {
            x = typeof v == 'function' ? v.call(e) : v;
            kMulti ? attr(e, k, x) : e.setAttribute(k, '' + x); 
        }) : (void 0 === v ? v : this);
    };

    /**
     * Remove data- attrs for each element in a collection.
     * @this  {Object|Array}
     * @param {Array|string}  keys  one or more SSV or CSV data attr keys or names
     */
    effins['deletes'] = function(keys) {
        if (void 0 === keys)
            return eachNode(this, resetDataset);
        keys = typeof keys == 'string' ? keys.split(ssv) : [].concat(keys);
        return eachNode(this, removeAttr, map(keys, datatize));
    };
    
    /**
     * Remove attrbutes for each element in a collection.
     * @this  {Object|Array}
     * @param {Array|string}  keys  one or more SSV or CSV attr names
     */
    effins['removeAttr'] = function(keys) {
        return eachNode(this, removeAttr, keys);
    };

    return xports;
}));
},{}],11:[function(require,module,exports){
/*

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

// lib/handlebars/browser-prefix.js
var Handlebars = {};
module.exports = Handlebars;

(function(Handlebars, undefined) {
;
// lib/handlebars/base.js

Handlebars.VERSION = "1.0.0";
Handlebars.COMPILER_REVISION = 4;

Handlebars.REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '>= 1.0.0'
};

Handlebars.helpers  = {};
Handlebars.partials = {};

var toString = Object.prototype.toString,
    functionType = '[object Function]',
    objectType = '[object Object]';

Handlebars.registerHelper = function(name, fn, inverse) {
  if (toString.call(name) === objectType) {
    if (inverse || fn) { throw new Handlebars.Exception('Arg not supported with multiple helpers'); }
    Handlebars.Utils.extend(this.helpers, name);
  } else {
    if (inverse) { fn.not = inverse; }
    this.helpers[name] = fn;
  }
};

Handlebars.registerPartial = function(name, str) {
  if (toString.call(name) === objectType) {
    Handlebars.Utils.extend(this.partials,  name);
  } else {
    this.partials[name] = str;
  }
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Missing helper: '" + arg + "'");
  }
});

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;

  var type = toString.call(context);

  if(type === functionType) { context = context.call(this); }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      return Handlebars.helpers.each(context, options);
    } else {
      return inverse(this);
    }
  } else {
    return fn(context);
  }
});

Handlebars.K = function() {};

Handlebars.createFrame = Object.create || function(object) {
  Handlebars.K.prototype = object;
  var obj = new Handlebars.K();
  Handlebars.K.prototype = null;
  return obj;
};

Handlebars.logger = {
  DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3,

  methodMap: {0: 'debug', 1: 'info', 2: 'warn', 3: 'error'},

  // can be overridden in the host environment
  log: function(level, obj) {
    if (Handlebars.logger.level <= level) {
      var method = Handlebars.logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};

Handlebars.log = function(level, obj) { Handlebars.logger.log(level, obj); };

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var i = 0, ret = "", data;

  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if(context && typeof context === 'object') {
    if(context instanceof Array){
      for(var j = context.length; i<j; i++) {
        if (data) { data.index = i; }
        ret = ret + fn(context[i], { data: data });
      }
    } else {
      for(var key in context) {
        if(context.hasOwnProperty(key)) {
          if(data) { data.key = key; }
          ret = ret + fn(context[key], {data: data});
          i++;
        }
      }
    }
  }

  if(i === 0){
    ret = inverse(this);
  }

  return ret;
});

Handlebars.registerHelper('if', function(conditional, options) {
  var type = toString.call(conditional);
  if(type === functionType) { conditional = conditional.call(this); }

  if(!conditional || Handlebars.Utils.isEmpty(conditional)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(conditional, options) {
  return Handlebars.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn});
});

Handlebars.registerHelper('with', function(context, options) {
  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if (!Handlebars.Utils.isEmpty(context)) return options.fn(context);
});

Handlebars.registerHelper('log', function(context, options) {
  var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
  Handlebars.log(level, context);
});
;
// lib/handlebars/utils.js

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }
};
Handlebars.Exception.prototype = new Error();

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

var escapeChar = function(chr) {
  return escape[chr] || "&amp;";
};

Handlebars.Utils = {
  extend: function(obj, value) {
    for(var key in value) {
      if(value.hasOwnProperty(key)) {
        obj[key] = value[key];
      }
    }
  },

  escapeExpression: function(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof Handlebars.SafeString) {
      return string.toString();
    } else if (string == null || string === false) {
      return "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = string.toString();

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  },

  isEmpty: function(value) {
    if (!value && value !== 0) {
      return true;
    } else if(toString.call(value) === "[object Array]" && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }
};
;
// lib/handlebars/runtime.js

Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          programWrapper = Handlebars.VM.program(i, fn, data);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = Handlebars.VM.program(i, fn);
        }
        return programWrapper;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common) {
          ret = {};
          Handlebars.Utils.extend(ret, common);
          Handlebars.Utils.extend(ret, param);
        }
        return ret;
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var result = templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);

      var compilerInfo = container.compilerInfo || [],
          compilerRevision = compilerInfo[0] || 1,
          currentRevision = Handlebars.COMPILER_REVISION;

      if (compilerRevision !== currentRevision) {
        if (compilerRevision < currentRevision) {
          var runtimeVersions = Handlebars.REVISION_CHANGES[currentRevision],
              compilerVersions = Handlebars.REVISION_CHANGES[compilerRevision];
          throw "Template was precompiled with an older version of Handlebars than the current runtime. "+
                "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").";
        } else {
          // Use the embedded version info since the runtime doesn't know about this revision yet
          throw "Template was precompiled with a newer version of Handlebars than the current runtime. "+
                "Please update your runtime to a newer version ("+compilerInfo[1]+").";
        }
      }

      return result;
    };
  },

  programWithDepth: function(i, fn, data /*, $depth */) {
    var args = Array.prototype.slice.call(arguments, 3);

    var program = function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
    program.program = i;
    program.depth = args.length;
    return program;
  },
  program: function(i, fn, data) {
    var program = function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
    program.program = i;
    program.depth = 0;
    return program;
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials, data) {
    var options = { helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    } else {
      partials[name] = Handlebars.compile(partial, {data: data !== undefined});
      return partials[name](context, options);
    }
  }
};

Handlebars.template = Handlebars.VM.template;
;
// lib/handlebars/browser-suffix.js
})(Handlebars);
;

},{}],12:[function(require,module,exports){
// LocationBar module extracted from Backbone.js 1.0.0
// (actually it's commit f6fa0cb87e26bb3d1b7f47144fd720d1ab48e88f)
//
// the dependency on backbone, underscore and jquery have been removed to turn
// this into a small standalone library for handling browser's history API
// cross browser and with a fallback to hashchange events or polling.

(function(define) {
define(function() {

  // 3 helper functions we use to avoid pulling in entire _ and $
  function extend(obj, source) {
    for (var prop in source) {
      obj[prop] = source[prop];
    }
    return obj;
  }
  function on(obj, type, fn) {
    if (obj.attachEvent) {
      obj['e'+type+fn] = fn;
      obj[type+fn] = function(){ obj['e'+type+fn]( window.event ); };
      obj.attachEvent( 'on'+type, obj[type+fn] );
    } else {
      obj.addEventListener( type, fn, false );
    }
  }
  function off(obj, type, fn) {
    if (obj.detachEvent) {
      obj.detachEvent('on'+type, obj[type+fn]);
      obj[type+fn] = null;
    } else {
      obj.removeEventListener(type, fn, false);
    }
  }





  // this is mostly original code with minor modifications, mostyle to avoid
  // dependency on 3rd party libraries + renaming Backbone.History -> LocationBar
  //
  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var LocationBar = function() {
    this.handlers = [];

    // MODIFICATION OF ORIGINAL BACKBONE.HISTORY
    //
    // _.bindAll(this, 'checkUrl');
    //
    var self = this;
    var checkUrl = this.checkUrl;
    this.checkUrl = function () {
      checkUrl.apply(self, arguments);
    };

    // Ensure that `LocationBar` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash and query.
  var pathStripper = /[?#].*$/;

  // Has the history handling already been started?
  LocationBar.started = false;

  // Set up all inheritable **LocationBar** properties and methods.
  extend(LocationBar.prototype, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (LocationBar.started) throw new Error("LocationBar has already been started");
      LocationBar.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = extend({root: '/'}, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        // MODIFICATION OF ORIGINAL BACKBONE.HISTORY
        //
        // this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        //
        this.iframe = document.createElement("iframe");
        this.iframe.setAttribute("src", "javascript:0");
        this.iframe.setAttribute("tabindex", -1);
        this.iframe.style.display = "none";
        document.body.appendChild(this.iframe);
        this.iframe = this.iframe.contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        on(window, 'popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        on(window, 'hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !atRoot) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + this.location.search + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && atRoot && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      off(window, 'popstate', this.checkUrl);
      off(window, 'hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      LocationBar.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function() {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      // MODIFICATION OF ORIGINAL BACKBONE.HISTORY
      //
      // return _.any(this.handlers, function(handler) {
      //   if (handler.route.test(fragment)) {
      //     handler.callback(fragment);
      //     return true;
      //   }
      // });
      //
      fragment = this.fragment = this.getFragment(fragment);
      for (var i = 0, l = this.handlers.length; i < l; i++) {
        var handler = this.handlers[i];
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      }
      return false;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!LocationBar.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the fragment of the query and hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });



  // add some features to LocationBar

  // a more intuitive alias for navigate
  LocationBar.prototype.update = function () {
    this.navigate.apply(this, arguments);
  };

  // a generic callback for any changes
  LocationBar.prototype.onChange = function (callback) {
    this.route(/^(.*?)$/, callback);
  };

  // checks if the browser has pushstate support
  LocationBar.prototype.hasPushState = function () {
    if (!LocationBar.started) {
      throw new Error("only available after locationBar.start()");
    }
    return this._hasPushState;
  };






  // export
  return LocationBar;
});
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });
},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9jbGllbnQvYXBwLmpzIiwiL1VzZXJzL2dpb3JnaW8vcHJvamVjdHMvcGxheWdyb3VuZC9kYXR0aWxvc2F1cm8vY2xpZW50L25hdmlnYXRpb24uanMiLCIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9jbGllbnQvdGVzdGRhdGEuanMiLCIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9jbGllbnQvd2VsY29tZS9pbmRleC5qcyIsIi9Vc2Vycy9naW9yZ2lvL3Byb2plY3RzL3BsYXlncm91bmQvZGF0dGlsb3NhdXJvL2NsaWVudC93ZWxjb21lL2luZGV4VGVtcGxhdGUuaGJzIiwiL1VzZXJzL2dpb3JnaW8vcHJvamVjdHMvcGxheWdyb3VuZC9kYXR0aWxvc2F1cm8vbm9kZV9tb2R1bGVzL2RvbS1kZWxlZ2F0ZS9saWIvZGVsZWdhdGUuanMiLCIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9ub2RlX21vZHVsZXMvZG9tLWRlbGVnYXRlL2xpYi9pbmRleC5qcyIsIi9Vc2Vycy9naW9yZ2lvL3Byb2plY3RzL3BsYXlncm91bmQvZGF0dGlsb3NhdXJvL25vZGVfbW9kdWxlcy9kb21pZnkvaW5kZXguanMiLCIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9ub2RlX21vZHVsZXMvZG9tcmVhZHkvcmVhZHkuanMiLCIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9ub2RlX21vZHVsZXMvZG9wZS9kb3BlLmpzIiwiL1VzZXJzL2dpb3JnaW8vcHJvamVjdHMvcGxheWdyb3VuZC9kYXR0aWxvc2F1cm8vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMtcnVudGltZS9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9ub2RlX21vZHVsZXMvbG9jYXRpb24tYmFyL2xvY2F0aW9uLWJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbmFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZG9tcmVhZHkgPSByZXF1aXJlKCdkb21yZWFkeScpXG4gICwgcm91dGluZyA9IHJlcXVpcmUoJy4vbmF2aWdhdGlvbicpXG4gICwgV2VsY29tZVZpZXcgPSByZXF1aXJlKCcuL3dlbGNvbWUnKVxuICAsIGNvbnRhaW5lciA9IG51bGxcbiAgLCBjdXJyZW50UGFnZSA9IG51bGxcblxuZnVuY3Rpb24gcnVuKCl7XG4gIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKVxuICBpZiAoIWNvbnRhaW5lcikge1xuICAgIGNvbnNvbGUubG9nKCdubyBjb250YWluZXIgZm9yIHRoZSBhcHAnKVxuICB9IGVsc2Uge1xuICAgIGhhbmRsZVJvdXRlcygpXG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlUm91dGVzKCkge1xuIC8vIHJvdXRpbmcucm91dGUoL15jdXN0b21lclxcLyguKykvLCBmdW5jdGlvbihwYXRoKSB7XG4gLy8gICBzd2l0Y2hUbyhUeXBpbmdHeW1WaWV3LCB7IG5hbWU6IHBhdGguc3BsaXQoJy8nKVsxXSB9KVxuIC8vIH0pXG5cbiAgcm91dGluZy5yb3V0ZSgvXiQvLCBmdW5jdGlvbigpIHtcbiAgICBzd2l0Y2hUbyhXZWxjb21lVmlldylcbiAgfSlcblxuICByb3V0aW5nLnN0YXJ0KHtcbiAgICBwdXNoU3RhdGU6IGZhbHNlIFxuICB9KVxufVxuXG5mdW5jdGlvbiBzd2l0Y2hUbyhQcmVzZW50ZXIsIG9wdGlvbnMpIHtcbiAgaWYoY3VycmVudFBhZ2UpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lci5jaGlsZHJlblswXSlcbiAgICBjdXJyZW50UGFnZS5kZXRhY2goKVxuICB9ICBcbiAgY3VycmVudFBhZ2UgPSBuZXcgUHJlc2VudGVyKG9wdGlvbnMpXG4gIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGN1cnJlbnRQYWdlLmVsZW1lbnQpXG59XG5cbmRvbXJlYWR5KHJ1bilcblxuIiwidmFyIExvY2F0aW9uQmFyID0gcmVxdWlyZSgnbG9jYXRpb24tYmFyJylcbm1vZHVsZS5leHBvcnRzID0gbmV3IExvY2F0aW9uQmFyKClcbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICB7XG4gICAgaWQ6IDEsXG4gICAgdGl0bGU6IFwiTW9ieSBkaWNrXCIsXG4gICAgdGV4dDogXCJDYWxsIG1lIElzaG1hZWwuIFNvbWUgeWVhcnMgYWdvLS1uZXZlciBtaW5kIGhvdyBsb25nIHByZWNpc2VseSAtLWhhdmluZyBsaXR0bGUgb3Igbm8gbW9uZXkgaW4gbXkgcHVyc2UsIGFuZCBub3RoaW5nIHBhcnRpY3VsYXIgdG8gaW50ZXJlc3QgbWUgb24gc2hvcmUsIEkgdGhvdWdodCBJIHdvdWxkIHNhaWwgYWJvdXQgYSBsaXR0bGUgYW5kIHNlZSB0aGUgd2F0ZXJ5IHBhcnQgb2YgdGhlIHdvcmxkLiBJdCBpcyBhIHdheSBJIGhhdmUgb2YgZHJpdmluZyBvZmYgdGhlIHNwbGVlbiwgYW5kIHJlZ3VsYXRpbmcgdGhlIGNpcmN1bGF0aW9uLiBXaGVuZXZlciBJIGZpbmQgbXlzZWxmIGdyb3dpbmcgZ3JpbSBhYm91dCB0aGUgbW91dGg7IHdoZW5ldmVyIGl0IGlzIGEgZGFtcCwgZHJpenpseSBOb3ZlbWJlciBpbiBteSBzb3VsOyB3aGVuZXZlciBJIGZpbmQgbXlzZWxmIGludm9sdW50YXJpbHkgcGF1c2luZyBiZWZvcmUgY29mZmluIHdhcmVob3VzZXMsIGFuZCBicmluZ2luZyB1cCB0aGUgcmVhciBvZiBldmVyeSBmdW5lcmFsIEkgbWVldDsgYW5kIGVzcGVjaWFsbHkgd2hlbmV2ZXIgbXkgaHlwb3MgZ2V0IHN1Y2ggYW4gdXBwZXIgaGFuZCBvZiBtZSwgdGhhdCBpdCByZXF1aXJlcyBhIHN0cm9uZyBtb3JhbCBwcmluY2lwbGUgdG8gcHJldmVudCBtZSBmcm9tIGRlbGliZXJhdGVseSBzdGVwcGluZyBpbnRvIHRoZSBzdHJlZXQsIGFuZCBtZXRob2RpY2FsbHkga25vY2tpbmcgcGVvcGxlJ3MgaGF0cyBvZmYtLXRoZW4sIEkgYWNjb3VudCBpdCBoaWdoIHRpbWUgdG8gZ2V0IHRvIHNlYSBhcyBzb29uIGFzIEkgY2FuLlwiXG4gIH0sXG4gIHtcbiAgICBpZDogMixcbiAgICB0aXRsZTogXCJUaGUgQWR2ZW50dXJlcyBvZiBUb20gU2F3eWVyXCIsXG4gICAgdGV4dDogXCJcXFwiVE9NIVxcXCIgTm8gYW5zd2VyLiAgXFxcIlRPTSFcXFwiIE5vIGFuc3dlci4gIFxcXCJXaGF0J3MgZ29uZSB3aXRoIHRoYXQgYm95LCBJIHdvbmRlcj8gWW91IFRPTSFcXFwiIE5vIGFuc3dlci4gIFRoZSBvbGQgbGFkeSBwdWxsZWQgaGVyIHNwZWN0YWNsZXMgZG93biBhbmQgbG9va2VkIG92ZXIgdGhlbSBhYm91dCB0aGUgcm9vbTsgdGhlbiBzaGUgcHV0IHRoZW0gdXAgYW5kIGxvb2tlZCBvdXQgdW5kZXIgdGhlbS4gU2hlIHNlbGRvbSBvciBuZXZlciBsb29rZWQgdGhyb3VnaCB0aGVtIGZvciBzbyBzbWFsbCBhIHRoaW5nIGFzIGEgYm95OyB0aGV5IHdlcmUgaGVyIHN0YXRlIHBhaXIsIHRoZSBwcmlkZSBvZiBoZXIgaGVhcnQsIGFuZCB3ZXJlIGJ1aWx0IGZvciBcXFwic3R5bGUsXFxcIiBub3Qgc2VydmljZSAtLSBzaGUgY291bGQgaGF2ZSBzZWVuIHRocm91Z2ggYSBwYWlyIG9mIHN0b3ZlLWxpZHMganVzdCBhcyB3ZWxsLiBTaGUgbG9va2VkIHBlcnBsZXhlZCBmb3IgYSBtb21lbnQsIGFuZCB0aGVuIHNhaWQsIG5vdCBmaWVyY2VseSwgYnV0IHN0aWxsIGxvdWQgZW5vdWdoIGZvciB0aGUgZnVybml0dXJlIHRvIGhlYXI6IFxcXCJXZWxsLCBJIGxheSBpZiBJIGdldCBob2xkIG9mIHlvdSBJJ2xsIC0tIFxcXCIgU2hlIGRpZCBub3QgZmluaXNoLCBmb3IgYnkgdGhpcyB0aW1lIHNoZSB3YXMgYmVuZGluZyBkb3duIGFuZCBwdW5jaGluZyB1bmRlciB0aGUgYmVkIHdpdGggdGhlIGJyb29tLCBhbmQgc28gc2hlIG5lZWRlZCBicmVhdGggdG8gcHVuY3R1YXRlIHRoZSBwdW5jaGVzIHdpdGguIFNoZSByZXN1cnJlY3RlZCBub3RoaW5nIGJ1dCB0aGUgY2F0LiAgXFxcIkkgbmV2ZXIgZGlkIHNlZSB0aGUgYmVhdCBvZiB0aGF0IGJveSFcXFwiXCJcbiAgfSxcbiAge1xuICAgIGlkOiAzLFxuICAgIHRpdGxlOiBcIkRpdmluZSBDb21lZHlcIixcbiAgICB0ZXh0OiBcIklOIHRoZSBtaWR3YXkgb2YgdGhpcyBvdXIgbW9ydGFsIGxpZmUsIEkgZm91bmQgbWUgaW4gYSBnbG9vbXkgd29vZCwgYXN0cmF5IEdvbmUgZnJvbSB0aGUgcGF0aCBkaXJlY3Q6IGFuZCBlJ2VuIHRvIHRlbGwgSXQgd2VyZSBubyBlYXN5IHRhc2ssIGhvdyBzYXZhZ2Ugd2lsZCBUaGF0IGZvcmVzdCwgaG93IHJvYnVzdCBhbmQgcm91Z2ggaXRzIGdyb3d0aCwgV2hpY2ggdG8gcmVtZW1iZXIgb25seSwgbXkgZGlzbWF5IFJlbmV3cywgaW4gYml0dGVybmVzcyBub3QgZmFyIGZyb20gZGVhdGguICBZZXQgdG8gZGlzY291cnNlIG9mIHdoYXQgdGhlcmUgZ29vZCBiZWZlbGwsIEFsbCBlbHNlIHdpbGwgSSByZWxhdGUgZGlzY292ZXInZCB0aGVyZS4gIEhvdyBmaXJzdCBJIGVudGVyJ2QgaXQgSSBzY2FyY2UgY2FuIHNheSwgU3VjaCBzbGVlcHkgZHVsbG5lc3MgaW4gdGhhdCBpbnN0YW50IHdlaWdoJ2QgTXkgc2Vuc2VzIGRvd24sIHdoZW4gdGhlIHRydWUgcGF0aCBJIGxlZnQsIEJ1dCB3aGVuIGEgbW91bnRhaW4ncyBmb290IEkgcmVhY2gnZCwgd2hlcmUgY2xvcydkIFRoZSB2YWxsZXksIHRoYXQgaGFkIHBpZXJjJ2QgbXkgaGVhcnQgd2l0aCBkcmVhZCwgSSBsb29rJ2QgYWxvZnQsIGFuZCBzYXcgaGlzIHNob3VsZGVycyBicm9hZCBBbHJlYWR5IHZlc3RlZCB3aXRoIHRoYXQgcGxhbmV0J3MgYmVhbSwgV2hvIGxlYWRzIGFsbCB3YW5kZXJlcnMgc2FmZSB0aHJvdWdoIGV2ZXJ5IHdheS5cIlxuICB9XG5dXG4iLCJ2YXIgZG9taWZ5ID0gcmVxdWlyZSgnZG9taWZ5JylcbiAgLCB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vaW5kZXhUZW1wbGF0ZS5oYnMnKVxuICAsIGRhdGEgPSByZXF1aXJlKCcuLi90ZXN0ZGF0YS5qcycpXG4gICwgZG9wZSA9IHJlcXVpcmUoJ2RvcGUnKVxuICAsIG5hdmlnYXRpb24gPSByZXF1aXJlKCcuLi9uYXZpZ2F0aW9uJylcbiAgLCBEZWxlZ2F0ZSA9IHJlcXVpcmUoJ2RvbS1kZWxlZ2F0ZScpXG5cbnZhciBWaWV3ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB0aGlzLmVsZW1lbnQgPSBvcHRpb25zLmVsZW1lbnQgfHwgZG9taWZ5KCc8ZGl2PjwvZGl2PicpXG4gIHRoaXMudGV4dHMgPSBkYXRhXG4gIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSB0ZW1wbGF0ZSh0aGlzKVxuICB0aGlzLmRlbGVnYXRlID0gbmV3IERlbGVnYXRlKHRoaXMuZWxlbWVudClcbiAgdGhpcy5kZWxlZ2F0ZS5vbignY2xpY2snLCAnLnR5cGluZ3RleHQnLCB0aGlzLm9uVGV4dENsaWNrZWQpXG4gIGNvbnNvbGUubG9nKCd0eXBpbmdXZWxjb21lVmlldyBzdGFydGVkJylcbn1cblxuVmlldy5wcm90b3R5cGUgPSB7XG4gIG9uVGV4dENsaWNrZWQ6IGZ1bmN0aW9uKGUsIHJvdykge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIG5hdmlnYXRpb24udXBkYXRlKFwiL3R5cGluZ0d5bS9cIiArIGRvcGUuZGF0YXNldChyb3cpLmlkLCB7dHJpZ2dlcjogdHJ1ZX0pXG4gIH0sXG4gIGRldGFjaDogZnVuY3Rpb24oKXtcbiAgICB0aGlzLmRlbGVnYXRlLmRlc3Ryb3koKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmlld1xuIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYW5kbGViYXJzLXJ1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFycy50ZW1wbGF0ZShmdW5jdGlvbiAoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBIYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9IFwiXCIsIHN0YWNrMSwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIHNlbGY9dGhpcztcblxuZnVuY3Rpb24gcHJvZ3JhbTEoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSBcIlwiLCBzdGFjazE7XG4gIGJ1ZmZlciArPSBcIlxcbiAgPHVsPjxhIGhyZWY9XFxcIlxcXCIgY2xhc3M9XFxcInR5cGluZ3RleHRcXFwiIGRhdGEtaWQ9XFxcIlwiO1xuICBpZiAoc3RhY2sxID0gaGVscGVycy5pZCkgeyBzdGFjazEgPSBzdGFjazEuY2FsbChkZXB0aDAsIHtoYXNoOnt9LGRhdGE6ZGF0YX0pOyB9XG4gIGVsc2UgeyBzdGFjazEgPSBkZXB0aDAuaWQ7IHN0YWNrMSA9IHR5cGVvZiBzdGFjazEgPT09IGZ1bmN0aW9uVHlwZSA/IHN0YWNrMS5hcHBseShkZXB0aDApIDogc3RhY2sxOyB9XG4gIGJ1ZmZlciArPSBlc2NhcGVFeHByZXNzaW9uKHN0YWNrMSlcbiAgICArIFwiXFxcIj5cIjtcbiAgaWYgKHN0YWNrMSA9IGhlbHBlcnMudGl0bGUpIHsgc3RhY2sxID0gc3RhY2sxLmNhbGwoZGVwdGgwLCB7aGFzaDp7fSxkYXRhOmRhdGF9KTsgfVxuICBlbHNlIHsgc3RhY2sxID0gZGVwdGgwLnRpdGxlOyBzdGFjazEgPSB0eXBlb2Ygc3RhY2sxID09PSBmdW5jdGlvblR5cGUgPyBzdGFjazEuYXBwbHkoZGVwdGgwKSA6IHN0YWNrMTsgfVxuICBidWZmZXIgKz0gZXNjYXBlRXhwcmVzc2lvbihzdGFjazEpXG4gICAgKyBcIjwvYT48L3VsPlxcbiAgXCI7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cblxuICBidWZmZXIgKz0gXCI8ZGl2PkNob29zZSBhIHRleHQgdG8gcHJhY3RpY2UgdHlwaW5nPC9kaXY+XFxuPHVsPlxcbiAgXCI7XG4gIHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCwgZGVwdGgwLnRleHRzLCB7aGFzaDp7fSxpbnZlcnNlOnNlbGYubm9vcCxmbjpzZWxmLnByb2dyYW0oMSwgcHJvZ3JhbTEsIGRhdGEpLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgYnVmZmVyICs9IFwiXFxuPC91bD5cXG5cIjtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfSk7XG4iLCIvKmpzaGludCBicm93c2VyOnRydWUsIG5vZGU6dHJ1ZSovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBEZWxlZ2F0ZTtcblxuLyoqXG4gKiBET00gZXZlbnQgZGVsZWdhdG9yXG4gKlxuICogVGhlIGRlbGVnYXRvciB3aWxsIGxpc3RlblxuICogZm9yIGV2ZW50cyB0aGF0IGJ1YmJsZSB1cFxuICogdG8gdGhlIHJvb3Qgbm9kZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7Tm9kZXxzdHJpbmd9IFtyb290XSBUaGUgcm9vdCBub2RlIG9yIGEgc2VsZWN0b3Igc3RyaW5nIG1hdGNoaW5nIHRoZSByb290IG5vZGVcbiAqL1xuZnVuY3Rpb24gRGVsZWdhdGUocm9vdCkge1xuICBpZiAocm9vdCkge1xuICAgIHRoaXMucm9vdChyb290KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWludGFpbiBhIG1hcCBvZiBsaXN0ZW5lclxuICAgKiBsaXN0cywga2V5ZWQgYnkgZXZlbnQgbmFtZS5cbiAgICpcbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuICB0aGlzLmxpc3RlbmVyTWFwID0ge307XG5cbiAgLyoqIEB0eXBlIGZ1bmN0aW9uKCkgKi9cbiAgdGhpcy5oYW5kbGUgPSBEZWxlZ2F0ZS5wcm90b3R5cGUuaGFuZGxlLmJpbmQodGhpcyk7XG59XG5cbi8qKlxuICogQHByb3RlY3RlZFxuICogQHR5cGUgP2Jvb2xlYW5cbiAqL1xuRGVsZWdhdGUudGFnc0Nhc2VTZW5zaXRpdmUgPSBudWxsO1xuXG4vKipcbiAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgZXZlbnRzXG4gKiBvbiB0aGUgcHJvdmlkZWQgRE9NIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gIHtOb2RlfHN0cmluZ30gW3Jvb3RdIFRoZSByb290IG5vZGUgb3IgYSBzZWxlY3RvciBzdHJpbmcgbWF0Y2hpbmcgdGhlIHJvb3Qgbm9kZVxuICogQHJldHVybnMge0RlbGVnYXRlfSBUaGlzIG1ldGhvZCBpcyBjaGFpbmFibGVcbiAqL1xuRGVsZWdhdGUucHJvdG90eXBlLnJvb3QgPSBmdW5jdGlvbihyb290KSB7XG4gIHZhciBsaXN0ZW5lck1hcCA9IHRoaXMubGlzdGVuZXJNYXA7XG4gIHZhciBldmVudFR5cGU7XG5cbiAgaWYgKHR5cGVvZiByb290ID09PSAnc3RyaW5nJykge1xuICAgIHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3QpO1xuICB9XG5cbiAgLy8gUmVtb3ZlIG1hc3RlciBldmVudCBsaXN0ZW5lcnNcbiAgaWYgKHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICBmb3IgKGV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcCkge1xuICAgICAgaWYgKGxpc3RlbmVyTWFwLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIHRoaXMuY2FwdHVyZUZvclR5cGUoZXZlbnRUeXBlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgbm8gcm9vdCBvciByb290IGlzIG5vdFxuICAvLyBhIGRvbSBub2RlLCB0aGVuIHJlbW92ZSBpbnRlcm5hbFxuICAvLyByb290IHJlZmVyZW5jZSBhbmQgZXhpdCBoZXJlXG4gIGlmICghcm9vdCB8fCAhcm9vdC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnJvb3RFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcm9vdCBub2RlIGF0IHdoaWNoXG4gICAqIGxpc3RlbmVycyBhcmUgYXR0YWNoZWQuXG4gICAqXG4gICAqIEB0eXBlIE5vZGVcbiAgICovXG4gIHRoaXMucm9vdEVsZW1lbnQgPSByb290O1xuXG4gIC8vIFNldCB1cCBtYXN0ZXIgZXZlbnQgbGlzdGVuZXJzXG4gIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwKSB7XG4gICAgaWYgKGxpc3RlbmVyTWFwLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB0aGlzLmNhcHR1cmVGb3JUeXBlKGV2ZW50VHlwZSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbkRlbGVnYXRlLnByb3RvdHlwZS5jYXB0dXJlRm9yVHlwZSA9IGZ1bmN0aW9uKGV2ZW50VHlwZSkge1xuICByZXR1cm4gZXZlbnRUeXBlID09PSAnZXJyb3InO1xufTtcblxuLyoqXG4gKiBBdHRhY2ggYSBoYW5kbGVyIHRvIG9uZVxuICogZXZlbnQgZm9yIGFsbCBlbGVtZW50c1xuICogdGhhdCBtYXRjaCB0aGUgc2VsZWN0b3IsXG4gKiBub3cgb3IgaW4gdGhlIGZ1dHVyZVxuICpcbiAqIFRoZSBoYW5kbGVyIGZ1bmN0aW9uIHJlY2VpdmVzXG4gKiB0aHJlZSBhcmd1bWVudHM6IHRoZSBET00gZXZlbnRcbiAqIG9iamVjdCwgdGhlIG5vZGUgdGhhdCBtYXRjaGVkXG4gKiB0aGUgc2VsZWN0b3Igd2hpbGUgdGhlIGV2ZW50XG4gKiB3YXMgYnViYmxpbmcgYW5kIGEgcmVmZXJlbmNlXG4gKiB0byBpdHNlbGYuIFdpdGhpbiB0aGUgaGFuZGxlcixcbiAqICd0aGlzJyBpcyBlcXVhbCB0byB0aGUgc2Vjb25kXG4gKiBhcmd1bWVudC5cbiAqXG4gKiBUaGUgbm9kZSB0aGF0IGFjdHVhbGx5IHJlY2VpdmVkXG4gKiB0aGUgZXZlbnQgY2FuIGJlIGFjY2Vzc2VkIHZpYVxuICogJ2V2ZW50LnRhcmdldCcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSBMaXN0ZW4gZm9yIHRoZXNlIGV2ZW50cyAoaW4gYSBzcGFjZS1zZXBhcmF0ZWQgbGlzdClcbiAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gc2VsZWN0b3IgT25seSBoYW5kbGUgZXZlbnRzIG9uIGVsZW1lbnRzIG1hdGNoaW5nIHRoaXMgc2VsZWN0b3IsIGlmIHVuZGVmaW5lZCBtYXRjaCByb290IGVsZW1lbnRcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKX0gaGFuZGxlciBIYW5kbGVyIGZ1bmN0aW9uIC0gZXZlbnQgZGF0YSBwYXNzZWQgaGVyZSB3aWxsIGJlIGluIGV2ZW50LmRhdGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZXZlbnREYXRhXSBEYXRhIHRvIHBhc3MgaW4gZXZlbnQuZGF0YVxuICogQHJldHVybnMge0RlbGVnYXRlfSBUaGlzIG1ldGhvZCBpcyBjaGFpbmFibGVcbiAqL1xuRGVsZWdhdGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgZXZlbnREYXRhKSB7XG4gIHZhciByb290LCBsaXN0ZW5lck1hcCwgbWF0Y2hlciwgbWF0Y2hlclBhcmFtLCBzZWxmID0gdGhpcztcblxuICBpZiAoIWV2ZW50VHlwZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgZXZlbnQgdHlwZTogJyArIGV2ZW50VHlwZSk7XG4gIH1cblxuICAvLyBoYW5kbGVyIGNhbiBiZSBwYXNzZWQgYXNcbiAgLy8gdGhlIHNlY29uZCBvciB0aGlyZCBhcmd1bWVudFxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaGFuZGxlciA9IHNlbGVjdG9yO1xuICAgIHNlbGVjdG9yID0gbnVsbDtcbiAgICBldmVudERhdGEgPSBoYW5kbGVyO1xuICB9XG5cbiAgLy8gTm9ybWFsaXNlIHVuZGVmaW5lZCBldmVudERhdGEgdG8gbnVsbFxuICBpZiAoZXZlbnREYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudERhdGEgPSBudWxsO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSGFuZGxlciBtdXN0IGJlIGEgdHlwZSBvZiBGdW5jdGlvbicpO1xuICB9XG5cbiAgcm9vdCA9IHRoaXMucm9vdEVsZW1lbnQ7XG4gIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcDtcblxuICAvLyBBZGQgbWFzdGVyIGhhbmRsZXIgZm9yIHR5cGUgaWYgbm90IGNyZWF0ZWQgeWV0XG4gIGlmICghbGlzdGVuZXJNYXBbZXZlbnRUeXBlXSkge1xuICAgIGlmIChyb290KSB7XG4gICAgICByb290LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdGhpcy5jYXB0dXJlRm9yVHlwZShldmVudFR5cGUpKTtcbiAgICB9XG4gICAgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXSA9IFtdO1xuICB9XG5cbiAgaWYgKCFzZWxlY3Rvcikge1xuICAgIG1hdGNoZXJQYXJhbSA9IG51bGw7XG5cbiAgICAvLyBDT01QTEVYIC0gbWF0Y2hlc1Jvb3QgbmVlZHMgdG8gaGF2ZSBhY2Nlc3MgdG9cbiAgICAvLyB0aGlzLnJvb3RFbGVtZW50LCBzbyBiaW5kIHRoZSBmdW5jdGlvbiB0byB0aGlzLlxuICAgIG1hdGNoZXIgPSB0aGlzLm1hdGNoZXNSb290LmJpbmQodGhpcyk7XG5cbiAgLy8gQ29tcGlsZSBhIG1hdGNoZXIgZm9yIHRoZSBnaXZlbiBzZWxlY3RvclxuICB9IGVsc2UgaWYgKC9eW2Etel0rJC9pLnRlc3Qoc2VsZWN0b3IpKSB7XG5cbiAgICAvLyBMYXppbHkgY2hlY2sgd2hldGhlciB0YWcgbmFtZXMgYXJlIGNhc2Ugc2Vuc2l0aXZlIChhcyBpbiBYTUwgb3IgWEhUTUwgZG9jdW1lbnRzKS5cbiAgICBpZiAoRGVsZWdhdGUudGFnc0Nhc2VTZW5zaXRpdmUgPT09IG51bGwpIHtcbiAgICAgIERlbGVnYXRlLnRhZ3NDYXNlU2Vuc2l0aXZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpLnRhZ05hbWUgPT09ICdpJztcbiAgICB9XG5cbiAgICBpZiAoIURlbGVnYXRlLnRhZ3NDYXNlU2Vuc2l0aXZlKSB7XG4gICAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3Rvci50b1VwcGVyQ2FzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICBtYXRjaGVyID0gdGhpcy5tYXRjaGVzVGFnO1xuICB9IGVsc2UgaWYgKC9eI1thLXowLTlcXC1fXSskL2kudGVzdChzZWxlY3RvcikpIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3Rvci5zbGljZSgxKTtcbiAgICBtYXRjaGVyID0gdGhpcy5tYXRjaGVzSWQ7XG4gIH0gZWxzZSB7XG4gICAgbWF0Y2hlclBhcmFtID0gc2VsZWN0b3I7XG4gICAgbWF0Y2hlciA9IHRoaXMubWF0Y2hlcztcbiAgfVxuXG4gIC8vIEFkZCB0byB0aGUgbGlzdCBvZiBsaXN0ZW5lcnNcbiAgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXS5wdXNoKHtcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgZXZlbnREYXRhOiBldmVudERhdGEsXG4gICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICBtYXRjaGVyOiBtYXRjaGVyLFxuICAgIG1hdGNoZXJQYXJhbTogbWF0Y2hlclBhcmFtXG4gIH0pO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gZXZlbnQgaGFuZGxlclxuICogZm9yIGVsZW1lbnRzIHRoYXQgbWF0Y2hcbiAqIHRoZSBzZWxlY3RvciwgZm9yZXZlclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZXZlbnRUeXBlXSBSZW1vdmUgaGFuZGxlcnMgZm9yIGV2ZW50cyBtYXRjaGluZyB0aGlzIHR5cGUsIGNvbnNpZGVyaW5nIHRoZSBvdGhlciBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlbGVjdG9yXSBJZiB0aGlzIHBhcmFtZXRlciBpcyBvbWl0dGVkLCBvbmx5IGhhbmRsZXJzIHdoaWNoIG1hdGNoIHRoZSBvdGhlciB0d28gd2lsbCBiZSByZW1vdmVkXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCl9IFtoYW5kbGVyXSBJZiB0aGlzIHBhcmFtZXRlciBpcyBvbWl0dGVkLCBvbmx5IGhhbmRsZXJzIHdoaWNoIG1hdGNoIHRoZSBwcmV2aW91cyB0d28gd2lsbCBiZSByZW1vdmVkXG4gKiBAcmV0dXJucyB7RGVsZWdhdGV9IFRoaXMgbWV0aG9kIGlzIGNoYWluYWJsZVxuICovXG5EZWxlZ2F0ZS5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlcikge1xuICB2YXIgaSwgbGlzdGVuZXIsIGxpc3RlbmVyTWFwLCBsaXN0ZW5lckxpc3QsIHNpbmdsZUV2ZW50VHlwZSwgc2VsZiA9IHRoaXM7XG5cbiAgLy8gSGFuZGxlciBjYW4gYmUgcGFzc2VkIGFzXG4gIC8vIHRoZSBzZWNvbmQgb3IgdGhpcmQgYXJndW1lbnRcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGhhbmRsZXIgPSBzZWxlY3RvcjtcbiAgICBzZWxlY3RvciA9IG51bGw7XG4gIH1cblxuICBsaXN0ZW5lck1hcCA9IHRoaXMubGlzdGVuZXJNYXA7XG4gIGlmICghZXZlbnRUeXBlKSB7XG4gICAgZm9yIChzaW5nbGVFdmVudFR5cGUgaW4gbGlzdGVuZXJNYXApIHtcbiAgICAgIGlmIChsaXN0ZW5lck1hcC5oYXNPd25Qcm9wZXJ0eShzaW5nbGVFdmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMub2ZmKHNpbmdsZUV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJMaXN0ID0gbGlzdGVuZXJNYXBbZXZlbnRUeXBlXTtcbiAgaWYgKCFsaXN0ZW5lckxpc3QgfHwgIWxpc3RlbmVyTGlzdC5sZW5ndGgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIFJlbW92ZSBvbmx5IHBhcmFtZXRlciBtYXRjaGVzXG4gIC8vIGlmIHNwZWNpZmllZFxuICBmb3IgKGkgPSBsaXN0ZW5lckxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBsaXN0ZW5lciA9IGxpc3RlbmVyTGlzdFtpXTtcblxuICAgIGlmICgoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBsaXN0ZW5lci5zZWxlY3RvcikgJiYgKCFoYW5kbGVyIHx8IGhhbmRsZXIgPT09IGxpc3RlbmVyLmhhbmRsZXIpKSB7XG4gICAgICBsaXN0ZW5lckxpc3Quc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFsbCBsaXN0ZW5lcnMgcmVtb3ZlZFxuICBpZiAoIWxpc3RlbmVyTGlzdC5sZW5ndGgpIHtcbiAgICBkZWxldGUgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXTtcblxuICAgIC8vIFJlbW92ZSB0aGUgbWFpbiBoYW5kbGVyXG4gICAgaWYgKHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB0aGlzLmNhcHR1cmVGb3JUeXBlKGV2ZW50VHlwZSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuXG4vKipcbiAqIEhhbmRsZSBhbiBhcmJpdHJhcnkgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqL1xuRGVsZWdhdGUucHJvdG90eXBlLmhhbmRsZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHZhciBpLCBsLCByb290LCBsaXN0ZW5lciwgcmV0dXJuZWQsIGxpc3RlbmVyTGlzdCwgdGFyZ2V0LCAvKiogQGNvbnN0ICovIEVWRU5USUdOT1JFID0gJ2Z0TGFic0RlbGVnYXRlSWdub3JlJztcblxuICBpZiAoZXZlbnRbRVZFTlRJR05PUkVdID09PSB0cnVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICBpZiAodGFyZ2V0Lm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICB9XG5cbiAgcm9vdCA9IHRoaXMucm9vdEVsZW1lbnQ7XG4gIGxpc3RlbmVyTGlzdCA9IHRoaXMubGlzdGVuZXJNYXBbZXZlbnQudHlwZV07XG5cbiAgLy8gTmVlZCB0byBjb250aW51b3VzbHkgY2hlY2tcbiAgLy8gdGhhdCB0aGUgc3BlY2lmaWMgbGlzdCBpc1xuICAvLyBzdGlsbCBwb3B1bGF0ZWQgaW4gY2FzZSBvbmVcbiAgLy8gb2YgdGhlIGNhbGxiYWNrcyBhY3R1YWxseVxuICAvLyBjYXVzZXMgdGhlIGxpc3QgdG8gYmUgZGVzdHJveWVkLlxuICBsID0gbGlzdGVuZXJMaXN0Lmxlbmd0aDtcbiAgd2hpbGUgKHRhcmdldCAmJiBsKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5lckxpc3RbaV07XG5cbiAgICAgIC8vIEJhaWwgZnJvbSB0aGlzIGxvb3AgaWZcbiAgICAgIC8vIHRoZSBsZW5ndGggY2hhbmdlZCBhbmRcbiAgICAgIC8vIG5vIG1vcmUgbGlzdGVuZXJzIGFyZVxuICAgICAgLy8gZGVmaW5lZCBiZXR3ZWVuIGkgYW5kIGwuXG4gICAgICBpZiAoIWxpc3RlbmVyKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayBmb3IgbWF0Y2ggYW5kIGZpcmVcbiAgICAgIC8vIHRoZSBldmVudCBpZiB0aGVyZSdzIG9uZVxuICAgICAgLy9cbiAgICAgIC8vIFRPRE86TUNHOjIwMTIwMTE3OiBOZWVkIGEgd2F5XG4gICAgICAvLyB0byBjaGVjayBpZiBldmVudCNzdG9wSW1tZWRpYXRlUHJvZ2FnYXRpb25cbiAgICAgIC8vIHdhcyBjYWxsZWQuIElmIHNvLCBicmVhayBib3RoIGxvb3BzLlxuICAgICAgaWYgKGxpc3RlbmVyLm1hdGNoZXIuY2FsbCh0YXJnZXQsIGxpc3RlbmVyLm1hdGNoZXJQYXJhbSwgdGFyZ2V0KSkge1xuICAgICAgICByZXR1cm5lZCA9IHRoaXMuZmlyZShldmVudCwgdGFyZ2V0LCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIC8vIFN0b3AgcHJvcGFnYXRpb24gdG8gc3Vic2VxdWVudFxuICAgICAgLy8gY2FsbGJhY2tzIGlmIHRoZSBjYWxsYmFjayByZXR1cm5lZFxuICAgICAgLy8gZmFsc2VcbiAgICAgIGlmIChyZXR1cm5lZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZXZlbnRbRVZFTlRJR05PUkVdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPRE86TUNHOjIwMTIwMTE3OiBOZWVkIGEgd2F5IHRvXG4gICAgLy8gY2hlY2sgaWYgZXZlbnQjc3RvcFByb2dhZ2F0aW9uXG4gICAgLy8gd2FzIGNhbGxlZC4gSWYgc28sIGJyZWFrIGxvb3BpbmdcbiAgICAvLyB0aHJvdWdoIHRoZSBET00uIFN0b3AgaWYgdGhlXG4gICAgLy8gZGVsZWdhdGlvbiByb290IGhhcyBiZWVuIHJlYWNoZWRcbiAgICBpZiAodGFyZ2V0ID09PSByb290KSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBsID0gbGlzdGVuZXJMaXN0Lmxlbmd0aDtcbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgfVxufTtcblxuLyoqXG4gKiBGaXJlIGEgbGlzdGVuZXIgb24gYSB0YXJnZXQuXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuZXJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5EZWxlZ2F0ZS5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uKGV2ZW50LCB0YXJnZXQsIGxpc3RlbmVyKSB7XG4gIHZhciByZXR1cm5lZCwgb2xkRGF0YTtcblxuICBpZiAobGlzdGVuZXIuZXZlbnREYXRhICE9PSBudWxsKSB7XG4gICAgb2xkRGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgZXZlbnQuZGF0YSA9IGxpc3RlbmVyLmV2ZW50RGF0YTtcbiAgICByZXR1cm5lZCA9IGxpc3RlbmVyLmhhbmRsZXIuY2FsbCh0YXJnZXQsIGV2ZW50LCB0YXJnZXQpO1xuICAgIGV2ZW50LmRhdGEgPSBvbGREYXRhO1xuICB9IGVsc2Uge1xuICAgIHJldHVybmVkID0gbGlzdGVuZXIuaGFuZGxlci5jYWxsKHRhcmdldCwgZXZlbnQsIHRhcmdldCk7XG4gIH1cblxuICByZXR1cm4gcmV0dXJuZWQ7XG59O1xuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYW4gZWxlbWVudFxuICogbWF0Y2hlcyBhIGdlbmVyaWMgc2VsZWN0b3IuXG4gKlxuICogQHR5cGUgZnVuY3Rpb24oKVxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIEEgQ1NTIHNlbGVjdG9yXG4gKi9cbkRlbGVnYXRlLnByb3RvdHlwZS5tYXRjaGVzID0gKGZ1bmN0aW9uKGVsKSB7XG4gIGlmICghZWwpIHJldHVybjtcbiAgdmFyIHAgPSBlbC5wcm90b3R5cGU7XG4gIHJldHVybiAocC5tYXRjaGVzU2VsZWN0b3IgfHwgcC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgcC5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgcC5tc01hdGNoZXNTZWxlY3RvciB8fCBwLm9NYXRjaGVzU2VsZWN0b3IpO1xufShIVE1MRWxlbWVudCkpO1xuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYW4gZWxlbWVudFxuICogbWF0Y2hlcyBhIHRhZyBzZWxlY3Rvci5cbiAqXG4gKiBUYWdzIGFyZSBOT1QgY2FzZS1zZW5zaXRpdmUsXG4gKiBleGNlcHQgaW4gWE1MIChhbmQgWE1MLWJhc2VkXG4gKiBsYW5ndWFnZXMgc3VjaCBhcyBYSFRNTCkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgVGhlIHRhZyBuYW1lIHRvIHRlc3QgYWdhaW5zdFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIHRlc3Qgd2l0aFxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5EZWxlZ2F0ZS5wcm90b3R5cGUubWF0Y2hlc1RhZyA9IGZ1bmN0aW9uKHRhZ05hbWUsIGVsZW1lbnQpIHtcbiAgcmV0dXJuIHRhZ05hbWUgPT09IGVsZW1lbnQudGFnTmFtZTtcbn07XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBlbGVtZW50XG4gKiBtYXRjaGVzIHRoZSByb290LlxuICpcbiAqIEBwYXJhbSB7P1N0cmluZ30gc2VsZWN0b3IgSW4gdGhpcyBjYXNlIHRoaXMgaXMgYWx3YXlzIHBhc3NlZCB0aHJvdWdoIGFzIG51bGwgYW5kIG5vdCB1c2VkXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gdGVzdCB3aXRoXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbkRlbGVnYXRlLnByb3RvdHlwZS5tYXRjaGVzUm9vdCA9IGZ1bmN0aW9uKHNlbGVjdG9yLCBlbGVtZW50KSB7XG4gIHJldHVybiB0aGlzLnJvb3RFbGVtZW50ID09PSBlbGVtZW50O1xufTtcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIHRoZSBJRCBvZlxuICogdGhlIGVsZW1lbnQgaW4gJ3RoaXMnXG4gKiBtYXRjaGVzIHRoZSBnaXZlbiBJRC5cbiAqXG4gKiBJRHMgYXJlIGNhc2Utc2Vuc2l0aXZlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgSUQgdG8gdGVzdCBhZ2FpbnN0XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gdGVzdCB3aXRoXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbkRlbGVnYXRlLnByb3RvdHlwZS5tYXRjaGVzSWQgPSBmdW5jdGlvbihpZCwgZWxlbWVudCkge1xuICByZXR1cm4gaWQgPT09IGVsZW1lbnQuaWQ7XG59O1xuXG4vKipcbiAqIFNob3J0IGhhbmQgZm9yIG9mZigpXG4gKiBhbmQgcm9vdCgpLCBpZSBib3RoXG4gKiB3aXRoIG5vIHBhcmFtZXRlcnNcbiAqXG4gKiBAcmV0dXJuIHZvaWRcbiAqL1xuRGVsZWdhdGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vZmYoKTtcbiAgdGhpcy5yb290KCk7XG59O1xuIiwiLypqc2hpbnQgYnJvd3Nlcjp0cnVlLCBub2RlOnRydWUqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQHByZXNlcnZlIENyZWF0ZSBhbmQgbWFuYWdlIGEgRE9NIGV2ZW50IGRlbGVnYXRvci5cbiAqXG4gKiBAdmVyc2lvbiAwLjMuMFxuICogQGNvZGluZ3N0YW5kYXJkIGZ0bGFicy1qc3YyXG4gKiBAY29weXJpZ2h0IFRoZSBGaW5hbmNpYWwgVGltZXMgTGltaXRlZCBbQWxsIFJpZ2h0cyBSZXNlcnZlZF1cbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChzZWUgTElDRU5TRS50eHQpXG4gKi9cbnZhciBEZWxlZ2F0ZSA9IHJlcXVpcmUoJy4vZGVsZWdhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyb290KSB7XG4gIHJldHVybiBuZXcgRGVsZWdhdGUocm9vdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5EZWxlZ2F0ZSA9IERlbGVnYXRlO1xuIiwiXG4vKipcbiAqIEV4cG9zZSBgcGFyc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2U7XG5cbi8qKlxuICogV3JhcCBtYXAgZnJvbSBqcXVlcnkuXG4gKi9cblxudmFyIG1hcCA9IHtcbiAgb3B0aW9uOiBbMSwgJzxzZWxlY3QgbXVsdGlwbGU9XCJtdWx0aXBsZVwiPicsICc8L3NlbGVjdD4nXSxcbiAgb3B0Z3JvdXA6IFsxLCAnPHNlbGVjdCBtdWx0aXBsZT1cIm11bHRpcGxlXCI+JywgJzwvc2VsZWN0PiddLFxuICBsZWdlbmQ6IFsxLCAnPGZpZWxkc2V0PicsICc8L2ZpZWxkc2V0PiddLFxuICB0aGVhZDogWzEsICc8dGFibGU+JywgJzwvdGFibGU+J10sXG4gIHRib2R5OiBbMSwgJzx0YWJsZT4nLCAnPC90YWJsZT4nXSxcbiAgdGZvb3Q6IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddLFxuICBjb2xncm91cDogWzEsICc8dGFibGU+JywgJzwvdGFibGU+J10sXG4gIGNhcHRpb246IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddLFxuICB0cjogWzIsICc8dGFibGU+PHRib2R5PicsICc8L3Rib2R5PjwvdGFibGU+J10sXG4gIHRkOiBbMywgJzx0YWJsZT48dGJvZHk+PHRyPicsICc8L3RyPjwvdGJvZHk+PC90YWJsZT4nXSxcbiAgdGg6IFszLCAnPHRhYmxlPjx0Ym9keT48dHI+JywgJzwvdHI+PC90Ym9keT48L3RhYmxlPiddLFxuICBjb2w6IFsyLCAnPHRhYmxlPjx0Ym9keT48L3Rib2R5Pjxjb2xncm91cD4nLCAnPC9jb2xncm91cD48L3RhYmxlPiddLFxuICBfZGVmYXVsdDogWzAsICcnLCAnJ11cbn07XG5cbi8qKlxuICogUGFyc2UgYGh0bWxgIGFuZCByZXR1cm4gdGhlIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKGh0bWwpIHtcbiAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiBodG1sKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdHJpbmcgZXhwZWN0ZWQnKTtcblxuICAvLyB0YWcgbmFtZVxuICB2YXIgbSA9IC88KFtcXHc6XSspLy5leGVjKGh0bWwpO1xuICBpZiAoIW0pIHRocm93IG5ldyBFcnJvcignTm8gZWxlbWVudHMgd2VyZSBnZW5lcmF0ZWQuJyk7XG4gIHZhciB0YWcgPSBtWzFdO1xuXG4gIC8vIGJvZHkgc3VwcG9ydFxuICBpZiAodGFnID09ICdib2R5Jykge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKTtcbiAgICBlbC5pbm5lckhUTUwgPSBodG1sO1xuICAgIHJldHVybiBlbC5yZW1vdmVDaGlsZChlbC5sYXN0Q2hpbGQpO1xuICB9XG5cbiAgLy8gd3JhcCBtYXBcbiAgdmFyIHdyYXAgPSBtYXBbdGFnXSB8fCBtYXAuX2RlZmF1bHQ7XG4gIHZhciBkZXB0aCA9IHdyYXBbMF07XG4gIHZhciBwcmVmaXggPSB3cmFwWzFdO1xuICB2YXIgc3VmZml4ID0gd3JhcFsyXTtcbiAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGVsLmlubmVySFRNTCA9IHByZWZpeCArIGh0bWwgKyBzdWZmaXg7XG4gIHdoaWxlIChkZXB0aC0tKSBlbCA9IGVsLmxhc3RDaGlsZDtcblxuICB2YXIgZWxzID0gZWwuY2hpbGRyZW47XG4gIGlmICgxID09IGVscy5sZW5ndGgpIHtcbiAgICByZXR1cm4gZWwucmVtb3ZlQ2hpbGQoZWxzWzBdKTtcbiAgfVxuXG4gIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgd2hpbGUgKGVscy5sZW5ndGgpIHtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbC5yZW1vdmVDaGlsZChlbHNbMF0pKTtcbiAgfVxuXG4gIHJldHVybiBmcmFnbWVudDtcbn1cbiIsIi8qIVxuICAqIGRvbXJlYWR5IChjKSBEdXN0aW4gRGlheiAyMDEyIC0gTGljZW5zZSBNSVRcbiAgKi9cbiFmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKClcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnKSBkZWZpbmUoZGVmaW5pdGlvbilcbiAgZWxzZSB0aGlzW25hbWVdID0gZGVmaW5pdGlvbigpXG59KCdkb21yZWFkeScsIGZ1bmN0aW9uIChyZWFkeSkge1xuXG4gIHZhciBmbnMgPSBbXSwgZm4sIGYgPSBmYWxzZVxuICAgICwgZG9jID0gZG9jdW1lbnRcbiAgICAsIHRlc3RFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnRcbiAgICAsIGhhY2sgPSB0ZXN0RWwuZG9TY3JvbGxcbiAgICAsIGRvbUNvbnRlbnRMb2FkZWQgPSAnRE9NQ29udGVudExvYWRlZCdcbiAgICAsIGFkZEV2ZW50TGlzdGVuZXIgPSAnYWRkRXZlbnRMaXN0ZW5lcidcbiAgICAsIG9ucmVhZHlzdGF0ZWNoYW5nZSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICAgLCByZWFkeVN0YXRlID0gJ3JlYWR5U3RhdGUnXG4gICAgLCBsb2FkZWRSZ3ggPSBoYWNrID8gL15sb2FkZWR8XmMvIDogL15sb2FkZWR8Yy9cbiAgICAsIGxvYWRlZCA9IGxvYWRlZFJneC50ZXN0KGRvY1tyZWFkeVN0YXRlXSlcblxuICBmdW5jdGlvbiBmbHVzaChmKSB7XG4gICAgbG9hZGVkID0gMVxuICAgIHdoaWxlIChmID0gZm5zLnNoaWZ0KCkpIGYoKVxuICB9XG5cbiAgZG9jW2FkZEV2ZW50TGlzdGVuZXJdICYmIGRvY1thZGRFdmVudExpc3RlbmVyXShkb21Db250ZW50TG9hZGVkLCBmbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBmbiwgZilcbiAgICBmbHVzaCgpXG4gIH0sIGYpXG5cblxuICBoYWNrICYmIGRvYy5hdHRhY2hFdmVudChvbnJlYWR5c3RhdGVjaGFuZ2UsIGZuID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICgvXmMvLnRlc3QoZG9jW3JlYWR5U3RhdGVdKSkge1xuICAgICAgZG9jLmRldGFjaEV2ZW50KG9ucmVhZHlzdGF0ZWNoYW5nZSwgZm4pXG4gICAgICBmbHVzaCgpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiAocmVhZHkgPSBoYWNrID9cbiAgICBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHNlbGYgIT0gdG9wID9cbiAgICAgICAgbG9hZGVkID8gZm4oKSA6IGZucy5wdXNoKGZuKSA6XG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGVzdEVsLmRvU2Nyb2xsKCdsZWZ0JylcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHsgcmVhZHkoZm4pIH0sIDUwKVxuICAgICAgICAgIH1cbiAgICAgICAgICBmbigpXG4gICAgICAgIH0oKVxuICAgIH0gOlxuICAgIGZ1bmN0aW9uIChmbikge1xuICAgICAgbG9hZGVkID8gZm4oKSA6IGZucy5wdXNoKGZuKVxuICAgIH0pXG59KVxuIiwiLyohXHJcbiAqIGRvcGUgICAgICAgICBIVE1MIGF0dHJpYnV0ZXMvZGF0YXNldCBtb2R1bGVcclxuICogQGxpbmsgICAgICAgIGh0dHA6Ly9naXRodWIuY29tL3J5YW52ZS9kb3BlXHJcbiAqIEBsaWNlbnNlICAgICBNSVRcclxuICogQGNvcHlyaWdodCAgIDIwMTIgUnlhbiBWYW4gRXR0ZW5cclxuICogQHZlcnNpb24gICAgIDIuMi4xXHJcbiAqL1xyXG5cclxuLypqc2hpbnQgZXhwcjp0cnVlLCBzdWI6dHJ1ZSwgc3VwZXJuZXc6dHJ1ZSwgZGVidWc6dHJ1ZSwgbm9kZTp0cnVlLCBib3NzOnRydWUsIGRldmVsOnRydWUsIGV2aWw6dHJ1ZSwgXHJcbiAgbGF4Y29tbWE6dHJ1ZSwgZXFudWxsOnRydWUsIHVuZGVmOnRydWUsIHVudXNlZDp0cnVlLCBicm93c2VyOnRydWUsIGpxdWVyeTp0cnVlLCBtYXhlcnI6MTAwICovXHJcblxyXG4oZnVuY3Rpb24ocm9vdCwgbmFtZSwgbWFrZSkge1xyXG4gICAgdHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGVbJ2V4cG9ydHMnXSA/IG1vZHVsZVsnZXhwb3J0cyddID0gbWFrZSgpIDogcm9vdFtuYW1lXSA9IG1ha2UoKTtcclxufSh0aGlzLCAnZG9wZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vIGRldmVsb3BlcnMuZ29vZ2xlLmNvbS9jbG9zdXJlL2NvbXBpbGVyL2RvY3MvYXBpLXR1dG9yaWFsM1xyXG4gICAgLy8gZGV2ZWxvcGVycy5nb29nbGUuY29tL2Nsb3N1cmUvY29tcGlsZXIvZG9jcy9qcy1mb3ItY29tcGlsZXJcclxuXHJcbiAgICB2YXIgZG9jID0gZG9jdW1lbnRcclxuICAgICAgLCB4cG9ydHMgPSB7fVxyXG4gICAgICAsIGVmZmlucyA9IHhwb3J0c1snZm4nXSA9IHt9XHJcbiAgICAgICwgb3ducyA9IHhwb3J0cy5oYXNPd25Qcm9wZXJ0eVxyXG4gICAgICAsIERNUyA9IHR5cGVvZiBET01TdHJpbmdNYXAgIT0gJ3VuZGVmaW5lZCdcclxuICAgICAgLCBwYXJzZUpTT04gPSB0eXBlb2YgSlNPTiAhPSAndW5kZWZpbmVkJyAmJiBKU09OLnBhcnNlXHJcbiAgICAgICwgcXVlcnlNZXRob2QgPSAncXVlcnlTZWxlY3RvckFsbCcgXHJcbiAgICAgICwgUVNBID0gISFkb2NbcXVlcnlNZXRob2RdIHx8ICEocXVlcnlNZXRob2QgPSAnZ2V0RWxlbWVudHNCeVRhZ05hbWUnKVxyXG4gICAgICAsIHF1ZXJ5RW5naW5lID0gZnVuY3Rpb24ocywgcm9vdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcyA/IChyb290IHx8IGRvYylbcXVlcnlNZXRob2RdKHMpIDogW107IFxyXG4gICAgICAgIH1cclxuICAgICAgLCBjYW1lbHMgPSAvKFthLXpdKShbQS1aXSkvZyAgICAgICAgICAgIC8vIGxvd2VyY2FzZSBuZXh0IHRvIHVwcGVyY2FzZVxyXG4gICAgICAsIGRhc2hCNCA9IC8tKC4pL2cgICAgICAgICAgICAgICAgICAgICAgLy8gZmluZHMgY2hhcnMgYWZ0ZXIgaHlwaGVuc1xyXG4gICAgICAsIGNzdlNzdiA9IC9cXHMqW1xcc1xcLF0rXFxzKi8gICAgICAgICAgICAgIC8vIHNwbGl0dGVyIGZvciBjb21tYSAqb3IqIHNwYWNlLXNlcGFyYXRlZCB2YWx1ZXNcclxuICAgICAgLCBjbGVhbkF0dHIgPSAvXltcXFtcXHNdK3xcXHMrfFtcXF1cXHNdKyQvZyAgLy8gcmVwbGFjZSB3aGl0ZXNwYWNlLCB0cmltIFtdIGJyYWNrZXRzXHJcbiAgICAgICwgY2xlYW5QcmUgPSAvXltcXFtcXHNdPyhkYXRhLSk/fFxccyt8W1xcXVxcc10/JC9nIC8vIHJlcGxhY2Ugd2hpdGVzcGFjZSwgdHJpbSBbXSBicmFja2V0cywgdHJpbSBwcmVmaXhcclxuICAgICAgLCBlc2NEb3RzID0gL1xcXFwqXFwuL2cgICAgICAgICAgICAgICAgICAgIC8vIGZpbmQgcGVyaW9kcyB3LyBhbmQgdy9vIHByZWNlZGluZyBiYWNrc2xhc2hlc1xyXG4gICAgICAsIHNzdiA9IC9cXHMrL1xyXG4gICAgICAsIHRyaW1tZXIgPSAvXlxccyt8XFxzKyQvXHJcbiAgICAgICwgdHJpbSA9ICcnLnRyaW0gPyBmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsID09IHMgPyAnJyA6IHMudHJpbSgpOyBcclxuICAgICAgICB9IDogZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbCA9PSBzID8gJycgOiBzLnJlcGxhY2UodHJpbW1lciwgJycpOyBcclxuICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4gIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNhbWVsSGFuZGxlcihhbGwsIGxldHRlcikgeyBcclxuICAgICAgICByZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0ICAnZGF0YS1wdWxwLWZpY3Rpb24nIHRvICdwdWxwRmljdGlvbicuIE5vbi1zY2FsYXJzIHJldHVybiBhblxyXG4gICAgICogZW1wdHkgc3RyaW5nLiBudW1iZXJ8Ym9vbGVhbiBjb2VyY2VzIHRvIHN0cmluZy4gKG9wcG9zaXRlOiBkYXRhdGl6ZSgpKVxyXG4gICAgICogQHBhcmFtICAge3N0cmluZ3xudW1iZXJ8Ym9vbGVhbnwqfSAgc1xyXG4gICAgICogQHJldHVybiAge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2FtZWxpemUocykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcyAhPSAnc3RyaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBzID09ICdudW1iZXInIHx8IHR5cGVvZiBzID09ICdib29sZWFuJyA/ICcnICsgcyA6ICcnOyBcclxuICAgICAgICAvLyBSZW1vdmUgZGF0YS0gcHJlZml4IGFuZCBjb252ZXJ0IHJlbWFpbmluZyBkYXNoZWQgc3RyaW5nIHRvIGNhbWVsQ2FzZTpcclxuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKGNsZWFuUHJlLCAnJykucmVwbGFjZShkYXNoQjQsIGNhbWVsSGFuZGxlcik7IC8vIC1hIHRvIEFcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgICdwdWxwRmljdGlvbicgdG8gJ2RhdGEtcHVscC1maWN0aW9uJyBPUiA0NyB0byAnZGF0YS00NydcclxuICAgICAqIEludmFsaWQgdHlwZXMgcmV0dXJuIGFuIGVtcHR5IHN0cmluZy4gKG9wcG9zaXRlOiBjYW1lbGl6ZSgpKVxyXG4gICAgICogQHBhcmFtICAge3N0cmluZ3xudW1iZXJ8Kn0gIHNcclxuICAgICAqIEByZXR1cm4gIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGRhdGF0aXplKHMpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHMgPT0gJ3N0cmluZycpIHMgPSBzLnJlcGxhY2UoY2xlYW5QcmUsICckMScpLnJlcGxhY2UoY2FtZWxzLCAnJDEtJDInKTsgLy8gYUEgdG8gYS1BXHJcbiAgICAgICAgZWxzZSBzID0gdHlwZW9mIHMgPT0gJ251bWJlcicgID8gJycgKyBzIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIHMgPyAoJ2RhdGEtJyArIHMudG9Mb3dlckNhc2UoKSkgOiBzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCBhIHN0cmluZ2lmaWVkIHByaW1pdGl2ZSBpbnRvIGl0cyBjb3JyZWN0IHR5cGUuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3wqfSAgc1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwYXJzZShzKSB7XHJcbiAgICAgICAgdmFyIG47IC8vIHVuZGVmaW5lZCwgb3IgYmVjb21lcyBudW1iZXJcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHMgIT0gJ3N0cmluZycgfHwgIXMgPyBzXHJcbiAgICAgICAgICAgIDogJ2ZhbHNlJyA9PT0gcyA/IGZhbHNlXHJcbiAgICAgICAgICAgIDogJ3RydWUnID09PSBzID8gdHJ1ZVxyXG4gICAgICAgICAgICA6ICdudWxsJyA9PT0gcyA/IG51bGxcclxuICAgICAgICAgICAgOiAndW5kZWZpbmVkJyA9PT0gcyB8fCAobiA9ICgrcykpIHx8IDAgPT09IG4gfHwgJ05hTicgPT09IHMgPyBuXHJcbiAgICAgICAgICAgIDogcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSAgIHtPYmplY3R8QXJyYXl8Kn0gIGxpc3RcclxuICAgICAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gICAgICAgIGZuICAgICBcclxuICAgICAqIEBwYXJhbSAgIHsoT2JqZWN0fCopPX0gICAgIHNjb3BlXHJcbiAgICAgKiBAcGFyYW0gICB7Ym9vbGVhbj19ICAgICAgICBjb21wYWN0IFxyXG4gICAgICogQHJldHVybiAge0FycmF5fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBtYXAobGlzdCwgZm4sIHNjb3BlLCBjb21wYWN0KSB7XHJcbiAgICAgICAgdmFyIGwsIGkgPSAwLCB2LCB1ID0gMCwgcmV0ID0gW107XHJcbiAgICAgICAgaWYgKGxpc3QgPT0gbnVsbCkgcmV0dXJuIHJldDtcclxuICAgICAgICBjb21wYWN0ID0gdHJ1ZSA9PT0gY29tcGFjdDtcclxuICAgICAgICBmb3IgKGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7KSB7XHJcbiAgICAgICAgICAgIHYgPSBmbi5jYWxsKHNjb3BlLCBsaXN0W2ldLCBpKyssIGxpc3QpO1xyXG4gICAgICAgICAgICBpZiAodiB8fCAhY29tcGFjdCkgcmV0W3UrK10gPSB2O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiogXHJcbiAgICAgKiBzcGVjaWFsLWNhc2UgRE9NLW5vZGUgaXRlcmF0b3Igb3B0aW1pemVkIGZvciBpbnRlcm5hbCB1c2VcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSAgb2JcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgZm5cclxuICAgICAqIEBwYXJhbSB7Kj19ICAgICAgICAgICAgcGFyYW1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZWFjaE5vZGUob2IsIGZuLCBwYXJhbSkge1xyXG4gICAgICAgIGZvciAodmFyIGwgPSBvYi5sZW5ndGgsIGkgPSAwOyBpIDwgbDsgaSsrKVxyXG4gICAgICAgICAgICBvYltpXSAmJiBvYltpXS5ub2RlVHlwZSAmJiBmbihvYltpXSwgcGFyYW0pO1xyXG4gICAgICAgIHJldHVybiBvYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGludGVybmFsLXVzZSBmdW5jdGlvbiB0byBpdGVyYXRlIGEgbm9kZSdzIGF0dHJpYnV0ZXNcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgZWxcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgZm5cclxuICAgICAqIEBwYXJhbSB7KGJvb2xlYW58Kik9fSAgZXhwXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGVhY2hBdHRyKGVsLCBmbiwgZXhwKSB7XHJcbiAgICAgICAgdmFyIHRlc3QsIG4sIGEsIGksIGw7XHJcbiAgICAgICAgaWYgKCFlbC5hdHRyaWJ1dGVzKSByZXR1cm47XHJcbiAgICAgICAgdGVzdCA9IHR5cGVvZiBleHAgPT0gJ2Jvb2xlYW4nID8gL15kYXRhLS8gOiB0ZXN0O1xyXG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGw7KSB7XHJcbiAgICAgICAgICAgIGlmIChhID0gZWwuYXR0cmlidXRlc1tpKytdKSB7XHJcbiAgICAgICAgICAgICAgICBuID0gJycgKyBhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB0ZXN0ICYmIHRlc3QudGVzdChuKSAhPT0gZXhwIHx8IG51bGwgPT0gYS52YWx1ZSB8fCBmbi5jYWxsKGVsLCBhLnZhbHVlLCBuLCBhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBvYmplY3QgY29udGFpbmluZyBhbiBlbGVtZW50J3MgZGF0YSBhdHRycy5cclxuICAgICAqIEBwYXJhbSAge05vZGV9ICBlbFxyXG4gICAgICogQHJldHVybiB7RE9NU3RyaW5nTWFwfE9iamVjdHx1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldERhdGFzZXQoZWwpIHtcclxuICAgICAgICB2YXIgb2I7XHJcbiAgICAgICAgaWYgKCFlbCB8fCAxICE9PSBlbC5ub2RlVHlwZSkgcmV0dXJuOyAgLy8gdW5kZWZpbmVkXHJcbiAgICAgICAgaWYgKG9iID0gRE1TICYmIGVsLmRhdGFzZXQpIHJldHVybiBvYjsgLy8gbmF0aXZlXHJcbiAgICAgICAgb2IgPSB7fTsgLy8gRmFsbGJhY2sgcGxhaW4gb2JqZWN0IGNhbm5vdCBtdXRhdGUgdGhlIGRhdGFzZXQgdmlhIHJlZmVyZW5jZS5cclxuICAgICAgICBlYWNoQXR0cihlbCwgZnVuY3Rpb24odiwgaykge1xyXG4gICAgICAgICAgICBvYltjYW1lbGl6ZShrKV0gPSAnJyArIHY7XHJcbiAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIG9iO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtICB7Tm9kZX0gICAgIGVsXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3Q9fSAgb2JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVzZXREYXRhc2V0KGVsLCBvYikge1xyXG4gICAgICAgIGlmICghZWwpIHJldHVybjtcclxuICAgICAgICB2YXIgbiwgY3VyciA9IGVsLmRhdGFzZXQ7XHJcbiAgICAgICAgaWYgKGN1cnIgJiYgRE1TKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyID09PSBvYikgcmV0dXJuO1xyXG4gICAgICAgICAgICBmb3IgKG4gaW4gY3VycikgZGVsZXRlIGN1cnJbbl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9iICYmIGRhdGFzZXQoZWwsIG9iKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSAgICAgIGVsXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgIG9iXHJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gIGZuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNldFZpYU9iamVjdChlbCwgb2IsIGZuKSB7XHJcbiAgICAgICAgZm9yICh2YXIgbiBpbiBvYilcclxuICAgICAgICAgICAgb3ducy5jYWxsKG9iLCBuKSAmJiBmbihlbCwgbiwgb2Jbbl0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSAge09iamVjdHxBcnJheXxGdW5jdGlvbn0gIGVsXHJcbiAgICAgKiBAcGFyYW0gIHsoc3RyaW5nfE9iamVjdHwqKT19ICAgICBrXHJcbiAgICAgKiBAcGFyYW0gIHsqPX0gICAgICAgICAgICAgICAgICAgICB2XHJcbiAgICAgKi8gICAgXHJcbiAgICBmdW5jdGlvbiBhdHRyKGVsLCBrLCB2KSB7XHJcbiAgICAgICAgZWwgPSBlbC5ub2RlVHlwZSA/IGVsIDogZWxbMF07XHJcbiAgICAgICAgaWYgKCFlbCB8fCAhZWwuc2V0QXR0cmlidXRlKSByZXR1cm47XHJcbiAgICAgICAgayA9IHR5cGVvZiBrID09ICdmdW5jdGlvbicgPyBrLmNhbGwoZWwpIDogaztcclxuICAgICAgICBpZiAoIWspIHJldHVybjtcclxuICAgICAgICBpZiAodHlwZW9mIGsgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgLy8gU0VULW11bHRpXHJcbiAgICAgICAgICAgIHNldFZpYU9iamVjdChlbCwgaywgYXR0cik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHZvaWQgMCA9PT0gdikge1xyXG4gICAgICAgICAgICAgICAgLy8gR0VUXHJcbiAgICAgICAgICAgICAgICBrID0gZWwuZ2V0QXR0cmlidXRlKGspOyAvLyByZXB1cnBvc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsID09IGsgPyB2IDogJycgKyBrOyAvLyBub3JtYWxpemVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTRVRcclxuICAgICAgICAgICAgdiA9IHR5cGVvZiB2ID09ICdmdW5jdGlvbicgPyB2LmNhbGwoZWwpIDogdjtcclxuICAgICAgICAgICAgdiA9ICcnICsgdjsgLy8gbm9ybWFsaXplIGlucHV0c1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoaywgdik7XHJcbiAgICAgICAgICAgIHJldHVybiB2OyAvLyB0aGUgY3VyciB2YWx1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R8QXJyYXl8RnVuY3Rpb259ICBlbFxyXG4gICAgICogQHBhcmFtICB7KHN0cmluZ3xPYmplY3R8Kik9fSAgICAga1xyXG4gICAgICogQHBhcmFtICB7Kj19ICAgICAgICAgICAgICAgICAgICAgdlxyXG4gICAgICovICAgIFxyXG4gICAgZnVuY3Rpb24gZGF0YXNldChlbCwgaywgdikge1xyXG4gICAgICAgIHZhciBleGFjdCwga0Z1biA9IHR5cGVvZiBrID09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgZWwgPSBlbC5ub2RlVHlwZSA/IGVsIDogZWxbMF07XHJcbiAgICAgICAgaWYgKCFlbCB8fCAhZWwuc2V0QXR0cmlidXRlKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHZvaWQgMCA9PT0gayAmJiB2ID09PSBrKSByZXR1cm4gZ2V0RGF0YXNldChlbCk7XHJcbiAgICAgICAgayA9IGtGdW4gPyBrLmNhbGwoZWwpIDogaztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBrID09ICdvYmplY3QnICYmIChrRnVuIHx8ICEoZXhhY3QgPSB2b2lkIDAgPT09IHYgJiYgZGF0YXRpemUoa1swXSkpKSkge1xyXG4gICAgICAgICAgICAvLyBTRVQtbXVsdGlcclxuICAgICAgICAgICAga0Z1biAmJiBkZWxldGVzKGVsKTtcclxuICAgICAgICAgICAgayAmJiBzZXRWaWFPYmplY3QoZWwsIGssIGRhdGFzZXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGsgPSBleGFjdCB8fCBkYXRhdGl6ZShrKTtcclxuICAgICAgICAgICAgaWYgKCFrKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IHYpIHtcclxuICAgICAgICAgICAgICAgIC8vIEdFVFxyXG4gICAgICAgICAgICAgICAgayA9IGVsLmdldEF0dHJpYnV0ZShrKTsgLy8gcmVwdXJwb3NlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbCA9PSBrID8gdiA6IGV4YWN0ID8gcGFyc2UoaykgOiAnJyArIGs7IC8vIG5vcm1hbGl6ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNFVFxyXG4gICAgICAgICAgICB2ID0gdHlwZW9mIHYgPT0gJ2Z1bmN0aW9uJyA/IHYuY2FsbChlbCkgOiB2O1xyXG4gICAgICAgICAgICB2ID0gJycgKyB2OyAvLyBub3JtYWxpemUgaW5wdXRzXHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShrLCB2KTtcclxuICAgICAgICAgICAgcmV0dXJuIHY7IC8vIGN1cnJlbnQgdmFsdWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSAgICAgICAgICAgICAgICAgICBlbFxyXG4gICAgICogQHBhcmFtICB7KEFycmF5fHN0cmluZ3xudW1iZXIpPX0ga2V5c1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBkZWxldGVzKGVsLCBrZXlzKSB7XHJcbiAgICAgICAgdmFyIGssIGkgPSAwO1xyXG4gICAgICAgIGVsID0gZWwubm9kZVR5cGUgPyBlbCA6IGVsWzBdO1xyXG4gICAgICAgIGlmICghZWwgfHwgIWVsLnJlbW92ZUF0dHJpYnV0ZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICh2b2lkIDAgPT09IGtleXMpIHtcclxuICAgICAgICAgICAgcmVzZXREYXRhc2V0KGVsKTsgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAga2V5cyA9IHR5cGVvZiBrZXlzID09ICdzdHJpbmcnID8ga2V5cy5zcGxpdChzc3YpIDogW10uY29uY2F0KGtleXMpO1xyXG4gICAgICAgICAgICB3aGlsZSAoaSA8IGtleXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBrID0gZGF0YXRpemUoa2V5c1tpKytdKTtcclxuICAgICAgICAgICAgICAgIGsgJiYgZWwucmVtb3ZlQXR0cmlidXRlKGspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSAge05vZGV9ICAgICAgICAgICAgICAgIGVsXHJcbiAgICAgKiBAcGFyYW0gIHtBcnJheXxzdHJpbmd8bnVtYmVyfSBrZXlzXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUF0dHIoZWwsIGtleXMpIHtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgZWwgPSBlbC5ub2RlVHlwZSA/IGVsIDogZWxbMF07XHJcbiAgICAgICAgaWYgKGVsICYmIGVsLnJlbW92ZUF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICBmb3IgKGtleXMgPSB0eXBlb2Yga2V5cyA9PSAnc3RyaW5nJyA/IGtleXMuc3BsaXQoc3N2KSA6IFtdLmNvbmNhdChrZXlzKTsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGtleXNbaV0gJiYgZWwucmVtb3ZlQXR0cmlidXRlKGtleXNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCBsaXN0IG9mIGF0dHIgbmFtZXMgb3IgZGF0YS0ga2V5cyBpbnRvIGEgc2VsZWN0b3IuXHJcbiAgICAgKiBAcGFyYW0gICB7QXJyYXl8c3RyaW5nfG51bWJlcnwqfSAgbGlzdFxyXG4gICAgICogQHBhcmFtICAge2Jvb2xlYW49fSAgICAgICAgICAgICAgIHByZWZpeFxyXG4gICAgICogQHBhcmFtICAge2Jvb2xlYW49fSAgICAgICAgICAgICAgIGpvaW5cclxuICAgICAqIEByZXR1cm4gIHtzdHJpbmd8QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHRvQXR0clNlbGVjdG9yKGxpc3QsIHByZWZpeCwgam9pbikge1xyXG4gICAgICAgIHZhciBsLCBzLCBpID0gMCwgaiA9IDAsIGVtcCA9ICcnLCBhcnIgPSBbXTtcclxuICAgICAgICBwcmVmaXggPSB0cnVlID09PSBwcmVmaXg7XHJcbiAgICAgICAgbGlzdCA9IHR5cGVvZiBsaXN0ID09ICdzdHJpbmcnID8gbGlzdC5zcGxpdChjc3ZTc3YpIDogdHlwZW9mIGxpc3QgPT0gJ251bWJlcicgPyAnJyArIGxpc3QgOiBsaXN0O1xyXG4gICAgICAgIGZvciAobCA9IGxpc3QubGVuZ3RoOyBpIDwgbDspIHtcclxuICAgICAgICAgICAgcyA9IGxpc3RbaSsrXTtcclxuICAgICAgICAgICAgcyA9IHByZWZpeCA/IGRhdGF0aXplKHMpIDogcy5yZXBsYWNlKGNsZWFuQXR0ciwgZW1wKTtcclxuICAgICAgICAgICAgcyAmJiAoYXJyW2orK10gPSBzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRXNjYXBlIHBlcmlvZHMgdG8gYWxsb3cgYXR0cyBsaWtlIGBbZGF0YS10aGUud2hfb11gXHJcbiAgICAgICAgLy8gQGxpbmsgYXBpLmpxdWVyeS5jb20vY2F0ZWdvcnkvc2VsZWN0b3JzL1xyXG4gICAgICAgIC8vIEBsaW5rIHN0YWNrb3ZlcmZsb3cuY29tL3EvMTMyODM2OTkvNzcwMTI3XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlID09PSBqb2luID8gYXJyIDogaiA/ICdbJyArIGFyci5qb2luKCddLFsnKS5yZXBsYWNlKGVzY0RvdHMsICdcXFxcXFxcXC4nKSArICddJyA6IGVtcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBlbGVtZW50cyBtYXRjaGVkIGJ5IGEgZGF0YSBrZXkuXHJcbiAgICAgKiBAcGFyYW0gICB7QXJyYXl8c3RyaW5nfSAgbGlzdCAgIGFycmF5IG9yIENTViBvciBTU1YgZGF0YSBrZXlzXHJcbiAgICAgKiBAcmV0dXJuICB7QXJyYXl8Kn1cclxuICAgICAqLyAgICAgXHJcbiAgICB4cG9ydHNbJ3F1ZXJ5RGF0YSddID0gUVNBID8gZnVuY3Rpb24obGlzdCwgcm9vdCkge1xyXG4gICAgICAgIC8vIE1vZGVybiBicm93c2VycywgSUU4K1xyXG4gICAgICAgIHJldHVybiBmYWxzZSA9PT0gcm9vdCA/IHRvQXR0clNlbGVjdG9yKGxpc3QsIHRydWUsIHJvb3QpIDogcXVlcnlFbmdpbmUodG9BdHRyU2VsZWN0b3IobGlzdCwgdHJ1ZSksIHJvb3QpO1xyXG4gICAgfSA6IGZ1bmN0aW9uKGxpc3QsIHJvb3QpIHtcclxuICAgICAgICAvLyA9PSBGQUxMQkFDSyA9PVxyXG4gICAgICAgIGxpc3QgPSB0b0F0dHJTZWxlY3RvcihsaXN0LCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlID09PSByb290ID8gbGlzdCA6IHF1ZXJ5QXR0ckZhbGxiYWNrKGxpc3QsIHJvb3QpOyBcclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogR2V0IGVsZW1lbnRzIG1hdGNoZWQgYnkgYW4gYXR0cmlidXRlIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gICB7QXJyYXl8c3RyaW5nfSAgbGlzdCAgIGFycmF5IG9yIENTViBvciBTU1YgZGF0YSBrZXlzXHJcbiAgICAgKiBAcmV0dXJuICB7QXJyYXl8Kn1cclxuICAgICAqLyAgICAgXHJcbiAgICB4cG9ydHNbJ3F1ZXJ5QXR0ciddID0gUVNBID8gZnVuY3Rpb24obGlzdCwgcm9vdCkge1xyXG4gICAgICAgIC8vIE1vZGVybiBicm93c2VycywgSUU4K1xyXG4gICAgICAgIHJldHVybiBmYWxzZSA9PT0gcm9vdCA/IHRvQXR0clNlbGVjdG9yKGxpc3QsIHJvb3QsIHJvb3QpIDogcXVlcnlFbmdpbmUodG9BdHRyU2VsZWN0b3IobGlzdCksIHJvb3QpO1xyXG4gICAgfSA6IGZ1bmN0aW9uKGxpc3QsIHJvb3QpIHtcclxuICAgICAgICAvLyA9PSBGQUxMQkFDSyA9PVxyXG4gICAgICAgIGxpc3QgPSB0b0F0dHJTZWxlY3RvcihsaXN0LCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZSA9PT0gcm9vdCA/IGxpc3QgOiBxdWVyeUF0dHJGYWxsYmFjayhsaXN0LCByb290KTsgXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSAgbGlzdCAgIGlzIGFuIGFycmF5IG9mIGF0dHJpYnV0ZSBuYW1lcyAody9vIGJyYWNrcylcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0PX0gICAgICAgcm9vdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBxdWVyeUF0dHJGYWxsYmFjayhsaXN0LCByb290KSB7XHJcbiAgICAgICAgdmFyIGosIGksIGUsIGVscywgbCA9IGxpc3QubGVuZ3RoLCByZXQgPSBbXSwgdSA9IDA7XHJcbiAgICAgICAgaWYgKCFsKSByZXR1cm4gcmV0O1xyXG4gICAgICAgIGVscyA9IHF1ZXJ5RW5naW5lKCcqJywgcm9vdCk7XHJcbiAgICAgICAgZm9yIChqID0gMDsgKGUgPSBlbHNbal0pOyBqKyspIHtcclxuICAgICAgICAgICAgaSA9IGw7IC8vIHJlc2V0IGkgZm9yIGVhY2ggb3V0ZXIgaXRlcmF0aW9uXHJcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHsvLyBlYWNoIGF0dHIgbmFtZVxyXG4gICAgICAgICAgICAgICAgaWYgKGF0dHIoZSwgbGlzdFtpXSkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldFt1KytdID0gZTsgLy8gZ2hldHRvIHB1c2hcclxuICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gcHJldmVudCBwdXNoaW5nIHNhbWUgZWxlbSB0d2ljZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEV4cG9zZSByZW1haW5pbmcgdG9wLWxldmVsIG1ldGhvZHM6XHJcbiAgICB4cG9ydHNbJ21hcCddID0gbWFwO1xyXG4gICAgeHBvcnRzWydwYXJzZSddID0gcGFyc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd8Kn0gIHNcclxuICAgICAqIEBzaW5jZSAgMi4xLjBcclxuICAgICAqL1xyXG4gICAgeHBvcnRzWydwYXJzZUpTT04nXSA9IGZ1bmN0aW9uKHMpIHtcclxuICAgICAgICBzID0gcGFyc2Uocyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzID0gcGFyc2VKU09OKHRyaW0ocykpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcztcclxuICAgIH07XHJcblxyXG4gICAgeHBvcnRzWyd0cmltJ10gPSB0cmltO1xyXG4gICAgeHBvcnRzWydxc2EnXSA9IHF1ZXJ5RW5naW5lO1xyXG4gICAgeHBvcnRzWydhdHRyJ10gPSBhdHRyO1xyXG4gICAgeHBvcnRzWydyZW1vdmVBdHRyJ10gPSByZW1vdmVBdHRyO1xyXG4gICAgeHBvcnRzWydkYXRhc2V0J10gPSBkYXRhc2V0O1xyXG4gICAgeHBvcnRzWydkZWxldGVzJ10gPSBkZWxldGVzO1xyXG4gICAgeHBvcnRzWydjYW1lbGl6ZSddID0gY2FtZWxpemU7XHJcbiAgICB4cG9ydHNbJ2RhdGF0aXplJ10gPSBkYXRhdGl6ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0aGlzICAgIHtPYmplY3R8QXJyYXl9XHJcbiAgICAgKiBAcGFyYW0gICB7Kj19ICAga1xyXG4gICAgICogQHBhcmFtICAgeyo9fSAgIHZcclxuICAgICAqL1xyXG4gICAgZWZmaW5zWydkYXRhc2V0J10gPSBmdW5jdGlvbihrLCB2KSB7XHJcbiAgICAgICAgdmFyIGtNdWx0aSA9IHR5cGVvZiBrID09ICdvYmplY3QnID8gISh2b2lkIDAgPT09IHYgJiYgZGF0YXRpemUoa1swXSkpIDogdHlwZW9mIGsgPT0gJ2Z1bmN0aW9uJztcclxuICAgICAgICBpZiAodm9pZCAwID09PSB2ICYmICFrTXVsdGkpXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhc2V0KHRoaXNbMF0sIGspOyAvLyBHRVRcclxuICAgICAgICByZXR1cm4gKGsgPSBrTXVsdGkgPyBrIDogZGF0YXRpemUoaykpID8gZWFjaE5vZGUodGhpcywgZnVuY3Rpb24oZSwgeCkge1xyXG4gICAgICAgICAgICB4ID0gdHlwZW9mIHYgPT0gJ2Z1bmN0aW9uJyA/IHYuY2FsbChlKSA6IHY7XHJcbiAgICAgICAgICAgIGtNdWx0aSA/IGRhdGFzZXQoZSwgaywgeCkgOiBlLnNldEF0dHJpYnV0ZShrLCAnJyArIHgpOyBcclxuICAgICAgICB9KSA6IHZvaWQgMCA9PT0gdiA/IHYgOiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0aGlzICAgIHtPYmplY3R8QXJyYXl9XHJcbiAgICAgKiBAcGFyYW0gICB7Kj19ICAga1xyXG4gICAgICogQHBhcmFtICAgeyo9fSAgIHZcclxuICAgICAqLyAgICBcclxuICAgIGVmZmluc1snYXR0ciddID0gZnVuY3Rpb24oaywgdikge1xyXG4gICAgICAgIHZhciBrTXVsdGkgPSB0eXBlb2YgayA9PSAnb2JqZWN0JyB8fCB0eXBlb2YgayA9PSAnZnVuY3Rpb24nO1xyXG4gICAgICAgIGlmICh2b2lkIDAgPT09IHYgJiYgIWtNdWx0aSlcclxuICAgICAgICAgICAgcmV0dXJuIGF0dHIodGhpc1swXSwgayk7IC8vIEdFVFxyXG4gICAgICAgIHJldHVybiBrID8gZWFjaE5vZGUodGhpcywgZnVuY3Rpb24oZSwgeCkge1xyXG4gICAgICAgICAgICB4ID0gdHlwZW9mIHYgPT0gJ2Z1bmN0aW9uJyA/IHYuY2FsbChlKSA6IHY7XHJcbiAgICAgICAgICAgIGtNdWx0aSA/IGF0dHIoZSwgaywgeCkgOiBlLnNldEF0dHJpYnV0ZShrLCAnJyArIHgpOyBcclxuICAgICAgICB9KSA6ICh2b2lkIDAgPT09IHYgPyB2IDogdGhpcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGRhdGEtIGF0dHJzIGZvciBlYWNoIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uLlxyXG4gICAgICogQHRoaXMgIHtPYmplY3R8QXJyYXl9XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gIGtleXMgIG9uZSBvciBtb3JlIFNTViBvciBDU1YgZGF0YSBhdHRyIGtleXMgb3IgbmFtZXNcclxuICAgICAqL1xyXG4gICAgZWZmaW5zWydkZWxldGVzJ10gPSBmdW5jdGlvbihrZXlzKSB7XHJcbiAgICAgICAgaWYgKHZvaWQgMCA9PT0ga2V5cylcclxuICAgICAgICAgICAgcmV0dXJuIGVhY2hOb2RlKHRoaXMsIHJlc2V0RGF0YXNldCk7XHJcbiAgICAgICAga2V5cyA9IHR5cGVvZiBrZXlzID09ICdzdHJpbmcnID8ga2V5cy5zcGxpdChzc3YpIDogW10uY29uY2F0KGtleXMpO1xyXG4gICAgICAgIHJldHVybiBlYWNoTm9kZSh0aGlzLCByZW1vdmVBdHRyLCBtYXAoa2V5cywgZGF0YXRpemUpKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGF0dHJidXRlcyBmb3IgZWFjaCBlbGVtZW50IGluIGEgY29sbGVjdGlvbi5cclxuICAgICAqIEB0aGlzICB7T2JqZWN0fEFycmF5fVxyXG4gICAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9ICBrZXlzICBvbmUgb3IgbW9yZSBTU1Ygb3IgQ1NWIGF0dHIgbmFtZXNcclxuICAgICAqL1xyXG4gICAgZWZmaW5zWydyZW1vdmVBdHRyJ10gPSBmdW5jdGlvbihrZXlzKSB7XHJcbiAgICAgICAgcmV0dXJuIGVhY2hOb2RlKHRoaXMsIHJlbW92ZUF0dHIsIGtleXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4geHBvcnRzO1xyXG59KSk7IiwiLypcblxuQ29weXJpZ2h0IChDKSAyMDExIGJ5IFllaHVkYSBLYXR6XG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cblxuKi9cblxuLy8gbGliL2hhbmRsZWJhcnMvYnJvd3Nlci1wcmVmaXguanNcbnZhciBIYW5kbGViYXJzID0ge307XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnM7XG5cbihmdW5jdGlvbihIYW5kbGViYXJzLCB1bmRlZmluZWQpIHtcbjtcbi8vIGxpYi9oYW5kbGViYXJzL2Jhc2UuanNcblxuSGFuZGxlYmFycy5WRVJTSU9OID0gXCIxLjAuMFwiO1xuSGFuZGxlYmFycy5DT01QSUxFUl9SRVZJU0lPTiA9IDQ7XG5cbkhhbmRsZWJhcnMuUkVWSVNJT05fQ0hBTkdFUyA9IHtcbiAgMTogJzw9IDEuMC5yYy4yJywgLy8gMS4wLnJjLjIgaXMgYWN0dWFsbHkgcmV2MiBidXQgZG9lc24ndCByZXBvcnQgaXRcbiAgMjogJz09IDEuMC4wLXJjLjMnLFxuICAzOiAnPT0gMS4wLjAtcmMuNCcsXG4gIDQ6ICc+PSAxLjAuMCdcbn07XG5cbkhhbmRsZWJhcnMuaGVscGVycyAgPSB7fTtcbkhhbmRsZWJhcnMucGFydGlhbHMgPSB7fTtcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxcbiAgICBmdW5jdGlvblR5cGUgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG9iamVjdFR5cGUgPSAnW29iamVjdCBPYmplY3RdJztcblxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlciA9IGZ1bmN0aW9uKG5hbWUsIGZuLCBpbnZlcnNlKSB7XG4gIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgaWYgKGludmVyc2UgfHwgZm4pIHsgdGhyb3cgbmV3IEhhbmRsZWJhcnMuRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgIEhhbmRsZWJhcnMuVXRpbHMuZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGludmVyc2UpIHsgZm4ubm90ID0gaW52ZXJzZTsgfVxuICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICB9XG59O1xuXG5IYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbCA9IGZ1bmN0aW9uKG5hbWUsIHN0cikge1xuICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgIEhhbmRsZWJhcnMuVXRpbHMuZXh0ZW5kKHRoaXMucGFydGlhbHMsICBuYW1lKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gc3RyO1xuICB9XG59O1xuXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdoZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oYXJnKSB7XG4gIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgaGVscGVyOiAnXCIgKyBhcmcgKyBcIidcIik7XG4gIH1cbn0pO1xuXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gIHZhciBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlIHx8IGZ1bmN0aW9uKCkge30sIGZuID0gb3B0aW9ucy5mbjtcblxuICB2YXIgdHlwZSA9IHRvU3RyaW5nLmNhbGwoY29udGV4dCk7XG5cbiAgaWYodHlwZSA9PT0gZnVuY3Rpb25UeXBlKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICBpZihjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGZuKHRoaXMpO1xuICB9IGVsc2UgaWYoY29udGV4dCA9PT0gZmFsc2UgfHwgY29udGV4dCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gIH0gZWxzZSBpZih0eXBlID09PSBcIltvYmplY3QgQXJyYXldXCIpIHtcbiAgICBpZihjb250ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBIYW5kbGViYXJzLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmbihjb250ZXh0KTtcbiAgfVxufSk7XG5cbkhhbmRsZWJhcnMuSyA9IGZ1bmN0aW9uKCkge307XG5cbkhhbmRsZWJhcnMuY3JlYXRlRnJhbWUgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uKG9iamVjdCkge1xuICBIYW5kbGViYXJzLksucHJvdG90eXBlID0gb2JqZWN0O1xuICB2YXIgb2JqID0gbmV3IEhhbmRsZWJhcnMuSygpO1xuICBIYW5kbGViYXJzLksucHJvdG90eXBlID0gbnVsbDtcbiAgcmV0dXJuIG9iajtcbn07XG5cbkhhbmRsZWJhcnMubG9nZ2VyID0ge1xuICBERUJVRzogMCwgSU5GTzogMSwgV0FSTjogMiwgRVJST1I6IDMsIGxldmVsOiAzLFxuXG4gIG1ldGhvZE1hcDogezA6ICdkZWJ1ZycsIDE6ICdpbmZvJywgMjogJ3dhcm4nLCAzOiAnZXJyb3InfSxcblxuICAvLyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiB0aGUgaG9zdCBlbnZpcm9ubWVudFxuICBsb2c6IGZ1bmN0aW9uKGxldmVsLCBvYmopIHtcbiAgICBpZiAoSGFuZGxlYmFycy5sb2dnZXIubGV2ZWwgPD0gbGV2ZWwpIHtcbiAgICAgIHZhciBtZXRob2QgPSBIYW5kbGViYXJzLmxvZ2dlci5tZXRob2RNYXBbbGV2ZWxdO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlW21ldGhvZF0pIHtcbiAgICAgICAgY29uc29sZVttZXRob2RdLmNhbGwoY29uc29sZSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbkhhbmRsZWJhcnMubG9nID0gZnVuY3Rpb24obGV2ZWwsIG9iaikgeyBIYW5kbGViYXJzLmxvZ2dlci5sb2cobGV2ZWwsIG9iaik7IH07XG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ2VhY2gnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gIHZhciBmbiA9IG9wdGlvbnMuZm4sIGludmVyc2UgPSBvcHRpb25zLmludmVyc2U7XG4gIHZhciBpID0gMCwgcmV0ID0gXCJcIiwgZGF0YTtcblxuICB2YXIgdHlwZSA9IHRvU3RyaW5nLmNhbGwoY29udGV4dCk7XG4gIGlmKHR5cGUgPT09IGZ1bmN0aW9uVHlwZSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgaWYgKG9wdGlvbnMuZGF0YSkge1xuICAgIGRhdGEgPSBIYW5kbGViYXJzLmNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gIH1cblxuICBpZihjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0Jykge1xuICAgIGlmKGNvbnRleHQgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICBmb3IodmFyIGogPSBjb250ZXh0Lmxlbmd0aDsgaTxqOyBpKyspIHtcbiAgICAgICAgaWYgKGRhdGEpIHsgZGF0YS5pbmRleCA9IGk7IH1cbiAgICAgICAgcmV0ID0gcmV0ICsgZm4oY29udGV4dFtpXSwgeyBkYXRhOiBkYXRhIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IodmFyIGtleSBpbiBjb250ZXh0KSB7XG4gICAgICAgIGlmKGNvbnRleHQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKGRhdGEpIHsgZGF0YS5rZXkgPSBrZXk7IH1cbiAgICAgICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2tleV0sIHtkYXRhOiBkYXRhfSk7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYoaSA9PT0gMCl7XG4gICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59KTtcblxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICB2YXIgdHlwZSA9IHRvU3RyaW5nLmNhbGwoY29uZGl0aW9uYWwpO1xuICBpZih0eXBlID09PSBmdW5jdGlvblR5cGUpIHsgY29uZGl0aW9uYWwgPSBjb25kaXRpb25hbC5jYWxsKHRoaXMpOyB9XG5cbiAgaWYoIWNvbmRpdGlvbmFsIHx8IEhhbmRsZWJhcnMuVXRpbHMuaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICB9XG59KTtcblxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcigndW5sZXNzJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIEhhbmRsZWJhcnMuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7Zm46IG9wdGlvbnMuaW52ZXJzZSwgaW52ZXJzZTogb3B0aW9ucy5mbn0pO1xufSk7XG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gIHZhciB0eXBlID0gdG9TdHJpbmcuY2FsbChjb250ZXh0KTtcbiAgaWYodHlwZSA9PT0gZnVuY3Rpb25UeXBlKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICBpZiAoIUhhbmRsZWJhcnMuVXRpbHMuaXNFbXB0eShjb250ZXh0KSkgcmV0dXJuIG9wdGlvbnMuZm4oY29udGV4dCk7XG59KTtcblxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignbG9nJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICB2YXIgbGV2ZWwgPSBvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhLmxldmVsICE9IG51bGwgPyBwYXJzZUludChvcHRpb25zLmRhdGEubGV2ZWwsIDEwKSA6IDE7XG4gIEhhbmRsZWJhcnMubG9nKGxldmVsLCBjb250ZXh0KTtcbn0pO1xuO1xuLy8gbGliL2hhbmRsZWJhcnMvdXRpbHMuanNcblxudmFyIGVycm9yUHJvcHMgPSBbJ2Rlc2NyaXB0aW9uJywgJ2ZpbGVOYW1lJywgJ2xpbmVOdW1iZXInLCAnbWVzc2FnZScsICduYW1lJywgJ251bWJlcicsICdzdGFjayddO1xuXG5IYW5kbGViYXJzLkV4Y2VwdGlvbiA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgdmFyIHRtcCA9IEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gIC8vIFVuZm9ydHVuYXRlbHkgZXJyb3JzIGFyZSBub3QgZW51bWVyYWJsZSBpbiBDaHJvbWUgKGF0IGxlYXN0KSwgc28gYGZvciBwcm9wIGluIHRtcGAgZG9lc24ndCB3b3JrLlxuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBlcnJvclByb3BzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzW2Vycm9yUHJvcHNbaWR4XV0gPSB0bXBbZXJyb3JQcm9wc1tpZHhdXTtcbiAgfVxufTtcbkhhbmRsZWJhcnMuRXhjZXB0aW9uLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuXG4vLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuSGFuZGxlYmFycy5TYWZlU3RyaW5nID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xufTtcbkhhbmRsZWJhcnMuU2FmZVN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc3RyaW5nLnRvU3RyaW5nKCk7XG59O1xuXG52YXIgZXNjYXBlID0ge1xuICBcIiZcIjogXCImYW1wO1wiLFxuICBcIjxcIjogXCImbHQ7XCIsXG4gIFwiPlwiOiBcIiZndDtcIixcbiAgJ1wiJzogXCImcXVvdDtcIixcbiAgXCInXCI6IFwiJiN4Mjc7XCIsXG4gIFwiYFwiOiBcIiYjeDYwO1wiXG59O1xuXG52YXIgYmFkQ2hhcnMgPSAvWyY8PlwiJ2BdL2c7XG52YXIgcG9zc2libGUgPSAvWyY8PlwiJ2BdLztcblxudmFyIGVzY2FwZUNoYXIgPSBmdW5jdGlvbihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdIHx8IFwiJmFtcDtcIjtcbn07XG5cbkhhbmRsZWJhcnMuVXRpbHMgPSB7XG4gIGV4dGVuZDogZnVuY3Rpb24ob2JqLCB2YWx1ZSkge1xuICAgIGZvcih2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICBpZih2YWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWVba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZXNjYXBlRXhwcmVzc2lvbjogZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgaW5zdGFuY2VvZiBIYW5kbGViYXJzLlNhZmVTdHJpbmcpIHtcbiAgICAgIHJldHVybiBzdHJpbmcudG9TdHJpbmcoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsIHx8IHN0cmluZyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIC8vIEZvcmNlIGEgc3RyaW5nIGNvbnZlcnNpb24gYXMgdGhpcyB3aWxsIGJlIGRvbmUgYnkgdGhlIGFwcGVuZCByZWdhcmRsZXNzIGFuZFxuICAgIC8vIHRoZSByZWdleCB0ZXN0IHdpbGwgZG8gdGhpcyB0cmFuc3BhcmVudGx5IGJlaGluZCB0aGUgc2NlbmVzLCBjYXVzaW5nIGlzc3VlcyBpZlxuICAgIC8vIGFuIG9iamVjdCdzIHRvIHN0cmluZyBoYXMgZXNjYXBlZCBjaGFyYWN0ZXJzIGluIGl0LlxuICAgIHN0cmluZyA9IHN0cmluZy50b1N0cmluZygpO1xuXG4gICAgaWYoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGJhZENoYXJzLCBlc2NhcGVDaGFyKTtcbiAgfSxcblxuICBpc0VtcHR5OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZih0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG47XG4vLyBsaWIvaGFuZGxlYmFycy9ydW50aW1lLmpzXG5cbkhhbmRsZWJhcnMuVk0gPSB7XG4gIHRlbXBsYXRlOiBmdW5jdGlvbih0ZW1wbGF0ZVNwZWMpIHtcbiAgICAvLyBKdXN0IGFkZCB3YXRlclxuICAgIHZhciBjb250YWluZXIgPSB7XG4gICAgICBlc2NhcGVFeHByZXNzaW9uOiBIYW5kbGViYXJzLlV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG4gICAgICBpbnZva2VQYXJ0aWFsOiBIYW5kbGViYXJzLlZNLmludm9rZVBhcnRpYWwsXG4gICAgICBwcm9ncmFtczogW10sXG4gICAgICBwcm9ncmFtOiBmdW5jdGlvbihpLCBmbiwgZGF0YSkge1xuICAgICAgICB2YXIgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldO1xuICAgICAgICBpZihkYXRhKSB7XG4gICAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSBIYW5kbGViYXJzLlZNLnByb2dyYW0oaSwgZm4sIGRhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKCFwcm9ncmFtV3JhcHBlcikge1xuICAgICAgICAgIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSA9IEhhbmRsZWJhcnMuVk0ucHJvZ3JhbShpLCBmbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuICAgICAgfSxcbiAgICAgIG1lcmdlOiBmdW5jdGlvbihwYXJhbSwgY29tbW9uKSB7XG4gICAgICAgIHZhciByZXQgPSBwYXJhbSB8fCBjb21tb247XG5cbiAgICAgICAgaWYgKHBhcmFtICYmIGNvbW1vbikge1xuICAgICAgICAgIHJldCA9IHt9O1xuICAgICAgICAgIEhhbmRsZWJhcnMuVXRpbHMuZXh0ZW5kKHJldCwgY29tbW9uKTtcbiAgICAgICAgICBIYW5kbGViYXJzLlV0aWxzLmV4dGVuZChyZXQsIHBhcmFtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfSxcbiAgICAgIHByb2dyYW1XaXRoRGVwdGg6IEhhbmRsZWJhcnMuVk0ucHJvZ3JhbVdpdGhEZXB0aCxcbiAgICAgIG5vb3A6IEhhbmRsZWJhcnMuVk0ubm9vcCxcbiAgICAgIGNvbXBpbGVySW5mbzogbnVsbFxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICB2YXIgcmVzdWx0ID0gdGVtcGxhdGVTcGVjLmNhbGwoY29udGFpbmVyLCBIYW5kbGViYXJzLCBjb250ZXh0LCBvcHRpb25zLmhlbHBlcnMsIG9wdGlvbnMucGFydGlhbHMsIG9wdGlvbnMuZGF0YSk7XG5cbiAgICAgIHZhciBjb21waWxlckluZm8gPSBjb250YWluZXIuY29tcGlsZXJJbmZvIHx8IFtdLFxuICAgICAgICAgIGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm9bMF0gfHwgMSxcbiAgICAgICAgICBjdXJyZW50UmV2aXNpb24gPSBIYW5kbGViYXJzLkNPTVBJTEVSX1JFVklTSU9OO1xuXG4gICAgICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgICAgIGlmIChjb21waWxlclJldmlzaW9uIDwgY3VycmVudFJldmlzaW9uKSB7XG4gICAgICAgICAgdmFyIHJ1bnRpbWVWZXJzaW9ucyA9IEhhbmRsZWJhcnMuUkVWSVNJT05fQ0hBTkdFU1tjdXJyZW50UmV2aXNpb25dLFxuICAgICAgICAgICAgICBjb21waWxlclZlcnNpb25zID0gSGFuZGxlYmFycy5SRVZJU0lPTl9DSEFOR0VTW2NvbXBpbGVyUmV2aXNpb25dO1xuICAgICAgICAgIHRocm93IFwiVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gXCIrXG4gICAgICAgICAgICAgICAgXCJQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uIChcIitydW50aW1lVmVyc2lvbnMrXCIpIG9yIGRvd25ncmFkZSB5b3VyIHJ1bnRpbWUgdG8gYW4gb2xkZXIgdmVyc2lvbiAoXCIrY29tcGlsZXJWZXJzaW9ucytcIikuXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVXNlIHRoZSBlbWJlZGRlZCB2ZXJzaW9uIGluZm8gc2luY2UgdGhlIHJ1bnRpbWUgZG9lc24ndCBrbm93IGFib3V0IHRoaXMgcmV2aXNpb24geWV0XG4gICAgICAgICAgdGhyb3cgXCJUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuIFwiK1xuICAgICAgICAgICAgICAgIFwiUGxlYXNlIHVwZGF0ZSB5b3VyIHJ1bnRpbWUgdG8gYSBuZXdlciB2ZXJzaW9uIChcIitjb21waWxlckluZm9bMV0rXCIpLlwiO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfSxcblxuICBwcm9ncmFtV2l0aERlcHRoOiBmdW5jdGlvbihpLCBmbiwgZGF0YSAvKiwgJGRlcHRoICovKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpO1xuXG4gICAgdmFyIHByb2dyYW0gPSBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIFtjb250ZXh0LCBvcHRpb25zLmRhdGEgfHwgZGF0YV0uY29uY2F0KGFyZ3MpKTtcbiAgICB9O1xuICAgIHByb2dyYW0ucHJvZ3JhbSA9IGk7XG4gICAgcHJvZ3JhbS5kZXB0aCA9IGFyZ3MubGVuZ3RoO1xuICAgIHJldHVybiBwcm9ncmFtO1xuICB9LFxuICBwcm9ncmFtOiBmdW5jdGlvbihpLCBmbiwgZGF0YSkge1xuICAgIHZhciBwcm9ncmFtID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zLmRhdGEgfHwgZGF0YSk7XG4gICAgfTtcbiAgICBwcm9ncmFtLnByb2dyYW0gPSBpO1xuICAgIHByb2dyYW0uZGVwdGggPSAwO1xuICAgIHJldHVybiBwcm9ncmFtO1xuICB9LFxuICBub29wOiBmdW5jdGlvbigpIHsgcmV0dXJuIFwiXCI7IH0sXG4gIGludm9rZVBhcnRpYWw6IGZ1bmN0aW9uKHBhcnRpYWwsIG5hbWUsIGNvbnRleHQsIGhlbHBlcnMsIHBhcnRpYWxzLCBkYXRhKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7IGhlbHBlcnM6IGhlbHBlcnMsIHBhcnRpYWxzOiBwYXJ0aWFscywgZGF0YTogZGF0YSB9O1xuXG4gICAgaWYocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgSGFuZGxlYmFycy5FeGNlcHRpb24oXCJUaGUgcGFydGlhbCBcIiArIG5hbWUgKyBcIiBjb3VsZCBub3QgYmUgZm91bmRcIik7XG4gICAgfSBlbHNlIGlmKHBhcnRpYWwgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIHBhcnRpYWwoY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmICghSGFuZGxlYmFycy5jb21waWxlKSB7XG4gICAgICB0aHJvdyBuZXcgSGFuZGxlYmFycy5FeGNlcHRpb24oXCJUaGUgcGFydGlhbCBcIiArIG5hbWUgKyBcIiBjb3VsZCBub3QgYmUgY29tcGlsZWQgd2hlbiBydW5uaW5nIGluIHJ1bnRpbWUtb25seSBtb2RlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWFsc1tuYW1lXSA9IEhhbmRsZWJhcnMuY29tcGlsZShwYXJ0aWFsLCB7ZGF0YTogZGF0YSAhPT0gdW5kZWZpbmVkfSk7XG4gICAgICByZXR1cm4gcGFydGlhbHNbbmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG59O1xuXG5IYW5kbGViYXJzLnRlbXBsYXRlID0gSGFuZGxlYmFycy5WTS50ZW1wbGF0ZTtcbjtcbi8vIGxpYi9oYW5kbGViYXJzL2Jyb3dzZXItc3VmZml4LmpzXG59KShIYW5kbGViYXJzKTtcbjtcbiIsIi8vIExvY2F0aW9uQmFyIG1vZHVsZSBleHRyYWN0ZWQgZnJvbSBCYWNrYm9uZS5qcyAxLjAuMFxuLy8gKGFjdHVhbGx5IGl0J3MgY29tbWl0IGY2ZmEwY2I4N2UyNmJiM2QxYjdmNDcxNDRmZDcyMGQxYWI0OGU4OGYpXG4vL1xuLy8gdGhlIGRlcGVuZGVuY3kgb24gYmFja2JvbmUsIHVuZGVyc2NvcmUgYW5kIGpxdWVyeSBoYXZlIGJlZW4gcmVtb3ZlZCB0byB0dXJuXG4vLyB0aGlzIGludG8gYSBzbWFsbCBzdGFuZGFsb25lIGxpYnJhcnkgZm9yIGhhbmRsaW5nIGJyb3dzZXIncyBoaXN0b3J5IEFQSVxuLy8gY3Jvc3MgYnJvd3NlciBhbmQgd2l0aCBhIGZhbGxiYWNrIHRvIGhhc2hjaGFuZ2UgZXZlbnRzIG9yIHBvbGxpbmcuXG5cbihmdW5jdGlvbihkZWZpbmUpIHtcbmRlZmluZShmdW5jdGlvbigpIHtcblxuICAvLyAzIGhlbHBlciBmdW5jdGlvbnMgd2UgdXNlIHRvIGF2b2lkIHB1bGxpbmcgaW4gZW50aXJlIF8gYW5kICRcbiAgZnVuY3Rpb24gZXh0ZW5kKG9iaiwgc291cmNlKSB7XG4gICAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBmdW5jdGlvbiBvbihvYmosIHR5cGUsIGZuKSB7XG4gICAgaWYgKG9iai5hdHRhY2hFdmVudCkge1xuICAgICAgb2JqWydlJyt0eXBlK2ZuXSA9IGZuO1xuICAgICAgb2JqW3R5cGUrZm5dID0gZnVuY3Rpb24oKXsgb2JqWydlJyt0eXBlK2ZuXSggd2luZG93LmV2ZW50ICk7IH07XG4gICAgICBvYmouYXR0YWNoRXZlbnQoICdvbicrdHlwZSwgb2JqW3R5cGUrZm5dICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9iai5hZGRFdmVudExpc3RlbmVyKCB0eXBlLCBmbiwgZmFsc2UgKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gb2ZmKG9iaiwgdHlwZSwgZm4pIHtcbiAgICBpZiAob2JqLmRldGFjaEV2ZW50KSB7XG4gICAgICBvYmouZGV0YWNoRXZlbnQoJ29uJyt0eXBlLCBvYmpbdHlwZStmbl0pO1xuICAgICAgb2JqW3R5cGUrZm5dID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuXG5cblxuXG4gIC8vIHRoaXMgaXMgbW9zdGx5IG9yaWdpbmFsIGNvZGUgd2l0aCBtaW5vciBtb2RpZmljYXRpb25zLCBtb3N0eWxlIHRvIGF2b2lkXG4gIC8vIGRlcGVuZGVuY3kgb24gM3JkIHBhcnR5IGxpYnJhcmllcyArIHJlbmFtaW5nIEJhY2tib25lLkhpc3RvcnkgLT4gTG9jYXRpb25CYXJcbiAgLy9cbiAgLy8gQmFja2JvbmUuSGlzdG9yeVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gSGFuZGxlcyBjcm9zcy1icm93c2VyIGhpc3RvcnkgbWFuYWdlbWVudCwgYmFzZWQgb24gZWl0aGVyXG4gIC8vIFtwdXNoU3RhdGVdKGh0dHA6Ly9kaXZlaW50b2h0bWw1LmluZm8vaGlzdG9yeS5odG1sKSBhbmQgcmVhbCBVUkxzLCBvclxuICAvLyBbb25oYXNoY2hhbmdlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0RPTS93aW5kb3cub25oYXNoY2hhbmdlKVxuICAvLyBhbmQgVVJMIGZyYWdtZW50cy4gSWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgbmVpdGhlciAob2xkIElFLCBuYXRjaCksXG4gIC8vIGZhbGxzIGJhY2sgdG8gcG9sbGluZy5cbiAgdmFyIExvY2F0aW9uQmFyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuXG4gICAgLy8gTU9ESUZJQ0FUSU9OIE9GIE9SSUdJTkFMIEJBQ0tCT05FLkhJU1RPUllcbiAgICAvL1xuICAgIC8vIF8uYmluZEFsbCh0aGlzLCAnY2hlY2tVcmwnKTtcbiAgICAvL1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgY2hlY2tVcmwgPSB0aGlzLmNoZWNrVXJsO1xuICAgIHRoaXMuY2hlY2tVcmwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjaGVja1VybC5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBgTG9jYXRpb25CYXJgIGNhbiBiZSB1c2VkIG91dHNpZGUgb2YgdGhlIGJyb3dzZXIuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uO1xuICAgICAgdGhpcy5oaXN0b3J5ID0gd2luZG93Lmhpc3Rvcnk7XG4gICAgfVxuICB9O1xuXG4gIC8vIENhY2hlZCByZWdleCBmb3Igc3RyaXBwaW5nIGEgbGVhZGluZyBoYXNoL3NsYXNoIGFuZCB0cmFpbGluZyBzcGFjZS5cbiAgdmFyIHJvdXRlU3RyaXBwZXIgPSAvXlsjXFwvXXxcXHMrJC9nO1xuXG4gIC8vIENhY2hlZCByZWdleCBmb3Igc3RyaXBwaW5nIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMuXG4gIHZhciByb290U3RyaXBwZXIgPSAvXlxcLyt8XFwvKyQvZztcblxuICAvLyBDYWNoZWQgcmVnZXggZm9yIGRldGVjdGluZyBNU0lFLlxuICB2YXIgaXNFeHBsb3JlciA9IC9tc2llIFtcXHcuXSsvO1xuXG4gIC8vIENhY2hlZCByZWdleCBmb3IgcmVtb3ZpbmcgYSB0cmFpbGluZyBzbGFzaC5cbiAgdmFyIHRyYWlsaW5nU2xhc2ggPSAvXFwvJC87XG5cbiAgLy8gQ2FjaGVkIHJlZ2V4IGZvciBzdHJpcHBpbmcgdXJscyBvZiBoYXNoIGFuZCBxdWVyeS5cbiAgdmFyIHBhdGhTdHJpcHBlciA9IC9bPyNdLiokLztcblxuICAvLyBIYXMgdGhlIGhpc3RvcnkgaGFuZGxpbmcgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQ/XG4gIExvY2F0aW9uQmFyLnN0YXJ0ZWQgPSBmYWxzZTtcblxuICAvLyBTZXQgdXAgYWxsIGluaGVyaXRhYmxlICoqTG9jYXRpb25CYXIqKiBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzLlxuICBleHRlbmQoTG9jYXRpb25CYXIucHJvdG90eXBlLCB7XG5cbiAgICAvLyBUaGUgZGVmYXVsdCBpbnRlcnZhbCB0byBwb2xsIGZvciBoYXNoIGNoYW5nZXMsIGlmIG5lY2Vzc2FyeSwgaXNcbiAgICAvLyB0d2VudHkgdGltZXMgYSBzZWNvbmQuXG4gICAgaW50ZXJ2YWw6IDUwLFxuXG4gICAgLy8gR2V0cyB0aGUgdHJ1ZSBoYXNoIHZhbHVlLiBDYW5ub3QgdXNlIGxvY2F0aW9uLmhhc2ggZGlyZWN0bHkgZHVlIHRvIGJ1Z1xuICAgIC8vIGluIEZpcmVmb3ggd2hlcmUgbG9jYXRpb24uaGFzaCB3aWxsIGFsd2F5cyBiZSBkZWNvZGVkLlxuICAgIGdldEhhc2g6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgICAgdmFyIG1hdGNoID0gKHdpbmRvdyB8fCB0aGlzKS5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcbiAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogJyc7XG4gICAgfSxcblxuICAgIC8vIEdldCB0aGUgY3Jvc3MtYnJvd3NlciBub3JtYWxpemVkIFVSTCBmcmFnbWVudCwgZWl0aGVyIGZyb20gdGhlIFVSTCxcbiAgICAvLyB0aGUgaGFzaCwgb3IgdGhlIG92ZXJyaWRlLlxuICAgIGdldEZyYWdtZW50OiBmdW5jdGlvbihmcmFnbWVudCwgZm9yY2VQdXNoU3RhdGUpIHtcbiAgICAgIGlmIChmcmFnbWVudCA9PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLl9oYXNQdXNoU3RhdGUgfHwgIXRoaXMuX3dhbnRzSGFzaENoYW5nZSB8fCBmb3JjZVB1c2hTdGF0ZSkge1xuICAgICAgICAgIGZyYWdtZW50ID0gdGhpcy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgICB2YXIgcm9vdCA9IHRoaXMucm9vdC5yZXBsYWNlKHRyYWlsaW5nU2xhc2gsICcnKTtcbiAgICAgICAgICBpZiAoIWZyYWdtZW50LmluZGV4T2Yocm9vdCkpIGZyYWdtZW50ID0gZnJhZ21lbnQuc2xpY2Uocm9vdC5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZyYWdtZW50ID0gdGhpcy5nZXRIYXNoKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmcmFnbWVudC5yZXBsYWNlKHJvdXRlU3RyaXBwZXIsICcnKTtcbiAgICB9LFxuXG4gICAgLy8gU3RhcnQgdGhlIGhhc2ggY2hhbmdlIGhhbmRsaW5nLCByZXR1cm5pbmcgYHRydWVgIGlmIHRoZSBjdXJyZW50IFVSTCBtYXRjaGVzXG4gICAgLy8gYW4gZXhpc3Rpbmcgcm91dGUsIGFuZCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICBzdGFydDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgaWYgKExvY2F0aW9uQmFyLnN0YXJ0ZWQpIHRocm93IG5ldyBFcnJvcihcIkxvY2F0aW9uQmFyIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZFwiKTtcbiAgICAgIExvY2F0aW9uQmFyLnN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICAvLyBGaWd1cmUgb3V0IHRoZSBpbml0aWFsIGNvbmZpZ3VyYXRpb24uIERvIHdlIG5lZWQgYW4gaWZyYW1lP1xuICAgICAgLy8gSXMgcHVzaFN0YXRlIGRlc2lyZWQgLi4uIGlzIGl0IGF2YWlsYWJsZT9cbiAgICAgIHRoaXMub3B0aW9ucyAgICAgICAgICA9IGV4dGVuZCh7cm9vdDogJy8nfSwgb3B0aW9ucyk7XG4gICAgICB0aGlzLnJvb3QgICAgICAgICAgICAgPSB0aGlzLm9wdGlvbnMucm9vdDtcbiAgICAgIHRoaXMuX3dhbnRzSGFzaENoYW5nZSA9IHRoaXMub3B0aW9ucy5oYXNoQ2hhbmdlICE9PSBmYWxzZTtcbiAgICAgIHRoaXMuX3dhbnRzUHVzaFN0YXRlICA9ICEhdGhpcy5vcHRpb25zLnB1c2hTdGF0ZTtcbiAgICAgIHRoaXMuX2hhc1B1c2hTdGF0ZSAgICA9ICEhKHRoaXMub3B0aW9ucy5wdXNoU3RhdGUgJiYgdGhpcy5oaXN0b3J5ICYmIHRoaXMuaGlzdG9yeS5wdXNoU3RhdGUpO1xuICAgICAgdmFyIGZyYWdtZW50ICAgICAgICAgID0gdGhpcy5nZXRGcmFnbWVudCgpO1xuICAgICAgdmFyIGRvY01vZGUgICAgICAgICAgID0gZG9jdW1lbnQuZG9jdW1lbnRNb2RlO1xuICAgICAgdmFyIG9sZElFICAgICAgICAgICAgID0gKGlzRXhwbG9yZXIuZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpICYmICghZG9jTW9kZSB8fCBkb2NNb2RlIDw9IDcpKTtcblxuICAgICAgLy8gTm9ybWFsaXplIHJvb3QgdG8gYWx3YXlzIGluY2x1ZGUgYSBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaC5cbiAgICAgIHRoaXMucm9vdCA9ICgnLycgKyB0aGlzLnJvb3QgKyAnLycpLnJlcGxhY2Uocm9vdFN0cmlwcGVyLCAnLycpO1xuXG4gICAgICBpZiAob2xkSUUgJiYgdGhpcy5fd2FudHNIYXNoQ2hhbmdlKSB7XG4gICAgICAgIC8vIE1PRElGSUNBVElPTiBPRiBPUklHSU5BTCBCQUNLQk9ORS5ISVNUT1JZXG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRoaXMuaWZyYW1lID0gJCgnPGlmcmFtZSBzcmM9XCJqYXZhc2NyaXB0OjBcIiB0YWJpbmRleD1cIi0xXCIgLz4nKS5oaWRlKCkuYXBwZW5kVG8oJ2JvZHknKVswXS5jb250ZW50V2luZG93O1xuICAgICAgICAvL1xuICAgICAgICB0aGlzLmlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgICAgIHRoaXMuaWZyYW1lLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImphdmFzY3JpcHQ6MFwiKTtcbiAgICAgICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgLTEpO1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5pZnJhbWUpO1xuICAgICAgICB0aGlzLmlmcmFtZSA9IHRoaXMuaWZyYW1lLmNvbnRlbnRXaW5kb3c7XG4gICAgICAgIHRoaXMubmF2aWdhdGUoZnJhZ21lbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBEZXBlbmRpbmcgb24gd2hldGhlciB3ZSdyZSB1c2luZyBwdXNoU3RhdGUgb3IgaGFzaGVzLCBhbmQgd2hldGhlclxuICAgICAgLy8gJ29uaGFzaGNoYW5nZScgaXMgc3VwcG9ydGVkLCBkZXRlcm1pbmUgaG93IHdlIGNoZWNrIHRoZSBVUkwgc3RhdGUuXG4gICAgICBpZiAodGhpcy5faGFzUHVzaFN0YXRlKSB7XG4gICAgICAgIG9uKHdpbmRvdywgJ3BvcHN0YXRlJywgdGhpcy5jaGVja1VybCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3dhbnRzSGFzaENoYW5nZSAmJiAoJ29uaGFzaGNoYW5nZScgaW4gd2luZG93KSAmJiAhb2xkSUUpIHtcbiAgICAgICAgb24od2luZG93LCAnaGFzaGNoYW5nZScsIHRoaXMuY2hlY2tVcmwpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl93YW50c0hhc2hDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tVcmxJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuY2hlY2tVcmwsIHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgfVxuXG4gICAgICAvLyBEZXRlcm1pbmUgaWYgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGJhc2UgdXJsLCBmb3IgYSBwdXNoU3RhdGUgbGlua1xuICAgICAgLy8gb3BlbmVkIGJ5IGEgbm9uLXB1c2hTdGF0ZSBicm93c2VyLlxuICAgICAgdGhpcy5mcmFnbWVudCA9IGZyYWdtZW50O1xuICAgICAgdmFyIGxvYyA9IHRoaXMubG9jYXRpb247XG4gICAgICB2YXIgYXRSb290ID0gbG9jLnBhdGhuYW1lLnJlcGxhY2UoL1teXFwvXSQvLCAnJCYvJykgPT09IHRoaXMucm9vdDtcblxuICAgICAgLy8gVHJhbnNpdGlvbiBmcm9tIGhhc2hDaGFuZ2UgdG8gcHVzaFN0YXRlIG9yIHZpY2UgdmVyc2EgaWYgYm90aCBhcmVcbiAgICAgIC8vIHJlcXVlc3RlZC5cbiAgICAgIGlmICh0aGlzLl93YW50c0hhc2hDaGFuZ2UgJiYgdGhpcy5fd2FudHNQdXNoU3RhdGUpIHtcblxuICAgICAgICAvLyBJZiB3ZSd2ZSBzdGFydGVkIG9mZiB3aXRoIGEgcm91dGUgZnJvbSBhIGBwdXNoU3RhdGVgLWVuYWJsZWRcbiAgICAgICAgLy8gYnJvd3NlciwgYnV0IHdlJ3JlIGN1cnJlbnRseSBpbiBhIGJyb3dzZXIgdGhhdCBkb2Vzbid0IHN1cHBvcnQgaXQuLi5cbiAgICAgICAgaWYgKCF0aGlzLl9oYXNQdXNoU3RhdGUgJiYgIWF0Um9vdCkge1xuICAgICAgICAgIHRoaXMuZnJhZ21lbnQgPSB0aGlzLmdldEZyYWdtZW50KG51bGwsIHRydWUpO1xuICAgICAgICAgIHRoaXMubG9jYXRpb24ucmVwbGFjZSh0aGlzLnJvb3QgKyB0aGlzLmxvY2F0aW9uLnNlYXJjaCArICcjJyArIHRoaXMuZnJhZ21lbnQpO1xuICAgICAgICAgIC8vIFJldHVybiBpbW1lZGlhdGVseSBhcyBicm93c2VyIHdpbGwgZG8gcmVkaXJlY3QgdG8gbmV3IHVybFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIC8vIE9yIGlmIHdlJ3ZlIHN0YXJ0ZWQgb3V0IHdpdGggYSBoYXNoLWJhc2VkIHJvdXRlLCBidXQgd2UncmUgY3VycmVudGx5XG4gICAgICAgIC8vIGluIGEgYnJvd3NlciB3aGVyZSBpdCBjb3VsZCBiZSBgcHVzaFN0YXRlYC1iYXNlZCBpbnN0ZWFkLi4uXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFzUHVzaFN0YXRlICYmIGF0Um9vdCAmJiBsb2MuaGFzaCkge1xuICAgICAgICAgIHRoaXMuZnJhZ21lbnQgPSB0aGlzLmdldEhhc2goKS5yZXBsYWNlKHJvdXRlU3RyaXBwZXIsICcnKTtcbiAgICAgICAgICB0aGlzLmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgdGhpcy5yb290ICsgdGhpcy5mcmFnbWVudCArIGxvYy5zZWFyY2gpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuc2lsZW50KSByZXR1cm4gdGhpcy5sb2FkVXJsKCk7XG4gICAgfSxcblxuICAgIC8vIERpc2FibGUgQmFja2JvbmUuaGlzdG9yeSwgcGVyaGFwcyB0ZW1wb3JhcmlseS4gTm90IHVzZWZ1bCBpbiBhIHJlYWwgYXBwLFxuICAgIC8vIGJ1dCBwb3NzaWJseSB1c2VmdWwgZm9yIHVuaXQgdGVzdGluZyBSb3V0ZXJzLlxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgb2ZmKHdpbmRvdywgJ3BvcHN0YXRlJywgdGhpcy5jaGVja1VybCk7XG4gICAgICBvZmYod2luZG93LCAnaGFzaGNoYW5nZScsIHRoaXMuY2hlY2tVcmwpO1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9jaGVja1VybEludGVydmFsKTtcbiAgICAgIExvY2F0aW9uQmFyLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgLy8gQWRkIGEgcm91dGUgdG8gYmUgdGVzdGVkIHdoZW4gdGhlIGZyYWdtZW50IGNoYW5nZXMuIFJvdXRlcyBhZGRlZCBsYXRlclxuICAgIC8vIG1heSBvdmVycmlkZSBwcmV2aW91cyByb3V0ZXMuXG4gICAgcm91dGU6IGZ1bmN0aW9uKHJvdXRlLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5oYW5kbGVycy51bnNoaWZ0KHtyb3V0ZTogcm91dGUsIGNhbGxiYWNrOiBjYWxsYmFja30pO1xuICAgIH0sXG5cbiAgICAvLyBDaGVja3MgdGhlIGN1cnJlbnQgVVJMIHRvIHNlZSBpZiBpdCBoYXMgY2hhbmdlZCwgYW5kIGlmIGl0IGhhcyxcbiAgICAvLyBjYWxscyBgbG9hZFVybGAsIG5vcm1hbGl6aW5nIGFjcm9zcyB0aGUgaGlkZGVuIGlmcmFtZS5cbiAgICBjaGVja1VybDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY3VycmVudCA9IHRoaXMuZ2V0RnJhZ21lbnQoKTtcbiAgICAgIGlmIChjdXJyZW50ID09PSB0aGlzLmZyYWdtZW50ICYmIHRoaXMuaWZyYW1lKSB7XG4gICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldEZyYWdtZW50KHRoaXMuZ2V0SGFzaCh0aGlzLmlmcmFtZSkpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMuZnJhZ21lbnQpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmlmcmFtZSkgdGhpcy5uYXZpZ2F0ZShjdXJyZW50KTtcbiAgICAgIHRoaXMubG9hZFVybCgpO1xuICAgIH0sXG5cbiAgICAvLyBBdHRlbXB0IHRvIGxvYWQgdGhlIGN1cnJlbnQgVVJMIGZyYWdtZW50LiBJZiBhIHJvdXRlIHN1Y2NlZWRzIHdpdGggYVxuICAgIC8vIG1hdGNoLCByZXR1cm5zIGB0cnVlYC4gSWYgbm8gZGVmaW5lZCByb3V0ZXMgbWF0Y2hlcyB0aGUgZnJhZ21lbnQsXG4gICAgLy8gcmV0dXJucyBgZmFsc2VgLlxuICAgIGxvYWRVcmw6IGZ1bmN0aW9uKGZyYWdtZW50KSB7XG4gICAgICAvLyBNT0RJRklDQVRJT04gT0YgT1JJR0lOQUwgQkFDS0JPTkUuSElTVE9SWVxuICAgICAgLy9cbiAgICAgIC8vIHJldHVybiBfLmFueSh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAvLyAgIGlmIChoYW5kbGVyLnJvdXRlLnRlc3QoZnJhZ21lbnQpKSB7XG4gICAgICAvLyAgICAgaGFuZGxlci5jYWxsYmFjayhmcmFnbWVudCk7XG4gICAgICAvLyAgICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pO1xuICAgICAgLy9cbiAgICAgIGZyYWdtZW50ID0gdGhpcy5mcmFnbWVudCA9IHRoaXMuZ2V0RnJhZ21lbnQoZnJhZ21lbnQpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmhhbmRsZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMuaGFuZGxlcnNbaV07XG4gICAgICAgIGlmIChoYW5kbGVyLnJvdXRlLnRlc3QoZnJhZ21lbnQpKSB7XG4gICAgICAgICAgaGFuZGxlci5jYWxsYmFjayhmcmFnbWVudCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLy8gU2F2ZSBhIGZyYWdtZW50IGludG8gdGhlIGhhc2ggaGlzdG9yeSwgb3IgcmVwbGFjZSB0aGUgVVJMIHN0YXRlIGlmIHRoZVxuICAgIC8vICdyZXBsYWNlJyBvcHRpb24gaXMgcGFzc2VkLiBZb3UgYXJlIHJlc3BvbnNpYmxlIGZvciBwcm9wZXJseSBVUkwtZW5jb2RpbmdcbiAgICAvLyB0aGUgZnJhZ21lbnQgaW4gYWR2YW5jZS5cbiAgICAvL1xuICAgIC8vIFRoZSBvcHRpb25zIG9iamVjdCBjYW4gY29udGFpbiBgdHJpZ2dlcjogdHJ1ZWAgaWYgeW91IHdpc2ggdG8gaGF2ZSB0aGVcbiAgICAvLyByb3V0ZSBjYWxsYmFjayBiZSBmaXJlZCAobm90IHVzdWFsbHkgZGVzaXJhYmxlKSwgb3IgYHJlcGxhY2U6IHRydWVgLCBpZlxuICAgIC8vIHlvdSB3aXNoIHRvIG1vZGlmeSB0aGUgY3VycmVudCBVUkwgd2l0aG91dCBhZGRpbmcgYW4gZW50cnkgdG8gdGhlIGhpc3RvcnkuXG4gICAgbmF2aWdhdGU6IGZ1bmN0aW9uKGZyYWdtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoIUxvY2F0aW9uQmFyLnN0YXJ0ZWQpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICghb3B0aW9ucyB8fCBvcHRpb25zID09PSB0cnVlKSBvcHRpb25zID0ge3RyaWdnZXI6ICEhb3B0aW9uc307XG5cbiAgICAgIHZhciB1cmwgPSB0aGlzLnJvb3QgKyAoZnJhZ21lbnQgPSB0aGlzLmdldEZyYWdtZW50KGZyYWdtZW50IHx8ICcnKSk7XG5cbiAgICAgIC8vIFN0cmlwIHRoZSBmcmFnbWVudCBvZiB0aGUgcXVlcnkgYW5kIGhhc2ggZm9yIG1hdGNoaW5nLlxuICAgICAgZnJhZ21lbnQgPSBmcmFnbWVudC5yZXBsYWNlKHBhdGhTdHJpcHBlciwgJycpO1xuXG4gICAgICBpZiAodGhpcy5mcmFnbWVudCA9PT0gZnJhZ21lbnQpIHJldHVybjtcbiAgICAgIHRoaXMuZnJhZ21lbnQgPSBmcmFnbWVudDtcblxuICAgICAgLy8gRG9uJ3QgaW5jbHVkZSBhIHRyYWlsaW5nIHNsYXNoIG9uIHRoZSByb290LlxuICAgICAgaWYgKGZyYWdtZW50ID09PSAnJyAmJiB1cmwgIT09ICcvJykgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcblxuICAgICAgLy8gSWYgcHVzaFN0YXRlIGlzIGF2YWlsYWJsZSwgd2UgdXNlIGl0IHRvIHNldCB0aGUgZnJhZ21lbnQgYXMgYSByZWFsIFVSTC5cbiAgICAgIGlmICh0aGlzLl9oYXNQdXNoU3RhdGUpIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5W29wdGlvbnMucmVwbGFjZSA/ICdyZXBsYWNlU3RhdGUnIDogJ3B1c2hTdGF0ZSddKHt9LCBkb2N1bWVudC50aXRsZSwgdXJsKTtcblxuICAgICAgLy8gSWYgaGFzaCBjaGFuZ2VzIGhhdmVuJ3QgYmVlbiBleHBsaWNpdGx5IGRpc2FibGVkLCB1cGRhdGUgdGhlIGhhc2hcbiAgICAgIC8vIGZyYWdtZW50IHRvIHN0b3JlIGhpc3RvcnkuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3dhbnRzSGFzaENoYW5nZSkge1xuICAgICAgICB0aGlzLl91cGRhdGVIYXNoKHRoaXMubG9jYXRpb24sIGZyYWdtZW50LCBvcHRpb25zLnJlcGxhY2UpO1xuICAgICAgICBpZiAodGhpcy5pZnJhbWUgJiYgKGZyYWdtZW50ICE9PSB0aGlzLmdldEZyYWdtZW50KHRoaXMuZ2V0SGFzaCh0aGlzLmlmcmFtZSkpKSkge1xuICAgICAgICAgIC8vIE9wZW5pbmcgYW5kIGNsb3NpbmcgdGhlIGlmcmFtZSB0cmlja3MgSUU3IGFuZCBlYXJsaWVyIHRvIHB1c2ggYVxuICAgICAgICAgIC8vIGhpc3RvcnkgZW50cnkgb24gaGFzaC10YWcgY2hhbmdlLiAgV2hlbiByZXBsYWNlIGlzIHRydWUsIHdlIGRvbid0XG4gICAgICAgICAgLy8gd2FudCB0aGlzLlxuICAgICAgICAgIGlmKCFvcHRpb25zLnJlcGxhY2UpIHRoaXMuaWZyYW1lLmRvY3VtZW50Lm9wZW4oKS5jbG9zZSgpO1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZUhhc2godGhpcy5pZnJhbWUubG9jYXRpb24sIGZyYWdtZW50LCBvcHRpb25zLnJlcGxhY2UpO1xuICAgICAgICB9XG5cbiAgICAgIC8vIElmIHlvdSd2ZSB0b2xkIHVzIHRoYXQgeW91IGV4cGxpY2l0bHkgZG9uJ3Qgd2FudCBmYWxsYmFjayBoYXNoY2hhbmdlLVxuICAgICAgLy8gYmFzZWQgaGlzdG9yeSwgdGhlbiBgbmF2aWdhdGVgIGJlY29tZXMgYSBwYWdlIHJlZnJlc2guXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhdGlvbi5hc3NpZ24odXJsKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnRyaWdnZXIpIHJldHVybiB0aGlzLmxvYWRVcmwoZnJhZ21lbnQpO1xuICAgIH0sXG5cbiAgICAvLyBVcGRhdGUgdGhlIGhhc2ggbG9jYXRpb24sIGVpdGhlciByZXBsYWNpbmcgdGhlIGN1cnJlbnQgZW50cnksIG9yIGFkZGluZ1xuICAgIC8vIGEgbmV3IG9uZSB0byB0aGUgYnJvd3NlciBoaXN0b3J5LlxuICAgIF91cGRhdGVIYXNoOiBmdW5jdGlvbihsb2NhdGlvbiwgZnJhZ21lbnQsIHJlcGxhY2UpIHtcbiAgICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAgIHZhciBocmVmID0gbG9jYXRpb24uaHJlZi5yZXBsYWNlKC8oamF2YXNjcmlwdDp8IykuKiQvLCAnJyk7XG4gICAgICAgIGxvY2F0aW9uLnJlcGxhY2UoaHJlZiArICcjJyArIGZyYWdtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNvbWUgYnJvd3NlcnMgcmVxdWlyZSB0aGF0IGBoYXNoYCBjb250YWlucyBhIGxlYWRpbmcgIy5cbiAgICAgICAgbG9jYXRpb24uaGFzaCA9ICcjJyArIGZyYWdtZW50O1xuICAgICAgfVxuICAgIH1cblxuICB9KTtcblxuXG5cbiAgLy8gYWRkIHNvbWUgZmVhdHVyZXMgdG8gTG9jYXRpb25CYXJcblxuICAvLyBhIG1vcmUgaW50dWl0aXZlIGFsaWFzIGZvciBuYXZpZ2F0ZVxuICBMb2NhdGlvbkJhci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubmF2aWdhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuICAvLyBhIGdlbmVyaWMgY2FsbGJhY2sgZm9yIGFueSBjaGFuZ2VzXG4gIExvY2F0aW9uQmFyLnByb3RvdHlwZS5vbkNoYW5nZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMucm91dGUoL14oLio/KSQvLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgLy8gY2hlY2tzIGlmIHRoZSBicm93c2VyIGhhcyBwdXNoc3RhdGUgc3VwcG9ydFxuICBMb2NhdGlvbkJhci5wcm90b3R5cGUuaGFzUHVzaFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghTG9jYXRpb25CYXIuc3RhcnRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwib25seSBhdmFpbGFibGUgYWZ0ZXIgbG9jYXRpb25CYXIuc3RhcnQoKVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2hhc1B1c2hTdGF0ZTtcbiAgfTtcblxuXG5cblxuXG5cbiAgLy8gZXhwb3J0XG4gIHJldHVybiBMb2NhdGlvbkJhcjtcbn0pO1xufSkodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lIDogZnVuY3Rpb24gKGZhY3RvcnkpIHsgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUpOyB9KTsiXX0=
;