import _ from "lodash";

export const calculateTotalChargesOfType = (chargeType, product) => {
  let total = 0;

  if (product && chargeType && typeof chargeType === "string") {
    total = _.get(product, "productOfferingPrice", []).reduce((acc, charge) => {
      if (charge.priceType === chargeType) {
        return acc + charge.price.value;
      } else {
        return acc;
      }
    }, 0);
  }

  return total;
};

export const getTotalChargeOfType = (
  chargeType,
  product,
  includeTax = true
) => {
  const upfrontChargeTypes = [
    "OneTimeCharge",
    "Fee",
    "Penalty",
    "Charge",
    "Deposit",
  ];
  const recurringChargeTypes = [
    "Recurring",
    "Rental",
    "AdvancedRental",
    "Installment",
  ];
  const validChargeTypes = ["upfront", "recurring"];
  let total = 0;

  if (!validChargeTypes.includes(chargeType)) {
    throw new Error("Invalid Charge Type.");
  }

  if (product) {

     
    total = _.get(product, "productOfferingPrice", []).reduce((acc, charge) => {
      if (chargeType === "upfront") {
        if (upfrontChargeTypes.includes(charge.priceType)) {
          let baseCharge = _.get(charge, "price.value", 0);
          let tax = _.get(charge, "tax[0].taxAmount.value", 0);

          if (tax && includeTax) {
            baseCharge = baseCharge + parseFloat(tax);
          }

          return acc + baseCharge;
        }
      }

      if (chargeType === "recurring") {
        if (recurringChargeTypes.includes(charge.priceType)) {
          let baseCharge = _.get(charge, "price.value", 0);

          let tax = _.get(charge, "tax[0].taxAmount.value", 0);

          if (tax && includeTax) {
            baseCharge = baseCharge + parseFloat(tax);
          }

          return acc + baseCharge;
        }
      }

      return acc;
    }, 0);
  }

  return total;
};
