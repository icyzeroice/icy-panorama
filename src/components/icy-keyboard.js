'use strict';
/**
 * emulate keyboard events
 * @param {KeyboardEvent} keyhold
 * @param {KeyboardEvent} keyend
 */
function keyOperation() {
  let setTime, initKeyCode;
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
    if (setTime) {
      clearTimeout(setTime);
    } else {
      keyHold.keyCode = e.keyCode;
      document.dispatchEvent(keyHold);
    }
    setTime = setTimeout(() => {
      document.dispatchEvent(keyEnd);
      setTime = null;
    }, 100);
  });
}

export default keyOperation;