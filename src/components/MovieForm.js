export default class MovieForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  /**
   * Handles submit event. Parses form data, creates a MovieList and filters the content
   * based on the form data, then removes this form so the page just has the recommendation list.
   * @param {Event} event The triggering submit event
   */
  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const ratings = formData.getAll('q-ratings');
    const release = formData.get('q-release');
    const age = formData.get('q-age');

    // creates a new MovieList document elements
    const newMovieList = document.createElement('yamovie-movie-list');
    // sets default list to be all movies
    let reccMovies = newMovieList.api.getMovies();
    if (release) {
      reccMovies = newMovieList.api.getMoviesByRelease(release, reccMovies);
    }
    if (ratings[0] !== 'dont-care') {
      reccMovies = newMovieList.api.getMoviesByRTRatings(ratings[0], true, reccMovies);
    }
    if (ratings[1] !== 'dont-care') {
      reccMovies = newMovieList.api.getMoviesByIMDBRatings(ratings[1], true, reccMovies);
    }
    if (age) {
      reccMovies = newMovieList.api.getMoviesByAge(age, reccMovies);
    }
    reccMovies = newMovieList.api.getMoviesByStreams(
      formData.getAll('q-streaming'),
      reccMovies,
    );
    newMovieList.setState({ movies: reccMovies, showGenreFilter: false });
    document.body.append(newMovieList);
    this.remove();
  };

  render() {
    this.innerHTML = `
      <h1>Movie Questionaire!</h1>
      <form class="form" id="question-form">
        <ul class="odds">
          <h3>What kind of movie are you in the mood for?</h3>
          <li class="form-group">
            <label for="funny">Funny</label>
            <input type="radio" name="q-mood" value="funny"/>
          </li>
          <li class="form-group">
            <label for="sad">Sad</label>
            <input type="radio" name="q-mood" value="sad" />
          </li>
          <li class="form-group">
            <label for="dramatic">Dramatic</label>
            <input type="radio" name="q-mood" value="dramatic" />
          </li>
          <li class="form-group">
            <label for="dramatic">Scary</label>
            <input type="radio" name="q-mood" value="dramatic" />
          </li>
          <li class="form-group">
            <label for="action-packed">Action Packed</label>
            <input type="radio" name="q-mood" value="action-packed" />
          </li>
          <li class="form-group">
            <label for="romantic">Romantic</label>
            <input type="radio" name="q-mood" value="romantic" />
          </li>
        </ul>
        <ul class="evens">
          <h3>What's your age range?</h3>
          <li class="form-group">
            <label for="12under">12 and Under</label>
            <input type="radio" name="q-age" value="12under" />
          </li>
          <li class="form-group">
            <label for="13to18">13 - 16</label>
            <input type="radio" name="q-age" value="13to16" />
          </li>
          <li class="form-group">
            <label for="19to29">17 - 29</label>
            <input type="radio" name="q-age" value="17to29" />
          </li>
          <li class="form-group">
            <label for="30to40">30 - 40</label>
            <input type="radio" name="q-age" value="30to40" />
          </li>
          <li class="form-group">
            <label for="41to54">41 - 54</label>
            <input type="radio" name="q-age" value="41to54" />
          </li>
          <li class="form-group">
            <label for="55plus">55+</label>
            <input type="radio" name="q-age" value="55plus" />
          </li>
        </ul>
        <ul class="odds">
          <h3>Do you want to watch a classic or modern movie?</h3>
          <li class="form-group">
            <label for="classic">Classic</label>
            <input type="radio" name="q-release" value="classic" />
          </li>
          <li class="form-group">
            <label for="modern">Modern</label>
            <input type="radio" name="q-release" value="modern" />
          </li>
          <li class="form-group">
            <label for="in-between">In between</label>
            <input type="radio" name="q-release" value="in-between" />
          </li>
        </ul>
        <ul class="evens">
          <h3>Do you like animated films?</h3>
          <li class="form-group">
            <label for="yes-animated">Yes</label>
            <input type="radio" name="q-animated" value="yes-animated" />
          </li>
          <li class="form-group">
            <label for="no-animated">No</label>
            <input type="radio" name="q-animated" value="no-animated" />
          </li>
        </ul>
        <ul class="odds">
          <h3>Do you like foreign films?</h3>
          <li class="form-group">
            <label for="yes-foreign">Yes</label>
            <input type="radio" name="q-foreign" value="yes-foreign" />
          </li>
          <li class="form-group">
            <label for="no-foreign">No</label>
            <input type="radio" name="q-foreign" value="no-foreign" />
          </li>
        </ul>
        <ul class="evens">
          <h3>Do you like independent films?</h3>
          <li class="form-group">
            <label for="yes-indie">Yes</label>
            <input type="radio" name="q-indie" value="yes-indie" />
          </li>
          <li class="form-group">
            <label for="no-indie">No</label>
            <input type="radio" name="q-indie" value="no-indie" />
          </li>
        </ul>
        <ul class="odds">
          <h3>What ratings do you care about?</h3>
          <li class="form-group">
            <label for="q-ratings">Rotten Tomatoes</label>
            <select name="q-ratings">
              <option value="dont-care" selected >Don't Care</option>
              <option value=">75">Only &gt; 75%</option>
              <option value=">60">Only &gt; 60%</option>
            </select>
          </li>
          <li class="form-group">
            <label for="q-ratings">IMDB</label>
            <select name="q-ratings">
              <option value="dont-care" selected >Don't Care</option>
              <option value=">7">Only &gt; 7/10</option>
              <option value=">5">Only &gt; 5/10</option>
            </select>
          </li>
        </ul>
        <ul class="evens">
          <h3>What movie services do you have access to?</h3>
          <li class="form-group">
            <label for="netflix">Netflix</label>
            <input type="checkbox" name="q-streaming" value="netflix" checked />
          </li>
          <li class="form-group">
            <label for="hulu">Hulu</label>
            <input type="checkbox" name="q-streaming" value="hulu" checked />
          </li>
          <li class="form-group">
            <label for="amazon">Amazon Prime</label>
            <input type="checkbox" name="q-streaming" value="amazon" checked />
          </li>
          <li class="form-group">
            <label for="youtube">YouTube</label>
            <input type="checkbox" name="q-streaming" value="youtube" checked />
          </li>
          <li class="form-group">
            <label for="theaters">Theaters</label>
            <input type="checkbox" name="q-streaming" value="theaters" checked />
          </li>
        </ul>
        <button type="submit">Submit</button>
      </form>
    `;

    document
      .getElementById('question-form')
      .addEventListener('submit', this.handleSubmit);
  }
}

// All of this is triggered by Submit
// 0. Change names to match obj values
// 1. Select the input for the question (divided into ul => id=Question1)
// 2. Check if the input is "checked" (did they select that option)
// 2A. If true, then grab the value of the input
// 2B. If false, ignore
// 3. As we get values, they are inserted into the obj
// 4. Return the new obj
