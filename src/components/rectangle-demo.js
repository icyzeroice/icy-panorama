/**
 * Three.js ( three factors )
 * --> scene
 * --> camera
 * --> renderer
 */

import '../css/rectangle-demo.css'
import * as THREE from 'three'

class Demo {
  constructor (container) {
    this.container = container;
    
    this.h = this.container.clientHeight;
    this.w = this.container.clientWidth;
    this.toggle = true;

    this.scene = new Object();
    this.camera = new Object();
    this.renderer = new Object();
    this.cube = new Object();
  }

  _initRenderer () {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.w, this.h);
    this.container.appendChild(this.renderer.domElement);
    /* this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(this.w, this.h);
    this.container.appendChild(this.renderer.domElement);
    this.renderer.setClearColor(0xffffff, 1.0); */
  }

  _initCamera () {
    this.camera = new THREE.PerspectiveCamera(45, this.w / this.h, 0.1, 1000);
    /* this.camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 10000);
    this.camera.position.x = 0; */
  }

  _initScene () {
    this.scene = new THREE.Scene();
  }

  _addObject () {
    let geometry = new THREE.CubeGeometry(1, 1, 1);
    let matertiel = new THREE.MeshBasicMaterial({
      color: 0x0000ff
    });
    this.cube = new THREE.Mesh(geometry, matertiel);
    this.scene.add(this.cube);
    this.camera.position.z = 7;
  }

  _renderCircle () {
    let _this = this;
    renderCircle();

    function renderCircle () {
      _this.cube.rotation.x += 0.01;
      _this.cube.rotation.y += 0.01;
      _this.cube.rotation.x += 0.01;
      if(_this.toggle) {
        _this.camera.position.z -= 0.01;
        /* _this.camera.position.y -= 0.005; */
        if(_this.camera.position.z < 2) {
          _this.toggle = false;
        }
      } else {
        _this.camera.position.z += 0.01;
        /* _this.camera.position.y += 0.005; */
        if(_this.camera.position.z > 9) {
          _this.toggle = true;
        }
      }
      _this.renderer.render(_this.scene, _this.camera);
      requestAnimationFrame(renderCircle);
    }
  }

  start () {
    this._initCamera();
    this._initScene();
    this._initRenderer();
    this._addObject();
    this._renderCircle();
  }
}

export default Demo;