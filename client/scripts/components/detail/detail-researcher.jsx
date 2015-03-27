'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
DefaultLayout = require('../layouts/default.jsx'),
Hero = require('./common/hero.jsx'),
SubHero = require('./common/subhero.jsx'),
AdminBar = require('./common/adminbar.jsx'),
CreatorMast = require('./common/creatormast.jsx'),
TextArea = require('./common/textarea.jsx'),
DataTable = require('./common/datatable.jsx'),
ImageList = require('./common/imagelist.jsx'),
ButtonList = require('./common/edgelists.jsx'),
Gallery = require('./common/gallery.jsx'),
RelationshipList = require('./common/relationshiplist.jsx'),

Panel = require('react-bootstrap/Panel'),
PanelGroup = require('react-bootstrap/PanelGroup'),
Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Template = React.createClass({

  render: function() {
    var routeNameSingle = 'researcher';
    var entityName = 'Researchers';
    var data = this.props.data;
    return (
      /* jshint ignore:start */
      <div>
        <AdminBar
          masterid={this.props.masterid}
          routename={routeNameSingle}
          pluralroute={this.props.type}
          entityname={entityName} />
        <CreatorMast
          img="https://lh5.googleusercontent.com/-rybUadmgv5g/AAAAAAAAAAI/AAAAAAAAABA/LDHYA7EFTuI/s120-c/photo.jpg"
          entityname={entityName} />
        <Hero
          editable={this.props.editable}
          store={this.props.store}
          actions={this.props.actions}
          media={data.media}
          primarytitle={data.name}
          secondarytitle={data.institution}
          secondarylink=''
          masterid={this.props.masterid} />
        <SubHero
          description={data.summary}
          descriptionlink={''}
          editable={this.props.editable}
          store={this.props.store}
          actions={this.props.actions}
          editBegin={this.props.editBegin}
          editFinish={this.props.editFinish}
          editCancel={this.props.editCancel}
          onDelete={this.props.onDelete}/>

          {this.props.userrole == 'admin' || 'editor' ? (
            <PanelGroup defaultActiveKey='0' accordion>
              <Panel header='Table View' eventKey='1'>
                <DataTable data={data} />
              </Panel>
            </PanelGroup>
          ) : '' }

      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;
