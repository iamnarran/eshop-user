import React from 'react';
import config from 'config';
import CardPage from '../../components/PageCard';

const IMAGE =
process.env.NODE_ENV === 'development'
    ? config.image.development
    : config.image.production;
class Newproduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainbanner: this.props.container.mainbanner
    };
  }

  changeLocation = () => {     
    if(this.state.mainbanner !== undefined){
      window.open(this.state.mainbanner.link, '_blank')
    }
  }

  render() {
    const { newproduct, mainbanner, subbanner, widget } = this.props.container;
    let products = []
    let subbannerhtml = (<img alt="banner" src={subbanner!==undefined ? IMAGE+subbanner.img: null} className="img-fluid"/>)
    // console.log(this.props.container);    
    
    return(
      <div className="top-container">

        {/**NEW PRODUCT TITLE */}
        <div className="whole-page-title color-blue" style={{ backgroundImage: `url(${mainbanner!==undefined ? IMAGE+mainbanner.img:'' })`, 
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right', backgroundSize: '50% 120px'}} onClick={this.changeLocation}>
          <div className="container pad10">
            <div className="title-container flex-space">
              <h2>
                <span className="big">{widget===undefined ? 'Шинэ': widget.name}</span>
                <strong>{widget===undefined ? 'Шинээр худалдаалагдаж буй бараа бүтээгдэхүүн':widget.subtitle}</strong>
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
                  else { return <CardPage key={key} product={product} type="new" neew/> }
                })                
              }
            </div>
          </div>
        </div>
      
        {/**SUB BANNER */}
        <div className="banner-container">
          <span style={{ backgroundImage: `url(${subbanner!==undefined ? IMAGE+subbanner.img:''})`}}></span>
          <div className="container pad10">
            <a href={subbanner!==undefined ? subbanner.link:''} target="_blank" rel="noopener">
              {subbanner!==undefined ? subbannerhtml: null}              
            </a>
          </div>
        </div>

        {/**NEW PRODUCT'S PRODUCTS */}
        <div className="section">
          <div className="container pad10">
            <div className="row row10">
              {
                products.map((product, key) => {
                  return <CardPage key={key} product={product} type="discount" sale/> 
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