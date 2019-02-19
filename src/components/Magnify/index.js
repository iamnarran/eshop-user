import React from "react"
import ReactImageMagnify from "react-image-magnify"
import "./index.css"
import Lightbox from 'react-images';
import p11 from "../../scss/assets/images/demo/20.jpg"
import p12 from "../../scss/assets/images/demo/21.jpg"


class Component extends React.Component {
  state = {
    img: [],
    isLargeImg: false,
    currentImage: 0,
  }
  
  render() {    
    const { img } = this.props
    const { currentImage } = this.state
    
    return (
      <div className="perimeter">
        <div className="image" onClick={this.onClickImage}>
          <ReactImageMagnify {...{
            smallImage: {
              alt: 'Wristwatch by Ted Baker London',
              isFluidWidth: true,
              src: `${img}`,
              sizes: '(min-width: 780px) 100vw, (max-width: 1200px) 30vw, 360px',
              
            },            
            largeImage: {
              src: `${img}`,
              width: 1200,
              height: 1800,
            },
            enlargedImageContainerDimensions: {
              width: '210%',
              height: '130%'
            },
            isHintEnabled: true
          }}
            style={{ zIndex: 100 }}
          />
        </div>
        <Lightbox
          images={[
            { src: img },
            { src: p11 },
            { src: img },
            { src: p12 },
            { src: img },
            { src: p11 },
          ]}
          currentImage={currentImage}
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
  onClickImage = () => {
    this.setState({ isLargeImg : true })
  }
  closeLightbox = () => {
    this.setState({isLargeImg: false})
  }
  gotoPrevLightboxImage = () => { this.setState({currentImage: this.state.currentImage-1}) }
  gotoNextLightboxImage = () => { this.setState({ currentImage: this.state.currentImage + 1 }) }
  onClickThumbnail = (e) => { this.setState({ currentImage: e }) }
  
}

export default Component;