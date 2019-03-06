export default class MovieItem extends HTMLElement {
  /**
   * Called when this item object is rendered on the page the first time.
   * Calls the render function to display data.
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Renders the movie item in HTML on the page. Displays the movie poster
   * for use in the list grid and links to/creates a movie card when clicked.
   */
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
