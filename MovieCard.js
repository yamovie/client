// =============================================================
// =============================================================

// Imports
import MovieAPI from "./MovieApi.js";

// =============================================================
// =============================================================

class MovieCard extends HTMLElement {
	// =============================================================
	constructor() {
		super();
		this.movie = new MovieAPI().getMovies()[1];
	}

	// =============================================================
	
	connectedCallback() {
		this.render();
	}
	
	// =============================================================
	
	render() {
		// TODO: Get genres
		const genreString = this.movie.tags.genres.join(', ');

		this.innerHTML = /* html */ `
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
					<a href="https://www.rottentomatoes.com" target="_blank">
						<img 
						src="./images/${this.movie.ratings.rottenTomatoes >= "60%" ? "icon-rottentomatoes-fresh.png" : "icon-rottentomatoes-rotten.png"}"
						 alt="Rotten Tomatoes">
						${this.movie.ratings.rottenTomatoes} 
						${this.movie.ratings.rottenTomatoes >= "60%" ? "Fresh" : "Rotten"}
					</a>
				</li>
				<li>
					<a href="https://www.imdb.com" target="_blank">
						<img src="./images/icon-IMDb.png" alt="IMDb">
						${this.movie.ratings.imdb}/10
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
		`;
	}
}

// =============================================================
// =============================================================

export default MovieCard;

// =============================================================
// =============================================================

