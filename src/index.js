'use strict';
/**
* Main class of banner.
*/
export default class FroUp {
  /**
  * Setting basic parameters of the banner.
  * @param {string} id Identifier of the processed banner.
  * @param {namber} interval
  */
  constructor(id = null, interval = 0) {
    if (id === null) {
      this.banner = document.querySelector('.fro-up');
    } else {
      this.banner = document.querySelector(`#${id}`);
    }
    this.body = document.querySelector('body');
    this.interval = interval;
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
  timerOn() {
    if (this.banner.classList.contains('visuallyhidden')) {
      setTimeout(() => this.switchShow(), this.interval * 1000);
    }
  }
  /**
  * New.
  */
  clickCheck() {
    // let playId;
    // if (this.options.interval > 0) {
    //   playId = this.newPlayId;
    // }
    this.banner.addEventListener('click', (e) => {
      const target = e.target;
      console.log(target);
      if (target.classList.contains('fro-up__btn-close')) {
        this.switchShow();
      }
    });
  }
  /**
  * New.
  */
  start() {
    this.banner.classList.add('visuallyhidden');
    this.timerOn();
    this.clickCheck();
  }
}

// module.exports = FroUp;
