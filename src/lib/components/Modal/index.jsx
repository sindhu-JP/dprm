import Modal from "./Modal";
import { connect } from "react-redux";
import ModalsStore from "Store/Modals";

export default connect(
  (state) => ({
    state: state.modals,
  }),
  {
    close: ModalsStore.close,
  }
)(Modal);
