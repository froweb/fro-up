'use strict';
module.exports = 

class FroUp {
  constructor() {
    this.body = document.querySelector('body');
    this.banner = document.querySelector('.fro-up');
  }
  switchShow() {
    if (this.banner.classList.contains('visuallyhidden')) {
      this.banner.classList.remove('visuallyhidden');
    } else {
      this.banner.classList.add('visuallyhidden')
    }
    this.bodyBlocking();
  }
  bodyBlocking() {
    if (this.body.getAttribute('overflow') === 'hidden') {
      this.body.removeAttribute('overflow');
    } else {
      this.body.setAttribute('overflow', 'hidden');
    }
  }
}

