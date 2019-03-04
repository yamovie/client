export default class Navbar extends HTMLElement {
  /**
   * Called when this navbar object is rendered on the page the first time.
   * Calls the render function to display data.
   */
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
          <a href="./about.html">Home</a>
        </li>
        <li>
          <a href="./browse-page.html">Browse</a>
        </li>
        <li>Find YaMovie!</li>
        <li>Profile</li>
      </ul>
    `;
  }
}
