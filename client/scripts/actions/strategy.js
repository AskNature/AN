/**
* Outcome actions
*/
'use strict';

var Dispatcher = require('../dispatchers/default');
var focusConstants = require('../constants/strategy');
var focusDefaults = require('../constants/defaults').strategy;
var request = require('superagent');
var assign = require('object-assign');

module.exports = {

  /**
  * setOutcome is called by getOutcomes and sends a request to the dispatcher.
  */

  setList: function(focus) {
    Dispatcher.handleViewAction({
      actionType: focusConstants.GET_ALL_STRATEGIES,
      focus: assign({}, focusDefaults, focus)
    });
    console.log('setList action returning '+focus.results.length + ' results.');
  },

  /**
  * getOutcomes is called by the outcomefilter component. It defines the URI
  * that the router uses to pass a request to the controller.
  */

  getList: function(callback) {
    var self = this;
    request
    .get('/api/strategies')
    .type('json')
    .end(function(res) {
      if (res.ok) {
        if (res) {
          var listData = res.body;
          self.setList(listData);
          console.log(res.body);
        }
        if (callback && callback.success) {
          callback.success(res);
        }
      }
      else {
        if (callback && callback.error) {
          callback.error(res);
        }
      }

      if (callback && callback.complete) {
        callback.complete(res);
      }
    });
  },

};
