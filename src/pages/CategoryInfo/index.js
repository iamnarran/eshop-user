import React from "react";
import { CARD_LIST_TYPES, CARD_TYPES } from "../../utils/consts";
import CardList from "../../components/CardList";

class CategoryInfo extends React.Component {
  render() {
    const products = this.props.container.categoryProduct[0].products;
    const attributes = this.props.container.categoryProduct[0].attributes;
    const SubCategory = this.props.container.categoryProduct[0].SubCategorys[0];
    let attibute = null;
    console.log("props", this.props);
    console.log("subCategory", products.length);

    attibute = attributes.map((item, index) => {
      if (attributes) {
        return (
          <div>
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
        );
      } else {
        return null;
      }
    });

    return (
      <div className="section">
        <div className="container pad10">
          <div className="e-breadcrumb">
            <ul className="list-unstyled">
              <li>
                <a href="/">
                  <span>Эхлэл</span>
                </a>
              </li>
              <li>
                <a href=" ">
                  <span>Ангилал</span>
                </a>
              </li>
              <li>
                <span>{SubCategory.catnm}</span>
              </li>
            </ul>
          </div>
          <div className="row row10">
            <div className="col-xl-3 col-lg-3 col-md-4 pad10">
              <div className="text-right d-block d-md-none">
                <a href=" " className="btn btn-gray btn-filter">
                  <i className="fa fa-filter" aria-hidden="true" />
                  <span className="text-uppercase">Шүүлтүүр</span>
                </a>
              </div>
              <div className="left-panel">
                <a href=" " className="btn-filter d-block d-md-none">
                  <i className="fa fa-times" aria-hidden="true" />
                </a>
                <h5 className="title">
                  <strong>Хайлтын үр дүн</strong>
                </h5>
                <p className="title">
                  <span>Ангилал</span>
                </p>
                <div className="block">
                  <div className="accordion" id="accordionExample">
                    <a
                      href=" "
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
                            <a href=" ">Цай</a>
                          </li>
                          <li className="active">
                            <a href=" ">Кофе</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <a
                      href=" "
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
                            <a href=" ">Сироп</a>
                          </li>
                          <li>
                            <a href=" ">Чацаргана</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="title">
                  <strong>Шүүлтүүр</strong>
                </h5>
                {attibute}
                <div className="text-center">
                  <a href=" " className="btn btn-main">
                    <span className="text-uppercase">Хадгалах</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8 pad10">
              <div className="list-filter">
                <div className="row row10">
                  <div className="col-lg-4 pad10">
                    <div className="total-result">
                      <p className="text">
                        <strong>"{SubCategory.catnm}"</strong>
                        <span>{products.length} бараа олдлоо</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-8 pad10">
                    <form className="flex-this end">
                      <div className="form-group my-select flex-this">
                        <label for="inputState" style={{ marginTop: "5px" }}>
                          Эрэмбэ:
                        </label>
                        <select id="inputState" className="form-control">
                          <option selected>Үнэ ихээс багаруу</option>
                          <option>Үнэ багаас ихрүү</option>
                        </select>
                      </div>
                      <div className="form-group flex-this">
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
                items={products}
                showAll
                cardType={CARD_TYPES.wide}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryInfo;

/* <h5 className="title">
                  <strong>Шүүлтүүр</strong>
                </h5>

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
                </div> */
