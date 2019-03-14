<div className="grid-item" id="trailer">
<iframe
  title="movie trailer"
  width="100%"
  height="100%"
  src="{movie.media.trailerUrl}"
  frameBorder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
</div>
<div className="grid-item" id="info">
<div id="headings">
  <span className="close-modal" onClick={this.props.closeModal}>X</span>
  <h1>
    {movie.title}
    {' '}
($
    {movie.releaseYear}
)
  </h1>
  <h3>{genreString}</h3>
  <h6>
Runtime:
    {' '}
    {movie.runtime}
    {' '}
minutes
  </h6>
  <h6>
Rated
    {' '}
    {movie.ratings.mpaa}
  </h6>
</div>
<p>
  {movie.plot}
</p>
<div id="ratings">
  <li>
    <a href="${this.movie.ratings.rottenTomatoes.link}" target="_blank">
      <img src="./images/${rtImg}" alt="Rotten Tomatoes" />
      {movie.ratings.rottenTomatoes.score}
      {/* {rtFresh} */}
    </a>
  </li>
  <li>
    <a href="${this.movie.ratings.imdb.link}" target="_blank">
      <img src="./images/icon-IMDb.png" alt="IMDb" />
      {movie.ratings.imdb.score}
/10
    </a>
  </li>
  <li>
    <img src="./images/icon-star.png" alt="User Rating" />
Users: 5/5
  </li>
</div>
</div>
<div className="grid-item" id="watchat">
<h3>Available to watch here:</h3>
<div id="streamnav">
  <ul>
    {streamHTML.netflix}
    {streamHTML.amazon}
    {streamHTML.hulu}
    {streamHTML.youtube}
    {streamHTML.theaters}
  </ul>
</div>
</div>