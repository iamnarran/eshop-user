import React from 'react';
import { Link } from 'react-router-dom';
import config from 'config';
import CardPage from '../../components/PageCard';

const IMAGE =
process.env.NODE_ENV === 'development'
    ? config.image.development
    : config.image.production;
class Recipe extends React.Component {
  render() {
    // const { recipeproduct, mainbanner, subbanner } = this.props
    // console.log(this.props);
    
    
    return(
      <div className="top-container">

        {/**RECIPE TITLE */}
        <div className="whole-page-title color-light-green" >
          <div className="container pad10">
            <div className="title-container flex-space">
              <h2>
                <span className="big">Хоолны жор</span>
                <strong>Таньд болон танай гэр бүлд зориулав</strong>
              </h2>
            </div>
          </div>
        </div>

        {/**RECIPE PRODUCTS */}
        <div className="section">
          <div className="container pad10">
            <div className="row row10">
              {
                // recipeproduct.map((product, key) => {
                //   if(key >= 10){ 
                //     recipeproduct.push(product)
                //     return null
                //   }
                //   else { return <CardPage key={key}  product={product} cardType="1" type="new" neew/> }
                // })                
              }
            </div>
          </div>
        </div>
              
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