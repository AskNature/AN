/**
*  Console Layout Component
*/
'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx'),

Link = require('../modules/link.jsx');

var CollectionConsole = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="main-container">
          <div className="container">
            <h3>{this.props.plural} <Link url={'../'+this.props.slug+'/new'}><Button >Create New {this.props.singular}</Button></Link></h3>
            {this.props.children}
          </div>
        </div>
      </DefaultLayout>
      /* jshint ignore:end */
    );
  }
});

module.exports = CollectionConsole;
