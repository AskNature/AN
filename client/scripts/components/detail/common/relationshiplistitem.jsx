/**
* Detail Edge Lists (component)
*/
'use strict';

var React = require('react'),
routeActions = require('../../../actions/routes'),
Link = require('../../modules/link.jsx'),

FontAwesome = require('react-fontawesome'),

OverlayTrigger = require('react-bootstrap').OverlayTrigger,
Tooltip = require('react-bootstrap').Tooltip,

Col = require('react-bootstrap').Col,
Glyphicon = require('react-bootstrap').Glyphicon,
Button = require('react-bootstrap').Button,
ButtonToolbar = require('react-bootstrap').ButtonToolbar,
Nav = require('react-bootstrap').Nav,
NavItem = require('react-bootstrap').NavItem,
DropdownButton = require('react-bootstrap').DropdownButton,
MenuItem = require('react-bootstrap').MenuItem;

var MiniHero = React.createClass({
  render: function() {
    var thumburl;
    if(this.props.media) {
      if(this.props.thumburl) {
        thumburl = this.props.thumburl;
      } else {
        thumburl = 'http://placehold.it/100x100';
      }
    }
    return (
      <div className={this.props.showOverlay ? 'focused minihero' : 'minihero'}>
        {this.props.media ? (
          <img src={thumburl} width='100px' height='auto' />
        ) : ''}
        {this.props.label ? (
          <h6 className='card-label'>{this.props.label}</h6>
        ) : ''}
        <h4 className='card-name'>
            {this.props.title}
          <br/>
          <small>{this.props.subtitle}</small>
        </h4>
        <div className='overlay'>
          <Nav justified activeKey={0} bsStyle='pills' bsSize='large'>
            <OverlayTrigger placement="top" delayShow={600} delayHide={150} overlay={<Tooltip><strong>View in AskNature</strong></Tooltip>}>
            <NavItem
              eventKey={1}
              onClick={this.props.link}>

                <FontAwesome name='search' size='lg' fixedWidth />
            </NavItem>
            </OverlayTrigger>
            <OverlayTrigger placement="top" delayShow={600} delayHide={150} overlay={<Tooltip><strong>Open External Source</strong></Tooltip>}>
            <NavItem eventKey={2}>
              <FontAwesome name='globe' size='lg' fixedWidth />
            </NavItem>
            </OverlayTrigger>
            <DropdownButton eventKey={3} title={<FontAwesome name='ellipsis-v' size='lg' fixedWidth />} navItem={true} noCaret pullRight>

              <MenuItem eventKey='3.2'><FontAwesome name='flag' fixedWidth /> Report</MenuItem>
              {this.props.editable ? (
                <MenuItem eventKey='3.4' onClick={this.props.remove}><FontAwesome name='trash' fixedWidth /> Remove</MenuItem>
              ) : ''}
            </DropdownButton>
          </Nav>
        </div>
      </div>
    );
  }
});


var RelationshipListItem = React.createClass({

  getInitialState: function() {
    return {
      showOptions: false
    };
  },

  clickHandler: function(link) {
    routeActions.setRoute(link);
  },

  toggleOptions: function() {
    if(this.state.showOptions) {
      this.setState({showOptions: false});
    } else {
      this.setState({showOptions: true});
    }
  },
  showOptions: function() {

      if(!this.state.showOptions) {
        this.setState({showOptions: true});
      }

  },
  hideOptions: function() {
    if(this.state.showOptions) {
      this.setState({showOptions: false});
    }
  },
// This needs to be abstracted somehow:
  classTranslator: function(classname) {
    var trans = {
      'Strategy' :
        {
          'displayName' : 'Biological Strategy',
          'route' : 'b.strategy'
        },
      'InspiredSolutions' :
        {
          'displayName' : 'Bio-inspired Strategy',
          'route' : 'd.strategy'
        },
      'Context' :
        {
          'displayName' : 'Context',
          'route' : 'context'
        },
      'Function' :
          {
            'displayName' : 'Function & Mechanism',
            'route' : 'fm'
          },
      'Story' :
        {
          'displayName' : 'Story',
          'route' : 'story'
        },
      'Sources' :
        {
          'displayName' : 'Reference Source',
          'route' : 'source'
        },
      'User' :
        {
          'displayName' : 'Original User',
          'route' : '1user'
        },
      'DSystem' :
        {
          'displayName' : 'Designed System',
          'route' : 'd.system'
        },
      'BSystem' :
        {
          'displayName' : 'Biological System',
          'route' : 'b.system'
        },
      'Expert' :
        {
          'displayName' : 'R&D Team',
          'route' : 'researcher'
        },
      'Collection' :
        {
          'displayName' : 'Collection',
          'route' : 'collection'
        },
      'Media' :
        {
          'displayName' : 'Media',
          'route' : 'media'
        },
      'Image' :
        {
          'displayName' : 'Media: Image',
          'route' : 'media'
        },
      'Default' :
        {
          'displayName' : '',
          'route' : 'content'
        }
    };
    var lations;
    if(classname === 'Strategy') {
      lations = trans.Strategy;
    } else if(classname === 'InspiredSolutions') {
      lations = trans.InspiredSolutions;
    } else if(classname === 'Function') {
        lations = trans.Function;
    } else if(classname === 'Context') {
      lations = trans.Context;
    } else if(classname === 'Story') {
      lations = trans.Story;
    } else if(classname === 'Source') {
      lations = trans.Sources;
    } else if(classname === 'Experts') {
       lations = trans.Expert;
    } else if(classname === 'Users') {
      lations = trans.User;
    } else if(classname === 'LivingSystem') {
      lations = trans.BSystem;
    } else if(classname === 'DSystem') {
      lations = trans.DSystem;
    } else if(classname === 'Image') {
      lations = trans.Image;
    } else if(classname === 'Media') {
      lations = trans.Media;
    } else if(classname === 'Collection') {
      lations = trans.Collection;
    } else {
      lations = trans.Default;
    }
    return lations;
  },

  render: function() {
    var item = this.props.item;
    var routeName, itemLabel;
    if(this.props.routeName) {
      routeName = this.props.routeName;
    } else if(this.props.item['@class'] ){
      var translations = this.classTranslator(this.props.item['@class']);
      routeName = translations.route;
      itemLabel = translations.displayName;
    }
    var link = '../' + routeName + '/' + item.masterid;
    var title = this.props.titleField;
    var subTitle= this.props.subtitleField;
    if (routeName === 'b.system')  {
      title = this.props.item.common_name ? this.props.item.common_name : 'Common Name';
      subTitle = this.props.item.taxon + ': ' + this.props.item.name;
    }
    if (routeName === 'media') {
      subTitle = this.props.item.description;
    }
    return (
      <Col xs={12} sm={this.props.narrow ? 4 : 12} className='relationship-column'>
        <ButtonToolbar className={'relationship-button' + (!this.props.item.flag_demo ? ' relationship-button--outside-demo' : '')}>
          <Button
            block
            onClick={this.showOptions}
            onMouseLeave={this.hideOptions}
            pullright >
            <MiniHero
              title={title}
              subtitle={subTitle}
              label={itemLabel}
              media={this.props.media}
              thumbs={this.props.item} link={this.clickHandler.bind(null,link)} masterid={item.masterid}
              showOverlay={this.state.showOptions}
              remove={this.props.onRemove.bind(null,item)}
              editable={this.props.editable}
              narrow={this.props.narrow} />
          </Button>
        </ButtonToolbar>
      </Col>
    );
  }
});

module.exports = RelationshipListItem;
