/!* AUTHOR: Ice Zero */
import IcyPano from './components/icy-panorama.js';
import './css/index.css';
import pano1 from './assets/pano1.jpg'

/* output */
export default IcyPano;

/* usage */
let container = document.getElementById('app');
let panorama = new IcyPano({
  container: container,
  picUrl: pano1
});

panorama.start();
let handle = panorama.TVOSOperation();
// panorama.suspend(handle);