import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { Rate } from "antd";
import { toast } from "react-toastify";

import api from "../api";
import p1 from "../scss/assets/images/demo/1.jpg";

class CommentList extends React.Component {
  state = {
    comment: "",
    comments: this.props.comments
  };

  notify = message => toast(message, { autoClose: 5000 });

  handleCommitChange = e => {
    this.setState({ comment: e.target.value });
  };

  handleCommentSend = e => {
    e.preventDefault();

    const { user, product } = this.props;

    api.product
      .addCutomerComment({
        custid: user.id,
        skucd: product.cd,
        comment: this.state.comment
      })
      .then(res => {
        if (res.success) {
          this.setState({
            comment: "",
            comments: [
              {
                custid: user.id,
                skucd: product.cd,
                commnt: this.state.comment,
                uname: user.firstname
                  ? user.lastname
                    ? `${user.firstname} ${user.lastname}`
                    : user.firstname
                  : user.email
                  ? user.email
                  : "",
                idate: moment()
              },
              ...this.state.comments
            ]
          });
        } else {
          this.notify(res.message);
        }
      });
  };

  round = (value, step) => {
    step || (step = 1.0);
    const inv = 1.0 / step;
    return Math.round(value * inv) / inv;
  };

  getRateValue = () => {
    const rates = this.props.product.rate;

    let average = 0;
    if (rates.length) {
      let total = rates.reduce((a, b) => a + b.rate, 0);
      if (total > 0) {
        average = this.round(total / rates.length, 0.5);
      }
    }
    return average;
  };

  render() {
    const { isLoggedIn, user, product } = this.props;
    const { comments } = this.state;
    const rates = product.rate;

    return (
      <div
        className="comments-container"
        style={{ marginTop: "80px", width: "100%" }}
      >
        {isLoggedIn && user && (
          <div className="write-comment">
            <div className="author">
              <div className="image-container">
                <span
                  className="image8"
                  style={{
                    backgroundImage: `url(${
                      user.picture
                        ? user.picture.data
                          ? user.picture.data.url
                          : user.picture
                        : p1
                    })`
                  }}
                />
              </div>
              <p className="name text-uppercase">
                <strong>
                  {user.firstname
                    ? user.lastname
                      ? `${user.firstname} ${user.lastname}`
                      : user.firstname
                    : user.email
                    ? user.email
                    : ""}
                </strong>
              </p>
            </div>

            <form>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Сэтгэгдэл үлдээх хэсэг"
                  name="comment"
                  style={{ minHeight: "150px" }}
                  value={this.state.comment}
                  onChange={this.handleCommitChange}
                />
                <small
                  id="emailHelp"
                  className="form-text text-muted text-right"
                >
                  0 / 120
                </small>
              </div>
              <button
                type="button"
                className="btn btn-dark text-uppercase"
                onClick={this.handleCommentSend}
              >
                Сэтгэгдэл үлдээх
              </button>
            </form>
          </div>
        )}

        {!!comments.length && (
          <div style={{ marginTop: "80px" }}>
            <h1 className="title">
              <span className="text-uppercase">Сэтгэгдэл</span>
            </h1>

            <div className="comments-list">
              {!!rates.length && (
                <div className="main-rating">
                  <Rate allowHalf disabled defaultValue={this.getRateValue()} />
                  <p className="text">
                    ({rates.length} хүн үнэлгээ өгсөн байна)
                  </p>
                </div>
              )}

              {comments.map((comment, index) => {
                return (
                  <div className="single" key={index}>
                    {!!rates.length &&
                      rates.map((rate, index) => {
                        if (rate.custid === comment.custid) {
                          return (
                            <Rate
                              key={index}
                              allowHalf
                              disabled
                              defaultValue={rate.rate}
                              style={{
                                fontSize: "0.8rem",
                                marginBottom: "5px"
                              }}
                            />
                          );
                        }
                      })}
                    <p className="text">{comment.commnt}</p>
                    <ul className="list-unstyled bottom-info">
                      {comment.idate && (
                        <li>
                          <span>
                            {moment(comment.idate).format(
                              "YYYY.MM.DD HH:mm:ss"
                            )}
                          </span>
                        </li>
                      )}
                      <li>
                        <strong>{comment.uname}</strong>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

CommentList.propTypes = {
  product: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(CommentList);
