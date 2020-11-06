'use strict';
/**
* Main class of banner.
*/
export default class FroUp {
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
  *
  */
  get $firstInput() {
    const inputs = this.$banner.querySelectorAll('input');
    return inputs[0];
  }
  /**
  *
  */
  get $firstArea() {
    const textAreas = this.$banner.querySelectorAll('textarea');
    return textAreas[0];
  }
  /**
  * Setting the focusable object.
  * @param {object} elem
  */
  set $focusElement(elem) {
    elem.focus();
    console.log('focus return to\n', elem);
  }
  /**
  * Setting blurred object.
  * @param {object} elem
  */
  set $blurElement(elem) {
    elem.blur();
    console.log('focus blur\n', elem);
  }
  /**
  * Getting an object by id.
  * @return {boolean}
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
    if (this.$firstInput !== undefined) {
      this.$firstInput.focus();
    } else
    if (this.$firstArea !== undefined) {
      this.$firstArea.focus();
    } else {
      this.$banner.querySelector('.fro-up__body').focus();
    }
  }
  /**
  * Toggle display/hide banner on page.
  */
  switchShow() {
    if (this.$banner.classList.contains('visually-hidden') && this.checkAll()) {
      this.$banner.classList.remove('visually-hidden');
      // this.$banner.firstElementChild.focus();
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
  * @return {string|boolean} Id of the timer or false.
  */
  timerOn() {
    if (this.options.interval > 0) {
      const timerId = setTimeout(
          () => this.switchShow(), this.options.interval * 1000
      );
      return timerId;
    }
    return false;
  }
  /**
  * Check pressing close button.
  * @param {object} element
  */
  clickCheck(element) {
    let timerId = this.timerOn();
    const timerRemove = () => {
      if (timerId !== false) {
        clearInterval(timerId);
        timerId = '';
      }
    };
    const closeList = (e) => {
      const target = e.target;
      if (target && target.classList.contains('fro-up__close')) {
        if (element !== undefined) {
          this.$focusElement = element;
        }
        this.switchShow();
        if (timerId !== false) {
          clearInterval(timerId);
          timerId = '';
        }
        this.$banner.removeEventListener('click', closeList);
      }
    };
    const escList = (e) => {
      if (e.code == 'Escape') {
        if (element !== undefined) {
          this.$focusElement = element;
        }
        this.switchShow();
        timerRemove();
        document.removeEventListener('keyup', escList);
      }
    };
    if (this.options.escEvent === true &&
      this.options.block === true) {
      document.addEventListener('keyup', escList);
    }
    this.$banner.addEventListener('click', closeList);
  }
  /**
  * Module start.
  * @param {string} className Identifier of the processed banner launch button.
  */
  start(className) {
    if (className !== undefined && typeof(className) === 'string') {
      document.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains(`${className}`)) {
          this.switchShow();
          this.$blurElement = target;
          this.clickCheck(target);
        }
      });
    } else {
      this.clickCheck();
    }
  }
}

// module.exports = FroUp;
