// =============================================================
// =============================================================

const placeholderMovie = {
  title: 'Title',
  releaseYear: 'Year',
  cast: ['Actors'],
  director: 'Director',
  tags: {
    genres: ['Genre'],
    moods: [''],
  },
  ratings: {
    mpaa: 'MPAA',
    rottenTomatoes: {
      score: '92%',
      link: 'https://www.rottentomatoes.com/',
    },
    imdb: {
      score: 7.9,
      link: 'https://www.imdb.com/',
    },
  },
  plot: 'Plot summary here',
  media: {
    posterUrl:
      'https://www.learningzonexpress.com/media/catalog/product/cache/1/image/650x/9df78eab33525d08d6e5fb8d27136e95/4/6/4607_2.jpg',
    trailerUrl: 'https://www.youtube.com/embed/1roy4o4tqQM',
  },
  quotes: [''],
  runtime: '??',
  streams: {},
};

// =============================================================
// =============================================================

class MovieCard extends HTMLElement {
  // =============================================================
  constructor(movie = placeholderMovie) {
    super();
    this.movie = movie;
  }

  // =============================================================

  /**
   * Sets the movie object that this card pulls info from
   * @param {object} newMovie
   */
  // setMovie(newMovie) {
  //   this.movie = newMovie;
  // }

  // =============================================================

  connectedCallback() {
    this.render();
  }

  set open(val) {
    if (!this.hasAttribute('open', 'true')) {
      this.setAttribute('open', val);
    }
  }

  // =============================================================

  render() {
    const genreString = this.movie.tags.genres.join(', ');

    this.innerHTML = /* html */ `
<<<<<<< HEAD
		<div class="modal-content container">
			<div class="grid-item" id="trailer">
				<iframe
					width="100%"
					height="100%"
					src="${this.movie.media.trailerUrl}"
					frameborder="0"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
=======
		<div class="grid-item" id="trailer">
			<iframe
				width="100%"
				height="100%"
				src="${this.movie.media.trailerUrl}"
				frameborder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
		<div class="grid-item" id="info">
			<div id="headings">
				<span class="close-modal">X</span>
				<h1>${this.movie.title} (${this.movie.releaseYear})</h1>
				<h3>${genreString}</h3>
				<h6>Runtime: ${this.movie.runtime} minutes</h6>
				<h6>Rated ${this.movie.ratings.mpaa}</h6>
>>>>>>> 7d6c1d7b22079a6d20e3a24970ffd3c07f80f454
			</div>
			<div class="grid-item" id="info">
				<div id="headings">
					<h1>${this.movie.title} (${this.movie.releaseYear})</h1>
					<h3>${genreString}</h3>
					<h6>Runtime: ${this.movie.runtime} minutes</h6>
					<h6>Rated ${this.movie.ratings.mpaa}</h6>
				</div>
				<p>
					${this.movie.plot}
				</p>
				<div id="ratings">
					<li>
						<a href="${this.movie.ratings.rottenTomatoes.link}" target="_blank">
							<img 
							src="./images/${
                this.movie.ratings.rottenTomatoes.score >= '60%'
                  ? 'icon-rottentomatoes-fresh.png'
                  : 'icon-rottentomatoes-rotten.png'
              }"
							alt="Rotten Tomatoes">
							${this.movie.ratings.rottenTomatoes.score} 
							${this.movie.ratings.rottenTomatoes.score >= '60%' ? 'Fresh' : 'Rotten'}
						</a>
					</li>
					<li>
						<a href="${this.movie.ratings.imdb.link}" target="_blank">
							<img src="./images/icon-IMDb.png" alt="IMDb">
							${this.movie.ratings.imdb.score}/10
						</a>
					</li>
					<li>
						<img src="./images/icon-star.png" alt="User Rating">
						Users: 5/5
					</li>
				</div>
			</div>
			<div class="grid-item" id="watchat">
				<h3>Available to watch here:</h3>
				<div id="streamnav">
					<li>
						<a href="https://www.netflix.com" target="_blank">
							<img src="./images/icon-netflix.png" alt="Netflix">
							Netflix
						</a>
					</li>
					<li>
						<a href="https://www.amazon.com" target="_blank">
							<img src="./images/icon-amazonvideo.png" alt="Amazon Video">
							Amazon Video
						</a>
					</li>
					<li>
						<a href="https://www.hulu.com" target="_blank">
							<img src="./images/icon-hulu.png" alt="Hulu">
							Hulu
						</a>
					</li>
					<li>
						<a href="https://www.youtube.com" target="_blank">
							<img src="./images/icon-youtube.png" alt="YouTube">
							YouTube
						</a>
					</li>
				</ul>
			</div>
		</div>
		`;

    this.querySelector('.close-modal').addEventListener('click', this.dispatchDeleteModal);
  }

  dispatchDeleteModal = () => {
    this.dispatchEvent(
      new CustomEvent('deleteModal', {
        bubbles: true,
      }),
    );
  };
}

// =============================================================
// =============================================================

export default MovieCard;

// =============================================================
// =============================================================
