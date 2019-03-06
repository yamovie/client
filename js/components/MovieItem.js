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

    const movieCardLink = this.getElementsByTagName('img');
    movieCardLink[0].addEventListener('click', event => {
      event.preventDefault();
      this.dispatchAddModal();
    });
  }

  dispatchAddModal = () => {
    this.dispatchEvent(
      new CustomEvent('addModal', {
        bubbles: true,
        detail: {
          movie: this.movie,
        },
      }),
    );
  };
}
