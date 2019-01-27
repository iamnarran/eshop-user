import React from 'react';
import CardPage from '../../components/PageCard';
import config from 'config';
import { Link } from 'react-router-dom';
/* import PropTypes from 'prop-types'; */

const IMAGE =
    process.env.NODE_ENV === 'development'
        ? config.image.development
        : config.image.production;
class Salepage extends React.Component {
  render() {
    const { saleproduct, mainbanner, subbanner } = this.props.container;    
    let products = []
    
    return (
      <div className="top-container">
        <div className="whole-page-title color-main" style={{ backgroundImage: `url(${IMAGE+mainbanner.img })`, 
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right', backgroundSize: '50%'}}>
          <div className="container pad10">
            <div className="title-container flex-space">
              <h2>
                <span className="big">Хямдралтай</span>
                <strong>Хугацаагүй хямдрал зарлагдсан бараа бүтээгдэхүүн</strong>
              </h2>
            </div>         
          </div>
        </div>

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

        <div className="banner-container">
          <span style={{ backgroundImage: `url(${IMAGE+subbanner.img })`}}></span>
          <div className="container pad10">
            <Link to={subbanner.link}>
              <img alt="banner" src={IMAGE+subbanner.img} className="img-fluid"/>
            </Link>
          </div>
        </div>

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

Salepage.default = {
  saleproduct: []
}

export default Salepage;