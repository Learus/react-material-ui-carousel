'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Example = require('../components/Example');

var _Example2 = _interopRequireDefault(_Example);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('Example renders without crashing', function () {
    var div = document.createElement('div');
    _reactDom2.default.render(_react2.default.createElement(_Example2.default, null), div);
});