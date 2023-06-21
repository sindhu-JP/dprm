import React from 'react';

import { useStateful } from 'react-hanger';
import QuoteBreakdownView from './QuoteBreakdown';

const QuoteBreakdown = ({ charges, products }) => {
  const table = useStateful({
    rows: [],
    columns: []
  });

  const getCharge = (prices, type) => {
    let total = 0;

    prices.map((price) => {
      if (price.priceType === type) {
        total = total + price.price.value;
      }
    });

    return total;
  };

  const createData = (product) => {
    return {
      name: product.name,
      qty: 1,
      upfront: getCharge(product.productOfferingPrice, 'OneTimeCharge'),
      discount1: 0,
      total1: getCharge(product.productOfferingPrice, 'OneTimeCharge'),
      rentals: getCharge(product.productOfferingPrice, 'Rental'),
      discount2: 0,
      months: 1,
      total2: getCharge(product.productOfferingPrice, 'Rental')
    };
  };

  const createTable = () => {
    let rows = [];

    if (products) {
      if (products.vas) {
        // Object.keys(products.vas).map((key) => {
        //   rows.push(createData(products.vas[key]));
        // });
      }
      if (products.products) {
        // Object.keys(products.products).map((key) => {
        //   rows.push(createData(products.products[key]));
        // });
      }
    }

    table.setValue({ ...table.value, rows });
  };

  React.useEffect(createTable, [products]);

  return <QuoteBreakdownView charges={charges} table={table.value} />;
};

QuoteBreakdown.propTypes = {};
export default QuoteBreakdown;
