import api from "../../api";
import Register from "../../api/User/register";

let actions = {};
Register.forEach(register => {
  if (register.METHOD !== "GET") {
    actions[register.NAME] = data => dispatch =>
      api.register[register.NAME](data);
  }
});

export default actions;
