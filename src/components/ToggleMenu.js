import React from 'react';
import { Link } from 'react-router-dom';

class MainMenu extends React.Component {
    render() {
        const data = this.props && this.props.dataSource;
        var indents = data.map(function (item, index) {
            return (
                <li key={index}>
                    <Link to={item.link}><span>{item.menunm}</span></Link>
                </li>
            );
        });
        return (
            <div className="single top-3">
                <ul className="list-unstyled flex-this flex-wrap">
                    {indents}
                </ul>
            </div>
        )
    }
}

export default MainMenu;