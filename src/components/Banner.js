import React from "react";
import PropTypes from "prop-types";

import { IMAGE } from "../utils/consts";

class Banner extends React.Component {
  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    const selected = data[Math.floor(Math.random() * data.length)];

    return (
      <div className="banner-container">
        <span style={{ backgroundImage: `url(${IMAGE + selected.imgnm})` }} />
        <div className="container pad10">
          <a href={selected.link ? selected.link : "#"} target="_blank">
            <img
              alt="banner"
              src={IMAGE + selected.imgnm}
              className="img-fluid"
            />
          </a>
        </div>
      </div>
    );
  }
}

Banner.propTypes = {
  data: PropTypes.array.isRequired
};

export default Banner;
