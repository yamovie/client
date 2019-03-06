export default class MovieForm extends HTMLElement {

  connectedCallback() {
    this.render();
  }
  
  render() {
    this.innerHTML = `
    <h1>Movie Questionaire!</h1>
    <form class="form">
      <ul>
        <h3>What kind of movie are you in the mood for?</h3>
        <li class="form-group">
          <label for="funny">Funny</label>
          <input type="radio" name="q1" value="funny" />
        </li>
        <li class="form-group">
          <label for="sad">Sad</label>
          <input type="radio" name="q1" value="sad" />
        </li>
        <li class="form-group">
          <label for="dramatic">Dramatic</label>
          <input type="radio" name="q1" value="dramatic" />
        </li>
        <li class="form-group">
          <label for="dramatic">Scary</label>
          <input type="radio" name="q1" value="dramatic" />
        </li>
        <li class="form-group">
          <label for="action-packed">Action Packed</label>
          <input type="radio" name="q1" value="action-packed" />
        </li>
        <li class="form-group">
          <label for="romantic">Romantic</label>
          <input type="radio" name="q1" value="romantic" />
        </li>
      </ul>
      <ul>
        <h3>What's your age range?</h3>
        <li class="form-group">
          <label for="12under">12 and Under</label>
          <input type="radio" name="q2" value="12under" />
        </li>
        <li class="form-group">
          <label for="13to18">13 - 18</label>
          <input type="radio" name="q2" value="13to18" />
        </li>
        <li class="form-group">
          <label for="19to29">19 - 29</label>
          <input type="radio" name="q2" value="19to29" />
        </li>
        <li class="form-group">
          <label for="30to40">30 - 40</label>
          <input type="radio" name="q2" value="30to40" />
        </li>
        <li class="form-group">
          <label for="41to54">41 - 54</label>
          <input type="radio" name="q2" value="41to54" />
        </li>
        <li class="form-group">
          <label for="55plus">55+</label>
          <input type="radio" name="q2" value="55plus" />
        </li>
      </ul>
      <ul>
        <h3>Do you want to watch a classic or modern movie?</h3>
        <li class="form-group">
          <label for="classic">Classic</label>
          <input type="radio" name="q3" value="classic" />
        </li>
        <li class="form-group">
          <label for="modern">Modern</label>
          <input type="radio" name="q3" value="modern" />
        </li>
        <li class="form-group">
          <label for="in-between">In between</label>
          <input type="radio" name="q3" value="in-between" />
        </li>
      </ul>
      <ul>
        <h3>Do you like animated films?</h3>
        <li class="form-group">
          <label for="yes-animated">Yes</label>
          <input type="radio" name="q4" value="yes-animated" />
        </li>
        <li class="form-group">
          <label for="no-animated">No</label>
          <input type="radio" name="q4" value="no-animated" />
        </li>
      </ul>
      <ul>
        <h3>Do you like foreign films?</h3>
        <li class="form-group">
          <label for="yes-foreign">Yes</label>
          <input type="radio" name="q5" value="yes-foreign" />
        </li>
        <li class="form-group">
          <label for="no-foreign">No</label>
          <input type="radio" name="q5" value="no-foreign" />
        </li>
      </ul>
      <ul>
        <h3>Do you like independent films?</h3>
        <li class="form-group">
          <label for="yes-indie">Yes</label>
          <input type="radio" name="q6" value="yes-indie" />
        </li>
        <li class="form-group">
          <label for="no-indie">No</label>
          <input type="radio" name="q6" value="no-indie" />
        </li>
      </ul>
      <ul>
        <h3>Do you prefer fiction or nonfiction?</h3>
        <li class="form-group">
          <label for="fiction">Fiction</label>
          <input type="radio" name="q7" value="fiction" />
        </li>
        <li class="form-group">
          <label for="nonfiction">Nonfiction</label>
          <input type="radio" name="q7" value="nonfiction" />
        </li>
      </ul>
      <ul>
        <h3>What movie services do you have access to?</h3>
        <li class="form-group">
          <label for="netflix">Netflix</label>
          <input type="checkbox" name="q8" value="netflix" />
        </li>
        <li class="form-group">
          <label for="hulu">Hulu</label>
          <input type="checkbox" name="q8" value="hulu" />
        </li>
        <li class="form-group">
          <label for="amazon-prime">Amazon Prime</label>
          <input type="checkbox" name="q8" value="amazon-prime" />
        </li>
      </ul>
      <ul>
        <h3>Do you prefer fiction or nonfiction?</h3>
        <li class="form-group">
          <label for="fiction">Fiction</label>
          <input type="radio" name="q9" value="fiction" />
        </li>
        <li class="form-group">
          <label for="nonfiction">Nonfiction</label>
          <input type="radio" name="q9" value="nonfiction" />
        </li>
      </ul>
      <ul>
        <h3>Which online review sites do you use?</h3>
        <li class="form-group">
          <label for="rotten-tomatoes">Rotten Tomatoes</label>
          <input type="checkbox" name="q10" value="rotten-tomatoes" />
        </li>
        <li class="form-group">
          <label for="imdb">IMDB</label>
          <input type="checkbox" name="q10" value="imbd" />
        </li>
      </ul>
      <button>Submit</button>
    </form>
    `;
  }
}

