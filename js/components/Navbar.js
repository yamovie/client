export default class Navbar extends HTMLElement {
  /**
   * Called when this navbar object is rendered on the page the first time.
   * Calls the render function to display data.
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Renders the navbar in HTML on the page. Uses flexboxes to display
   * information and links.
   */
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
