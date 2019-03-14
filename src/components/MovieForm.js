import React from "react";
import "../css/movie-form.css";

class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayForm: true,
      ratings: "",
      release: "",
      age: ""
    };
  }

  backToForm = () => {
    this.setState({ displayForm: true });
  };

  /**
   * Handles submit event. Parses form data, creates a MovieList and filters the content
   * based on the form data, then removes this form so the page just has the recommendation list.
   * @param {Event} event The triggering submit event
   */
  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("question-form"));
    const ratings = formData.getAll("q-ratings");
    const release = formData.get("q-release");
    const age = formData.get("q-age");
    console.log(ratings);
    console.log(release);
    console.log(age);
    this.setState({
      displayForm: false,
      ratings: ratings,
      release: release,
      age: age
    });
    /* Old Code for reference to use in MovieList */
    // creates a new MovieList document elements
    // const newMovieList = document.createElement("yamovie-movie-list");
    // sets default list to be all movies
    // let reccMovies = newMovieList.api.getMovies();
    // if (release) {
    //   reccMovies = newMovieList.api.getMoviesByRelease(release, reccMovies);
    // }
    // if (ratings[0] !== "dont-care") {
    //   reccMovies = newMovieList.api.getMoviesByRTRatings(
    //     ratings[0],
    //     true,
    //     reccMovies
    //   );
    // }
    // if (ratings[1] !== "dont-care") {
    //   reccMovies = newMovieList.api.getMoviesByIMDBRatings(
    //     ratings[1],
    //     true,
    //     reccMovies
    //   );
    // }
    // if (age) {
    //   reccMovies = newMovieList.api.getMoviesByAge(age, reccMovies);
    // }
    // reccMovies = newMovieList.api.getMoviesByStreams(
    //   formData.getAll("q-streaming"),
    //   reccMovies
    // );
    // newMovieList.setState({ movies: reccMovies, showGenreFilter: false });
    // document.body.append(newMovieList);
    // this.remove();
  };

  render() {
    return (
      <div>
        {this.state.displayForm ? (
          <div>
            <h1>Movie Questionnaire!</h1>
            <form className="form" id="question-form">
              <ul className="odds">
                <h3>What kind of movie are you in the mood for?</h3>
                <li className="form-group">
                  <label htmlFor="funny">Funny</label>
                  <input type="radio" name="q-mood" value="funny" />
                </li>
                <li className="form-group">
                  <label htmlFor="sad">Sad</label>
                  <input type="radio" name="q-mood" value="sad" />
                </li>
                <li className="form-group">
                  <label htmlFor="dramatic">Dramatic</label>
                  <input type="radio" name="q-mood" value="dramatic" />
                </li>
                <li className="form-group">
                  <label htmlFor="dramatic">Scary</label>
                  <input type="radio" name="q-mood" value="dramatic" />
                </li>
                <li className="form-group">
                  <label htmlFor="action-packed">Action Packed</label>
                  <input type="radio" name="q-mood" value="action-packed" />
                </li>
                <li className="form-group">
                  <label htmlFor="romantic">Romantic</label>
                  <input type="radio" name="q-mood" value="romantic" />
                </li>
              </ul>
              <ul className="evens">
                <h3>What's your age range?</h3>
                <li className="form-group">
                  <label htmlFor="12under">12 and Under</label>
                  <input type="radio" name="q-age" value="12under" />
                </li>
                <li className="form-group">
                  <label htmlFor="13to18">13 - 16</label>
                  <input type="radio" name="q-age" value="13to16" />
                </li>
                <li className="form-group">
                  <label htmlFor="19to29">17 - 29</label>
                  <input type="radio" name="q-age" value="17to29" />
                </li>
                <li className="form-group">
                  <label htmlFor="30to40">30 - 40</label>
                  <input type="radio" name="q-age" value="30to40" />
                </li>
                <li className="form-group">
                  <label htmlFor="41to54">41 - 54</label>
                  <input type="radio" name="q-age" value="41to54" />
                </li>
                <li className="form-group">
                  <label htmlFor="55plus">55+</label>
                  <input type="radio" name="q-age" value="55plus" />
                </li>
              </ul>
              <ul className="odds">
                <h3>Do you want to watch a classic or modern movie?</h3>
                <li className="form-group">
                  <label htmlFor="classic">Classic</label>
                  <input type="radio" name="q-release" value="classic" />
                </li>
                <li className="form-group">
                  <label htmlFor="modern">Modern</label>
                  <input type="radio" name="q-release" value="modern" />
                </li>
                <li className="form-group">
                  <label htmlFor="in-between">In between</label>
                  <input type="radio" name="q-release" value="in-between" />
                </li>
              </ul>
              <ul className="evens">
                <h3>Do you like animated films?</h3>
                <li className="form-group">
                  <label htmlFor="yes-animated">Yes</label>
                  <input type="radio" name="q-animated" value="yes-animated" />
                </li>
                <li className="form-group">
                  <label htmlFor="no-animated">No</label>
                  <input type="radio" name="q-animated" value="no-animated" />
                </li>
              </ul>
              <ul className="odds">
                <h3>Do you like foreign films?</h3>
                <li className="form-group">
                  <label htmlFor="yes-foreign">Yes</label>
                  <input type="radio" name="q-foreign" value="yes-foreign" />
                </li>
                <li className="form-group">
                  <label htmlFor="no-foreign">No</label>
                  <input type="radio" name="q-foreign" value="no-foreign" />
                </li>
              </ul>
              <ul className="evens">
                <h3>Do you like independent films?</h3>
                <li className="form-group">
                  <label htmlFor="yes-indie">Yes</label>
                  <input type="radio" name="q-indie" value="yes-indie" />
                </li>
                <li className="form-group">
                  <label htmlFor="no-indie">No</label>
                  <input type="radio" name="q-indie" value="no-indie" />
                </li>
              </ul>
              <ul className="odds">
                <h3>What ratings do you care about?</h3>
                <li className="form-group">
                  <label htmlFor="q-ratings">Rotten Tomatoes</label>
                  <select name="q-ratings">
                    <option value="dont-care" defaultValue="dont-care">
                      Don't Care
                    </option>
                    <option value=">75">Only &gt; 75%</option>
                    <option value=">60">Only &gt; 60%</option>
                  </select>
                </li>
                <li className="form-group">
                  <label htmlFor="q-ratings">IMDB</label>
                  <select name="q-ratings">
                    <option value="dont-care" defaultValue="dont-care">
                      Don't Care
                    </option>
                    <option value=">7">Only &gt; 7/10</option>
                    <option value=">5">Only &gt; 5/10</option>
                  </select>
                </li>
              </ul>
              <ul className="evens">
                <h3>What movie services do you have access to?</h3>
                <li className="form-group">
                  <label htmlFor="netflix">Netflix</label>
                  <input
                    type="checkbox"
                    name="q-streaming"
                    value="netflix"
                    defaultChecked
                  />
                </li>
                <li className="form-group">
                  <label htmlFor="hulu">Hulu</label>
                  <input
                    type="checkbox"
                    name="q-streaming"
                    value="hulu"
                    defaultChecked
                  />
                </li>
                <li className="form-group">
                  <label htmlFor="amazon">Amazon Prime</label>
                  <input
                    type="checkbox"
                    name="q-streaming"
                    value="amazon"
                    defaultChecked
                  />
                </li>
                <li className="form-group">
                  <label htmlFor="youtube">YouTube</label>
                  <input
                    type="checkbox"
                    name="q-streaming"
                    value="youtube"
                    defaultChecked
                  />
                </li>
                <li className="form-group">
                  <label htmlFor="theaters">Theaters</label>
                  <input
                    type="checkbox"
                    name="q-streaming"
                    value="theaters"
                    defaultChecked
                  />
                </li>
              </ul>
              <button type="submit" onClick={this.handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div>
            {/* <MovieList
              ratings={this.state.ratings}
              release={this.state.release}
              age={this.state.age}
              showGenreFilter={false} */}
            <button onClick={this.backToForm}>Back to Form</button>
          </div>
        )}
      </div>
    );
  }
}

export default MovieForm;
