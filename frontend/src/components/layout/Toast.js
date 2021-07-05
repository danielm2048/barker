import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { useToastStore } from "../../store";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Toast = () => {
  const { open, type, message, clearToast } = useToastStore();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    clearToast();
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
