import React from "react"
import config from "config";
import api from "../../api";
import { Magnify, Rate, RelationalProduct, Information, Collection, Comment } from "../../components"
import p10 from "../../scss/assets/images/demo/19.jpg"
import p20 from "../../scss/assets/images/demo/20.jpg"

class Component extends React.Component{
  state = {
    skucd: null,
    parentCategory: [],
    breadCrumb: [],
    product: [],
    attribute: [],
    relationalProduct: [],
    collectionProduct: [],
    category: [],
    mediumImg: null,

    productNumber: 1,
    sumPrice: null,
  }

  componentWillMount() { this.setState({skucd: this.props.match.params.id, category: this.props.container.category}) }
  componentDidMount() { this.refresh() }
  
  render() {
    const { breadCrumb } = this.state
    
    return<div className="section">
      <div className="container pad10">
        {this.renderBreadCrumb(breadCrumb)}

        <div className="product-detail-page">
          <div className="row row10">
            {this.renderProductMedImg()}
            {this.renderProductDescription()}
            {this.renderProductDelivery()}
            {this.renderFooter()}
          </div>
        </div>
      </div>
    </div>
  }
  refresh = () => {
    const { skucd } = this.state
    api.product.productCollection({ skucd: skucd }).then(res => res.success?this.setState({ collectionProduct: res.data }):console.log("collectionProduct",res) )
    api.product.productAttribute({ skucd: skucd }).then(res => res.success ? this.setState({ attribute: res.data }) : console.log("attribute", res))
    api.product.productRelational({ skucd: skucd }).then(res => res.success ? this.setState({ relationalProduct: res.data }) : console.log("relationalProduct", res))
    api.product.productDetail({ skucd: skucd }).then(res => res.success?this.getCategory(res.data):console.log())
  }

  getCategory = (product) => {
    const { breadCrumb, category } = this.state
    let parent = product[0].catid

    category.reverse().map((i) => {        
      if (parent === i.id) {
        breadCrumb.push(i)
        parent = i.parentid
      }
      return null
    })
    breadCrumb.reverse()
    this.setState({product: product[0], breadCrumb: breadCrumb})
  }

  renderBreadCrumb = (e) => {
    return (
      <div className="e-breadcrumb">
        <ul className="list-unstyled">
          {
            e.map((i, key) => {
              return <li key={key}>
                <a href="/">{i.name}</a>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
  renderProductMedImg = () => {
    const { product, mediumImg } = this.state    
    return (
      <div className="col-xl-4 col-lg-4 col-md-5 pad10">
        <div className="product-gallery">
          <Magnify img={mediumImg===null?IMAGE+product.img:mediumImg}/>
            <div className="thumbs">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a className="image-container" onClick={this.onChangeMidImage}>
                  <img alt="image1" src={IMAGE+product.img}/>
                </a>
              </li>
              <li className="list-inline-item ">
                  <a className="image-container" onClick={this.onChangeMidImage}>
                    <img alt="image1" src={p10}/>
                </a>
                </li>
                <li className="list-inline-item ">
                  <a className="image-container" onClick={this.onChangeMidImage}>
                  <img alt="image1" src={p20}/>
                </a>
                </li>
              </ul>                    
            </div>
          </div>
      </div>
    )
  }
  onChangeMidImage = (e) => { this.setState({ mediumImg: e.target.src }) }
  
  renderFooter = () => {
    const {attribute, collectionProduct, product, skucd} = this.state
    
    return(
      <div className="row row10">
        <div className="col-xl-9 pad10">
          <Information attribute={attribute} />                
          <Collection product={collectionProduct} />
          
          {/**ТАНИЛЦУУЛАГА */}
          <h1 className="title">
            <span className="text-uppercase">Танилцуулга</span>
          </h1>
          <div className="product-bottom-images">
            <img alt="image6" src={IMAGE+product.img}/>
          </div>
          <Comment skucd={skucd}/>
        </div>
      </div>
    )
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
  renderProductDelivery = () => {
    const {relationalProduct} = this.state
    return (
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
    )
  }
  renderProductDescription = () => {
    const {product, breadCrumb, productNumber, sumPrice} = this.state
    return (
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
            </div>
            <div className="info-container">
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
    )
  }
}

const IMAGE = process.env.NODE_ENV==="development"?config.image.development:config.image.production
const money = new Intl.NumberFormat('en-US')

export default Component;