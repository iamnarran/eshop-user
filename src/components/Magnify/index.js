import React from "react"
import ReactImageMagnify from "react-image-magnify"
import "./index.css"
import Lightbox from 'react-images';

class Component extends React.Component {
  state = {
    img: [],
    isLargeImg: false
  }
  
  render() {    
    const { img } = this.props
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
            { src: img }
          ]}
          isOpen={this.state.isLargeImg}
          onClose={this.closeLightbox}
        />
      </div>
    );
  }
  onClickImage = () => {
    console.log("h11ello")
    this.setState({ isLargeImg : true })
  }
  closeLightbox = () => {
    this.setState({isLargeImg: false})
  }
}

export default Component;