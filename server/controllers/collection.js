'use strict';
var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');
var _ = require('lodash');

var Cached = require('cached');
var collectionCache;

var crypto = require('crypto');

var Collection = require('../models/collection.js');

if(process.env.NODE_ENV === 'production') {
    collectionCache = new Cached('collection', { backend: {
	type: 'memcached',
	hosts: '127.0.0.1:11211'
    }});
} else {
    collectionCache = new Cached('collection');
}
collectionCache.setDefaults({'freshFor': 120});

var loadindex = function(req, res, next) {
  // Render index.html to allow application to handle routing
   res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
   console.log('The collection page has access to the ' + db.name + ' database.');
};

var returnList1 = function(req, res, next) {
  var chain = db
  .select('name, secondary_title, masterid, out("HasStatus").name as status, type, in("FeaturedIn").size() as featured_count, in("FeaturedIn").name as featured_in, "collection" as entityType, type, both("Added").name as added, timestamp, flag_text, flag_tags, flag_media')
  .from('Collection');

  var limit = parseInt(req.query.limit);
  if(limit) {
      chain.limit(limit);
  }

  var offset = parseInt(req.query.offset);
  if(offset) {
      chain.offset(offset);
  }

  var order = req.query.order;
  if(order) {
      chain.order(order.substring(1) + (order.substring(0,1)==='-' ? ' desc' : ' asc'));
  }

  var filter = req.query.filter;
  if(filter) {
      chain.containsText({'name' : filter});
  }

  collectionCache.getOrElse('count', Cached.deferred(function(done) {
      console.log('cache miss');
      db.select('count(*)').from('Collection')
      .scalar().then(function(count) {
	  done(null, count); // return Cached.deferred
      }).done();
  })).then(function(count) {
      chain.all().then(function(results) {
	  res.status(200).json({
	      results: results,
	      count: count,
	      maxPages: Math.ceil(count/limit)
	  });
	  console.log('The collection controller has sent ' + results.length + ' records.');
      }).done();
  });
};

var returnItem2 = function(req, res, next) {
    var callback = function(item) {
        if(!item) {
            return res.status(404).send("No collection with that id exists");
        } else {
            return res.status(200).json(item);
	    }
    };

    if(req.query["expand"]) {
	Collection.getWithRelationships(req.params.id, callback);
    } else {
	Collection.get(req.params.id, callback);
    }
};

var updateItem2 = function(req, res, next) {
    Collection.get(req.params.id, function(item) {
	if(!item) {
	    return res.status(404).send("No collection with that id exists");
	} else {
	    item.set(req.body).save(function(err, savedItem) {
		if(err) {
		    return res.status(500).send(err);
		} else {
		    return res.status(200).json(savedItem);
		}
	    });
	}
    });
};

var createItem2 = function(req, res, next) {
    var s = new Collection(req.body.masterid, req.body);
    s.save(function(err, saved) {
	if(err) {
	    return res.status(500).send(err);
	} else {
	    return res.status(200).json(saved);
	}
    });
};

var deleteItem2 = function(req, res, next) {
    Collection.destroy(req.params.id, function(err) {
	if(err) {
	    return res.status(err.code).send(err.message);
	} else {
	    return res.status(204).send();
	}
    });
};

var deleteMultiple2 = function(req, res, next) { // TODO: use async
    console.log(req.body['delete']);
    if(JSON.parse(req.body['delete']) instanceof Array) {
	JSON.parse(req.body['delete']).forEach(function(item) {
	    Collection.destroy(item, function(err) {
		if(err) {
		    return res.status(err.code).send(err.message);
		}
	    });
	});
	res.status(200).send();
    } else {
	return res.status(400).send();
    }
};

var createCollection1 = function(req, res, next) {
    var createWithToken = function() {
        crypto.randomBytes(16, function(err, buf) {
	    if(err) { return res.status(500).send(); }
            var masterid = buf.toString('hex');
            db.select('count(*)').from('Collection').where({masterid: masterid}).scalar()
            .then(function(count) {
                if(count > 0) {
                    return createWithToken(); // overlapping masterid, try again recursively
                } else {
                    // do the creation
                    db.insert().into('Collection')
                    .set({masterid: masterid, name: 'New collection', status: 'raw'}) // TODO: Proper template
                    .all().then(function(results) {
                        // success!
                        return res.status(200).json({
                            results: results
                        });
                    });
                }
            });
        });
    };
    // TODO: permissions check
    if(req.body.masterid) {
	// create with provided masterid
	db.select('count(*)');
    } else {
	// create with generated masterid
    }
};

var updateCollection1 = function(req, res, next) {
    var newData = {name: req.body.name};
    console.log(JSON.stringify(newData));
    db.update('Collection').set(newData)
        .where({masterid:req.params.id}).scalar().then(function(count) {
            console.log("collection updated: " + count);
	    res.status(200).send(req.body);
        });
};

var returnItem1 = function(req, res, next) {
  console.log(req.params.id);
  db
  .select('name, secondary_title, masterid, status, type, in("FeaturedIn").size() as featured_count, in("FeaturedIn").name as featured_in, "collection" as entityType, type, both("Added").name as added, timestamp')
  .from('Collection')
  .where('masterid == "' + req.params.id + '"')
  .all()
  .then(function (results) {
      res.status(200).json({
        results: results
      });
  })
  .done();
};


    module.exports = {
      loadindex: loadindex,
      returnList1: returnList1,
      returnItem1: returnItem1,
      updateCollection1: updateCollection1,
      returnItem2: returnItem2,
      updateItem2: updateItem2,
      createItem2: createItem2,
      deleteItem2: deleteItem2,
      deleteMultiple2: deleteMultiple2
    };
