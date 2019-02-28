import 

export default class MovieList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div className="container movie-list">
        <yamovie-movie-item id=${this.id}></yamovie-movie-item>
      </div>
    `;
  }
}
