'use strict';

var React = require('react'),

//Temp:
request = require('superagent'),

DefaultLayout = require('../layouts/default.jsx'),

TopSection = require('./common/topsection.jsx'),
TextArea = require('./common/textarea.jsx'),

Gallery = require('./common/gallery.jsx'),
RelationshipList = require('./common/relationshiplist.jsx'),
FontAwesome = require('react-fontawesome'),

Button = require('react-bootstrap').Button,
Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Template = React.createClass({
  render: function() {
    var routeNameSingle = 'd.system';
    var entityName = 'Designed System';
    var data = this.props.data;
    var primaryKey = 'name';
    var secondaryTitle = data.parent[0] ? data.parent[0].name : '';
    if(data.parent[1]){
      secondaryTitle += ' & others';
    }
    var descriptionKey = 'description';
    return (
      /* jshint ignore:start */
      <div>
        <TopSection
          {...this.props}
          routename={routeNameSingle}
          entityName={entityName}
          primarytitle={data[primaryKey]}
          primarykey={primaryKey}
          secondarytitle={secondaryTitle}
          description={data[descriptionKey]}
          descriptionKey={descriptionKey}
          />
          <Grid>
            <Row className='show-grid'>
              <Col xs={12} sm={4}>
                <RelationshipList
                  items={data.parent}
                  editable={false}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'parent')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'parent')}
                  field={'d.system'}
                  routeName={'d.system'}
                  title={'More General Systems'}
                  fieldName={'More General Systems'}/>
                  <Button bsStyle='link' block
                        disabled={true} >
                        <FontAwesome name='filter' />
                  </Button>
                  <h5 style={{fontWeight: 'bold',marginLeft:'12px'}}>
                    {this.props.data.name ? this.props.data.name : 'Name'}
                  </h5>
                  {data.children ? (
                  <Button bsStyle='link' block
                        disabled={true} >
                        <FontAwesome name='filter' />
                  </Button>
                  ) : ''}
                <RelationshipList
                  items={data.children}
                  editable={false}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'children')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'children')}
                  field={'d.system'}
                  routeName={'d.system'}
                  title={'More Specific Systems'}
                  fieldName={'More Specific Systems'}/>
              </Col>
              <Col xs={6} sm={4}>
                <RelationshipList
                  items={data.has_dsystem}
                  editable={this.props.editable}
                  titleField='name'
                  onAdd={this.props.onRelationshipAdd.bind(null,'has_dsystem')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'has_dsystem')}
                  field={'d.strategy'}
                  routeName={'d.strategy'}
                  title={'Bio-inspired Strategies'}
                  fieldName={'Bio-inspired Strategies'}/>
                </Col>
                <Col xs={6} sm={4}>
                  <RelationshipList
                    items={data.sources}
                    editable={this.props.editable}
                    titleField='name'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'sources')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'sources')}
                    field={'source'}
                    routeName={'source'}
                    title={'Sources'}
                    fieldName={'Sources'}/>

                    <RelationshipList
                      items={data.studied_by}
                      editable={this.props.editable}
                      titleField='name'
                      onAdd={this.props.onRelationshipAdd.bind(null, 'studied_by')}
                      onRemove={this.props.onRelationshipRemove.bind(null, 'studied_by')}
                      field={'researcher'}
                      routeName={'researcher'}
                      title={'R&D Teams'}
                      fieldName={'R&D Teams'}/>
                </Col>
              </Row>
             </Grid>

             {data.media && data.media.length > 0 || this.props.editable ? (
               <Grid>
                 <Row>
                   <Col xs={12}>
                       <Gallery items={data} title={data.name} windowHeight={this.props.windowHeight}/>

                   </Col>
                   {this.props.editable ? (
                     <Col xs={12}>
                       <RelationshipList
                         items={data.media}
                         editable={this.props.editable}
                         titleField='name'
                         onAdd={this.props.onRelationshipAdd.bind(null, 'media')}
                         onRemove={this.props.onRelationshipRemove.bind(null, 'media')}
                         field={'media'}
                         routeName={'media'}
                         title={'Media'}
                         fieldName={'Media'}
                         media />
                     </Col>
                   ) : '' }
                 </Row>
               </Grid>
             ) : ''}
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;
