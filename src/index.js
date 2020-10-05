'use strict';
/**
* Main class of banner.
*/
export default class FroUp {
  /**
  * Setting basic parameters of the banner.
  * @param {string} id Identifier of the processed banner.
  * @param {namber} interval
  * @param {boolean} block
  */
  constructor(id, interval = 0, block = false) {
    this.options = {
      id: id,
      interval: interval,
      block: block,
    };
  }
  /**
  * New.
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
      // $page.setAttribute('overflow', 'hidden');
      $body.style.overflow = 'hidden';
      // console.log(overflowValue);
      // $page.setAttribute('position', 'fixed');
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
  * New.
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
  * New.
  */
  start() {
    if (this.options.interval > 0) {
      this.$banner.classList.add('visuallyhidden');
    }
    this.timerOn();
    this.clickCheck();
  }
}

// module.exports = FroUp;