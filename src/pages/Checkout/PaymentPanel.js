import React from "react";

class PaymentPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      chosenPlusRadio,
      companyInfo,
      epointcard,
      usedpoint,
      plusRadioChanged,
      cardNoInput,
      regNoInput,
      regNoChange,
      handleEditCompany,
      getCompanyRegno,
      cardNoChange,
      saveCustomerCard,
      handleUserEpoint
    } = this.props;
    return (
      <div className="content-container payment">
        <p className="title">
          <strong>НӨАТ баримтын төрөл</strong>
        </p>
        <div className="hand-pay flex-this">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              defaultChecked
              name="plusRadios"
              id="1"
              onChange={e => plusRadioChanged(e)}
            />

            <label className="form-check-label">Хувь хүн</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="plusRadios"
              id="2"
              onChange={e => plusRadioChanged(e)}
            />
            <label className="form-check-label">Байгууллага</label>
          </div>
        </div>
        {chosenPlusRadio == 2 ? (
          <form>
            <div className="row row10">
              <div className="col-xl-6 pad10">
                <div className="form-group">
                  {companyInfo.length == 0 ? (
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="regno"
                      ref="regno"
                      value={regNoInput}
                      aria-describedby="emailHelp"
                      placeholder="Байгууллагын регистэр"
                      onChange={e => regNoChange(e)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="regno"
                      ref="regno"
                      readOnly
                      value={companyInfo.name}
                      aria-describedby="emailHelp"
                      placeholder="Байгууллагын регистэр"
                    />
                  )}
                </div>
              </div>
            </div>
            {companyInfo.length == 0 ? (
              <button
                className="btn btn-main solid"
                onClick={e => getCompanyRegno(e, this.refs)}
              >
                <span className="text-uppercase">Холбох</span>
              </button>
            ) : (
              <button
                className="btn"
                onClick={e => handleEditCompany(e, this.refs)}
              >
                <span className="text-uppercase">Засах</span>
              </button>
            )}
          </form>
        ) : (
          ""
        )}
        {epointcard == null ? (
          chosenPlusRadio == 1 ? (
            <div>
              <p className="title">
                <strong>Имарт картаа холбох</strong>
              </p>
              <form>
                <div className="row row10">
                  <div className="col-xl-6 pad10">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="cardno"
                        ref="cardno"
                        value={cardNoInput}
                        aria-describedby="emailHelp"
                        placeholder="Картын дугаар"
                        onChange={e => cardNoChange(e)}
                      />
                      <input
                        type="password"
                        ref="cardpass"
                        name="cardpass"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Нууц үг"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-main solid"
                  onClick={e => saveCustomerCard(e)}
                >
                  <span className="text-uppercase">Холбох</span>
                </button>
              </form>
            </div>
          ) : (
            ""
          )
        ) : chosenPlusRadio == 1 ? (
          <div>
            <p className="title">
              <strong>Оноо</strong>
            </p>
            <form>
              <div className="row row10">
                <div className="col-xl-6 pad10">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      value={
                        epointcard.status == 1
                          ? epointcard.point.toFixed(2)
                          : epointcard.cardno
                      }
                      readOnly
                      name="cardInfo"
                      ref="cardInfo"
                      aria-describedby="emailHelp"
                      placeholder="Картын дугаар"
                    />
                    {epointcard.status == 0 ? (
                      <label>
                        Таны карт идэвхгүй болсон байна. Хэрэглэгчийн
                        үйлчилгээний төвд хандаж картаа шинэчилүүлнэ үү.
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-main solid"
                onClick={e => handleUserEpoint(e)}
                disabled={usedpoint.toFixed(0) != "0" ? true : false}
              >
                <span className="text-uppercase">Ашиглах</span>
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default PaymentPanel;
