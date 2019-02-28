import React from "react";
import { Link } from "react-router-dom";

class MainMenu extends React.Component {
  render() {
    const data = this.props && this.props.dataSource;
    var indents = data.map(function(item, index) {
      return (
        <li className="list-inline-item" key={index + 1000}>
          <Link to={item.link} key={index}>
            <span>{item.menunm}</span>
          </Link>
        </li>
      );
    });
    return <span>{indents}</span>;
  }
}

export default MainMenu;
