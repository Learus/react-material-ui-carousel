'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('@material-ui/core');

var _autoBind = require('auto-bind');

var _autoBind2 = _interopRequireDefault(_autoBind);

var _FiberManualRecord = require('@material-ui/icons/FiberManualRecord');

var _FiberManualRecord2 = _interopRequireDefault(_FiberManualRecord);

var _NavigateBefore = require('@material-ui/icons/NavigateBefore');

var _NavigateBefore2 = _interopRequireDefault(_NavigateBefore);

var _NavigateNext = require('@material-ui/icons/NavigateNext');

var _NavigateNext2 = _interopRequireDefault(_NavigateNext);

require('../style/Carousel.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Carousel = function (_Component) {
    _inherits(Carousel, _Component);

    function Carousel(props) {
        _classCallCheck(this, Carousel);

        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

        _this.state = {
            active: 0,
            autoPlay: _this.props.autoPlay !== undefined ? _this.props.autoPlay : true,
            interval: _this.props.interval !== undefined ? _this.props.interval : 4000
        };

        _this.timer = null;

        (0, _autoBind2.default)(_this);
        return _this;
    }

    _createClass(Carousel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.start();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.stop();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevProps.autoPlay !== prevState.autoPlay || prevProps.interval !== prevState.interval) {
                this.reset();
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }
    }, {
        key: 'start',
        value: function start() {
            if (this.state.autoPlay) {
                this.timer = setInterval(this.next, this.state.interval);
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.stop();

            if (this.state.autoPlay) {
                this.start();
            }
        }
    }, {
        key: 'pressIndicator',
        value: function pressIndicator(index) {
            this.setState({
                active: index
            }, this.reset);
        }
    }, {
        key: 'next',
        value: function next(event) {
            var next = this.state.active + 1 > this.props.children.length - 1 ? 0 : this.state.active + 1;

            this.setState({
                active: next
            }, this.reset);

            if (event) event.stopPropagation();
        }
    }, {
        key: 'prev',
        value: function prev(event) {
            var prev = this.state.active - 1 < 0 ? this.props.children.length - 1 : this.state.active - 1;

            this.setState({
                active: prev
            }, this.reset);

            if (event) event.stopPropagation();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var indicators = this.props.indicators !== undefined ? this.props.indicators : true;
            var animation = this.props.animation !== undefined ? this.props.animation : "fade";

            return _react2.default.createElement(
                'div',
                { className: 'Carousel ' + (this.props.className ? this.props.className : ""), onMouseEnter: this.stop, onMouseOut: this.reset },
                Array.isArray(this.props.children) ? this.props.children.map(function (child, index) {
                    return _react2.default.createElement(CarouselItem, { key: index, active: index === _this2.state.active ? true : false, child: child, animation: animation });
                }) : _react2.default.createElement(CarouselItem, { key: 0, active: true, child: this.props.children }),
                _react2.default.createElement(
                    'div',
                    { className: 'Next ButtonWrapper' },
                    _react2.default.createElement(
                        _core.IconButton,
                        { className: 'Next Button mui--align-middle', onClick: this.next },
                        _react2.default.createElement(_NavigateNext2.default, null)
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'Prev ButtonWrapper' },
                    _react2.default.createElement(
                        _core.IconButton,
                        { className: 'Prev Button mui--align-middle', onClick: this.prev },
                        _react2.default.createElement(_NavigateBefore2.default, null)
                    )
                ),
                indicators ? _react2.default.createElement(Indicators, { length: this.props.children.length, active: this.state.active, press: this.pressIndicator }) : null
            );
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            if (nextProps.autoPlay !== prevState.autoPlay || nextProps.interval !== prevState.interval) {
                return {
                    autoPlay: nextProps.autoPlay !== undefined ? nextProps.autoPlay : true,
                    interval: nextProps.interval !== undefined ? nextProps.interval : 4000
                };
            } else return null;
        }
    }]);

    return Carousel;
}(_react.Component);

exports.default = Carousel;


function CarouselItem(props) {
    return (
        // props.active ? 
        // (
        _react2.default.createElement(
            'div',
            { className: 'CarouselItem', hidden: !props.active },
            props.animation === "slide" ? _react2.default.createElement(
                _core.Slide,
                { direction: 'left', 'in': props.active, timeout: 200 },
                _react2.default.createElement(
                    'div',
                    null,
                    props.child
                )
            ) : _react2.default.createElement(
                _core.Fade,
                { 'in': props.active, timeout: 500 },
                _react2.default.createElement(
                    'div',
                    null,
                    props.child
                )
            )
        )
        // ) : null

    );
}

function Indicators(props) {
    var indicators = [];

    var _loop = function _loop(i) {
        var className = i === props.active ? "Active Indicator" : "Indicator";
        var item = _react2.default.createElement(_FiberManualRecord2.default, { key: i, size: 'small', className: className, onClick: function onClick() {
                props.press(i);
            } });

        indicators.push(item);
    };

    for (var i = 0; i < props.length; i++) {
        _loop(i);
    }

    return _react2.default.createElement(
        'div',
        { className: 'Indicators' },
        indicators
    );
}