/**
 * Three.js ( three factors )
 * --> scene
 * --> camera
 * --> renderer
 */ 

import '../css/rectangle-demo.css'
import * as THREE from 'three'


class DemoRectangle {
    constructor (container) {
        this.container = container;
        this.w = container.clientWidth;
        this.h = container.clientHeight;

        // the only one scene in Three.js is THREE.Scene
        // scene is the container of all the things
        this.scene = new THREE.Scene();

        // camera determins what angle of the scene is shown
        // camera is various
        this.camera = new THREE.PerspectiveCamera(45, this.w/this.h, 10000);

        // renderer determins the way and content that the page renders.
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        
        this.light = new THREE.DirectionalLight(0xff0000, 1.0, 0);
    }

    _initRenderer () {
        this.renderer.setSize(this.w, this.h);

        // domElement is the canvas of renderer
        // all the things are drawed in the domElement
        // appendChild attaches the domElement under body
        this.container.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(0xffffff, 1.0);
    }

    _initCamera () {
        this.camera.position.x = 0;
        this.camera.position.y = 1000;
        this.camera.position.z = 0;
        this.camera.up.x = 0;
        this.camera.up.y = 0;
        this.camera.up.z = 1;
        this.camera.lookAt({
            x: 0,
            y: 0,
            z: 0
        });
    }

    _initScene () {

    }

    _initLight () {
        this.light.position.set(100, 100, 200);
        this.scene.add(this.light);
    }

    _initCube () {
        // add some things
        // CubeGeometry( width, height, depth, ... ) represents a rectangle
        let geometry = new THREE.CubeGeometry();
        let material = new THREE.LineBasicMaterial({
            vertexColors: THREE.VertexColors
        });
        let color1 = new THREE.Color(0x444444),
            color2 = new THREE.Color(0xff0000);
        
        let p1 = new THREE.Vector3(-100, 0, 100);
        let p2 = new THREE.Vector3(100, 0, -100);
        geometry.vertices.push(p1);
        geometry.vertices.push(p2);
        geometry.colors.push(color1, color2);

        let line = new THREE.Line(geometry, material, THREE.LineSegments);
        this.scene.add(line);
    }

    start () {
        this._initRenderer();
        this._initCamera();
        this._initScene();
        this._initLight();
        this._initCube();
        let _this = this;

        function render () {
            _this.renderer.clear();
            _this.renderer.render(_this.scene, _this.camera);
            requestAnimationFrame(render);
        }

    }
}

/* var renderer, width, height;
function initThree() {
    width = document.getElementById('app').clientWidth;
    height = document.getElementById('app').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias : true
    });
    renderer.setSize(width, height);
    document.getElementById('app').appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 1000;
    camera.position.z = 0;
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 1;
    camera.lookAt({
        x : 0,
        y : 0,
        z : 0
    });
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

var light;
function initLight() {
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);
}

var cube;
function initObject() {

    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );
    var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );

    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3( -100, 0, 100 );
    var p2 = new THREE.Vector3(  100, 0, -100 );
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push( color1, color2 );

    var line = new THREE.Line( geometry, material, THREE.LinePieces );
    scene.add(line);
}
function render()
{
    renderer.clear();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
function DemoRectangle() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    render();
} */

export default DemoRectangle;