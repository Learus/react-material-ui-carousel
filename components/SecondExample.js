'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Carousel = require('./Carousel');

var _Carousel2 = _interopRequireDefault(_Carousel);

var _autoBind = require('auto-bind');

var _autoBind2 = _interopRequireDefault(_autoBind);

var _core = require('@material-ui/core');

require('../style/SecondExample.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Project(props) {
    return _react2.default.createElement(
        _core.Paper,
        {
            className: 'Project',
            style: {
                backgroundColor: props.item.color
            },
            elevation: 10
        },
        _react2.default.createElement(
            'h2',
            null,
            props.item.name
        ),
        _react2.default.createElement(
            'p',
            null,
            props.item.description
        ),
        _react2.default.createElement(
            _core.Button,
            { className: 'CheckButton' },
            'Check it out!'
        )
    );
}

var items = [{
    name: "Lear Music Reader",
    description: "A PDF Reader specially designed for musicians.",
    color: "#64ACC8"
}, {
    name: "Hash Code 2019",
    description: "My Solution on the 2019 Hash Code by Google Slideshow problem.",
    color: "#7D85B1"
}, {
    name: "Terrio",
    description: "A exciting mobile game game made in the Unity Engine.",
    color: "#CE7E78"
}, {
    name: "React Carousel",
    description: "A Generic carousel UI component for React using material ui.",
    color: "#C9A27E"
}];

var MyProjectsExample = function (_React$Component) {
    _inherits(MyProjectsExample, _React$Component);

    function MyProjectsExample(props) {
        _classCallCheck(this, MyProjectsExample);

        var _this = _possibleConstructorReturn(this, (MyProjectsExample.__proto__ || Object.getPrototypeOf(MyProjectsExample)).call(this, props));

        _this.state = {
            autoPlay: true,
            timer: 500,
            animation: "fade",
            indicators: true
        };

        (0, _autoBind2.default)(_this);
        return _this;
    }

    _createClass(MyProjectsExample, [{
        key: 'toggleAutoPlay',
        value: function toggleAutoPlay() {
            this.setState({
                autoPlay: !this.state.autoPlay
            });
        }
    }, {
        key: 'toggleIndicators',
        value: function toggleIndicators() {
            this.setState({
                indicators: !this.state.indicators
            });
        }
    }, {
        key: 'changeAnimation',
        value: function changeAnimation(event) {
            this.setState({
                animation: event.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: { marginTop: "50px", color: "#494949" } },
                _react2.default.createElement(
                    'h2',
                    null,
                    'Example: Learus Projects (random)'
                ),
                _react2.default.createElement(
                    _Carousel2.default,
                    {
                        className: 'SecondExample',
                        autoPlay: this.state.autoPlay,
                        timer: this.state.timer,
                        animation: this.state.animation,
                        indicators: this.state.indicators
                    },
                    items.map(function (item, index) {
                        return _react2.default.createElement(Project, { item: item, key: index });
                    })
                ),
                _react2.default.createElement(
                    _core.FormLabel,
                    { component: 'legend' },
                    'Options'
                ),
                _react2.default.createElement(_core.FormControlLabel, {
                    control: _react2.default.createElement(_core.Checkbox, { onChange: this.toggleAutoPlay, checked: this.state.autoPlay, value: 'autoplay', color: 'primary' }),
                    label: 'Auto-play'
                }),
                _react2.default.createElement(_core.FormControlLabel, {
                    control: _react2.default.createElement(_core.Checkbox, { onChange: this.toggleIndicators, checked: this.state.indicators, value: 'indicators', color: 'primary' }),
                    label: 'Indicators'
                }),
                _react2.default.createElement(_core.FormControlLabel, {
                    control: _react2.default.createElement(
                        _core.RadioGroup,
                        { name: 'animation', value: this.state.animation, onChange: this.changeAnimation, row: true, style: { marginLeft: "10px" } },
                        _react2.default.createElement(_core.FormControlLabel, { value: 'fade', control: _react2.default.createElement(_core.Radio, { color: 'primary' }), label: 'Fade' }),
                        _react2.default.createElement(_core.FormControlLabel, { value: 'slide', control: _react2.default.createElement(_core.Radio, { color: 'primary' }), label: 'Slide' })
                    )
                })
            );
        }
    }]);

    return MyProjectsExample;
}(_react2.default.Component);

exports.default = MyProjectsExample;