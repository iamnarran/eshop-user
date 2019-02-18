import React from 'react';
class PackageList extends React.Component {

    render() {
        return (
            <div className="pack-list">
                <div className="row row10">
                    <div className="col-xl-8 pad10">
                        <ul className="list-unstyled">
                            <li className="flex-this">
                                <div className="image-container default">
                                    <span className="image" style={{ backgroundImage: 'url(http://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type.jpg)' }}></span>
                                </div>
                                <div className="info-container">
                                    <div className="flex-space">
                                        <p className="text">
                                            <span>Үүргэвч</span>
                                            <strong>40,000₮</strong>
                                        </p>
                                        <form>
                                            <div className="input-group e-input-group">
                                                <div class="input-group-prepend" id="button-addon4">
                                                    <button className="btn" type="button">
                                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                                <input type="text" className="form-control" placeholder="" value="1" aria-label="" aria-describedby="button-addon4" />
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
                            <li className="flex-this">
                                <div className="image-container default">
                                    <span className="image" style={{ backgroundImage: 'url(http://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type.jpg)' }}></span>
                                </div>
                                <div className="info-container">
                                    <div className="flex-space">
                                        <p className="text">
                                            <span>Үүргэвч</span>
                                            <strong>40,000₮</strong>
                                        </p>
                                        <form>
                                            <div className="input-group e-input-group">
                                                <div class="input-group-prepend" id="button-addon4">
                                                    <button className="btn" type="button">
                                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                                <input type="text" className="form-control" placeholder="" value="1" aria-label="" aria-describedby="button-addon4" />
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
                            <li className="flex-this">
                                <div className="image-container default">
                                    <span className="image" style={{ backgroundImage: 'url(http://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type.jpg)' }}></span>
                                </div>
                                <div className="info-container">
                                    <div className="flex-space">
                                        <p className="text">
                                            <span>Үүргэвч</span>
                                            <strong>40,000₮</strong>
                                        </p>
                                        <form>
                                            <div className="input-group e-input-group">
                                                <div class="input-group-prepend" id="button-addon4">
                                                    <button className="btn" type="button">
                                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                                <input type="text" className="form-control" placeholder="" value="1" aria-label="" aria-describedby="button-addon4" />
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
                        </ul>
                    </div>
                    <div className="col-xl-4 pad10">
                        <div className="pack-price">
                            <p className="text flex-this end">
                                <span>Дүн:</span>
                                <strong>54,800₮</strong>
                            </p>
                            <a href=" " className="btn btn-main">
                                <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                <span className="text-uppercase"> Сагсанд нэмэх</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PackageList;