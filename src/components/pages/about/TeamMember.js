import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '../../../utils/fontAwesome';
import '../../../css/pages/about/TeamMember.css';

class TeamMember extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    titles: PropTypes.arrayOf(String).isRequired,
    info: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
        emojiName: PropTypes.string,
        emojiValue: PropTypes.string
      })
    ).isRequired,
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
    const { name, titles, info, imgUrl } = this.props;
    const { showInfo } = this.state;
    return (
      <div className="team-size-container">
        <div className="team-container">
          <div className="team-item">
            <img src={imgUrl} alt={name} className="team-image" />
          </div>
          <h3 className="team-name">{name}</h3>
          <h5 className="team-role">
            {titles.map(title => (
              <div key={name + title}>
                {title}
                <br />
              </div>
            ))}
          </h5>
          {showInfo ? (
            <div className="show-info fade-in">
              {info.map(infoObj => (
                <div key={name + infoObj.name}>
                  <p className="team-info-item">
                    {infoObj.name}{' '}
                    <span role="img" aria-label={infoObj.emojiName}>
                      {infoObj.emojiValue}
                    </span>
                    {infoObj.value}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            undefined
          )}
          <button
            type="button"
            className="show-more-button"
            onClick={showInfo ? this.hideInfo : this.showInfo}
          >
            <FontAwesomeIcon icon={showInfo ? 'angle-up' : 'angle-down'} />
          </button>
        </div>
      </div>
    );
  }
}
export default TeamMember;
