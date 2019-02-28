export default class MovieList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <yamovie-movie-item id=${this.id}></yamovie-movie-item>
        <yamovie-movie-item id=${this.id}></yamovie-movie-item>
        <yamovie-movie-item id=${this.id}></yamovie-movie-item>
        <yamovie-movie-item id=${this.id}></yamovie-movie-item>
        <yamovie-movie-item id=${this.id}></yamovie-movie-item>
    `;
  }
}
