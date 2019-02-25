import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
});


class OutlinedTextFields extends React.Component {
  onChange = (e) => {
    console.log(e.target.value)
  }
  render() {
    const { classes, label, value } = this.props;

    return (
      <form className={classes.container}>
        <TextField
          id="outlined-dense"
          label={label}
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          onChange={this.onChange}
          style={{width: '100%'}}
        />        
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);