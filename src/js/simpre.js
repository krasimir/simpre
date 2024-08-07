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

const Simpre = window.Simpre = {};

function init() {
  const progressNode = document.querySelector('#progress');
  const slides = document.querySelectorAll(SLIDES_SELECTOR);
  const totalSlides = slides.length;
  let current = -1;
  let initialSlide = parseInt(window.location.hash.substr(1)) || 0;

  showSlide(initialSlide, 'up');
  setSelectionType();

  document.querySelector('body').addEventListener('keyup', (e) => {
    const key = e.key || e.keyCode;
    if (FORWARD.includes(key)) { // ******************* forward
      nextSlide();
    } else if (BACKWARD.includes(key)) { // *********** backward
      previousSlide();
    }
    if (SHIFT.includes(key)) {
      setSelectionType();
    }
  });
  function nextSlide() {
    if (current + 1 < totalSlides) {
      showSlide(current + 1, 'up');
    }
  }
  function previousSlide() {
    if (current - 1 >= 0) {
      showSlide(current - 1, 'down');
    }
  }
  function checkForOnChange(sectionEl, direction) {
    if (sectionEl && sectionEl.dataset && sectionEl.dataset.onchange) {
      const onchange = window[slides[current].dataset.onchange];
      if (onchange) {
        return onchange(sectionEl, direction);
      } else {
        console.error(`Function ${sectionEl.dataset.onchange} is not defined`);
      }
    }
    return true;
  }
  async function checkForOnEnter(sectionEl) {
    if (sectionEl.dataset && sectionEl.dataset.onenter) {
      const onenter = window[sectionEl.dataset.onenter];
      if (onenter) {
        await onenter(sectionEl);
        return;
      } else {
        console.error(`Function ${sectionEl.dataset.onenter} is not defined`);
      }
    }
  }
  async function showSlide(newIdx, direction) {
    if (current >= 0) {
      // Marking code snippet lines
      if (slides[current].subCodeSections) {
        if (slides[current].subCodeSections[direction]()) {
          return;
        }
      }
      // Checking for onchange
      if (!(await checkForOnChange(slides[current], direction))) {
        return;
      }
      slides[current].style.visibility = 'hidden';
      slides[current].style.opacity = 0;
    }
    current = newIdx;
    slides[current].style.visibility = 'visible';
    slides[current].style.opacity = 1;
    // Checking for onenter
    await checkForOnEnter(slides[current]);
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
    const body = document.querySelector('body');
    body.classList.remove('selection-type-1');
    body.classList.remove('selection-type-2');
    body.classList.add(SELECTION_TYPE ? 'selection-type-1' : 'selection-type-2');
    SELECTION_TYPE = !SELECTION_TYPE;
  }
  Simpre.nextSlide = nextSlide;
  Simpre.previousSlide = previousSlide;
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
    node.style.position = 'absolute';
    node.style.top = Math.max(0, (vh - hAfterScale) / 2) + 'px';
    node.style.left = Math.max(0, (vw - wAfterScale) / 2) + 'px';
    node.scaled = true;
  }
  resize();
  window.addEventListener('resize', resize);
}

window.addEventListener('load', init);