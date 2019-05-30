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
      loading: true
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
      if (res.success) {
        this.handleNotify(res.data);
        /* this.props.history.push("/"); */
      } else {
        this.handleNotify(res.data);
        /* this.props.history.push("/"); */
      }
    });
  }

  render() {
    const { staticInfo } = this.props.container;
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
                    style={{ width: "15%", marginBottom: "5%" }}
                  >
                    <img
                      style={{ width: "100%" }}
                      alt="logo"
                      src={IMAGE + staticInfo.logopath}
                    />
                  </div>
                  <h2>Нууц үг сэргээх</h2>
                  <p>Та нууц үгээ оруулна уу!</p>
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
