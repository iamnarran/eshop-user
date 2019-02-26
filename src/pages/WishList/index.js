import React from 'react';
import { IMAGE } from "../../utils/consts";

class WishList extends React.Component {
    state = {
        ...this.props.container
    }
    render() {
        let tableList = null;
        const list = this.state.wishList;
        const formatter = new Intl.NumberFormat("en-US");
        tableList = (
            list.map((item, index) => {
                return (
                    <div className="single flex-space">
                        <div className="product">
                            <div className="flex-this">
                                <div className="image-container default">
                                    <a href=" ">
                                        <span className="image" style={{
                                            backgroundImage: `url(${IMAGE + item.image})`,
                                        }}></span>
                                    </a>
                                </div>
                                <div className="info">
                                    <a href=" ">
                                        <p className="name">{item.skunm}</p>
                                        <p className="text">{item.bibrandnm}</p>
                                    </a>
                                    <a href=" " className="rating">
                                        <ul className="list-inline">
                                            <li className="list-inline-item active">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                            </li>
                                            <li className="list-inline-item active">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                            </li>
                                            <li className="list-inline-item half-active">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                            </li>
                                            <li className="list-inline-item">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                            </li>
                                            <li className="list-inline-item">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                            </li>
                                            <li className="list-inline-item">
                                                <span className="text">197</span>
                                            </li>
                                        </ul>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="price">
                            <strong>{formatter.format(item.price)}</strong>
                        </div>
                        <div className="action">
                            <ul className="list-unstyled flex-this end">
                                <li>
                                    <a href=" ">
                                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href=" ">
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            })
        );

        return (
            <div className="wrap">
                <div className="section section-gray">
                    <div className="container pad10">
                        <div className="user-section">
                            <div className="user-section-container">
                                <div className="row row10">
                                    <div className="col-md-8 pad10">
                                        <div className="user-menu-content">
                                            <p className="title">
                                                <span>Хадгалсан бараа</span>
                                            </p>
                                            <div className="product-list-history">
                                                {tableList}
                                            </div>
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

export default WishList;
