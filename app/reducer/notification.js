let datanotifi = {
  data: [],
  number_notifi: 0
};
import { shownotifi } from "app/utils/notifi/notifiUtils";
var notification = (state = datanotifi, action) => {
  switch (action.type) {
    case "ADD_LIST":
      console.log("addlist", action);
      let notifi = { ...state };
      notifi.data = notifi.data.concat(action.data);
      return notifi;
      break;
    case "SET_NOTIFICATION":
      return { ...state, number_notifi: action.data };
      break;
    case "ADD_NOTIFICATION":
      let data = { ...state };
      data.data.unshift(action.data);
      data.number_notifi += 1;

      return data;
      break;
    case "RESET_NOTIFICATION":
      return { ...state, number_notifi: 0 };
      break;
    default:
      return state;
  }
};
module.exports = notification;
