import React from 'react';

import {
  PricingComponent,
  convertProductOfferingPrice
} from '@tt-dclm/dclm-web-ui-presales';

import { Products } from 'Http/api';

const Cart = (props) => {
  const { quote, getUpdatedProductOrder } = props;

  const getFullProductOffering = async (offerId) => {
    const product = await Products.getFullProduct(offerId);
    return convertProductOfferingPrice(product);
  };
  return (
    <PricingComponent
      productOrder={quote}
      getFullProductOffering={getFullProductOffering}
      hasWaiveOffPermissions={true}
      hasOverridePermissions={true}
      getUpdatedProductOrder={getUpdatedProductOrder}
    />
  );
};

export default Cart;
