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
      escEvent: true,
      autoFocus: true,
    };
  }
  /**
  * Getting an object by id.
  */
  get $banner() {
    return document.querySelector(`#${this.options.id}`);
  }
  /**
  * Getting an object with banner elements.
  */
  get $firstElem() {
    return {
      'input': this.$banner.querySelector('input'),
      'textArea': this.$banner.querySelector('textarea'),
      'body': this.$banner.querySelector('.fro-up__body'),
    };
  }
  /**
  * Setting the focusable object.
  * @param {object} elem
  */
  set $focusElement(elem) {
    elem.focus();
  }
  /**
  * Setting blurred object.
  * @param {object} elem
  */
  set $blurElement(elem) {
    elem.blur();
  }
  /**
  * Search for displayed banners on the page.
  * @return {boolean} search results.
  */
  checkAll() {
    let checkAllRes = true;
    const allBanners = document.querySelectorAll('.fro-up');
    for (const key in allBanners) {
      if (Object.prototype.hasOwnProperty.call(allBanners, key)) {
        const isHide = allBanners[key].classList.contains('visually-hidden');
        if (!isHide) {
          checkAllRes = false;
          break;
        }
      }
    }
    return checkAllRes;
  }
  /**
  * Toggle display/hide banner on page.
  */
  focusOnContent() {
    const bannerElem = this.$firstElem;
    if (!bannerElem['input'] && !bannerElem['textArea']) {
      bannerElem['body'].setAttribute('tabindex', '0');
    }
    for (const key in bannerElem) {
      if (Object.prototype.hasOwnProperty.call(bannerElem, key)) {
        if (bannerElem[key]) {
          bannerElem[key].focus();
          break;
        }
      }
    }
  }
  /**
  * Toggle display/hide banner on page.
  * @param {string} timerId Timer ID if it is running.
  */
  switchShow(timerId) {
    if (this.$banner.classList.contains('visually-hidden') && this.checkAll()) {
      this.$banner.classList.remove('visually-hidden');
      clearInterval(timerId);
      if (this.options.autoFocus === true) {
        this.focusOnContent();
      }
    } else {
      this.$banner.classList.add('visually-hidden');
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
  * @return {string} Timer ID if it is running.
  */
  timerOn() {
    if (this.options.interval > 0) {
      const timerId = setTimeout(
          () => {
            this.switchShow();
            this.clickCheck();
          }, this.options.interval * 1000
      );
      return timerId;
    }
  }
  /**
  * Check pressing close button.
  * @param {object} element
  */
  clickCheck(element) {
    const closeList = (e) => {
      const target = e.target;
      if (target && target.classList.contains('fro-up__close')) {
        if (element !== undefined) {
          this.$focusElement = element;
        }
        this.switchShow();
        this.$banner.removeEventListener('click', closeList);
      }
    };
    const escList = (e) => {
      if (e.code == 'Escape') {
        if (element !== undefined) {
          this.$focusElement = element;
        }
        this.switchShow();
        document.removeEventListener('keyup', escList);
      }
    };
    if (!this.$banner.classList.contains('visually-hidden')) {
      if (this.options.escEvent === true &&
      this.options.block === true) {
        document.addEventListener('keyup', escList);
      }
      this.$banner.addEventListener('click', closeList);
    }
  }
  /**
  * Module start.
  * @param {string} className Identifier of the processed banner launch button.
  */
  start(className) {
    const timerId = this.timerOn();
    if (className !== undefined && typeof(className) === 'string') {
      document.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains(`${className}`)) {
          this.switchShow(timerId);
          this.$blurElement = target;
          this.clickCheck(target);
        }
      });
    }
  }
}

module.exports = FroUp;
