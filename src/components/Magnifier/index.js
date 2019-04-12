import React from "react";
import PropTypes from "prop-types";
import ReactImageMagnify from "react-image-magnify";

import { IMAGE } from "../../utils/consts";

import "./index.css";

class Magnifier extends React.Component {
  render() {
    const { smallImage, largeImage } = this.props;

    return (
      <ReactImageMagnify
        {...{
          smallImage: {
            isFluidWidth: true,
            src: `${IMAGE}${smallImage}`,
            sizes: "(min-width: 780px) 100vw, (max-width: 1200px) 30vw, 360px"
          },
          largeImage: {
            src: `${IMAGE}${largeImage}`,
            width: 1800,
            height: 1800
          },
          enlargedImageContainerDimensions: {
            width: "250%",
            height: "200%"
          }
        }}
        style={{ zIndex: 15 }}
      />
    );
  }
}

Magnifier.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired
};

export default Magnifier;
