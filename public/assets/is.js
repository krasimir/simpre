(async function importSlide() {
  function fit(w, h, node) {
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
      let style = `display:block;transform-origin:top left;transform: scale(${scale}, ${scale});`;
      node.setAttribute('style', style);
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
        node.setAttribute('style', style + `position:absolute;left:${left}px;top:${top}px;`);
      }
    }
    resize();
    window.addEventListener('resize', resize);
  }

  const options = document.currentScript.dataset;
  if (options.file) {
    const [err, text] = await load(options.file);
    const currentNode = document.querySelector(`[data-file="${options.file}"]`);
    const node = document.createElement('pre');
    if (err) {
      node.innerHTML = `<p>"${options.file}" file can not be loaded</p><pre>${err.toString()}</pre>`;
    } else {
      const codeNode = document.createElement('code');
      codeNode.setAttribute('class', (options.class || ''));
      codeNode.innerHTML = Prism.highlight(text, Prism.languages.javascript, 'javascript');
      node.appendChild(codeNode);
      setTimeout(() => {
        const rect = node.getBoundingClientRect();
        fit(rect.width, rect.height, node);
      }, 1);
    }
    currentNode.parentNode.replaceChild(node, currentNode);
  }

  async function load(file, done) {
    try {
      const res = await fetch(file);
      if (res.status === 200) {
        const text = await res.text();
        return [undefined, text];
      } else {
        throw new Error(`Problem loading the file. Status: ${res.status}`);
      }
    } catch(err) {
      return [err];
    }
  }
})();