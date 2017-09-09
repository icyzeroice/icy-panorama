/!* AUTHOR: Ice Zero */

import Test from './components/test.js'
import DemoRectangle from './components/rectangle-demo.js'

let container = document.getElementById('app');
let rect = new DemoRectangle(container);
rect.start();

// test
let test = new Test('x', 'y');
test.p();


// ! output !
class main {
  constructor () {

  }

}

export default main;