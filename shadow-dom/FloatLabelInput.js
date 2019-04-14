// I was too lazy to make an example for the shadow DOM version, but it's pretty similar to the non-shadow DOM version

// this doesn't exist yet, but it will be cool when it does
// import styles from 'https://cdnjs.cloudflare.com/ajax/libs/float-label-css/1.0.2/float-label.min.css';

const style = document.createElement('style');
style.textContent = `.has-float-label{display:block;position:relative}.has-float-label label,.has-float-label>span{position:absolute;left:0;top:0;cursor:text;font-size:75%;opacity:1;-webkit-transition:all .2s;transition:all .2s}.has-float-label select{-webkit-appearance:none;-moz-appearance:none;appearance:none}.has-float-label textarea{width:100%}.has-float-label input,.has-float-label select,.has-float-label textarea{font-size:inherit;padding-top:1em;margin-bottom:2px;border:0;border-radius:0;border-bottom:2px solid rgba(0,0,0,.1)}.has-float-label input::-webkit-input-placeholder,.has-float-label select::-webkit-input-placeholder,.has-float-label textarea::-webkit-input-placeholder{opacity:1;-webkit-transition:all .2s;transition:all .2s}.has-float-label input::-moz-placeholder,.has-float-label select::-moz-placeholder,.has-float-label textarea::-moz-placeholder{opacity:1;transition:all .2s}.has-float-label input:-ms-input-placeholder,.has-float-label select:-ms-input-placeholder,.has-float-label textarea:-ms-input-placeholder{opacity:1;transition:all .2s}.has-float-label input::placeholder,.has-float-label select::placeholder,.has-float-label textarea::placeholder{opacity:1;-webkit-transition:all .2s;transition:all .2s}.has-float-label input:placeholder-shown:not(:focus)::-webkit-input-placeholder,.has-float-label select:placeholder-shown:not(:focus)::-webkit-input-placeholder,.has-float-label textarea:placeholder-shown:not(:focus)::-webkit-input-placeholder{opacity:0}.has-float-label input:placeholder-shown:not(:focus)::-moz-placeholder,.has-float-label select:placeholder-shown:not(:focus)::-moz-placeholder,.has-float-label textarea:placeholder-shown:not(:focus)::-moz-placeholder{opacity:0}.has-float-label input:placeholder-shown:not(:focus):-ms-input-placeholder,.has-float-label select:placeholder-shown:not(:focus):-ms-input-placeholder,.has-float-label textarea:placeholder-shown:not(:focus):-ms-input-placeholder{opacity:0}.has-float-label input:placeholder-shown:not(:focus)::placeholder,.has-float-label select:placeholder-shown:not(:focus)::placeholder,.has-float-label textarea:placeholder-shown:not(:focus)::placeholder{opacity:0}.has-float-label input:placeholder-shown:not(:focus)+*,.has-float-label select:placeholder-shown:not(:focus)+*,.has-float-label textarea:placeholder-shown:not(:focus)+*{font-size:150%;opacity:.5;top:.25em}.has-float-label input:focus,.has-float-label select:focus,.has-float-label textarea:focus{outline:0;border-color:rgba(0,0,0,.5)}.has-float-label select{padding-right:1em;background:url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23333' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right .5em bottom .25em;background-size:8px 10px}`

class FloatLabelInput extends HTMLElement {
  // time to open up the shadow
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // this makes these attributes observable to attributeChangedCallback
  static get observedAttributes() {
    return ['name', 'placeholder', 'label'];
  }
  connectedCallback() {
    // make a content wrapper so that we can perform re-rendering without redoing the CSS
    const wrapper = document.createElement('div');
    wrapper.id = 'wrapper';
    this.shadowRoot.appendChild(style.cloneNode(true));
    this.shadowRoot.appendChild(wrapper);
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

  // in the shadow DOM version, we only re-render the wrapper. say that 5 times fast.
  render() {
    this.shadowRoot.getElementById('wrapper').innerHTML = `<label class="has-float-label">
        <input id="${this.name}" name="${this.name}" placeholder="${this.placeholder}" />
        <span>${this.label}</span>
      </label>`;
  }
}
// attach it to the page's list of customElements
customElements.define('float-label-input', FloatLabelInput);
