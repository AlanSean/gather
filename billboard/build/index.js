let EOITextArr =
[
  '                                              ',
  ' xxx x      xx  x     x xxxx x   x  xx  x   x ',
  '  x  x     x  x x     x x     x x  x  x x   x ',
  '  x  x     x  x  x   x  xxxx   x   x  x x   x ',
  '  x  x     x  x   x x   x      x   x  x x   x ',
  ' xxx xxxxx  xx     x    xxxx   x    xx   xxx  ',
  '                                              '
];
let EOIArr = [],spanLength=0;
EOITextArr.forEach((v, i) => {
    spanLength+=v.length;
  for(let j = 1; j < v.length; j++) {
    if (v[j] === 'x') {
      EOIArr.push(i * v.length + j);
    }
  }
})


const $ = selectors => document.querySelector(selectors);
const $all = selectors => document.querySelectorAll(selectors);
    var max=25,//图片的最大数值
        imgList = [];
    for(var i=0;i<parseInt(EOIArr.length/max);i++){
        imgList = imgList.concat(Array.from({ length: max }, function(v, i) {
            return `./image/face${i+1}.jpg`;
        }))
    }
    imgList = imgList.concat(Array.from({ length: EOIArr.length-parseInt(EOIArr.length/max)*max }, function(v, i) {
        return `./image/face${i+1}.jpg`;
    }))
//用于展示的图片
const faceList = Array.from({ length: spanLength }, () => {
    const face = document.createElement("span");
    const img = document.createElement("img");
    const i = document.createElement("i");
    i.style.left = '-100%';
    face.appendChild(img);
    face.appendChild(i);
    return face;
});

const box = document.createElement("div");
box.classList.add('eoi-box');
faceList.forEach(ele => {
    box.appendChild(ele);
});

document.body.appendChild(box);
//以上是创建dom的过程

const textArr = [].concat(EOIArr);
const imgArr = [].concat(EOIArr);

const imgEles = $all('img');
const spanEles = $all('span');
const iEles = $all('i');
const timer = setInterval(() => {
  const length = textArr.length;
  const showNumber = textArr.splice(Math.random() * length, 1);

  spanEles[showNumber].style.backgroundColor = '#F40';
  imgEles[showNumber].src = imgList.splice(Math.floor(Math.random() * imgList.length), 1);
  iEles[showNumber].style.left = '100%';
  if (!textArr.length) {
    clearInterval(timer);
    showImg();
  }
}, 25);

const imgSrc = Array.from({ length: imgList.length }, (v, i) => i);
const showImg = () => {
  const imgTimer = setInterval(() => {
    const length = imgArr.length;
    const [showNumber] = imgArr.splice(Math.random() * length, 1);
    const [imgIndex] = imgSrc.splice(Math.random() * imgSrc.length, 1);
    imgEles[showNumber].style.display = 'inline';
    spanEles[showNumber].style.backgroundColor = '#fff';
    iEles[showNumber].style.left = '-100%';

    if (imgArr.length === 0) {
      spanEles[showNumber].classList.add('you');
      clearInterval(imgTimer);
    }
  }, 25);
}
