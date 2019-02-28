export default class MovieItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div className="movie-item">
        <a href="#">
          <img src="./images/starwars.jpg" alt="" className="img-fluid" />
        </a>
        <h2>Star Wars - Episode VIII</h2>
        <p>
          Three decades after the Empire's defeat, a new threat arises in the militant First Order. Stormtrooper
          defector Finn and the scavenger Rey are caught up in the Resistance's search for the missing Luke Skywalker.
        </p>
      </div>
    `;
  }
}
