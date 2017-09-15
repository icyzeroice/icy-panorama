import loadingUrl from '../assets/loading.gif'

function ImgLoading(picUrl, container, callback) {
  let xhr = new XMLHttpRequest();
  let process = new processLoading(container);

  process.init();

  // request config
  xhr.onprogress = function (e) {
  	if (e.lengthComputable) {
  		process.update(e.loaded, e.total);
  	} else {
  		process.remove();
  	}
  }

  xhr.onloadend = function () {
  	process.remove();
    imageReader(this.response, callback);
  };

  // send request
  xhr.open('GET', picUrl);
  xhr.responseType = 'blob';
  xhr.setRequestHeader('Accept', 'image/*,*/*;q=0.9');
  xhr.send();
}

function processLoading(container) {
  this.windowColor = '#4e72cc';
  this.barColor = '#31477f';
  this.fontColor = '#ffffff';
  this.processWindow = document.createElement('div');
  this.processBar = document.createElement('div');
  this.processInfo = document.createElement('div');

  this.init = function () {
    this.processWindow.style.position = 'absolute';
    this.processWindow.style.zIndex = 20;
    this.processWindow.style.width = '100%';
    this.processWindow.style.height = '100%';
    this.processWindow.style.backgroundColor = this.windowColor;
    this.processWindow.style.opacity = 1;

    this.processBar.style.position = 'absolute';
    this.processBar.style.width = 0;
    this.processBar.style.height = '100%';
    this.processBar.style.backgroundColor = this.barColor;

    this.processInfo.style.position = 'absolute';
    this.processInfo.style.bottom = '51%';
    this.processInfo.style.left = '40%';
    this.processInfo.style.width = '20%';
    this.processInfo.style.fontSize = 50;
    this.processInfo.style.textAlign = 'center';
    this.processInfo.style.color = this.fontColor;

    let loadingImg = new Image();
    loadingImg.src = loadingUrl;
    loadingImg.style.position = 'absolute';
    loadingImg.style.zIndex = 30;
    loadingImg.style.height ='5%';
    loadingImg.style.top = '50%';
    loadingImg.style.left = '48.6%';

    container.appendChild(this.processWindow);
    this.processWindow.appendChild(loadingImg);
    this.processWindow.appendChild(this.processBar);
    this.processWindow.appendChild(this.processInfo);
  };

  this.update = function (loaded, total) {
    let loadedSize = (loaded / 1024).toFixed(2) + 'K';
    let totalSize = (total / 1024).toFixed(2) + 'K'
    let percent = loaded / total * 100;

    let text = loadedSize + ' / ' + totalSize;

    this.processBar.style.width = percent + '%';
    this.processInfo.innerText = text;
  };

  this.remove = function () {
    let times = 50;
    let delay = 1000;
    let t = setInterval(() => {
      this.processWindow.style.opacity -= 1 / times;
    }, delay / times);
    setTimeout(() => {
      clearInterval(t);
      this.processWindow.remove();
    }, delay);
  };
}

function imageReader(response, callback) {
  let imgRead = new FileReader();
  imgRead.readAsDataURL(response);
  imgRead.onload = function (e) {
    // true data url
    callback(e.target.result);
  }
}

export default ImgLoading;