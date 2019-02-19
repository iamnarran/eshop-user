import React from "react";
import { IMAGE, CARD_LIST_TYPES } from "../../utils/consts";
import CardList from "../../components/CardList";
import Banner from "../../components/Banner";

class Season extends React.Component {
  render() {
    const { products } = this.props.container;

    return (
      <div className="top-container">
        <div className="section">
          <div className="container pad10">
            <div className="e-breadcrumb">
              <ul className="list-unstyled">
                <li>
                  <a href="#">
                    <span>Эхлэл</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>Кофе цай</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>Кофе</span>
                  </a>
                </li>
                <li>
                  <span>Шингэн америк кофе</span>
                </li>
              </ul>
            </div>
            <div className="row row10">
              <div className="col-xl-3 pad10">
                <div className="left-panel">
                  <h5 className="title">
                    <strong>Хайлтын үр дүн</strong>
                  </h5>
                  <p className="title">
                    <span>Ангилал</span>
                  </p>
                  <div className="block">
                    <div className="accordion" id="accordionExample">
                      <a
                        href="#"
                        className="collapse-title"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Цай / Кофе
                      </a>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div className="collapse-content">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">Цай</a>
                            </li>
                            <li className="active">
                              <a href="#">Кофе</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="collapse-title"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Бусад ангилал
                      </a>
                      <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div className="collapse-content">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">Сироп</a>
                            </li>
                            <li>
                              <a href="#">Чацаргана</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 className="title">
                    <strong>Шүүлтүүр</strong>
                  </h5>
                  <div className="left-filter">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#collapseThree"
                      role="button"
                      aria-expanded="true"
                      aria-controls="collapseExample"
                    >
                      Брэнд
                    </a>
                    <div className="collapse show" id="collapseThree">
                      <div className="collapse-content">
                        <ul className="list-unstyled">
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck1"
                              >
                                Waitrose
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck2"
                                checked=""
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck2"
                              >
                                Heinz
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck3"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck3"
                              >
                                No-Brand
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck4"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck4"
                              >
                                Dayleford
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="left-filter">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#collapseFour"
                      role="button"
                      aria-expanded="true"
                      aria-controls="collapseExample"
                    >
                      Сонголт
                    </a>
                    <div className="collapse show" id="collapseFour">
                      <div className="collapse-content">
                        <ul className="list-unstyled">
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck5"
                                checked=""
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck5"
                              >
                                Хямдралтай
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck6"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck6"
                              >
                                Урамшуулалтай
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck7"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck7"
                              >
                                Багцын бүтээгдэхүүн
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck8"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck8"
                              >
                                Их борлуулалттай
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="left-filter">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#collapseFive"
                      role="button"
                      aria-expanded="true"
                      aria-controls="collapseExample"
                    >
                      Хэв маяг
                    </a>
                    <div className="collapse show" id="collapseFive">
                      <div className="collapse-content">
                        <ul className="list-unstyled">
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck9"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck9"
                              >
                                Цагаан хоолтон
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck10"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck10"
                              >
                                Органик
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck11"
                                checked=""
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck11"
                              >
                                Цавуулаггүй
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck12"
                              />
                              <label
                                className="custom-control-label"
                                for="customCheck12"
                              >
                                Кошер
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 pad10">
                <div className="list-filter">
                  <div className="row row10">
                    <div className="col-xl-4 pad10">
                      <div className="total-result">
                        <p className="text">
                          <strong>"Кофе"</strong>
                          <span>{products.length} бараа олдлоо</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-8 pad10">
                      <form className="form-inline justify-content-end">
                        <div className="form-group my-select">
                          <label for="inputState">Эрэмбэ:</label>
                          <select id="inputState" className="form-control">
                            <option selected>Үнэ ихээс багаруу</option>
                            <option>Үнэ багаас ихрүү</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <button type="submit" className="btn">
                            <i className="fa fa-th-list" aria-hidden="true" />
                          </button>
                          <button type="submit" className="btn active">
                            <i className="fa fa-th" aria-hidden="true" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <CardList
                  type={CARD_LIST_TYPES.horizontal}
                  seq="2"
                  items={products}
                />
                <div className="more-link text-center">
                  <a href="#" className="btn btn-border">
                    <span className="text text-uppercase">
                      Бусад үр дүнг үзэх
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Season;
