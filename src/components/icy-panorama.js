/!* AUTHOR: Ice Zero */

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
    direction = null,
    degElevation = 0,
    degRotation = 0,
    speed = 2
  } = {}) {

    // container for three.js
    this.container = container;

    // some config options for users to set
    this.userConfig = {
      picUrl: picUrl,
      viewFov: viewFov,
      nearPlane: nearPlane,
      farPlane: farPlane,
      direction: direction,
      degElevation: degElevation,
      degRotation: degRotation,
      speed: speed
    };

    // initialize
    this.scene = {};
    this.camera = {};
    this.renderer = {};
    this.target = {};
    this.insideConfig = {
      w: this.container.clientWidth,
      h: this.container.clientHeight,
      previewMode: true,
      sphereRadius: 500,
      widthSegment: 32,
      heightSegment: 32
    };
  }

  _initCamera() {
    this.target = new THREE.Vector3();
    this.camera = new THREE.PerspectiveCamera(
      this.userConfig.viewFov,
      this.insideConfig.w / this.insideConfig.h,
      this.userConfig.nearPlane,
      this.userConfig.farPlane
    );
    this.camera.position.z = 0;
    this.camera.position.x = 0;
    this.camera.position.y = 0;
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

  _initObject(img) {

    // add a ball to put a picture
    let geometry = new THREE.SphereBufferGeometry(
      this.insideConfig.sphereRadius,
      this.insideConfig.widthSegment,
      this.insideConfig.heightSegment
    );
    geometry.scale(-1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(img)
    });
    let panorama = new THREE.Mesh(geometry, material);
    this.scene.add(panorama);
  }

  _renderCircle() {
    let __renderCircle = () => {
      if (this.userConfig.direction) {
        switch (this.userConfig.direction) {
          case 'left':
            this.userConfig.degRotation = FloatCount(this.userConfig.degRotation, -this.userConfig.speed);
            // if (this.userConfig.degRotation > 179) {
            //   this.userConfig.degRotation -= 360;
            // }
            break;
          case 'up':
            if (this.userConfig.degElevation > 85) break;
            this.userConfig.degElevation = FloatCount(this.userConfig.degElevation, this.userConfig.speed);
            break;
          case 'right':
            this.userConfig.degRotation = FloatCount(this.userConfig.degRotation, this.userConfig.speed);
            // if (this.userConfig.degRotation < -179) {
            //   this.userConfig.degRotation += 360;
            // }
            break;
          case 'down':
            if (this.userConfig.degElevation < -85) break;
            this.userConfig.degElevation = FloatCount(this.userConfig.degElevation, -this.userConfig.speed);
            break;
          case 'pull':
            if (this.camera.fov < 5) break;
            this.camera.fov = FloatCount(this.camera.fov, -this.userConfig.speed);
            this.camera.updateProjectionMatrix();
            break;
          case 'push':
            if (this.camera.fov > 115) break;
            this.camera.fov = FloatCount(this.camera.fov, this.userConfig.speed);
            this.camera.updateProjectionMatrix();
            break;
        }

      }

      let elevation = THREE.Math.degToRad(this.userConfig.degElevation);
      let rotation = THREE.Math.degToRad(this.userConfig.degRotation);

      this.target.z = -this.insideConfig.sphereRadius * Math.cos(elevation) * Math.cos(rotation);
      this.target.x = this.insideConfig.sphereRadius * Math.cos(elevation) * Math.sin(rotation);
      // about elevation
      this.target.y = this.insideConfig.sphereRadius * Math.sin(elevation);

      this.camera.lookAt(this.target);

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(__renderCircle);
    };

    __renderCircle();
  }

  resize() {
    // remain to be fixed
    this.insideConfig.w = this.container.clientHeight;
    this.insideConfig.h = this.container.clientWidth;
    this.renderer.setSize(this.insideConfig.w, this.insideConfig.h);
  }

  // start or restart operation for TVOS
  TVOSOperation() {
    // press key times
    let holdTime = 0;
    // key hold
    let tvOperation = (e) => {
      switch (e.keyCode) {
        case 37:
          this.userConfig.direction = 'left';
          break;
        case 38:
          this.userConfig.direction = 'up';
          break;
        case 39:
          this.userConfig.direction = 'right';
          break;
        case 40:
          this.userConfig.direction = 'down';
          break;
        case 13:
          holdTime += 1;
          let holdTimeHandle = setTimeout(() => {
            holdTime -= 1;
          }, 1000);
          if (holdTime === 2) {
            this.userConfig.direction = 'pull';
          } else if (holdTime === 3) {
            this.userConfig.direction = 'push';
          }
          break;
      }
    };

    // key end
    let directionClear = () => {
      this.userConfig.direction = null;
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
    let img = ImgLoading(this.userConfig.picUrl, this.container, (img) => {
      this._initObject(img);
      this._initRenderer();
      this._renderCircle();
    });
  }

  // remove operation for TVOS
  suspendTVOSOperation({
    tvOperation,
    directionClear
  }) {
    document.removeEventListener('keyhold', tvOperation);
    document.removeEventListener('keyend', directionClear);
  }
}

// avoid floating point precision problem
function FloatCount(num, speed) {
  let direction = speed / Math.abs(speed);
  let times = Math.abs(10 / speed);
  return (num * times + direction) / times;
}

export default IcyPano;