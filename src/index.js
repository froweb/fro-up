'use strict';
/**
* Main class of banner.
*/
class FroUp {
  /**
  * Setting basic parameters of the banner.
  * @param {string} id Identifier of the processed banner.
  */
  constructor(id = null) {
    if (id === null) {
      this.banner = document.querySelector('.fro-up');
    } else {
      this.banner = document.querySelector(`#${id}`);
    }
    this.body = document.querySelector('body');
  }
  /**
  * Toggle display/hide banner on page.
  */
  switchShow() {
    if (this.banner.classList.contains('visuallyhidden')) {
      this.banner.classList.remove('visuallyhidden');
    } else {
      this.banner.classList.add('visuallyhidden');
    }
    this.bodyBlocking();
  }
  /**
  * Toggle block/unblock skrolling on page.
  */
  bodyBlocking() {
    if (this.body.getAttribute('overflow') === 'hidden') {
      this.body.removeAttribute('overflow');
    } else {
      this.body.setAttribute('overflow', 'hidden');
    }
  }
  /**
  * Starting a timer to activate the banner.
  * @param {number} interval time interval before switching on in seconds.
  */
  timerOn(interval) {
    if (this.banner.classList.contains('visuallyhidden')) {
      setTimeout(this.switchShow, interval * 1000);
    }
  }
}

module.exports = FroUp;
