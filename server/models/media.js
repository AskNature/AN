// FM model
'use strict';

var Model = require('./model.js');
var ListOptions = require('./constants/listoptions.js');

var entityName = 'Image';

var fields = ['name', 'filename', 'media_url', 'id', 'entity', 'timestamp', 'user_id', 'mime_type', 'file_type_id', 'author', 'author_url', 'source', 'source_url', 'license_id', 'description', 'deleted', 'keywords', 'featured', 'popup', 'sort_order', 'width', 'height', 'flag_text', 'flag_media', 'flag_tags', 'flag_demo'];

var Entity = new Model('Entity',
    [
        'name',
        '@class'
    ]
);
var User = new Model('Outcome',
    [
        'name',
        'first',
        'last'
    ]
);
var Collection = new Model('Mechanism',
    [
        'name'
    ]
);
var Status = new Model('ContentStatus',
  [
      'masterid',
      'name'
  ]
);

var relationships = {
    'has_media': {
	model: Entity,
	className: 'V',
	edge: 'in("HasMedia")'
    },
    'added_media': {
        model: User,
        className: 'Users',
        edge: 'in("AddedMedia")'
    },
    'license': {
        model: Status,
        className: 'License',
        edge: 'out("HasLicense")',
        select: true,
        options: ListOptions.License
    },
    'status': {
        model: Status,
        className: 'ContentStatus',
        edge: 'out("HasStatus")',
        select: true,
        options: ListOptions.ContentStatus
    }
};

var Data = new Model(entityName, fields, relationships);

module.exports = Data;
