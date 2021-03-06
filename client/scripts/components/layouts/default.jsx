
'use strict';

var React = require('react');

var pageStore = require('../../stores/page');
var accountStore = require('../../stores/accounts');
var accountActions = require('../../actions/accounts');
var Navbar = require('../modules/navbar.jsx');
var Drawer = require('../modules/sidebar.jsx');

var getState = function() {
  var drawerSwitch = false;
  if(window.innerWidth >= 768) {
    drawerSwitch = true;
  }
    return {
        title: pageStore.get().title,
	     account: accountStore.get(),
        drawerOpen: drawerSwitch
    };
};

var Detail = React.createClass({

  render: function() {
    return (
        <div className={this.props.narrow ? 'default detail' : 'default'}>
            <div className="main-container">
                <div className="content">
                    {this.props.children}
                </div>
            </div>
            <div className={this.props.narrow ? 'disabled-overlay visible' : 'disabled-overlay'} onClick={this.props.toggle} ></div>
        </div>

    );
  }
});

var DefaultComponent = React.createClass({
    mixins: [pageStore.mixin, accountStore.mixin],
    getInitialState: function() {
        return (
          getState()
        );
    },
    componentWillMount: function() {
        accountActions.fetchUser();
    },
    componentDidMount: function() {
        pageStore.emitChange();
        window.addEventListener('resize', this.handleResize);
        if(window.attachEvent) {
          // Provides compatibility for IE <9
          window.attachEvent('onresize', this.handleResize);
        } else if(window.addEventListener) {
          // Compatibility for everything else
          window.addEventListener('resize', this.handleResize, true);
        } else {
          //The browser does not support Javascript event binding
          console.log('The browser does not support Javascript event binding');
        }
    },
    componentWillUnmount: function () {
      if(window.detachEvent) {
    window.detachEvent('onresize', this.handleResize);
}
else if(window.removeEventListener) {
    window.removeEventListener('resize', this.handleResize);
}
else {
    //The browser does not support Javascript event binding
    console.log('The browser does not support Javascript event binding');

}
    },
    handleDrawerToggleClick: function(e){
      this.setState({
        drawerOpen: !this.state.drawerOpen
      });
    },
    handleSearchFocus: function(e){
      this.setState({
        drawerOpen: true
      });
    },
    // This needs to find a new home where it can get events from sidebar drawer clicks:
    handleResultClick: function(e) {
      e.persist();
      var drawerSwitch;
      if(window.innerWidth < 768) {
        drawerSwitch = false;
      } else {
        drawerSwitch = true;
      }
      this.setState({drawerOpen: drawerSwitch});
    },
    handleResize: function(e) {
      var drawerSwitch;
      if(window.innerWidth < 768) {
        drawerSwitch = false;
      } else {
        drawerSwitch = true;
      }
      this.setState({drawerOpen: drawerSwitch});
    },

    render: function() {
      console.log('Account:');
      console.log(this.state.account);

        return (
            /* jshint ignore:start */
            <div>


            <Navbar searchQuery={this.props.searchQuery} searchQueryChange={this.props.searchQueryChange} account={this.state.account} onDrawerToggleClick={this.handleDrawerToggleClick}
              onSearchFocus={this.handleSearchFocus} accountActions={accountActions}  />
            <Drawer open={this.state.drawerOpen} searchResultElements={this.props.searchResultElements} searchResultComponent={this.props.searchResultComponent} searchResultHeight={this.props.searchResultHeight} loggedIn={this.state.account.loggedIn} onResultClick={this.handleResultClick}
              master={this.props.master}
              mobile={window.innerWidth < 768 ? true : false}/>
            <Detail narrow={this.state.drawerOpen} toggle={this.handleDrawerToggleClick} {...this.props}/>

            </div>
            /* jshint ignore:end */
        );
    },
    // Event handler for 'change' events coming from store mixins.
    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = DefaultComponent;
