import React from "react";
import { connect } from "react-redux";
import { updateCart } from "../../actions/cart";
const formatter = new Intl.NumberFormat("en-US");

@connect(
  mapStateToProps,
  {
    updateCart
  }
)
class GolomtMerchant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClear: false,
      prevScrollpos: window.pageYOffset,
      visible: true
    };
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  componentWillMount() {
    /* window.addEventListener("scroll", this.handleScroll);
    if (
      this.props.container.data.success == true &&
      this.state.isClear == false
    ) {
      this.handleClear();
    } */
  }

  componentWillUnmount() {
    //window.removeEventListener("scroll", this.handleScroll);
  }

  handleClear = () => {
    this.props.updateCart({
      products: [],
      totalQty: 0,
      totalPrice: 0
    });
    this.setState({ isClear: true });
  };

  render() {
    if (this.props.container.data.success) {
      const { data } = this.props.container.data;
      return (
        <div className="section section-gray">
          <div className="container pad10">
            <div className="success-message-container">
              <div className="container pad10">
                <div className="row row10">
                  <div className="offset-md-3 col-md-6 pad10">
                    <div className="content">
                      <div className="text-center">
                        <img
                          alt="image"
                          src={require("../../scss/assets/images/demo/4.png")}
                          width="80px"
                        />
                        <h4 className="title">
                          <span className="text-uppercase">
                            Таны захиалга амжилттай баталгаажлаа
                          </span>
                        </h4>
                      </div>
                      <div className="message">
                        <h5 className="title flex-this flex-space">
                          <span className="text-uppercase">
                            Захиалга <strong>{data.order.ordernumber}</strong>
                          </span>
                        </h5>
                        <ul className="list-unstyled class">
                          <li className="flex-this flex-space">
                            <span>Худалдаж авсан барааны тоо:</span>
                            <strong className="big">
                              {data.order.orderquantity}
                            </strong>
                          </li>
                          <li className="flex-this flex-space">
                            <span>Мөнгөн дүн:</span>
                            <strong className="big">
                              {formatter.format(data.order.totalamount)}₮
                            </strong>
                          </li>
                          <li className="flex-this flex-space">
                            <span>Төлбөрийн төрөл:</span>
                            <strong className="big">
                              {data.order.paymenttype}
                            </strong>
                          </li>
                        </ul>
                      </div>
                      <div className="user-detail">
                        <h5 className="title flex-this flex-space">
                          <span className="text-uppercase">
                            Хүргэлтийн мэдээлэл:
                          </span>
                        </h5>
                        <p className="text flex-this">
                          <i
                            className="fa fa-user"
                            aria-hidden="true"
                            style={{ color: "#feb415" }}
                          />
                          <span> {data.delivery.custname}</span>
                        </p>
                        <p className="text flex-this">
                          <i
                            className="fa fa-phone "
                            aria-hidden="true"
                            style={{ color: "#feb415" }}
                          />
                          <span>
                            {data.delivery.phonE1 + ", " + data.delivery.phonE2}
                          </span>
                        </p>
                        <p className="text flex-this">
                          <i
                            className="fa fa-map-marker "
                            aria-hidden="true"
                            style={{ color: "#feb415" }}
                          />
                          <span>{data.delivery.address}</span>
                        </p>
                        <p className="text flex-this">
                          <i
                            className="fa fa-calendar"
                            aria-hidden="true"
                            style={{ color: "#feb415" }}
                          />
                          <span>{data.delivery.insymd}</span>
                        </p>
                      </div>
                      <div className="bottom-text text-center">
                        <p>
                          Хүргэлттэй холбоотой лавлах зүйлс байвал доорх утсаар
                          холбогдоно уу. Баярлалаа
                        </p>
                        <strong className="text-uppercase">
                          Лавлах утас: 7611 0101
                        </strong>
                      </div>
                      <div className="btn-container text-center">
                        <a
                          className="btn btn-main"
                          onClick={() => this.props.history.push("/")}
                        >
                          <span className="text-uppercase">
                            Нүүр хуудасруу буцах
                          </span>
                        </a>
                      </div>
                      <div className="btn-container text-center">
                        <a
                          className="btn btn-dark"
                          onClick={() =>
                            this.props.history.push("/order/" + data.order.id)
                          }
                        >
                          <span className="text-uppercase">Захиалга харах</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="section section-gray">
          <div className="container pad10">
            <div className="success-message-container">
              <div className="container pad10">
                <div className="row row10">
                  <div className="offset-md-3 col-md-6 pad10">
                    <div className="content">
                      <div className="text-center">
                        <img
                          alt="image"
                          src={require("../../scss/assets/images/demo/lock.png")}
                          width="80px"
                        />
                        <h4 className="title">
                          <span className="text-uppercase">
                            Таны захиалга амжилтгүй
                          </span>
                        </h4>
                      </div>
                      <div className="bottom-text text-center">
                        <p>{this.props.container.data.message}</p>
                        <strong className="text-uppercase">
                          Лавлах утас: 7611 0101
                        </strong>
                      </div>
                      <div className="btn-container text-center">
                        <a
                          className="btn btn-main"
                          onClick={() => this.props.history.push("/")}
                        >
                          <span className="text-uppercase">
                            Нүүр хуудасруу буцах
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    cart: state.cart
  };
}

export default GolomtMerchant;
