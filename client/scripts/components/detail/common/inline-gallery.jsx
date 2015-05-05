'use strict';

var React = require('react'),

PackeryMixin = require('react-packery-mixin'),

Button = require('react-bootstrap').Button,
ModalTrigger = require('react-bootstrap').ModalTrigger,
Modal = require('react-bootstrap').Modal,
Well = require('react-bootstrap/Well'),
Col = require('react-bootstrap/Col'),
Row = require('react-bootstrap/Row'),
Grid = require('react-bootstrap/Grid');

var Slider = require('react-slick');

var packeryOptions = {
    transitionDuration: 0,
    itemSelector: '.gallery-item',
    gutter: 0,
    percentPosition: true,
    columnWidth: '.grid-sizer'
};

var GalleryModal = React.createClass({
  render: function() {
    var settings = {
      accessibility: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: this.props.mediaKey ? this.props.mediaKey : 0
    };
    return (
      <Modal {...this.props} bsStyle='primary' title={this.props.title} animation={true} key>
        <div className='modal-body an-gallery'>
            <Slider {...settings}>
              {this.props.galleryElements}
            </Slider>
        </div>
      </Modal>
    );
  }
});

var Gallery = React.createClass({

  mixins: [new PackeryMixin('packeryContainer', packeryOptions)],

  render: function() {

    var detail = this.props.items;
    var pictures = detail.media;
    var masterid = detail.masterid;
    var that = this;
    var galleryElements = this.props.items.media ? this.props.items.media.map(function(image, i){
      var mediaurl = image.media_url ? image.media_url : 'http://www.asknature.org/images/uploads/'+ image.entity + '/' + masterid + '/' + image.filename;

      return (
        <div>
          <img key={i} src={mediaurl} style={{maxHeight: that.props.windowHeight*0.6, maxWidth: '100%'}}/>
          <Grid>
            <Row>
              <Col xs={12}>
                <p className='gallery-caption' style={{display:'block', maxHeight: that.props.windowHeight*0.2,overflow:'scroll'}}>{image.description}</p>
              </Col>
              <Col xs={12} sm={6}>
                <Well bsSize='small'>
                  <h6 className='heading'>License Type</h6>
                  <a href={image.out_HasLicense[0].info_url} target='_blank'>{image.out_HasLicense[0].name}</a>
                </Well>
              </Col>
              <Col xs={12} sm={6}>
                <Well bsSize='small'>
                  <h6 className='heading'>Original Attribution</h6>
                <p>{image.author}</p>
                  <a href={image.source_url} target='_blank'>View Original</a>
                </Well>
              </Col>
            </Row>
          </Grid>

          </div>
      );
    }) : [];
    var galleryItemWidth, galleryItemHeight;
    if(this.props.items.media.length) {
    if(this.props.items.media.length <= 2) {
      galleryItemWidth = '50%';
      galleryItemHeight = '200px';
    } else if(this.props.items.media.length === 3) {
      galleryItemWidth = '33.3%';
      galleryItemHeight = '150px';
    } else if(this.props.items.media.length >= 4) {
      galleryItemWidth = '25%';
      galleryItemHeight = '120px';
    }
    }
    var galleryItemStyle = {width: galleryItemWidth, height: galleryItemHeight};
    var childElements = this.props.items.media ? this.props.items.media.map(function(image, i){
      var mediaurl = image.media_url ? image.media_url : 'http://www.asknature.org/images/uploads/'+ image.entity + '/' + masterid + '/' + image.filename;

      return (
        <div className='gallery-item' key={i} style={galleryItemStyle}>
        <ModalTrigger key={i} modal={<GalleryModal galleryElements={galleryElements} mediaKey={i} key={i} title={that.props.title} />}>
          <div className='gallery-thumbnail' style={{backgroundImage: 'url('+mediaurl+')'}} />
    </ModalTrigger>
  </div>
      );
    }) : [];

    return (
      <div>
      <div ref='packeryContainer' className='grid-container'>
        <div className='grid-sizer' style={galleryItemStyle}></div>
        {childElements}
      </div>

      </div>
    );
  }
});

module.exports = Gallery;
