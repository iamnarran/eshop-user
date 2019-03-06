import React from "react";

class StaticPage extends React.Component {
  state = {
    ...this.props.container
  };

  render() {
    console.log("static", this.state.staticPages.id);
    const description = this.state.staticPages.description;
    return (
      <div className="section section-gray">
        <div className="container pad10">
          <div className="btn btn-gray" style={{ marginBottom: "10px" }}>
            <span className="text-uppercase">Нүүр хуудас</span>
          </div>

          <div
            className="static-page"
            style={{
              maxHeight: "900px",
              overflowY: "auto",
              backgroundColor: "white",
              borderRadius: "3px",
              padding: "40px 20px"
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </div>
    );
  }
}

export default StaticPage;
