/!* AUTHOR: Ice Zero */
import IcyPano from '../components/icy-panorama.js';
import './index.css';
import pano from '../assets/pano3.jpg'

/* usage */
let container = document.getElementById('app');
let panorama = new IcyPano({
  container: container,
  picUrl: pano
});

panorama.start();
let handle = panorama.TVOSOperation();
// panorama.suspendTVOSOperation(handle);