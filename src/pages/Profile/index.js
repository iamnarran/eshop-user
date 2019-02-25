import React from 'react';

class Package extends React.Component {
    state = {
        ...this.props.container
    }
    render() {
        return (
            <div className="wrap">
                <div className="section section-gray">
                    <div className="container pad10">
                        <div className="user-section">
                            <div className="btn btn-gray">
                                <span className="text-uppercase">Нүүр хуудас</span>
                            </div>
                            <div className="user-section-container">
                                <div className="row row10">
                                    <div className="col-md-4 d-none d-md-block pad10">
                                        <div className="profile-menu">
                                            <div className="menu-header">
                                                <div className="flex-this">
                                                    <div className="image-container default">
                                                        <span className="image" style={{ backgroundImage: 'url(https://www.w3schools.com/howto/img_avatar.png)' }}></span>
                                                    </div>
                                                    <p className="name">Болд<br></br>Ганзориг</p>
                                                </div>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" ></div>
                                                </div>
                                                <p className="text text-center">
                                                    <strong>Таны мэдээлэл </strong>
                                                    <span>100% / 100%</span>
                                                </p>
                                            </div>
                                            <ul className="list-unstyled">
                                                <li>
                                                    <a href=" " className="flex-this">
                                                        <i className="fa fa-user" aria-hidden="true"></i>
                                                        <span>Профайл хуудас</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href=" " className="flex-this">
                                                        <i className="fa fa-check-square" aria-hidden="true"></i>
                                                        <span>Таны үзсэн барааны түүх</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href=" " className="flex-this">
                                                        <i className="fa fa-history" aria-hidden="true"></i>
                                                        <span>Худалдан авалтын түүх</span>
                                                    </a>
                                                </li>
                                                <li className="active">
                                                    <a href=" " className="flex-this">
                                                        <i className="fa fa-heart" aria-hidden="true"></i>
                                                        <span>Хадгалсан бараа</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href=" " className="flex-this">
                                                        <i className="fa fa-bell" aria-hidden="true"></i>
                                                        <span>Мэдэгдэл</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href=" " className="flex-this">
                                                        <i className="fa fa-database" aria-hidden="true"></i>
                                                        <span>Купон</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href=" " className="flex-this">
                                                        <i className="fa fa-credit-card" aria-hidden="true"></i>
                                                        <span>ePoint карт</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href=" " className="flex-this">
                                                        <i className="fa fa-compass" aria-hidden="true"></i>
                                                        <span>Хүргэлтийн хаяг</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href=" " className="flex-this">
                                                        <i className="fa fa-lock" aria-hidden="true"></i>
                                                        <span>Нууц үгээ солих</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <a href=" " className="btn btn-gray">
                                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                            <span className="text-uppercase">Гарах</span>
                                        </a>
                                    </div>
                                    <div className="col-md-8 pad10">
                                        <div className="user-menu-content">
                                            <p className="title">
                                                <span>Хадгалсан бараа</span>
                                            </p>
                                            <div className="product-list-history">
                                                <div className="single flex-space">
                                                    <div className="product">
                                                        <div className="flex-this">
                                                            <div className="image-container default">
                                                                <a href=" ">
                                                                    <span className="image" style={{ backgroundImage: 'url(https://www.logolynx.com/images/logolynx/a5/a56cc6e08ca05bc533b9382889d5f6a6.jpeg)' }} />
                                                                </a>
                                                            </div>
                                                            <div className="info">
                                                                <a href=" ">
                                                                    <p className="name">Шингэн кофе Американо</p>
                                                                    <p className="text">Шингэн кофе Американо No Brand</p>
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
                                                        <strong>24,000₮</strong>
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
                                                <div className="single flex-space">
                                                    <div className="product">
                                                        <div className="flex-this">
                                                            <div className="image-container default">
                                                                <a href=" ">
                                                                    <span className="image" style={{ backgroundImage: 'url(https://www.logolynx.com/images/logolynx/a5/a56cc6e08ca05bc533b9382889d5f6a6.jpeg)' }} />
                                                                </a>
                                                            </div>
                                                            <div className="info">
                                                                <a href=" ">
                                                                    <p className="name">Шингэн кофе Американо</p>
                                                                    <p className="text">Шингэн кофе Американо No Brand</p>
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
                                                        <strong>24,000₮</strong>
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
                                                <div className="single flex-space">
                                                    <div className="product">
                                                        <div className="flex-this">
                                                            <div className="image-container default">
                                                                <a href=" ">
                                                                    <span className="image" style={{ backgroundImage: 'url(https://www.logolynx.com/images/logolynx/a5/a56cc6e08ca05bc533b9382889d5f6a6.jpeg)' }} />
                                                                </a>
                                                            </div>
                                                            <div className="info">
                                                                <a href=" ">
                                                                    <p className="name">Шингэн кофе Американо</p>
                                                                    <p className="text">Шингэн кофе Американо No Brand</p>
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
                                                        <strong>24,000₮</strong>
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
                                                <div className="single flex-space">
                                                    <div className="product">
                                                        <div className="flex-this">
                                                            <div className="image-container default">
                                                                <a href=" ">
                                                                    <span className="image" style={{ backgroundImage: 'url(https://www.logolynx.com/images/logolynx/a5/a56cc6e08ca05bc533b9382889d5f6a6.jpeg)' }} />
                                                                </a>
                                                            </div>
                                                            <div className="info">
                                                                <a href=" ">
                                                                    <p className="name">Шингэн кофе Американо</p>
                                                                    <p className="text">Шингэн кофе Американо No Brand</p>
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
                                                        <strong>24,000₮</strong>
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
                                                <div className="single flex-space">
                                                    <div className="product">
                                                        <div className="flex-this">
                                                            <div className="image-container default">
                                                                <a href=" ">
                                                                    <span className="image" style={{ backgroundImage: 'url(https://www.logolynx.com/images/logolynx/a5/a56cc6e08ca05bc533b9382889d5f6a6.jpeg)' }} />
                                                                </a>
                                                            </div>
                                                            <div className="info">
                                                                <a href=" ">
                                                                    <p className="name">Шингэн кофе Американо</p>
                                                                    <p className="text">Шингэн кофе Американо No Brand</p>
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
                                                        <strong>24,000₮</strong>
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
                                                <div className="single flex-space">
                                                    <div className="product">
                                                        <div className="flex-this">
                                                            <div className="image-container default">
                                                                <a href=" ">
                                                                    <span className="image" style={{ backgroundImage: 'url(https://www.logolynx.com/images/logolynx/a5/a56cc6e08ca05bc533b9382889d5f6a6.jpeg)' }} />
                                                                </a>
                                                            </div>
                                                            <div className="info">
                                                                <a href=" ">
                                                                    <p className="name">Шингэн кофе Американо</p>
                                                                    <p className="text">Шингэн кофе Американо No Brand</p>
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
                                                        <strong>24,000₮</strong>
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
                                                <div className="single flex-space">
                                                    <div className="product">
                                                        <div className="flex-this">
                                                            <div className="image-container default">
                                                                <a href=" ">
                                                                    <span className="image" style={{ backgroundImage: 'url(https://www.logolynx.com/images/logolynx/a5/a56cc6e08ca05bc533b9382889d5f6a6.jpeg)' }} />
                                                                </a>
                                                            </div>
                                                            <div className="info">
                                                                <a href=" ">
                                                                    <p className="name">Шингэн кофе Американо</p>
                                                                    <p className="text">Шингэн кофе Американо No Brand</p>
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
                                                        <strong>24,000₮</strong>
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
                                                <div className="single flex-space">
                                                    <div className="product">
                                                        <div className="flex-this">
                                                            <div className="image-container default">
                                                                <a href=" ">
                                                                    <span className="image" style={{ backgroundImage: 'url(https://www.logolynx.com/images/logolynx/a5/a56cc6e08ca05bc533b9382889d5f6a6.jpeg)' }} />
                                                                </a>
                                                            </div>
                                                            <div className="info">
                                                                <a href=" ">
                                                                    <p className="name">Шингэн кофе Американо</p>
                                                                    <p className="text">Шингэн кофе Американо No Brand</p>
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
                                                        <strong>24,000₮</strong>
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

export default Package;
