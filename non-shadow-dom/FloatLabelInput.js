class FloatLabelInput extends HTMLElement {
  // this makes these attributes observable to attributeChangedCallback
  static get observedAttributes() {
    return ['name', 'placeholder', 'label'];
  }
  connectedCallback() {
    // render on first load
    this.render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    // prevent over-rendering on first load
    if (!oldValue) return;
    // only re-render if the thing has actually changed
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // getters
  get name() {
    return this.getAttribute('name');
  }
  get placeholder() {
    return this.getAttribute('placeholder');
  }
  get label() {
    return this.getAttribute('label');
  }

  // setters; make it so attributeChangedCallback actually fires
  set name(val) {
    return this.setAttribute('name', val);
  }
  set placeholder(val) {
    return this.setAttribute('placeholder', val);
  }
  set label(val) {
    return this.setAttribute('label', val);
  }

  // in the non-shadow-dom version, we re-render the whole component
  render() {
    this.innerHTML = `<label class="has-float-label">
        <input id="${this.name}" name="${this.name}" placeholder="${this.placeholder}" />
        <span>${this.label}</span>
      </label>`;
  }
}
// attach it to the page's list of customElements
customElements.define('float-label-input', FloatLabelInput);

// some inputs for a madlib
const inputs = [
  ['noun1', 'Creature', 'Noun 1'],
  ['adj1', 'Adjective', 'Adjective 1'],
  ['noun2', 'Plural Noun', 'Noun 2'],
  ['verb1', 'Infinitive Verb', 'Verb 1'],
  ['adj2', 'Adjective', 'Adjective 2'],
  ['noun3', 'Animal', 'Noun 3'],
  ['noun4', 'Family Member', 'Noun 4'],
  ['adj3', 'Adjective', 'Adjective 3'],
  ['verb2', 'Past Perfect Verb', 'Verb 2'],
  ['verb3', '-ing Verb', 'Verb 3'],
  ['adj4', 'Adjective', 'Adjective 4'],
  ['noun5', 'Noun', 'Noun 5'],
  ['verb4', '-ing Verb', 'Verb 4'],
  ['adj5', 'Vigorous Adjective', 'Adjective 5'],
  ['noun6', 'Activity', 'Noun 6'],
  ['verb5', 'Movement', 'Verb 5'],
  ['noun7', 'Type of Dance', 'Noun 7'],
  ['verb6', '-ing Verb for Talking', 'Verb 6'],
  ['adj6', 'Adjective', 'Adjective 6'],
  ['noun8', 'Plural Noun', 'Noun 8'],
]

// append the inputs to a document fragment as you make them
const frag = document.createDocumentFragment();
for (const input of inputs) {
  const newInput = document.createElement('float-label-input');
  Object.assign(newInput, {
    name: input[0],
    placeholder: input[1],
    label: input[2],
  })
  frag.appendChild(newInput);
}
// only append to the page once they've all been created
document.getElementById('madlib').prepend(frag);

// attach listener for generating the madlib
document.getElementById('submitter').addEventListener('click', e => {
  e.preventDefault();
  // get the FormData and turn it into an object that real people can use
  const data = new FormData(document.getElementById('madlib'));
  const words = {};
  data.forEach((v, k) => words[k] = `<span class="madlib-word">${v ? v : 'BLANK'}</span>`);

  // print the results
  document.getElementById('results').innerHTML = `<div>Well this is just a disaster. In no way did I mean to touch that ${words.noun1}. It's so angry and ${words.adj1} I wouldn't go near the thing if you gave me 1000 ${words.noun2}. In fact, I would rather ${words.verb1} a(n) ${words.adj2} ${words.noun3} a 1000 times before I ever considered a ${words.noun1} my ${words.noun4}.</div>
  
  <div>Nevertheless, I am willing to concede that I found the ${words.noun1} interesting. You might even say, ${words.adj3}. The kind of thing my mother would have ${words.verb2} me for. In fact, he's probably ${words.verb3} in her grave right now that I've even let the thing enter my mind. But that's no matter. My mother was a ${words.adj4} woman, prone to bouts of ${words.noun5}. Is there really any harm in ${words.verb4} a little ${words.noun1}?</div>
  
  <div>Now that you mention it, I do think I fancy a ${words.adj5} ${words.noun6} with a ${words.noun1}. If you don't tell anybody, perhaps I'll just ${words.verb5} on over and have a ${words.noun7} with it. What's that? Are you ${words.verb6} to someone on your phone?</div>
  
  <div>Well this is just a disaster. In no way did I mean to touch that ${words.noun1}. It's so angry and ${words.adj6} I wouldn't go near the thing if you gave me 1000 ${words.noun8}.</div>`;
})