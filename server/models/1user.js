// User model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = '1Users';

var fields = ['name', 'first', 'last', 'email', 'roles', 'registration_date', 'timestamp', 'email_confirmed', 'special_text', 'address_1', 'address_2', 'city', 'state', 'postal_code', 'country', 'time_zone', 'phone', 'extension', 'tollfree', 'fax', 'im', 'langs_spoken', 'revision', 'hide_email', 'send_email', 'alert_frequency', 'last_alerted', 'contact_me', 'hide_address', 'hide_phone', 'gender', 'custom_avatar', 'ip_address', 'password', 'salt', 'persist', 'newpassword', 'email_salt'];

var User = new Model('User', ['name']);

var Friend = new Model('Friends', ['name']);

var Media = new Model('Media', ['name', 'id', 'filename']);

var Status = new Model('UserStatus',
  [
      'masterid',
      'name'
  ]
);

var relationships = {
    'friends': {
    	model: User,
    	className: 'Friends',
    	edge: 'both("Friends")'
    },
    'media': {
    	model: Media,
    	className: 'Media',
	    edge: 'out("HasMedia")'
    },
    'added_media': {
      model: Media,
      className: 'AddedMedia',
      edge: 'out("AddedMedia")'
    },
'status': {
model: Status,
className: 'UserStatus',
edge: 'out("HasStatus")',
select: true,
options: ListOptions.UserStatus
}
};

var Data = new Model(entityName, fields, relationships);

module.exports = Data;
