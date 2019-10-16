'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Example = require('../lib/components/Example');

var _Example2 = _interopRequireDefault(_Example);

var _SecondExample = require('../lib/components/SecondExample');

var _SecondExample2 = _interopRequireDefault(_SecondExample);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
    return _react2.default.createElement(
        'div',
        { style: { padding: "40px 100px", backgroundColor: "#ebebeb" } },
        _react2.default.createElement(
            'h1',
            { style: { color: "#494949" } },
            'React Material UI Carousel Demo'
        ),
        _react2.default.createElement(
            'p',
            { style: { marginBottom: "30px" } },
            'by ',
            _react2.default.createElement(
                'a',
                { href: 'http://learus.github.io', style: { textDecoration: "none", color: "cornflowerblue" } },
                'Learus'
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
                'a',
                { href: 'https://github.com/Learus/react-material-ui-carousel.git', style: { textDecoration: "none", color: "cornflowerblue" } },
                'GitHub Repo'
            )
        ),
        _react2.default.createElement(_Example2.default, null),
        _react2.default.createElement(_SecondExample2.default, null)
    );
};

exports.default = App;