export default class MovieItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div>
        <a href="#">
          <img
            src="${this.movie.media.posterUrl}"
            alt="${this.movie.title} movie poster"
            class="img-fluid" />
        </a>
      </div>
    `;
  }
}