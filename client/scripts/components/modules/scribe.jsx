'use strict';
var React = require('react');
var Scribe = require('scribe-editor');

var ScribeTextField = React.createClass({
  getInitialState: function() {
    var initialStruct = this.props.store.get();
    var initialValue;
    if(this.props.initialValue) {
      initialValue = this.props.initialValue;
    } else {
      initialValue = '';
    }
    return {
      html: initialValue,
      gotUpdate: true
    };
  },
    componentDidMount: function() {
        var that = this;
        var scribeElement = this.refs.scribe.getDOMNode();
	var scribe = new Scribe(scribeElement, { allowBlockElements: (this.props.enableBlockMode ? true : false) });
        this.setState({scribe: scribe}, function() {
            scribe.on('content-changed', updateData);
            function updateData() {
                if(!that.state.gotUpdate) {
		    var html = scribe.getHTML();
		    if(html.indexOf('<p>') === 0) {
		        html = html.substring(3, html.length - 4);
		    }
                    var index = html.lastIndexOf("<br");
		    var htmlClean = html.substring(0, (((html.length - index) <= 5 && index != -1) ? index : html.length));
                    that.setState({html: htmlClean});
		    var updatedStuff = {};
		    updatedStuff[that.props.fieldName] = htmlClean;
		    that.props.actions.update(updatedStuff);
		    if(that.props.fieldName === 'name') {
		        console.log('got a new name: ' + htmlClean);
		    }
		} else {
		    that.setState({gotUpdate: false});
		}
            }
            scribe.setContent(this.state.html);
	});
    },
    componentWillReceiveProps: function(newProps) {
	if(this.state.html != newProps.initialValue && newProps.initialValue !== undefined) {
	    this.setState({gotUpdate: true}, function() {
		this.state.scribe.setContent(newProps.initialValue);
	    });
	}
    },
    render: function() {
        return (
	    <div>
	        {this.state.html == '' ? <div className='placeholder'>{this.props.placeholder}</div> : ''}
	        <div className="editable" contentEditable="true" ref="scribe" />
	    </div>
	)
    }
});

module.exports = ScribeTextField;
