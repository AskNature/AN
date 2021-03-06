/**
* Detail Edge Lists (component)
*/
'use strict';

var React = require('react');
var TextField = require('../../modules/textfield.jsx');

var TextArea = React.createClass({
  render: function() {
    var item = this.props.item;
    // Remove html:
    if (this.props.item) {
    // item = item.replace(/<(?:.|\n)*?>/gm, '');
    // Remove backslashes:
    if(item.replace) {
        item = item.replace(/\\/g, '');
	item = item.replace(/&nbsp;/g, '');
    }	 
  }

    var title = this.props.title;
      return (
        <div style={this.props.forceWrap ? {wordWrap:'break-word'} : {}}>
          {this.props.title ? (
            <h6 className='heading'>
              {title}
            </h6>)
          : ''}
          {this.props.editable ?
            <TextField
              store={this.props.store}
              actions={this.props.actions}
              enableBlockMode={false}
              fieldName={this.props.fieldName}
              initialValue={item}
              editable={this.props.editable}
              prompt={this.props.prompt}
              placeholder={this.props.placeholder} />
          : this.props.link ?
            <a href={item} target='_blank'>
              {<span dangerouslySetInnerHTML={{__html: item}} />}
            </a>
          :
            <p>
              {<span dangerouslySetInnerHTML={{__html: item}} />}
            </p>
          }
        </div>
      );
  }
});

module.exports = TextArea;
