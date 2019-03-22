import React from "react";

class StaticPage extends React.Component {
  state = {
    ...this.props.container
  };

  render() {
    const description = this.state.staticPages.description;
    return (
      <div className="section section-gray">
        <div className="container pad10">
          <div className="btn btn-gray" style={{ marginBottom: "10px" }}>
            <a href="/" className="text-uppercase" style={{ color: "grey" }}>
              Нүүр хуудас
            </a>
          </div>
          <div
            className="static-page"
            style={{
              maxHeight: "900px",
              minHeight: "700px",
              overflowY: "auto",
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "40px 20px"
            }}
          >
            <h5 style={{ height: "50px" }}>
              <center>{this.state.staticPages.name}</center>
            </h5>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </div>
    );
  }
}

export default StaticPage;
