export default class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <a href="./index.html">
        <img src="../images/logo-v3-white.png" id="main-logo">
      </a>
      <ul id="nav-bar-links">
        <li>
          <a href="../html/about.html">Home</a>
        </li>
        <li>
          <a href="../html/browse-page.html">Browse</a>
        </li>
      </ul>
    `;
  }
}
