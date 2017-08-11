class CpBaseElement extends HTMLElement {
  constructor(id, element) {
    super();

    if (window.ShadyCSS) {
      const template = document.createElement('template');
      template.id = id;
      template.innerHTML = element;

      window.ShadyCSS.prepareTemplate(template, id);
      window.ShadyCSS.styleElement(this);

      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));
      }

      return;
    }

    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = element;
  }
}

export default CpBaseElement;
