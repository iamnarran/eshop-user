import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import config from '../config';

const IMAGE =
    process.env.NODE_ENV === 'development'
        ? config.image.development
        : config.image.production;

class Footer extends React.Component {
   render() {      
      const { staticinfo } = this.props.container
      
      return(
         <div className="top-container">
         <div className="section section-footer">
            <div className="container pad10">
                <div className="row row10">
                    <div className="col-xl-3 pad10">
                        <Link to="" className="logo">
                            <img alt="logo" src={IMAGE + staticinfo.logopath} />
                        </Link>
                        <ul className="list-unstyled address">
                            <li>
                                <span>
                                    <Icon type="facebook" />
                                </span>
                                <span>
                                    <Icon type="google-plus" />
                                </span>
                                <span>
                                    <Icon type="twitter" />
                                </span>
                            </li>
                            {/* <li>
                                <span>
                                <Icon type="twitter" />
                                </span>
                            </li>
                            <li>
                                <span>
                                    <Icon type="google-plus" />
                                </span>
                            </li> */}
                        </ul>
                    </div>
                    <div className="col-xl-3 pad10">
                        <ul className="list-unstyled">
                            <li>
                                <strong>Бидний тухай</strong>
                            </li>
                            <li>
                                <Link to="">
                                    <span>Үйлчилгээний нөхцөл</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <span>Нууцлалын баталгаа</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <span>Хүргэлтийн журам</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <span>Бараа буцаах солиулах нөхцөл</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xl-3 pad10">
                        <ul className="list-unstyled">
                            <li>
                                <strong>Үйлчилгээний нөхцөл</strong>
                            </li>
                            <li>
                                <Link to="">
                                    <span>Гишүүнчилэл</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <span>Худалдан авалт хийх заавар</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <span>Түгээмэл асуулт хариулт</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <span>Урамшуулал</span>
                                </Link>
                            </li>
                        </ul>                                
                    </div>
                    <div className="col-xl-3 pad10">
                        <ul className="list-unstyled address">
                            <li>
                                <strong>Холбоо барих</strong>
                            </li>
                            <li>
                                <span>
                                    {staticinfo.address}
                                </span>
                            </li>
                            <li>
                                <span>
                                    {staticinfo.phone}
                                </span>
                            </li>
                            <li>
                                <span>
                                    {staticinfo.email}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bottom-container">
                    <p>Copyright © 2016-2018 emart. All Rights Reserved.</p>
                </div>
            </div>
         </div>
         </div>
      );
   }
}

export default Footer;