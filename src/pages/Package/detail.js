import React from 'react';
import { Link } from "react-router-dom";
import { IMAGE } from "../../utils/consts";
import Slider from "../../components/Slider";

class PackageDetail extends React.Component {
    state = {
        ...this.props.container
    }
    render() {
        const formatter = new Intl.NumberFormat("en-US");
        const name = this.state.Products[0].products;
        const price = this.state.Products[0].total;
        let products = null;
        let sameProducts = null;
        const images = this.state.Package.images;
        const title = this.state.Package.products[0].packagenm;
        const date = this.state.Package.products[0].insymd.split("T")[0].split("-");
        const sliderParams = {
            spaceBetween: 0,
            autoplay: {
                delay: 10000,
                disableOnInteraction: false
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true
            }
        };

        sameProducts = (
            name.map(item => {
                return (
                    <li>
                        <div className="single flex-this">
                            <div className="image-container">
                                <a href=" ">
                                    <span className="image" style={{
                                        backgroundImage: `url(${IMAGE + item.sameProduct[0].tag[0].img})`,
                                    }}></span>
                                </a>
                            </div>
                            <div className="info-container flex-space">
                                <a href=" ">
                                    <span>{item.sameProduct[0].tag[0].name}</span>
                                    <strong>{formatter.format(item.sameProduct[0].tag[0].price)}₮</strong>
                                </a>
                                <div className="action">
                                    <a href=" ">
                                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })
        );
        products = (
            name.map(item => {
                return (
                    <li className="flex-this">
                        <div className="image-container default">
                            <span className="image" style={{
                                backgroundImage: `url(${IMAGE + item.imgnm})`,
                            }}></span>
                        </div>
                        <div className="info-container">
                            <div className="flex-space">
                                <p className="text col-md-5">
                                    <span>{item.skunm}</span>
                                    <strong>{formatter.format(item.price)}₮</strong>
                                </p>
                                <form>
                                    <div className="input-group e-input-group">
                                        <div className="input-group-prepend" id="button-addon4">
                                            <button className="btn" type="button" >
                                                <i className="fa fa-minus" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                        <input type="text" className="form-control" placeholder="" defaultValue="1" aria-label="" aria-describedby="button-addon4" />
                                        <div className="input-group-append" id="button-addon4">
                                            <button className="btn" type="button">
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="action">
                                    <a href=" ">
                                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                );
            })
        )

        return (
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
                                <Link to="/package">
                                    <span>Багц</span>
                                </Link>
                            </li>
                            <li>
                                <span>{title}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="product-detail-page">
                        <div className="row row10">
                            <div className="col-xl-9 col-md-8 pad10">
                                <h4 className="title">
                                    <span>{title}</span>
                                </h4>
                                <p className="date">
                                    <span>{`${date[0]} оны ${date[1]} сарын ${date[2]}`}</span>
                                </p>
                                <div className="content">
                                    <div className="main-slide">
                                        <Slider
                                            data={images}
                                            params={sliderParams}
                                            elContainer={"images"}
                                        />
                                    </div>
                                    <div className="product-plus">
                                        <p>This is description.</p>
                                    </div>
                                </div>
                                <div className="pack-product-container">
                                    <div className="pack-list">
                                        <div className="row row10">
                                            <div className="col-xl-8 pad10">
                                                <ul className="list-unstyled">
                                                    {products}
                                                </ul>
                                            </div>
                                            <div className="col-xl-4 pad10">
                                                <div className="pack-price">
                                                    <p className="text flex-this end">
                                                        <span>Дүн:</span>
                                                        <strong>{formatter.format(price)}₮</strong>
                                                    </p>
                                                    <a href=" " className="btn btn-main">
                                                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                                        <span className="text-uppercase"> Сагсанд нэмэх</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info-container" style={{ float: 'right' }}>
                                        <span><i>Та багцаас сонгож авахгүй барааныхаа тоо хэмжээг 0 болгосноор багцаас хасаад сагсанд нэмэх боломжтой.</i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-4 pad10">
                                <div className="product-plus">
                                    <div className="block product-delivery">
                                        <p className="title">
                                            <strong>Хүргэлтийн мэдээлэл</strong>
                                        </p>
                                        <p className="text">
                                            <span>Энгийн хүргэлт (48 цагийн дотор) - 89,000₮ дээш бараа авсан тохиолдолд үнэгүй</span>
                                        </p>
                                    </div>
                                    <div className="block product-suggest">
                                        <p className="title">
                                            <strong>Ижил бараа</strong>
                                        </p>
                                        <ul className="list-unstyled">
                                            {sameProducts}
                                        </ul>
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

export default PackageDetail;
