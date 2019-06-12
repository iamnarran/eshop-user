import React from "react";
import api from "../api";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { IMAGE } from "../utils/consts";
import { toast } from "react-toastify";
import { css } from "glamor";

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: []
    };
  }

  handleNotify = message =>
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      progressClassName: css({
        background: "#feb415"
      })
    });

  componentDidMount() {
    api.customer.checkkey({ key: this.props.match.params.key }).then(res => {
      this.setState({ message: res });
      if (res.success) {
        console.log(res);
        /* this.handleNotify(res.data); */
        /* this.props.history.push("/"); */
      } else {
        console.log(res);
        /* this.handleNotify(res.data); */
        /* this.props.history.push("/"); */
      }
    });
  }

  renderSuccessTrue() {
    return (
      <div>
        <h3>Баталгаажуулалт амжилттай</h3>
        <p>
          Та өөрийн бүртгүүлсэн хаягаараа нэвтрэн орж худалдан авалт хийх
          боломтой
        </p>
        <p>Манай системийн хэрэглэгч болсон танд баярлалаа</p>
      </div>
    );
  }

  renderSuccessFalse() {
    return (
      <div>
        <h3>Баталгаажуулалт амжилтгүй</h3>
        <p>{this.state.message.data}</p>
      </div>
    );
  }

  render() {
    const { staticInfo } = this.props.container;
    const { message } = this.state;
    console.log(message);
    return (
      <div className="top-container">
        <div className="section">
          <div className="container pad10" />
          <div className="top-container">
            <div className="section">
              <div className="col-md-12">
                <center>
                  <div
                    className="logo"
                    style={{ width: "15%", marginBottom: "50px" }}
                  >
                    <img
                      style={{ width: "100%" }}
                      alt="logo"
                      src={IMAGE + staticInfo.logopath}
                    />
                  </div>
                  {message.success
                    ? this.renderSuccessTrue()
                    : this.renderSuccessFalse()}
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
