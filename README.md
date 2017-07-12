# 描述

将地图坐标封装，并转换成不同类型的坐标

# 使用方法
1.下载包
```
npm install coord-trans
```
2.引入项目
### webpack 
```
var coordTrans = require('coord-trans');
```
### non-webpack
```
<script src="./cord-trans/index.min.js"></script>
```
3.使用
```
//地球坐标转其他坐标 
//已知gps坐标为纬度：34°40′13.82″ ，经度： 115°50′3.70″
coord = new coordTrans.Coord('34°40′13.82″', '115°50′3.70″');
//coord = new coordTrans.Coord(34.6705056530, 115.8343613148, 'WGS84');
console.log(coord.GCJ02);
//{ latitude: 34.6693585452, longitude: 115.8398437500 } 火星坐标
console.log(coord.BD09);
//{ latitude: 34.6750945279, longitude: 115.8464043544 } 百度坐标

//火星坐标转其他坐标 
//已知火星坐标为纬度：34.6693585452 ，经度： 115.8398437500
coord = new coordTrans.Coord(34.6693585452, 115.8398437500, 'GCJ02');
//coord = new coordTrans.Coord(34.6693585452, 115.8398437500); 默认为火星坐标
console.log(coord.WGS84);
//{ latitude: 34.6705056530, longitude: 115.8343613148 } 地球坐标
console.log(coord.BD09);
//{ latitude: 34.6750945279, longitude: 115.8464043544 } 百度坐标

//百度坐标转其他坐标 
//已知百度坐标为纬度：34.6750945279 ，经度： 115.8464043544
coord = new coordTrans.Coord(34.6750945279, 115.8464043544, 'BD09');
console.log(coord.WGS84);
//{ latitude: 34.6705056530, longitude: 115.8343613148 } 地球坐标
console.log(coord.GCJ02);
//{ latitude: 34.6693585452, longitude: 115.8398437500 } 火星坐标
```
# API
## Class
### Coord
constructor:

name | type | required | default
:-:|:-:|:-:|:-: 
latitude | string&#124;number | true | -
longitude | string&#124;number | true | -
type | string ('WGS84', 'GCJ02', 'BD09') | false | 'GCJ02'

