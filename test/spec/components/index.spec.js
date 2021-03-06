/**
*   Index Component Spec Test
*/

/*jshint expr: true*/

'use strict';

var React = require('react');
var IndexComponent = React.createFactory(require('../../../client/scripts/components/index.jsx'));

describe('Index Component', function() {

    var ReactTestUtils;
    var reactRender;

    beforeEach(function() {
        ReactTestUtils = require('react/addons').addons.TestUtils;
        reactRender = ReactTestUtils.renderIntoDocument;
        this.indexComponent = new IndexComponent();
    });

    it('provides the "Index Component" instance', function() {
        // Expect it to exist
        expect(this.indexComponent).to.be.ok;
    });

    it('must know the answer to life, the universe, and everything', function() {
        var answer = 42;
        expect(answer).to.equal(42);
    });

});
