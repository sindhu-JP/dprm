// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import {
//   setCustomerNotes,
//   getCustomerNotes,
//   editCustomerNotes
// } from 'common/actions/individual';
// import _get from 'lodash/get';
// import { getRelatedParty } from 'common/actions/partyInteraction';
// import NotesContainer from './NotesContainer';

// const mapStateToProps = state => {
//   const user = _get(state, 'entities.user.user', {});

//   const relatedEntity = getRelatedParty('', user)[0];

//   return {
//     customerNotes: _get(state, 'entities.customer.customerNotes', []),
//     priorities: _get(state, 'app.masterData.clmMasterData.priority'),
//     user,
//     relatedParty: {
//       id: relatedEntity ? relatedEntity.id : '',
//       role: relatedEntity ? relatedEntity.role : ''
//     }
//   };
// };

// const mapDispatchToProps = (dispatch, props) => {
//   return bindActionCreators(
//     {
//       loadNotes: getCustomerNotes,
//       createNote: setCustomerNotes,
//       editNote: editCustomerNotes
//     },
//     dispatch
//   );
// };

// export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
