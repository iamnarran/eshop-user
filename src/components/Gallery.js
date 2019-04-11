import React, { Component } from "react";
import PropTypes from "prop-types";
import Lightbox from "react-images";

import Magnifier from "./Magnifier";
import { IMAGE } from "../utils/consts";

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
      src: `${IMAGE}${image.imglrg}`
    }));
  };

  render() {
    const { images } = this.props;
    const { current, isLightBoxOpen } = this.state;

    return (
      <div className="col-xl-5 col-lg-5 col-md-5">
        <div className="product-gallery">
          <div className="perimeter">
            <div className="image" onClick={this.handleImageClick}>
              <Magnifier
                smallImage={images[current].imgmdm}
                largeImage={images[current].imglrg}
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
                          src={`${IMAGE}${image.imgmni}`}
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

          {/* <div className="share">
            <ul className="list-inline">
              <li className="list-inline-item">
                <span>Хуваалцах:</span>
              </li>
              <li className="list-inline-item">
                <FacebookShareButton
                  url={window.location.href}
                  quote={product.name}
                  className="Demo__some-network__share-button"
                >
                  <FacebookIcon size={25} round />
                </FacebookShareButton>
              </li>
              <li className="list-inline-item">
                <TwitterShareButton
                  url={window.location.href}
                  quote={product.name}
                  className="Demo__some-network__share-button"
                >
                  <TwitterIcon size={25} round />
                </TwitterShareButton>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired
};

export default Gallery;
