import React, { Component } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { createForm } from "rc-form";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import Actions from "../actions/assets";
import Gallery from "./Gallery";

@connect(
  null,
  {
    insert: Actions.insert
  }
)
class AssetModal extends Component {
  state = {
    loading: false,
    submitCount: 0,
    file: "",
    imagePreviewUrl: ""
  };

  _submit = async fileUrl => {
    try {
      const { id } = this.props;
      await this.props.insert({
        id,
        asset: {
          assetSrc: fileUrl
        }
      });
      toast.success("Successfully added.");
      const { pathname } = this.props.location;
      this.props.history.replace(pathname);
    } catch (e) {
      console.error("CUSTOM ERROR: ", JSON.stringify(e));
    }
  };

  _handleSubmit = async e => {
    e.preventDefault();
    const { file } = this.state;
    if (file) {
      this.setState({ loading: true });
      try {
        const { id } = this.props;
        let formData = new FormData();
        formData.append("file", file);
        const res = await this.props.upload(formData);
        await this.props.insert({
          id,
          asset: {
            assetSrc: res.data
          }
        });
        toast.success("Successfully added.");
        const { pathname } = this.props.location;
        this.props.history.replace(pathname);
      } catch (e) {
        console.log("error: ", JSON.stringify(e), e);
      }

      this.setState({ loading: false });
    } else {
      this.setState({ submitCount: 1 });
    }
  };

  _handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  render() {
    const { isOpen, toggle, fileType = "image", ...props } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle} className="custom-modal" size="lg">
        <ModalHeader toggle={toggle}>Insert Asset</ModalHeader>
        <Gallery
          single
          onChange={file => {
            this._submit(file.fileUrl);
            toggle();
          }}
          close={toggle}
          {...props}
          fileType={fileType}
        />
      </Modal>
    );
  }
}

export default createForm()(AssetModal);
