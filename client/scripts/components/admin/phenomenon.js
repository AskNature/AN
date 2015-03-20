'use strict';

var List = {
    'plural_name' : 'Phenomena',
    'singular_name' : 'Phenomenon',
    'store' : require('../../stores/admin/phenomena'),
    'actions' : require('../../actions/phenomena'),
    'columns' : [
      {columnName:'masterid', displayName:'id', type:'id'},
      {columnName:'name', displayName:'Name', type:'link'},
      {columnName:'parent', displayName:'Parent', type:'text'},
      {columnName:'short_name', displayName:'Short Name', type:'text'},
      {columnName:'child_items', displayName:'Children', type:'list'},
      {columnName:'outcome_count', displayName:'Outcome Count', type:'text'}
    ],
    'thumb' : [
        'media',
        'media_id',
        'media_entity'
    ]
};

module.exports = List;