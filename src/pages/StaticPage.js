import React from "react";

class StaticPage extends React.Component {
  render() {
    const description = this.state.staticPages.description;
    return (
      <div className="section section-gray static">
        <div className="container pad10">
          <div
            className="ck-editor"
            style={{
              minHeight: "700px",
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
