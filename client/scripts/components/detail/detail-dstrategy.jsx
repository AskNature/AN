'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
DefaultLayout = require('../layouts/default.jsx'),

TopSection = require('./common/topsection.jsx'),

TextArea = require('./common/textarea.jsx'),
Gallery = require('./common/gallery.jsx'),
RelationshipList = require('./common/relationshiplist.jsx'),

Well = require('react-bootstrap/Well'),
Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Select = require('react-select');

var Template = React.createClass({

  render: function() {
    var routeNameSingle = 'd.strategy';
    var entityName = 'Bio-inspired Strategy';
    var data = this.props.data;
    var primaryKey = 'name';
    var secondaryTitle = data.designedsystems[0] ? data.designedsystems[0].name : data.system;
    if(data.designedsystems[1]){
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
          secondarykey=''
          description={data[descriptionKey]}
          descriptionKey={descriptionKey}
          />

        <Grid>
          <Row>
            <Col xs={12} className='card-nest'>
            <Well bsSize='small' className='card-contexts'>
              <Row>
              <RelationshipList
                items={data.context}
                editable={this.props.editable}
                titleField='name'
                onAdd={this.props.onRelationshipAdd.bind(null, 'context')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'context')}
                field={'context'}
                routeName={'context'}
                title='Key Contexts'
                fieldName={'Contexts'}
                narrow />
            </Row>
              <Well bsSize='small' className='card-systems'>
              <Row>
                <Col xs={12} sm={4}>
                  <RelationshipList
                    items={data.designedsystems}
                    editable={this.props.editable}
                    titleField={'name'}
                    onAdd={this.props.onRelationshipAdd.bind(null, 'designedsystems')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'designedsystems')}
                    field={'d.system'}
                    routeName={'d.system'}
                    title={'Designed Systems'}
                    fieldName={'Designed Systems'}/>
                </Col>
                <Col xs={12} sm={8}>
                  <Well bsSize='small' className='card-fms'>
                    <div className='arrow'></div>
                    <Row>
                    <Col xs={6}>
                      <RelationshipList
                        items={data.mechanisms}
                        editable={this.props.editable}
                        titleField='name'
                        onAdd={this.props.onRelationshipAdd.bind(null,'mechanisms')}
                        onRemove={this.props.onRelationshipRemove.bind(null, 'mechanisms')}
                        field={'fm'}
                        routeName={'fm'}
                        title={'Mechanisms'}
                        fieldName={'Mechanisms'}/>
                    </Col>
                    <Col xs={6}>
                      <RelationshipList
                        items={data.functions}
                        editable={this.props.editable}
                        titleField='name'
                        onAdd={this.props.onRelationshipAdd.bind(null, 'functions')}
                        onRemove={this.props.onRelationshipRemove.bind(null, 'functions')}
                        field={'fm'}
                        routeName={'fm'}
                        title={'Functions'}
                        fieldName={'Functions'}/>
                    </Col>
                    </Row>
                  </Well>
                </Col>
              </Row>
              </Well>
            </Well>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <RelationshipList
                items={data.strategies}
                editable={this.props.editable}
                onAdd={this.props.onRelationshipAdd.bind(null, 'strategies')}
                onRemove={this.props.onRelationshipRemove.bind(null, 'strategies')}
                field='b.strategy'
                routeName='b.strategy'
                title='Inspiring Biological Strategies'
                fieldName='Biological Strategy'
                titleField='name' />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={12}>
              <Gallery items={data} title={data.name} windowHeight={this.props.windowHeight}/>
                {this.props.editable ? (
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
                ) : '' }
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              {data.summary || this.props.editable ? (
                <TextArea
                  title='Summary'
                  item={data.summary}
                  store={this.props.store}
                  actions={this.props.actions}
                  fieldName={'summary'}
                  editable={this.props.editable}/>
              ) : '' }
              {data.challenges_solved || this.props.editable ? (
                <TextArea
                  title='Challenges Solved'
                  item={data.challenges_solved}
                  store={this.props.store}
                  actions={this.props.actions}
                  fieldName={'challenges_solved'}
                  editable={this.props.editable}/>
              ) : '' }
              {data.how_is_it_different || this.props.editable ? (
                <TextArea
                  title={'How it\'s different'}
                  item={data.how_is_it_different}
                  store={this.props.store}
                  actions={this.props.actions}
                  fieldName={'how_is_it_different'}
                  editable={this.props.editable}/>
              ) : '' }
              {data.biomimicry_story || this.props.editable ? (
                <TextArea
                  title='Biomimicry Story'
                  item={data.biomimicry_story}
                  store={this.props.store}
                  actions={this.props.actions}
                  fieldName={'biomimicry_story'}
                  editable={this.props.editable}/>
              ) : '' }
            </Col>
            </Row>
            <Row className='show-grid'>
              <Col xs={12} sm={6}>

                  <RelationshipList
                    items={data.has_source}
                    editable={this.props.editable}
                    titleField='name'
                    subtitleField='authors'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'has_source')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'has_source')}
                    field='source'
                    routeName='source'
                    title='Sources'
                    fieldName='Sources'/>
              </Col>
              <Col xs={12} sm={6}>
                <RelationshipList
                  items={data.studied_by}
                  editable={this.props.editable}
                  titleField='name'
                  subtitleField='institution'
                  onAdd={this.props.onRelationshipAdd.bind(null, 'studied_by')}
                  onRemove={this.props.onRelationshipRemove.bind(null, 'studied_by')}
                  field='researcher'
                  routeName='researcher'
                  title='R&D Teams'
                  fieldName='R&D Teams' />
              </Col>
            </Row>
          </Grid>
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;
