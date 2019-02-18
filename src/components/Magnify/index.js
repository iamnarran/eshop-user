import React from "react"
import ReactImageMagnify from "react-image-magnify"
import "./index.css"

class Component extends React.Component {
  state = {
    img: []
  }

  componentDidMount(){ this.setState({...this.props})}
  
  render() {
    const { img } = this.state
    return (
      <div className="perimeter">
        <div className="image">
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

export default Component;