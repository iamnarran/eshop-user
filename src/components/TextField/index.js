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
  }
  render() {
    const { classes, label, value, type } = this.props;
    console.log(this.props.type)
    return (
      <form className={classes.container}>      
        <TextField
          id="outlined-full-width"
          label={label}
          type={ type === undefined ? '' : type}
          placeholder={label+'*'}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={value}
          onChange={this.props.onChange}
        />
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);