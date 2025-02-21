class Carousel {
  constructor(params) {
    const setting = {
      ...{
        containerID: '#carousel',
        slideID: '.slide',
        interval: 5000,
        isPlaying: true,
      },
      ...params,
    };

    this.container = document.querySelector(setting.containerID);
    this.slides = this.container.querySelectorAll(setting.slideID);
    this.interval = setting.interval;
    this.isPlaying = setting.isPlaying;
  }

  _initProps() {
    this.SLIDES_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPASE = 'Space';
    this.FA_PLAY = '<i class="fa-regular fa-circle-play"></i>';
    this.FA_PAUSE = '<i class="fa-regular fa-circle-pause"></i>';
    this.FA_PREV = '<i class="fa-regular fa-circle-left"></i>';
    this.FA_NEXT = '<i class="fa-regular fa-circle-right"></i>';

    this.currentSlide = 0;
  }

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = ` <span class="control control-pause" id="pause"> ${
      this.isPlaying ? this.FA_PAUSE : this.FA_PLAY
    }  </span>`;
    const PREV = `<span class="control control-prev" id="prev">${this.FA_PREV} </span>`;
    const NEXT = `<span class="control control-next" id="next"> ${this.FA_NEXT} </span>`;
    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;
    this.container.append(controls);

    this.pauseBtn = this.container.querySelector('#pause');
    this.prevBtn = this.container.querySelector('#prev');
    this.nextBtn = this.container.querySelector('#next');
  }

  _initIndicators() {
    const indicators = document.createElement('div');

    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div');

      indicator.setAttribute(
        'class',
        i !== 0 ? 'indicator' : 'indicator active',
      );
      indicator.dataset.slideTo = `${i}`;

      indicators.append(indicator);
    }

    this.container.append(indicators);

    this.indContainer = this.container.querySelector('.indicators');
    this.indItems = this.indContainer.querySelectorAll('.indicator');
  }

  _initListener() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this._prev.bind(this));
    this.nextBtn.addEventListener('click', this._next.bind(this));
    this.indContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  // _goToNth(n) {
  //   this.slides[this.currentSlide].classList.toggle('active');
  //   this.indItems[this.currentSlide].classList.toggle('active');
  //   this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
  //   this.slides[this.currentSlide].classList.toggle('active');
  //   this.indItems[this.currentSlide].classList.toggle('active');
  // }

  _goToNth(n) {
    this.slides[this.currentSlide].classList.remove('active');
    this.indItems[this.currentSlide].classList.remove('active');

    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;

    this.slides[this.currentSlide].classList.add('active');
    this.indItems[this.currentSlide].classList.add('active');
  }

  _goToPrev() {
    this._goToNth(this.currentSlide - 1);
  }

  _goToNext() {
    this._goToNth(this.currentSlide + 1);
  }

  _pause() {
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlaying = false;
    clearInterval(this.timerID);
  }

  // Функция playSlideshow воспроизводит слайд-шоу, текст кнопки меняется с Play на Pause
  _play() {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
    this._tick();
  }

  //Кнопки: предыдущий / следующий
  _prev() {
    this._pause();
    this._goToPrev();
  }

  _next() {
    this._pause();
    this._goToNext();
  }

  _indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      const dataSlide = +target.dataset.slideTo;
      if (isNaN(dataSlide)) return;
      this._pause();
      this._goToNth(dataSlide);
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this._prev();
    if (e.code === this.CODE_RIGHT_ARROW) this._next();
    if (e.code === this.CODE_SPASE) this.pausePlay();
  }

  _tick(flag = true) {
    if (!flag) return;
    this.timerID = setInterval(() => this._goToNext(), this.interval);
  }
  //Наконец, мы вешаем обработчик кликов, на кнопку, чтобы она переключала состояние слайд-шоу между паузой и воспроизведением
  pausePlay() {
    if (this.isPlaying) {
      this._pause();
    } else this._play();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListener();
    this._tick(this.isPlaying);
  }
}

export default Carousel;
