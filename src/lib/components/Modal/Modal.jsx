import React from "react";
import MUIModal from "@material-ui/core/Modal";

const Modal = (props) => {
  const { id, children, close, state }=props 
  return (
    <MUIModal open={!!state[id]}>
      {typeof children === "function"
        ? children({
            modalId: id,
            context: state.context,
            close: () => close(id),
          })
        : children }
    </MUIModal>
  );
};

export default Modal;
