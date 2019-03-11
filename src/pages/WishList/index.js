import React from 'react';
import { IMAGE } from "../../utils/consts";
import Rate from "../../components/Rate";

class WishList extends React.Component {
    state = {
        ...this.props.container
    }

    changeNumber = () => {
        console.log("this state");
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
                                    {item.rate[0].rate[0] ? (
                                        <Rate
                                            rate={item.rate[0].rate[0].ravg}
                                            numOfVotes={item.rate[0].rate[0].cnt}
                                        />
                                    ) : <Rate
                                            rate={0}
                                            numOfVotes={0}
                                        />}
                                </div>
                            </div>
                        </div>
                        <div className="price">
                            <strong>{formatter.format(item.price)}₮</strong>
                        </div>
                        <div className="action">
                            <ul className="list-unstyled flex-this end">
                                <li>
                                    <a >
                                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this.changeNumber}>
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
