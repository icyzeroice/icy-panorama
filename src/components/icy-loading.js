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
    addStyle(this.processWindow, {
      position: 'absolute',
      zIndex: 20,
      width: '100%',
      height: '100%',
      backgroundColor: this.windowColor,
      opacity: 1
    });

    addStyle(this.processBar, {
      position: 'absolute',
      width: 0,
      height: '100%',
      backgroundColor: this.barColor
    });
    
    addStyle(this.processInfo, {
      position: 'absolute',
      bottom: '51%',
      left: '40%',
      width: '20%',
      fontSize: 50,
      textAlign: 'center',
      color: this.fontColor
    });
    
    let loadingImg = new Image();
    loadingImg.src = loadingUrl;
    
    addStyle(loadingImg, {
      position: 'absolute',
      zIndex: 30,
      height: '5%',
      top: '50%',
      left: '48.6%'
    });
    
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

function addStyle(target, options) {
  for (let attribute in options) {
    target.style[attribute] = options[attribute];
  }
  return this;
}

export default ImgLoading;