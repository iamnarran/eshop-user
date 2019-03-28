import React from "react";
import ReactImageMagnify from "react-image-magnify";
import Lightbox from "react-images";

import Label from "./../Label";
import { IMAGE } from "../../utils/consts";

import "./index.css";

class Component extends React.Component {
  state = {
    img: [],
    isLargeImg: false,
    currentImage: null
  };

  onClickImage = () => {
    this.setState({ isLargeImg: true, currentImage: null });
  };
  closeLightbox = () => {
    this.setState({ isLargeImg: false });
  };
  gotoPrevLightboxImage = () => {
    this.setState({
      currentImage:
        this.state.currentImage === null
          ? Number(this.props.slImg) - 1
          : this.state.currentImage - 1
    });
  };
  gotoNextLightboxImage = () => {
    this.setState({
      currentImage:
        this.state.currentImage === null
          ? Number(this.props.slImg) + 1
          : this.state.currentImage + 1
    });
  };
  onClickThumbnail = e => {
    this.setState({ currentImage: e });
  };
  renderImage = () => {
    const { images } = this.props;
    let tmp = [];
    images.map(i => tmp.push({ src: IMAGE + i.lrgimg }));
    return tmp;
  };

  render() {
    const { img, tags } = this.props;
    const { currentImage } = this.state;
    // console.log(this.props.images)
    return (
      <div className="perimeter">
        <div className="image" onClick={this.onClickImage}>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src: `${img}`,
                sizes:
                  "(min-width: 780px) 100vw, (max-width: 1200px) 30vw, 360px"
              },
              largeImage: {
                src: `${img}`,
                width: 1200,
                height: 1800
              },
              enlargedImageContainerDimensions: {
                width: "210%",
                height: "150%"
              },
              isHintEnabled: true
            }}
            style={{ zIndex: 15 }}
          />
        </div>
        <div className="image-container medium-magnify">
          {tags &&
            tags.map((label, index) => (
              <Label key={index} seq={index} data={label}>
                54
              </Label>
            ))}
        </div>
        <Lightbox
          images={this.renderImage()}
          currentImage={
            currentImage === null ? Number(this.props.slImg) : currentImage
          }
          showThumbnails
          backdropClosesModal
          enableKeyboardInput
          isOpen={this.state.isLargeImg}
          onClickPrev={this.gotoPrevLightboxImage}
          onClickNext={this.gotoNextLightboxImage}
          onClose={this.closeLightbox}
          onClickThumbnail={this.onClickThumbnail}
        />
      </div>
    );
  }
}

export default Component;
