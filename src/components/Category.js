import React from "react";

class MainMenu extends React.Component {
  render() {
    const data = this.props && this.props.dataSource;
    var indents = data.map(function(item, index) {
      return (
        <div className="col-md-3 pad20" key={index} style={{ zIndex: "100" }}>
          <ul className="list-unstyled">
            <li key={index}>
              <a href={item.route ? item.route : " "} className="list-unstyled">
                <strong className="text-uppercase">{item.name}</strong>
              </a>
            </li>
            {item.children &&
              item.children.map(function(it, ind) {
                return (
                  <li key={ind}>
                    <a
                      href={it.route ? it.route : " "}
                      className="list-unstyled"
                    >
                      <span>{it.name}</span>
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      );
    });
    return <div className="row row10">{indents}</div>;
  }
}

export default MainMenu;
