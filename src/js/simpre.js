const SLIDES_SELECTOR = 'section';
const UP = ['ArrowUp', 38];
const DOWN = ['ArrowDown', 40];
const LEFT = ['ArrowLeft', 37];
const RIGHT = ['ArrowRight', 39];
const BACKSPACE = ['Backspace', 8];
const PAGE_DOWN = ['PageDown', 34];
const PAGE_UP = ['PageUp', 33];
const SHIFT = ['Shift', 16];
const FORWARD = [].concat(RIGHT, DOWN, PAGE_DOWN);
const BACKWARD = [].concat(LEFT, UP, BACKSPACE, PAGE_UP);
let SELECTION_TYPE = true;

function init() {
  const progressNode = document.querySelector('#progress');
  const slides = document.querySelectorAll(SLIDES_SELECTOR);
  const totalSlides = slides.length;
  let current = -1;

  checkForCustomLogic(parseInt(window.location.hash.substr(1)) || 0, 'up');
  setSelectionType();

  document.querySelector('body').addEventListener('keyup', (e) => {
    const key = e.key || e.keyCode;
    if (FORWARD.includes(key)) { // ******************* forward
      if (current + 1 < totalSlides) {
        checkForCustomLogic(current + 1, 'up');
      }
    } else if (BACKWARD.includes(key)) { // *********** backward
      if (current - 1 >= 0) {
        checkForCustomLogic(current - 1, 'down');
      }
    }
    if (SHIFT.includes(key)) {
      setSelectionType();
    }
  });
  function checkForCustomLogic(idx, direction) {
    if (slides[current] && slides[current].dataset && slides[current].dataset.onchange) {
      const onchange = window[slides[current].dataset.onchange];
      if (onchange) {
        onchange(() => showSlide(idx, direction), direction);
        return;
      } else {
        console.error(`Function ${slides[current].dataset.onchange} is not defined`);
      }
    } else if (slides[idx] && slides[idx].dataset && slides[idx].dataset.onenter) {
      const onenter = window[slides[idx].dataset.onenter];
      if (onenter) {
        onenter(() => showSlide(idx, direction), slides[idx]);
        return;
      } else {
        console.error(`Function ${slides[idx].dataset.onenter} is not defined`);
      }
    }
    showSlide(idx, direction);
  }
  function showSlide(idx, direction) {
    if (current >= 0) {
      if (slides[current].subCodeSections) {
        if (slides[current].subCodeSections[direction]()) {
          return;
        }
      }
      slides[current].style.visibility = 'hidden';
      slides[current].style.opacity = 0;
    }
    current = idx;
    slides[current].style.visibility = 'visible';
    slides[current].style.opacity = 1;
    const postSlide = () => {
      updateProgress();
      setTimeout(() => {
        fit(slides[current]);
        location.href = "#"+ current;
      }, 1);
    }
    // Checking for a code snippet. If we have one we are waiting,
    // till it disappears.
    let int;
    (function checkForScriptTag() {
      clearTimeout(int);
      if (slides[current].innerHTML.indexOf('<script') >= 0) {
        int = setTimeout(checkForScriptTag, 100);
      } else {
        postSlide();
      }
    })();
  }
  function updateProgress() {
    const percents = (current + 1) / totalSlides * 100;
    progressNode.style.width = percents + '%';
  }
  function setSelectionType() {
    document.querySelector('body')
    .setAttribute('class', SELECTION_TYPE ? 'selection-type-1' : 'selection-type-2');
    SELECTION_TYPE = !SELECTION_TYPE;
  }
}

window.fit = function fit(node) {
  if (node.scaled) return;
  const rect = node.getBoundingClientRect();
  const w =  rect.width
  const h = rect.height;
  const resize = () => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const ratio = w / h;
    // setting the right scale
    let newW = vw;
    let newH = newW / ratio;
    if (newH > vh) {
      newH = vh;
      newW = ratio * newH;
    }
    const scale = newW / w;
    node.style.display = 'block';
    node.style.transformOrigin = 'top left';
    node.style.transform = `scale(${scale}, ${scale})`;
    // setting the position
    const wAfterScale = node.getBoundingClientRect().width;
    const hAfterScale = node.getBoundingClientRect().height;
    let top = false;
    let left = false;
    if (wAfterScale < vw - 10) {
      top = 0;
      left = (vw - wAfterScale) / 2;
    }
    if (hAfterScale < vh - 10) {
      top = (vh - hAfterScale) / 2;
    }
    if (top !== false || left !== false) {
      node.style.position = 'absolute';
      node.style.top = top + 'px';
      node.style.left = left + 'px';
    }
    node.scaled = true;
  }
  resize();
  window.addEventListener('resize', resize);
}

window.addEventListener('load', init);