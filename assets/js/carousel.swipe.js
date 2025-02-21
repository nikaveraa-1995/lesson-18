import Carousel from './carousel.js';

class SwipeCarousel extends Carousel {
  _swipeStart(e) {
    this._swipeStartX = e.changedTouches[0].pageX;
  }

  _swipeEnd(e) {
    this._swipeEndX = e.changedTouches[0].pageX;
    if (this._swipeStartX - this._swipeEndX < -100) this._prev();
    if (this._swipeStartX - this._swipeEndX > 100) this._next();
  }

  _initListener() {
    super._initListener();
    this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    this.container.addEventListener('touchend', this._swipeEnd.bind(this));
  }
}

export default SwipeCarousel;
