import React from "react";
import p10 from "../../scss/assets/images/demo/19.jpg"
import p11 from "../../scss/assets/images/demo/20.jpg"
import Magnify from "../Magnify"
import api from "../../api"
import RelationalProduct from "./RelationalProduct"
import Information from "./Information"
import Collection from "./CollectionProduct"
import Comment from "./Comment"
import Rate from "../Rate"

class ProductDetail extends React.Component{
  state = {
    value: [],
    product: [],
    skucd: null,
    breadCrumb: [],
    productNumber: 1,
    sumPrice: null,
    attribute: [],
    relationalProduct: [],
    collectionProduct: []
  }

  componentWillMount(){ this.setState({skucd: this.props.match.params.id})}
  componentDidMount() { this.getAll() }

  render() {
    const { breadCrumb, product, productNumber, sumPrice, attribute, relationalProduct, collectionProduct, skucd } = this.state;

    let image = (
      <div className="col-xl-4 col-lg-4 col-md-5 pad10">
        <div className="product-gallery">
            <Magnify img={p10} />
            <div className="thumbs">
            <ul className="list-inline" onChange={this.onChangeImage}>
                <li className="list-inline-item active">
                  <a href="/" className="image-container">
                    <img alt="image1" src={p10}/>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/" className="image-container">
                    <img alt="image2" src={p11}/>
                  </a>
                </li>
  
                <li className="list-inline-item">
                  <a href="/" className="image-container">
                    <img alt="image3" src={p10}/>
                  </a>
                </li>
              </ul>                    
            </div>
          </div>
      </div>
    )
    return(
      <div className="section">
        <div className="container pad10">

          {/**PRODUCT CATEGORY BREADCRUMB */}
          <div className="e-breadcrumb">
            <ul className="list-unstyled">
              {
                breadCrumb.map((i, key) => {
                  return <li key={key}>
                    <a href="/">{i.name}</a>
                  </li>
                })
              }
            </ul>
          </div>
          
          <div className="product-detail-page">
            <div className="row row10">
              {/**PRODUCT IMAGE */}
              {image}
              {/**PRODUCT DESCRIPTION */}
              <div className='col-xl-5 col-lg-5 col-md-7 pad10 magnify-image'>
                <div className='product-info'>
                  <h5 className="title">{product.name}</h5>
                  ({product.backtxt})
                  <p className="big-text"> 
                    <strong>{
                      breadCrumb.map((i, e) => {
                        if (e === breadCrumb.length - 1) { return i.name }
                        else {return null}
                      })
                    }</strong>
                  </p>
                  <Rate rate={5} numOfVotes={197} />
                  
                  <div className="gift">
                    <div className="image-container">
                      {/* <a href="/">
                        <span className="image" style={{backgroundImage: `url(${p4})`}}></span>
                      </a> */}
                      {/* <div className="percent">
                        <span className="text"><strong><i className="fa fa-gift" aria-hidden="true"></i></strong><small>Бэлэг</small></span>
                      </div> */}
                    </div>
                    <div className="info-container">
                      {/* <a href="/" className="name">
                        <span>Хуурай кофе Американо No Brand</span>
                      </a>
                      <a href="/" className="cat">
                        <span>Лаазтай кофе латте Лаазтай кофе латте</span>
                      </a>
                      <a href="/" className="price">
                        <small className="sale">6,900₮</small>
                        <span className="current">6,500₮</span>
                      </a> */}
                    </div>
                  </div>
                  
                  <form>
                    <div className="row row10">
                      <div className="col-xl-4 col-6 pad10">
                        <div className="input-group">
                          <div className="input-group-prepend" id="button-addon4">
                            <button className="btn" type="button" onClick={this.remProduct}>
                              <i className="fa fa-minus" aria-hidden="true"></i>
                            </button>
                          </div>
                          <input alt="asfasd" className="form-control" placeholder="" value={productNumber} aria-label="" aria-describedby="button-addon4" />
                          <div className="input-group-append" id="button-addon4">
                            <button className="btn" type="button" onClick={this.addProduct}>
                              <i className="fa fa-plus" aria-hidden="true"></i>
                            </button>
                          </div>
                        </div>                        
                        
                      </div>
                      <div className="col-xl-8 pad10">
                          <p className="count-text text-right">
                            {product.measure} үнэ: {' '}
                            {money.format(product.price)}₮
                          </p>
                        </div>
                    </div>
                    <div className="total-price text-right">
                      <span>Дүн:</span>
                      <strong>{money.format(sumPrice)}₮</strong>
                    </div>
                    <div className="btn-container text-right">
                      <a href="/" className="btn btn-gray text-uppercase">
                        <span>Хадгалах</span>
                      </a>
                      <a href="/" className="btn btn-main text-uppercase">
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span>Сагсанд нэмэх</span>
                      </a>
                      {/* <p className="text text-right">Урамшуулал 2 хоногийн дараа дуусна</p> */}
                    </div>
                  </form>
                </div>
              </div>
              
              {/**COLUMN Хүргэлтийн мэдээлэ */}
              <div className="col-xl-3 col-lg-3 col-md-12 pad10 magnify-image">
                <div className="product-plus">
                  <div className="block product-delivery">
                    <p className="title">
                      <strong>Хүргэлтийн мэдээлэл</strong>
                    </p>
                    <p className="text">
                      <span>Энгийн хүргэлт (48 цагийн дотор) - 89,000₮ дээш бараа авсан тохиолдолд үнэгүй</span>
                    </p>
                  </div>
                  <RelationalProduct product={relationalProduct}/>
                </div>
              </div>
            
            </div>
            <div className="row row10">
              <div className="col-xl-9 pad10">
                <Information attribute={attribute} />                
                <Collection product={collectionProduct} />
                
                {/**ТАНИЛЦУУЛАГА */}
                <h1 className="title">
                  <span className="text-uppercase">Танилцуулга</span>
                </h1>
                <div className="product-bottom-images">
                  <img alt="image6" src={p10}/>
                  <img alt="image7" src={p11}/>
                </div>

                <Comment skucd={skucd}/>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
  getAll = () => {
    api.product.productCollection({ skucd: this.state.skucd }).then(res => this.setState({ collectionProduct: res.data }))
    api.product.productAttribute({ skucd: this.state.skucd }).then(res => this.setState({ attribute: res.data }))
    api.product.productRelational({ skucd: this.state.skucd }).then(res => this.setState({ relationalProduct: res.data}))
    api.product.productDetail({ skucd: this.state.skucd })
    .then(product => api.category.findAll().then(category => {
      const { breadCrumb } = this.state
      let parent = product.data[0].catid          
      category.data.reverse().map((i) => {
        
        if (parent === i.id) {
          breadCrumb.push(i)
          parent = i.parentid
        }
        return null
      })
      breadCrumb.reverse()
      this.setState({product: product.data[0], breadCrumb, sumPrice: product.data[0].price })
    }))
  }
  addProduct = () => {
    if (this.state.productNumber < 1000000) {
      this.setState({
        productNumber: this.state.productNumber + 1,
        sumPrice: this.state.sumPrice + this.state.product.price
      })
    }
  }
  remProduct = () => { 
    if (this.state.productNumber > 1) {
      this.setState({
        productNumber: this.state.productNumber - 1,
        sumPrice: this.state.sumPrice - this.state.product.price
      })
    }
  }
  onChangeImage = (e) => {
    console.log(e.target)
  }
}

const money = new Intl.NumberFormat('en-US');

export default ProductDetail;