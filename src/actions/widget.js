import api from '../api';
import Widgets from '../api/Widget';

let actions = {};
Widgets.forEach(widget => {
  if (widget.METHOD !== 'GET') {
    actions[widget.NAME] = data => dispatch => api.widget[widget.NAME](data);
  }
});

export default actions;