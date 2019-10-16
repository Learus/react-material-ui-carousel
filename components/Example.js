"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Carousel = require("./Carousel");

var _Carousel2 = _interopRequireDefault(_Carousel);

var _autoBind = require("auto-bind");

var _autoBind2 = _interopRequireDefault(_autoBind);

require("../style//Example.scss");

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Banner(props) {
    if (props.newProp) console.log(props.newProp);
    var contentPosition = props.contentPosition ? props.contentPosition : "left";
    var totalItems = props.length ? props.length : 3;
    var mediaLength = totalItems - 1;

    var items = [];
    var content = _react2.default.createElement(
        _core.Grid,
        { item: true, xs: 12 / totalItems, key: "content" },
        _react2.default.createElement(
            _core.CardContent,
            { className: "Content" },
            _react2.default.createElement(
                _core.Typography,
                { className: "Title" },
                props.item.Name
            ),
            _react2.default.createElement(
                _core.Typography,
                { className: "Caption" },
                props.item.Caption
            ),
            _react2.default.createElement(
                _core.Button,
                { variant: "outlined", className: "ViewButton" },
                "View Now"
            )
        )
    );

    for (var i = 0; i < mediaLength; i++) {
        var item = props.item.Items[i];

        var media = _react2.default.createElement(
            _core.Grid,
            { item: true, xs: 12 / totalItems, key: item.Name },
            _react2.default.createElement(
                _core.CardMedia,
                {
                    className: "Media",
                    image: item.Image,
                    title: item.Name
                },
                _react2.default.createElement(
                    _core.Typography,
                    { className: "MediaCaption" },
                    item.Name
                )
            )
        );

        items.push(media);
    }

    if (contentPosition === "left") {
        items.unshift(content);
    } else if (contentPosition === "right") {
        items.push(content);
    } else if (contentPosition === "middle") {
        items.splice(items.length / 2, 0, content);
    }

    return _react2.default.createElement(
        _core.Card,
        { raised: true, className: "Banner" },
        _react2.default.createElement(
            _core.Grid,
            { container: true, spacing: 0, className: "BannerGrid" },
            items
        )
    );
}

var items = [{
    Name: "Electronics",
    Caption: "Electrify your friends!",
    contentPosition: "left",
    Items: [{
        Name: "Macbook Pro",
        Image: "https://source.unsplash.com/featured/?macbook"
    }, {
        Name: "iPhone",
        Image: "https://source.unsplash.com/featured/?iphone"
    }]
}, {
    Name: "Home Appliances",
    Caption: "Say no to manual home labour!",
    contentPosition: "middle",
    Items: [{
        Name: "Washing Machine WX9102",
        Image: "https://source.unsplash.com/featured/?washingmachine"
    }, {
        Name: "Learus Vacuum Cleaner",
        Image: "https://source.unsplash.com/featured/?vacuum,cleaner"
    }]
}, {
    Name: "Decoratives",
    Caption: "Give style and color to your living room!",
    contentPosition: "right",
    Items: [{
        Name: "Living Room Lamp",
        Image: "https://source.unsplash.com/featured/?lamp"
    }, {
        Name: "Floral Vase",
        Image: "https://source.unsplash.com/featured/?vase"
    }]
}];

var BannerExample = function (_React$Component) {
    _inherits(BannerExample, _React$Component);

    function BannerExample(props) {
        _classCallCheck(this, BannerExample);

        var _this = _possibleConstructorReturn(this, (BannerExample.__proto__ || Object.getPrototypeOf(BannerExample)).call(this, props));

        _this.state = {
            autoPlay: true,
            timer: 500,
            animation: "fade",
            indicators: true
        };

        (0, _autoBind2.default)(_this);
        return _this;
    }

    _createClass(BannerExample, [{
        key: "toggleAutoPlay",
        value: function toggleAutoPlay() {
            this.setState({
                autoPlay: !this.state.autoPlay
            });
        }
    }, {
        key: "toggleIndicators",
        value: function toggleIndicators() {
            this.setState({
                indicators: !this.state.indicators
            });
        }
    }, {
        key: "changeAnimation",
        value: function changeAnimation(event) {
            this.setState({
                animation: event.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { style: { marginTop: "50px", color: "#494949" } },
                _react2.default.createElement(
                    "h2",
                    null,
                    "Example: eBay\u2122 style"
                ),
                _react2.default.createElement(
                    _Carousel2.default,
                    {
                        className: "Example",
                        autoPlay: this.state.autoPlay,
                        timer: this.state.timer,
                        animation: this.state.animation,
                        indicators: this.state.indicators
                    },
                    items.map(function (item, index) {
                        return _react2.default.createElement(Banner, { item: item, key: index, contentPosition: item.contentPosition });
                    })
                ),
                _react2.default.createElement(
                    _core.FormLabel,
                    { component: "legend" },
                    "Options"
                ),
                _react2.default.createElement(_core.FormControlLabel, {
                    control: _react2.default.createElement(_core.Checkbox, { onChange: this.toggleAutoPlay, checked: this.state.autoPlay, value: "autoplay", color: "primary" }),
                    label: "Auto-play"
                }),
                _react2.default.createElement(_core.FormControlLabel, {
                    control: _react2.default.createElement(_core.Checkbox, { onChange: this.toggleIndicators, checked: this.state.indicators, value: "indicators", color: "primary" }),
                    label: "Indicators"
                }),
                _react2.default.createElement(_core.FormControlLabel, {
                    control: _react2.default.createElement(
                        _core.RadioGroup,
                        { name: "animation", value: this.state.animation, onChange: this.changeAnimation, row: true, style: { marginLeft: "10px" } },
                        _react2.default.createElement(_core.FormControlLabel, { value: "fade", control: _react2.default.createElement(_core.Radio, { color: "primary" }), label: "Fade" }),
                        _react2.default.createElement(_core.FormControlLabel, { value: "slide", control: _react2.default.createElement(_core.Radio, { color: "primary" }), label: "Slide" })
                    )
                })
            );
        }
    }]);

    return BannerExample;
}(_react2.default.Component);

exports.default = BannerExample;