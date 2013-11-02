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
    if (currentPage.detach) currentPage.detach()
  }  
  currentPage = new Presenter(options)
  currentPage.render()
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
  this.delegate = new Delegate(this.element)
  this.delegate.on('click', '.typingtext', this.onTextClicked)
  console.log('typingWelcomeView started')
}

View.prototype = {
  render: function(){
    this.element.innerHTML = template({
      texts: data
    })
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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9jbGllbnQvYXBwLmpzIiwiL1VzZXJzL2dpb3JnaW8vcHJvamVjdHMvcGxheWdyb3VuZC9kYXR0aWxvc2F1cm8vY2xpZW50L25hdmlnYXRpb24uanMiLCIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9jbGllbnQvdGVzdGRhdGEuanMiLCIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9jbGllbnQvd2VsY29tZS9pbmRleC5qcyIsIi9Vc2Vycy9naW9yZ2lvL3Byb2plY3RzL3BsYXlncm91bmQvZGF0dGlsb3NhdXJvL2NsaWVudC93ZWxjb21lL2luZGV4VGVtcGxhdGUuaGJzIiwiL1VzZXJzL2dpb3JnaW8vcHJvamVjdHMvcGxheWdyb3VuZC9kYXR0aWxvc2F1cm8vbm9kZV9tb2R1bGVzL2RvbS1kZWxlZ2F0ZS9saWIvZGVsZWdhdGUuanMiLCIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9ub2RlX21vZHVsZXMvZG9tLWRlbGVnYXRlL2xpYi9pbmRleC5qcyIsIi9Vc2Vycy9naW9yZ2lvL3Byb2plY3RzL3BsYXlncm91bmQvZGF0dGlsb3NhdXJvL25vZGVfbW9kdWxlcy9kb21pZnkvaW5kZXguanMiLCIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9ub2RlX21vZHVsZXMvZG9tcmVhZHkvcmVhZHkuanMiLCIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9ub2RlX21vZHVsZXMvZG9wZS9kb3BlLmpzIiwiL1VzZXJzL2dpb3JnaW8vcHJvamVjdHMvcGxheWdyb3VuZC9kYXR0aWxvc2F1cm8vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMtcnVudGltZS9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCIvVXNlcnMvZ2lvcmdpby9wcm9qZWN0cy9wbGF5Z3JvdW5kL2RhdHRpbG9zYXVyby9ub2RlX21vZHVsZXMvbG9jYXRpb24tYmFyL2xvY2F0aW9uLWJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM1dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbInZhciBkb21yZWFkeSA9IHJlcXVpcmUoJ2RvbXJlYWR5JylcbiAgLCByb3V0aW5nID0gcmVxdWlyZSgnLi9uYXZpZ2F0aW9uJylcbiAgLCBXZWxjb21lVmlldyA9IHJlcXVpcmUoJy4vd2VsY29tZScpXG4gICwgY29udGFpbmVyID0gbnVsbFxuICAsIGN1cnJlbnRQYWdlID0gbnVsbFxuXG5mdW5jdGlvbiBydW4oKXtcbiAgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXG4gIGlmICghY29udGFpbmVyKSB7XG4gICAgY29uc29sZS5sb2coJ25vIGNvbnRhaW5lciBmb3IgdGhlIGFwcCcpXG4gIH0gZWxzZSB7XG4gICAgaGFuZGxlUm91dGVzKClcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVSb3V0ZXMoKSB7XG4gLy8gcm91dGluZy5yb3V0ZSgvXmN1c3RvbWVyXFwvKC4rKS8sIGZ1bmN0aW9uKHBhdGgpIHtcbiAvLyAgIHN3aXRjaFRvKFR5cGluZ0d5bVZpZXcsIHsgbmFtZTogcGF0aC5zcGxpdCgnLycpWzFdIH0pXG4gLy8gfSlcblxuICByb3V0aW5nLnJvdXRlKC9eJC8sIGZ1bmN0aW9uKCkge1xuICAgIHN3aXRjaFRvKFdlbGNvbWVWaWV3KVxuICB9KVxuXG4gIHJvdXRpbmcuc3RhcnQoe1xuICAgIHB1c2hTdGF0ZTogZmFsc2UgXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHN3aXRjaFRvKFByZXNlbnRlciwgb3B0aW9ucykge1xuICBpZihjdXJyZW50UGFnZSkge1xuICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyLmNoaWxkcmVuWzBdKVxuICAgIGlmIChjdXJyZW50UGFnZS5kZXRhY2gpIGN1cnJlbnRQYWdlLmRldGFjaCgpXG4gIH0gIFxuICBjdXJyZW50UGFnZSA9IG5ldyBQcmVzZW50ZXIob3B0aW9ucylcbiAgY3VycmVudFBhZ2UucmVuZGVyKClcbiAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoY3VycmVudFBhZ2UuZWxlbWVudClcbn1cblxuZG9tcmVhZHkocnVuKVxuXG4iLCJ2YXIgTG9jYXRpb25CYXIgPSByZXF1aXJlKCdsb2NhdGlvbi1iYXInKVxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTG9jYXRpb25CYXIoKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBpZDogMSxcbiAgICB0aXRsZTogXCJNb2J5IGRpY2tcIixcbiAgICB0ZXh0OiBcIkNhbGwgbWUgSXNobWFlbC4gU29tZSB5ZWFycyBhZ28tLW5ldmVyIG1pbmQgaG93IGxvbmcgcHJlY2lzZWx5IC0taGF2aW5nIGxpdHRsZSBvciBubyBtb25leSBpbiBteSBwdXJzZSwgYW5kIG5vdGhpbmcgcGFydGljdWxhciB0byBpbnRlcmVzdCBtZSBvbiBzaG9yZSwgSSB0aG91Z2h0IEkgd291bGQgc2FpbCBhYm91dCBhIGxpdHRsZSBhbmQgc2VlIHRoZSB3YXRlcnkgcGFydCBvZiB0aGUgd29ybGQuIEl0IGlzIGEgd2F5IEkgaGF2ZSBvZiBkcml2aW5nIG9mZiB0aGUgc3BsZWVuLCBhbmQgcmVndWxhdGluZyB0aGUgY2lyY3VsYXRpb24uIFdoZW5ldmVyIEkgZmluZCBteXNlbGYgZ3Jvd2luZyBncmltIGFib3V0IHRoZSBtb3V0aDsgd2hlbmV2ZXIgaXQgaXMgYSBkYW1wLCBkcml6emx5IE5vdmVtYmVyIGluIG15IHNvdWw7IHdoZW5ldmVyIEkgZmluZCBteXNlbGYgaW52b2x1bnRhcmlseSBwYXVzaW5nIGJlZm9yZSBjb2ZmaW4gd2FyZWhvdXNlcywgYW5kIGJyaW5naW5nIHVwIHRoZSByZWFyIG9mIGV2ZXJ5IGZ1bmVyYWwgSSBtZWV0OyBhbmQgZXNwZWNpYWxseSB3aGVuZXZlciBteSBoeXBvcyBnZXQgc3VjaCBhbiB1cHBlciBoYW5kIG9mIG1lLCB0aGF0IGl0IHJlcXVpcmVzIGEgc3Ryb25nIG1vcmFsIHByaW5jaXBsZSB0byBwcmV2ZW50IG1lIGZyb20gZGVsaWJlcmF0ZWx5IHN0ZXBwaW5nIGludG8gdGhlIHN0cmVldCwgYW5kIG1ldGhvZGljYWxseSBrbm9ja2luZyBwZW9wbGUncyBoYXRzIG9mZi0tdGhlbiwgSSBhY2NvdW50IGl0IGhpZ2ggdGltZSB0byBnZXQgdG8gc2VhIGFzIHNvb24gYXMgSSBjYW4uXCJcbiAgfSxcbiAge1xuICAgIGlkOiAyLFxuICAgIHRpdGxlOiBcIlRoZSBBZHZlbnR1cmVzIG9mIFRvbSBTYXd5ZXJcIixcbiAgICB0ZXh0OiBcIlxcXCJUT00hXFxcIiBObyBhbnN3ZXIuICBcXFwiVE9NIVxcXCIgTm8gYW5zd2VyLiAgXFxcIldoYXQncyBnb25lIHdpdGggdGhhdCBib3ksIEkgd29uZGVyPyBZb3UgVE9NIVxcXCIgTm8gYW5zd2VyLiAgVGhlIG9sZCBsYWR5IHB1bGxlZCBoZXIgc3BlY3RhY2xlcyBkb3duIGFuZCBsb29rZWQgb3ZlciB0aGVtIGFib3V0IHRoZSByb29tOyB0aGVuIHNoZSBwdXQgdGhlbSB1cCBhbmQgbG9va2VkIG91dCB1bmRlciB0aGVtLiBTaGUgc2VsZG9tIG9yIG5ldmVyIGxvb2tlZCB0aHJvdWdoIHRoZW0gZm9yIHNvIHNtYWxsIGEgdGhpbmcgYXMgYSBib3k7IHRoZXkgd2VyZSBoZXIgc3RhdGUgcGFpciwgdGhlIHByaWRlIG9mIGhlciBoZWFydCwgYW5kIHdlcmUgYnVpbHQgZm9yIFxcXCJzdHlsZSxcXFwiIG5vdCBzZXJ2aWNlIC0tIHNoZSBjb3VsZCBoYXZlIHNlZW4gdGhyb3VnaCBhIHBhaXIgb2Ygc3RvdmUtbGlkcyBqdXN0IGFzIHdlbGwuIFNoZSBsb29rZWQgcGVycGxleGVkIGZvciBhIG1vbWVudCwgYW5kIHRoZW4gc2FpZCwgbm90IGZpZXJjZWx5LCBidXQgc3RpbGwgbG91ZCBlbm91Z2ggZm9yIHRoZSBmdXJuaXR1cmUgdG8gaGVhcjogXFxcIldlbGwsIEkgbGF5IGlmIEkgZ2V0IGhvbGQgb2YgeW91IEknbGwgLS0gXFxcIiBTaGUgZGlkIG5vdCBmaW5pc2gsIGZvciBieSB0aGlzIHRpbWUgc2hlIHdhcyBiZW5kaW5nIGRvd24gYW5kIHB1bmNoaW5nIHVuZGVyIHRoZSBiZWQgd2l0aCB0aGUgYnJvb20sIGFuZCBzbyBzaGUgbmVlZGVkIGJyZWF0aCB0byBwdW5jdHVhdGUgdGhlIHB1bmNoZXMgd2l0aC4gU2hlIHJlc3VycmVjdGVkIG5vdGhpbmcgYnV0IHRoZSBjYXQuICBcXFwiSSBuZXZlciBkaWQgc2VlIHRoZSBiZWF0IG9mIHRoYXQgYm95IVxcXCJcIlxuICB9LFxuICB7XG4gICAgaWQ6IDMsXG4gICAgdGl0bGU6IFwiRGl2aW5lIENvbWVkeVwiLFxuICAgIHRleHQ6IFwiSU4gdGhlIG1pZHdheSBvZiB0aGlzIG91ciBtb3J0YWwgbGlmZSwgSSBmb3VuZCBtZSBpbiBhIGdsb29teSB3b29kLCBhc3RyYXkgR29uZSBmcm9tIHRoZSBwYXRoIGRpcmVjdDogYW5kIGUnZW4gdG8gdGVsbCBJdCB3ZXJlIG5vIGVhc3kgdGFzaywgaG93IHNhdmFnZSB3aWxkIFRoYXQgZm9yZXN0LCBob3cgcm9idXN0IGFuZCByb3VnaCBpdHMgZ3Jvd3RoLCBXaGljaCB0byByZW1lbWJlciBvbmx5LCBteSBkaXNtYXkgUmVuZXdzLCBpbiBiaXR0ZXJuZXNzIG5vdCBmYXIgZnJvbSBkZWF0aC4gIFlldCB0byBkaXNjb3Vyc2Ugb2Ygd2hhdCB0aGVyZSBnb29kIGJlZmVsbCwgQWxsIGVsc2Ugd2lsbCBJIHJlbGF0ZSBkaXNjb3ZlcidkIHRoZXJlLiAgSG93IGZpcnN0IEkgZW50ZXInZCBpdCBJIHNjYXJjZSBjYW4gc2F5LCBTdWNoIHNsZWVweSBkdWxsbmVzcyBpbiB0aGF0IGluc3RhbnQgd2VpZ2gnZCBNeSBzZW5zZXMgZG93biwgd2hlbiB0aGUgdHJ1ZSBwYXRoIEkgbGVmdCwgQnV0IHdoZW4gYSBtb3VudGFpbidzIGZvb3QgSSByZWFjaCdkLCB3aGVyZSBjbG9zJ2QgVGhlIHZhbGxleSwgdGhhdCBoYWQgcGllcmMnZCBteSBoZWFydCB3aXRoIGRyZWFkLCBJIGxvb2snZCBhbG9mdCwgYW5kIHNhdyBoaXMgc2hvdWxkZXJzIGJyb2FkIEFscmVhZHkgdmVzdGVkIHdpdGggdGhhdCBwbGFuZXQncyBiZWFtLCBXaG8gbGVhZHMgYWxsIHdhbmRlcmVycyBzYWZlIHRocm91Z2ggZXZlcnkgd2F5LlwiXG4gIH1cbl1cbiIsInZhciBkb21pZnkgPSByZXF1aXJlKCdkb21pZnknKVxuICAsIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9pbmRleFRlbXBsYXRlLmhicycpXG4gICwgZGF0YSA9IHJlcXVpcmUoJy4uL3Rlc3RkYXRhLmpzJylcbiAgLCBkb3BlID0gcmVxdWlyZSgnZG9wZScpXG4gICwgbmF2aWdhdGlvbiA9IHJlcXVpcmUoJy4uL25hdmlnYXRpb24nKVxuICAsIERlbGVnYXRlID0gcmVxdWlyZSgnZG9tLWRlbGVnYXRlJylcblxudmFyIFZpZXcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHRoaXMuZWxlbWVudCA9IG9wdGlvbnMuZWxlbWVudCB8fCBkb21pZnkoJzxkaXY+PC9kaXY+JylcbiAgdGhpcy5kZWxlZ2F0ZSA9IG5ldyBEZWxlZ2F0ZSh0aGlzLmVsZW1lbnQpXG4gIHRoaXMuZGVsZWdhdGUub24oJ2NsaWNrJywgJy50eXBpbmd0ZXh0JywgdGhpcy5vblRleHRDbGlja2VkKVxuICBjb25zb2xlLmxvZygndHlwaW5nV2VsY29tZVZpZXcgc3RhcnRlZCcpXG59XG5cblZpZXcucHJvdG90eXBlID0ge1xuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IHRlbXBsYXRlKHtcbiAgICAgIHRleHRzOiBkYXRhXG4gICAgfSlcbiAgfSxcbiAgb25UZXh0Q2xpY2tlZDogZnVuY3Rpb24oZSwgcm93KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgbmF2aWdhdGlvbi51cGRhdGUoXCIvdHlwaW5nR3ltL1wiICsgZG9wZS5kYXRhc2V0KHJvdykuaWQsIHt0cmlnZ2VyOiB0cnVlfSlcbiAgfSxcbiAgZGV0YWNoOiBmdW5jdGlvbigpe1xuICAgIHRoaXMuZGVsZWdhdGUuZGVzdHJveSgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3XG4iLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2hhbmRsZWJhcnMtcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHMgPSBIYW5kbGViYXJzLnRlbXBsYXRlKGZ1bmN0aW9uIChIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gXCJcIiwgc3RhY2sxLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbiwgc2VsZj10aGlzO1xuXG5mdW5jdGlvbiBwcm9ncmFtMShkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9IFwiXCIsIHN0YWNrMTtcbiAgYnVmZmVyICs9IFwiXFxuICA8dWw+PGEgaHJlZj1cXFwiXFxcIiBjbGFzcz1cXFwidHlwaW5ndGV4dFxcXCIgZGF0YS1pZD1cXFwiXCI7XG4gIGlmIChzdGFjazEgPSBoZWxwZXJzLmlkKSB7IHN0YWNrMSA9IHN0YWNrMS5jYWxsKGRlcHRoMCwge2hhc2g6e30sZGF0YTpkYXRhfSk7IH1cbiAgZWxzZSB7IHN0YWNrMSA9IGRlcHRoMC5pZDsgc3RhY2sxID0gdHlwZW9mIHN0YWNrMSA9PT0gZnVuY3Rpb25UeXBlID8gc3RhY2sxLmFwcGx5KGRlcHRoMCkgOiBzdGFjazE7IH1cbiAgYnVmZmVyICs9IGVzY2FwZUV4cHJlc3Npb24oc3RhY2sxKVxuICAgICsgXCJcXFwiPlwiO1xuICBpZiAoc3RhY2sxID0gaGVscGVycy50aXRsZSkgeyBzdGFjazEgPSBzdGFjazEuY2FsbChkZXB0aDAsIHtoYXNoOnt9LGRhdGE6ZGF0YX0pOyB9XG4gIGVsc2UgeyBzdGFjazEgPSBkZXB0aDAudGl0bGU7IHN0YWNrMSA9IHR5cGVvZiBzdGFjazEgPT09IGZ1bmN0aW9uVHlwZSA/IHN0YWNrMS5hcHBseShkZXB0aDApIDogc3RhY2sxOyB9XG4gIGJ1ZmZlciArPSBlc2NhcGVFeHByZXNzaW9uKHN0YWNrMSlcbiAgICArIFwiPC9hPjwvdWw+XFxuICBcIjtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG4gIGJ1ZmZlciArPSBcIjxkaXY+Q2hvb3NlIGEgdGV4dCB0byBwcmFjdGljZSB0eXBpbmc8L2Rpdj5cXG48dWw+XFxuICBcIjtcbiAgc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwLCBkZXB0aDAudGV4dHMsIHtoYXNoOnt9LGludmVyc2U6c2VsZi5ub29wLGZuOnNlbGYucHJvZ3JhbSgxLCBwcm9ncmFtMSwgZGF0YSksZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgYnVmZmVyICs9IHN0YWNrMTsgfVxuICBidWZmZXIgKz0gXCJcXG48L3VsPlxcblwiO1xuICByZXR1cm4gYnVmZmVyO1xuICB9KTtcbiIsIi8qanNoaW50IGJyb3dzZXI6dHJ1ZSwgbm9kZTp0cnVlKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERlbGVnYXRlO1xuXG4vKipcbiAqIERPTSBldmVudCBkZWxlZ2F0b3JcbiAqXG4gKiBUaGUgZGVsZWdhdG9yIHdpbGwgbGlzdGVuXG4gKiBmb3IgZXZlbnRzIHRoYXQgYnViYmxlIHVwXG4gKiB0byB0aGUgcm9vdCBub2RlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtOb2RlfHN0cmluZ30gW3Jvb3RdIFRoZSByb290IG5vZGUgb3IgYSBzZWxlY3RvciBzdHJpbmcgbWF0Y2hpbmcgdGhlIHJvb3Qgbm9kZVxuICovXG5mdW5jdGlvbiBEZWxlZ2F0ZShyb290KSB7XG4gIGlmIChyb290KSB7XG4gICAgdGhpcy5yb290KHJvb3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1haW50YWluIGEgbWFwIG9mIGxpc3RlbmVyXG4gICAqIGxpc3RzLCBrZXllZCBieSBldmVudCBuYW1lLlxuICAgKlxuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG4gIHRoaXMubGlzdGVuZXJNYXAgPSB7fTtcblxuICAvKiogQHR5cGUgZnVuY3Rpb24oKSAqL1xuICB0aGlzLmhhbmRsZSA9IERlbGVnYXRlLnByb3RvdHlwZS5oYW5kbGUuYmluZCh0aGlzKTtcbn1cblxuLyoqXG4gKiBAcHJvdGVjdGVkXG4gKiBAdHlwZSA/Ym9vbGVhblxuICovXG5EZWxlZ2F0ZS50YWdzQ2FzZVNlbnNpdGl2ZSA9IG51bGw7XG5cbi8qKlxuICogU3RhcnQgbGlzdGVuaW5nIGZvciBldmVudHNcbiAqIG9uIHRoZSBwcm92aWRlZCBET00gZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBbcm9vdF0gVGhlIHJvb3Qgbm9kZSBvciBhIHNlbGVjdG9yIHN0cmluZyBtYXRjaGluZyB0aGUgcm9vdCBub2RlXG4gKiBAcmV0dXJucyB7RGVsZWdhdGV9IFRoaXMgbWV0aG9kIGlzIGNoYWluYWJsZVxuICovXG5EZWxlZ2F0ZS5wcm90b3R5cGUucm9vdCA9IGZ1bmN0aW9uKHJvb3QpIHtcbiAgdmFyIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcDtcbiAgdmFyIGV2ZW50VHlwZTtcblxuICBpZiAodHlwZW9mIHJvb3QgPT09ICdzdHJpbmcnKSB7XG4gICAgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdCk7XG4gIH1cblxuICAvLyBSZW1vdmUgbWFzdGVyIGV2ZW50IGxpc3RlbmVyc1xuICBpZiAodGhpcy5yb290RWxlbWVudCkge1xuICAgIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwKSB7XG4gICAgICBpZiAobGlzdGVuZXJNYXAuaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdGhpcy5jYXB0dXJlRm9yVHlwZShldmVudFR5cGUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBJZiBubyByb290IG9yIHJvb3QgaXMgbm90XG4gIC8vIGEgZG9tIG5vZGUsIHRoZW4gcmVtb3ZlIGludGVybmFsXG4gIC8vIHJvb3QgcmVmZXJlbmNlIGFuZCBleGl0IGhlcmVcbiAgaWYgKCFyb290IHx8ICFyb290LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy5yb290RWxlbWVudCkge1xuICAgICAgZGVsZXRlIHRoaXMucm9vdEVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByb290IG5vZGUgYXQgd2hpY2hcbiAgICogbGlzdGVuZXJzIGFyZSBhdHRhY2hlZC5cbiAgICpcbiAgICogQHR5cGUgTm9kZVxuICAgKi9cbiAgdGhpcy5yb290RWxlbWVudCA9IHJvb3Q7XG5cbiAgLy8gU2V0IHVwIG1hc3RlciBldmVudCBsaXN0ZW5lcnNcbiAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXApIHtcbiAgICBpZiAobGlzdGVuZXJNYXAuaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgdGhpcy5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIHRoaXMuY2FwdHVyZUZvclR5cGUoZXZlbnRUeXBlKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuRGVsZWdhdGUucHJvdG90eXBlLmNhcHR1cmVGb3JUeXBlID0gZnVuY3Rpb24oZXZlbnRUeXBlKSB7XG4gIHJldHVybiBldmVudFR5cGUgPT09ICdlcnJvcic7XG59O1xuXG4vKipcbiAqIEF0dGFjaCBhIGhhbmRsZXIgdG8gb25lXG4gKiBldmVudCBmb3IgYWxsIGVsZW1lbnRzXG4gKiB0aGF0IG1hdGNoIHRoZSBzZWxlY3RvcixcbiAqIG5vdyBvciBpbiB0aGUgZnV0dXJlXG4gKlxuICogVGhlIGhhbmRsZXIgZnVuY3Rpb24gcmVjZWl2ZXNcbiAqIHRocmVlIGFyZ3VtZW50czogdGhlIERPTSBldmVudFxuICogb2JqZWN0LCB0aGUgbm9kZSB0aGF0IG1hdGNoZWRcbiAqIHRoZSBzZWxlY3RvciB3aGlsZSB0aGUgZXZlbnRcbiAqIHdhcyBidWJibGluZyBhbmQgYSByZWZlcmVuY2VcbiAqIHRvIGl0c2VsZi4gV2l0aGluIHRoZSBoYW5kbGVyLFxuICogJ3RoaXMnIGlzIGVxdWFsIHRvIHRoZSBzZWNvbmRcbiAqIGFyZ3VtZW50LlxuICpcbiAqIFRoZSBub2RlIHRoYXQgYWN0dWFsbHkgcmVjZWl2ZWRcbiAqIHRoZSBldmVudCBjYW4gYmUgYWNjZXNzZWQgdmlhXG4gKiAnZXZlbnQudGFyZ2V0Jy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIExpc3RlbiBmb3IgdGhlc2UgZXZlbnRzIChpbiBhIHNwYWNlLXNlcGFyYXRlZCBsaXN0KVxuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBzZWxlY3RvciBPbmx5IGhhbmRsZSBldmVudHMgb24gZWxlbWVudHMgbWF0Y2hpbmcgdGhpcyBzZWxlY3RvciwgaWYgdW5kZWZpbmVkIG1hdGNoIHJvb3QgZWxlbWVudFxuICogQHBhcmFtIHtmdW5jdGlvbigpfSBoYW5kbGVyIEhhbmRsZXIgZnVuY3Rpb24gLSBldmVudCBkYXRhIHBhc3NlZCBoZXJlIHdpbGwgYmUgaW4gZXZlbnQuZGF0YVxuICogQHBhcmFtIHtPYmplY3R9IFtldmVudERhdGFdIERhdGEgdG8gcGFzcyBpbiBldmVudC5kYXRhXG4gKiBAcmV0dXJucyB7RGVsZWdhdGV9IFRoaXMgbWV0aG9kIGlzIGNoYWluYWJsZVxuICovXG5EZWxlZ2F0ZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbihldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCBldmVudERhdGEpIHtcbiAgdmFyIHJvb3QsIGxpc3RlbmVyTWFwLCBtYXRjaGVyLCBtYXRjaGVyUGFyYW0sIHNlbGYgPSB0aGlzO1xuXG4gIGlmICghZXZlbnRUeXBlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBldmVudCB0eXBlOiAnICsgZXZlbnRUeXBlKTtcbiAgfVxuXG4gIC8vIGhhbmRsZXIgY2FuIGJlIHBhc3NlZCBhc1xuICAvLyB0aGUgc2Vjb25kIG9yIHRoaXJkIGFyZ3VtZW50XG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBoYW5kbGVyID0gc2VsZWN0b3I7XG4gICAgc2VsZWN0b3IgPSBudWxsO1xuICAgIGV2ZW50RGF0YSA9IGhhbmRsZXI7XG4gIH1cblxuICAvLyBOb3JtYWxpc2UgdW5kZWZpbmVkIGV2ZW50RGF0YSB0byBudWxsXG4gIGlmIChldmVudERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50RGF0YSA9IG51bGw7XG4gIH1cblxuICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdIYW5kbGVyIG11c3QgYmUgYSB0eXBlIG9mIEZ1bmN0aW9uJyk7XG4gIH1cblxuICByb290ID0gdGhpcy5yb290RWxlbWVudDtcbiAgbGlzdGVuZXJNYXAgPSB0aGlzLmxpc3RlbmVyTWFwO1xuXG4gIC8vIEFkZCBtYXN0ZXIgaGFuZGxlciBmb3IgdHlwZSBpZiBub3QgY3JlYXRlZCB5ZXRcbiAgaWYgKCFsaXN0ZW5lck1hcFtldmVudFR5cGVdKSB7XG4gICAgaWYgKHJvb3QpIHtcbiAgICAgIHJvb3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB0aGlzLmNhcHR1cmVGb3JUeXBlKGV2ZW50VHlwZSkpO1xuICAgIH1cbiAgICBsaXN0ZW5lck1hcFtldmVudFR5cGVdID0gW107XG4gIH1cblxuICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgbWF0Y2hlclBhcmFtID0gbnVsbDtcblxuICAgIC8vIENPTVBMRVggLSBtYXRjaGVzUm9vdCBuZWVkcyB0byBoYXZlIGFjY2VzcyB0b1xuICAgIC8vIHRoaXMucm9vdEVsZW1lbnQsIHNvIGJpbmQgdGhlIGZ1bmN0aW9uIHRvIHRoaXMuXG4gICAgbWF0Y2hlciA9IHRoaXMubWF0Y2hlc1Jvb3QuYmluZCh0aGlzKTtcblxuICAvLyBDb21waWxlIGEgbWF0Y2hlciBmb3IgdGhlIGdpdmVuIHNlbGVjdG9yXG4gIH0gZWxzZSBpZiAoL15bYS16XSskL2kudGVzdChzZWxlY3RvcikpIHtcblxuICAgIC8vIExhemlseSBjaGVjayB3aGV0aGVyIHRhZyBuYW1lcyBhcmUgY2FzZSBzZW5zaXRpdmUgKGFzIGluIFhNTCBvciBYSFRNTCBkb2N1bWVudHMpLlxuICAgIGlmIChEZWxlZ2F0ZS50YWdzQ2FzZVNlbnNpdGl2ZSA9PT0gbnVsbCkge1xuICAgICAgRGVsZWdhdGUudGFnc0Nhc2VTZW5zaXRpdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJykudGFnTmFtZSA9PT0gJ2knO1xuICAgIH1cblxuICAgIGlmICghRGVsZWdhdGUudGFnc0Nhc2VTZW5zaXRpdmUpIHtcbiAgICAgIG1hdGNoZXJQYXJhbSA9IHNlbGVjdG9yLnRvVXBwZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoZXJQYXJhbSA9IHNlbGVjdG9yO1xuICAgIH1cblxuICAgIG1hdGNoZXIgPSB0aGlzLm1hdGNoZXNUYWc7XG4gIH0gZWxzZSBpZiAoL14jW2EtejAtOVxcLV9dKyQvaS50ZXN0KHNlbGVjdG9yKSkge1xuICAgIG1hdGNoZXJQYXJhbSA9IHNlbGVjdG9yLnNsaWNlKDEpO1xuICAgIG1hdGNoZXIgPSB0aGlzLm1hdGNoZXNJZDtcbiAgfSBlbHNlIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3RvcjtcbiAgICBtYXRjaGVyID0gdGhpcy5tYXRjaGVzO1xuICB9XG5cbiAgLy8gQWRkIHRvIHRoZSBsaXN0IG9mIGxpc3RlbmVyc1xuICBsaXN0ZW5lck1hcFtldmVudFR5cGVdLnB1c2goe1xuICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICBldmVudERhdGE6IGV2ZW50RGF0YSxcbiAgICBoYW5kbGVyOiBoYW5kbGVyLFxuICAgIG1hdGNoZXI6IG1hdGNoZXIsXG4gICAgbWF0Y2hlclBhcmFtOiBtYXRjaGVyUGFyYW1cbiAgfSk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBldmVudCBoYW5kbGVyXG4gKiBmb3IgZWxlbWVudHMgdGhhdCBtYXRjaFxuICogdGhlIHNlbGVjdG9yLCBmb3JldmVyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFtldmVudFR5cGVdIFJlbW92ZSBoYW5kbGVycyBmb3IgZXZlbnRzIG1hdGNoaW5nIHRoaXMgdHlwZSwgY29uc2lkZXJpbmcgdGhlIG90aGVyIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdIElmIHRoaXMgcGFyYW1ldGVyIGlzIG9taXR0ZWQsIG9ubHkgaGFuZGxlcnMgd2hpY2ggbWF0Y2ggdGhlIG90aGVyIHR3byB3aWxsIGJlIHJlbW92ZWRcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKX0gW2hhbmRsZXJdIElmIHRoaXMgcGFyYW1ldGVyIGlzIG9taXR0ZWQsIG9ubHkgaGFuZGxlcnMgd2hpY2ggbWF0Y2ggdGhlIHByZXZpb3VzIHR3byB3aWxsIGJlIHJlbW92ZWRcbiAqIEByZXR1cm5zIHtEZWxlZ2F0ZX0gVGhpcyBtZXRob2QgaXMgY2hhaW5hYmxlXG4gKi9cbkRlbGVnYXRlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gIHZhciBpLCBsaXN0ZW5lciwgbGlzdGVuZXJNYXAsIGxpc3RlbmVyTGlzdCwgc2luZ2xlRXZlbnRUeXBlLCBzZWxmID0gdGhpcztcblxuICAvLyBIYW5kbGVyIGNhbiBiZSBwYXNzZWQgYXNcbiAgLy8gdGhlIHNlY29uZCBvciB0aGlyZCBhcmd1bWVudFxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaGFuZGxlciA9IHNlbGVjdG9yO1xuICAgIHNlbGVjdG9yID0gbnVsbDtcbiAgfVxuXG4gIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcDtcbiAgaWYgKCFldmVudFR5cGUpIHtcbiAgICBmb3IgKHNpbmdsZUV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcCkge1xuICAgICAgaWYgKGxpc3RlbmVyTWFwLmhhc093blByb3BlcnR5KHNpbmdsZUV2ZW50VHlwZSkpIHtcbiAgICAgICAgdGhpcy5vZmYoc2luZ2xlRXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lckxpc3QgPSBsaXN0ZW5lck1hcFtldmVudFR5cGVdO1xuICBpZiAoIWxpc3RlbmVyTGlzdCB8fCAhbGlzdGVuZXJMaXN0Lmxlbmd0aCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gUmVtb3ZlIG9ubHkgcGFyYW1ldGVyIG1hdGNoZXNcbiAgLy8gaWYgc3BlY2lmaWVkXG4gIGZvciAoaSA9IGxpc3RlbmVyTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGxpc3RlbmVyID0gbGlzdGVuZXJMaXN0W2ldO1xuXG4gICAgaWYgKCghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGxpc3RlbmVyLnNlbGVjdG9yKSAmJiAoIWhhbmRsZXIgfHwgaGFuZGxlciA9PT0gbGlzdGVuZXIuaGFuZGxlcikpIHtcbiAgICAgIGxpc3RlbmVyTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWxsIGxpc3RlbmVycyByZW1vdmVkXG4gIGlmICghbGlzdGVuZXJMaXN0Lmxlbmd0aCkge1xuICAgIGRlbGV0ZSBsaXN0ZW5lck1hcFtldmVudFR5cGVdO1xuXG4gICAgLy8gUmVtb3ZlIHRoZSBtYWluIGhhbmRsZXJcbiAgICBpZiAodGhpcy5yb290RWxlbWVudCkge1xuICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIHRoaXMuY2FwdHVyZUZvclR5cGUoZXZlbnRUeXBlKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogSGFuZGxlIGFuIGFyYml0cmFyeSBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICovXG5EZWxlZ2F0ZS5wcm90b3R5cGUuaGFuZGxlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgdmFyIGksIGwsIHJvb3QsIGxpc3RlbmVyLCByZXR1cm5lZCwgbGlzdGVuZXJMaXN0LCB0YXJnZXQsIC8qKiBAY29uc3QgKi8gRVZFTlRJR05PUkUgPSAnZnRMYWJzRGVsZWdhdGVJZ25vcmUnO1xuXG4gIGlmIChldmVudFtFVkVOVElHTk9SRV0gPT09IHRydWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gIGlmICh0YXJnZXQubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gIH1cblxuICByb290ID0gdGhpcy5yb290RWxlbWVudDtcbiAgbGlzdGVuZXJMaXN0ID0gdGhpcy5saXN0ZW5lck1hcFtldmVudC50eXBlXTtcblxuICAvLyBOZWVkIHRvIGNvbnRpbnVvdXNseSBjaGVja1xuICAvLyB0aGF0IHRoZSBzcGVjaWZpYyBsaXN0IGlzXG4gIC8vIHN0aWxsIHBvcHVsYXRlZCBpbiBjYXNlIG9uZVxuICAvLyBvZiB0aGUgY2FsbGJhY2tzIGFjdHVhbGx5XG4gIC8vIGNhdXNlcyB0aGUgbGlzdCB0byBiZSBkZXN0cm95ZWQuXG4gIGwgPSBsaXN0ZW5lckxpc3QubGVuZ3RoO1xuICB3aGlsZSAodGFyZ2V0ICYmIGwpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyTGlzdFtpXTtcblxuICAgICAgLy8gQmFpbCBmcm9tIHRoaXMgbG9vcCBpZlxuICAgICAgLy8gdGhlIGxlbmd0aCBjaGFuZ2VkIGFuZFxuICAgICAgLy8gbm8gbW9yZSBsaXN0ZW5lcnMgYXJlXG4gICAgICAvLyBkZWZpbmVkIGJldHdlZW4gaSBhbmQgbC5cbiAgICAgIGlmICghbGlzdGVuZXIpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIGZvciBtYXRjaCBhbmQgZmlyZVxuICAgICAgLy8gdGhlIGV2ZW50IGlmIHRoZXJlJ3Mgb25lXG4gICAgICAvL1xuICAgICAgLy8gVE9ETzpNQ0c6MjAxMjAxMTc6IE5lZWQgYSB3YXlcbiAgICAgIC8vIHRvIGNoZWNrIGlmIGV2ZW50I3N0b3BJbW1lZGlhdGVQcm9nYWdhdGlvblxuICAgICAgLy8gd2FzIGNhbGxlZC4gSWYgc28sIGJyZWFrIGJvdGggbG9vcHMuXG4gICAgICBpZiAobGlzdGVuZXIubWF0Y2hlci5jYWxsKHRhcmdldCwgbGlzdGVuZXIubWF0Y2hlclBhcmFtLCB0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybmVkID0gdGhpcy5maXJlKGV2ZW50LCB0YXJnZXQsIGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgLy8gU3RvcCBwcm9wYWdhdGlvbiB0byBzdWJzZXF1ZW50XG4gICAgICAvLyBjYWxsYmFja3MgaWYgdGhlIGNhbGxiYWNrIHJldHVybmVkXG4gICAgICAvLyBmYWxzZVxuICAgICAgaWYgKHJldHVybmVkID09PSBmYWxzZSkge1xuICAgICAgICBldmVudFtFVkVOVElHTk9SRV0gPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzpNQ0c6MjAxMjAxMTc6IE5lZWQgYSB3YXkgdG9cbiAgICAvLyBjaGVjayBpZiBldmVudCNzdG9wUHJvZ2FnYXRpb25cbiAgICAvLyB3YXMgY2FsbGVkLiBJZiBzbywgYnJlYWsgbG9vcGluZ1xuICAgIC8vIHRocm91Z2ggdGhlIERPTS4gU3RvcCBpZiB0aGVcbiAgICAvLyBkZWxlZ2F0aW9uIHJvb3QgaGFzIGJlZW4gcmVhY2hlZFxuICAgIGlmICh0YXJnZXQgPT09IHJvb3QpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGwgPSBsaXN0ZW5lckxpc3QubGVuZ3RoO1xuICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICB9XG59O1xuXG4vKipcbiAqIEZpcmUgYSBsaXN0ZW5lciBvbiBhIHRhcmdldC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lclxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbkRlbGVnYXRlLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24oZXZlbnQsIHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgdmFyIHJldHVybmVkLCBvbGREYXRhO1xuXG4gIGlmIChsaXN0ZW5lci5ldmVudERhdGEgIT09IG51bGwpIHtcbiAgICBvbGREYXRhID0gZXZlbnQuZGF0YTtcbiAgICBldmVudC5kYXRhID0gbGlzdGVuZXIuZXZlbnREYXRhO1xuICAgIHJldHVybmVkID0gbGlzdGVuZXIuaGFuZGxlci5jYWxsKHRhcmdldCwgZXZlbnQsIHRhcmdldCk7XG4gICAgZXZlbnQuZGF0YSA9IG9sZERhdGE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuZWQgPSBsaXN0ZW5lci5oYW5kbGVyLmNhbGwodGFyZ2V0LCBldmVudCwgdGFyZ2V0KTtcbiAgfVxuXG4gIHJldHVybiByZXR1cm5lZDtcbn07XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBlbGVtZW50XG4gKiBtYXRjaGVzIGEgZ2VuZXJpYyBzZWxlY3Rvci5cbiAqXG4gKiBAdHlwZSBmdW5jdGlvbigpXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgQSBDU1Mgc2VsZWN0b3JcbiAqL1xuRGVsZWdhdGUucHJvdG90eXBlLm1hdGNoZXMgPSAoZnVuY3Rpb24oZWwpIHtcbiAgaWYgKCFlbCkgcmV0dXJuO1xuICB2YXIgcCA9IGVsLnByb3RvdHlwZTtcbiAgcmV0dXJuIChwLm1hdGNoZXNTZWxlY3RvciB8fCBwLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBwLm1vek1hdGNoZXNTZWxlY3RvciB8fCBwLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IHAub01hdGNoZXNTZWxlY3Rvcik7XG59KEhUTUxFbGVtZW50KSk7XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBlbGVtZW50XG4gKiBtYXRjaGVzIGEgdGFnIHNlbGVjdG9yLlxuICpcbiAqIFRhZ3MgYXJlIE5PVCBjYXNlLXNlbnNpdGl2ZSxcbiAqIGV4Y2VwdCBpbiBYTUwgKGFuZCBYTUwtYmFzZWRcbiAqIGxhbmd1YWdlcyBzdWNoIGFzIFhIVE1MKS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZSBUaGUgdGFnIG5hbWUgdG8gdGVzdCBhZ2FpbnN0XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gdGVzdCB3aXRoXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbkRlbGVnYXRlLnByb3RvdHlwZS5tYXRjaGVzVGFnID0gZnVuY3Rpb24odGFnTmFtZSwgZWxlbWVudCkge1xuICByZXR1cm4gdGFnTmFtZSA9PT0gZWxlbWVudC50YWdOYW1lO1xufTtcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGVsZW1lbnRcbiAqIG1hdGNoZXMgdGhlIHJvb3QuXG4gKlxuICogQHBhcmFtIHs/U3RyaW5nfSBzZWxlY3RvciBJbiB0aGlzIGNhc2UgdGhpcyBpcyBhbHdheXMgcGFzc2VkIHRocm91Z2ggYXMgbnVsbCBhbmQgbm90IHVzZWRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuRGVsZWdhdGUucHJvdG90eXBlLm1hdGNoZXNSb290ID0gZnVuY3Rpb24oc2VsZWN0b3IsIGVsZW1lbnQpIHtcbiAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQgPT09IGVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdGhlIElEIG9mXG4gKiB0aGUgZWxlbWVudCBpbiAndGhpcydcbiAqIG1hdGNoZXMgdGhlIGdpdmVuIElELlxuICpcbiAqIElEcyBhcmUgY2FzZS1zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBJRCB0byB0ZXN0IGFnYWluc3RcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuRGVsZWdhdGUucHJvdG90eXBlLm1hdGNoZXNJZCA9IGZ1bmN0aW9uKGlkLCBlbGVtZW50KSB7XG4gIHJldHVybiBpZCA9PT0gZWxlbWVudC5pZDtcbn07XG5cbi8qKlxuICogU2hvcnQgaGFuZCBmb3Igb2ZmKClcbiAqIGFuZCByb290KCksIGllIGJvdGhcbiAqIHdpdGggbm8gcGFyYW1ldGVyc1xuICpcbiAqIEByZXR1cm4gdm9pZFxuICovXG5EZWxlZ2F0ZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm9mZigpO1xuICB0aGlzLnJvb3QoKTtcbn07XG4iLCIvKmpzaGludCBicm93c2VyOnRydWUsIG5vZGU6dHJ1ZSovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAcHJlc2VydmUgQ3JlYXRlIGFuZCBtYW5hZ2UgYSBET00gZXZlbnQgZGVsZWdhdG9yLlxuICpcbiAqIEB2ZXJzaW9uIDAuMy4wXG4gKiBAY29kaW5nc3RhbmRhcmQgZnRsYWJzLWpzdjJcbiAqIEBjb3B5cmlnaHQgVGhlIEZpbmFuY2lhbCBUaW1lcyBMaW1pdGVkIFtBbGwgUmlnaHRzIFJlc2VydmVkXVxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKHNlZSBMSUNFTlNFLnR4dClcbiAqL1xudmFyIERlbGVnYXRlID0gcmVxdWlyZSgnLi9kZWxlZ2F0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHJvb3QpIHtcbiAgcmV0dXJuIG5ldyBEZWxlZ2F0ZShyb290KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLkRlbGVnYXRlID0gRGVsZWdhdGU7XG4iLCJcbi8qKlxuICogRXhwb3NlIGBwYXJzZWAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcblxuLyoqXG4gKiBXcmFwIG1hcCBmcm9tIGpxdWVyeS5cbiAqL1xuXG52YXIgbWFwID0ge1xuICBvcHRpb246IFsxLCAnPHNlbGVjdCBtdWx0aXBsZT1cIm11bHRpcGxlXCI+JywgJzwvc2VsZWN0PiddLFxuICBvcHRncm91cDogWzEsICc8c2VsZWN0IG11bHRpcGxlPVwibXVsdGlwbGVcIj4nLCAnPC9zZWxlY3Q+J10sXG4gIGxlZ2VuZDogWzEsICc8ZmllbGRzZXQ+JywgJzwvZmllbGRzZXQ+J10sXG4gIHRoZWFkOiBbMSwgJzx0YWJsZT4nLCAnPC90YWJsZT4nXSxcbiAgdGJvZHk6IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddLFxuICB0Zm9vdDogWzEsICc8dGFibGU+JywgJzwvdGFibGU+J10sXG4gIGNvbGdyb3VwOiBbMSwgJzx0YWJsZT4nLCAnPC90YWJsZT4nXSxcbiAgY2FwdGlvbjogWzEsICc8dGFibGU+JywgJzwvdGFibGU+J10sXG4gIHRyOiBbMiwgJzx0YWJsZT48dGJvZHk+JywgJzwvdGJvZHk+PC90YWJsZT4nXSxcbiAgdGQ6IFszLCAnPHRhYmxlPjx0Ym9keT48dHI+JywgJzwvdHI+PC90Ym9keT48L3RhYmxlPiddLFxuICB0aDogWzMsICc8dGFibGU+PHRib2R5Pjx0cj4nLCAnPC90cj48L3Rib2R5PjwvdGFibGU+J10sXG4gIGNvbDogWzIsICc8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPicsICc8L2NvbGdyb3VwPjwvdGFibGU+J10sXG4gIF9kZWZhdWx0OiBbMCwgJycsICcnXVxufTtcblxuLyoqXG4gKiBQYXJzZSBgaHRtbGAgYW5kIHJldHVybiB0aGUgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2UoaHRtbCkge1xuICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIGh0bWwpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1N0cmluZyBleHBlY3RlZCcpO1xuXG4gIC8vIHRhZyBuYW1lXG4gIHZhciBtID0gLzwoW1xcdzpdKykvLmV4ZWMoaHRtbCk7XG4gIGlmICghbSkgdGhyb3cgbmV3IEVycm9yKCdObyBlbGVtZW50cyB3ZXJlIGdlbmVyYXRlZC4nKTtcbiAgdmFyIHRhZyA9IG1bMV07XG5cbiAgLy8gYm9keSBzdXBwb3J0XG4gIGlmICh0YWcgPT0gJ2JvZHknKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xuICAgIGVsLmlubmVySFRNTCA9IGh0bWw7XG4gICAgcmV0dXJuIGVsLnJlbW92ZUNoaWxkKGVsLmxhc3RDaGlsZCk7XG4gIH1cblxuICAvLyB3cmFwIG1hcFxuICB2YXIgd3JhcCA9IG1hcFt0YWddIHx8IG1hcC5fZGVmYXVsdDtcbiAgdmFyIGRlcHRoID0gd3JhcFswXTtcbiAgdmFyIHByZWZpeCA9IHdyYXBbMV07XG4gIHZhciBzdWZmaXggPSB3cmFwWzJdO1xuICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZWwuaW5uZXJIVE1MID0gcHJlZml4ICsgaHRtbCArIHN1ZmZpeDtcbiAgd2hpbGUgKGRlcHRoLS0pIGVsID0gZWwubGFzdENoaWxkO1xuXG4gIHZhciBlbHMgPSBlbC5jaGlsZHJlbjtcbiAgaWYgKDEgPT0gZWxzLmxlbmd0aCkge1xuICAgIHJldHVybiBlbC5yZW1vdmVDaGlsZChlbHNbMF0pO1xuICB9XG5cbiAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICB3aGlsZSAoZWxzLmxlbmd0aCkge1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsLnJlbW92ZUNoaWxkKGVsc1swXSkpO1xuICB9XG5cbiAgcmV0dXJuIGZyYWdtZW50O1xufVxuIiwiLyohXG4gICogZG9tcmVhZHkgKGMpIER1c3RpbiBEaWF6IDIwMTIgLSBMaWNlbnNlIE1JVFxuICAqL1xuIWZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcpIGRlZmluZShkZWZpbml0aW9uKVxuICBlbHNlIHRoaXNbbmFtZV0gPSBkZWZpbml0aW9uKClcbn0oJ2RvbXJlYWR5JywgZnVuY3Rpb24gKHJlYWR5KSB7XG5cbiAgdmFyIGZucyA9IFtdLCBmbiwgZiA9IGZhbHNlXG4gICAgLCBkb2MgPSBkb2N1bWVudFxuICAgICwgdGVzdEVsID0gZG9jLmRvY3VtZW50RWxlbWVudFxuICAgICwgaGFjayA9IHRlc3RFbC5kb1Njcm9sbFxuICAgICwgZG9tQ29udGVudExvYWRlZCA9ICdET01Db250ZW50TG9hZGVkJ1xuICAgICwgYWRkRXZlbnRMaXN0ZW5lciA9ICdhZGRFdmVudExpc3RlbmVyJ1xuICAgICwgb25yZWFkeXN0YXRlY2hhbmdlID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcbiAgICAsIHJlYWR5U3RhdGUgPSAncmVhZHlTdGF0ZSdcbiAgICAsIGxvYWRlZFJneCA9IGhhY2sgPyAvXmxvYWRlZHxeYy8gOiAvXmxvYWRlZHxjL1xuICAgICwgbG9hZGVkID0gbG9hZGVkUmd4LnRlc3QoZG9jW3JlYWR5U3RhdGVdKVxuXG4gIGZ1bmN0aW9uIGZsdXNoKGYpIHtcbiAgICBsb2FkZWQgPSAxXG4gICAgd2hpbGUgKGYgPSBmbnMuc2hpZnQoKSkgZigpXG4gIH1cblxuICBkb2NbYWRkRXZlbnRMaXN0ZW5lcl0gJiYgZG9jW2FkZEV2ZW50TGlzdGVuZXJdKGRvbUNvbnRlbnRMb2FkZWQsIGZuID0gZnVuY3Rpb24gKCkge1xuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGZuLCBmKVxuICAgIGZsdXNoKClcbiAgfSwgZilcblxuXG4gIGhhY2sgJiYgZG9jLmF0dGFjaEV2ZW50KG9ucmVhZHlzdGF0ZWNoYW5nZSwgZm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKC9eYy8udGVzdChkb2NbcmVhZHlTdGF0ZV0pKSB7XG4gICAgICBkb2MuZGV0YWNoRXZlbnQob25yZWFkeXN0YXRlY2hhbmdlLCBmbilcbiAgICAgIGZsdXNoKClcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIChyZWFkeSA9IGhhY2sgP1xuICAgIGZ1bmN0aW9uIChmbikge1xuICAgICAgc2VsZiAhPSB0b3AgP1xuICAgICAgICBsb2FkZWQgPyBmbigpIDogZm5zLnB1c2goZm4pIDpcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0ZXN0RWwuZG9TY3JvbGwoJ2xlZnQnKVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyByZWFkeShmbikgfSwgNTApXG4gICAgICAgICAgfVxuICAgICAgICAgIGZuKClcbiAgICAgICAgfSgpXG4gICAgfSA6XG4gICAgZnVuY3Rpb24gKGZuKSB7XG4gICAgICBsb2FkZWQgPyBmbigpIDogZm5zLnB1c2goZm4pXG4gICAgfSlcbn0pXG4iLCIvKiFcclxuICogZG9wZSAgICAgICAgIEhUTUwgYXR0cmlidXRlcy9kYXRhc2V0IG1vZHVsZVxyXG4gKiBAbGluayAgICAgICAgaHR0cDovL2dpdGh1Yi5jb20vcnlhbnZlL2RvcGVcclxuICogQGxpY2Vuc2UgICAgIE1JVFxyXG4gKiBAY29weXJpZ2h0ICAgMjAxMiBSeWFuIFZhbiBFdHRlblxyXG4gKiBAdmVyc2lvbiAgICAgMi4yLjFcclxuICovXHJcblxyXG4vKmpzaGludCBleHByOnRydWUsIHN1Yjp0cnVlLCBzdXBlcm5ldzp0cnVlLCBkZWJ1Zzp0cnVlLCBub2RlOnRydWUsIGJvc3M6dHJ1ZSwgZGV2ZWw6dHJ1ZSwgZXZpbDp0cnVlLCBcclxuICBsYXhjb21tYTp0cnVlLCBlcW51bGw6dHJ1ZSwgdW5kZWY6dHJ1ZSwgdW51c2VkOnRydWUsIGJyb3dzZXI6dHJ1ZSwganF1ZXJ5OnRydWUsIG1heGVycjoxMDAgKi9cclxuXHJcbihmdW5jdGlvbihyb290LCBuYW1lLCBtYWtlKSB7XHJcbiAgICB0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZVsnZXhwb3J0cyddID8gbW9kdWxlWydleHBvcnRzJ10gPSBtYWtlKCkgOiByb290W25hbWVdID0gbWFrZSgpO1xyXG59KHRoaXMsICdkb3BlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gZGV2ZWxvcGVycy5nb29nbGUuY29tL2Nsb3N1cmUvY29tcGlsZXIvZG9jcy9hcGktdHV0b3JpYWwzXHJcbiAgICAvLyBkZXZlbG9wZXJzLmdvb2dsZS5jb20vY2xvc3VyZS9jb21waWxlci9kb2NzL2pzLWZvci1jb21waWxlclxyXG5cclxuICAgIHZhciBkb2MgPSBkb2N1bWVudFxyXG4gICAgICAsIHhwb3J0cyA9IHt9XHJcbiAgICAgICwgZWZmaW5zID0geHBvcnRzWydmbiddID0ge31cclxuICAgICAgLCBvd25zID0geHBvcnRzLmhhc093blByb3BlcnR5XHJcbiAgICAgICwgRE1TID0gdHlwZW9mIERPTVN0cmluZ01hcCAhPSAndW5kZWZpbmVkJ1xyXG4gICAgICAsIHBhcnNlSlNPTiA9IHR5cGVvZiBKU09OICE9ICd1bmRlZmluZWQnICYmIEpTT04ucGFyc2VcclxuICAgICAgLCBxdWVyeU1ldGhvZCA9ICdxdWVyeVNlbGVjdG9yQWxsJyBcclxuICAgICAgLCBRU0EgPSAhIWRvY1txdWVyeU1ldGhvZF0gfHwgIShxdWVyeU1ldGhvZCA9ICdnZXRFbGVtZW50c0J5VGFnTmFtZScpXHJcbiAgICAgICwgcXVlcnlFbmdpbmUgPSBmdW5jdGlvbihzLCByb290KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzID8gKHJvb3QgfHwgZG9jKVtxdWVyeU1ldGhvZF0ocykgOiBbXTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAsIGNhbWVscyA9IC8oW2Etel0pKFtBLVpdKS9nICAgICAgICAgICAgLy8gbG93ZXJjYXNlIG5leHQgdG8gdXBwZXJjYXNlXHJcbiAgICAgICwgZGFzaEI0ID0gLy0oLikvZyAgICAgICAgICAgICAgICAgICAgICAvLyBmaW5kcyBjaGFycyBhZnRlciBoeXBoZW5zXHJcbiAgICAgICwgY3N2U3N2ID0gL1xccypbXFxzXFwsXStcXHMqLyAgICAgICAgICAgICAgLy8gc3BsaXR0ZXIgZm9yIGNvbW1hICpvciogc3BhY2Utc2VwYXJhdGVkIHZhbHVlc1xyXG4gICAgICAsIGNsZWFuQXR0ciA9IC9eW1xcW1xcc10rfFxccyt8W1xcXVxcc10rJC9nICAvLyByZXBsYWNlIHdoaXRlc3BhY2UsIHRyaW0gW10gYnJhY2tldHNcclxuICAgICAgLCBjbGVhblByZSA9IC9eW1xcW1xcc10/KGRhdGEtKT98XFxzK3xbXFxdXFxzXT8kL2cgLy8gcmVwbGFjZSB3aGl0ZXNwYWNlLCB0cmltIFtdIGJyYWNrZXRzLCB0cmltIHByZWZpeFxyXG4gICAgICAsIGVzY0RvdHMgPSAvXFxcXCpcXC4vZyAgICAgICAgICAgICAgICAgICAgLy8gZmluZCBwZXJpb2RzIHcvIGFuZCB3L28gcHJlY2VkaW5nIGJhY2tzbGFzaGVzXHJcbiAgICAgICwgc3N2ID0gL1xccysvXHJcbiAgICAgICwgdHJpbW1lciA9IC9eXFxzK3xcXHMrJC9cclxuICAgICAgLCB0cmltID0gJycudHJpbSA/IGZ1bmN0aW9uKHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGwgPT0gcyA/ICcnIDogcy50cmltKCk7IFxyXG4gICAgICAgIH0gOiBmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsID09IHMgPyAnJyA6IHMucmVwbGFjZSh0cmltbWVyLCAnJyk7IFxyXG4gICAgICAgIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiAge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2FtZWxIYW5kbGVyKGFsbCwgbGV0dGVyKSB7IFxyXG4gICAgICAgIHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgICdkYXRhLXB1bHAtZmljdGlvbicgdG8gJ3B1bHBGaWN0aW9uJy4gTm9uLXNjYWxhcnMgcmV0dXJuIGFuXHJcbiAgICAgKiBlbXB0eSBzdHJpbmcuIG51bWJlcnxib29sZWFuIGNvZXJjZXMgdG8gc3RyaW5nLiAob3Bwb3NpdGU6IGRhdGF0aXplKCkpXHJcbiAgICAgKiBAcGFyYW0gICB7c3RyaW5nfG51bWJlcnxib29sZWFufCp9ICBzXHJcbiAgICAgKiBAcmV0dXJuICB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjYW1lbGl6ZShzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzICE9ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHMgPT0gJ251bWJlcicgfHwgdHlwZW9mIHMgPT0gJ2Jvb2xlYW4nID8gJycgKyBzIDogJyc7IFxyXG4gICAgICAgIC8vIFJlbW92ZSBkYXRhLSBwcmVmaXggYW5kIGNvbnZlcnQgcmVtYWluaW5nIGRhc2hlZCBzdHJpbmcgdG8gY2FtZWxDYXNlOlxyXG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoY2xlYW5QcmUsICcnKS5yZXBsYWNlKGRhc2hCNCwgY2FtZWxIYW5kbGVyKTsgLy8gLWEgdG8gQVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCAgJ3B1bHBGaWN0aW9uJyB0byAnZGF0YS1wdWxwLWZpY3Rpb24nIE9SIDQ3IHRvICdkYXRhLTQ3J1xyXG4gICAgICogSW52YWxpZCB0eXBlcyByZXR1cm4gYW4gZW1wdHkgc3RyaW5nLiAob3Bwb3NpdGU6IGNhbWVsaXplKCkpXHJcbiAgICAgKiBAcGFyYW0gICB7c3RyaW5nfG51bWJlcnwqfSAgc1xyXG4gICAgICogQHJldHVybiAge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZGF0YXRpemUocykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcyA9PSAnc3RyaW5nJykgcyA9IHMucmVwbGFjZShjbGVhblByZSwgJyQxJykucmVwbGFjZShjYW1lbHMsICckMS0kMicpOyAvLyBhQSB0byBhLUFcclxuICAgICAgICBlbHNlIHMgPSB0eXBlb2YgcyA9PSAnbnVtYmVyJyAgPyAnJyArIHMgOiAnJztcclxuICAgICAgICByZXR1cm4gcyA/ICgnZGF0YS0nICsgcy50b0xvd2VyQ2FzZSgpKSA6IHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IGEgc3RyaW5naWZpZWQgcHJpbWl0aXZlIGludG8gaXRzIGNvcnJlY3QgdHlwZS5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfCp9ICBzXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHBhcnNlKHMpIHtcclxuICAgICAgICB2YXIgbjsgLy8gdW5kZWZpbmVkLCBvciBiZWNvbWVzIG51bWJlclxyXG4gICAgICAgIHJldHVybiB0eXBlb2YgcyAhPSAnc3RyaW5nJyB8fCAhcyA/IHNcclxuICAgICAgICAgICAgOiAnZmFsc2UnID09PSBzID8gZmFsc2VcclxuICAgICAgICAgICAgOiAndHJ1ZScgPT09IHMgPyB0cnVlXHJcbiAgICAgICAgICAgIDogJ251bGwnID09PSBzID8gbnVsbFxyXG4gICAgICAgICAgICA6ICd1bmRlZmluZWQnID09PSBzIHx8IChuID0gKCtzKSkgfHwgMCA9PT0gbiB8fCAnTmFOJyA9PT0gcyA/IG5cclxuICAgICAgICAgICAgOiBzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtICAge09iamVjdHxBcnJheXwqfSAgbGlzdFxyXG4gICAgICogQHBhcmFtICAge0Z1bmN0aW9ufSAgICAgICAgZm4gICAgIFxyXG4gICAgICogQHBhcmFtICAgeyhPYmplY3R8Kik9fSAgICAgc2NvcGVcclxuICAgICAqIEBwYXJhbSAgIHtib29sZWFuPX0gICAgICAgIGNvbXBhY3QgXHJcbiAgICAgKiBAcmV0dXJuICB7QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIG1hcChsaXN0LCBmbiwgc2NvcGUsIGNvbXBhY3QpIHtcclxuICAgICAgICB2YXIgbCwgaSA9IDAsIHYsIHUgPSAwLCByZXQgPSBbXTtcclxuICAgICAgICBpZiAobGlzdCA9PSBudWxsKSByZXR1cm4gcmV0O1xyXG4gICAgICAgIGNvbXBhY3QgPSB0cnVlID09PSBjb21wYWN0O1xyXG4gICAgICAgIGZvciAobCA9IGxpc3QubGVuZ3RoOyBpIDwgbDspIHtcclxuICAgICAgICAgICAgdiA9IGZuLmNhbGwoc2NvcGUsIGxpc3RbaV0sIGkrKywgbGlzdCk7XHJcbiAgICAgICAgICAgIGlmICh2IHx8ICFjb21wYWN0KSByZXRbdSsrXSA9IHY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiBcclxuICAgICAqIHNwZWNpYWwtY2FzZSBET00tbm9kZSBpdGVyYXRvciBvcHRpbWl6ZWQgZm9yIGludGVybmFsIHVzZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl9ICBvYlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICBmblxyXG4gICAgICogQHBhcmFtIHsqPX0gICAgICAgICAgICBwYXJhbVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBlYWNoTm9kZShvYiwgZm4sIHBhcmFtKSB7XHJcbiAgICAgICAgZm9yICh2YXIgbCA9IG9iLmxlbmd0aCwgaSA9IDA7IGkgPCBsOyBpKyspXHJcbiAgICAgICAgICAgIG9iW2ldICYmIG9iW2ldLm5vZGVUeXBlICYmIGZuKG9iW2ldLCBwYXJhbSk7XHJcbiAgICAgICAgcmV0dXJuIG9iO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW50ZXJuYWwtdXNlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgYSBub2RlJ3MgYXR0cmlidXRlc1xyXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICBlbFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICBmblxyXG4gICAgICogQHBhcmFtIHsoYm9vbGVhbnwqKT19ICBleHBcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZWFjaEF0dHIoZWwsIGZuLCBleHApIHtcclxuICAgICAgICB2YXIgdGVzdCwgbiwgYSwgaSwgbDtcclxuICAgICAgICBpZiAoIWVsLmF0dHJpYnV0ZXMpIHJldHVybjtcclxuICAgICAgICB0ZXN0ID0gdHlwZW9mIGV4cCA9PSAnYm9vbGVhbicgPyAvXmRhdGEtLyA6IHRlc3Q7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbDspIHtcclxuICAgICAgICAgICAgaWYgKGEgPSBlbC5hdHRyaWJ1dGVzW2krK10pIHtcclxuICAgICAgICAgICAgICAgIG4gPSAnJyArIGEubmFtZTtcclxuICAgICAgICAgICAgICAgIHRlc3QgJiYgdGVzdC50ZXN0KG4pICE9PSBleHAgfHwgbnVsbCA9PSBhLnZhbHVlIHx8IGZuLmNhbGwoZWwsIGEudmFsdWUsIG4sIGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG9iamVjdCBjb250YWluaW5nIGFuIGVsZW1lbnQncyBkYXRhIGF0dHJzLlxyXG4gICAgICogQHBhcmFtICB7Tm9kZX0gIGVsXHJcbiAgICAgKiBAcmV0dXJuIHtET01TdHJpbmdNYXB8T2JqZWN0fHVuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0RGF0YXNldChlbCkge1xyXG4gICAgICAgIHZhciBvYjtcclxuICAgICAgICBpZiAoIWVsIHx8IDEgIT09IGVsLm5vZGVUeXBlKSByZXR1cm47ICAvLyB1bmRlZmluZWRcclxuICAgICAgICBpZiAob2IgPSBETVMgJiYgZWwuZGF0YXNldCkgcmV0dXJuIG9iOyAvLyBuYXRpdmVcclxuICAgICAgICBvYiA9IHt9OyAvLyBGYWxsYmFjayBwbGFpbiBvYmplY3QgY2Fubm90IG11dGF0ZSB0aGUgZGF0YXNldCB2aWEgcmVmZXJlbmNlLlxyXG4gICAgICAgIGVhY2hBdHRyKGVsLCBmdW5jdGlvbih2LCBrKSB7XHJcbiAgICAgICAgICAgIG9iW2NhbWVsaXplKGspXSA9ICcnICsgdjtcclxuICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICByZXR1cm4gb2I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSAgICAgZWxcclxuICAgICAqIEBwYXJhbSAge09iamVjdD19ICBvYlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZXNldERhdGFzZXQoZWwsIG9iKSB7XHJcbiAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBuLCBjdXJyID0gZWwuZGF0YXNldDtcclxuICAgICAgICBpZiAoY3VyciAmJiBETVMpIHtcclxuICAgICAgICAgICAgaWYgKGN1cnIgPT09IG9iKSByZXR1cm47XHJcbiAgICAgICAgICAgIGZvciAobiBpbiBjdXJyKSBkZWxldGUgY3VycltuXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2IgJiYgZGF0YXNldChlbCwgb2IpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSAge05vZGV9ICAgICAgZWxcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gICAgb2JcclxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSAgZm5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2V0VmlhT2JqZWN0KGVsLCBvYiwgZm4pIHtcclxuICAgICAgICBmb3IgKHZhciBuIGluIG9iKVxyXG4gICAgICAgICAgICBvd25zLmNhbGwob2IsIG4pICYmIGZuKGVsLCBuLCBvYltuXSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fEFycmF5fEZ1bmN0aW9ufSAgZWxcclxuICAgICAqIEBwYXJhbSAgeyhzdHJpbmd8T2JqZWN0fCopPX0gICAgIGtcclxuICAgICAqIEBwYXJhbSAgeyo9fSAgICAgICAgICAgICAgICAgICAgIHZcclxuICAgICAqLyAgICBcclxuICAgIGZ1bmN0aW9uIGF0dHIoZWwsIGssIHYpIHtcclxuICAgICAgICBlbCA9IGVsLm5vZGVUeXBlID8gZWwgOiBlbFswXTtcclxuICAgICAgICBpZiAoIWVsIHx8ICFlbC5zZXRBdHRyaWJ1dGUpIHJldHVybjtcclxuICAgICAgICBrID0gdHlwZW9mIGsgPT0gJ2Z1bmN0aW9uJyA/IGsuY2FsbChlbCkgOiBrO1xyXG4gICAgICAgIGlmICghaykgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0eXBlb2YgayA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAvLyBTRVQtbXVsdGlcclxuICAgICAgICAgICAgc2V0VmlhT2JqZWN0KGVsLCBrLCBhdHRyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodm9pZCAwID09PSB2KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBHRVRcclxuICAgICAgICAgICAgICAgIGsgPSBlbC5nZXRBdHRyaWJ1dGUoayk7IC8vIHJlcHVycG9zZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGwgPT0gayA/IHYgOiAnJyArIGs7IC8vIG5vcm1hbGl6ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNFVFxyXG4gICAgICAgICAgICB2ID0gdHlwZW9mIHYgPT0gJ2Z1bmN0aW9uJyA/IHYuY2FsbChlbCkgOiB2O1xyXG4gICAgICAgICAgICB2ID0gJycgKyB2OyAvLyBub3JtYWxpemUgaW5wdXRzXHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShrLCB2KTtcclxuICAgICAgICAgICAgcmV0dXJuIHY7IC8vIHRoZSBjdXJyIHZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSAge09iamVjdHxBcnJheXxGdW5jdGlvbn0gIGVsXHJcbiAgICAgKiBAcGFyYW0gIHsoc3RyaW5nfE9iamVjdHwqKT19ICAgICBrXHJcbiAgICAgKiBAcGFyYW0gIHsqPX0gICAgICAgICAgICAgICAgICAgICB2XHJcbiAgICAgKi8gICAgXHJcbiAgICBmdW5jdGlvbiBkYXRhc2V0KGVsLCBrLCB2KSB7XHJcbiAgICAgICAgdmFyIGV4YWN0LCBrRnVuID0gdHlwZW9mIGsgPT0gJ2Z1bmN0aW9uJztcclxuICAgICAgICBlbCA9IGVsLm5vZGVUeXBlID8gZWwgOiBlbFswXTtcclxuICAgICAgICBpZiAoIWVsIHx8ICFlbC5zZXRBdHRyaWJ1dGUpIHJldHVybjtcclxuICAgICAgICBpZiAodm9pZCAwID09PSBrICYmIHYgPT09IGspIHJldHVybiBnZXREYXRhc2V0KGVsKTtcclxuICAgICAgICBrID0ga0Z1biA/IGsuY2FsbChlbCkgOiBrO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGsgPT0gJ29iamVjdCcgJiYgKGtGdW4gfHwgIShleGFjdCA9IHZvaWQgMCA9PT0gdiAmJiBkYXRhdGl6ZShrWzBdKSkpKSB7XHJcbiAgICAgICAgICAgIC8vIFNFVC1tdWx0aVxyXG4gICAgICAgICAgICBrRnVuICYmIGRlbGV0ZXMoZWwpO1xyXG4gICAgICAgICAgICBrICYmIHNldFZpYU9iamVjdChlbCwgaywgZGF0YXNldCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgayA9IGV4YWN0IHx8IGRhdGF0aXplKGspO1xyXG4gICAgICAgICAgICBpZiAoIWspIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHZvaWQgMCA9PT0gdikge1xyXG4gICAgICAgICAgICAgICAgLy8gR0VUXHJcbiAgICAgICAgICAgICAgICBrID0gZWwuZ2V0QXR0cmlidXRlKGspOyAvLyByZXB1cnBvc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsID09IGsgPyB2IDogZXhhY3QgPyBwYXJzZShrKSA6ICcnICsgazsgLy8gbm9ybWFsaXplXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU0VUXHJcbiAgICAgICAgICAgIHYgPSB0eXBlb2YgdiA9PSAnZnVuY3Rpb24nID8gdi5jYWxsKGVsKSA6IHY7XHJcbiAgICAgICAgICAgIHYgPSAnJyArIHY7IC8vIG5vcm1hbGl6ZSBpbnB1dHNcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGssIHYpO1xyXG4gICAgICAgICAgICByZXR1cm4gdjsgLy8gY3VycmVudCB2YWx1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSAge05vZGV9ICAgICAgICAgICAgICAgICAgIGVsXHJcbiAgICAgKiBAcGFyYW0gIHsoQXJyYXl8c3RyaW5nfG51bWJlcik9fSBrZXlzXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZXMoZWwsIGtleXMpIHtcclxuICAgICAgICB2YXIgaywgaSA9IDA7XHJcbiAgICAgICAgZWwgPSBlbC5ub2RlVHlwZSA/IGVsIDogZWxbMF07XHJcbiAgICAgICAgaWYgKCFlbCB8fCAhZWwucmVtb3ZlQXR0cmlidXRlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKHZvaWQgMCA9PT0ga2V5cykge1xyXG4gICAgICAgICAgICByZXNldERhdGFzZXQoZWwpOyBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBrZXlzID0gdHlwZW9mIGtleXMgPT0gJ3N0cmluZycgPyBrZXlzLnNwbGl0KHNzdikgOiBbXS5jb25jYXQoa2V5cyk7XHJcbiAgICAgICAgICAgIHdoaWxlIChpIDwga2V5cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGsgPSBkYXRhdGl6ZShrZXlzW2krK10pO1xyXG4gICAgICAgICAgICAgICAgayAmJiBlbC5yZW1vdmVBdHRyaWJ1dGUoayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtICB7Tm9kZX0gICAgICAgICAgICAgICAgZWxcclxuICAgICAqIEBwYXJhbSAge0FycmF5fHN0cmluZ3xudW1iZXJ9IGtleXNcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVtb3ZlQXR0cihlbCwga2V5cykge1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICBlbCA9IGVsLm5vZGVUeXBlID8gZWwgOiBlbFswXTtcclxuICAgICAgICBpZiAoZWwgJiYgZWwucmVtb3ZlQXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgIGZvciAoa2V5cyA9IHR5cGVvZiBrZXlzID09ICdzdHJpbmcnID8ga2V5cy5zcGxpdChzc3YpIDogW10uY29uY2F0KGtleXMpOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAga2V5c1tpXSAmJiBlbC5yZW1vdmVBdHRyaWJ1dGUoa2V5c1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IGxpc3Qgb2YgYXR0ciBuYW1lcyBvciBkYXRhLSBrZXlzIGludG8gYSBzZWxlY3Rvci5cclxuICAgICAqIEBwYXJhbSAgIHtBcnJheXxzdHJpbmd8bnVtYmVyfCp9ICBsaXN0XHJcbiAgICAgKiBAcGFyYW0gICB7Ym9vbGVhbj19ICAgICAgICAgICAgICAgcHJlZml4XHJcbiAgICAgKiBAcGFyYW0gICB7Ym9vbGVhbj19ICAgICAgICAgICAgICAgam9pblxyXG4gICAgICogQHJldHVybiAge3N0cmluZ3xBcnJheX1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdG9BdHRyU2VsZWN0b3IobGlzdCwgcHJlZml4LCBqb2luKSB7XHJcbiAgICAgICAgdmFyIGwsIHMsIGkgPSAwLCBqID0gMCwgZW1wID0gJycsIGFyciA9IFtdO1xyXG4gICAgICAgIHByZWZpeCA9IHRydWUgPT09IHByZWZpeDtcclxuICAgICAgICBsaXN0ID0gdHlwZW9mIGxpc3QgPT0gJ3N0cmluZycgPyBsaXN0LnNwbGl0KGNzdlNzdikgOiB0eXBlb2YgbGlzdCA9PSAnbnVtYmVyJyA/ICcnICsgbGlzdCA6IGxpc3Q7XHJcbiAgICAgICAgZm9yIChsID0gbGlzdC5sZW5ndGg7IGkgPCBsOykge1xyXG4gICAgICAgICAgICBzID0gbGlzdFtpKytdO1xyXG4gICAgICAgICAgICBzID0gcHJlZml4ID8gZGF0YXRpemUocykgOiBzLnJlcGxhY2UoY2xlYW5BdHRyLCBlbXApO1xyXG4gICAgICAgICAgICBzICYmIChhcnJbaisrXSA9IHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBFc2NhcGUgcGVyaW9kcyB0byBhbGxvdyBhdHRzIGxpa2UgYFtkYXRhLXRoZS53aF9vXWBcclxuICAgICAgICAvLyBAbGluayBhcGkuanF1ZXJ5LmNvbS9jYXRlZ29yeS9zZWxlY3RvcnMvXHJcbiAgICAgICAgLy8gQGxpbmsgc3RhY2tvdmVyZmxvdy5jb20vcS8xMzI4MzY5OS83NzAxMjdcclxuICAgICAgICByZXR1cm4gZmFsc2UgPT09IGpvaW4gPyBhcnIgOiBqID8gJ1snICsgYXJyLmpvaW4oJ10sWycpLnJlcGxhY2UoZXNjRG90cywgJ1xcXFxcXFxcLicpICsgJ10nIDogZW1wO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGVsZW1lbnRzIG1hdGNoZWQgYnkgYSBkYXRhIGtleS5cclxuICAgICAqIEBwYXJhbSAgIHtBcnJheXxzdHJpbmd9ICBsaXN0ICAgYXJyYXkgb3IgQ1NWIG9yIFNTViBkYXRhIGtleXNcclxuICAgICAqIEByZXR1cm4gIHtBcnJheXwqfVxyXG4gICAgICovICAgICBcclxuICAgIHhwb3J0c1sncXVlcnlEYXRhJ10gPSBRU0EgPyBmdW5jdGlvbihsaXN0LCByb290KSB7XHJcbiAgICAgICAgLy8gTW9kZXJuIGJyb3dzZXJzLCBJRTgrXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlID09PSByb290ID8gdG9BdHRyU2VsZWN0b3IobGlzdCwgdHJ1ZSwgcm9vdCkgOiBxdWVyeUVuZ2luZSh0b0F0dHJTZWxlY3RvcihsaXN0LCB0cnVlKSwgcm9vdCk7XHJcbiAgICB9IDogZnVuY3Rpb24obGlzdCwgcm9vdCkge1xyXG4gICAgICAgIC8vID09IEZBTExCQUNLID09XHJcbiAgICAgICAgbGlzdCA9IHRvQXR0clNlbGVjdG9yKGxpc3QsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2UgPT09IHJvb3QgPyBsaXN0IDogcXVlcnlBdHRyRmFsbGJhY2sobGlzdCwgcm9vdCk7IFxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgZWxlbWVudHMgbWF0Y2hlZCBieSBhbiBhdHRyaWJ1dGUgbmFtZS5cclxuICAgICAqIEBwYXJhbSAgIHtBcnJheXxzdHJpbmd9ICBsaXN0ICAgYXJyYXkgb3IgQ1NWIG9yIFNTViBkYXRhIGtleXNcclxuICAgICAqIEByZXR1cm4gIHtBcnJheXwqfVxyXG4gICAgICovICAgICBcclxuICAgIHhwb3J0c1sncXVlcnlBdHRyJ10gPSBRU0EgPyBmdW5jdGlvbihsaXN0LCByb290KSB7XHJcbiAgICAgICAgLy8gTW9kZXJuIGJyb3dzZXJzLCBJRTgrXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlID09PSByb290ID8gdG9BdHRyU2VsZWN0b3IobGlzdCwgcm9vdCwgcm9vdCkgOiBxdWVyeUVuZ2luZSh0b0F0dHJTZWxlY3RvcihsaXN0KSwgcm9vdCk7XHJcbiAgICB9IDogZnVuY3Rpb24obGlzdCwgcm9vdCkge1xyXG4gICAgICAgIC8vID09IEZBTExCQUNLID09XHJcbiAgICAgICAgbGlzdCA9IHRvQXR0clNlbGVjdG9yKGxpc3QsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlID09PSByb290ID8gbGlzdCA6IHF1ZXJ5QXR0ckZhbGxiYWNrKGxpc3QsIHJvb3QpOyBcclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9ICBsaXN0ICAgaXMgYW4gYXJyYXkgb2YgYXR0cmlidXRlIG5hbWVzICh3L28gYnJhY2tzKVxyXG4gICAgICogQHBhcmFtIHtPYmplY3Q9fSAgICAgICByb290XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHF1ZXJ5QXR0ckZhbGxiYWNrKGxpc3QsIHJvb3QpIHtcclxuICAgICAgICB2YXIgaiwgaSwgZSwgZWxzLCBsID0gbGlzdC5sZW5ndGgsIHJldCA9IFtdLCB1ID0gMDtcclxuICAgICAgICBpZiAoIWwpIHJldHVybiByZXQ7XHJcbiAgICAgICAgZWxzID0gcXVlcnlFbmdpbmUoJyonLCByb290KTtcclxuICAgICAgICBmb3IgKGogPSAwOyAoZSA9IGVsc1tqXSk7IGorKykge1xyXG4gICAgICAgICAgICBpID0gbDsgLy8gcmVzZXQgaSBmb3IgZWFjaCBvdXRlciBpdGVyYXRpb25cclxuICAgICAgICAgICAgd2hpbGUgKGktLSkgey8vIGVhY2ggYXR0ciBuYW1lXHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0cihlLCBsaXN0W2ldKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0W3UrK10gPSBlOyAvLyBnaGV0dG8gcHVzaFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBwcmV2ZW50IHB1c2hpbmcgc2FtZSBlbGVtIHR3aWNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gRXhwb3NlIHJlbWFpbmluZyB0b3AtbGV2ZWwgbWV0aG9kczpcclxuICAgIHhwb3J0c1snbWFwJ10gPSBtYXA7XHJcbiAgICB4cG9ydHNbJ3BhcnNlJ10gPSBwYXJzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ3wqfSAgc1xyXG4gICAgICogQHNpbmNlICAyLjEuMFxyXG4gICAgICovXHJcbiAgICB4cG9ydHNbJ3BhcnNlSlNPTiddID0gZnVuY3Rpb24ocykge1xyXG4gICAgICAgIHMgPSBwYXJzZShzKTtcclxuICAgICAgICBpZiAodHlwZW9mIHMgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHMgPSBwYXJzZUpTT04odHJpbShzKSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzO1xyXG4gICAgfTtcclxuXHJcbiAgICB4cG9ydHNbJ3RyaW0nXSA9IHRyaW07XHJcbiAgICB4cG9ydHNbJ3FzYSddID0gcXVlcnlFbmdpbmU7XHJcbiAgICB4cG9ydHNbJ2F0dHInXSA9IGF0dHI7XHJcbiAgICB4cG9ydHNbJ3JlbW92ZUF0dHInXSA9IHJlbW92ZUF0dHI7XHJcbiAgICB4cG9ydHNbJ2RhdGFzZXQnXSA9IGRhdGFzZXQ7XHJcbiAgICB4cG9ydHNbJ2RlbGV0ZXMnXSA9IGRlbGV0ZXM7XHJcbiAgICB4cG9ydHNbJ2NhbWVsaXplJ10gPSBjYW1lbGl6ZTtcclxuICAgIHhwb3J0c1snZGF0YXRpemUnXSA9IGRhdGF0aXplO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHRoaXMgICAge09iamVjdHxBcnJheX1cclxuICAgICAqIEBwYXJhbSAgIHsqPX0gICBrXHJcbiAgICAgKiBAcGFyYW0gICB7Kj19ICAgdlxyXG4gICAgICovXHJcbiAgICBlZmZpbnNbJ2RhdGFzZXQnXSA9IGZ1bmN0aW9uKGssIHYpIHtcclxuICAgICAgICB2YXIga011bHRpID0gdHlwZW9mIGsgPT0gJ29iamVjdCcgPyAhKHZvaWQgMCA9PT0gdiAmJiBkYXRhdGl6ZShrWzBdKSkgOiB0eXBlb2YgayA9PSAnZnVuY3Rpb24nO1xyXG4gICAgICAgIGlmICh2b2lkIDAgPT09IHYgJiYgIWtNdWx0aSlcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFzZXQodGhpc1swXSwgayk7IC8vIEdFVFxyXG4gICAgICAgIHJldHVybiAoayA9IGtNdWx0aSA/IGsgOiBkYXRhdGl6ZShrKSkgPyBlYWNoTm9kZSh0aGlzLCBmdW5jdGlvbihlLCB4KSB7XHJcbiAgICAgICAgICAgIHggPSB0eXBlb2YgdiA9PSAnZnVuY3Rpb24nID8gdi5jYWxsKGUpIDogdjtcclxuICAgICAgICAgICAga011bHRpID8gZGF0YXNldChlLCBrLCB4KSA6IGUuc2V0QXR0cmlidXRlKGssICcnICsgeCk7IFxyXG4gICAgICAgIH0pIDogdm9pZCAwID09PSB2ID8gdiA6IHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHRoaXMgICAge09iamVjdHxBcnJheX1cclxuICAgICAqIEBwYXJhbSAgIHsqPX0gICBrXHJcbiAgICAgKiBAcGFyYW0gICB7Kj19ICAgdlxyXG4gICAgICovICAgIFxyXG4gICAgZWZmaW5zWydhdHRyJ10gPSBmdW5jdGlvbihrLCB2KSB7XHJcbiAgICAgICAgdmFyIGtNdWx0aSA9IHR5cGVvZiBrID09ICdvYmplY3QnIHx8IHR5cGVvZiBrID09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgaWYgKHZvaWQgMCA9PT0gdiAmJiAha011bHRpKVxyXG4gICAgICAgICAgICByZXR1cm4gYXR0cih0aGlzWzBdLCBrKTsgLy8gR0VUXHJcbiAgICAgICAgcmV0dXJuIGsgPyBlYWNoTm9kZSh0aGlzLCBmdW5jdGlvbihlLCB4KSB7XHJcbiAgICAgICAgICAgIHggPSB0eXBlb2YgdiA9PSAnZnVuY3Rpb24nID8gdi5jYWxsKGUpIDogdjtcclxuICAgICAgICAgICAga011bHRpID8gYXR0cihlLCBrLCB4KSA6IGUuc2V0QXR0cmlidXRlKGssICcnICsgeCk7IFxyXG4gICAgICAgIH0pIDogKHZvaWQgMCA9PT0gdiA/IHYgOiB0aGlzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgZGF0YS0gYXR0cnMgZm9yIGVhY2ggZWxlbWVudCBpbiBhIGNvbGxlY3Rpb24uXHJcbiAgICAgKiBAdGhpcyAge09iamVjdHxBcnJheX1cclxuICAgICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSAga2V5cyAgb25lIG9yIG1vcmUgU1NWIG9yIENTViBkYXRhIGF0dHIga2V5cyBvciBuYW1lc1xyXG4gICAgICovXHJcbiAgICBlZmZpbnNbJ2RlbGV0ZXMnXSA9IGZ1bmN0aW9uKGtleXMpIHtcclxuICAgICAgICBpZiAodm9pZCAwID09PSBrZXlzKVxyXG4gICAgICAgICAgICByZXR1cm4gZWFjaE5vZGUodGhpcywgcmVzZXREYXRhc2V0KTtcclxuICAgICAgICBrZXlzID0gdHlwZW9mIGtleXMgPT0gJ3N0cmluZycgPyBrZXlzLnNwbGl0KHNzdikgOiBbXS5jb25jYXQoa2V5cyk7XHJcbiAgICAgICAgcmV0dXJuIGVhY2hOb2RlKHRoaXMsIHJlbW92ZUF0dHIsIG1hcChrZXlzLCBkYXRhdGl6ZSkpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYXR0cmJ1dGVzIGZvciBlYWNoIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uLlxyXG4gICAgICogQHRoaXMgIHtPYmplY3R8QXJyYXl9XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gIGtleXMgIG9uZSBvciBtb3JlIFNTViBvciBDU1YgYXR0ciBuYW1lc1xyXG4gICAgICovXHJcbiAgICBlZmZpbnNbJ3JlbW92ZUF0dHInXSA9IGZ1bmN0aW9uKGtleXMpIHtcclxuICAgICAgICByZXR1cm4gZWFjaE5vZGUodGhpcywgcmVtb3ZlQXR0ciwga2V5cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB4cG9ydHM7XHJcbn0pKTsiLCIvKlxuXG5Db3B5cmlnaHQgKEMpIDIwMTEgYnkgWWVodWRhIEthdHpcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuXG4qL1xuXG4vLyBsaWIvaGFuZGxlYmFycy9icm93c2VyLXByZWZpeC5qc1xudmFyIEhhbmRsZWJhcnMgPSB7fTtcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFycztcblxuKGZ1bmN0aW9uKEhhbmRsZWJhcnMsIHVuZGVmaW5lZCkge1xuO1xuLy8gbGliL2hhbmRsZWJhcnMvYmFzZS5qc1xuXG5IYW5kbGViYXJzLlZFUlNJT04gPSBcIjEuMC4wXCI7XG5IYW5kbGViYXJzLkNPTVBJTEVSX1JFVklTSU9OID0gNDtcblxuSGFuZGxlYmFycy5SRVZJU0lPTl9DSEFOR0VTID0ge1xuICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgNDogJz49IDEuMC4wJ1xufTtcblxuSGFuZGxlYmFycy5oZWxwZXJzICA9IHt9O1xuSGFuZGxlYmFycy5wYXJ0aWFscyA9IHt9O1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLFxuICAgIGZ1bmN0aW9uVHlwZSA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyID0gZnVuY3Rpb24obmFtZSwgZm4sIGludmVyc2UpIHtcbiAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICBpZiAoaW52ZXJzZSB8fCBmbikgeyB0aHJvdyBuZXcgSGFuZGxlYmFycy5FeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgaGVscGVycycpOyB9XG4gICAgSGFuZGxlYmFycy5VdGlscy5leHRlbmQodGhpcy5oZWxwZXJzLCBuYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoaW52ZXJzZSkgeyBmbi5ub3QgPSBpbnZlcnNlOyB9XG4gICAgdGhpcy5oZWxwZXJzW25hbWVdID0gZm47XG4gIH1cbn07XG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJQYXJ0aWFsID0gZnVuY3Rpb24obmFtZSwgc3RyKSB7XG4gIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgSGFuZGxlYmFycy5VdGlscy5leHRlbmQodGhpcy5wYXJ0aWFscywgIG5hbWUpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucGFydGlhbHNbbmFtZV0gPSBzdHI7XG4gIH1cbn07XG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ2hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihhcmcpIHtcbiAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBoZWxwZXI6ICdcIiArIGFyZyArIFwiJ1wiKTtcbiAgfVxufSk7XG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ2Jsb2NrSGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgdmFyIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UgfHwgZnVuY3Rpb24oKSB7fSwgZm4gPSBvcHRpb25zLmZuO1xuXG4gIHZhciB0eXBlID0gdG9TdHJpbmcuY2FsbChjb250ZXh0KTtcblxuICBpZih0eXBlID09PSBmdW5jdGlvblR5cGUpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gIGlmKGNvbnRleHQgPT09IHRydWUpIHtcbiAgICByZXR1cm4gZm4odGhpcyk7XG4gIH0gZWxzZSBpZihjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgfSBlbHNlIGlmKHR5cGUgPT09IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgIGlmKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIEhhbmRsZWJhcnMuaGVscGVycy5lYWNoKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZuKGNvbnRleHQpO1xuICB9XG59KTtcblxuSGFuZGxlYmFycy5LID0gZnVuY3Rpb24oKSB7fTtcblxuSGFuZGxlYmFycy5jcmVhdGVGcmFtZSA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24ob2JqZWN0KSB7XG4gIEhhbmRsZWJhcnMuSy5wcm90b3R5cGUgPSBvYmplY3Q7XG4gIHZhciBvYmogPSBuZXcgSGFuZGxlYmFycy5LKCk7XG4gIEhhbmRsZWJhcnMuSy5wcm90b3R5cGUgPSBudWxsO1xuICByZXR1cm4gb2JqO1xufTtcblxuSGFuZGxlYmFycy5sb2dnZXIgPSB7XG4gIERFQlVHOiAwLCBJTkZPOiAxLCBXQVJOOiAyLCBFUlJPUjogMywgbGV2ZWw6IDMsXG5cbiAgbWV0aG9kTWFwOiB7MDogJ2RlYnVnJywgMTogJ2luZm8nLCAyOiAnd2FybicsIDM6ICdlcnJvcid9LFxuXG4gIC8vIGNhbiBiZSBvdmVycmlkZGVuIGluIHRoZSBob3N0IGVudmlyb25tZW50XG4gIGxvZzogZnVuY3Rpb24obGV2ZWwsIG9iaikge1xuICAgIGlmIChIYW5kbGViYXJzLmxvZ2dlci5sZXZlbCA8PSBsZXZlbCkge1xuICAgICAgdmFyIG1ldGhvZCA9IEhhbmRsZWJhcnMubG9nZ2VyLm1ldGhvZE1hcFtsZXZlbF07XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGVbbWV0aG9kXSkge1xuICAgICAgICBjb25zb2xlW21ldGhvZF0uY2FsbChjb25zb2xlLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuSGFuZGxlYmFycy5sb2cgPSBmdW5jdGlvbihsZXZlbCwgb2JqKSB7IEhhbmRsZWJhcnMubG9nZ2VyLmxvZyhsZXZlbCwgb2JqKTsgfTtcblxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgdmFyIGZuID0gb3B0aW9ucy5mbiwgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZTtcbiAgdmFyIGkgPSAwLCByZXQgPSBcIlwiLCBkYXRhO1xuXG4gIHZhciB0eXBlID0gdG9TdHJpbmcuY2FsbChjb250ZXh0KTtcbiAgaWYodHlwZSA9PT0gZnVuY3Rpb25UeXBlKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICBpZiAob3B0aW9ucy5kYXRhKSB7XG4gICAgZGF0YSA9IEhhbmRsZWJhcnMuY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgfVxuXG4gIGlmKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgaWYoY29udGV4dCBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgIGZvcih2YXIgaiA9IGNvbnRleHQubGVuZ3RoOyBpPGo7IGkrKykge1xuICAgICAgICBpZiAoZGF0YSkgeyBkYXRhLmluZGV4ID0gaTsgfVxuICAgICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2ldLCB7IGRhdGE6IGRhdGEgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcih2YXIga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgaWYoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoZGF0YSkgeyBkYXRhLmtleSA9IGtleTsgfVxuICAgICAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRba2V5XSwge2RhdGE6IGRhdGF9KTtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZihpID09PSAwKXtcbiAgICByZXQgPSBpbnZlcnNlKHRoaXMpO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn0pO1xuXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdpZicsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gIHZhciB0eXBlID0gdG9TdHJpbmcuY2FsbChjb25kaXRpb25hbCk7XG4gIGlmKHR5cGUgPT09IGZ1bmN0aW9uVHlwZSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICBpZighY29uZGl0aW9uYWwgfHwgSGFuZGxlYmFycy5VdGlscy5pc0VtcHR5KGNvbmRpdGlvbmFsKSkge1xuICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gIH1cbn0pO1xuXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCd1bmxlc3MnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICByZXR1cm4gSGFuZGxlYmFycy5oZWxwZXJzWydpZiddLmNhbGwodGhpcywgY29uZGl0aW9uYWwsIHtmbjogb3B0aW9ucy5pbnZlcnNlLCBpbnZlcnNlOiBvcHRpb25zLmZufSk7XG59KTtcblxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignd2l0aCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgdmFyIHR5cGUgPSB0b1N0cmluZy5jYWxsKGNvbnRleHQpO1xuICBpZih0eXBlID09PSBmdW5jdGlvblR5cGUpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gIGlmICghSGFuZGxlYmFycy5VdGlscy5pc0VtcHR5KGNvbnRleHQpKSByZXR1cm4gb3B0aW9ucy5mbihjb250ZXh0KTtcbn0pO1xuXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdsb2cnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gIHZhciBsZXZlbCA9IG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEubGV2ZWwgIT0gbnVsbCA/IHBhcnNlSW50KG9wdGlvbnMuZGF0YS5sZXZlbCwgMTApIDogMTtcbiAgSGFuZGxlYmFycy5sb2cobGV2ZWwsIGNvbnRleHQpO1xufSk7XG47XG4vLyBsaWIvaGFuZGxlYmFycy91dGlscy5qc1xuXG52YXIgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbkhhbmRsZWJhcnMuRXhjZXB0aW9uID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICB2YXIgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICB9XG59O1xuSGFuZGxlYmFycy5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbi8vIEJ1aWxkIG91dCBvdXIgYmFzaWMgU2FmZVN0cmluZyB0eXBlXG5IYW5kbGViYXJzLlNhZmVTdHJpbmcgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59O1xuSGFuZGxlYmFycy5TYWZlU3RyaW5nLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdHJpbmcudG9TdHJpbmcoKTtcbn07XG5cbnZhciBlc2NhcGUgPSB7XG4gIFwiJlwiOiBcIiZhbXA7XCIsXG4gIFwiPFwiOiBcIiZsdDtcIixcbiAgXCI+XCI6IFwiJmd0O1wiLFxuICAnXCInOiBcIiZxdW90O1wiLFxuICBcIidcIjogXCImI3gyNztcIixcbiAgXCJgXCI6IFwiJiN4NjA7XCJcbn07XG5cbnZhciBiYWRDaGFycyA9IC9bJjw+XCInYF0vZztcbnZhciBwb3NzaWJsZSA9IC9bJjw+XCInYF0vO1xuXG52YXIgZXNjYXBlQ2hhciA9IGZ1bmN0aW9uKGNocikge1xuICByZXR1cm4gZXNjYXBlW2Nocl0gfHwgXCImYW1wO1wiO1xufTtcblxuSGFuZGxlYmFycy5VdGlscyA9IHtcbiAgZXh0ZW5kOiBmdW5jdGlvbihvYmosIHZhbHVlKSB7XG4gICAgZm9yKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgIGlmKHZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBlc2NhcGVFeHByZXNzaW9uOiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAvLyBkb24ndCBlc2NhcGUgU2FmZVN0cmluZ3MsIHNpbmNlIHRoZXkncmUgYWxyZWFkeSBzYWZlXG4gICAgaWYgKHN0cmluZyBpbnN0YW5jZW9mIEhhbmRsZWJhcnMuU2FmZVN0cmluZykge1xuICAgICAgcmV0dXJuIHN0cmluZy50b1N0cmluZygpO1xuICAgIH0gZWxzZSBpZiAoc3RyaW5nID09IG51bGwgfHwgc3RyaW5nID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gc3RyaW5nLnRvU3RyaW5nKCk7XG5cbiAgICBpZighcG9zc2libGUudGVzdChzdHJpbmcpKSB7IHJldHVybiBzdHJpbmc7IH1cbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYmFkQ2hhcnMsIGVzY2FwZUNoYXIpO1xuICB9LFxuXG4gIGlzRW1wdHk6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmKHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSBcIltvYmplY3QgQXJyYXldXCIgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufTtcbjtcbi8vIGxpYi9oYW5kbGViYXJzL3J1bnRpbWUuanNcblxuSGFuZGxlYmFycy5WTSA9IHtcbiAgdGVtcGxhdGU6IGZ1bmN0aW9uKHRlbXBsYXRlU3BlYykge1xuICAgIC8vIEp1c3QgYWRkIHdhdGVyXG4gICAgdmFyIGNvbnRhaW5lciA9IHtcbiAgICAgIGVzY2FwZUV4cHJlc3Npb246IEhhbmRsZWJhcnMuVXRpbHMuZXNjYXBlRXhwcmVzc2lvbixcbiAgICAgIGludm9rZVBhcnRpYWw6IEhhbmRsZWJhcnMuVk0uaW52b2tlUGFydGlhbCxcbiAgICAgIHByb2dyYW1zOiBbXSxcbiAgICAgIHByb2dyYW06IGZ1bmN0aW9uKGksIGZuLCBkYXRhKSB7XG4gICAgICAgIHZhciBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV07XG4gICAgICAgIGlmKGRhdGEpIHtcbiAgICAgICAgICBwcm9ncmFtV3JhcHBlciA9IEhhbmRsZWJhcnMuVk0ucHJvZ3JhbShpLCBmbiwgZGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXByb2dyYW1XcmFwcGVyKSB7XG4gICAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gSGFuZGxlYmFycy5WTS5wcm9ncmFtKGksIGZuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgICB9LFxuICAgICAgbWVyZ2U6IGZ1bmN0aW9uKHBhcmFtLCBjb21tb24pIHtcbiAgICAgICAgdmFyIHJldCA9IHBhcmFtIHx8IGNvbW1vbjtcblxuICAgICAgICBpZiAocGFyYW0gJiYgY29tbW9uKSB7XG4gICAgICAgICAgcmV0ID0ge307XG4gICAgICAgICAgSGFuZGxlYmFycy5VdGlscy5leHRlbmQocmV0LCBjb21tb24pO1xuICAgICAgICAgIEhhbmRsZWJhcnMuVXRpbHMuZXh0ZW5kKHJldCwgcGFyYW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9LFxuICAgICAgcHJvZ3JhbVdpdGhEZXB0aDogSGFuZGxlYmFycy5WTS5wcm9ncmFtV2l0aERlcHRoLFxuICAgICAgbm9vcDogSGFuZGxlYmFycy5WTS5ub29wLFxuICAgICAgY29tcGlsZXJJbmZvOiBudWxsXG4gICAgfTtcblxuICAgIHJldHVybiBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgIHZhciByZXN1bHQgPSB0ZW1wbGF0ZVNwZWMuY2FsbChjb250YWluZXIsIEhhbmRsZWJhcnMsIGNvbnRleHQsIG9wdGlvbnMuaGVscGVycywgb3B0aW9ucy5wYXJ0aWFscywgb3B0aW9ucy5kYXRhKTtcblxuICAgICAgdmFyIGNvbXBpbGVySW5mbyA9IGNvbnRhaW5lci5jb21waWxlckluZm8gfHwgW10sXG4gICAgICAgICAgY29tcGlsZXJSZXZpc2lvbiA9IGNvbXBpbGVySW5mb1swXSB8fCAxLFxuICAgICAgICAgIGN1cnJlbnRSZXZpc2lvbiA9IEhhbmRsZWJhcnMuQ09NUElMRVJfUkVWSVNJT047XG5cbiAgICAgIGlmIChjb21waWxlclJldmlzaW9uICE9PSBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgICAgICB2YXIgcnVudGltZVZlcnNpb25zID0gSGFuZGxlYmFycy5SRVZJU0lPTl9DSEFOR0VTW2N1cnJlbnRSZXZpc2lvbl0sXG4gICAgICAgICAgICAgIGNvbXBpbGVyVmVyc2lvbnMgPSBIYW5kbGViYXJzLlJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICAgICAgdGhyb3cgXCJUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhbiBvbGRlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiBcIitcbiAgICAgICAgICAgICAgICBcIlBsZWFzZSB1cGRhdGUgeW91ciBwcmVjb21waWxlciB0byBhIG5ld2VyIHZlcnNpb24gKFwiK3J1bnRpbWVWZXJzaW9ucytcIikgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uIChcIitjb21waWxlclZlcnNpb25zK1wiKS5cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgICAgICB0aHJvdyBcIlRlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gXCIrXG4gICAgICAgICAgICAgICAgXCJQbGVhc2UgdXBkYXRlIHlvdXIgcnVudGltZSB0byBhIG5ld2VyIHZlcnNpb24gKFwiK2NvbXBpbGVySW5mb1sxXStcIikuXCI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9LFxuXG4gIHByb2dyYW1XaXRoRGVwdGg6IGZ1bmN0aW9uKGksIGZuLCBkYXRhIC8qLCAkZGVwdGggKi8pIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyk7XG5cbiAgICB2YXIgcHJvZ3JhbSA9IGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgW2NvbnRleHQsIG9wdGlvbnMuZGF0YSB8fCBkYXRhXS5jb25jYXQoYXJncykpO1xuICAgIH07XG4gICAgcHJvZ3JhbS5wcm9ncmFtID0gaTtcbiAgICBwcm9ncmFtLmRlcHRoID0gYXJncy5sZW5ndGg7XG4gICAgcmV0dXJuIHByb2dyYW07XG4gIH0sXG4gIHByb2dyYW06IGZ1bmN0aW9uKGksIGZuLCBkYXRhKSB7XG4gICAgdmFyIHByb2dyYW0gPSBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMuZGF0YSB8fCBkYXRhKTtcbiAgICB9O1xuICAgIHByb2dyYW0ucHJvZ3JhbSA9IGk7XG4gICAgcHJvZ3JhbS5kZXB0aCA9IDA7XG4gICAgcmV0dXJuIHByb2dyYW07XG4gIH0sXG4gIG5vb3A6IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCJcIjsgfSxcbiAgaW52b2tlUGFydGlhbDogZnVuY3Rpb24ocGFydGlhbCwgbmFtZSwgY29udGV4dCwgaGVscGVycywgcGFydGlhbHMsIGRhdGEpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHsgaGVscGVyczogaGVscGVycywgcGFydGlhbHM6IHBhcnRpYWxzLCBkYXRhOiBkYXRhIH07XG5cbiAgICBpZihwYXJ0aWFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBIYW5kbGViYXJzLkV4Y2VwdGlvbihcIlRoZSBwYXJ0aWFsIFwiICsgbmFtZSArIFwiIGNvdWxkIG5vdCBiZSBmb3VuZFwiKTtcbiAgICB9IGVsc2UgaWYocGFydGlhbCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gcGFydGlhbChjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKCFIYW5kbGViYXJzLmNvbXBpbGUpIHtcbiAgICAgIHRocm93IG5ldyBIYW5kbGViYXJzLkV4Y2VwdGlvbihcIlRoZSBwYXJ0aWFsIFwiICsgbmFtZSArIFwiIGNvdWxkIG5vdCBiZSBjb21waWxlZCB3aGVuIHJ1bm5pbmcgaW4gcnVudGltZS1vbmx5IG1vZGVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpYWxzW25hbWVdID0gSGFuZGxlYmFycy5jb21waWxlKHBhcnRpYWwsIHtkYXRhOiBkYXRhICE9PSB1bmRlZmluZWR9KTtcbiAgICAgIHJldHVybiBwYXJ0aWFsc1tuYW1lXShjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gIH1cbn07XG5cbkhhbmRsZWJhcnMudGVtcGxhdGUgPSBIYW5kbGViYXJzLlZNLnRlbXBsYXRlO1xuO1xuLy8gbGliL2hhbmRsZWJhcnMvYnJvd3Nlci1zdWZmaXguanNcbn0pKEhhbmRsZWJhcnMpO1xuO1xuIiwiLy8gTG9jYXRpb25CYXIgbW9kdWxlIGV4dHJhY3RlZCBmcm9tIEJhY2tib25lLmpzIDEuMC4wXG4vLyAoYWN0dWFsbHkgaXQncyBjb21taXQgZjZmYTBjYjg3ZTI2YmIzZDFiN2Y0NzE0NGZkNzIwZDFhYjQ4ZTg4Zilcbi8vXG4vLyB0aGUgZGVwZW5kZW5jeSBvbiBiYWNrYm9uZSwgdW5kZXJzY29yZSBhbmQganF1ZXJ5IGhhdmUgYmVlbiByZW1vdmVkIHRvIHR1cm5cbi8vIHRoaXMgaW50byBhIHNtYWxsIHN0YW5kYWxvbmUgbGlicmFyeSBmb3IgaGFuZGxpbmcgYnJvd3NlcidzIGhpc3RvcnkgQVBJXG4vLyBjcm9zcyBicm93c2VyIGFuZCB3aXRoIGEgZmFsbGJhY2sgdG8gaGFzaGNoYW5nZSBldmVudHMgb3IgcG9sbGluZy5cblxuKGZ1bmN0aW9uKGRlZmluZSkge1xuZGVmaW5lKGZ1bmN0aW9uKCkge1xuXG4gIC8vIDMgaGVscGVyIGZ1bmN0aW9ucyB3ZSB1c2UgdG8gYXZvaWQgcHVsbGluZyBpbiBlbnRpcmUgXyBhbmQgJFxuICBmdW5jdGlvbiBleHRlbmQob2JqLCBzb3VyY2UpIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIHNvdXJjZSkge1xuICAgICAgb2JqW3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIGZ1bmN0aW9uIG9uKG9iaiwgdHlwZSwgZm4pIHtcbiAgICBpZiAob2JqLmF0dGFjaEV2ZW50KSB7XG4gICAgICBvYmpbJ2UnK3R5cGUrZm5dID0gZm47XG4gICAgICBvYmpbdHlwZStmbl0gPSBmdW5jdGlvbigpeyBvYmpbJ2UnK3R5cGUrZm5dKCB3aW5kb3cuZXZlbnQgKTsgfTtcbiAgICAgIG9iai5hdHRhY2hFdmVudCggJ29uJyt0eXBlLCBvYmpbdHlwZStmbl0gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqLmFkZEV2ZW50TGlzdGVuZXIoIHR5cGUsIGZuLCBmYWxzZSApO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBvZmYob2JqLCB0eXBlLCBmbikge1xuICAgIGlmIChvYmouZGV0YWNoRXZlbnQpIHtcbiAgICAgIG9iai5kZXRhY2hFdmVudCgnb24nK3R5cGUsIG9ialt0eXBlK2ZuXSk7XG4gICAgICBvYmpbdHlwZStmbl0gPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG5cblxuXG5cbiAgLy8gdGhpcyBpcyBtb3N0bHkgb3JpZ2luYWwgY29kZSB3aXRoIG1pbm9yIG1vZGlmaWNhdGlvbnMsIG1vc3R5bGUgdG8gYXZvaWRcbiAgLy8gZGVwZW5kZW5jeSBvbiAzcmQgcGFydHkgbGlicmFyaWVzICsgcmVuYW1pbmcgQmFja2JvbmUuSGlzdG9yeSAtPiBMb2NhdGlvbkJhclxuICAvL1xuICAvLyBCYWNrYm9uZS5IaXN0b3J5XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBIYW5kbGVzIGNyb3NzLWJyb3dzZXIgaGlzdG9yeSBtYW5hZ2VtZW50LCBiYXNlZCBvbiBlaXRoZXJcbiAgLy8gW3B1c2hTdGF0ZV0oaHR0cDovL2RpdmVpbnRvaHRtbDUuaW5mby9oaXN0b3J5Lmh0bWwpIGFuZCByZWFsIFVSTHMsIG9yXG4gIC8vIFtvbmhhc2hjaGFuZ2VdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvRE9NL3dpbmRvdy5vbmhhc2hjaGFuZ2UpXG4gIC8vIGFuZCBVUkwgZnJhZ21lbnRzLiBJZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBuZWl0aGVyIChvbGQgSUUsIG5hdGNoKSxcbiAgLy8gZmFsbHMgYmFjayB0byBwb2xsaW5nLlxuICB2YXIgTG9jYXRpb25CYXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG5cbiAgICAvLyBNT0RJRklDQVRJT04gT0YgT1JJR0lOQUwgQkFDS0JPTkUuSElTVE9SWVxuICAgIC8vXG4gICAgLy8gXy5iaW5kQWxsKHRoaXMsICdjaGVja1VybCcpO1xuICAgIC8vXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjaGVja1VybCA9IHRoaXMuY2hlY2tVcmw7XG4gICAgdGhpcy5jaGVja1VybCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrVXJsLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIC8vIEVuc3VyZSB0aGF0IGBMb2NhdGlvbkJhcmAgY2FuIGJlIHVzZWQgb3V0c2lkZSBvZiB0aGUgYnJvd3Nlci5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XG4gICAgICB0aGlzLmhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQ2FjaGVkIHJlZ2V4IGZvciBzdHJpcHBpbmcgYSBsZWFkaW5nIGhhc2gvc2xhc2ggYW5kIHRyYWlsaW5nIHNwYWNlLlxuICB2YXIgcm91dGVTdHJpcHBlciA9IC9eWyNcXC9dfFxccyskL2c7XG5cbiAgLy8gQ2FjaGVkIHJlZ2V4IGZvciBzdHJpcHBpbmcgbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcy5cbiAgdmFyIHJvb3RTdHJpcHBlciA9IC9eXFwvK3xcXC8rJC9nO1xuXG4gIC8vIENhY2hlZCByZWdleCBmb3IgZGV0ZWN0aW5nIE1TSUUuXG4gIHZhciBpc0V4cGxvcmVyID0gL21zaWUgW1xcdy5dKy87XG5cbiAgLy8gQ2FjaGVkIHJlZ2V4IGZvciByZW1vdmluZyBhIHRyYWlsaW5nIHNsYXNoLlxuICB2YXIgdHJhaWxpbmdTbGFzaCA9IC9cXC8kLztcblxuICAvLyBDYWNoZWQgcmVnZXggZm9yIHN0cmlwcGluZyB1cmxzIG9mIGhhc2ggYW5kIHF1ZXJ5LlxuICB2YXIgcGF0aFN0cmlwcGVyID0gL1s/I10uKiQvO1xuXG4gIC8vIEhhcyB0aGUgaGlzdG9yeSBoYW5kbGluZyBhbHJlYWR5IGJlZW4gc3RhcnRlZD9cbiAgTG9jYXRpb25CYXIuc3RhcnRlZCA9IGZhbHNlO1xuXG4gIC8vIFNldCB1cCBhbGwgaW5oZXJpdGFibGUgKipMb2NhdGlvbkJhcioqIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuXG4gIGV4dGVuZChMb2NhdGlvbkJhci5wcm90b3R5cGUsIHtcblxuICAgIC8vIFRoZSBkZWZhdWx0IGludGVydmFsIHRvIHBvbGwgZm9yIGhhc2ggY2hhbmdlcywgaWYgbmVjZXNzYXJ5LCBpc1xuICAgIC8vIHR3ZW50eSB0aW1lcyBhIHNlY29uZC5cbiAgICBpbnRlcnZhbDogNTAsXG5cbiAgICAvLyBHZXRzIHRoZSB0cnVlIGhhc2ggdmFsdWUuIENhbm5vdCB1c2UgbG9jYXRpb24uaGFzaCBkaXJlY3RseSBkdWUgdG8gYnVnXG4gICAgLy8gaW4gRmlyZWZveCB3aGVyZSBsb2NhdGlvbi5oYXNoIHdpbGwgYWx3YXlzIGJlIGRlY29kZWQuXG4gICAgZ2V0SGFzaDogZnVuY3Rpb24od2luZG93KSB7XG4gICAgICB2YXIgbWF0Y2ggPSAod2luZG93IHx8IHRoaXMpLmxvY2F0aW9uLmhyZWYubWF0Y2goLyMoLiopJC8pO1xuICAgICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiAnJztcbiAgICB9LFxuXG4gICAgLy8gR2V0IHRoZSBjcm9zcy1icm93c2VyIG5vcm1hbGl6ZWQgVVJMIGZyYWdtZW50LCBlaXRoZXIgZnJvbSB0aGUgVVJMLFxuICAgIC8vIHRoZSBoYXNoLCBvciB0aGUgb3ZlcnJpZGUuXG4gICAgZ2V0RnJhZ21lbnQ6IGZ1bmN0aW9uKGZyYWdtZW50LCBmb3JjZVB1c2hTdGF0ZSkge1xuICAgICAgaWYgKGZyYWdtZW50ID09IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hhc1B1c2hTdGF0ZSB8fCAhdGhpcy5fd2FudHNIYXNoQ2hhbmdlIHx8IGZvcmNlUHVzaFN0YXRlKSB7XG4gICAgICAgICAgZnJhZ21lbnQgPSB0aGlzLmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICAgIHZhciByb290ID0gdGhpcy5yb290LnJlcGxhY2UodHJhaWxpbmdTbGFzaCwgJycpO1xuICAgICAgICAgIGlmICghZnJhZ21lbnQuaW5kZXhPZihyb290KSkgZnJhZ21lbnQgPSBmcmFnbWVudC5zbGljZShyb290Lmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZnJhZ21lbnQgPSB0aGlzLmdldEhhc2goKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyYWdtZW50LnJlcGxhY2Uocm91dGVTdHJpcHBlciwgJycpO1xuICAgIH0sXG5cbiAgICAvLyBTdGFydCB0aGUgaGFzaCBjaGFuZ2UgaGFuZGxpbmcsIHJldHVybmluZyBgdHJ1ZWAgaWYgdGhlIGN1cnJlbnQgVVJMIG1hdGNoZXNcbiAgICAvLyBhbiBleGlzdGluZyByb3V0ZSwgYW5kIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgIHN0YXJ0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBpZiAoTG9jYXRpb25CYXIuc3RhcnRlZCkgdGhyb3cgbmV3IEVycm9yKFwiTG9jYXRpb25CYXIgaGFzIGFscmVhZHkgYmVlbiBzdGFydGVkXCIpO1xuICAgICAgTG9jYXRpb25CYXIuc3RhcnRlZCA9IHRydWU7XG5cbiAgICAgIC8vIEZpZ3VyZSBvdXQgdGhlIGluaXRpYWwgY29uZmlndXJhdGlvbi4gRG8gd2UgbmVlZCBhbiBpZnJhbWU/XG4gICAgICAvLyBJcyBwdXNoU3RhdGUgZGVzaXJlZCAuLi4gaXMgaXQgYXZhaWxhYmxlP1xuICAgICAgdGhpcy5vcHRpb25zICAgICAgICAgID0gZXh0ZW5kKHtyb290OiAnLyd9LCBvcHRpb25zKTtcbiAgICAgIHRoaXMucm9vdCAgICAgICAgICAgICA9IHRoaXMub3B0aW9ucy5yb290O1xuICAgICAgdGhpcy5fd2FudHNIYXNoQ2hhbmdlID0gdGhpcy5vcHRpb25zLmhhc2hDaGFuZ2UgIT09IGZhbHNlO1xuICAgICAgdGhpcy5fd2FudHNQdXNoU3RhdGUgID0gISF0aGlzLm9wdGlvbnMucHVzaFN0YXRlO1xuICAgICAgdGhpcy5faGFzUHVzaFN0YXRlICAgID0gISEodGhpcy5vcHRpb25zLnB1c2hTdGF0ZSAmJiB0aGlzLmhpc3RvcnkgJiYgdGhpcy5oaXN0b3J5LnB1c2hTdGF0ZSk7XG4gICAgICB2YXIgZnJhZ21lbnQgICAgICAgICAgPSB0aGlzLmdldEZyYWdtZW50KCk7XG4gICAgICB2YXIgZG9jTW9kZSAgICAgICAgICAgPSBkb2N1bWVudC5kb2N1bWVudE1vZGU7XG4gICAgICB2YXIgb2xkSUUgICAgICAgICAgICAgPSAoaXNFeHBsb3Jlci5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSkgJiYgKCFkb2NNb2RlIHx8IGRvY01vZGUgPD0gNykpO1xuXG4gICAgICAvLyBOb3JtYWxpemUgcm9vdCB0byBhbHdheXMgaW5jbHVkZSBhIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoLlxuICAgICAgdGhpcy5yb290ID0gKCcvJyArIHRoaXMucm9vdCArICcvJykucmVwbGFjZShyb290U3RyaXBwZXIsICcvJyk7XG5cbiAgICAgIGlmIChvbGRJRSAmJiB0aGlzLl93YW50c0hhc2hDaGFuZ2UpIHtcbiAgICAgICAgLy8gTU9ESUZJQ0FUSU9OIE9GIE9SSUdJTkFMIEJBQ0tCT05FLkhJU1RPUllcbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhpcy5pZnJhbWUgPSAkKCc8aWZyYW1lIHNyYz1cImphdmFzY3JpcHQ6MFwiIHRhYmluZGV4PVwiLTFcIiAvPicpLmhpZGUoKS5hcHBlbmRUbygnYm9keScpWzBdLmNvbnRlbnRXaW5kb3c7XG4gICAgICAgIC8vXG4gICAgICAgIHRoaXMuaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcbiAgICAgICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiamF2YXNjcmlwdDowXCIpO1xuICAgICAgICB0aGlzLmlmcmFtZS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCAtMSk7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmlmcmFtZSk7XG4gICAgICAgIHRoaXMuaWZyYW1lID0gdGhpcy5pZnJhbWUuY29udGVudFdpbmRvdztcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZShmcmFnbWVudCk7XG4gICAgICB9XG5cbiAgICAgIC8vIERlcGVuZGluZyBvbiB3aGV0aGVyIHdlJ3JlIHVzaW5nIHB1c2hTdGF0ZSBvciBoYXNoZXMsIGFuZCB3aGV0aGVyXG4gICAgICAvLyAnb25oYXNoY2hhbmdlJyBpcyBzdXBwb3J0ZWQsIGRldGVybWluZSBob3cgd2UgY2hlY2sgdGhlIFVSTCBzdGF0ZS5cbiAgICAgIGlmICh0aGlzLl9oYXNQdXNoU3RhdGUpIHtcbiAgICAgICAgb24od2luZG93LCAncG9wc3RhdGUnLCB0aGlzLmNoZWNrVXJsKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fd2FudHNIYXNoQ2hhbmdlICYmICgnb25oYXNoY2hhbmdlJyBpbiB3aW5kb3cpICYmICFvbGRJRSkge1xuICAgICAgICBvbih3aW5kb3csICdoYXNoY2hhbmdlJywgdGhpcy5jaGVja1VybCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3dhbnRzSGFzaENoYW5nZSkge1xuICAgICAgICB0aGlzLl9jaGVja1VybEludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy5jaGVja1VybCwgdGhpcy5pbnRlcnZhbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIERldGVybWluZSBpZiB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgYmFzZSB1cmwsIGZvciBhIHB1c2hTdGF0ZSBsaW5rXG4gICAgICAvLyBvcGVuZWQgYnkgYSBub24tcHVzaFN0YXRlIGJyb3dzZXIuXG4gICAgICB0aGlzLmZyYWdtZW50ID0gZnJhZ21lbnQ7XG4gICAgICB2YXIgbG9jID0gdGhpcy5sb2NhdGlvbjtcbiAgICAgIHZhciBhdFJvb3QgPSBsb2MucGF0aG5hbWUucmVwbGFjZSgvW15cXC9dJC8sICckJi8nKSA9PT0gdGhpcy5yb290O1xuXG4gICAgICAvLyBUcmFuc2l0aW9uIGZyb20gaGFzaENoYW5nZSB0byBwdXNoU3RhdGUgb3IgdmljZSB2ZXJzYSBpZiBib3RoIGFyZVxuICAgICAgLy8gcmVxdWVzdGVkLlxuICAgICAgaWYgKHRoaXMuX3dhbnRzSGFzaENoYW5nZSAmJiB0aGlzLl93YW50c1B1c2hTdGF0ZSkge1xuXG4gICAgICAgIC8vIElmIHdlJ3ZlIHN0YXJ0ZWQgb2ZmIHdpdGggYSByb3V0ZSBmcm9tIGEgYHB1c2hTdGF0ZWAtZW5hYmxlZFxuICAgICAgICAvLyBicm93c2VyLCBidXQgd2UncmUgY3VycmVudGx5IGluIGEgYnJvd3NlciB0aGF0IGRvZXNuJ3Qgc3VwcG9ydCBpdC4uLlxuICAgICAgICBpZiAoIXRoaXMuX2hhc1B1c2hTdGF0ZSAmJiAhYXRSb290KSB7XG4gICAgICAgICAgdGhpcy5mcmFnbWVudCA9IHRoaXMuZ2V0RnJhZ21lbnQobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgdGhpcy5sb2NhdGlvbi5yZXBsYWNlKHRoaXMucm9vdCArIHRoaXMubG9jYXRpb24uc2VhcmNoICsgJyMnICsgdGhpcy5mcmFnbWVudCk7XG4gICAgICAgICAgLy8gUmV0dXJuIGltbWVkaWF0ZWx5IGFzIGJyb3dzZXIgd2lsbCBkbyByZWRpcmVjdCB0byBuZXcgdXJsXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgLy8gT3IgaWYgd2UndmUgc3RhcnRlZCBvdXQgd2l0aCBhIGhhc2gtYmFzZWQgcm91dGUsIGJ1dCB3ZSdyZSBjdXJyZW50bHlcbiAgICAgICAgLy8gaW4gYSBicm93c2VyIHdoZXJlIGl0IGNvdWxkIGJlIGBwdXNoU3RhdGVgLWJhc2VkIGluc3RlYWQuLi5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9oYXNQdXNoU3RhdGUgJiYgYXRSb290ICYmIGxvYy5oYXNoKSB7XG4gICAgICAgICAgdGhpcy5mcmFnbWVudCA9IHRoaXMuZ2V0SGFzaCgpLnJlcGxhY2Uocm91dGVTdHJpcHBlciwgJycpO1xuICAgICAgICAgIHRoaXMuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCB0aGlzLnJvb3QgKyB0aGlzLmZyYWdtZW50ICsgbG9jLnNlYXJjaCk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5zaWxlbnQpIHJldHVybiB0aGlzLmxvYWRVcmwoKTtcbiAgICB9LFxuXG4gICAgLy8gRGlzYWJsZSBCYWNrYm9uZS5oaXN0b3J5LCBwZXJoYXBzIHRlbXBvcmFyaWx5LiBOb3QgdXNlZnVsIGluIGEgcmVhbCBhcHAsXG4gICAgLy8gYnV0IHBvc3NpYmx5IHVzZWZ1bCBmb3IgdW5pdCB0ZXN0aW5nIFJvdXRlcnMuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICBvZmYod2luZG93LCAncG9wc3RhdGUnLCB0aGlzLmNoZWNrVXJsKTtcbiAgICAgIG9mZih3aW5kb3csICdoYXNoY2hhbmdlJywgdGhpcy5jaGVja1VybCk7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuX2NoZWNrVXJsSW50ZXJ2YWwpO1xuICAgICAgTG9jYXRpb25CYXIuc3RhcnRlZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICAvLyBBZGQgYSByb3V0ZSB0byBiZSB0ZXN0ZWQgd2hlbiB0aGUgZnJhZ21lbnQgY2hhbmdlcy4gUm91dGVzIGFkZGVkIGxhdGVyXG4gICAgLy8gbWF5IG92ZXJyaWRlIHByZXZpb3VzIHJvdXRlcy5cbiAgICByb3V0ZTogZnVuY3Rpb24ocm91dGUsIGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzLnVuc2hpZnQoe3JvdXRlOiByb3V0ZSwgY2FsbGJhY2s6IGNhbGxiYWNrfSk7XG4gICAgfSxcblxuICAgIC8vIENoZWNrcyB0aGUgY3VycmVudCBVUkwgdG8gc2VlIGlmIGl0IGhhcyBjaGFuZ2VkLCBhbmQgaWYgaXQgaGFzLFxuICAgIC8vIGNhbGxzIGBsb2FkVXJsYCwgbm9ybWFsaXppbmcgYWNyb3NzIHRoZSBoaWRkZW4gaWZyYW1lLlxuICAgIGNoZWNrVXJsOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5nZXRGcmFnbWVudCgpO1xuICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMuZnJhZ21lbnQgJiYgdGhpcy5pZnJhbWUpIHtcbiAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0RnJhZ21lbnQodGhpcy5nZXRIYXNoKHRoaXMuaWZyYW1lKSk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA9PT0gdGhpcy5mcmFnbWVudCkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKHRoaXMuaWZyYW1lKSB0aGlzLm5hdmlnYXRlKGN1cnJlbnQpO1xuICAgICAgdGhpcy5sb2FkVXJsKCk7XG4gICAgfSxcblxuICAgIC8vIEF0dGVtcHQgdG8gbG9hZCB0aGUgY3VycmVudCBVUkwgZnJhZ21lbnQuIElmIGEgcm91dGUgc3VjY2VlZHMgd2l0aCBhXG4gICAgLy8gbWF0Y2gsIHJldHVybnMgYHRydWVgLiBJZiBubyBkZWZpbmVkIHJvdXRlcyBtYXRjaGVzIHRoZSBmcmFnbWVudCxcbiAgICAvLyByZXR1cm5zIGBmYWxzZWAuXG4gICAgbG9hZFVybDogZnVuY3Rpb24oZnJhZ21lbnQpIHtcbiAgICAgIC8vIE1PRElGSUNBVElPTiBPRiBPUklHSU5BTCBCQUNLQk9ORS5ISVNUT1JZXG4gICAgICAvL1xuICAgICAgLy8gcmV0dXJuIF8uYW55KHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIC8vICAgaWYgKGhhbmRsZXIucm91dGUudGVzdChmcmFnbWVudCkpIHtcbiAgICAgIC8vICAgICBoYW5kbGVyLmNhbGxiYWNrKGZyYWdtZW50KTtcbiAgICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSk7XG4gICAgICAvL1xuICAgICAgZnJhZ21lbnQgPSB0aGlzLmZyYWdtZW50ID0gdGhpcy5nZXRGcmFnbWVudChmcmFnbWVudCk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuaGFuZGxlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5oYW5kbGVyc1tpXTtcbiAgICAgICAgaWYgKGhhbmRsZXIucm91dGUudGVzdChmcmFnbWVudCkpIHtcbiAgICAgICAgICBoYW5kbGVyLmNhbGxiYWNrKGZyYWdtZW50KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvLyBTYXZlIGEgZnJhZ21lbnQgaW50byB0aGUgaGFzaCBoaXN0b3J5LCBvciByZXBsYWNlIHRoZSBVUkwgc3RhdGUgaWYgdGhlXG4gICAgLy8gJ3JlcGxhY2UnIG9wdGlvbiBpcyBwYXNzZWQuIFlvdSBhcmUgcmVzcG9uc2libGUgZm9yIHByb3Blcmx5IFVSTC1lbmNvZGluZ1xuICAgIC8vIHRoZSBmcmFnbWVudCBpbiBhZHZhbmNlLlxuICAgIC8vXG4gICAgLy8gVGhlIG9wdGlvbnMgb2JqZWN0IGNhbiBjb250YWluIGB0cmlnZ2VyOiB0cnVlYCBpZiB5b3Ugd2lzaCB0byBoYXZlIHRoZVxuICAgIC8vIHJvdXRlIGNhbGxiYWNrIGJlIGZpcmVkIChub3QgdXN1YWxseSBkZXNpcmFibGUpLCBvciBgcmVwbGFjZTogdHJ1ZWAsIGlmXG4gICAgLy8geW91IHdpc2ggdG8gbW9kaWZ5IHRoZSBjdXJyZW50IFVSTCB3aXRob3V0IGFkZGluZyBhbiBlbnRyeSB0byB0aGUgaGlzdG9yeS5cbiAgICBuYXZpZ2F0ZTogZnVuY3Rpb24oZnJhZ21lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICghTG9jYXRpb25CYXIuc3RhcnRlZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCFvcHRpb25zIHx8IG9wdGlvbnMgPT09IHRydWUpIG9wdGlvbnMgPSB7dHJpZ2dlcjogISFvcHRpb25zfTtcblxuICAgICAgdmFyIHVybCA9IHRoaXMucm9vdCArIChmcmFnbWVudCA9IHRoaXMuZ2V0RnJhZ21lbnQoZnJhZ21lbnQgfHwgJycpKTtcblxuICAgICAgLy8gU3RyaXAgdGhlIGZyYWdtZW50IG9mIHRoZSBxdWVyeSBhbmQgaGFzaCBmb3IgbWF0Y2hpbmcuXG4gICAgICBmcmFnbWVudCA9IGZyYWdtZW50LnJlcGxhY2UocGF0aFN0cmlwcGVyLCAnJyk7XG5cbiAgICAgIGlmICh0aGlzLmZyYWdtZW50ID09PSBmcmFnbWVudCkgcmV0dXJuO1xuICAgICAgdGhpcy5mcmFnbWVudCA9IGZyYWdtZW50O1xuXG4gICAgICAvLyBEb24ndCBpbmNsdWRlIGEgdHJhaWxpbmcgc2xhc2ggb24gdGhlIHJvb3QuXG4gICAgICBpZiAoZnJhZ21lbnQgPT09ICcnICYmIHVybCAhPT0gJy8nKSB1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xuXG4gICAgICAvLyBJZiBwdXNoU3RhdGUgaXMgYXZhaWxhYmxlLCB3ZSB1c2UgaXQgdG8gc2V0IHRoZSBmcmFnbWVudCBhcyBhIHJlYWwgVVJMLlxuICAgICAgaWYgKHRoaXMuX2hhc1B1c2hTdGF0ZSkge1xuICAgICAgICB0aGlzLmhpc3Rvcnlbb3B0aW9ucy5yZXBsYWNlID8gJ3JlcGxhY2VTdGF0ZScgOiAncHVzaFN0YXRlJ10oe30sIGRvY3VtZW50LnRpdGxlLCB1cmwpO1xuXG4gICAgICAvLyBJZiBoYXNoIGNoYW5nZXMgaGF2ZW4ndCBiZWVuIGV4cGxpY2l0bHkgZGlzYWJsZWQsIHVwZGF0ZSB0aGUgaGFzaFxuICAgICAgLy8gZnJhZ21lbnQgdG8gc3RvcmUgaGlzdG9yeS5cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fd2FudHNIYXNoQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUhhc2godGhpcy5sb2NhdGlvbiwgZnJhZ21lbnQsIG9wdGlvbnMucmVwbGFjZSk7XG4gICAgICAgIGlmICh0aGlzLmlmcmFtZSAmJiAoZnJhZ21lbnQgIT09IHRoaXMuZ2V0RnJhZ21lbnQodGhpcy5nZXRIYXNoKHRoaXMuaWZyYW1lKSkpKSB7XG4gICAgICAgICAgLy8gT3BlbmluZyBhbmQgY2xvc2luZyB0aGUgaWZyYW1lIHRyaWNrcyBJRTcgYW5kIGVhcmxpZXIgdG8gcHVzaCBhXG4gICAgICAgICAgLy8gaGlzdG9yeSBlbnRyeSBvbiBoYXNoLXRhZyBjaGFuZ2UuICBXaGVuIHJlcGxhY2UgaXMgdHJ1ZSwgd2UgZG9uJ3RcbiAgICAgICAgICAvLyB3YW50IHRoaXMuXG4gICAgICAgICAgaWYoIW9wdGlvbnMucmVwbGFjZSkgdGhpcy5pZnJhbWUuZG9jdW1lbnQub3BlbigpLmNsb3NlKCk7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlSGFzaCh0aGlzLmlmcmFtZS5sb2NhdGlvbiwgZnJhZ21lbnQsIG9wdGlvbnMucmVwbGFjZSk7XG4gICAgICAgIH1cblxuICAgICAgLy8gSWYgeW91J3ZlIHRvbGQgdXMgdGhhdCB5b3UgZXhwbGljaXRseSBkb24ndCB3YW50IGZhbGxiYWNrIGhhc2hjaGFuZ2UtXG4gICAgICAvLyBiYXNlZCBoaXN0b3J5LCB0aGVuIGBuYXZpZ2F0ZWAgYmVjb21lcyBhIHBhZ2UgcmVmcmVzaC5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2F0aW9uLmFzc2lnbih1cmwpO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMudHJpZ2dlcikgcmV0dXJuIHRoaXMubG9hZFVybChmcmFnbWVudCk7XG4gICAgfSxcblxuICAgIC8vIFVwZGF0ZSB0aGUgaGFzaCBsb2NhdGlvbiwgZWl0aGVyIHJlcGxhY2luZyB0aGUgY3VycmVudCBlbnRyeSwgb3IgYWRkaW5nXG4gICAgLy8gYSBuZXcgb25lIHRvIHRoZSBicm93c2VyIGhpc3RvcnkuXG4gICAgX3VwZGF0ZUhhc2g6IGZ1bmN0aW9uKGxvY2F0aW9uLCBmcmFnbWVudCwgcmVwbGFjZSkge1xuICAgICAgaWYgKHJlcGxhY2UpIHtcbiAgICAgICAgdmFyIGhyZWYgPSBsb2NhdGlvbi5ocmVmLnJlcGxhY2UoLyhqYXZhc2NyaXB0OnwjKS4qJC8sICcnKTtcbiAgICAgICAgbG9jYXRpb24ucmVwbGFjZShocmVmICsgJyMnICsgZnJhZ21lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU29tZSBicm93c2VycyByZXF1aXJlIHRoYXQgYGhhc2hgIGNvbnRhaW5zIGEgbGVhZGluZyAjLlxuICAgICAgICBsb2NhdGlvbi5oYXNoID0gJyMnICsgZnJhZ21lbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gIH0pO1xuXG5cblxuICAvLyBhZGQgc29tZSBmZWF0dXJlcyB0byBMb2NhdGlvbkJhclxuXG4gIC8vIGEgbW9yZSBpbnR1aXRpdmUgYWxpYXMgZm9yIG5hdmlnYXRlXG4gIExvY2F0aW9uQmFyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5uYXZpZ2F0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8vIGEgZ2VuZXJpYyBjYWxsYmFjayBmb3IgYW55IGNoYW5nZXNcbiAgTG9jYXRpb25CYXIucHJvdG90eXBlLm9uQ2hhbmdlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yb3V0ZSgvXiguKj8pJC8sIGNhbGxiYWNrKTtcbiAgfTtcblxuICAvLyBjaGVja3MgaWYgdGhlIGJyb3dzZXIgaGFzIHB1c2hzdGF0ZSBzdXBwb3J0XG4gIExvY2F0aW9uQmFyLnByb3RvdHlwZS5oYXNQdXNoU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFMb2NhdGlvbkJhci5zdGFydGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJvbmx5IGF2YWlsYWJsZSBhZnRlciBsb2NhdGlvbkJhci5zdGFydCgpXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faGFzUHVzaFN0YXRlO1xuICB9O1xuXG5cblxuXG5cblxuICAvLyBleHBvcnRcbiAgcmV0dXJuIExvY2F0aW9uQmFyO1xufSk7XG59KSh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUgOiBmdW5jdGlvbiAoZmFjdG9yeSkgeyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSk7IH0pOyJdfQ==
;