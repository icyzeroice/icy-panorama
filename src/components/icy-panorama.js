import * as THREE from 'three';
import ImgLoading from './icy-loading.js';
import IcyKey from './icy-keyboard.js';

// keyhold, keyend
IcyKey();

/**
 * @param { DomElement } container
 * @param { JOSN } userConfig
 */
class IcyPano {
  constructor({
    container = null,
    picUrl = null,
    viewFov = 60,
    nearPlane = 1,
    farPlane = 1000,
    speed = 1
  } = {}) {

    // container for three.js
    this.container = container;

    // some config options for users to set
    this.userConfig = {
      picUrl: picUrl,
      viewFov: viewFov,
      nearPlane: nearPlane,
      farPlane: farPlane,
      speed: speed
    };

    // initialize
    this.scene = {};
    this.camera = {};
    this.renderer = {};
    this.insideConfig = {
      w: this.container.clientWidth,
      h: this.container.clientHeight,
      previewMode: true,
      direction: null,
      sphereRadius: 5,
      widthSegment: 32,
      heightSegment: 32
    };
  }

  _initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      this.userConfig.viewFov,
      this.insideConfig.w / this.insideConfig.h,
      this.userConfig.nearPlane,
      this.userConfig.farPlane
    );
    this.camera.position.z = 10;
  }

  _initRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.insideConfig.w, this.insideConfig.h);
    this.container.style.overflow = 'hidden';
    this.container.appendChild(this.renderer.domElement);
  }

  _initScene() {
    this.scene = new THREE.Scene();
  }

  _initObject() {

    // add a ball to put a picture
    let geometry = new THREE.SphereBufferGeometry(
      this.insideConfig.sphereRadius,
      this.insideConfig.widthSegment,
      this.insideConfig.heightSegment
    );
    geometry.scale(-1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(this.userConfig.picUrl)
    });
    let panorama = new THREE.Mesh(geometry, material);
    this.scene.add(panorama);
  }

  _renderCircle() {
    let __renderCircle = () => {
      if (this.insideConfig.direction) {
        switch (this.insideConfig.direction) {
          case 'left':
            //this.camera.position.
            break;
          case 'up':
            break;
          case 'right':
            break;
          case 'down':
            break;
          case 'pull':
            break;
          case 'push':
            break;
        }

      }
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(__renderCircle);
    };

    __renderCircle();
  }

  resize() {
    this.insideConfig.w = this.container.clientHeight;
    this.insideConfig.h = this.container.clientWidth;
    this.renderer.setSize(this.insideConfig.w, this.insideConfig.h);
  }

  TVOSOperation() {
    // key hold
    let tvOperation = (e) => {
      switch (e.keyCode) {
        case 37:
          this.insideConfig.direction = 'left';
          break;
        case 38:
          this.insideConfig.direction = 'up';
          break;
        case 39:
          this.insideConfig.direction = 'right';
          break;
        case 40:
          this.insideConfig.direction = 'down';
          break;
        case 13:
          if (holdTime === 2) {
            this.insideConfig.direction = 'pull';
          } else if (holdTime === 3) {
            this.insideConfig.direction = 'push';
          }
          break;
      }
      console.log(this.insideConfig.direction);
    };

    // key end
    let directionClear = () => {
      this.insideConfig.direction = null;
      console.log('keyend');
    };

    // attach event
    document.addEventListener('keyhold', tvOperation, false);
    document.addEventListener('keyend', directionClear, false);

    // return event function handle
    return {
      tvOperation,
      directionClear
    };
  }

  start() {
    this._initScene();
    this._initCamera();
    this._initObject();
    this._initRenderer();
    this._renderCircle();
  }

  suspend({
    tvOperation,
    directionClear
  }) {
    document.removeEventListener('keyhold', tvOperation);
    document.removeEventListener('keyend', directionClear);
  }
}

export default IcyPano;