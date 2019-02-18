import React from "react"
import p9 from "../../../scss/assets/images/demo/1.jpg"
import api from "../../../api"
import PropTypes from 'prop-types'
import Rate from "../../Rate"
import moment from "moment"

class Component extends React.Component{
  state = {
    comment: [],
    rate: []
  }
  componentDidMount() {
    api.product.productComment({ skucd: this.props.skucd })
      .then(comment => api.product.productRate({ skucd: this.props.skucd })
        .then(rate => this.setState({rate: rate.data[0], comment: comment.data})))    
  }
  render() {
    const { comment, rate } = this.state
    // console.log(comment, rate)
    return <div>
      <div className="comments-container">
        <div className="write-comment">
          <div className="author">
            <div className="image-container">
              <span className="image8" style={{backgroundImage: `url(${p9})`}}></span>
            </div>
            <p className="name">
              <strong>Болд<br/>Ганзориг</strong>
            </p>
          </div>
          <form>
            <div className="form-group">
              <textarea className="form-control" placeholder="Сэтгэгдэл үлдээх хэсэг" rows="5"></textarea>
              <small id="emailHelp" className="form-text text-muted text-right">0 / 120</small>
            </div>
            <div className="btn btn-dark">
              <span className="text-uppercase">Сэтгэгдэл үлдээх</span>
            </div>
          </form>
        </div>
        {
          comment.length === 0 ? '' :
            <div>
              <h1 className="title">
                <span className="text-uppercase">Сэтгэгдэл</span>
              </h1>
              <div className="comments-list">
              {
                rate === undefined ? '' : (
                  <div className="main-rating">
                    <Rate rate={rate.ravg} numOfVotes={rate.rsum} />
                    <p className="text">({rate.cnt} хүн үнэлгээ өгсөн байна)</p>
                  </div>
                )
                
              }
              {
                comment.map((i, key) => {
                  return (
                    <div className="single" key={key}>
                      <Rate rate={Math.floor(1+Math.random()*9)} numOfVotes={Math.floor(1+Math.random()*9)}/>
                      <p className="text">{i.commnt}</p>
                      <ul className="list-unstyled bottom-info">
                        <li>
                          <span>{moment(i.idate).format('YYYY.MM.DD')}</span>
                        </li>
                        <li>
                          <strong>{i.uname}</strong>
                        </li>
                      </ul>
                    </div>
                  )
                })
              }
            </div>
          </div>  
        }
      </div>
    </div>
  }
}

Component.PropTypes = {
  comment: PropTypes.object,
}

export default Component;