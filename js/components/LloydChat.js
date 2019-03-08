export default class LloydChat extends HTMLElement {
  /**
   * Called when this lloydchat object is rendered on the page the first time.
   * Calls the render function to display data.
   */
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div id="lloyd-outline">
      <a href="./question-form.html">
        <img src="./images/Lloyd.png" alt="" id="chatbot-btn" />
      </a>  
    </div>
    `;
  }
}
