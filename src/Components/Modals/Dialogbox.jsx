import React from 'react';
import { createStyles } from '@material-ui/core/styles';

import { Modal } from '@material-ui/core';

const styles = (theme) =>
  createStyles({
    root: {
      margin: 0
      //   padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

// const DialogTitle = withStyles(styles)(() => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       <Typography variant="h6">{children}</Typography>
//       {onClose ? (
//         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles((theme: Theme) => ({
//   root: {
//     // padding: theme.spacing(2),
//     // width:300
//   },
// }))(MuiDialogContent);

// const DialogActions = withStyles((theme: Theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

export default function Servicemomdel() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal open={true} onClose={handleClose}></Modal>
    </div>
  );
}
