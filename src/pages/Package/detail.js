import React from 'react';
import { Link } from "react-router-dom";
import { IMAGE } from "../../utils/consts";

class PackageDetail extends React.Component {
    state = {
        ...this.props.container
    }
    render() {
        console.log("detail", this.state)
        const formatter = new Intl.NumberFormat("en-US");
        const name = this.state.Products[0].products;
        const price = this.state.Products[0].total;
        let products = null;
        let sameProducts = null;
        sameProducts = (
            name.map(item => {
                return (
                    <li>
                        <div className="single flex-this">
                            <div className="image-container">
                                <a href=" ">
                                    <span className="image" style={{
                                        backgroundImage: `url(${IMAGE + item.imgnm})`,
                                    }}></span>
                                </a>
                            </div>
                            <div className="info-container flex-space">
                                <a href=" ">
                                    <span>{item.skunm}</span>
                                    <strong>{formatter.format(item.price)}₮</strong>
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
                                <p className="text">
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
                                <span>{this.state.Package.packagenm}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="product-detail-page">
                        <div className="row row10">
                            <div className="col-xl-9 col-md-8 pad10">
                                <h4 className="title">
                                    <span>{this.state.Package.packagenm}</span>
                                </h4>
                                <div className="pack-product-container">
                                    <div className="pack-total">
                                        <div className="flex-this">
                                            <div className="image-container default">
                                                <span className="image" style={{
                                                    backgroundImage: `url(${IMAGE + name[0].imgnm})`,
                                                }}></span>
                                            </div>
                                            <div className="info-container">
                                                <strong>Багц</strong>
                                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id justo mi. Maecenas vel lectus id erat euismod porta sed in felis.</span>
                                            </div>
                                        </div>
                                    </div>
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
                            <div className="row row10">
                                <div className="col-xl-9 pad10">
                                    <div className="comments-container">
                                        <h1 className="title">
                                            <span className="text-uppercase">Сэтгэгдэл</span>
                                        </h1>
                                        <div className="comments-list">
                                            <div className="main-rating">
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
                                                <p className="text">(32 хүн үнэлгээ өгсөн байна)</p>
                                            </div>
                                            <div className="single">
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
                                                    </ul>
                                                </a>
                                                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                                <ul className="list-unstyled bottom-info">
                                                    <li>
                                                        <span>2018.09.12</span>
                                                    </li>
                                                    <li>
                                                        <strong>Батаa</strong>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="single">
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
                                                    </ul>
                                                </a>
                                                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id justo mi. Maecenas vel lectus id erat euismod porta sed in felis. In massa mi, ornare vel sem eu, cursus vehicula leo. Curabitur vestibulum nisi at lacus dictum, non eleifend eros ullamcorper. </p>
                                                <ul className="list-unstyled bottom-info">
                                                    <li>
                                                        <span>2018.09.12</span>
                                                    </li>
                                                    <li>
                                                        <strong>Батаa</strong>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="single">
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
                                                    </ul>
                                                </a>
                                                <p className="text">Curabitur vestibulum nisi at lacus dictum, non eleifend eros ullamcorper. </p>
                                                <ul className="list-unstyled bottom-info">
                                                    <li>
                                                        <span>2018.09.12</span>
                                                    </li>
                                                    <li>
                                                        <strong>Батаa</strong>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="single">
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
                                                    </ul>
                                                </a>
                                                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id justo mi. Maecenas vel lectus id erat euismod porta sed in felis. In massa mi, ornare vel sem eu, cursus vehicula leo. </p>
                                                <ul className="list-unstyled bottom-info">
                                                    <li>
                                                        <span>2018.09.12</span>
                                                    </li>
                                                    <li>
                                                        <strong>Батаa</strong>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="write-comment">
                                            <div className="author">
                                                <div className="image-container">
                                                    <span className="image8" style={{ backgroundImage: 'url(http://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type.jpg)' }}></span>
                                                </div>
                                                <p className="name">
                                                    <strong>Болд<br />Ганзориг</strong>
                                                </p>
                                            </div>
                                            <form>
                                                <div className="form-group">
                                                    <textarea className="form-control" placeholder="Сэтгэгдэл үлдээх хэсэг" rows="5"></textarea>
                                                    <small id="emailHelp" className="form-text text-muted text-right">0 / 120</small>
                                                </div>
                                                <div className="btn btn-dark">
                                                    <span className="text-uppercase">Сэтгэгдэл үлдээх</span>
                                                </div>
                                            </form>
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

export default PackageDetail;

