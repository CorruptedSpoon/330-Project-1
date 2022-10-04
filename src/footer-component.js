const template = document.createElement('template');
template.innerHTML=`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <footer class="footer py-5 has-text-light has-background-dark"?>
    <div class="content has-text-centered">
        <p>
            <h5 id="title-element" class="has-text-danger"></h1><strong class="has-text-light">Easy Answers</strong> by Van Edelman. Created for Rich Media Web App Development at RIT
        </p>
    </div>
    </footer>
`;

class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.titleElement = this.shadowRoot.querySelector("#title-element")
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }

    static get observedAttributes(){
        return ["data-title"];
    }

    render(){
        const titleText = this.dataset.title || "Easy Answers";
        this.titleElement.innerHTML = titleText;
    }
}

customElements.define('footer-component', FooterComponent);