import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IMAGE } from "../../utils/consts";

import "./style.css";

class Footer extends React.Component {
  render() {
    const { staticInfo, staticPage } = this.props.container;

    return (
      <div className="top-container">
        <div className="section section-footer">
          <div className="container pad10">
            <div className="row row10">
              <div className="col-sm-12 col-md-6 col-lg-3 pad10">
                <Link to="/" className="logo">
                  <img alt="logo" src={IMAGE + staticInfo.logopath2} />
                </Link>
                <ul className="social">
                  <li>
                    <Link
                      to={staticInfo.facebook}
                      target="_blank "
                      rel="noopener"
                    >
                      <span className="fa-layers fa-fw">
                        <FontAwesomeIcon
                          icon={["fas", "circle"]}
                          size="4x"
                          color="#999"
                        />
                        <FontAwesomeIcon
                          icon={["fab", "facebook-f"]}
                          size="4x"
                          inverse
                          transform="shrink-6 right-3.5"
                        />
                      </span>
                    </Link>
                    <Link to={staticInfo.gmail} target="_blank " rel="noopener">
                      <span className="fa-layers fa-fw">
                        <FontAwesomeIcon
                          icon={["fas", "circle"]}
                          size="4x"
                          color="#999"
                        />
                        <FontAwesomeIcon
                          icon={["fab", "google-plus-g"]}
                          size="4x"
                          inverse
                          transform="shrink-6 left-2"
                        />
                      </span>
                    </Link>
                    <Link
                      to={staticInfo.twitter}
                      target="_blank "
                      rel="noopener"
                    >
                      <span className="fa-layers fa-fw">
                        <FontAwesomeIcon
                          icon={["fas", "circle"]}
                          size="4x"
                          color="#999"
                        />
                        <FontAwesomeIcon
                          icon={["fab", "twitter"]}
                          size="4x"
                          inverse
                          transform="shrink-6"
                        />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-3 pad10">
                <ul className="list-unstyled">
                  {staticPage.map((item, index) => {
                    if (item.pagetype == "1") {
                      return (
                        <li key={index}>
                          <a href={item.slug + "/" + item.id}>
                            <span>{item.name}</span>
                          </a>
                        </li>
                      );
                    } else {
                      return;
                    }
                  })}
                </ul>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-3 pad10">
                <ul className="list-unstyled">
                  {staticPage.map((item, index) => {
                    if (item.pagetype == "2") {
                      return (
                        <li key={index}>
                          <a href={item.slug + "/" + item.id}>
                            <span>{item.name}</span>
                          </a>
                        </li>
                      );
                    } else {
                      return;
                    }
                  })}
                </ul>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-3 pad10">
                <ul className="list-unstyled address">
                  <li>
                    <strong>Холбоо барих</strong>
                  </li>
                  <li>
                    <span>{staticInfo.address}</span>
                  </li>
                  <li>
                    <span>{staticInfo.phone}</span>
                  </li>
                  <li>
                    <span>{staticInfo.email}</span>
                  </li>
                  <li>
                    <span>{staticInfo.website}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bottom-container">
              <center>
                <p>Copyright © 2016-2019 emart. All Rights Reserved.</p>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
