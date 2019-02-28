import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class OutlinedTextFields extends React.Component {
  state = {
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "EUR"
  };

  handleChange = name => event => {
    if (this.props.city) {
      this.props.onChange(event.target.value);
    }
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes, label, option, city } = this.props;

    return (
      <form className={classes.container}>
        <TextField
          id="outlined-select-currency-native"
          select
          label={label}
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange("currency")}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu
            }
          }}
          margin="normal"
          variant="outlined"
          style={{ width: "100%" }}
        >
          {city
            ? option.map(i => (
                <option key={i.id} value={i.provinceid}>
                  {i.provincenm}
                </option>
              ))
            : option.map(i => (
                <option key={i.id} value={i.districtid}>
                  {i.districtnm}
                </option>
              ))}
        </TextField>
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedTextFields);
