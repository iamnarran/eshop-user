import React from "react";
import { Link } from "react-router-dom";
import { Collapse } from "react-collapse";
import { Checkbox, Spin, Slider } from "antd";
import MatCheckbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { toast } from "react-toastify";

import api from "../api";
import { CARD_LIST_TYPES, CARD_TYPES } from "../utils/consts";
import CardList from "../components/CardList";
import PageHeader from "../components/PageHeader";

// const styles = {
//   root: {
//     color: green[600],
//     "&$checked": {
//       color: green[500]
//     }
//   },
//   checked: {}
// };

class CategoryInfo extends React.Component {
  state = {
    loading: false,
    checkedList: [],
    products: this.props.container.products
  };

  notify = message => toast(message, { autoClose: 5000 });

  handleSliderAfterChange = value => {
    this.setState({ loading: true });

    const data = {
      catid: this.props.container.id,
      parameters: this.state.checkedList,
      minprice: value[0],
      maxprice: value[1],
      orderCol: "price_asc"
    };

    api.categoryInfo.findAllFilteredInfo(data).then(res => {
      if (res.success) {
        console.log("res", res.data);
        this.setState({
          products: res.data
        });
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
        this.notify(res.message);
      }
    });
  };

  handleCheckboxChange = e => {
    e.preventDefault();

    this.setState({ loading: true });

    let checkedList = this.state.checkedList;
    const i = checkedList.indexOf(e.target.value);

    if (e.target.checked) {
      checkedList.push(e.target.value);
    } else if (i !== -1) {
      checkedList.splice(i, 1);
    }

    const data = {
      catid: this.props.container.id,
      parameters: checkedList,
      orderCol: "price_asc"
    };

    this.setState({ checkedList });

    api.categoryInfo.findAllFilteredInfo(data).then(res => {
      if (res.success) {
        this.setState({
          products: res.data
        });
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
        this.notify(res.message);
      }
    });
  };

  render() {
    const {
      // menu,
      // primaryBanners,
      // products,
      attributes
    } = this.props.container;

    let filters =
      attributes &&
      attributes.map((attr, index) => {
        switch (attr.type) {
          case "COLOR":
            return (
              <div key={attr.type}>
                <a className="collapse-title">{attr.attributes[0].name}</a>
                <Collapse isOpened={true}>
                  <div className="collapse show" id="collapseThree">
                    <div className="collapse-content">
                      <ul className="list-unstyled">
                        {attr.attributes[0].values.map(val => {
                          return (
                            <MatCheckbox
                              key={val.valueid}
                              onChange={this.handleCheckboxChange}
                              value={val.valueid}
                              style={{
                                color: val.valuecd,
                                width: 40,
                                height: 40
                              }}
                              icon={
                                <CheckBoxOutlineBlankIcon
                                  style={{ fontSize: 40 }}
                                />
                              }
                              checkedIcon={
                                <CheckBoxIcon style={{ fontSize: 40 }} />
                              }
                            />
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </Collapse>
              </div>
            );
          // case "BRAND":
          case "PRICE":
            const min = parseInt(
              attr.attributes[0].values.find(val => val.valuecd === "MIN")
                .valuename
            );
            const max = parseInt(
              attr.attributes[0].values.find(val => val.valuecd === "MAX")
                .valuename
            );
            const step = Math.ceil((max - min) / 100);
            return (
              <div key={attr.type}>
                <a className="collapse-title">{attr.attributes[0].name}</a>
                <Slider
                  range
                  defaultValue={[min, max]}
                  min={min}
                  max={max}
                  step={step}
                  onAfterChange={this.handleSliderAfterChange}
                />
              </div>
            );
          default:
            return (
              <div key={attr.type}>
                <a className="collapse-title">{attr.attributes[0].name}</a>
                <Collapse isOpened={true}>
                  <div className="collapse show" id="collapseThree">
                    <div className="collapse-content">
                      {/* <form> */}
                      <ul className="list-unstyled">
                        {attr.attributes[0].values.map(val => (
                          <li key={val.valueid}>
                            <div className="custom-control custom-checkbox">
                              {/* <input
                                type="checkbox"
                                className="custom-control-input"
                                // id={val.valueid}
                                value={val.valueid}
                                onChange={this.handleCheckboxChange}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheck1"
                              >
                                {val.valuename}
                              </label> */}
                              <Checkbox
                                onChange={this.handleCheckboxChange}
                                value={val.valueid}
                              >
                                {val.valuename}
                              </Checkbox>
                            </div>
                          </li>
                        ))}
                      </ul>
                      {/* </form> */}
                    </div>
                  </div>
                </Collapse>
              </div>
            );

          // return (
          //   <div>
          //     <a className="collapse-title">Өнгө</a>
          //     {filter}
          //   </div>
          // );

          // let filter = null;
          // if (item.attributes) {
          //   filter = item.attributes.map((item, index) => {
          //     return (
          //       <div className="left-filter" key={index}>
          //         <a
          //           className="collapse-title"
          //           data-toggle="collapse"
          //           role="button"
          //           aria-expanded="true"
          //           aria-controls="collapseExample"
          //         >
          //           {item.name}
          //         </a>
          //         <div className="collapse show" id="collapseThree">
          //           <div className="collapse-content">
          //             <ul className="list-unstyled">
          //               {item.values.map((it, ind) => {
          //                 return (
          //                   <li>
          //                     <Checkbox
          //                       name={item.id}
          //                       value={it.valueid}
          //                       onClick={this.onSubmit}
          //                     >
          //                       {it.valuename}
          //                     </Checkbox>
          //                   </li>
          //                 );
          //               })}
          //             </ul>
          //           </div>
          //         </div>
          //       </div>
          //     );
          //   });
          // } else return null;
          // return <div>{filter}</div>;
        }
      });

    // console.log("filters", filters);

    return (
      <div className="top-container">
        {/* <PageHeader
          title={menu.menunm}
          subtitle={menu.subtitle}
          banners={primaryBanners}
          bgColor="#b8f497"
        /> */}

        <div className="section">
          <div className="container pad10">
            <div className="e-breadcrumb">
              <ul className="list-unstyled">
                <li>
                  <Link to="">
                    <span>Нүүр хуудас</span>
                  </Link>
                </li>
                <li>
                  <span>Ангилал</span>
                </li>
              </ul>
            </div>
            <div className="row row10">
              <div className="col-xl-3 pad10">
                <div className="left-panel">
                  <h5 className="title">
                    <strong>Хайлтын үр дүн</strong>
                  </h5>
                  <div className="block">
                    <div className="accordion" id="accordionExample">
                      <div className="collapse-content">
                        <ul className="list-unstyled">
                          {/* {promoCats &&
                            promoCats.map((promo, index) => (
                              <li key={index}>
                                <Link to="#">{promo.promotnm}</Link>
                              </li>
                            ))} */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <h5 className="title">
                    <strong>Шүүлтүүр</strong>
                  </h5>
                  <div className="left-filter">
                    {filters}
                    {/* {attributes &&
                      attributes.map((attr, index) => (
                        <div key={index}>
                          <a
                            className="collapse-title"
                            data-toggle="collapse"
                            href="#collapseThree"
                            role="button"
                            aria-expanded="true"
                            aria-controls="collapseExample"
                          >
                            {attr.attrnm}
                          </a>
                          <div className="collapse show" id="collapseThree">
                            <div className="collapse-content">
                              <ul className="list-unstyled">
                                {attr.values &&
                                  attr.values.map((val, index) => (
                                    <li key={index}>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id={val.id}
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customCheck1"
                                        >
                                          {val.text}
                                        </label>
                                      </div>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))} */}
                  </div>
                </div>
              </div>
              <div className="col-xl-9 pad10">
                <Spin spinning={this.state.loading}>
                  <CardList
                    type={CARD_LIST_TYPES.horizontal}
                    items={this.state.products}
                    showAll
                    cardType={CARD_TYPES.wide}
                  />
                </Spin>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryInfo;
