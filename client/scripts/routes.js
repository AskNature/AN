'use strict';

var React = require('react/addons');
var routeActions = require('./actions/routes');
var IndexPage = React.createFactory(require('./components/index.jsx'));

var ListComponent = React.createFactory(require('./components/admin/adminlist.jsx')),
CollectionList = require('./components/admin/collection'),
ContextList = require('./components/admin/context'),
LivingSystemList = require('./components/admin/livingsystem'),
MediaList = require('./components/admin/media'),
PhenomenonList = require('./components/admin/phenomenon'),
ProductList = require('./components/admin/product'),
ResearcherList = require('./components/admin/researcher'),
SourceList = require('./components/admin/source'),
StrategyList = require('./components/admin/strategy'),
UserList = require('./components/admin/user');

var DetailComponent = React.createFactory(require('./components/detail/component-detail.jsx'));

var ProductDetail = React.createFactory(require('./components/detail/component-detail.jsx'));
var StrategyDetail = React.createFactory(require('./components/detail/component-detail.jsx'));
var LivingSystemsDetail = React.createFactory(require('./components/detail/livingsystem.jsx'));
var PhenomenonDetail = React.createFactory(require('./components/detail/phenomenon.jsx'));
var ConditionDetail = React.createFactory(require('./components/detail/condition.jsx'));
var SourceDetail = React.createFactory(require('./components/detail/source.jsx'));
var ResearcherDetail = React.createFactory(require('./components/detail/researcher.jsx'));
var CollectionDetail = React.createFactory(require('./components/detail/collection.jsx'));
var UserDetail = React.createFactory(require('./components/detail/user.jsx'));
var MediaDetail = React.createFactory(require('./components/detail/media.jsx'));


var Login = React.createFactory(require('./components/account/login.jsx'));
var Signup = React.createFactory(require('./components/account/signup.jsx'));
var AccountSettings = React.createFactory(require('./components/account/account_settings.jsx'));
var AccountForgot = React.createFactory(require('./components/account/forgot.jsx'));
var AccountReset = React.createFactory(require('./components/account/reset.jsx'));

var Infinite = React.createFactory(require('./components/demo/infinite.jsx'));


var render = function(Page, props) {
    React.render(new Page(props), document.getElementById('app-wrapper'));
};

var index = function() {
    render(IndexPage);
};

var list_component = function(type) {
    var list;
    if(type === 'strategies') {
        list = StrategyList;
    } else if(type === 'products') {
        list = ProductList;
    } else if(type === 'phenomena') {
        list = PhenomenonList;
    } else if(type === 'users') {
        list = UserList;
    } else if(type === 'collections') {
        list = CollectionList;
    } else if(type === 'conditions') {
        list = ContextList;
    } else if(type === 'living-systems') {
        list = LivingSystemList;
    } else if(type === 'media') {
        list = MediaList;
    } else if(type === 'researchers') {
        list = ResearcherList;
    } else if(type === 'sources') {
        list = SourceList;
    }
    render(ListComponent, {type: type, component: list});
};

var detail_component = function(type,id) {
    render(DetailComponent, {masterid: id, type: type});
};

var detail_strategy = function(id) {
    render(DetailComponent, {masterid: id, type: 'strategies'});
};

var detail_product = function(id) {
    render(DetailComponent, {masterid: id, type: 'products'});
};

var detail_livingsystems = function(id) {
    render(DetailComponent, {masterid: id, type: 'living-systems'});
};

var detail_phenomenon = function(id) {
    render(DetailComponent, {masterid: id, type: 'phenomena'});
};

var detail_condition = function(id) {
    render(DetailComponent, {masterid: id, type: 'conditions'});
};

var detail_source = function(id) {
    render(DetailComponent, {masterid: id, type: 'sources'});
};

var detail_researcher = function(id) {
    render(DetailComponent, {masterid: id, type: 'researchers'});};

var detail_collection = function(id) {
    render(DetailComponent, {masterid: id, type: 'collections'});};

var detail_user = function(id) {
    render(DetailComponent, {masterid: id, type: 'users'});};

var detail_media = function(id) {
    render(DetailComponent, {masterid: id, type: 'media'});};

var login = function() {
    render(Login);
};

var signup = function() {
    render(Signup);
};

var account_settings = function() {
    render(AccountSettings);
};

var account_forgot = function() {
    render(AccountForgot);
};

var account_reset = function(token) {
    render(AccountReset);
};

var infinite_demo = function() {
    render(Infinite);
};


var routes = {
  '/': index,
  
  '/list/:type': list_component,

  '/q/:type/:id': detail_component,

  '/strategy/:id': detail_strategy,
  '/product/:id': detail_product,
  '/living-system/:id': detail_livingsystems,
  '/phenomenon/:id': detail_phenomenon,
  '/condition/:id': detail_condition,
  '/source/:id': detail_source,
  '/researcher/:id': detail_researcher,
  '/collection/:id': detail_collection,
  '/user/:id': detail_user,
  '/media/:id': detail_media,

  '/login': login,
  '/signup': signup,
  '/settings': account_settings,
  '/forgot': account_forgot,
  '/reset/:token': account_reset,

  '/infinite_demo': infinite_demo
};

module.exports = routes;
