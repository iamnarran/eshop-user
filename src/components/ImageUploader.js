import React, { Component } from 'react';
import Fontawesome from '@fortawesome/react-fontawesome';
import faUpload from '@fortawesome/fontawesome-free-solid/faUpload';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

export class ActiveImage extends Component {
  render() {
    const { src, active, onClick, remove } = this.props;

    return (
      <div
        className={ `active-image ${ active && 'active' }` }
        onClick={ onClick }
      >
        <div className="times" onClick={ remove }>
          <Fontawesome icon={ faTimes } />
        </div>
        <img src={ src } alt="" width = { this.props.width || '100px' }/>
        { active && <div className="active-text">Featured Image</div> }
      </div>
    );
  }
}

class Upload extends Component {
  state = {
    file: '',
    imagePreviewUrl: '',
    files: [],
    previews: [],
    current: 0
  };

  componentWillMount() {
    const { images } = this.props;
    if (images) {
      this.setState({ previews: images, files: images.map(() => null) });
    }
  }
  componentDidUpdate() {
    console.log('state: ', this.state);
  }

  _handleImageChange = e => {
    e.preventDefault();

    const { files } = e.target;
    let tmp = [...this.state.files];
    let tmpPreview = [...this.state.previews];

    Array.from(files).forEach((file, index) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        tmp.push(file);
        tmpPreview.push(reader.result);
        this.setState({
            files: tmp,
            previews: tmpPreview
        });
        this.props.upload(tmp);
      };
      reader.readAsDataURL(file);
    });
  };

  render() {
    const { previews, current, files } = this.state;
    return (
      <div className="file-input-container">
        <div className="input-images">
          {
            previews.map((p, index) => {
              return (
                <ActiveImage
                  key={`active-${index}`}
                  src={p}
                  index={index}
                  active={current === index}
                  onClick={() => {
                    this.setState({ current: index });
                    this.props.setCurrent(index);
                  }}
                  remove={e => {
                    e.preventDefault();
                    e.persist();
                    this.setState({
                      previews: previews.filter(
                        (p, i) => index !== i
                      ),
                      files: files.filter(
                        (p, i) => index !== i
                      )
                    });
                  }}
                />
              );
            })
          }
          <div className="wrapper">
            <input
              type="file"
              onChange={this._handleImageChange}
              className="form-control"
              style={{}}
              multiple
              accept="image/*"
            />
            <div className="input-upload">
              <Fontawesome icon={faUpload} />
              <p>Upload</p>
            </div>
          </div>
        </div>
        {
          previews &&
            previews.length > 0 && (
              <div className="form-group">
                <hr />
              </div>
            )
        }
      </div>
    );
  }
}

class ImageUploader extends Component {
  state = {
    files: []
  };

  _insert = file => {
    const { files } = this.state;
    files.push(file);
    this.setState({ files });
  };

  render() {
    // const { setCurrent } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12">
          <Upload
            insert={ this._insert }
            { ...this.props }
          />
        </div>
      </div>
    );
  }
}

export default ImageUploader;
