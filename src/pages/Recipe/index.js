import React from 'react';
import config from 'config';
import Widget from '../../components/Widget';

const IMAGE =
process.env.NODE_ENV === 'development'
    ? config.image.development
    : config.image.production; 

class Recipe extends React.Component {
  render() {
    const { recipeproduct, mainbanner, menu, widget } = this.props.container
    // console.log(this.props);


    return (
      <div className="top-container">

        {/**RECIPE PRODUCT TITLE */}
        <div className="whole-page-title color-blue class container pad10" style={{ backgroundImage: `url(${mainbanner !== undefined ? IMAGE + mainbanner.img : ''})`,
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right', backgroundSize: '50% 115px' }} onClick={this.changeLocation}>
          <div className="container pad10">
            <div className="title-container flex-space">
              <h2>
                <span className="big">{menu[0]===undefined ? '':menu[0].menunm}</span>
                <strong>{menu[0]===undefined ? '':menu[0].subtitle}</strong>
              </h2>
            </div>
          </div>
        </div>

        {/**RECIPE PRODUCTS */}
        <Widget items={recipeproduct} type={2} widget={widget[0]===undefined ? '': widget[0]} />

        {/**RECIPE SUB BANNER */}
        {/* <div className="banner-container">
          <span style={{ backgroundImage: `url(${IMAGE+subbanner.img })`}}></span>
          <div className="container pad10">
            <Link to={subbanner.link}>
              <img alt="banner" src={IMAGE+subbanner.img} className="img-fluid"/>
            </Link>
          </div>
        </div> */}
      </div>

    );
  }
}

export default Recipe;