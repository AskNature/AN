/**
* Media Console Component
*/
'use strict';

var React = require('react');
var ConsoleLayout = require('./consolelayout.jsx');
var mediaStore = require('../../stores/admin/media');
var mediaActions = require('../../actions/media');
var GriddleComponent = require('./griddle_component.jsx');

var MediaConsole = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <ConsoleLayout title='Media Console'>
                        <GriddleComponent store={mediaStore}
                        actions={mediaActions}
                        linkColumnName={'name'}
                        columns={['name', 'media', 'masterid']}
                        thumb={['media_entity', 'media_id']} />
            </ConsoleLayout>
            /* jshint ignore:end */
        );
    }
});

module.exports = MediaConsole;
