/**
* Phenomena Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/phenomena');

var routes = function (app) {
  app.get('/admin/phenomena', Controller.loadindex);
  app.get('/phenomenon/:id', Controller.loadindex);

  // API v1
  app.get('/api/phenomena', Controller.returnList1);
  app.get('/api/phenomenon/:id', Controller.returnItem1);

  // API v2
  app.get('/api/v2/phenomena/:id', Controller.returnItem2);
  app.post('/api/v2/phenomena/:id', Controller.updateItem2);
  app.post('/api/v2/phenomena', Controller.createItem2);
  app.delete('/api/v2/phenomena/:id', Controller.deleteItem2);
};

module.exports = routes;
