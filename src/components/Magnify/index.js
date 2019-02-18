import React from "react"
import ReactImageMagnify from "react-image-magnify"
import "./index.css"
import config from "config";

class Component extends React.Component {
  state = {
    img: []
  }
  
  render() {    
    const { img } = this.props
    return (
      <div className="perimeter">
        <div className="image">
          <ReactImageMagnify {...{
            smallImage: {
              alt: 'Wristwatch by Ted Baker London',
              isFluidWidth: true,
              src: `${IMAGE+img}`,
              sizes: '(min-width: 780px) 100vw, (max-width: 1200px) 30vw, 360px',
            },
            largeImage: {
              src: `${IMAGE+img}`,
              width: 1200,
              height: 1800
            },
            enlargedImageContainerDimensions: {
              width: '210%',
              height: '100%'
            },
            isHintEnabled: true
          }}
            style={{
              zIndex: 100
            }}/>
        </div>
      </div>
    );
  }
}

const IMAGE =
  process.env.NODE_ENV === "development"
    ? config.image.development
    : config.image.production;

export default Component;