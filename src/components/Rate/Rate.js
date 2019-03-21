import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Rate.css";

class Rate extends React.Component {
  state = {
    rate: 0,
    numOfVotes: 0
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  render() {
    const color = "#fdbc32";

    let rate = this.state.rate;
    rate = rate < 0 ? 0 : rate;
    rate = rate > 10 ? 10 : rate;

    let stars = [];
    for (let i = 0; i < Math.floor(rate / 2); i++) {
      stars.push(
        <FontAwesomeIcon
          key={stars.length}
          icon={["fas", "star"]}
          color={color}
        />
      );
    }

    if (rate % 2 !== 0) {
      stars.push(
        <FontAwesomeIcon
          key={stars.length}
          icon={["fas", "star-half-alt"]}
          color={color}
        />
      );
    }

    const restStars = 5 - stars.length;
    for (let j = 0; j < restStars; j++) {
      stars.push(
        <FontAwesomeIcon
          key={stars.length}
          icon={["far", "star"]}
          color={color}
        />
      );
    }

    return (
      <Link to="#" className="rating">
        <ul className="list-inline">
          <li className="list-inline-item active">{stars}</li>
          <li className="list-inline-item">
            <span className="text">{this.state.numOfVotes}</span>
          </li>
        </ul>
      </Link>
    );
  }
}

Rate.propTypes = {
  rate: PropTypes.number.isRequired,
  numOfVotes: PropTypes.number.isRequired
};

export default Rate;
