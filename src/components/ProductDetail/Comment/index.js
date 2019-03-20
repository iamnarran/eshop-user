import React from "react"
import p9 from "../../../scss/assets/images/demo/1.jpg"
import api from "../../../api"
import PropTypes from 'prop-types'
import Rate from "../../Rate/Rate"
import moment from "moment"

class Component extends React.Component{
  state = {
    comment: [],
    rate: [],
    ratesum: 0,
  }
  componentDidMount() {
    this.getRatesum()
    api.product.productComment({ skucd: this.props.skucd })
      .then(comment => this.setState({ comment: comment.data }))    
  }

  getRatesum = () => {
    const { rate } = this.props
    let sum = 0
    if (rate !== undefined && rate.length !== 0) {
      rate.map(i => sum += i.rate)
    }
    this.setState({ratesum: sum/rate.length, rate: rate})
  }
  render() {
    const { comment, rate, ratesum } = this.state
    const {userInfo, loggedin} = this.props
    return <div>
      <div className="comments-container">
      {
        loggedin == true ?
        <div className="write-comment">
          <div className="author">
            <div className="image-container">
              <span className="image8" style={{backgroundImage: `url(${p9})`}}></span>
            </div>
            <p className="name">
              <strong>{userInfo.firstname}<br/>{userInfo.lastname}</strong>
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
        </div> : ''
      }
        
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
                      <Rate rate={ratesum} numOfVotes={ratesum}/>   
                    <p className="text">({rate.length} хүн үнэлгээ өгсөн байна)</p>
                  </div>
                )                
              }
              {
                comment.map((i, key) => {
                  return (
                    <div className="single" key={key}>
                      {                        
                        this.props.rate.map((rate) => {
                          if (i.custid === rate.custid) { return <Rate rate={rate.rate} numOfVotes={rate.rate} /> }
                          return ''
                        })
                      }
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