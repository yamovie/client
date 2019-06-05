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
        emojiValue: PropTypes.string,
      }),
    ).isRequired,
    imgUrl: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showInfo: false,
    };
  }

  showInfo = () => {
    this.setState({
      showInfo: true,
    });
  };

  hideInfo = () => {
    this.setState({
      showInfo: false,
    });
  };

  render() {
    const { name, titles, info, imgUrl } = this.props;

    const { showInfo } = this.state;
    return (
      <div
        className="team-member"
        role="button"
        tabIndex={0}
        onClick={showInfo ? this.hideInfo : this.showInfo}
      >
        <img src={imgUrl} alt={name} className="member-image" />
        <h3 className="member-name">{name}</h3>
        <h5 className="member-role">
          {titles.map(title => (
            <div key={name + title}>{title}</div>
          ))}
        </h5>
        <div className="member-info fade-in" style={showInfo ? {} : { display: 'none' }}>
          {info.map(infoObj => (
            <div className="info-line" key={name + infoObj.name}>
              <p className="info-category">
                {infoObj.name}
                {infoObj.emojiName && infoObj.emojiValue && (
                  <span role="img" aria-label={infoObj.emojiName}>
                    {` ${infoObj.emojiValue}`}
                  </span>
                )}
              </p>
              <span className="info-value">{infoObj.value}</span>
            </div>
          ))}
        </div>
        <span className="expand-icon">
          <FontAwesomeIcon icon={showInfo ? 'angle-up' : 'angle-down'} />
        </span>
      </div>
    );
  }
}
export default TeamMember;
