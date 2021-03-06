// FM model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'DSystem';

var fields = ['name', 'description', 'flag_text', 'flag_media', 'flag_tags', 'flag_demo'];

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
var Entity = new Model('Entity',
    [
        'name',
        '@class',
	'flag_demo'
    ]
);
var Status = new Model('ContentStatus',
  [
      'masterid',
      'name'
  ]
);
var Source = new Model('Source',
    [
        'name',
        'publication_year',
        'authors',
	'flag_demo'
    ]
);
var Expert = new Model('Expert',
    [
        'name',
        'institution',
	       'flag_demo'
    ]
);


var relationships = {
  'parent': {
      model: Entity,
      className: 'DSystem',
      edge: 'out("ChildSystemOf")'
  },
  'children': {
      model: Entity,
      className: 'DSystem',
      edge: 'in("ChildSystemOf")'
  },
  'has_dsystem': {
	model: Entity,
	className: 'InspiredSolutions',
	edge: 'in("HasDSystem")'
    },
    'status': {
    model: Status,
    className: 'ContentStatus',
    edge: 'out("HasStatus")',
    select: true,
    options: ListOptions.ContentStatus
  },
  'studied_by': {
      model: Expert,
      className: 'Experts',
      edge: 'out("StudiedBy")'
  },
  'sources': {
      model: Source,
      className: 'Source',
      edge: 'out("HasSource")'
  },
  'media': {
model: Media,
className: 'Image',
edge: 'out("HasMedia")'
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
  }

};

var Data = new Model(entityName, fields, relationships);

module.exports = Data;
