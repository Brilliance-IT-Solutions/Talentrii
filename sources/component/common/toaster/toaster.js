import {showMessage} from "react-native-flash-message";

export const showError = (message) => {
  showMessage({
      type: 'danger',
      icon: 'danger',
      message,
      autoHide:true,
      duration:3000
  });
};

export const showSuccess = (message) => {
   showMessage({
      type: 'success',
      icon: 'success',
      message,
      autoHide:true,
      duration:3000

  });
};
