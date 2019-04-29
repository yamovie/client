import React from 'react';
import Proptypes from 'prop-types';
import axios from 'axios'
import MovieFeed from '../components/MovieFeed';
import '../css/FindMoviePage.css';
import { ChatWindow } from '../components';
import { FontAwesomeIcon } from '../utils/fontAwesome';

const serverLink = 'https://yamovie-server-staging.herokuapp.com/api';

class FindMoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genreIds: {},
      results: [{}],
      talkedToLloyd: false,
      mountChat: false,
      isExpanded: true,
    };
  }

  getMovieResults = dataObj => {
    const { history } = this.props;
    // console.log("Get Movie Results");
    // console.log(dataObj);
    axios
      .post(`${serverLink}/movies/recommend`, dataObj, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        this.setState({
          results: response.data.results,
          talkedToLloyd: true,
        });
        history.push('/recommendations');
      })
      .catch(error => console.log(error));
  };

  getGenreData = () => {
    axios
      .get(`${serverLink}/genres`)
      .then(response => {
        // const genreArray = response.data;
        // const idObject = {};
        // for (let i = 0; i < genreArray.length; i++) {
        //   const str = genreArray[i].name.replace(/\s+/g, '');
        //   idObject[str] = genreArray[i]._id;
        // }

        const genreIds = response.data.reduce((acc, curr) => {
          acc[curr.translation] = curr._id;
          return acc;
        }, {});
        this.setState({
          genreIds,
          mountChat: true,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  // static getDerivedStateFromProps(props, state) {
  //   if (props.results !== state.results) {
  //     return { results: props.results };
  //   }
  //   return null;
  // }

  resetMovieResults = () => {
    this.setState({ talkedToLloyd: false });
  };

  // componentDidUpdate = prevProps => {
  //   if (this.props.results !== prevProps.results) {
  //     this.setState({ results: this.getDerivedStateFromProps });
  //   }
  // };

  componentDidMount = () => {
    this.getGenreData();
  }

  toggleExpanded = () => {
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  };

  render() {
    const {
      talkedToLloyd,
      genreIds,
      results,
      mountChat,
      isExpanded,
    } = this.state;

    const {
      history,
    } = this.props;

    return (
      <div>
        <div className="top-chat-container"
          style={isExpanded ? { height: '0'} : {}}
        >
          <img className="lloyd-icon" src="/images/lloyd.png" alt="Lloyd"/>
          <h1 className="lloyd-title">Lloyd Chat</h1>
          <button
            type="button"
            className="expand-indicator"
            onClick={this.toggleExpanded}
            style={isExpanded ? { display: 'none'} : {}}
          >
            <FontAwesomeIcon className="angle-icon" icon="angle-down" />
          </button>
        </div>
        <div className="bottom-chat-container"
        >
          { mountChat && isExpanded ?
            <ChatWindow
              toggleChat={this.toggleExpanded}
              getMovieResults={this.getMovieResults}
              resetMovieResults={this.resetMovieResults}
              genreIds={genreIds}
            /> : ''}
        </div>
        {talkedToLloyd && results.length > 0 ? (
          <MovieFeed results={results} showGenreFilter={false} history={history} />
        ) : (
          ''
        )}
        {!talkedToLloyd ? (
          ''
        ) : (
          ''
        )}
        {results.length === 0 ? (
          <div>
            <h1 className="findMovieh1">
              Lloyd could not find anything that matched your preferences.
            </h1>
            <br />
            <h3 className="findMovieh3">
              Ask him again with different criteria so he can find YaMovie or come back
              later because our database is always expanding!
            </h3>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
export default FindMoviePage;
