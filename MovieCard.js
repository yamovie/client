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
		this.api = new MovieAPI();
	}

	// =============================================================
	
	connectedCallback() {
		this.render();
	}
	
	// =============================================================
	
	render() {
		this.innerHTML = /* html */ `
		<div class="grid-item" id="trailer">
			<iframe
				width="560"
				height="315"
				src="https://www.youtube.com/embed/1roy4o4tqQM"
				frameborder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
		<div class="grid-item" id="info">
			<div id="headings">
				<h1>Title</h1>
				<h3>Genre</h3>
				<h6>Runtime</h6>
			</div>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea error mollitia saepe quas nisi? Architecto debitis molestiae est, minima eligendi veniam, nulla alias assumenda necessitatibus sit a nam deserunt unde.
			</p>
			<div id="ratings">
				<li>
					<a href="https://www.rottentomatoes.com" target="_blank">
						<img src="./images/icon-rottentomatoes.png" alt="Rotten Tomatoes">
						87% Fresh
					</a>
				</li>
				<li>
					<a href="https://www.imdb.com" target="_blank">
						<img src="./images/icon-IMDb.png" alt="IMDb">
						63%
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

