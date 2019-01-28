import React from 'react';
import CardPage from '../../components/PageCard';
import config from 'config';
import { Link } from 'react-router-dom';
/* import PropTypes from 'prop-types'; */

const IMAGE =
    process.env.NODE_ENV === 'development'
        ? config.image.development
        : config.image.production;
class Discount extends React.Component {

  changeLocation = (e) => {
    console.log(this);       
    
  }
  render() {
    const { saleproduct, mainbanner, subbanner } = this.props.container;    
    let subbannerhtml = (<img alt="banner" src={subbanner!==undefined ? IMAGE+subbanner.img:''} className="img-fluid"/>)
    let products = []
    
    return (
      <div className="top-container">
        {/**DISCOUNT PRODUCT TITLE*/}
        <div className="whole-page-title color-main class" style={{ backgroundImage: `url(${mainbanner!==undefined ? IMAGE+mainbanner.img:''})`, 
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right', backgroundSize: '50% 120px'}} onClick={this.changeLocation}>
          <div className="container pad10">
            <div className="title-container flex-space">
              <h2>
                <span className="big">Хямдралтай</span>
                <strong>Хугацаагүй хямдрал зарлагдсан бараа бүтээгдэхүүн</strong>
              </h2>
            </div>         
          </div>
        </div>

        {/**SUB BANNER PRODUCT */}
        <div className="section">
          <div className="container pad10">
            <div className="row row10">
              {
                saleproduct.map((product, key) => {
                  if(key >= 10){ 
                    products.push(product)
                    return null
                  }
                  else { return <CardPage key={key}  product={product} type="discount" sale/> }
                })                
              }
            </div>
          </div>
        </div>

        {/**DISCOUNT SUB BANNER */}
        <div className="banner-container">
          <span style={{ backgroundImage: `url(${subbanner!==undefined ? IMAGE+subbanner.img:''})`}}></span>
          <div className="container pad10">
            <a href={subbanner!==undefined ? subbanner.link:''} target="_blank" rel="noopener">
              {subbanner!==undefined ? subbannerhtml:''}
            </a>
          </div>
        </div>

        {/**FOOTER PRODUCT */}
        <div className="section">
          <div className="container pad10">
            <div className="row row10">
              {
                products.map((product, key) => {
                  return <CardPage key={key}  product={product} type="discount" sale/> 
                })                
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Discount.default = {
  saleproduct: []
}

export default Discount;