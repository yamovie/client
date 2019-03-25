import React from 'react';
import MovieList from './MovieList';
import Navbar from './Navbar';
import '../css/MovieForm.css';

class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayForm: true,
    };
  }

  /**
   * Handles back button event. Sets displayForm (state) = true which toggles the html form
   * and unmounts the Movielist component.
   * @param {Event} event Clicking the back button
   */
  backToForm = event => {
    event.preventDefault();
    this.setState({ displayForm: true });
  };

  /**
   * Handles submit event. Sets displayForm (state) = false
   * which toggles the html form and mounts the MovieList
   * component. Sets values in state equal to the parsed form data
   * and passes them down as props to MovieList
   * component so that it can utilize them to display movie results.
   * @param {Event} event The triggering submit event
   */
  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(document.getElementById('question-form'));
    const mood = formData.get('q-mood');
    const age = formData.get('q-age');
    const release = formData.get('q-release');
    const ratings = formData.getAll('q-ratings');
    const animated = formData.get('q-animated');
    const foreign = formData.get('q-foreign');
    const indie = formData.get('q-indie');
    const streaming = formData.getAll('q-streaming');

    this.setState({
      displayForm: false,
      mood,
      age,
      release,
      ratings,
      animated,
      foreign,
      indie,
      streaming,
    });
  };

  render() {
    const {
      displayForm,
      mood,
      age,
      release,
      ratings,
      animated,
      foreign,
      indie,
      streaming,
    } = this.state;
    return (
      <div>
        <Navbar />
        <div className="movie-form">
          {/* Ternary to either display the form or the results */}
          {displayForm ? (
            <div>
              <h1>Movie Questionnaire!</h1>
              <form className="form" id="question-form">
                <ul className="odds">
                  <h3>What kind of movie are you in the mood for?</h3>
                  <li className="form-group">
                    <label htmlFor="funny" name="q-mood">
                      Funny
                      <input type="radio" name="q-mood" value="funny" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="sad">
                      Sad
                      <input type="radio" name="q-mood" value="sad" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="dramatic">
                      Dramatic
                      <input type="radio" name="q-mood" value="dramatic" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="scary">
                      Scary
                      <input type="radio" name="q-mood" value="scary" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="action-packed">
                      Action Packed
                      <input type="radio" name="q-mood" value="action-packed" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="romantic">
                      Romantic
                      <input type="radio" name="q-mood" value="romantic" />
                    </label>
                  </li>
                </ul>
                <ul className="evens">
                  <h3>What is your age range?</h3>
                  <li className="form-group">
                    <label htmlFor="12under">
                      12 and Under
                      <input type="radio" name="q-age" value="12under" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="13to18">
                      13 - 16
                      <input type="radio" name="q-age" value="13to16" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="19to29">
                      17 - 29
                      <input type="radio" name="q-age" value="17to29" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="30to40">
                      30 - 40
                      <input type="radio" name="q-age" value="30to40" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="41to54">
                      41 - 54
                      <input type="radio" name="q-age" value="41to54" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="55plus">
                      55+
                      <input type="radio" name="q-age" value="55plus" />
                    </label>
                  </li>
                </ul>
                <ul className="odds">
                  <h3>Do you want to watch a classic or modern movie?</h3>
                  <li className="form-group">
                    <label htmlFor="classic">
                      Classic
                      <input type="radio" name="q-release" value="classic" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="modern">
                      Modern
                      <input type="radio" name="q-release" value="modern" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="in-between">
                      In between
                      <input type="radio" name="q-release" value="in-between" />
                    </label>
                  </li>
                </ul>
                <ul className="evens">
                  <h3>Do you like animated films?</h3>
                  <li className="form-group">
                    <label htmlFor="yes-animated">
                      Yes
                      <input type="radio" name="q-animated" value="yes-animated" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="no-animated">
                      No
                      <input type="radio" name="q-animated" value="no-animated" />
                    </label>
                  </li>
                </ul>
                <ul className="odds">
                  <h3>Do you like foreign films?</h3>
                  <li className="form-group">
                    <label htmlFor="yes-foreign">
                      Yes
                      <input type="radio" name="q-foreign" value="yes-foreign" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="no-foreign">
                      No
                      <input type="radio" name="q-foreign" value="no-foreign" />
                    </label>
                  </li>
                </ul>
                <ul className="evens">
                  <h3>Do you like independent films?</h3>
                  <li className="form-group">
                    <label htmlFor="yes-indie">
                      Yes
                      <input type="radio" name="q-indie" value="yes-indie" />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="no-indie">
                      No
                      <input type="radio" name="q-indie" value="no-indie" />
                    </label>
                  </li>
                </ul>
                <ul className="odds">
                  <h3>What ratings do you care about?</h3>
                  <li className="form-group">
                    {/* eslint-disable */}
                    <label htmlFor="q-ratings">
                      Rotten Tomatoes
                      <select name="q-ratings">
                        <option value="dont-care" defaultValue="dont-care">
                          Do not Care
                        </option>
                        <option value=">75">Only &gt; 75%</option>
                        <option value=">60">Only &gt; 60%</option>
                      </select>
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="q-ratings">
                      IMDB
                      <select name="q-ratings">
                        <option value="dont-care" defaultValue="dont-care">
                          Do not Care
                        </option>
                        <option value=">7">Only &gt; 7/10</option>
                        <option value=">5">Only &gt; 5/10</option>
                      </select>
                    </label>
                  </li>
                </ul>
                {/* eslint-enable */}
                <ul className="evens">
                  <h3>What movie services do you have access to?</h3>
                  <li className="form-group">
                    <label htmlFor="netflix">
                      Netflix
                      <input
                        type="checkbox"
                        name="q-streaming"
                        value="netflix"
                        defaultChecked
                      />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="hulu">
                      Hulu
                      <input
                        type="checkbox"
                        name="q-streaming"
                        value="hulu"
                        defaultChecked
                      />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="amazon">
                      Amazon Prime
                      <input
                        type="checkbox"
                        name="q-streaming"
                        value="amazon"
                        defaultChecked
                      />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="youtube">
                      YouTube
                      <input
                        type="checkbox"
                        name="q-streaming"
                        value="youtube"
                        defaultChecked
                      />
                    </label>
                  </li>
                  <li className="form-group">
                    <label htmlFor="theaters">
                      Theaters
                      <input
                        type="checkbox"
                        name="q-streaming"
                        value="theaters"
                        defaultChecked
                      />
                    </label>
                  </li>
                </ul>
                <button type="submit" onClick={this.handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <div>
              {
                <MovieList
                  age={age}
                  animated={animated}
                  foreign={foreign}
                  indie={indie}
                  mood={mood}
                  ratings={ratings}
                  release={release}
                  streaming={streaming}
                  showGenreFilter={false}
                />
              }
              <button type="submit" onClick={this.backToForm}>
                Back to Form
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MovieForm;
