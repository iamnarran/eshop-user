import React from 'react';
import config from 'config';
import { Link } from 'react-router-dom';
import CardPage from '../../components/PageCard';

const IMAGE =
process.env.NODE_ENV === 'development'
    ? config.image.development
    : config.image.production;
class Newproduct extends React.Component {
  render() {
    const { newproduct, mainbanner, subbanner } = this.props.container;
    let products = []
    // console.log(newproduct);    
    
    return(
      <div className="top-container">

        {/**NEW PRODUCT TITLE */}
        <div className="whole-page-title color-blue" style={{ backgroundImage: `url(${IMAGE+mainbanner.img })`, 
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right', backgroundSize: '50%'}}>
          <div className="container pad10">
            <div className="title-container flex-space">
              <h2>
                <span className="big">Шинэ</span>
                <strong>Шинээр худалдаалагдаж буй бараа бүтээгдэхүүн</strong>
              </h2>
            </div>
          </div>
        </div>

        {/**NEW PRODUCT'S PRODUCTS */}
        <div className="section">
          <div className="container pad10">
            <div className="row row10">
              {
                newproduct.map((product, key) => {
                  if(key >= 10){ 
                    products.push(product)
                    return null
                  }
                  else { return <CardPage key={key}  product={product} cardType="1" type="new" neew/> }
                })                
              }
            </div>
          </div>
        </div>
      
        {/**SUB BANNER */}
        <div className="banner-container">
          <span style={{ backgroundImage: `url(${IMAGE+subbanner.img })`}}></span>
          <div className="container pad10">
            <Link to={subbanner.link}>
              <img alt="banner" src={IMAGE+subbanner.img} className="img-fluid"/>
            </Link>
          </div>
        </div>

        {/**NEW PRODUCT'S PRODUCTS */}
        <div className="section">
          <div className="container pad10">
            <div className="row row10">
              {
                products.map((product, key) => {
                  return <CardPage key={key}  product={product} cardType="1" type="sale" sale/> 
                })                
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Newproduct.default = {
  newproduct: [],
}

export default Newproduct;