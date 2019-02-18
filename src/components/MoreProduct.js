
import React from 'react';

class Package extends React.Component {
    render() {
        return (
            <div className="block product-suggest">
                <p className="title">
                    <strong>Хослох бараа</strong>
                </p>
                <ul className="list-unstyled">
                    <li>
                        <div className="single flex-this">
                            <div className="image-container">
                                <a href=" ">
                                    <span className="image" style={{ backgroundImage: 'url(http://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type.jpg)' }}></span>
                                </a>
                            </div>
                            <div className="info-container flex-space">
                                <a href=" ">
                                    <span>Эрүүл мэндийн ундаа</span>
                                    <strong>5,700₮</strong>
                                </a>
                                <div className="action">
                                    <a href=" ">
                                        <i class="fa fa-cart-plus" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="more-link text-center">
                    <a href=" " className="btn btn-border">
                        <span className="text text-uppercase">Бүх хослох барааг үзэх</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default Package;
