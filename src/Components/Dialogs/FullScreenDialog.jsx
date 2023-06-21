import React from 'react';
import { Dialog, makeStyles, Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 0
  }
}));
const FullScreenDialog = (props) => {
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
      PaperProps={{
        className: classes.paper
      }}
    >
      {props.children}
    </Dialog>
  );
};

FullScreenDialog.propTypes = {};
export default FullScreenDialog;
