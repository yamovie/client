import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '../../../utils/fontAwesome';
import '../../../css/pages/AboutPage.css';

class TeamMember extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    favMovie: PropTypes.string.isRequired,
    favShow: PropTypes.string.isRequired,
    favGenre: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showInfo: false
    };
  }

  showInfo = () => {
    this.setState({
      showInfo: true
    });
  };

  hideInfo = () => {
    this.setState({
      showInfo: false
    });
  };

  render() {
    const { name, title, favMovie, favShow, favGenre, imgUrl } = this.props;
    const { showInfo } = this.state;
    return (
      <div className="avatar-size-container">
        <div className="avatar-container">
          <div className="avatar-item">
            <img src={imgUrl} alt={name} className="avatar-image" />
          </div>
          <h3 className="avatar-name">{name}</h3>
          <h5 className="avatar-role">
            {title} <br />
            Software Engineer
          </h5>
          {showInfo ? (
            <div className="show-info fade-in">
              <p className="avatar-movie">
                Favorite Movies{' '}
                <span role="img" aria-label="popcorn">
                  🍿
                </span>
                : {favMovie}
              </p>
              <p className="avatar-show">
                Favorite Show{' '}
                <span role="img" aria-label="television set">
                  📺
                </span>
                : {favShow}
              </p>
              <p className="avatar-genre"> Favorite Genre: {favGenre}</p>
              <button
                type="button"
                className="show-less-button"
                onClick={this.hideInfo}
              >
                <FontAwesomeIcon icon="angle-up" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="show-more-button"
              onClick={this.showInfo}
            >
              <FontAwesomeIcon icon="angle-down" />
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default TeamMember;
