const codeNode = document.createElement('code');
codeNode.setAttribute('class', (options.class || '')); // and this is a line with a very long comment
codeNode.innerHTML = text;
node.appendChild(codeNode);