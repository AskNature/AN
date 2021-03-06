'use strict';

var React = require('react'),

Link = require('../modules/link.jsx'),
DefaultLayout = require('../layouts/default.jsx'),

TopSection = require('./common/topsection.jsx'),

TextArea = require('./common/textarea.jsx'),
Gallery = require('./common/gallery.jsx'),
RelationshipList = require('./common/relationshiplist.jsx'),

Well = require('react-bootstrap/Well'),
Label = require('react-bootstrap/Label'),
Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Select = require('react-select');

var Template = React.createClass({

  // This is causing relationshiplist changes to be hidden until update button is clicked:
  /* shouldComponentUpdate: function(nextProps, nextState) {
    if(nextProps.masterid !== this.props.masterid || nextProps.editable !== this.props.editable || nextProps.loaded !== this.props.loaded) {
      return true;
    } else {
      return false;
    }
  },*/
  componentDidMount: function() {
      var myHeight = this.getDOMNode().offsetHeight;
      console.log("height" + myHeight);
      this.props.heightUpdateListener ? this.props.heightUpdateListener(this.getDOMNode().offsetHeight) : '';
  },
  render: function() {
    var routeNameSingle = 'b.strategy';
    var entityName = 'Biological Strategy';
    var data = this.props.data;
    var primaryKey = 'name';

    var primaryTitle = data[primaryKey];

    var split = primaryTitle ? primaryTitle.indexOf(': ') ? primaryTitle.split(': ') : [] : [];
    primaryTitle = split[0];
    var secondaryTitle = data.living_systems[0] && data.living_systems[0].common_name ? data.living_systems[0].common_name : split.length > 1 ? split[1] : '';

    if(data.living_systems.length > 1){
      secondaryTitle += ' & others';
    }
    var descriptionKey = 'summary';
    var addedby = data.added_by;
    var default_avatar = 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/10383663_869350803096314_2369845013213041061_n.png?oh=2c010ce055331caa73a9506795239fd1&oe=55BDD82A&__gda__=1433772443_f5c43498047b8193dccc0a5554ba6ed1';
    console.log('windowheight:'+this.props.windowHeight);
    return (
      /* jshint ignore:start */
        <div>
          <TopSection
            {...this.props}
            routename={routeNameSingle}
            entityName={entityName}
            primarytitle={data[primaryKey]}
            primarydisplay={primaryTitle}
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
                        items={data.living_systems}
                        editable={this.props.editable}
                        titleField={'name'}
                        onAdd={this.props.onRelationshipAdd.bind(null, 'living_systems')}
                        onRemove={this.props.onRelationshipRemove.bind(null, 'living_systems')}
                        field={'b.system'}
                        routeName={'b.system'}
                        title={'Biological Systems'}
                        fieldName={'Biological Systems'}/>
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
                    items={data.inspired_by}
                    editable={this.props.editable}
                    titleField='name'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'inspired_by')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'inspired_by')}
                    field={'d.strategy'}
                    routeName={'d.strategy'}
                    title={'Bio-inspired Strategies'}
                    fieldName={'Bio-inspired Strategies'}/>
    				    </Col>
              </Row>
            </Grid>
            {data.media && data.media.length > 0 || this.props.editable ? (
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
            ) : ''}
            <Grid>
              <Row>
		            <Col xs={12} md={12}>
                  {data.brief || this.props.editable ? (
                    <TextArea
                      title='Story'
                      item={data.brief}
                      store={this.props.store}
                      actions={this.props.actions}
                      fieldName={'brief'}
                      editable={this.props.editable}
		                  placeholder="Add a Story" />
                    ) : '' }
                    {data.special_text || this.props.editable ? (
                      <TextArea
                        title='Citations'
                        item={data.special_text}
                        store={this.props.store}
                        actions={this.props.actions}
                        fieldName={'special_text'}
                        editable={this.props.editable}
                        placeholder='Add citations from linked sources' />
                    ) : '' }
                  </Col>
	              </Row>
                <Row className='show-grid'>
		              <Col xs={12} sm={6} >
                    <h6 className='heading'>Ideas & Insights</h6>
                    <ul className='design-insights media-list'>
                      {data.application_1 || this.props.editable ? (
                        <li className='media'>
                          <div className='media-left media-middle'>
                            <a href='#'>
                              <img src='http://lorempixel.com/30/30/people/1' alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
                            </a>
                          </div>
                          <div className='media-body media-middle'>
                            <div>
                              <h6><a href='#'><strong>Charlie Gupta </strong></a></h6>
                              <TextArea
                                item={data.application_1}
                                store={this.props.store}
                                actions={this.props.actions}
                                fieldName={'application_1'}
                                editable={this.props.editable} />
                            </div>
                          </div>
                        </li>
                      ) : ''}
                    {data.application_2 || this.props.editable ? (
                      <li className='media'>
                        <div className='media-left media-middle'>
                          <a href='#'>
                            <img src='http://lorempixel.com/30/30/people/2' alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
                          </a>
                        </div>
                        <div className='media-body media-middle'>
                          <div>
                            <h6><a href='#'><strong>Jean Francis </strong></a></h6>
                            <TextArea
                              item={data.application_2}
                              store={this.props.store}
                              actions={this.props.actions}
                              fieldName={'application_2'}
                              editable={this.props.editable} />
                          </div>
                        </div>
                      </li>
                    ) : ''}
                    {data.application_3 || this.props.editable ? (
                      <li className='media'>
                        <div className='media-left media-middle'>
                          <a href='#'>
                            <img src='http://lorempixel.com/30/30/people/3' alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
                          </a>
                        </div>
                        <div className='media-body media-middle'>
                          <div>
                            <h6><a href='#'><strong>Alex Randall </strong></a></h6>
                            <TextArea
                              item={data.application_3}
                              store={this.props.store}
                              actions={this.props.actions}
                              fieldName={'application_3'}
                              editable={this.props.editable} />
                          </div>
                        </div>
                      </li>
                    ) : ''}
                    <li className='media'>
                      <div className='media-left'>
                        <a href='#'>
                          <img src='http://lorempixel.com/30/30/people/4' alt='Thumb' width='30px' height='30px' className='img-circle media-object' />
                        </a>
                      </div>
                      <div className='media-body'>
                        <form>
                          <Input disabled type='text' className='input-sm' placeholder='Share Your Idea or Insight...' />
                        </form>
                      </div>
                    </li>
                  </ul>
    				    </Col>
    				    <Col xs={12} sm={6}>
                  <RelationshipList
                    items={data.collections}
                    editable={this.props.editable}
                    titleField='name'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'collections')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'collections')}
                    field={'collection'}
                    routeName={'collection'}
                    title={'Collections'}
                    fieldName={'Collections'}/>
                    <RelationshipList
                      items={data.stories}
                      editable={this.props.editable}
                      titleField='name'
                      onAdd={this.props.onRelationshipAdd.bind(null, 'stories')}
                      onRemove={this.props.onRelationshipRemove.bind(null, 'stories')}
                      field={'story'}
                      routeName={'story'}
                      title={'Related Links'}
                      fieldName={'Related Links'}/>
    				    </Col>
	            </Row>
        			<Row className='show-grid'>
                <Col xs={12} sm={6}>

                    <RelationshipList
                      items={data.sources}
                      editable={this.props.editable}
                      titleField='name'
                      subtitleField='authors'
                      onAdd={this.props.onRelationshipAdd.bind(null, 'sources')}
                      onRemove={this.props.onRelationshipRemove.bind(null, 'sources')}
                      field={'source'}
                      routeName={'source'}
                      title={'Sources'}
                      fieldName={'Sources'}/>
                </Col>
		            <Col xs={12} sm={6}>
                  <RelationshipList
                    items={data.experts}
                    editable={this.props.editable}
                    titleField='name'
                    subtitleField='institution'
                    onAdd={this.props.onRelationshipAdd.bind(null, 'experts')}
                    onRemove={this.props.onRelationshipRemove.bind(null, 'experts')}
                    field={'researcher'}
                    routeName={'researcher'}
                    title={'R&D Teams'}
                    fieldName={'R&D Teams'} />
          			</Col>
        			</Row>
			    </Grid>

        </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Template;
