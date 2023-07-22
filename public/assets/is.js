(async function importSlide() {
  const options = document.currentScript.dataset;
  const sections = options.sections;
  if (options.file) {
    const [err, text] = await load(options.file);
    const currentNode = document.querySelector(`[data-file="${options.file}"]`);
    const node = document.createElement('pre');
    if (sections) {
      node.setAttribute('data-line', '0');
      const subSections = ['0'].concat(sections.split(','));
      const sectionNode = findSectionTag(currentNode);
      if (sectionNode) {
        const SubSectionsAPI = {
          total: subSections.length,
          current: 0,
          up() {
            if (this.current + 1 < this.total) {
              this.current++;
              node.setAttribute('data-line', subSections[this.current]);
              setTimeout(() => {
                Prism.highlightAll();
              }, 0);
              return true;
            } else {
              return false;
            }
          },
          down() {
            if (this.current - 1 >= 0) {
              this.current--;
              node.setAttribute('data-line', subSections[this.current]);
              setTimeout(() => {
                Prism.highlightAll();
              }, 0);
              return true;
            } else {
              return false;
            }
          }
        };
        sectionNode.subCodeSections = SubSectionsAPI;
      }
    }
    if (err) {
      node.innerHTML = `<p>"${options.file}" file can not be loaded</p><pre>${err.toString()}</pre>`;
    } else {
      const codeNode = document.createElement('code');
      codeNode.setAttribute('class', (options.class || 'language-javascript'));
      codeNode.innerHTML = escapeHtml(text);
      node.appendChild(codeNode, true);
      setTimeout(() => {
        Prism.highlightAll();
      }, 0);
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
  function escapeHtml(text) {
    // Create a regular expression that matches all HTML tags.
    const regex = /[<>&"]/g;
  
    // Replace all HTML tags with their corresponding HTML entities.
    return text.replace(regex, function(match) {
      switch (match) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "\"":
          return "&quot;";
        case "'":
          return "&apos;";
        default:
          return match;
      }
    });
  }
  function findSectionTag(node) {
    if (node.tagName === 'SECTION') {
      return node;
    }
    if (node.parentNode) {
      return findSectionTag(node.parentNode);
    }
  }
})();