import { connect } from 'react-redux';
import { getDefaultCurrencySelector } from 'common/selectors/masterData';
import { setTabDetails } from '360/actions/setTab';
import Customer from './Customer';

function mapStateToProps(state, ownProps) {
  const defaultCurrency = getDefaultCurrencySelector(state);
  const customer = _.get(state, 'entities.customer.byId', {})[
    ownProps.customerId
  ];
  const engagedParty = _.get(customer, 'engagedParty.id', '');
  const organizationCustomer = _.get(state, 'entities.organization.byId', {})[
    engagedParty
  ];
  return {
    defaultCurrency,
    organizationCustomer,
    setTabDetails
  };
}

export default connect({}, null)(Customer);
