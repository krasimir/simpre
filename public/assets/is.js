(async function importSlide() {
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