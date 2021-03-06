// FM model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');


var entityName = 'Function';

var fields = ['name', 'short_name', 'description', 'flag_text', 'flag_media', 'flag_tags', 'flag_demo'];

var Media = new Model('Media',
  [
    'filename',
    'name',
    'entity',
    'description',
    'media_url',
    'flag_demo',
    'source_url',
    'author'
  ]
);
var User = new Model('Users',
  [
    'name',
    'first',
    'last',
    'custom_avatar_url'
  ],
  {'out_HasMedia':
    {
      model: Media,
      className: 'Media',
      edge:'out("HasMedia")'
    }
  }
);
var FM = new Model('FM',
    [
        'name',
	'flag_demo'
    ]
);
var Status = new Model('ContentStatus',
  [
      'masterid',
      'name'
  ]
);
var Entity = new Model('Entity',
    [
        'name',
        '@class',
	'flag_demo'
  ]
);

var relationships = {
    'parent': {
	model: FM,
	className: 'Function',
	edge: 'out("ChildOf")'
    },
    'children': {
        model: FM,
        className: 'Function',
        edge: 'in("ChildOf")'
    },
    'function': {
        model: Entity,
        className: 'Content',
        edge: 'in("HasFunction")'
    },
    'mechanism': {
        model: Entity,
        className: 'Content',
        edge: 'in("HasMechanism")'
    },
    'status': {
        model: Status,
        className: 'ContentStatus',
        edge: 'out("HasStatus")',
        select: true,
        options: ListOptions.ContentStatus
    },
    'added_by': {
	model: User,
	className: 'Users',
	edge: 'in("AddedContent")'
    },
    'collaborators': {
	model: User,
	className: 'Users',
	edge: 'in("CollaboratedOn")'
},
'media':
  {
    model: Media,
    className: 'Image',
    edge:'out("HasMedia")'
  }
};

var data = new Model(entityName, fields, relationships);

module.exports = data;
