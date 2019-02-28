export default class Navbar extends HTMLElement {

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav id="nav-bar">
        <img src="../images/logo-v3-white.png" id="main-logo"></img>
        <ul id="nav-bar-links">
          <li>Home</li>
          <li>Browse</li>
          <li>Find YaMovie!</li>
          <li>Profile</li>
        </ul>  
      </nav>
    `
  };

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }
}