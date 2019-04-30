import React, { Component } from "react";
import PropTypes from "prop-types";
import Lightbox from "react-images";

import Magnifier from "./Magnifier";
import Label from "./Label";
import { IMAGE, LABEL_TYPES } from "../utils/consts";

class Gallery extends Component {
  state = {
    isLightBoxOpen: false,
    current: 0
  };

  handleThumbnailClick = e => {
    e.preventDefault();
    this.setState({
      current: parseInt(e.target.parentElement.getAttribute("name"))
    });
  };

  handleImageClick = () => {
    this.setState({ isLightBoxOpen: true });
  };

  handleLightBoxThumbnailClick = index => {
    this.setState({ current: index });
  };

  handleLightBoxClose = () => {
    this.setState({ isLightBoxOpen: false });
  };

  handleLightBoxClickPrev = () => {
    this.setState({
      current: this.state.current > 0 ? this.state.current - 1 : 0
    });
  };

  handleLightBoxClickNext = () => {
    this.setState({
      current:
        this.state.current < this.props.images.length - 1
          ? this.state.current + 1
          : this.props.images.length - 1
    });
  };

  renderImages = () => {
    return this.props.images.map(image => ({
      src: `${IMAGE}${image.lrgimg}`
    }));
  };

  render() {
    const { images, tags } = this.props;
    const { current, isLightBoxOpen } = this.state;

    return (
      <div className="product-gallery">
        <div className="perimeter">
          <div className="image" onClick={this.handleImageClick}>
            {!!tags && !!tags.length && (
              <div style={{ position: "absolute", top: "5px", left: "15px" }}>
                {tags.map((label, index) => (
                  <Label
                    key={index}
                    type={LABEL_TYPES.vertical}
                    data={label}
                    seq={index}
                  />
                ))}
              </div>
            )}
            <Magnifier
              smallImage={images[current].mdmimg}
              largeImage={images[current].lrgimg}
            />
          </div>
        </div>

        {images && (
          <div className="thumbs">
            <ul className="list-inline">
              {images.map((image, index) => {
                return (
                  <li key={index} className="list-inline-item">
                    <a
                      className="image-container"
                      onClick={this.handleThumbnailClick}
                      name={index}
                    >
                      <img
                        alt={`image${index}`}
                        className={`image${index}`}
                        src={`${IMAGE}${image.mniimg}`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <Lightbox
          images={this.renderImages()}
          currentImage={current}
          showThumbnails
          backdropClosesModal
          enableKeyboardInput
          isOpen={isLightBoxOpen}
          onClickPrev={this.handleLightBoxClickPrev}
          onClickNext={this.handleLightBoxClickNext}
          onClose={this.handleLightBoxClose}
          onClickThumbnail={this.handleLightBoxThumbnailClick}
        />
      </div>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  tags: PropTypes.array
};

export default Gallery;
