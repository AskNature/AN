/**
* Detail Hero (component)
*/
'use strict';

var React = require('react'),

TextArea = require('./textarea.jsx'),
Label = require('react-bootstrap').Label,
Grid = require('react-bootstrap').Grid,
Row = require('react-bootstrap').Row,
Col = require('react-bootstrap').Col,
Panel = require('react-bootstrap').Panel,
PanelGroup = require('react-bootstrap').PanelGroup,

Avatar = require('react-avatar');

String.prototype.trunc =
     function(n,useWordBoundary){
         var toLong = this.length>n,
             s_ = toLong ? this.substr(0,n-1) : this;
         s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
         return  toLong ? s_ + ' ... ' : s_;
      };

var HeroLinkComponent = React.createClass({
  getInitialState: function() {
    return ({expanded: false});
  },
  toggleExpansion: function() {
    this.setState({expanded: !this.state.expanded});
  },
  render: function() {
    var mediaurl, heroStyle;
    if(this.props.imgurl){
      mediaurl = this.props.imgurl;
      heroStyle = {
        backgroundImage: 'url(' + mediaurl + ')'
      };
    } else if(this.props.media && this.props.media.length > 0) {
         mediaurl = this.props.media[0].media_url ? this.props.media[0].media_url : 'http://www.asknature.org/images/uploads/'+ this.props.media[0].entity + '/' + this.props.masterid + '/' + this.props.media[0].filename;
        heroStyle = {
          backgroundImage: 'url(' + mediaurl + ')'
        };
      } else {
        heroStyle = {
        };
      }
      var shortDescription = this.props.description;
      if(shortDescription && shortDescription.length >= 200){
        shortDescription = (
          <span>
          {this.props.description.trunc(200,true)}
          {this.props.editable ? '' : <Label onClick={this.toggleExpansion}>{this.state.expanded ? '- Less' : '+ More'}</Label>}
          </span>
        );
      }
      var title = (
        <TextArea
          item={this.props.primarytitle}
          editable={this.props.editable}
          store={this.props.store}
          actions={this.props.actions}
          fieldName={this.props.primarykey}
          placeholder='Add a title' />
      );
      var secondary_title = (
        <TextArea
          item={this.props.secondarytitle}
          editable={this.props.editable}
          store={this.props.store}
          actions={this.props.actions}
          fieldName={this.props.secondarykey}
          placeholder="Enter the name of this link's source" />
      );
    return (
      /* jshint ignore:start */
      <div className={this.state.expanded || this.props.editable ? 'hero-link expanded' : 'hero-link'}>
      <Grid>
        <Row>
          <Col xs={12}>
      <Grid>
        <Row className='hero-link-card'>

          <Col xs={12} sm={4} className='hero-link-image'>
            <section className="hero" style={heroStyle}>
              <div className="white-gradient-overlay">
              </div>
            </section>
          </Col>
<Col xs={12} sm={8} smOffset={4}>
  <h6 className='heading'>
    {this.props.label}
  </h6>
  {this.props.editable ?
  <TextArea
    item={this.props.primarylink}
    editable={this.props.editable}
    store={this.props.store}
    actions={this.props.actions}
    fieldName={this.props.primarylinkkey}
    placeholder='Enter a URL for this resource'
    forceWrap
    link
    />
  : '' }

  <h2 style={{marginTop: '8px', marginBottom: 0, fontWeight: '800'}}>
    {!this.props.editable && this.props.primarylink ? (
      <a href={this.props.primarylink} target='_blank'>
        {this.props.primarytitle}
      </a>
    ) : (
      <span>
        {title}
      </span>
    ) }
  </h2>
  <h4 style={{marginTop:0}}>{shortDescription}
  </h4>

<h5 style={{fontWeight: '400', color: '#999', marginTop: 0}}>
  {!this.props.editable && this.props.primarylink ?
      <a href={this.props.primarylink} target='_blank'>
        {this.props.secondarytitle}
      </a>
     :
     <span>
       {secondary_title}
     </span>
  }
</h5>
</Col>



          </Row>
          <Row className='hero-link-card hero-link-card-expansion'>
            <Col xs={12}>
              <TextArea
                item={this.props.description}
                editable={this.props.editable}
                store={this.props.store}
                actions={this.props.actions}
                fieldName='description'
                placeholder='Enter a description' />
            </Col>
          </Row>
        </Grid>
        </Col>
      </Row>
    </Grid>
      </div>
      /* jshint ignore:end */
    );
  }
});

var HeroComponent = React.createClass({
  render: function() {
    var mediaurl, heroStyle;
    if(this.props.imgurl){
      mediaurl = this.props.imgurl;
      heroStyle = {
        backgroundImage: 'url(' + mediaurl + ')'
      };
    } else if(this.props.media && this.props.media.length > 0) {
         mediaurl = this.props.media[0].media_url ? this.props.media[0].media_url : 'http://www.asknature.org/images/uploads/'+ this.props.media[0].entity + '/' + this.props.masterid + '/' + this.props.media[0].filename;
        heroStyle = {
          backgroundImage: 'url(' + mediaurl + ')'
        };
      } else {
        heroStyle = {
          backgroundImage: 'none',
          height: '300px !important'
        };
      }
    return (
      /* jshint ignore:start */
      <section className="hero" style={heroStyle}>
        <div className="texture-overlay">
        </div>
        <Grid>
          <Row className="headline">
            <Col xs={12}>
              <div className='media'>
                {this.props.innerimage ? (
                <div className='media-left media-middle'>
                  <Avatar
                    name={this.props.primarytitle} src={this.props.innerimage}
                    round='true'
                    size='100' />
                </div>
              ) : '' }
                <div className='media-body'>
                  <h6 style={{textTransform:'uppercase',fontWeight:'800',color:'#ffffff', marginBottom: 0}}>
                    {this.props.label}
                  </h6>
                  <h2 style={{marginTop: '8px', marginBottom: 0, fontWeight: '800'}}>
                    {!this.props.editable && this.props.primarylink ? (
                      <Link url={this.props.primarylink}>
                      <TextArea
                        item={!this.props.editable && this.props.primarydisplay ? this.props.primarydisplay : this.props.primarytitle}
                        editable={this.props.editable}
                        store={this.props.store}
                        actions={this.props.actions}
                        fieldName={this.props.primarykey}
                        placeholder='Add a title' />
                    </Link>
                    ) : (
                      this.props.primarykey ?
                      <TextArea
                        item={!this.props.editable && this.props.primarydisplay ? this.props.primarydisplay : this.props.primarytitle}
                        editable={this.props.editable}
                        store={this.props.store}
                        actions={this.props.actions}
                        fieldName={this.props.primarykey}
                        placeholder='Add a title' />
                      :
                        <TextArea
                          item={this.props.primarydisplay ? this.props.primarydisplay : this.props.primarytitle}
                          editable={false}
                           />
                    )}
                  </h2>
                  <h5 className='hero-secondary-title'>
                    {this.props.secondaryprekey ?
                          <TextArea
                          item={this.props.secondarypretitle}
                          editable={this.props.editable}
                          store={this.props.store}
                          actions={this.props.actions}
                          fieldName={this.props.secondaryprekey}
                          placeholder='Enter pretext' />
                     : '' }
                    {this.props.secondarykey ?
                        <span style={this.props.type === 'b.system' ? {fontStyle: 'italic'} : {} } >
                          <TextArea
                          item={this.props.secondarytitle}
                          editable={this.props.editable}
                          store={this.props.store}
                          actions={this.props.actions}
                          fieldName={this.props.secondarykey}
                          placeholder='Enter a subtitle' />
                        </span>
                     :
                      <TextArea
                        item={this.props.secondarytitle}
                        editable={false}
                       />
                     }
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </section>
      /* jshint ignore:end */
    );
  }
});

var Hero = React.createClass({
  render: function() {
    return (
      this.props.type === 'source' ? <HeroLinkComponent {...this.props} /> : <HeroComponent {...this.props} />
    );
  }
});

module.exports = Hero;
