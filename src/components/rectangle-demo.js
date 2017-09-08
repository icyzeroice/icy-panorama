/**
 * Three.js ( three factors )
 * --> scene
 * --> camera
 * --> renderer
 */ 

import '../css/rectangle-demo.css'
import * as THREE from 'three'

function demoRectangle () {

    // the only one scene in Three.js is THREE.Scene
    // scene is the container of all the things
    let scene = new THREE.Scene();

    // camera determins what angle of the scene is shown
    // camera is various
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);

    // renderer determins the way and content that the page renders.
    let renderer = new THREE.WebGLRenderer();

    let w = window.innerWidth;
    let h = window.innerHeight;

    renderer.setSize(w, h);

    // domElement is the canvas of renderer
    // all the things are drawed in the domElement
    // appendChild attaches the domElement under body
    document.body.appendChild(renderer.domElement);

    // add some things
    // CubeGeometry( width, height, depth, ... ) represents a rectangle
    let geometry = new THREE.CubeGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    render();

    function render () {
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
        cube.rotation.z += 0.1;

        // get the result
        // render ( scene, camera, renderTarget, forceClear )
        renderer.render(scene, camera);

        // game circle
        requestAnimationFrame(render);
    }
}

export default demoRectangle;