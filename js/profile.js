// Back to: index.html
var homeLink = document.querySelector('#back-link');
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    const currLink = document.URL;
    if (currLink.includes(document.referrer) && history.length > 1) {
        history.go(-1);
    } else {
        window.location.href = homeLink.href;
    }
});

// User agent check
window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// TagCloud
// const isTouchDevice = 'ontouchstart' in document.documentElement;

var cloudKeep = true;
if (mobileAndTabletCheck()) cloudKeep = false;
var cloudOptions = {
    radius: 225,
    maxSpeed: 'normal',
    initSpeed: 'fast',
    direction: 35,
    keep: cloudKeep,
}

cloudRadius();
window.addEventListener("resize", cloudRadius);

var tagCloud = TagCloud('.sphere',[],cloudOptions);
var tagCloudBackground = TagCloud('.sphere-back',[],cloudOptions);
var alreadyTriggered = false;
const cloudElement = document.querySelector('.sphere');

// cloudAnimate();
window.addEventListener('scroll', cloudAnimate);

async function cloudAnimate() {
    const boxTop = cloudElement.getBoundingClientRect().top;

    if ( boxTop < window.innerHeight && !alreadyTriggered ) {
        alreadyTriggered = true;
        await new Promise(r => setTimeout(r, 2300));
        expandCloudAnimate('.sphere',window.Texts,cloudOptions);
    }
}

async function expandCloudAnimate(cloudClass, texts, options) {
    let timeout = 700, newTexts;
    const rad = options.radius;
    for (let i = 0; i < texts.length; i++) {
        newTexts = texts.slice(0, i + 1);
        options.radius = rad / texts.length * (i+1);
        tagCloud.destroy();
        tagCloud = TagCloud(cloudClass, newTexts, options);
        await new Promise(r => setTimeout(r, timeout));
        if (i < 3*texts.length/5) {
            timeout = timeout * 0.7;
        } else {
            timeout = timeout * 1.6;
        }
    }
    for (let i = 0; i < 1; i++) {
        newTexts = shuffle(texts);
        tagCloud.destroy();
        tagCloud = TagCloud(cloudClass, newTexts, options);
        await new Promise(r => setTimeout(r, timeout));
        timeout = timeout * 1.1;
    }
}

function cloudRadius() {
    const width = window.innerWidth;
    if (width < 400) {
        cloudOptions.radius = 150;
    } else if (width < 900) {
        cloudOptions.radius = 200;
    } else {
        cloudOptions.radius = 225;
    }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

var color = '#00FFFF';
document.querySelector('.sphere').style.color = color;
// disable select
window.onload = function() {
    const labels = document.getElementsByTagName('body');
    for (let i = 0; i < labels.length; i++) {
        disableSelection(labels[i]);
    }
};
function disableSelection(element) {
    if (typeof element.onselectstart != 'undefined') {
        element.onselectstart = function() { return false; };
    } else if (typeof element.style.MozUserSelect != 'undefined') {
        element.style.MozUserSelect = 'none';
    } else {
        element.onmousedown = function() { return false; };
    }
}


// SmoothScroll
'use strict';

// const isTouchDevice = 'ontouchstart' in document.documentElement;
// disableScroll();
// if (!isTouchDevice) smoothScroll();

if (!mobileAndTabletCheck()) {
    smoothScroll();

    window.onresize = () => {
      resizeBodyHeight();
    };

    window.onload = () => {
      enableScroll();
      resizeBodyHeight();
    };
}

// Functions

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
}

function smoothScroll() {
  document.querySelector('.viewport').classList.add('SmoothScroll');

  new SmoothScroll({
    target: document.querySelector('.container'),
    scrollEase: 0.08,
    maxOffset: 500,
  });
}

function resizeBodyHeight() {
  document.body.style.height = document.querySelector('.viewport').scrollHeight + 'px';
}