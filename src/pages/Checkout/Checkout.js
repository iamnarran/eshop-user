import React from "react";
import { connect } from "react-redux";
import { Collapse, Form, message, Button } from "antd";
import { Link } from "react-router-dom";
import api from "../../api";
import actions from "../../actions/checkout";
import DeliveryInfo from "./DeliveryInfo";
import SwalModals from "./SwalModals";
import DeliveryPanel from "./DeliveryPanel";
import PaymentPanel from "./PaymentPanel";
import PaymentTypePanel from "./PaymentTypePanel";
import LoginRegisterPanel from "./LoginRegisterPanel";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { showLoginModal } from "../../actions/login";
import { updateCart } from "../../actions/cart";
const err = require("../../scss/assets/icon/error.png");
const MySwal = withReactContent(Swal);
const Panel = Collapse.Panel;
@connect(
  mapStateToProps,
  {
    saveUserAddress: actions.saveUserAddress,
    sentPayment: actions.sentPayment,
    showLoginModal: showLoginModal,
    updateCart
  }
)
class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresstype: "edit",
      collapseType: null,
      activeKey: this.props.isLoggedIn ? ["2"] : ["1"],
      userInfo: [],
      userAddress: [],
      delivery: [],
      defaultAddress: "",
      chosenDelivery: [],
      chosenPayment: [],
      chosenBankInfo: [],
      cardno: null,
      chosenPlusRadio: 1,
      mainLocation: [],
      subLocation: [],
      chosenInfo: [],
      commiteLocation: [],
      companyInfo: [],
      epointcard: null,
      useEpoint: false,
      epointUsedPoint: 0,
      paymentButton: true,
      cardNoInput: "",
      regNoInput: "",
      chosenDeliveryAddrName: [],
      deliveryId: 1,
      dateString: ""
    };
  }

  curday = sp => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //As January is 0.
    let yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return yyyy + sp + mm + sp + dd;
  };

  errorMsg = txt => {
    MySwal.hideLoading();
    MySwal.fire({
      type: "error",
      text: txt,
      animation: false,
      width: "25rem",
      confirmButtonColor: "#feb415"
    });
  };

  dateStringChange = (date, dateString) => {
    this.setState({ dateString: dateString });
  };

  successMsg = txt => {
    MySwal.hideLoading();
    MySwal.fire({
      type: "success",
      title: "Амжилттай",
      text: txt,
      animation: false,
      width: "25rem",
      confirmButtonColor: "#feb415"
    });
  };

  getMainLocationName = id => {
    const { mainLocation } = this.state;
    let tmp = null;
    if (mainLocation.length !== 0) {
      if (!isNaN(id)) {
        mainLocation.map((item, i) => {
          if (item.provinceid == id) {
            tmp = item.provincenm;
          }
        });
      } else {
        tmp = id;
      }
    }
    return tmp;
  };

  getCommiteLocationName = id => {
    const { commiteLocation } = this.state;
    let tmp = null;
    if (commiteLocation.length !== 0) {
      if (!isNaN(id)) {
        commiteLocation.map((item, i) => {
          if (item.id == id) {
            tmp = item.committeenm;
          }
        });
      } else {
        tmp = id;
      }
    }
    return tmp;
  };

  getSubLocationName = id => {
    const { subLocation } = this.state;
    let tmp = null;
    if (subLocation.length !== 0) {
      if (!isNaN(id)) {
        subLocation.map((item, i) => {
          if (item.districtrow == id) {
            tmp = item.districtnm;
          }
        });
      } else {
        tmp = id;
      }
    } else {
      tmp = id;
    }
    return tmp;
  };

  handleClear = () => {
    let { cart } = this.props;
    this.props.updateCart({
      products: [],
      totalQty: 0,
      totalPrice: 0
    });
  };

  componentWillMount() {
    const { deliveryTypes, paymentTypes, bankInfo } = this.props.container;
    const { cart, auth } = this.props;
    let type = "qpay";
    /* this.openLastModal(type, [], []); */
    if (cart.products.length == 0) {
      this.errorMsg(
        "Уучлаарай таны сагс хоосон байна. Сагсандаа бараа нэмнэ үү ?"
      );
      this.props.history.push("/cart");
    }

    if (this.props.isLoggedIn == true) {
      this.getUserInfo(this.props.user);
    }
    this.getMainLocation();
    this.setState({
      dateString: this.curday("-"),
      products: cart,
      delivery: deliveryTypes[0],
      chosenPayment: paymentTypes[0],
      chosenBankInfo: bankInfo[0]
    });
  }

  cardNoChange = e => {
    const { cardNoInput } = this.state;
    if (e.target.value.length <= 14) {
      this.setState({ cardNoInput: e.target.value });
    }
  };

  regNoChange = e => {
    const { regNoInput } = this.state;
    let value = e.target.value;
    let len = e.target.value.length;
    this.setState({ regNoInput: e.target.value });
    // console.log(value[len]);
    /* if (len == 1) {
      if (isNaN(value.slice(0, 1))) {
        if (/[а-яА-ЯЁёӨөҮү]/.test(value.slice(0, 1))) {
          this.setState({ regNoInput: e.target.value });
        }
      }
    }

    if (len == 2) {
      if (isNaN(value.slice(1, 2))) {
        if (/[а-яА-ЯЁёӨөҮү]/.test(value.slice(1, 2))) {
          this.setState({ regNoInput: e.target.value });
        }
      }
    }

    if (len >= 2 && len <= 10) {
      if (!isNaN(value.slice(len, len + 1))) {
        this.setState({ regNoInput: e.target.value });
      }
    } */

    /*  if (isNaN(value.slice(0, 1)) || isNaN(value.slice(1, 2))) {
      if (
        /[а-яА-ЯЁё]/.test(value.slice(0, 1)) ||
        /[а-яА-ЯЁё]/.test(value.slice(1, 2))
      ) {
        if (len >= 2 && len <= 10) {
        } else {
          this.setState({ regNoInput: value });
        }
      }
    } else {
      console.log("num");
    }
    console.log(e.target.value.slice(0, 1)); */
    // if (e.target.value.length <= 10) {
    // this.setState({ regNoInput: e.target.value });
    // }
    // console.log(/[а-яА-ЯЁё]/.test(e.target.value));

    // let tmp = e.target.value.match(/[\w\u0430-\u044f]+/gi);
    // console.log(tmp);
    //console.log(e.target.value.replace("^[a-zA-Z][0-9]{7}$"));
  };
  //АА99999999 , 9999999
  getMainLocation = async () => {
    await api.location.findAll({}).then(res => {
      if (res.success == true) {
        this.setState({ mainLocation: res.data });
      }
    });
  };

  showLoginModal = e => {
    e.preventDefault();
    this.props.showLoginModal();
  };

  getUserInfo = async user => {
    await api.checkout.findUserData({ id: user.id }).then(res => {
      if (res.success == true) {
        if (res.data.addrs.length != 0) {
          res.data.addrs.map((item, i) => {
            if (item.ismain == 1) {
              this.setState({ defaultAddress: item });
            }
          });
        }
        this.setState({
          addresstype: res.data.addrs.length === 0 ? "new" : "edit",
          userInfo: res.data.info,
          userAddress: res.data.addrs,
          epointcard: res.data.card
        });
      }
    });
  };

  changeRadio = item => {
    this.setState({ chosenPayment: item });
  };

  paymentType = () => {
    return (
      <div className="title-container flex-space">
        <h5 className="title">
          <a className="flex-this">
            <i className="fa fa-credit-card" aria-hidden="true" />
            <span>Төлбөрийн төрөл</span>
          </a>
        </h5>
      </div>
    );
  };

  saveCustomerCard = async (e, refs) => {
    e.preventDefault();

    let cardpass = refs.cardpass.value;
    let cardno = refs.cardno.value;
    if (cardpass != "" && cardno != "") {
      MySwal.showLoading();
      let tmp = {
        custid: this.state.userInfo.id,
        cardno: cardno,
        pincode: cardpass
      };
      await api.checkout.saveCustomerCard(tmp).then(res => {
        if (res.success == true) {
          this.setState({ epointcard: res.data });
          this.successMsg("Таны бүртгэлийг Ипойнт карттай амжилттай холболоо");
        } else {
          this.errorMsg(res.data);
        }
      });
    } else {
      message.error("Картын дугаар нууц үг оруулна уу ?");
    }
  };

  getCompanyRegno = async (e, refs) => {
    e.preventDefault();
    //MySwal.showLoading();
    let regno = refs.regno.value;
    refs.regno.value = "";
    await api.checkout.getCompanyRegno({ regNo: regno }).then(res => {
      if (res.success == true) {
        if (res.data.name != "") {
          res.data.regno = regno;
          this.setState({ companyInfo: res.data, paymentButton: false });
        } else {
          this.setState({ companyInfo: [] });
          this.errorMsg("Татвар төлөгч бүртгэлгүй байна");
        }
        // MySwal.hideLoading();
      } else {
        this.setState({ companyInfo: [] });
        this.errorMsg("Татвар төлөгч бүртгэлгүй байна");
      }
    });
  };

  handleEditCompany = (e, refs) => {
    e.preventDefault();
    refs.regno.value = "";
    this.setState({ companyInfo: [], paymentButton: true });
  };

  optionType = () => {
    return (
      <div className="title-container flex-space">
        <h5 className="title">
          <a className="flex-this">
            <i className="fa fa-plus-square" aria-hidden="true" />
            <span>Нэмэлт сонголт</span>
          </a>
        </h5>
      </div>
    );
  };

  customerTab = () => {
    return (
      <div className="title-container flex-space">
        <h5 className="title">
          <a className="flex-this">
            <i className="fa fa-user" aria-hidden="true" />
            <span>Хэрэглэгчээр бүртгүүлэх</span>
          </a>
        </h5>
      </div>
    );
  };

  deliveryInfo = () => {
    return (
      <div className="title-container flex-space">
        <h5 className="title">
          <a className="flex-this">
            <i className="fa fa-truck" aria-hidden="true" />
            <span>Хүргэлтийн төрөл</span>
          </a>
        </h5>
      </div>
    );
  };

  callback = key => {
    this.setState({
      activeKey: key
    });
  };

  plusRadioChanged = e => {
    const {
      useEpoint,
      epointcard,
      epointUsedPoint,
      chosenPlusRadio
    } = this.state;
    if (e.target.value == 2) {
      if (useEpoint) {
        this.errorMsg(
          "Байгууллагаар баримт авах үед Ипойнт оноо ашиглах боломжгүй тул таны ашиглахаар тохируулсан оноо төлбөрөөс хасагдахгүйг анхаарна уу."
        );
        epointcard.point = epointcard.point + epointUsedPoint;

        this.setState({
          useEpoint: false,
          epointcard: epointcard
        });
      }
      this.setState({ paymentButton: true });
    } else {
      this.setState({ paymentButton: false, companyInfo: [] });
    }

    this.setState({ chosenPlusRadio: e.target.value });
  };

  onSubmit = (e, form) => {
    e.preventDefault();

    const {
      defaultAddress,
      userAddress,
      addresstype,
      commiteLocation
    } = this.state;
    let tmp = [];
    let chosenInfo = {};
    if (e.target.name == "delivery") {
      form.validateFields((err, values) => {
        if (!err) {
          chosenInfo.lastName = values.lastName;
          chosenInfo.mainLocation = values.mainLocation;
          chosenInfo.subLocation = values.subLocation;
          chosenInfo.phone1 = values.phone1;
          chosenInfo.phone2 = values.phone2;
          chosenInfo.commiteLocation = values.commiteLocation;
          chosenInfo.isNew = false;
          if (values.address == undefined) {
            chosenInfo.address = values.addresstype;
          } else {
            chosenInfo.address = values.address;
          }
          console.log(values);
          let chosenDeliveryAddrName = {
            mainLocation: this.getMainLocationName(values.mainLocation),
            subLocation: this.getSubLocationName(values.subLocation),
            commiteLocation: this.getCommiteLocationName(values.commiteLocation)
          };
          tmp.push("3");
          if (values.address == defaultAddress.address) {
            values.address = defaultAddress.id;
          }
          try {
            if (addresstype == "new") {
              let adrs = {};
              adrs.custid = this.state.userInfo.id;
              if (isNaN(values.commiteLocation)) {
                commiteLocation.map((item, i) => {
                  if (item.committeenm == values.commiteLocation) {
                    adrs.locid = item.id;
                  }
                });
              } else {
                adrs.locid = values.commiteLocation;
              }
              adrs.name = values.lastName;
              adrs.phone1 = values.phone1;
              adrs.phone2 = values.phone2;
              adrs.address = values.addresstype;
              adrs.isenable = "Идэвхтэй";
              chosenInfo.address = values.addresstype;
              chosenInfo.addressnm = values.addresstype;
              chosenInfo.isNew = true;
              this.setUser(adrs);
            }
            let userInfo = this.state.userInfo;
            userInfo.firstname = values.lastName;
            this.setState({ chosenInfo: chosenInfo, userInfo: userInfo });
            this.setState({ chosenDeliveryAddrName: chosenDeliveryAddrName });
          } catch (err) {
            console.log(err);
          }
        } else {
          tmp.push("2");
        }
      });
    } else if (e.target.name == "payment") {
      tmp.push("4");
      this.setState({ paymentButton: false });
    }
    this.setState({
      collapseType: e.target.name,
      activeKey: tmp
    });
  };

  changeAddressType = item => {
    this.setState({ addresstype: item });
  };

  setUser = async adrs => {
    await this.props.saveUserAddress(adrs).then(res => {
      if (res.success) {
        let tmp = this.state.chosenInfo;
        tmp.address = res.data;
        if (this.props.isLoggedIn == true) {
          this.getUserInfo(this.props.user);
        }
        this.setState({ chosenInfo: tmp, addresstype: "edit" });
      } else {
        this.errorMsg(res.message);
      }
    });
  };

  changeTab = (e, form) => {
    const { deliveryTypes } = this.props.container;
    deliveryTypes.map((item, i) => {
      if (item.id == e) {
        this.setState({ delivery: item, deliveryId: e });
      }
    });
  };

  onChangeMainLoc = (e, form) => {
    api.location.findLocationWidthId({ id: e }).then(res => {
      if (res.success == true) {
        /*  form.setFieldsInitialValue({
          subLocation: "",
          commiteLocation: ""
        }); */
        this.setState({ subLocation: res.data });
      }
    });
  };

  onChangeSubLoc = (e, validateFields, e1) => {
    if (e1 == undefined) {
      validateFields((err, values) => {
        if (values.mainLocation != "") {
          api.location
            .findCommiteLocation({ provid: values.mainLocation, distid: e })
            .then(res => {
              if (res.success == true) {
                this.setState({ commiteLocation: res.data });
              }
            });
        }
      });
    } else {
      api.location.findCommiteLocation({ provid: e1, distid: e }).then(res => {
        if (res.success == true) {
          this.setState({ commiteLocation: res.data });
        }
      });
    }
  };

  handleUserEpoint = async e => {
    e.preventDefault();
    const { epointcard, delivery, products } = this.state;
    let point = epointcard.point;
    const { value: password } = await Swal.fire({
      title: "Нууц үг",
      input: "password",
      width: "20rem",
      confirmButtonText: "Ok",
      confirmButtonColor: "#feb415",
      cancelButtonText: "Болих",
      inputPlaceholder: "Картын нууц үгээ оруулна уу ?",
      showCancelButton: true,
      inputAttributes: {
        maxlength: 4,
        autocapitalize: "off",
        autocorrect: "off"
      }
    });

    if (password) {
      MySwal.showLoading();
      await api.checkout
        .checkpass({ cardno: epointcard.cardno, pincode: password })
        .then(res => {
          if (res.success == true) {
            let tmp = epointcard;
            if (
              (delivery.price + products.totalPrice) / 2 >=
              epointcard.point
            ) {
              tmp.point = parseFloat(point - parseInt(point));
              this.setState({
                epointUsedPoint: parseInt(point),
                epointcard: tmp
              });
            } else {
              tmp.point =
                tmp.point - (delivery.price + products.totalPrice) / 2;
              this.setState({
                epointUsedPoint: (delivery.price + products.totalPrice) / 2,
                epointcard: tmp
              });
            }
            this.setState({ useEpoint: true });
          } else {
            this.errorMsg("Нууц үг таарахгүй байна");
          }
        });
    }
  };

  sentPaymentF = async tmp => {
    const {
      userInfo,
      delivery,
      products,
      chosenInfo,
      userAddress,
      chosenPayment,
      chosenDeliveryAddrName
    } = this.state;
    let data;
    let addrs;
    if (userAddress.length !== 0) {
      if (!chosenInfo.isNew) {
        userAddress.map((item, i) => {
          if (item.id == chosenInfo.address) {
            addrs = item.address;
          }
        });
      } else {
        addrs = chosenInfo.addressnm;
      }
    } else {
      addrs = chosenInfo.addressnm;
    }
    tmp.custAddress =
      chosenDeliveryAddrName.mainLocation +
      ", " +
      chosenDeliveryAddrName.subLocation +
      ", " +
      chosenDeliveryAddrName.commiteLocation +
      ", " +
      addrs;
    await this.props.sentPayment(tmp).then(res => {
      if (res.success) {
        let type;
        if (chosenPayment.id == 2) {
          type = "msgBank";
          data = this.props.container.bankInfo;
          this.openLastModal(type, data, res.data);
        } else if (chosenPayment.id == 3) {
          type = "qpay";
          this.openLastModal(type, [], res.data);
        } else if (chosenPayment.id == 1) {
          MySwal.hideLoading();
          var mapForm = document.createElement("form");
          mapForm.target = "_self";
          mapForm.method = "POST";
          mapForm.action = res.data.url.url;

          var keyNumber = document.createElement("input");
          keyNumber.type = "hidden";
          keyNumber.name = "key_number";
          keyNumber.value = res.data.url.key_number;

          var transNumber = document.createElement("input");
          transNumber.type = "hidden";
          transNumber.name = "trans_number";
          transNumber.value = res.data.url.trans_number;

          var trans_amount = document.createElement("input");
          trans_amount.type = "hidden";
          trans_amount.name = "trans_amount";
          trans_amount.value = res.data.url.trans_amount;

          var time = document.createElement("input");
          time.type = "hidden";
          time.name = "time";
          time.value = res.data.url.time;

          var lang_ind = document.createElement("input");
          lang_ind.type = "hidden";
          lang_ind.name = "lang_ind";
          lang_ind.value = res.data.url.lang_ind;

          mapForm.appendChild(keyNumber);
          mapForm.appendChild(transNumber);
          mapForm.appendChild(trans_amount);
          mapForm.appendChild(time);
          mapForm.appendChild(lang_ind);

          document.body.appendChild(mapForm);

          let map = window.open(res.data.url.url, "_self", "");

          if (map) {
            mapForm.submit();
          } else {
            alert("Error");
          }
        }
      } else {
        MySwal.hideLoading();
        this.errorMsg(res.message);
      }
    });
  };

  openLastModal = (type, data, ordData) => {
    MySwal.fire({
      html: (
        <SwalModals
          type={type}
          data={data}
          ordData={ordData}
          readyBtn={this.handlePayment}
        />
      ),
      width: type == "qpay" ? "30em" : "40em",
      animation: false,

      button: false,
      showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: false,
      closeOnEsc: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { chosenPayment } = this.state;
    const { products, epointcard, epointUsedPoint, companyInfo } = this.state;
    MySwal.showLoading();
    let tmp = {};
    tmp.custId = this.state.userInfo.id;
    tmp.deliveryTypeId = this.state.delivery.id;
    tmp.custName = this.state.chosenInfo.lastName;
    tmp.custAddressId = this.state.chosenInfo.address;
    tmp.phone1 = this.state.chosenInfo.phone1;
    tmp.phone2 = this.state.chosenInfo.phone2;
    tmp.paymentType = this.state.chosenPayment.id;
    tmp.addPoint = 0;
    tmp.deliveryDate = this.state.dateString;

    //tmp.cardNo = epointcard.cardno;
    tmp.usedPoint = epointUsedPoint;
    tmp.items = [];
    if (isNaN(this.state.chosenInfo.commiteLocation)) {
      tmp.locId = this.state.userAddress[0].locid;
    } else {
      tmp.locId = this.state.chosenInfo.commiteLocation;
    }
    products.products.map((item, i) => {
      tmp.items.push(item);
    });
    if (companyInfo.length == 0) {
      tmp.taxRegno = "";
      tmp.taxName = "";
    } else {
      tmp.taxRegno = companyInfo.regno;
      tmp.taxName = companyInfo.name;
    }

    let data = [];
    this.sentPaymentF(tmp);
  };

  handlePayment = (e, item, ordData, type) => {
    e.preventDefault();
    const {
      userInfo,
      delivery,
      products,
      chosenInfo,
      userAddress,
      chosenPayment
    } = this.state;
    MySwal.fire({
      html: (
        <SwalModals
          type={"paymentSucess"}
          changePage={this.changePage}
          chosenPayment={chosenPayment}
          paymentType={type}
          userInfo={userInfo}
          delivery={delivery}
          products={products}
          chosenInfo={chosenInfo}
          userAddress={userAddress}
          bankInfo={item}
          ordData={ordData}
          chosenDeliveryAddrName={this.state.chosenDeliveryAddrName}
        />
      ),
      width: "40em",
      button: false,
      showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: false,
      closeOnEsc: false,
      onClose: this.closeSwal
    });
  };

  addAddress = (value, event, form) => {
    if (value == null) {
      form.setFieldsValue({
        mainLocation: this.state.mainLocation[0].provincenm,
        subLocation: this.state.subLocation[0].districtnm,
        commiteLocation: this.state.commiteLocation[0].committeenm,
        lastName: "",
        phone1: "",
        phone2: ""
      });
      this.setState({ addresstype: "new" });
    } else {
      this.getLocs(value);
    }
  };

  getLocs = async id => {
    await api.checkout.getlocs({ locid: id }).then(res => {
      if (res.success == true) {
        this.props.form.setFieldsValue({
          address: res.data.address,
          mainLocation: res.data.provincenm,
          subLocation: res.data.districtnm,
          commiteLocation: res.data.committeenm
        });
      } else {
        console.log("aldaa");
      }
    });
  };

  closeSwal = e => {
    this.props.history.push("/");
  };

  changePage = (e, item) => {
    MySwal.close();
    this.handleClear();
    this.props.history.push(item);
  };

  render() {
    const {
      userInfo,
      delivery,
      userAddress,
      chosenPayment,
      products,
      chosenPlusRadio,
      epointcard,
      companyInfo,
      epointUsedPoint,
      useEpoint,
      mainLocation,
      subLocation,
      commiteLocation,
      paymentButton,
      chosenDeliveryAddrName,
      deliveryId
    } = this.state;
    const { deliveryTypes, paymentTypes } = this.props.container;
    const { isLoggedIn } = this.props;
    const usedpoint = useEpoint == true ? epointUsedPoint : 0;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="section section-gray">
        <div className="container pad10">
          <div className="checkout-container">
            <div className="row row10">
              <div className="col-lg-8 pad10">
                <div className="accordion" id="accordionExample">
                  <div className="card">
                    <div className="card-header" id="headingOne">
                      <Collapse
                        accordion
                        activeKey={this.state.activeKey}
                        onChange={this.callback}
                      >
                        {isLoggedIn == false ? (
                          <Panel
                            showArrow={false}
                            header={this.customerTab()}
                            key="1"
                          >
                            <LoginRegisterPanel />
                          </Panel>
                        ) : (
                          ""
                        )}
                        <Panel
                          header={this.deliveryInfo()}
                          showArrow={false}
                          disabled={!isLoggedIn}
                          key={"2"}
                        >
                          <DeliveryPanel
                            deliveryTypes={deliveryTypes}
                            addAddress={this.addAddress}
                            changeTab={this.changeTab}
                            onSubmit={this.onSubmit}
                            addresstype={this.state.addresstype}
                            onChangeMainLoc={this.onChangeMainLoc}
                            onChangeSubLoc={this.onChangeSubLoc}
                            getFieldDecorator={getFieldDecorator}
                            deliveryId={deliveryId}
                            dateString={this.state.dateString}
                            dateStringChange={this.dateStringChange}
                            key="2"
                            mainLocation={mainLocation}
                            subLocation={subLocation}
                            commiteLocation={commiteLocation}
                            userAddress={userAddress}
                            changeAddressType={this.changeAddressType}
                          />
                        </Panel>
                        <Panel
                          header={this.paymentType()}
                          showArrow={false}
                          key="3"
                          disabled={
                            this.state.collapseType === "delivery" ||
                            this.state.collapseType === "payment"
                              ? false
                              : true
                          }
                        >
                          <PaymentTypePanel
                            paymentTypes={paymentTypes}
                            chosenPayment={chosenPayment}
                            changeRadio={this.changeRadio}
                            onSubmit={this.onSubmit}
                          />
                        </Panel>
                        <Panel
                          header={this.optionType()}
                          showArrow={false}
                          key="4"
                          disabled={
                            this.state.collapseType === "payment" ? false : true
                          }
                        >
                          <PaymentPanel
                            plusRadioChanged={this.plusRadioChanged}
                            companyInfo={companyInfo}
                            epointcard={epointcard}
                            usedpoint={usedpoint}
                            chosenPlusRadio={chosenPlusRadio}
                            cardNoInput={this.state.cardNoInput}
                            cardNoChange={this.cardNoChange}
                            regNoInput={this.state.regNoInput}
                            regNoChange={this.regNoChange}
                            handleEditCompany={this.handleEditCompany}
                            getCompanyRegno={this.getCompanyRegno}
                            saveCustomerCard={this.saveCustomerCard}
                            handleUserEpoint={this.handleUserEpoint}
                          />
                        </Panel>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
              <DeliveryInfo
                userInfo={userInfo}
                delivery={delivery}
                products={products}
                chosenInfo={this.state.chosenInfo}
                usedpoint={usedpoint}
                handleClick={this.handleSubmit}
                userAddress={userAddress}
                isLoggedIn={isLoggedIn}
                paymentButton={paymentButton}
                chosenDeliveryAddrName={chosenDeliveryAddrName}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    cart: state.cart
  };
}

export default Form.create({ name: "checkout" })(Checkout);
