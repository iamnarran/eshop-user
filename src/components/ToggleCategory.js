import React from 'react';
import { Link } from 'react-router-dom';

class MainMenu extends React.Component {
    render() {
        const data = this.props && this.props.dataSource;
        var indents = data.map(function (item, index) {
            return (
                <div className="card">
                    <button className="btn btn-link flex-this flex-space" key={index} type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <strong className="text-uppercase">{item.name}</strong>
                        <i className="fa fa-chevron-down" aria-hidden="true"></i>
                    </button>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <ul className="list-unstyled">
                            {
                                item.children && item.children.map(function (it, ind) {
                                    return (
                                        <li>
                                            <Link to="" key={ind}>
                                                <span>{it.name}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            )
        });
        return (
            <div className="single">
                <div className="accordion" id="accordionExample">
                    {indents}
                </div>
            </div>
        )
    }
}

export default MainMenu;
