'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var EOITextArr = ['                                              ', ' xxx x      xx  x     x xxxx x   x  xx  x   x ', '  x  x     x  x x     x x     x x  x  x x   x ', '  x  x     x  x  x   x  xxxx   x   x  x x   x ', '  x  x     x  x   x x   x      x   x  x x   x ', ' xxx xxxxx  xx     x    xxxx   x    xx   xxx  ', '                                              '];
var EOIArr = [],
    spanLength = 0;
EOITextArr.forEach(function (v, i) {
  spanLength += v.length;
  for (var j = 1; j < v.length; j++) {
    if (v[j] === 'x') {
      EOIArr.push(i * v.length + j);
    }
  }
});

var $ = function $(selectors) {
  return document.querySelector(selectors);
};
var $all = function $all(selectors) {
  return document.querySelectorAll(selectors);
};
var max = 25,
    //图片的最大数值
imgList = [];
for (var i = 0; i < parseInt(EOIArr.length / max); i++) {
  imgList = imgList.concat(Array.from({ length: max }, function (v, i) {
    return './image/face' + (i + 1) + '.jpg';
  }));
}
imgList = imgList.concat(Array.from({ length: EOIArr.length - parseInt(EOIArr.length / max) * max }, function (v, i) {
  return './image/face' + (i + 1) + '.jpg';
}));
//用于展示的图片
var faceList = Array.from({ length: spanLength }, function () {
  var face = document.createElement("span");
  var img = document.createElement("img");
  var i = document.createElement("i");
  i.style.left = '-100%';
  face.appendChild(img);
  face.appendChild(i);
  return face;
});

var box = document.createElement("div");
box.classList.add('eoi-box');
faceList.forEach(function (ele) {
  box.appendChild(ele);
});

document.body.appendChild(box);
//以上是创建dom的过程

var textArr = [].concat(EOIArr);
var imgArr = [].concat(EOIArr);

var imgEles = $all('img');
var spanEles = $all('span');
var iEles = $all('i');
var timer = setInterval(function () {
  var length = textArr.length;
  var showNumber = textArr.splice(Math.random() * length, 1);

  spanEles[showNumber].style.backgroundColor = '#F40';
  imgEles[showNumber].src = imgList.splice(Math.floor(Math.random() * imgList.length), 1);
  iEles[showNumber].style.left = '100%';
  if (!textArr.length) {
    clearInterval(timer);
    showImg();
  }
}, 25);

var imgSrc = Array.from({ length: imgList.length }, function (v, i) {
  return i;
});
var showImg = function showImg() {
  var imgTimer = setInterval(function () {
    var length = imgArr.length;

    var _imgArr$splice = imgArr.splice(Math.random() * length, 1),
        _imgArr$splice2 = _slicedToArray(_imgArr$splice, 1),
        showNumber = _imgArr$splice2[0];

    var _imgSrc$splice = imgSrc.splice(Math.random() * imgSrc.length, 1),
        _imgSrc$splice2 = _slicedToArray(_imgSrc$splice, 1),
        imgIndex = _imgSrc$splice2[0];

    imgEles[showNumber].style.display = 'inline';
    spanEles[showNumber].style.backgroundColor = '#fff';
    iEles[showNumber].style.left = '-100%';

    if (imgArr.length === 0) {
      spanEles[showNumber].classList.add('you');
      clearInterval(imgTimer);
    }
  }, 25);
};