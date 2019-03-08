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
      <img src="./images/Lloyd.png" alt="" href="./question-form.html" id="chatbot-btn" />
    </div>
    `;
  }
}
