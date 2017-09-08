import '../css/rectangle-demo.css'
import * as THREE from 'three'


function demoRectangle () {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);
    let renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let geometry = new THREE.CubeGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    render();

    function render () {
        requestAnimationFrame(render);
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
        renderer.render(scene, camera);
    }
}

export default demoRectangle;