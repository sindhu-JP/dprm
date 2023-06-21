
 

  import constants  from "lib/constants/statuses";
const checkCustomerId = [
    "RegistrationRequest",
    "CorporateRegistrationRequest",
    "CustomerInformationUpdateRequest"
  ];


  const checkPublicIdentifier = [
    constants.serviceRequestType.SUSPENSION,
    constants.serviceRequestType.REVOKE_SUSPENSION,
    constants.serviceRequestType.TERMINATION,
    constants.serviceRequestType.SOFT_SUSPENSION,
    constants.serviceRequestType.REVOKE_SOFT_SUSPENSION,
    constants.serviceRequestType.ADD_VAS,
    constants.serviceRequestType.CHANGE_OF_PLAN,
    constants.serviceRequestType.MANAGE_VAS.TERMINATE,
    constants.serviceRequestType.SIM_CHANGE,
    constants.serviceRequestType.CHANGE_OF_SERVICE_ID,
    constants.serviceRequestType.RESET_PASSWORD,
    constants.serviceRequestType.CREDIT_LIMIT,
    constants.serviceRequestType.TRANSFER_OF_OWNERSHIP,
    constants.serviceRequestType.LOCATION_TRANSFER,
    constants.serviceRequestType.NOTIFICATION_REQUEST,
    constants.serviceRequestType.GROUP_DATA_SHARE,
    constants.serviceRequestType.NOTIFICATION_REQUEST,
    constants.serviceRequestType.WALLET_PIN_RESET,
    constants.serviceRequestType.BLOCK_UNBLOCK_WALLET,
    constants.serviceRequestType.DND_REQUEST
  ];
  
  const checkAccountId = [
    constants.serviceRequestType.PROMISE_TO_PAY,
    constants.serviceRequestType.BILLING_ACCOUNT_UPDATE,
    constants.serviceRequestType.PAY_BILL,
    constants.serviceRequestType.PAYMENT_REVERSAL,
    constants.serviceRequestType.ADD_SERVICE
  ];
const getAssociateIdWithCustomerType = (row) => {
    let customerId;
    let billingAccId;
    let productOrderId;
    let publicIdentifier;
    let planName;
    let customerType;
  
    if (!row) return null;
    if (checkCustomerId.indexOf(row['@type']) > -1) {
      const relatedParty = row.relatedParty || [];
      const data = relatedParty.find(
        (data) => data.role === constants.PARTY_INTERACTION_TYPES.CUSTOMER
      );
      customerId = _get(data, 'id', '');
      customerType = 'Customer';
    } else if (checkPublicIdentifier.indexOf(row['@type']) > -1) {
      if (_get(row, 'publicIdentifier[0]', '') !== '') {
        publicIdentifier = _get(row, 'publicIdentifier[0]', '');
        customerType = 'Subscription';
      } else {
        row.interactionItem &&
          row.interactionItem.length &&
          row.interactionItem.forEach((rowdata) => {
            if (
              !productOrderId &&
              _get(rowdata, 'item.@type', '') ===
                constants.PARTY_INTERACTION_TYPES.PRODUCT_ORDER
            ) {
              const orderItem = _find(
                rowdata.item.orderItem,
                (oi) => !!_get(oi, 'product.publicIdentifier')
              );
              publicIdentifier = _get(orderItem, 'product.publicIdentifier');
              planName =
                _get(orderItem, 'productOffering.name') ||
                _get(orderItem, 'product.productOffering.name');
            }
          });
      }
    } else if (checkAccountId.indexOf(row['@type']) > -1) {
      row.interactionItem &&
        row.interactionItem.length &&
        row.interactionItem.forEach((rowdata) => {
          if (
            !billingAccId &&
            (rowdata.item['@type'] ===
              constants.PARTY_INTERACTION_TYPES.BILLING_ACCOUNT ||
              rowdata.item['@referredType'] ===
                constants.PARTY_INTERACTION_TYPES.BILLING_ACCOUNT)
          ) {
            billingAccId = rowdata.item.id;
            customerType = 'Billing Account';
          }
        });
    }
    return {
      associateId: publicIdentifier || customerId || billingAccId,
      customerType
    };
  };
  

export default {getAssociateIdWithCustomerType}