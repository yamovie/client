import MovieCard from './MovieCard.js';

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
        <h2>${this.movie.title}</h2>
      </div>
    `;

    const movieCardLink = this.getElementsByTagName('img');
    movieCardLink[0].addEventListener('click', event => {
      event.preventDefault();
      // const newMovieCard = document.createElement('yamovie-movie-card');
      // this.append(newMovieCard);
      this.dispatchAddModal();
    });
  }

  dispatchAddModal = () => {
    this.dispatchEvent(
      new CustomEvent('addModal', {
        bubbles: true,
        detail: this.movie,
      }),
    );
  };
}
