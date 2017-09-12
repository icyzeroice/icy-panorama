'use strict';
/**
 * emulate keyboard events
 * @param {KeyboardEvent} keyhold
 * @param {KeyboardEvent} keyend
 */
function keyOperation() {
  let t, initKeyCode;
  let keyHold = document.createEvent('KeyboardEvent');
  let keyEnd = document.createEvent('KeyboardEvent');
  keyHold.initKeyboardEvent('keyhold', false, true);
  keyEnd.initKeyboardEvent('keyend', false, true);

  // set keyCode
  Object.defineProperty(keyHold, 'keyCode', {
    set: (value) => initKeyCode = value,
    get: () => initKeyCode
  });

  // turn continuous keydown to one time keyhold
  document.addEventListener('keydown', (e) => {

    // refresh t
    if (t) {
      clearTimeout(t);
    } else {
      keyHold.keyCode = e.keyCode;
      document.dispatchEvent(keyHold);
    }
    t = setTimeout(() => {
      document.dispatchEvent(keyEnd);
      t = null;
    }, 100);
  });
}

export default keyOperation;