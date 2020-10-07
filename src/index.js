'use strict';
/**
* Main class of banner.
*/
class FroUp {
  /**
  * Setting basic parameters of the banner.
  * @param {string} id Identifier of the processed banner.
  * @param {namber} interval Delay time (in seconds) before the banner is shown.
  * @param {boolean} block Blocking scrolling on the page.
  */
  constructor(id, interval = 0, block = false) {
    this.options = {
      id: id,
      interval: interval,
      block: block,
    };
  }
  /**
  * Getting an object by id.
  */
  get $banner() {
    return document.querySelector(`#${this.options.id}`);
  }
  /**
  * Toggle display/hide banner on page.
  */
  switchShow() {
    if (this.$banner.classList.contains('visuallyhidden')) {
      this.$banner.classList.remove('visuallyhidden');
    } else {
      this.$banner.classList.add('visuallyhidden');
    }
    if (this.options.block === true) {
      this.bodyBlocking();
    }
  }
  /**
  * Toggle block/unblock skrolling on page.
  */
  bodyBlocking() {
    const $body = document.querySelector('body');
    if ($body.style.overflow === 'hidden') {
      $body.style.overflow = '';
    } else {
      $body.style.overflow = 'hidden';
    }
  }
  /**
  * Starting a timer to activate the banner.
  */
  timerOn() {
    if (this.options.interval > 0 &&
      this.$banner.classList.contains('visuallyhidden')) {
      setTimeout(() => this.switchShow(), this.options.interval * 1000);
    }
  }
  /**
  * Check pressing button.
  */
  clickCheck() {
    this.$banner.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('fro-up__close')) {
        this.switchShow();
      }
    });
  }
  /**
  * Module start.
  */
  start() {
    if (this.options.interval > 0) {
      this.$banner.classList.add('visuallyhidden');
    }
    this.timerOn();
    this.clickCheck();
  }
}

module.exports = FroUp;
