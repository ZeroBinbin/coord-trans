(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coord = function () {
    /**
     *
     * @param latitude
     * @param longitude
     * @param type (WGS84 ,GCJ02 ,BD09) 默认为GCJ02
     */
    function Coord(latitude, longitude, type) {
        _classCallCheck(this, Coord);

        if (typeof latitude === "string" && this.testLatitude(latitude)) {
            latitude = this.GPS_WGS84(latitude);
            type = 'WGS84';
        }
        if (typeof longitude === "string" && this.testLongitude(longitude)) {
            longitude = this.GPS_WGS84(longitude);
            type = 'WGS84';
        }
        switch (type) {
            case 'WGS84':
                {
                    var gcj02 = {},
                        bd09 = {};
                    this.WGS84 = {
                        latitude: latitude,
                        longitude: longitude
                    };
                    gcj02 = this.WGS84_GCJ02(latitude, longitude);
                    this.GCJ02 = gcj02;
                    bd09 = this.GCJ02_BD09.apply(this, _toConsumableArray(gcj02));
                    this.BD09 = bd09;
                }
                ;
                break;
            case 'GCJ02':
                {
                    this.GCJ02 = {
                        latitude: latitude,
                        longitude: longitude
                    };
                    this.BD09 = this.GCJ02_BD09(latitude, longitude);
                }
                ;
                break;
            case 'BD09':
                {
                    this.BD09 = {
                        latitude: latitude,
                        longitude: longitude
                    };
                    this.GCJ02 = this.BD09_GCJ02(latitude, longitude);
                }
                ;
                break;
            default:
                {
                    this.GCJ02 = {
                        latitude: latitude,
                        longitude: longitude
                    };
                    this.BD09 = this.GCJ02_BD09(latitude, longitude);
                }
                ;
                break;
        }
    }

    _createClass(Coord, [{
        key: "GPS_WGS84",
        value: function GPS_WGS84(gps) {
            var arr = gps.match(/(\d{1,3})°(\d{1,2})′(\d{1,3})″/);
            var du = arr[1],
                fen = arr[2],
                miao = arr[3];
            return (du + fen / 60 + miao / 3600).toFixed(5);
        }
    }, {
        key: "WGS84_GCJ02",
        value: function WGS84_GCJ02(latitude, longitude) {
            var pi = Math.PI;
            var a = 6378245.0;
            var ee = 0.00669342162296594323;
            function transformLat(x, y) {
                var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.Sqrt(Math.Abs(x));
                ret += (20.0 * Math.Sin(6.0 * x * pi) + 20.0 * Math.Sin(2.0 * x * pi)) * 2.0 / 3.0;
                ret += (20.0 * Math.Sin(y * pi) + 40.0 * Math.Sin(y / 3.0 * pi)) * 2.0 / 3.0;
                ret += (160.0 * Math.Sin(y / 12.0 * pi) + 320 * Math.Sin(y * pi / 30.0)) * 2.0 / 3.0;
                return ret;
            }

            function transformLon(x, y) {
                var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.Sqrt(Math.Abs(x));
                ret += (20.0 * Math.Sin(6.0 * x * pi) + 20.0 * Math.Sin(2.0 * x * pi)) * 2.0 / 3.0;
                ret += (20.0 * Math.Sin(x * pi) + 40.0 * Math.Sin(x / 3.0 * pi)) * 2.0 / 3.0;
                ret += (150.0 * Math.Sin(x / 12.0 * pi) + 300.0 * Math.Sin(x / 30.0 * pi)) * 2.0 / 3.0;
                return ret;
            }
            function outOfChina(lat, lon) {
                if (lon < 72.004 || lon > 137.8347) return true;
                if (lat < 0.8293 || lat > 55.8271) return true;
                return false;
            }

            //
            // World Geodetic System ==> Mars Geodetic System
            if (outOfChina(latitude, longitude)) {
                return {
                    latitude: latitude,
                    longitude: longitude
                };
            }
            var dLat = transformLat(longitude - 105.0, latitude - 35.0);
            var dLon = transformLon(longitude - 105.0, latitude - 35.0);
            var radLat = latitude / 180.0 * pi;
            var magic = Math.Sin(radLat);
            magic = 1 - ee * magic * magic;
            var sqrtMagic = Math.Sqrt(magic);
            dLat = dLat * 180.0 / (a * (1 - ee) / (magic * sqrtMagic) * pi);
            dLon = dLon * 180.0 / (a / sqrtMagic * Math.Cos(radLat) * pi);
            return {
                longitude: longitude + dLon,
                latitude: latitude + dLat
            };
            mgLat = wgLat + dLat;
            mgLon = wgLon + dLon;
        }
    }, {
        key: "GCJ02_BD09",
        value: function GCJ02_BD09(latitude, longitude) {
            var x = longitude,
                y = latitude;

            var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * Math.PI);

            var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * Math.PI);

            return {
                latitude: z * Math.sin(theta) + 0.006,
                longitude: z * Math.cos(theta) + 0.0065
            };
        }
    }, {
        key: "BD09_GCJ02",
        value: function BD09_GCJ02(latitude, longitude) {
            var x = longitude - 0.0065,
                y = latitude - 0.006;

            var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);

            var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);

            return {
                longitude: z * Math.cos(theta),
                latitude: z * Math.sin(theta)
            };
        }
    }, {
        key: "testLongitude",
        value: function testLongitude(longitude) {
            return (/^\-?(((1[0-7]\d{1})|(\d{1,2}))°([0-5]?\d{1})′([0-5]?\d{1})″)|((180)°(00)′(00)″)$/.test(longitude)
            );
        }
    }, {
        key: "testLatitude",
        value: function testLatitude(latitude) {
            return (/^\-?(([0-8]?\d{1})°([0-5]?\d{1})′([0-5]?\d{1})″)|((90)°(00)′(00)″)$/.test(latitude)
            );
        }
    }]);

    return Coord;
}();

exports.default = Coord;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _coord = __webpack_require__(0);

var _coord2 = _interopRequireDefault(_coord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    Coord: _coord2.default
};

/***/ })
/******/ ]);
});