export default [
  {
    id: "5ef082d105d9980006e7b8b2",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5ef082d005d9980006e7b8b0",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f6451da5fca5d00064a7134",
            "@type": "OverrideRule",
            name: "OverridePolicy4",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f6451da5fca5d00064a7134",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        name: "USSD 1000 TPS  Rental",
        description: "USSD 1000 TPS ",
        version: "12",
        lastUpdate: "2020-09-21T07:15:02.859Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-07-01T00:00:00.000Z",
          endDateTime: "2020-08-31T00:00:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "monthly",
        recurringChargePeriodLength: 1,
        percentage: 0,
        price: {
          value: 350,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 17.5,
              unit: "GHS",
            },
            taxCategory: "VAT",
            taxRate: 5,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP164",
        charges: [
          {
            name: "Advance Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "e5b1f20f-9a23-4cd7-8dbb-ed93c84a4022",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:35",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5ef082d005d9980006e7b8b0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5efc72ddfded2c0007a17f38",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        price: {
          value: 400,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-07-01T11:01:28.674Z",
          endDateTime: "2021-01-01T11:01:28.674Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "One Time Charges",
        description: "One Time Charges",
        lifecycleStatus: "Launched",
        version: "3",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        lastUpdate: "2020-08-13T06:51:08.790Z",
        code: "POP227",
        externalSystem: [
          {
            id: "725fb4ec-045d-406e-9b45-5cc484380600",
            system: "NGB",
            "@baseType": "Charge",
            "@type": "OneTimeInstallments",
          },
        ],
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5efc72ddfded2c0007a17f38",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f6afeb5659a1c0009ad841c",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:14",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 75,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-09-23T07:51:16.243Z",
          endDateTime: "2022-01-31T07:51:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Connection Charge",
        lifecycleStatus: "Initial",
        version: "0",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 3.75,
              unit: "GHS",
            },
          },
        ],
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-23T07:52:21.723Z",
        code: "POP684",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f6afeb5659a1c0009ad841c",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "USSD 1000 TPS",
    description: "USSD 1000 TPS",
    isBundle: false,
    isSellable: true,
    version: "16",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-07-01T00:00:00.000Z",
      endDateTime: "2020-08-31T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-09-23T07:52:24.681Z",
    productSpecification: {
      id: "5f34d5cbd12c54000839fe73",
      businessType: ["Postpaid"],
      technology: ["USSD"],
      resourceSpecification: [],
      serviceSpecification: ["5f3bb266d1aff90008315cab"],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-08-13T05:53:08.715Z",
        endDateTime: "2021-02-13T05:53:08.715Z",
      },
      name: "USSDSC",
      isBundle: false,
      lifecycleStatus: "Launched",
      version: "22",
      "@type": "ServiceLevelProductSpec",
      "@baseType": "AtomicProductSpecification",
      LoB: "DigitalServices",
      productSpecificationRelationship: [
        {
          id: "5f341ad9d12c54000839fe6a",
          name: "TPS VAS",
          validFor: {
            startDateTime: "2020-08-12T00:00:00.000Z",
            endDateTime: "2023-08-13T00:00:00.000Z",
          },
          href:
            "http://dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f341ad9d12c54000839fe6a",
          type: "addon",
        },
      ],
      productSpecCharacteristic: [
        {
          name: "Short Code",
          valueType: "string",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          regex: "^[0-9A-Za-z]{4}$",
          extensible: true,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "string",
              isDefault: true,
            },
          ],
        },
      ],
      lastUpdate: "2020-09-24T06:07:57.258Z",
      code: "PS670",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f34d5cbd12c54000839fe73",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    code: "PO84",
    pendingLifecycleStatus: "",
    externalSystem: [
      {
        id: "39d8ed5e-738d-405a-b586-7b399bc80cc9",
        "@system": "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5ef082d105d9980006e7b8b2",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
    prodSpecCharUse: [
      {
        name: "Short Code",
        productSpecification: {
          id: "5f34d5cbd12c54000839fe73",
        },
        publicIdentifier: true,
      },
    ],
  },
  {
    id: "5ef2eac312b18e00069424b7",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
      {
        id: "5d38894783ba2e1cba2de8c4",
        href: "https://host:port/catalogManagement/channel/4",
        name: "Kiosk",
        "@referredType": "Kiosk",
      },
      {
        id: "5d41e21618adf5f90f25ca06",
        href: "https://host:port/catalogManagement/channel/5",
        name: "IVR",
        "@referredType": "IVR",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5ef2eac312b18e00069424b4",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        name: "Ultra Dedicated Bandwidth Deposit",
        description:
          "This offer provides an ultra high speed of 1Gbps/2.5Gbps/5Gbps.",
        version: "15",
        lastUpdate: "2020-08-20T06:28:29.359Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-06-24T00:00:00.000Z",
          endDateTime: "2020-12-25T00:00:00.000Z",
        },
        priceType: "Deposit",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        price: {
          value: 2000,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 0,
              unit: "GHS",
            },
            taxCategory: "",
            taxRate: 0,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "OneTimeChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP191",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5ef2eac312b18e00069424b4",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5ef2eac312b18e00069424b5",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5ef495bcea7c87000aa960c5",
            "@type": "PolicyRule",
            name: "RentalPolicy01",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5ef495bcea7c87000aa960c5",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        name: "Ultra Dedicated Bandwidth Rental",
        description:
          "This offer provides an ultra high speed of 1Gbps/2.5Gbps/5Gbps.",
        version: "22",
        lastUpdate: "2020-09-13T14:20:02.556Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-06-24T00:00:00.000Z",
          endDateTime: "2020-12-25T00:00:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "monthly",
        recurringChargePeriodLength: 1,
        percentage: 0,
        price: {
          value: 1000,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 50,
              unit: "GHS",
            },
            taxCategory: "VAT",
            taxRate: 5,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP192",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5ef2eac312b18e00069424b5",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "Ultra Dedicated Bandwidth",
    description:
      "This offer provides an ultra high speed dedicated bandwidth service of 5Gbps",
    isBundle: false,
    isSellable: true,
    version: "9",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-06-24T00:00:00.000Z",
      endDateTime: "2020-12-25T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-08-20T06:29:28.387Z",
    productSpecification: {
      id: "5ef2eac312b18e00069424b6",
      businessType: ["Postpaid"],
      technology: ["LeasedLine"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f2bc95073e2a50009053a99",
          name: "Cable Type Product",
          version: "8",
          "@type": "GoodsProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2bc95073e2a50009053a99",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f2bc95073e2a50009053a9a",
          name: "Leased Line Modem Product",
          version: "8",
          "@type": "GoodsProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2bc95073e2a50009053a9a",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f2bc95073e2a50009053a9b",
          name: "Speed Product",
          version: "9",
          "@type": "GoodsProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2bc95073e2a50009053a9b",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f48a25ba5fa520009214cc8",
          name: "Installation",
          version: "3",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f48a25ba5fa520009214cc8",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [
        {
          id: "5ce4ffc4a9060a9e09433953",
          href:
            "https://host:port/partyManagement/organization/5ce4ffc4a9060a9e09433953",
          name: "Home Network",
          version: "1.0",
        },
        {
          id: "5ce534bea9060a9e0943838c",
          href:
            "https://host:port/partyManagement/organization/5ce534bea9060a9e0943838c",
          name: "End customer",
          version: "1.0",
        },
      ],
      attachment: [],
      name: "STC ISDN Corporate",
      description: "STC ISDN Corporate connection",
      version: "48",
      brand: "Ultranet",
      LoB: "Broadband",
      isBundle: true,
      lastUpdate: "2020-09-10T05:05:32.357Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-08-06T00:00:00.000Z",
        endDateTime: "2020-12-05T00:00:00.000Z",
      },
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      productSpecCharacteristic: [],
      targetProductSchema: {
        "@type": "DOM",
        href: {},
      },
      productSpecificationRelationship: [],
      code: "PS318",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5ef2eac312b18e00069424b6",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    code: "PO107",
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5ef2eac312b18e00069424b7",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f0f0e6df6645e0008b45c88",
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["nochange", "add", "modify", "delete"],
          id: "5f185b7454a408000926c478",
          name: "CRM",
        },
        {
          allowedActionType: ["nochange"],
          id: "5f185b7454a408000926c479",
          name: "Webshop",
        },
      ],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5cfa51b2a9060a9e0960bae5",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5cfa51b2a9060a9e0960bae5",
        lastUpdate: "2020-10-11T11:00:41.834Z",
        parentId: "",
        isRoot: true,
        name: "Mobile",
        description: "A category for mobile",
        lifecycleStatus: "Active",
        version: "1",
        "@type": "Category",
        productOffering: [],
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f104f360c85cf0009b5a174",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        validFor: {
          startDateTime: "2020-06-30T19:30:00.000Z",
          endDateTime: "2099-08-30T19:30:00.000Z",
        },
        "@type": "DiscountProdOfferPriceChargeAlteration",
        "@baseType": "ProdOfferPriceChargeAlteration",
        name: "Promotion price policy",
        description: "Promotion price policy",
        lifecycleStatus: "Launched",
        version: "18",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Discount",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 10,
        prodOfferPriceAction: [],
        tax: [
          {
            taxAmount: {
              value: 0,
              unit: "IRR",
            },
            taxCategory: "",
            taxRate: 9,
          },
        ],
        prodSpecCharValueUse: [],
        lastUpdate: "2020-08-05T07:31:46.218Z",
        code: "POP288",
        price: {
          unit: "IRR",
        },
        unitOfMeasure: "Currency",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f104f360c85cf0009b5a174",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f104a9f0c85cf0009b5a171",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        price: {
          value: 1500,
          unit: "IRR",
        },
        validFor: {
          startDateTime: "2020-07-22T00:00:00.000Z",
          endDateTime: "2099-12-30T00:00:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "One Time Charge",
        description: "Other resources consumption tt",
        lifecycleStatus: "Launched",
        version: "19",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [
          {
            taxAmount: {
              value: 135,
              unit: "IRR",
            },
            taxCategory: "VAT",
            taxRate: 9,
          },
        ],
        prodSpecCharValueUse: [],
        lastUpdate: "2020-09-07T12:21:48.561Z",
        code: "POP285",
        charges: [
          {
            name: "DeviceServiceCharge",
            chargeClass: "OneTime",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "9245466f-a8fd-4b66-9437-7b40e1ae9268",
            glCode: "842988",
            time: "2020-08-25T07:31:43",
          },
        ],
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f104a9f0c85cf0009b5a171",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f1045b60c85cf0009b5a16f",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f1047268851bb0009a2d442",
            "@type": "PolicyRule",
            name: "Tiered based Installation fee",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f1047268851bb0009a2d442",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f104dfb8851bb0009a2d445",
            "@type": "OverrideRule",
            name: "Override Installation fee",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f104dfb8851bb0009a2d445",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        validFor: {
          startDateTime: "2020-07-22T00:00:00.000Z",
          endDateTime: "2099-12-30T00:00:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Installation Fee",
        description: "Installation Fee",
        lifecycleStatus: "Launched",
        version: "22",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        prodOfferPriceAction: [],
        tax: [
          {
            taxAmount: {
              value: 0,
              unit: "IRR",
            },
            taxCategory: "",
            taxRate: 9,
          },
        ],
        prodSpecCharValueUse: [],
        lastUpdate: "2020-08-05T12:50:35.978Z",
        code: "POP283",
        price: {
          unit: "IRR",
          value: 202,
        },
        unitOfMeasure: "Currency",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f1045b60c85cf0009b5a16f",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f10496d0c85cf0009b5a170",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f1049a78851bb0009a2d443",
            "@type": "PolicyRule",
            name: "Tiered based feasibility check fee",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f1049a78851bb0009a2d443",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f104e678851bb0009a2d446",
            "@type": "OverrideRule",
            name: "Override feasibility check fee",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f104e678851bb0009a2d446",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        validFor: {
          startDateTime: "2020-07-22T00:00:00.000Z",
          endDateTime: "2099-12-30T00:00:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Feasability check fee",
        description: "Feasability check fee",
        lifecycleStatus: "Launched",
        version: "20",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        prodOfferPriceAction: [],
        tax: [
          {
            taxAmount: {
              value: 0,
              unit: "IRR",
            },
            taxCategory: "",
            taxRate: 9,
          },
        ],
        prodSpecCharValueUse: [],
        lastUpdate: "2020-08-05T12:51:09.777Z",
        code: "POP284",
        price: {
          unit: "IRR",
          value: 20,
        },
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f10496d0c85cf0009b5a170",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f185b1754a408000926c477",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f185b28a5fd110008c5af3f",
            "@type": "PolicyRule",
            name: "Subscription fee policy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f185b28a5fd110008c5af3f",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f2a4a13a5fd110008c5af73",
            "@type": "OverrideRule",
            name: "Subscription fee condition",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f2a4a13a5fd110008c5af73",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f2d1d86a5fd110008c5af95",
            "@type": "PolicyRule",
            name: "Subscription fee with discount (new)",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f2d1d86a5fd110008c5af95",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f324733a5fd110008c5afa1",
            "@type": "PolicyRule",
            name: "Subscription fee with discount A01",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f324733a5fd110008c5afa1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f324b93a5fd110008c5afa4",
            "@type": "PolicyRule",
            name: "Subscription fee with discount A04",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f324b93a5fd110008c5afa4",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        price: {
          unit: "IRR",
          value: 500,
        },
        validFor: {
          startDateTime: "2020-07-22T15:02:03.147Z",
          endDateTime: "2021-01-22T16:02:03.147Z",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Subscription fee",
        description: "Subscription fee",
        lifecycleStatus: "Launched",
        version: "15",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Recurring",
        recurringChargePeriodType: "Monthly",
        recurringChargePeriodLength: 4,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [
          {
            id: "5f324e3416c2a20009fd41df",
            action: "add",
          },
          {
            id: "5f324e3416c2a20009fd41e0",
            action: "modify",
          },
        ],
        tax: [],
        prodSpecCharValueUse: [],
        lastUpdate: "2020-08-11T07:52:20.457Z",
        code: "POP300",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f185b1754a408000926c477",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "Enterprise dedicated USSD",
    description: "Enterprise dedicated USSD",
    isBundle: false,
    isSellable: true,
    version: "21",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f0f0b6df6645e0008b45c87",
      businessType: ["Postpaid"],
      technology: ["USSD"],
      resourceSpecification: [],
      serviceSpecification: ["5f0f0cc255ca5e00062ad4f3"],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-09-13T00:00:00.000Z",
        endDateTime: "2020-10-12T20:30:00.000Z",
      },
      name: "Dedicated USSD",
      description: "Dedicated USSD Specification",
      isBundle: false,
      lifecycleStatus: "Launched",
      version: "77",
      "@type": "UsageVolumeProductSpec",
      "@baseType": "AtomicProductSpecification",
      LoB: "DigitalServices",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [
        {
          valueType: "number",
          name: "TPS",
          description: "Transaction per Second",
          configurable: true,
          "@type": "Number",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "^[0-9]{4}$",
          extensible: false,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "number",
              value: 0,
            },
          ],
        },
        {
          valueType: "string",
          name: "Shortcode",
          description: "Shortcode",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "^\\*[0-9]{3,4}#$",
          extensible: false,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "string",
            },
          ],
        },
        {
          name: "Length",
          description: "Short code Length",
          valueType: "string",
          configurable: true,
          "@type": "number",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "",
          extensible: false,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "number",
              value: 3,
            },
            {
              valueType: "number",
              value: 4,
            },
          ],
        },
      ],
      lastUpdate: "2020-09-23T10:16:30.650Z",
      code: "PS441",
      brand: "",
      productNumber: "1",
      targetProductSchema: {
        "@type": "DOM",
        href: {},
      },
      externalSystemCapability: {
        id: "5f6b2029659a1c0009ad8426",
        systemID: "37slz3muo",
        flow: "DOMPolicyFlows",
        name: "Provisioning",
        capabilityType: "FulfillmentCapabilitySpecification",
        version: "0.1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/external-system-capability/5f6b2029659a1c0009ad8426",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/external-system-capability",
      },
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f0f0b6df6645e0008b45c87",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-07-22T15:29:56.177Z",
    code: "PO136",
    validFor: {
      startDateTime: "2020-07-22T00:00:00.000Z",
      endDateTime: "2099-12-30T00:00:00.000Z",
    },
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f0f0e6df6645e0008b45c88",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
    prodSpecCharUse: [
      {
        name: "Shortcode",
        productSpecification: {
          id: "5f0f0b6df6645e0008b45c87",
        },
        publicIdentifier: true,
      },
    ],
  },
  {
    id: "5f1190a513678d0008068c54",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4bdbff528c2425c23289b5",
        name: "Individual Customer",
        code: "I",
        "@referredType": "Retail",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbbc18adf5f90f2af514",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Small businesses",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f1190a213678d0008068c51",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        name: "Elite Postpaid Rental",
        description:
          "This offer provides daily 300 mins voice, 20 sms & 1.5 GB data services for a month.",
        version: "3",
        lastUpdate: "2020-07-17T12:12:54.956Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-07-17T00:00:00.000Z",
          endDateTime: "2020-12-30T00:00:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "monthly",
        recurringChargePeriodLength: 1,
        percentage: 0,
        price: {
          value: 45,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 2.25,
              unit: "GHS",
            },
            taxCategory: "",
            taxRate: 5,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP292",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f1190a213678d0008068c51",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f1190a213678d0008068c52",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        name: "Elite Postpaid OneTimeCharge",
        description:
          "This offer provides daily 300 mins voice, 20 sms & 1.5 GB data services for a month.",
        version: "3",
        lastUpdate: "2020-07-17T12:12:55.350Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-07-17T00:00:00.000Z",
          endDateTime: "2020-12-30T00:00:00.000Z",
        },
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        price: {
          value: 50,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 2.5,
              unit: "GHS",
            },
            taxCategory: "",
            taxRate: 5,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "OneTimeChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP292",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f1190a213678d0008068c52",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "Elite Postpaid",
    description:
      "This offer provides daily 300 mins voice, 20 sms & 1.5 GB data services for a month.",
    isBundle: false,
    isSellable: true,
    version: "3",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-07-17T00:00:00.000Z",
      endDateTime: "2020-12-30T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-07-17T12:13:02.165Z",
    productSpecification: {
      id: "5f1190a213678d0008068c53",
      businessType: ["Postpaid"],
      technology: ["GSM"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f1190a213678d0008068c4c",
          name: "SIM Product",
          version: "6",
          "@type": "GoodsProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f1190a213678d0008068c4c",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f1190a213678d0008068c4d",
          name: "Plan 2 - Daily 1.5GB Data Product",
          version: "6",
          "@type": "AtomicProductSpecification",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f1190a213678d0008068c4d",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f1190a213678d0008068c4e",
          name: "MSISDN Product",
          version: "6",
          "@type": "AtomicProductSpecification",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f1190a213678d0008068c4e",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f1190a213678d0008068c4f",
          name: "Plan 1 - Daily 20 SMS Product",
          version: "6",
          "@type": "AtomicProductSpecification",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f1190a213678d0008068c4f",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f1190a213678d0008068c50",
          name: "Plan 2 - Daily 300 min Product",
          version: "6",
          "@type": "AtomicProductSpecification",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f1190a213678d0008068c50",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [
        {
          id: "5ce4ffc4a9060a9e09433953",
          href:
            "https://host:port/partyManagement/organization/5ce4ffc4a9060a9e09433953",
          name: "Home Network",
          version: "1.0",
        },
        {
          id: "5ce52690a9060a9e09436fa0",
          href:
            "https://host:port/partyManagement/organization/5ce52690a9060a9e09436fa0",
          name: "InterCon Network",
          version: "1.0",
        },
        {
          id: "5ce526a0a9060a9e09436fbe",
          href:
            "https://host:port/partyManagement/organization/5ce526a0a9060a9e09436fbe",
          name: "Roaming Network",
          version: "1.0",
        },
        {
          id: "5ce534bea9060a9e0943838c",
          href:
            "https://host:port/partyManagement/organization/5ce534bea9060a9e0943838c",
          name: "End customer",
          version: "1.0",
        },
      ],
      attachment: [],
      name: "Elite Postpaid",
      description:
        "This offer provides daily 300 mins voice, 20 sms & 1.5 GB data services for a month.",
      version: "3",
      brand: "Airtalk",
      LoB: "Mobile",
      isBundle: true,
      lastUpdate: "2020-07-17T12:13:02.159Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-07-17T00:00:00.000Z",
        endDateTime: "2020-12-30T00:00:00.000Z",
      },
      "@type": "CompositeProductSpecification",
      "@baseType": "AtomicProductSpecification",
      productSpecCharacteristic: [],
      targetProductSchema: {
        "@type": "DOM",
        href: {
          serviceSIMActivation:
            "/dcm/utility_service/target-system/5d03c1c8a9060a9e0973f191",
          serviceMSISDNActivation:
            "/dcm/utility_service/target-system/5d08c550a9060a9e097f8a8a",
          serviceActivation:
            "/dcm/utility_service/target-system/5d5a3e0355ff76000968ff9c",
        },
      },
      productSpecificationRelationship: [],
      code: "PS505",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f1190a213678d0008068c53",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    code: "PO153",
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f1190a513678d0008068c54",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f23ed11ad15b845982cb023",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38894783ba2e1cba2de8c4",
        href: "https://host:port/catalogManagement/channel/4",
        name: "Kiosk",
        "@referredType": "Kiosk",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f23ed10ad15b845982cb021",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:14",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        name: "MTN Iran Cloud IaaS/VPS",
        description:
          "Infrastructure as a Service, or IaaS, and virtual private server (VPS) services",
        version: "14",
        lastUpdate: "2020-09-24T06:16:43.752Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 25,
        tax: [],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "OneTimeChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP350",
        price: {
          value: 111,
          unit: "GHS",
        },
        unitOfMeasure: "Currency",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f23ed10ad15b845982cb021",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f6c3713659a1c0009ad8443",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Advance Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "e5b1f20f-9a23-4cd7-8dbb-ed93c84a4022",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:35",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 113,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Recurring price",
        lifecycleStatus: "Launched",
        version: "3",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Recurring",
        recurringChargePeriodType: "Monthly",
        recurringChargePeriodLength: 12,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-24T06:16:43.854Z",
        code: "POP688",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f6c3713659a1c0009ad8443",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "MTN Iran Cloud IaaS/VPS.",
    description:
      "Infrastructure as a Service, or IaaS, and virtual private server (VPS) services",
    isBundle: false,
    isSellable: true,
    version: "20",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-09-01T00:00:00.000Z",
      endDateTime: "2020-12-31T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-09-24T06:16:43.944Z",
    productSpecification: {
      id: "5f23ed11ad15b845982cb022",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: ["5f23d3214c4a140008d4b43d"],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      name: "MTN Iran Cloud IaaS/VPS Product",
      description:
        "Infrastructure as a Service, or IaaS, and virtual private server (VPS) services",
      version: "21",
      brand: "MTN",
      LoB: "DigitalServices",
      isBundle: false,
      lastUpdate: "2020-09-24T06:16:43.749Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-09-01T00:00:00.000Z",
        endDateTime: "2020-12-31T00:00:00.000Z",
      },
      "@type": "NetworkProductSpec",
      "@baseType": "AtomicProductSpecification",
      productSpecCharacteristic: [
        {
          name: "CPU",
          description: "central processing unit",
          valueType: "",
          configurable: true,
          "@type": "ProductSpecCharacteristic",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          extensible: true,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "",
              value: "4.2",
              isDefault: true,
              unitOfMeasure: "GHz",
            },
          ],
        },
        {
          name: "RAM",
          description: "Random-access memory",
          valueType: "",
          configurable: true,
          "@type": "ProductSpecCharacteristic",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          extensible: true,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "",
              value: "32",
              isDefault: true,
              unitOfMeasure: "GB",
            },
          ],
        },
        {
          name: "Disk",
          description: "Disk space",
          valueType: "",
          configurable: true,
          "@type": "ProductSpecCharacteristic",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          extensible: true,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "",
              value: "50",
              isDefault: true,
              unitOfMeasure: "PB",
            },
          ],
        },
        {
          name: "Bandwidth",
          description: "Bandwidth speed",
          valueType: "",
          configurable: true,
          "@type": "ProductSpecCharacteristic",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          extensible: true,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "string",
              value: "5",
              isDefault: false,
              unitOfMeasure: "GB",
            },
          ],
        },
        {
          name: "Zone",
          description: "City Areas",
          valueType: "",
          configurable: true,
          "@type": "ProductSpecCharacteristic",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          extensible: true,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "string",
              value: "",
              isDefault: false,
              unitOfMeasure: "",
            },
          ],
        },
      ],
      targetProductSchema: {
        "@type": "DOM",
      },
      productSpecificationRelationship: [],
      code: "PS558",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f23ed11ad15b845982cb022",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    prodSpecCharValueUse: [],
    code: "PO181b",
    externalSystem: [
      {
        id: "9fdc23a6-6768-4d4a-b500-a1c816dbab56",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f23ed11ad15b845982cb023",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f23f2f9ad15b845982cb028",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38894783ba2e1cba2de8c4",
        href: "https://host:port/catalogManagement/channel/4",
        name: "Kiosk",
        "@referredType": "Kiosk",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5d3887e883ba2e1cba2de4e6",
        name: "12 months contract",
        description: "12 months contract",
        duration: {
          amount: 12,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f23f2f8ad15b845982cb025",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [
          {
            name: "Monthly Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "3c6de6de-9f41-490d-961b-0d8fb5f81476",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:01",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        name: "MTN Iran Cloud Storage Rental",
        description: "Cloud Storage space",
        version: "12",
        lastUpdate: "2020-09-24T06:27:09.638Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "monthly",
        recurringChargePeriodLength: 3,
        percentage: 0,
        price: {
          value: 200000,
          unit: "IRR",
        },
        tax: [
          {
            taxAmount: {
              value: 18000,
              unit: "IRR",
            },
            taxCategory: "VAT",
            taxRate: 9,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP352",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f23f2f8ad15b845982cb025",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f23f2f8ad15b845982cb026",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [
          {
            name: "Installment OneTimeCharge",
            chargeClass: "OneTime",
            taxPlanId: "aa915db2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            taxPlanName: "9 Percent Tax",
            id: "aab95db2-7b1f-4456-a9b7-e6f78b0e4d8a",
            glCode: "401",
            time: "2020-09-21T10:45:57",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        name: "MTN Iran Cloud Storage OneTimeDiscount",
        description: "Cloud Storage space",
        version: "13",
        lastUpdate: "2020-09-24T06:27:09.734Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 25,
        tax: [],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "OneTimeChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP352",
        price: {
          value: 113,
          unit: "GHS",
        },
        unitOfMeasure: "Currency",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f23f2f8ad15b845982cb026",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "MTN Iran Cloud Storage.",
    description: "Cloud Storage space",
    isBundle: false,
    isSellable: true,
    version: "13",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-09-01T00:00:00.000Z",
      endDateTime: "2020-12-31T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-09-24T06:27:09.933Z",
    productSpecification: {
      id: "5f23f2f9ad15b845982cb027",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: ["5f23f16a4c4a140008d4b43f"],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      name: "MTN Iran Cloud Storage Product",
      description: "Cloud Storage space",
      version: "16",
      brand: "MTN",
      LoB: "DigitalServices",
      isBundle: false,
      lastUpdate: "2020-09-24T06:27:09.535Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-09-01T00:00:00.000Z",
        endDateTime: "2020-12-31T00:00:00.000Z",
      },
      "@type": "NetworkProductSpec",
      "@baseType": "AtomicProductSpecification",
      productSpecCharacteristic: [
        {
          name: "Disk Space",
          description: "Disk space for storage",
          valueType: "",
          configurable: true,
          "@type": "ProductSpecCharacteristic",
          minCardinality: 0,
          maxCardinality: 5,
          isUnique: true,
          extensible: true,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "",
              value: "50",
              isDefault: true,
              unitOfMeasure: "PB",
            },
          ],
        },
        {
          name: "Number of User Accounts",
          description: "Number of users accounts allowed to share the storage",
          valueType: "",
          configurable: true,
          "@type": "ProductSpecCharacteristic",
          minCardinality: 0,
          maxCardinality: 5,
          isUnique: true,
          extensible: true,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "string",
              value: "50",
              isDefault: false,
              unitOfMeasure: "Users",
            },
          ],
        },
      ],
      targetProductSchema: {
        "@type": "DOM",
      },
      productSpecificationRelationship: [],
      code: "PS560",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f23f2f9ad15b845982cb027",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    prodSpecCharValueUse: [],
    code: "PO183",
    externalSystem: [
      {
        id: "62b650a3-5769-4b12-818f-e57e59f5f49c",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f23f2f9ad15b845982cb028",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f240d4fad15b845982cb032",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5ce675b0a9060a9e0944add1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce675b0a9060a9e0944add1",
        lastUpdate: "2020-10-11T11:00:38.254Z",
        parentId: "1",
        isRoot: true,
        name: "SMS",
        description: "A category for mobile SMSs",
        lifecycleStatus: "Active",
        version: "1",
        "@type": "Category",
        productOffering: [],
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5cf0bd3ea9060a9e095011fa",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5cf0bd3ea9060a9e095011fa",
        lastUpdate: "2020-10-11T11:00:38.590Z",
        parentId: "5ce675b0a9060a9e0944add1",
        isRoot: true,
        name: "Local SMS",
        description: "A category for mobile local SMSs",
        lifecycleStatus: "Active",
        version: "1",
        "@type": "Category",
        productOffering: [],
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38894783ba2e1cba2de8c4",
        href: "https://host:port/catalogManagement/channel/4",
        name: "Kiosk",
        "@referredType": "Kiosk",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5d3887e883ba2e1cba2de4e6",
        name: "12 months contract",
        description: "12 months contract",
        duration: {
          amount: 12,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
      },
      {
        id: "5d3887f883ba2e1cba2de512",
        name: "24 months contract",
        description: "24 months contract",
        duration: {
          amount: 24,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f240d4fad15b845982cb02f",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7d7513a3029700065482da",
            "@type": "OverrideRule",
            name: "Overridepolicybulksms",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7d7513a3029700065482da",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Installment OneTimeCharge",
            chargeClass: "OneTime",
            taxPlanId: "aa915db2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            taxPlanName: "9 Percent Tax",
            id: "aab95db2-7b1f-4456-a9b7-e6f78b0e4d8a",
            glCode: "401",
            time: "2020-09-21T10:45:57",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        name: "MTNG AT Bulk Providers SMS OneTimeCharge",
        description: "Dissemination of large numbers of SMS",
        version: "15",
        lastUpdate: "2020-10-09T08:58:19.943Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        price: {
          value: 1200,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 108,
              unit: "GHS",
            },
            taxCategory: "VAT",
            taxRate: 9,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "OneTimeChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP354",
        unitOfMeasure: "Currency",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f240d4fad15b845982cb02f",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f240d4fad15b845982cb030",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7d765ea3029700065482db",
            name: "MTNG USSD Short Code Based Price",
            "@type": "PolicyRule",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7d765ea3029700065482db",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Monthly Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "3c6de6de-9f41-490d-961b-0d8fb5f81476",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:01",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        name: "MTNG AT Bulk SMS Rental Charges",
        description: "Dissemination of large numbers of SMS",
        version: "19",
        lastUpdate: "2020-10-09T08:58:34.852Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 5,
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 75,
              unit: "GHS",
            },
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP354",
        price: {
          value: 1500,
          unit: "GHS",
        },
        unitOfMeasure: "Currency",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f240d4fad15b845982cb030",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "MTNG AT Bulk SMS",
    description: "Dissemination of large numbers of SMS",
    isBundle: false,
    isSellable: true,
    version: "15",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-09-01T00:00:00.000Z",
      endDateTime: "2020-12-31T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-10-09T08:33:51.244Z",
    productSpecification: {
      id: "5f240d4fad15b845982cb031",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f7d55fcbac0ae00071bad38",
          name: "Bulk SMS Spec",
          version: "42",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7d55fcbac0ae00071bad38",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7d578bbac0ae00071bad39",
          name: "Manual Provisioning",
          version: "5",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7d578bbac0ae00071bad39",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7d578bbac0ae00071bad3a",
          name: "Customer UAT Acceptance",
          version: "5",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7d578bbac0ae00071bad3a",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [
        {
          id: "5ce4ffc4a9060a9e09433953",
          href:
            "https://host:port/partyManagement/organization/5ce4ffc4a9060a9e09433953",
          name: "Home Network",
          version: "1.0",
        },
        {
          id: "5ce526a0a9060a9e09436fbe",
          href:
            "https://host:port/partyManagement/organization/5ce526a0a9060a9e09436fbe",
          name: "Roaming Network",
          version: "1.0",
        },
        {
          id: "5ce52690a9060a9e09436fa0",
          href:
            "https://host:port/partyManagement/organization/5ce52690a9060a9e09436fa0",
          name: "InterCon Network",
          version: "1.0",
        },
        {
          id: "5d0b7f13a9060a9e09863c0b",
          href:
            "https://host:port/partyManagement/organization/5d0b7f13a9060a9e09863c0b",
          name: "Home Control",
          version: "1.0",
        },
      ],
      attachment: [],
      name: "MTNG AT Bulk Providers SMS",
      description: "Dissemination of large numbers of SMS",
      version: "22",
      brand: "MTN",
      LoB: "DigitalServices",
      isBundle: true,
      lastUpdate: "2020-10-09T08:57:44.541Z",
      lifecycleStatus: "Initial",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-09-01T00:00:00.000Z",
        endDateTime: "2020-12-31T00:00:00.000Z",
      },
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      productSpecCharacteristic: [],
      targetProductSchema: {
        "@type": "DOM",
      },
      productSpecificationRelationship: [],
      code: "PS562",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f240d4fad15b845982cb031",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    prodSpecCharValueUse: [],
    code: "PO185",
    externalSystem: [
      {
        id: "a8c7e5f7-096c-4711-aa85-2325755a3aaf",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f240d4fad15b845982cb032",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f26f4422215e100092e2e21",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4bdbff528c2425c23289b5",
        name: "Individual Customer",
        code: "I",
        "@referredType": "Retail",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f26f4402215e100092e2e1e",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        name: "USSD Corp OneTimeCharge",
        description: "USSD plan for enterprise.",
        version: "3",
        lastUpdate: "2020-08-02T17:14:05.711Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-08-02T00:00:00.000Z",
          endDateTime: "2021-08-03T00:00:00.000Z",
        },
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        price: {
          value: 250,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 12.5,
              unit: "GHS",
            },
            taxCategory: "",
            taxRate: 5,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "OneTimeChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP355",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f26f4402215e100092e2e1e",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f26f4402215e100092e2e1f",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f296656a5fd110008c5af70",
            name: "Pricing Policy Based on TPS",
            "@type": "PolicyRule",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f296656a5fd110008c5af70",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f682f1d5fca5d00064a7138",
            "@type": "OverrideRule",
            name: "Override Pricing Policy Based on TPS",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f682f1d5fca5d00064a7138",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        name: "USSD Corp Rental",
        description: "USSD plan for enterprise.",
        version: "5",
        lastUpdate: "2020-09-21T04:43:29.791Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-08-02T00:00:00.000Z",
          endDateTime: "2021-08-03T00:00:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "monthly",
        recurringChargePeriodLength: 1,
        percentage: 0,
        price: {
          value: 250,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 12.5,
              unit: "GHS",
            },
            taxCategory: "",
            taxRate: 5,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP356",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f26f4402215e100092e2e1f",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "USSD Corp",
    description: "USSD plan for enterprise.",
    isBundle: false,
    isSellable: true,
    version: "4",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-08-02T00:00:00.000Z",
      endDateTime: "2021-08-03T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-08-02T17:38:34.138Z",
    productSpecification: {
      id: "5f26fa112215e100092e2e22",
      businessType: ["Postpaid"],
      technology: ["USSD"],
      resourceSpecification: [],
      serviceSpecification: ["5f71e6eb232c1b0009c65ca2"],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-08-02T17:16:27.924Z",
        endDateTime: "2021-02-02T17:16:27.924Z",
      },
      name: "USSD Corp Spec",
      description: "USSD Corp Spec",
      isBundle: false,
      lifecycleStatus: "Launched",
      version: "12",
      "@type": "ServiceLevelProductSpec",
      "@baseType": "AtomicProductSpecification",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [
        {
          name: "Short Code",
          description: "Short Code for USSD service",
          valueType: "numeric",
          configurable: true,
          "@type": "numeric",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          regex: "^[0-9]{5}$",
          extensible: true,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "string",
              "@type": "numeric",
              isDefault: false,
            },
          ],
        },
        {
          name: "TPS",
          description: "Select TPS",
          valueType: "numeric",
          configurable: true,
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "",
          extensible: true,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "number",
              value: 500,
              isDefault: true,
              unitOfMeasure: "TPS",
            },
            {
              valueType: "number",
              value: 1000,
              unitOfMeasure: "TPS",
            },
            {
              valueType: "number",
              value: 1500,
              unitOfMeasure: "TPS",
            },
            {
              valueType: "number",
              value: 2000,
              unitOfMeasure: "TPS",
            },
          ],
        },
      ],
      lastUpdate: "2020-09-28T13:36:44.866Z",
      code: "PS564",
      LoB: "DigitalServices",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f26fa112215e100092e2e22",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    code: "PO186",
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f26f4422215e100092e2e21",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
    prodSpecCharUse: [
      {
        name: "Short Code",
        productSpecification: {
          id: "5f26fa112215e100092e2e22",
        },
        publicIdentifier: true,
      },
    ],
  },
  {
    id: "5f27df4267c7987ae879fcec",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5ce6758aa9060a9e0944ad93",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce6758aa9060a9e0944ad93",
        lastUpdate: "2020-10-11T11:00:37.902Z",
        parentId: "",
        isRoot: true,
        name: "SIM",
        description: "A category for mobile SIMs",
        lifecycleStatus: "Active",
        version: "1",
        "@type": "Category",
        productOffering: [],
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38894783ba2e1cba2de8c4",
        href: "https://host:port/catalogManagement/channel/4",
        name: "Kiosk",
        "@referredType": "Kiosk",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5d3887e883ba2e1cba2de4e6",
        name: "12 months contract",
        description: "12 months contract",
        duration: {
          amount: 12,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
      },
      {
        id: "5d3887f883ba2e1cba2de512",
        name: "24 months contract",
        description: "24 months contract",
        duration: {
          amount: 24,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f27df4167c7987ae879fcea",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [],
        name: "MTN Iran SIM Card OneTimeDiscount",
        description: "SIM Card",
        version: "11",
        lastUpdate: "2020-08-03T12:19:11.171Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "OneTimeDiscount",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 50,
        tax: [],
        "@baseType": "ProdOfferPriceChargeAlteration",
        "@type": "DiscountProdOfferPriceChargeAlteration",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP368",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f27df4167c7987ae879fcea",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f27df4167c7987ae879fce9",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "3e65ca6b-0f31-4568-a81b-32054af22cb1",
            glCode: "842988",
            time: "2020-07-16T06:03:45",
            value: "Connection Charges",
            label: "Connection Charges",
            chargeType: "OneTimeUpfront",
            numberOfInstallments: "",
            periodicityExceptions: [],
          },
        ],
        name: "MTN Iran SIM Card OneTimeCharge",
        description: "SIM Card",
        version: "11",
        lastUpdate: "2020-08-03T12:19:10.775Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        price: {
          value: 200000,
          unit: "IRR",
        },
        tax: [
          {
            taxAmount: {
              value: 18000,
              unit: "IRR",
            },
            taxCategory: "",
            taxRate: 9,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "OneTimeChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP368",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f27df4167c7987ae879fce9",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "MTN Iran SIM Card",
    description: "SIM Card",
    isBundle: false,
    isSellable: true,
    version: "6",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-09-01T00:00:00.000Z",
      endDateTime: "2020-12-31T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-08-03T12:19:11.349Z",
    productSpecification: {
      id: "5f27df4167c7987ae879fceb",
      businessType: ["Postpaid"],
      technology: ["GSM"],
      resourceSpecification: ["5f27c4e6af71dc00062146a7"],
      serviceSpecification: [],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      name: "MTN Iran SIM-Card Product",
      description: "SIM Card",
      version: "6",
      brand: "MTN",
      LoB: "Mobile",
      isBundle: false,
      lastUpdate: "2020-08-03T12:18:55.300Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-09-01T00:00:00.000Z",
        endDateTime: "2020-12-31T00:00:00.000Z",
      },
      "@type": "GoodsProductSpec",
      "@baseType": "AtomicProductSpecification",
      productSpecCharacteristic: [],
      targetProductSchema: {
        "@type": "DOM",
        href: {
          serviceSIMActivation:
            "http://dcm-develop.cluster1.devtestlab2.tecnotree.com/dcm/utility_service/target-system/5d03c1c8a9060a9e0973f191",
        },
      },
      productSpecificationRelationship: [],
      code: "PS572",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f27df4167c7987ae879fceb",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    prodSpecCharValueUse: [],
    code: "PO191",
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f27df4267c7987ae879fcec",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f27ecf92215e100092e2e6e",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [
      {
        id: "5f33c43c7b7b760009a59f90",
        "@baseType": "Agreement",
        name: "Contract",
        version: "0.1",
        engagedPartyRole: [],
        characteristic: [
          {
            id: "5f3facbcfeb1bc00081cc437",
            name: "Length in years",
            value: "2",
          },
        ],
        associatedAgreement: [],
        agreementItem: [],
        agreementAuthorization: [],
        type: "Commercial",
        agreementPeriod: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5f33c43c7b7b760009a59f90",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
      },
    ],
    marketSegment: [
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5f5b45ec11c93c00087f0e28",
        duration: {
          units: "months",
          amount: 12,
        },
        name: "12 Months Contract",
        description: "12 Months Contract",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f5b45ec11c93c00087f0e28",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
      {
        id: "5f5b45fe11c93c00087f0e29",
        duration: {
          units: "months",
          amount: 24,
        },
        name: "24 Months Term",
        description: "24 Months Term",
        "@type": "ProductOfferingTerm",
        validFor: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f5b45fe11c93c00087f0e29",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
    ],
    productOfferingPrice: [],
    bundledProductOffering: [],
    relatedParty: [],
    name: "Enterprise Co-Location Service",
    description: "DCM-538.",
    isBundle: false,
    isSellable: true,
    version: "30",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f27ecf72215e100092e2e6d",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f7cdac0bac0ae00071bad34",
          name: "MTNG Co-Location Rack/Unit Space",
          version: "17",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7cdac0bac0ae00071bad34",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7cdb1cbac0ae00071bad35",
          name: "MTNG Co-Location Storage Space",
          version: "15",
          "@type": "NetworkProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7cdb1cbac0ae00071bad35",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7cdb43bac0ae00071bad36",
          name: "MTNG Co-Location Processing Capacity",
          version: "14",
          "@type": "NetworkProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7cdb43bac0ae00071bad36",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7cdb64bac0ae00071bad37",
          name: "MTNG Co-Location Internet Connectivity",
          version: "15",
          "@type": "NetworkProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7cdb64bac0ae00071bad37",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7db4dc2427a10008beed6e",
          name: "Manual Provisioning",
          version: "3",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7db4dc2427a10008beed6e",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7db5022427a10008beed6f",
          name: "Customer UAT Acceptance",
          version: "4",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7db5022427a10008beed6f",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-08-05T00:00:00.000Z",
        endDateTime: "2020-12-31T00:00:00.000Z",
      },
      name: "Enterprice Co-Location",
      description: "DCM-538",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "94",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [],
      lastUpdate: "2020-10-07T12:31:01.827Z",
      code: "PS585",
      LoB: "DigitalServices",
      brand: "",
      productNumber: "1",
      targetProductSchema: {
        "@type": "DOM",
        href: {},
      },
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f27ecf72215e100092e2e6d",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-09-28T11:50:49.568Z",
    code: "PO204",
    validFor: {
      startDateTime: "2020-08-05T00:00:00.000Z",
      endDateTime: "2020-12-31T00:00:00.000Z",
    },
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f27ecf92215e100092e2e6e",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f27f0a667c7987ae879fd15",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid", "Prepaid", "Hybrid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38894783ba2e1cba2de8c4",
        href: "https://host:port/catalogManagement/channel/4",
        name: "Kiosk",
        "@referredType": "Kiosk",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5d3887e883ba2e1cba2de4e6",
        name: "12 months contract",
        description: "12 months contract",
        duration: {
          amount: 12,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
      },
      {
        id: "5d3887f883ba2e1cba2de512",
        name: "24 months contract",
        description: "24 months contract",
        duration: {
          amount: 24,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f27f0a667c7987ae879fd11",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "3e65ca6b-0f31-4568-a81b-32054af22cb1",
            glCode: "842988",
            time: "2020-07-16T06:03:45",
            value: "Connection Charges",
            label: "Connection Charges",
            chargeType: "OneTimeUpfront",
            numberOfInstallments: "",
            periodicityExceptions: [],
          },
        ],
        name: "MTN Iran Fleet Management - SW Fee",
        description: "Fleet Management",
        version: "10",
        lastUpdate: "2020-08-03T12:19:05.737Z",
        isBundle: false,
        isServiceActionPrice: true,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "Fee",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        price: {
          value: 900000000,
          unit: "IRR",
        },
        tax: [
          {
            taxAmount: {
              value: 81000000,
              unit: "IRR",
            },
            taxCategory: "",
            taxRate: 9,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "OneTimeChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP382",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f27f0a667c7987ae879fd11",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f27f0a667c7987ae879fd12",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [
          {
            name: "Monthly Charges Rental",
            chargeClass: "Recurring",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "f82ea115-9ad1-4934-bf39-05edd641e99f",
            glCode: "842988",
            time: "2020-07-16T06:01:23",
            value: "Monthly Charges Rental",
            label: "Monthly Charges Rental",
            chargeType: "RecurringInArrearsFixed",
            numberOfInstallments: "",
            periodicityExceptions: [],
          },
        ],
        name: "MTN Iran Fleet Management - SW Rental",
        description: "Fleet Management",
        version: "9",
        lastUpdate: "2020-08-03T12:19:11.362Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "monthly",
        recurringChargePeriodLength: 12,
        percentage: 0,
        price: {
          value: 16666666,
          unit: "IRR",
        },
        tax: [
          {
            taxAmount: {
              value: 1499999.94,
              unit: "IRR",
            },
            taxCategory: "",
            taxRate: 9,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP382",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f27f0a667c7987ae879fd12",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f27f0a667c7987ae879fd13",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [],
        name: "MTN Iran Fleet Management - SW OneTimeDiscount",
        description: "Fleet Management",
        version: "10",
        lastUpdate: "2020-08-03T12:19:02.475Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "OneTimeDiscount",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 30,
        tax: [],
        "@baseType": "ProdOfferPriceChargeAlteration",
        "@type": "DiscountProdOfferPriceChargeAlteration",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP382",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f27f0a667c7987ae879fd13",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "MTN Iran Fleet Management - SW",
    description: "Fleet Management",
    isBundle: false,
    isSellable: true,
    version: "6",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-09-01T00:00:00.000Z",
      endDateTime: "2020-12-31T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-08-03T12:19:11.645Z",
    productSpecification: {
      id: "5f27f0a667c7987ae879fd14",
      businessType: ["Postpaid", "Prepaid", "Hybrid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: ["5f27ee164c4a140008d4b460"],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      name: "MTN Iran Fleet Management - SW Product",
      description: "Fleet Management - Software",
      version: "6",
      brand: "MTN",
      LoB: "DigitalServices",
      isBundle: false,
      lastUpdate: "2020-08-03T12:18:55.318Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-09-01T00:00:00.000Z",
        endDateTime: "2020-12-31T00:00:00.000Z",
      },
      "@type": "AtomicProductSpecification",
      "@baseType": "AtomicProductSpecification",
      productSpecCharacteristic: [],
      targetProductSchema: {
        "@type": "DOM",
      },
      productSpecificationRelationship: [],
      code: "PS588",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f27f0a667c7987ae879fd14",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    prodSpecCharValueUse: [],
    code: "PO207",
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f27f0a667c7987ae879fd15",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f27f2812215e100092e2e7b",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f2abfed73e2a50009053a68",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5ef495bcea7c87000aa960c5",
            "@type": "PolicyRule",
            name: "RentalPolicy01",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5ef495bcea7c87000aa960c5",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f2ac7c3a5fd110008c5af8c",
            "@type": "OverrideRule",
            name: "Override",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f2ac7c3a5fd110008c5af8c",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        price: {
          value: 100,
          unit: "KWD",
        },
        validFor: {
          startDateTime: "2020-08-05T14:14:19.199Z",
          endDateTime: "2021-02-05T14:14:19.199Z",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Monthly Rental",
        description: "Monthly Rental",
        lifecycleStatus: "Launched",
        version: "10",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Rental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        priceCondition: "12",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        lastUpdate: "2020-09-10T05:20:52.067Z",
        code: "POP436",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f2abfed73e2a50009053a68",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f59b41a89726b0007707c7d",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "DeviceServiceCharge",
            chargeClass: "OneTime",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "9245466f-a8fd-4b66-9437-7b40e1ae9268",
            glCode: "842988",
            time: "2020-08-25T07:31:43",
          },
        ],
        price: {
          value: 49,
          unit: "KWD",
        },
        validFor: {
          startDateTime: "2020-09-10T04:33:51.212Z",
          endDateTime: "2021-03-10T04:33:51.212Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "One Time Charge",
        lifecycleStatus: "Launched",
        version: "3",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 0,
            taxAmount: {
              value: 0,
              unit: "KWD",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-10T05:20:25.497Z",
        code: "POP627",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f59b41a89726b0007707c7d",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "STC ISDN Corporate",
    description: "STC ISDN Corporate connection",
    isBundle: false,
    isSellable: true,
    version: "14",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5ef2eac312b18e00069424b6",
      businessType: ["Postpaid"],
      technology: ["LeasedLine"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f2bc95073e2a50009053a99",
          name: "Cable Type Product",
          version: "8",
          "@type": "GoodsProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2bc95073e2a50009053a99",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f2bc95073e2a50009053a9a",
          name: "Leased Line Modem Product",
          version: "8",
          "@type": "GoodsProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2bc95073e2a50009053a9a",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f2bc95073e2a50009053a9b",
          name: "Speed Product",
          version: "9",
          "@type": "GoodsProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2bc95073e2a50009053a9b",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f48a25ba5fa520009214cc8",
          name: "Installation",
          version: "3",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f48a25ba5fa520009214cc8",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [
        {
          id: "5ce4ffc4a9060a9e09433953",
          href:
            "https://host:port/partyManagement/organization/5ce4ffc4a9060a9e09433953",
          name: "Home Network",
          version: "1.0",
        },
        {
          id: "5ce534bea9060a9e0943838c",
          href:
            "https://host:port/partyManagement/organization/5ce534bea9060a9e0943838c",
          name: "End customer",
          version: "1.0",
        },
      ],
      attachment: [],
      name: "STC ISDN Corporate",
      description: "STC ISDN Corporate connection",
      version: "48",
      brand: "Ultranet",
      LoB: "Broadband",
      isBundle: true,
      lastUpdate: "2020-09-10T05:05:32.357Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-08-06T00:00:00.000Z",
        endDateTime: "2020-12-05T00:00:00.000Z",
      },
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      productSpecCharacteristic: [],
      targetProductSchema: {
        "@type": "DOM",
        href: {},
      },
      productSpecificationRelationship: [],
      code: "PS318",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5ef2eac312b18e00069424b6",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-09-10T05:05:33.172Z",
    code: "PO210",
    validFor: {
      startDateTime: "2020-08-05T19:17:42.281Z",
      endDateTime: "2021-02-05T19:17:42.281Z",
    },
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f27f2812215e100092e2e7b",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f29593ec91d390009a4571d",
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "modify", "delete"],
          id: "5f7f6f13a737b3000661b2eb",
          name: "CRM",
        },
      ],
    },
    businessType: ["Postpaid"],
    place: [
      {
        id: "5f5228e0394b7ed88163285a",
        name: "Accra",
        address: [
          {
            id: "5f5229d1394b7ed881632ca5",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/address-service/v1/address/5f5229d1394b7ed881632ca5",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/address-service/schema/v1/address",
          },
        ],
        lastUpdate: "2020-08-25T13:37:15.321Z",
        version: 1,
        geographicSite: [],
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/place/5f5228e0394b7ed88163285a",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/place",
      },
    ],
    category: [
      {
        id: "5cfa5245a9060a9e0960beb9",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5cfa5245a9060a9e0960beb9",
        lastUpdate: "2020-10-11T11:00:42.124Z",
        parentId: "",
        isRoot: true,
        name: "Broadband",
        description: "A category for broadband",
        lifecycleStatus: "Active",
        version: "1",
        "@type": "Category",
        productOffering: [],
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [
      {
        id: "5f287a417b7b760009a59f7e",
        "@baseType": "Agreement",
        name: "MPLS Agreement",
        description:
          "The contract period for which customer is bound to use the service.\nContract period need to hold the value in Years. Ex. 12, 24\n Minimum contract period for such service will be 1 Year.\nAfter contract period ends subscriber can continue or terminate the service at any time without any penalty fee.\nNotification and Reports need to be enabled for KAM, providing the list of Corporates whose contracts is about to expire.",
        version: "0.1",
        type: "Commercial",
        engagedPartyRole: [],
        characteristic: [
          {
            id: "5f3bdbd3feb1bc00081cc42d",
            name: "Platinum",
            value: "24x7",
          },
          {
            id: "5f3bdbd3feb1bc00081cc42e",
            name: "Gold",
            value: "8x5",
          },
          {
            id: "5f3bdbd3feb1bc00081cc42f",
            name: "Silver",
            value: "On Demand",
          },
        ],
        associatedAgreement: [],
        agreementItem: [],
        agreementAuthorization: [],
        agreementPeriod: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5f287a417b7b760009a59f7e",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
      },
    ],
    marketSegment: [
      {
        id: "5d4be38a528c2425c2329e60",
        name: "FOREIGN ORGANIZATION",
        code: "FORO",
        "@referredType": "Retail",
        default: "N",
        isRoot: false,
        parentId: "5d4be317528c2425c2329cba",
      },
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbbc18adf5f90f2af514",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Small businesses",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5f3bd64603a2f600091e67af",
        duration: {
          units: "months",
          amount: 12,
        },
        validFor: {
          startDateTime: "2020-08-18T13:22:49.259Z",
          endDateTime: "2021-02-18T14:22:49.259Z",
        },
        name: "Global MPLS Terms",
        description: "Global MPLS Terms",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f3bd64603a2f600091e67af",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
      {
        id: "5f44b498c53b370009b9b9d3",
        duration: {
          units: "months",
          amount: 24,
        },
        validFor: {
          startDateTime: "2020-08-25T06:44:42.463Z",
          endDateTime: "2021-02-25T07:44:42.463Z",
        },
        name: "24 - Term",
        description: "24 Months",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f44b498c53b370009b9b9d3",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f29593bc91d390009a4571a",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f32810aa5fd110008c5afa6",
            "@type": "PolicyRule",
            name: "GlobalMPLSConnectionPricePolicy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f32810aa5fd110008c5afa6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        name: "MTN Ghana Global MPLS Connection Rental",
        description: "MTN Ghana Global MPLS Connection",
        version: "41",
        lastUpdate: "2020-10-08T19:57:07.041Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2025-08-01T00:00:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "monthly",
        recurringChargePeriodLength: 24,
        percentage: 0,
        price: {
          value: 500,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 125,
              unit: "GHS",
            },
            taxCategory: "VAT",
            taxRate: 25,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP411",
        charges: [
          {
            name: "Advance Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "e5b1f20f-9a23-4cd7-8dbb-ed93c84a4022",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:35",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        unitOfMeasure: "Currency",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f29593bc91d390009a4571a",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f3be22303a2f600091e67b2",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f30dc10a5fd110008c5af9b",
            "@type": "PolicyRule",
            name: "Contract Terminate Penalty",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f30dc10a5fd110008c5af9b",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:14",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        validFor: {
          startDateTime: "2020-08-18T14:12:04.476Z",
          endDateTime: "2021-02-18T15:12:04.476Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Penalty",
        description: "Penalty",
        lifecycleStatus: "Launched",
        version: "29",
        isBundle: false,
        isServiceActionPrice: true,
        priceType: "Penalty",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        prodOfferPriceAction: [
          {
            id: "5f699a560454730009cbdb19",
            action: "delete",
          },
          {
            id: "5f699a560454730009cbdb1a",
            action: "modify",
          },
        ],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-08T19:57:07.126Z",
        code: "POP482",
        price: {
          value: 100,
          unit: "GHS",
        },
        unitOfMeasure: "Currency",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f3be22303a2f600091e67b2",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f7ca0cabac0ae00071bacf7",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7ca0ed0c9e6d000a171960",
            "@type": "OverrideRule",
            name: "Overridempls",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7ca0ed0c9e6d000a171960",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:14",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 460,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-10-06T16:51:28.193Z",
          endDateTime: "2021-07-31T16:51:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Subscription Fee",
        lifecycleStatus: "Launched",
        version: "7",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 23,
              unit: "GHS",
            },
          },
        ],
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-08T19:57:07.045Z",
        code: "POP715",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7ca0cabac0ae00071bacf7",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "MTNG AT Link Global MPLS",
    description: "MTN Ghana Global MPLS Connection",
    isBundle: false,
    isSellable: true,
    version: "52",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-09-01T00:00:00.000Z",
      endDateTime: "2025-08-01T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-10-08T19:57:07.348Z",
    productSpecification: {
      id: "5f29593bc91d390009a4571c",
      businessType: ["Postpaid"],
      technology: ["GlobalMPLS"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f2a566bc91d390009a45721",
          name: "MTN Ghana Global MPLS Router Product",
          version: "34",
          "@type": "GoodsProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2a566bc91d390009a45721",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f2a566bc91d390009a45722",
          name: "MTN gh",
          version: "63",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2a566bc91d390009a45722",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f69c391659a1c0009ad83b2",
          name: "Site Address",
          version: "65",
          "@type": "SiteProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f69c391659a1c0009ad83b2",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f5b2a1b11c93c00087f0e1f",
          name: "Manual Provisioning",
          version: "132",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f5b2a1b11c93c00087f0e1f",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f607f1c90e93f00092890b9",
          name: "Customer UAT Acceptance",
          version: "137",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f607f1c90e93f00092890b9",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [
        {
          id: "5ce52690a9060a9e09436fa0",
          href:
            "https://host:port/partyManagement/organization/5ce52690a9060a9e09436fa0",
          name: "InterCon Network",
          version: "1.0",
        },
      ],
      attachment: [],
      name: "MTN global gh",
      description: "MTN Ghana Global MPLS Connection",
      version: "51",
      brand: "",
      LoB: "ICTServices",
      isBundle: true,
      lastUpdate: "2020-10-08T19:57:07.332Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-09-01T00:00:00.000Z",
        endDateTime: "2025-08-01T00:00:00.000Z",
      },
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      productSpecCharacteristic: [],
      targetProductSchema: {
        "@type": "DOM",
        href: {},
      },
      productSpecificationRelationship: [],
      code: "PS607",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f29593bc91d390009a4571c",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    code: "PO223",
    pendingLifecycleStatus: "",
    serviceLevelAgreement: {
      id: "5ed0a00fb4c40c00083bf7ee",
      relatedParty: [],
      rule: [],
      validFor: {
        startDateTime: "2020-08-30T21:00:00.000Z",
        endDateTime: "2025-08-30T21:00:00.000Z",
      },
      name: "MPLS SLA",
      description: "Platinum SLA",
      version: "0.1",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/service-level-agreement-service/v1/service-level-agreement/5ed0a00fb4c40c00083bf7ee",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/service-level-agreement-service/schema/v1/service-level-agreement",
    },
    externalSystem: [
      {
        id: "33462a6b-7c6b-45dc-b562-5ec3df8ffc16",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f29593ec91d390009a4571d",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f2a562cf7c7882658917d02",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38894783ba2e1cba2de8c4",
        href: "https://host:port/catalogManagement/channel/4",
        name: "Kiosk",
        "@referredType": "Kiosk",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5d3887e883ba2e1cba2de4e6",
        name: "12 months contract",
        description: "12 months contract",
        duration: {
          amount: 12,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
      },
      {
        id: "5d3887f883ba2e1cba2de512",
        name: "24 months contract",
        description: "24 months contract",
        duration: {
          amount: 24,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f2a562bf7c7882658917cff",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f2a7a26a5fd110008c5af81",
            "@type": "PolicyRule",
            name: "Penalty Fees",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f2a7a26a5fd110008c5af81",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f2a89f0a5fd110008c5af84",
            "@type": "PolicyRule",
            name: "Recurirng Router Price Policy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f2a89f0a5fd110008c5af84",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [
          {
            name: "Monthly Charges Rental",
            chargeClass: "Recurring",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "f82ea115-9ad1-4934-bf39-05edd641e99f",
            glCode: "842988",
            time: "2020-07-16T06:01:23",
            value: "Monthly Charges Rental",
            label: "Monthly Charges Rental",
            chargeType: "RecurringInArrearsFixed",
            numberOfInstallments: "",
            periodicityExceptions: [],
          },
        ],
        name: "MTN Ghana Router Rental",
        description: "Router",
        version: "18",
        lastUpdate: "2020-08-26T08:44:44.459Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "monthly",
        recurringChargePeriodLength: 12,
        percentage: 0,
        price: {
          value: 500,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 125,
              unit: "GHS",
            },
            taxCategory: "",
            taxRate: 25,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP416",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f2a562bf7c7882658917cff",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f2a562bf7c7882658917d00",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [],
        name: "MTN Ghana Router OneTimeDiscount",
        description: "Router",
        version: "13",
        lastUpdate: "2020-08-26T08:44:38.466Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "OneTimeDiscount",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 10,
        tax: [],
        "@baseType": "ProdOfferPriceChargeAlteration",
        "@type": "DiscountProdOfferPriceChargeAlteration",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP416",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f2a562bf7c7882658917d00",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "MTN Ghana Router",
    description: "Router",
    isBundle: false,
    isSellable: true,
    version: "10",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-09-01T00:00:00.000Z",
      endDateTime: "2020-12-31T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-08-26T08:45:29.789Z",
    productSpecification: {
      id: "5f2a562bf7c7882658917d01",
      businessType: ["Postpaid"],
      technology: ["LeasedLine"],
      resourceSpecification: ["5f293a60af71dc00062146c2"],
      serviceSpecification: [],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      name: "MTN Ghana Router Product",
      description: "Router",
      version: "11",
      brand: "MTN",
      LoB: "Broadband",
      isBundle: false,
      lastUpdate: "2020-08-26T08:44:44.461Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-09-01T00:00:00.000Z",
        endDateTime: "2020-12-31T00:00:00.000Z",
      },
      "@type": "GoodsProductSpec",
      "@baseType": "AtomicProductSpecification",
      productSpecCharacteristic: [],
      targetProductSchema: {
        "@type": "DOM",
      },
      productSpecificationRelationship: [],
      code: "PS609",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2a562bf7c7882658917d01",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    prodSpecCharValueUse: [],
    code: "PO225",
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f2a562cf7c7882658917d02",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f2a56c9f7c7882658917d07",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38894783ba2e1cba2de8c4",
        href: "https://host:port/catalogManagement/channel/4",
        name: "Kiosk",
        "@referredType": "Kiosk",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5d3887e883ba2e1cba2de4e6",
        name: "12 months contract",
        description: "12 months contract",
        duration: {
          amount: 12,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
      },
      {
        id: "5d3887f883ba2e1cba2de512",
        name: "24 months contract",
        description: "24 months contract",
        duration: {
          amount: 24,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f2a56c8f7c7882658917d04",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f2a7a26a5fd110008c5af81",
            "@type": "PolicyRule",
            name: "Penalty Fees",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f2a7a26a5fd110008c5af81",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f2a8948a5fd110008c5af83",
            "@type": "PolicyRule",
            name: "Recurring Switch Price Policy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f2a8948a5fd110008c5af83",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [
          {
            name: "Monthly Charges Rental",
            chargeClass: "Recurring",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "f82ea115-9ad1-4934-bf39-05edd641e99f",
            glCode: "842988",
            time: "2020-07-16T06:01:23",
            value: "Monthly Charges Rental",
            label: "Monthly Charges Rental",
            chargeType: "RecurringInArrearsFixed",
            numberOfInstallments: "",
            periodicityExceptions: [],
          },
        ],
        name: "MTN Ghana Switch Rental",
        description: "Switch",
        version: "15",
        lastUpdate: "2020-08-26T08:45:39.168Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "monthly",
        recurringChargePeriodLength: 12,
        percentage: 0,
        price: {
          value: 400,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 100,
              unit: "GHS",
            },
            taxCategory: "",
            taxRate: 25,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP418",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f2a56c8f7c7882658917d04",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f2a56c8f7c7882658917d05",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [],
        name: "MTN Ghana Switch OneTimeDiscount",
        description: "Switch",
        version: "12",
        lastUpdate: "2020-08-26T08:45:38.363Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "OneTimeDiscount",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 10,
        tax: [],
        "@baseType": "ProdOfferPriceChargeAlteration",
        "@type": "DiscountProdOfferPriceChargeAlteration",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP418",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f2a56c8f7c7882658917d05",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "MTN Ghana Switch",
    description: "Switch",
    isBundle: false,
    isSellable: true,
    version: "8",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-09-01T00:00:00.000Z",
      endDateTime: "2020-12-31T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-08-26T08:46:29.468Z",
    productSpecification: {
      id: "5f2a56c9f7c7882658917d06",
      businessType: ["Postpaid"],
      technology: ["LeasedLine"],
      resourceSpecification: ["5f2a46de12befb000904e441"],
      serviceSpecification: [],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      name: "MTN Ghana Switch Product",
      description: "Switch",
      version: "7",
      brand: "MTN",
      LoB: "Broadband",
      isBundle: false,
      lastUpdate: "2020-08-26T08:44:36.657Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-09-01T00:00:00.000Z",
        endDateTime: "2020-12-31T00:00:00.000Z",
      },
      "@type": "GoodsProductSpec",
      "@baseType": "AtomicProductSpecification",
      productSpecCharacteristic: [],
      targetProductSchema: {
        "@type": "DOM",
      },
      productSpecificationRelationship: [],
      code: "PS612",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2a56c9f7c7882658917d06",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    prodSpecCharValueUse: [],
    code: "PO226",
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f2a56c9f7c7882658917d07",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f2a5760f7c7882658917d0c",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38894783ba2e1cba2de8c4",
        href: "https://host:port/catalogManagement/channel/4",
        name: "Kiosk",
        "@referredType": "Kiosk",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5d3887e883ba2e1cba2de4e6",
        name: "12 months contract",
        description: "12 months contract",
        duration: {
          amount: 12,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
      },
      {
        id: "5d3887f883ba2e1cba2de512",
        name: "24 months contract",
        description: "24 months contract",
        duration: {
          amount: 24,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f2a5760f7c7882658917d09",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f2a737aa5fd110008c5af7f",
            "@type": "PolicyRule",
            name: "Recurring Price Policy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f2a737aa5fd110008c5af7f",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f2a7a26a5fd110008c5af81",
            "@type": "PolicyRule",
            name: "Penalty Fees",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f2a7a26a5fd110008c5af81",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [
          {
            name: "Monthly Charges Rental",
            chargeClass: "Recurring",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "f82ea115-9ad1-4934-bf39-05edd641e99f",
            glCode: "842988",
            time: "2020-07-16T06:01:23",
            value: "Monthly Charges Rental",
            label: "Monthly Charges Rental",
            chargeType: "RecurringInArrearsFixed",
            numberOfInstallments: "",
            periodicityExceptions: [],
          },
        ],
        name: "MTN Ghana Wireless Access Point (WAP) Rental",
        description: "Wireless Access Point (WAP)",
        version: "14",
        lastUpdate: "2020-08-26T08:45:27.179Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "monthly",
        recurringChargePeriodLength: 12,
        percentage: 0,
        price: {
          value: 500,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 125,
              unit: "GHS",
            },
            taxCategory: "",
            taxRate: 25,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP419",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f2a5760f7c7882658917d09",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f2a5760f7c7882658917d0a",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [],
        name: "MTN Ghana Wireless Access Point (WAP) OneTimeDiscount",
        description: "Wireless Access Point (WAP)",
        version: "12",
        lastUpdate: "2020-08-26T08:45:27.066Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "OneTimeDiscount",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 10,
        tax: [],
        "@baseType": "ProdOfferPriceChargeAlteration",
        "@type": "DiscountProdOfferPriceChargeAlteration",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP419",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f2a5760f7c7882658917d0a",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "MTN Ghana Wireless Access Point (WAP)",
    description: "Wireless Access Point (WAP)",
    isBundle: false,
    isSellable: true,
    version: "7",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-09-01T00:00:00.000Z",
      endDateTime: "2020-12-31T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-08-26T08:45:37.092Z",
    productSpecification: {
      id: "5f2a5760f7c7882658917d0b",
      businessType: ["Postpaid"],
      technology: ["LeasedLine"],
      resourceSpecification: ["5f295a9012befb000904e440"],
      serviceSpecification: [],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      name: "MTN Ghana Wireless Access Point (WAP) Product",
      description: "Wireless Access Point (WAP)",
      version: "7",
      brand: "MTN",
      LoB: "Broadband",
      isBundle: false,
      lastUpdate: "2020-08-26T08:44:36.659Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-09-01T00:00:00.000Z",
        endDateTime: "2020-12-31T00:00:00.000Z",
      },
      "@type": "GoodsProductSpec",
      "@baseType": "AtomicProductSpecification",
      productSpecCharacteristic: [],
      targetProductSchema: {
        "@type": "DOM",
      },
      productSpecificationRelationship: [],
      code: "PS613",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2a5760f7c7882658917d0b",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    prodSpecCharValueUse: [],
    code: "PO227",
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f2a5760f7c7882658917d0c",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f2b06f973e2a50009053a8e",
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f2b06f773e2a50009053a88",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        name: "STC DSL Open Bandwidth Deposit",
        description:
          "This offer provides an ultra high speed of 1Gbps/2.5Gbps/5Gbps.",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Active",
        validFor: {
          startDateTime: "2020-06-24T00:00:00.000Z",
          endDateTime: "2020-12-25T00:00:00.000Z",
        },
        priceType: "Deposit",
        percentage: 0,
        price: {
          value: 200,
          unit: "KWD",
        },
        "@baseType": "ProdOfferPriceCharge",
        "@type": "OneTimeChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        tax: [],
        lastUpdate: "2020-08-06T09:20:39.590Z",
        code: "POP442",
        version: "3",
        unitOfMeasure: "Currency",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f2b06f773e2a50009053a88",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f2b06f773e2a50009053a89",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f2b06f6a5fd110008c5af90",
            "@type": "PolicyRule",
            name: "STC DSL Open Bandwidth - Rental Policy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f2b06f6a5fd110008c5af90",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        name: "STC DSL Open Bandwidth Rental",
        description:
          "This offer provides an ultra high speed of 1Gbps/2.5Gbps/5Gbps.",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Initial",
        validFor: {
          startDateTime: "2020-06-24T00:00:00.000Z",
          endDateTime: "2020-12-25T00:00:00.000Z",
        },
        priceType: "Rental",
        percentage: 0,
        price: {
          value: 1000,
          unit: "GHS",
        },
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [
          {
            id: "5f2b06f773e2a50009053a8a",
            productSpecification: {
              id: "5ef2effd12b18e00069424bc",
              name: "Speed Product",
              version: "36",
              "@type": "GoodsProductSpec",
              href:
                "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5ef2effd12b18e00069424bc",
              "@schemaLocation":
                "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
            },
            name: "Speed",
            description: "Speed",
            valueType: "",
            minCardinality: 0,
            maxCardinality: 0,
            productSpecCharacteristicValue: [
              {
                id: "5f2b06f773e2a50009053a8b",
                valueType: "number",
                value: "1",
                isDefault: true,
                unitOfMeasure: "Gbps",
                "@type": "numeric",
              },
              {
                id: "5f2b06f773e2a50009053a8c",
                valueType: "number",
                "@type": "numeric",
                value: "2.5",
                unitOfMeasure: "Gbps",
              },
              {
                id: "5f2b06f773e2a50009053a8d",
                valueType: "number",
                "@type": "numeric",
                value: "5",
                unitOfMeasure: "Gbps",
              },
            ],
          },
        ],
        tax: [],
        lastUpdate: "2020-08-05T19:22:31.310Z",
        code: "POP443",
        version: "0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f2b06f773e2a50009053a89",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    allowedProductAction: {
      channels: [],
    },
    name: "STC DSL Open Bandwidth",
    description: "DSL Open Bandwidth for STC enterprise customers",
    isBundle: false,
    isSellable: true,
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-06-24T00:00:00.000Z",
      endDateTime: "2020-12-25T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    code: "PO107",
    productSpecification: {
      id: "5f2b06f673e2a50009053a85",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f2b06f673e2a50009053a84",
          name: "STC DSL Open Bandwidth - Cable Type Product",
          "@type": "GoodsProductSpec",
          version: "9",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2b06f673e2a50009053a84",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f2b06f673e2a50009053a86",
          name: "STC DSL Open Bandwidth - Speed Product",
          "@type": "GoodsProductSpec",
          version: "9",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2b06f673e2a50009053a86",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f2b06f673e2a50009053a87",
          name: "STC DSL Open Bandwidth - Leased Line Modem Product",
          "@type": "GoodsProductSpec",
          version: "9",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2b06f673e2a50009053a87",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f59ff5d4efb45000892a5c1",
          name: "Site",
          version: "6",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f59ff5d4efb45000892a5c1",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      name: "STC DSL Open Bandwidth",
      description:
        "This offer provides an ultra high speed of 1Gbps/2.5Gbps/5Gbps.",
      brand: "Ultranet",
      LoB: "ICTServices",
      isBundle: true,
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-06-24T00:00:00.000Z",
        endDateTime: "2020-12-25T00:00:00.000Z",
      },
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      targetProductSchema: {
        "@type": "DOM",
      },
      productSpecificationRelationship: [],
      productSpecCharacteristic: [],
      lastUpdate: "2020-09-10T10:27:56.390Z",
      code: "PS632",
      version: "11",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2b06f673e2a50009053a85",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-08-05T19:22:33.173Z",
    version: "0",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f2b06f973e2a50009053a8e",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f2b087a73e2a50009053a95",
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f2b087873e2a50009053a94",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        name: "STC Equipment DSL Deposit",
        description: "STC Equipment DSL",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-08-06T00:00:00.000Z",
          endDateTime: "2020-12-25T00:00:00.000Z",
        },
        priceType: "Deposit",
        percentage: 0,
        price: {
          value: 10,
          unit: "KWD",
        },
        "@baseType": "ProdOfferPriceCharge",
        "@type": "OneTimeChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [
          {
            id: "5f2fddf116c2a20009fd41bd",
            productSpecification: {
              id: "5f2b087873e2a50009053a90",
              name: "STC Equipment DSL",
              "@type": "GoodsProductSpec",
              version: "25",
              href:
                "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2b087873e2a50009053a90",
              "@schemaLocation":
                "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
            },
            name: "Device Brand",
            description: "Device Brand",
            valueType: "string",
            minCardinality: 1,
            maxCardinality: 3,
            productSpecCharacteristicValue: [
              {
                id: "5f2fddf116c2a20009fd41be",
                valueType: "string",
                "@type": "string",
                value: "Thomson Modem TG608",
                isDefault: true,
              },
            ],
          },
        ],
        unitOfMeasure: "Currency",
        tax: [
          {
            taxAmount: {
              value: 0,
              unit: "KWD",
            },
            taxCategory: "",
            taxRate: 0,
          },
        ],
        lastUpdate: "2020-08-09T11:28:49.976Z",
        code: "POP444",
        version: "11",
        recurringChargePeriodLength: 0,
        recurringChargePeriodType: "",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f2b087873e2a50009053a94",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "delete", "modify"],
          id: "5f58d4a989726b0007707c63",
          name: "CRM",
        },
        {
          allowedActionType: ["add", "modify", "delete"],
          id: "5f58d4a989726b0007707c64",
          name: "Webshop",
        },
      ],
    },
    name: "STC Equipment DSL",
    description: "STC Equipment DSL",
    isBundle: false,
    isSellable: true,
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-08-06T00:00:00.000Z",
      endDateTime: "2020-12-25T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    code: "PO107",
    productSpecification: {
      id: "5f2b087873e2a50009053a90",
      businessType: ["Postpaid"],
      technology: ["ADSL"],
      resourceSpecification: ["5f2b087712befb000904e44f"],
      serviceSpecification: [],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      name: "STC Equipment DSL",
      description:
        "This modem provides support to Dedicated leased Line connection.",
      brand: "STC",
      LoB: "Broadband",
      isBundle: false,
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-08-06T00:00:00.000Z",
        endDateTime: "2020-12-25T00:00:00.000Z",
      },
      "@type": "GoodsProductSpec",
      "@baseType": "AtomicProductSpecification",
      targetProductSchema: {
        "@type": "DOM",
        href: {},
      },
      productSpecificationRelationship: [],
      productSpecCharacteristic: [
        {
          name: "Device Brand",
          description: "Device Brand",
          valueType: "string",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          regex: "",
          extensible: true,
          productSpecCharacteristicValue: [
            {
              valueType: "string",
              "@type": "string",
              value: "NetGear",
              isDefault: false,
            },
            {
              valueType: "string",
              "@type": "string",
              value: "TP-Link",
            },
            {
              valueType: "string",
              "@type": "string",
              value: "D-Link",
            },
            {
              valueType: "string",
              "@type": "string",
              value: "Thomson Modem TG608",
              isDefault: true,
            },
          ],
          ProductSpecCharRelationship: [],
        },
      ],
      lastUpdate: "2020-09-10T04:49:34.352Z",
      code: "PS636",
      version: "25",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2b087873e2a50009053a90",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-09-09T13:12:09.072Z",
    version: "11",
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f2b087a73e2a50009053a95",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f2d3ba79a945a6558dc3052",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38894783ba2e1cba2de8c4",
        href: "https://host:port/catalogManagement/channel/4",
        name: "Kiosk",
        "@referredType": "Kiosk",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5d3887e883ba2e1cba2de4e6",
        name: "12 months contract",
        description: "12 months contract",
        duration: {
          amount: 12,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
      },
      {
        id: "5d3887f883ba2e1cba2de512",
        name: "24 months contract",
        description: "24 months contract",
        duration: {
          amount: 24,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f2d3ba69a945a6558dc3050",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [],
        name: "MTN Ghana WiFi Installation OneTimeDiscount",
        description: "WiFi Installation",
        version: "6",
        lastUpdate: "2020-08-26T08:45:25.557Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "OneTimeDiscount",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 10,
        tax: [],
        "@baseType": "ProdOfferPriceChargeAlteration",
        "@type": "DiscountProdOfferPriceChargeAlteration",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP446",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f2d3ba69a945a6558dc3050",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f2d3ba69a945a6558dc304f",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "3e65ca6b-0f31-4568-a81b-32054af22cb1",
            glCode: "842988",
            time: "2020-07-16T06:03:45",
            value: "Connection Charges",
            label: "Connection Charges",
            chargeType: "OneTimeUpfront",
            numberOfInstallments: "",
            periodicityExceptions: [],
          },
        ],
        name: "MTN Ghana WiFi Installation OneTimeCharge",
        description: "WiFi Installation",
        version: "5",
        lastUpdate: "2020-08-26T08:45:27.063Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        price: {
          value: 5000,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 1250,
              unit: "GHS",
            },
            taxCategory: "",
            taxRate: 25,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "OneTimeChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        code: "POP446",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f2d3ba69a945a6558dc304f",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "MTN Ghana WiFi Installation",
    description: "WiFi Installation",
    isBundle: false,
    isSellable: true,
    version: "3",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-09-01T00:00:00.000Z",
      endDateTime: "2020-12-31T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-08-26T08:45:38.465Z",
    productSpecification: {
      id: "5f2d3ba69a945a6558dc3051",
      businessType: ["Postpaid"],
      technology: ["LeasedLine"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f2d3ba69a945a6558dc304d",
          name: "MTN Ghana WiFi Installation Appointment Product",
          version: "8",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2d3ba69a945a6558dc304d",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f2d3ba69a945a6558dc304e",
          name: "MTN Ghana WiFi Installation Product",
          version: "12",
          "@type": "AtomicProductSpecification",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2d3ba69a945a6558dc304e",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      name: "MTN Ghana WiFi Installation",
      description: "WiFi Installation",
      version: "6",
      brand: "MTN",
      LoB: "Broadband",
      isBundle: true,
      lastUpdate: "2020-08-26T08:45:29.784Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-09-01T00:00:00.000Z",
        endDateTime: "2020-12-31T00:00:00.000Z",
      },
      "@type": "CompositeProductSpecification",
      "@baseType": "AtomicProductSpecification",
      productSpecCharacteristic: [],
      targetProductSchema: {
        "@type": "DOM",
      },
      productSpecificationRelationship: [],
      code: "PS643",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2d3ba69a945a6558dc3051",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    prodSpecCharValueUse: [],
    code: "PO232",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f2d3ba79a945a6558dc3052",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f2fc1ae16c2a20009fd41b4",
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f2fc1ad16c2a20009fd41b3",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f2fc26ba5fd110008c5af99",
            "@type": "PolicyRule",
            name: "Price Override",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f2fc26ba5fd110008c5af99",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        name: "STC Maintenance Fee",
        description: "STC Maintenance Fee for Equipments",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-08-06T00:00:00.000Z",
          endDateTime: "2020-12-25T00:00:00.000Z",
        },
        priceType: "Rental",
        percentage: 0,
        price: {
          value: 10,
          unit: "KWD",
        },
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        unitOfMeasure: "Currency",
        tax: [],
        lastUpdate: "2020-08-09T09:53:26.586Z",
        code: "POP447",
        version: "6",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f2fc1ad16c2a20009fd41b3",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "delete", "modify"],
          id: "5f59b47d89726b0007707c7f",
          name: "CRM",
        },
        {
          allowedActionType: ["add", "modify", "delete"],
          id: "5f59b47d89726b0007707c80",
          name: "Webshop",
        },
      ],
    },
    name: "STC Maintenance Fee",
    description: "Monthly Maintenance Fee for Equipment",
    isBundle: false,
    isSellable: true,
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-08-06T00:00:00.000Z",
      endDateTime: "2020-12-25T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    code: "PO107",
    productSpecification: {
      id: "5f2fc1ad16c2a20009fd41b2",
      businessType: ["Postpaid"],
      technology: [],
      resourceSpecification: ["5f2fc1ad12befb000904e453"],
      serviceSpecification: [],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      name: "STC Maintenance Fee - Leased Line Modem Product",
      description:
        "This modem provides support to Dedicated leased Line connection.",
      brand: "STC",
      LoB: "Broadband",
      isBundle: false,
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-08-06T00:00:00.000Z",
        endDateTime: "2020-12-25T00:00:00.000Z",
      },
      "@type": "GoodsProductSpec",
      "@baseType": "AtomicProductSpecification",
      targetProductSchema: {
        "@type": "DOM",
      },
      productSpecificationRelationship: [],
      productSpecCharacteristic: [
        {
          name: "Device Brand",
          description: "Device Brand",
          valueType: "string",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          regex: "",
          extensible: true,
          productSpecCharacteristicValue: [
            {
              valueType: "string",
              "@type": "string",
              value: "NetGear",
              isDefault: false,
            },
            {
              valueType: "string",
              "@type": "string",
              value: "TP-Link",
            },
            {
              valueType: "string",
              "@type": "string",
              value: "D-Link",
            },
            {
              valueType: "string",
              "@type": "string",
              value: "Thomson Modem",
              isDefault: true,
            },
          ],
          ProductSpecCharRelationship: [],
        },
      ],
      lastUpdate: "2020-09-10T05:07:08.655Z",
      code: "PS644",
      version: "6",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f2fc1ad16c2a20009fd41b2",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-09-10T05:07:09.579Z",
    version: "4",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f2fc1ae16c2a20009fd41b4",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f33c943530cae0008244c89",
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "modify", "delete"],
          id: "5f7d9eee2427a10008beed6d",
          name: "CRM",
        },
      ],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f33d711530cae0008244c8b",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f33e2eba5fd110008c5afad",
            "@type": "PolicyRule",
            name: "Ghana Mobile Advertising Price",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f33e2eba5fd110008c5afad",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        price: {
          unit: "GHS",
          value: 80,
        },
        validFor: {
          startDateTime: "2020-08-12T11:16:48.261Z",
          endDateTime: "2021-02-12T12:16:48.261Z",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Advertising price",
        description: "description",
        lifecycleStatus: "Launched",
        version: "14",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Rental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        lastUpdate: "2020-10-07T08:34:54.309Z",
        code: "POP459",
        charges: [
          {
            name: "Advance Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "e5b1f20f-9a23-4cd7-8dbb-ed93c84a4022",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:35",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f33d711530cae0008244c8b",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f461fccc53b370009b9ba94",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7d7daba3029700065482dc",
            "@type": "OverrideRule",
            name: "Overridepolicyadvertising",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7d7daba3029700065482dc",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:14",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 50,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-08-26T08:14:32.354Z",
          endDateTime: "2021-02-26T08:14:32.354Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "One Time Charge",
        lifecycleStatus: "Launched",
        version: "8",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-07T08:34:54.217Z",
        code: "POP544",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f461fccc53b370009b9ba94",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "MTNG AT Mobile Advertising",
    description: "DCM-868",
    isBundle: false,
    isSellable: true,
    version: "19",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f33c943530cae0008244c88",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f7db6952427a10008beed70",
          name: "New product spefication",
          version: "3",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7db6952427a10008beed70",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7db7cc2427a10008beed71",
          name: "Manual Provisioning",
          version: "3",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7db7cc2427a10008beed71",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7db7f32427a10008beed72",
          name: "Customer UAT Acceptance",
          version: "3",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7db7f32427a10008beed72",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      name: "Mobile Advertising",
      description: "DCM-868",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "34",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [],
      lastUpdate: "2020-10-07T12:43:36.410Z",
      code: "PS662",
      validFor: {
        startDateTime: "2020-08-12T10:27:27.275Z",
        endDateTime: "2021-02-12T11:27:27.275Z",
      },
      LoB: "DigitalServices",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f33c943530cae0008244c88",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-10-07T10:56:46.908Z",
    code: "PO238",
    validFor: {
      startDateTime: "2020-08-26T06:15:26.861Z",
      endDateTime: "2021-02-26T06:15:26.861Z",
    },
    externalSystem: [
      {
        id: "b7e69e83-3676-452e-b8e7-1bca3dcce863",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f33c943530cae0008244c89",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f3e3e5c7c63a0000864d897",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59d5d9394b7ed8817a5c3d",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Music",
        description: "A category for Music",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59d5d9394b7ed8817a5c3d",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59d66a394b7ed8817a5f5b",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "TV and Video",
        description: "A category for TV and Video",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59d66a394b7ed8817a5f5b",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59d6b2394b7ed8817a6122",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Sports",
        description: "A category for Sports",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59d6b2394b7ed8817a6122",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59d9db394b7ed8817a7287",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Games",
        description: "A category for Games",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59d9db394b7ed8817a7287",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59d9f7394b7ed8817a72f6",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "News",
        description: "A category for News",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59d9f7394b7ed8817a72f6",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59da37394b7ed8817a73bd",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Lifestyle and Entertainment",
        description: "A category for Lifestyle and Entertainment",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59da37394b7ed8817a73bd",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59dbb4394b7ed8817a78cd",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Religion and Culture",
        description: "A category for Religion and Culture",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59dbb4394b7ed8817a78cd",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59dbd4394b7ed8817a792d",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Dating",
        description: "Dating",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59dbd4394b7ed8817a792d",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59dbf8394b7ed8817a799c",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "MTN Apps",
        description: "A category for MTN Apps",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59dbf8394b7ed8817a799c",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59dcda394b7ed8817a7e41",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "mEducation",
        description: "A category for mEducation",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59dcda394b7ed8817a7e41",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59dcf5394b7ed8817a8152",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "mHealth",
        description: "A category for mHealth",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59dcf5394b7ed8817a8152",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59dd16394b7ed8817a81b9",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Classifieds",
        description: "A category for Classifieds",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59dd16394b7ed8817a81b9",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59ddb3394b7ed8817a8500",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Competitions",
        description: "A category for Competitions",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59ddb3394b7ed8817a8500",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59ddda394b7ed8817a8705",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Crowd Funding",
        description: "A category for Crowd Funding",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59ddda394b7ed8817a8705",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59ddfe394b7ed8817a8803",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Naughty",
        description: "A category for Naughty",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59ddfe394b7ed8817a8803",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59de1f394b7ed8817a894b",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "eCommerce",
        description: "A category for eCommerce",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59de1f394b7ed8817a894b",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59de79394b7ed8817a8aa6",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Monthly billed SCs",
        description: "A category for Monthly billed SCs",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59de79394b7ed8817a8aa6",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59def6394b7ed8817a8d3e",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Service Manager",
        description: "A category for Service Manager",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59def6394b7ed8817a8d3e",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59df20394b7ed8817a8dee",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Airtime & Data Sales",
        description: "A category for Airtime & Data Sales",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59df20394b7ed8817a8dee",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59df62394b7ed8817a91a8",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Devices",
        description: "A category for Devices",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59df62394b7ed8817a91a8",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59df80394b7ed8817a922b",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Ads",
        description: "A category for Ads",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59df80394b7ed8817a922b",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f59df9c394b7ed8817a928c",
        lastUpdate: "2020-09-10T10:30:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Insurance",
        description: "A category for Insurance",
        lifecycleStatus: "Active",
        version: "1",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f59df9c394b7ed8817a928c",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f60710590e93f00092890b5",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:14",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 1100,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-09-15T07:44:21.452Z",
          endDateTime: "2020-09-30T07:44:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "One Time Charge",
        lifecycleStatus: "Launched",
        version: "10",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 0,
            taxAmount: {
              value: 0,
              unit: "GHS",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-18T08:10:24.673Z",
        code: "POP648",
        description: "One time charge",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f60710590e93f00092890b5",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f63509390e93f0009289101",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [],
        price: {
          value: 0,
          unit: "GHS",
        },
        "@type": "SimpleUsageProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Usage charge",
        lifecycleStatus: "Launched",
        version: "5",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "SimpleUsage",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-18T08:09:36.478Z",
        code: "POP659",
        description: "Usage charge",
        validFor: {
          startDateTime: "2020-09-18T07:27:00.000Z",
          endDateTime: "2020-09-30T07:27:00.000Z",
        },
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f63509390e93f0009289101",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f6ae990659a1c0009ad8411",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f6ae9a180e4350009b6497e",
            "@type": "PolicyRule",
            name: "MT Tariff Policy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f6ae9a180e4350009b6497e",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [],
        price: {
          value: 10,
          unit: "GHS",
        },
        "@type": "SimpleUsageProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "MT Tariff",
        description: "MT Tariff",
        lifecycleStatus: "Initial",
        version: "1",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "SimpleUsage",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [
          {
            id: "5f6ae9aa659a1c0009ad8413",
            action: "add",
          },
        ],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-23T06:22:34.942Z",
        code: "POP683",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f6ae990659a1c0009ad8411",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "Toll free SMS gh",
    description: "The Toll free SMS service for MTNG ",
    isBundle: false,
    isSellable: true,
    version: "31",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f6217dd90e93f00092890f3",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f62180d90e93f00092890f4",
          name: "Customer UAT Acceptance",
          version: "16",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f62180d90e93f00092890f4",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f62180d90e93f00092890f5",
          name: "Manual Provisioning",
          version: "13",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f62180d90e93f00092890f5",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f64a1c3f0730c00097d8c69",
          name: "Toll Free",
          version: "25",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f64a1c3f0730c00097d8c69",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f6aeaad659a1c0009ad8415",
          name: "Sample Content",
          version: "2",
          "@type": "UsageVolumeProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f6aeaad659a1c0009ad8415",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-09-16T13:48:38.691Z",
        endDateTime: "2021-03-31T13:48:00.000Z",
      },
      name: "Toll Free gh",
      description: "Description",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "21",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      LoB: "DigitalServices",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [],
      lastUpdate: "2020-09-23T06:28:27.251Z",
      code: "PS911",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f6217dd90e93f00092890f3",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-09-23T06:22:35.667Z",
    code: "PO251",
    validFor: {
      startDateTime: "2020-09-15T00:00:00.000Z",
      endDateTime: "2021-06-30T00:00:00.000Z",
    },
    serviceLevelAgreement: null,
    pendingLifecycleStatus: "",
    externalSystem: [
      {
        id: "0a73e40a-9216-4683-9872-90765ba4830f",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f3e3e5c7c63a0000864d897",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f3f61ce3f55d30009213e56",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5f59f751394b7ed8817bf842",
        href: "",
        name: "NGO",
        "@referredType": "Corporate",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [],
    bundledProductOffering: [],
    relatedParty: [],
    name: "Business Messenger Access",
    description: "DCM-883",
    isBundle: false,
    isSellable: true,
    version: "36",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f3f61a43f55d30009213e55",
      businessType: ["Postpaid"],
      technology: [],
      resourceSpecification: [],
      serviceSpecification: ["5f6ae33d7f5169000af9b680"],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      name: "Messenger gh",
      description: "DCM-883",
      isBundle: false,
      lifecycleStatus: "Initial",
      version: "124",
      "@type": "UsageVolumeProductSpec",
      "@baseType": "AtomicProductSpecification",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [
        {
          valueType: "string",
          name: "Portal Access",
          description: "Users shall have access to the Portal.",
          configurable: false,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "",
          extensible: false,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [],
        },
        {
          valueType: "string",
          name: "Business Messenger - User ID",
          description: "Business Messenger - User ID",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "",
          extensible: false,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [],
        },
      ],
      lastUpdate: "2020-10-09T09:03:00.133Z",
      code: "PS713",
      validFor: {
        startDateTime: "2020-08-21T05:49:18.235Z",
        endDateTime: "2022-12-31T06:49:00.000Z",
      },
      LoB: "DigitalServices",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f3f61a43f55d30009213e55",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-09-28T08:45:36.046Z",
    code: "PO257",
    validFor: {
      startDateTime: "2020-08-21T05:49:18.235Z",
      endDateTime: "2021-12-31T06:49:00.000Z",
    },
    externalSystem: [
      {
        id: "98867960-a3e5-459c-862c-4a634f077f81",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f3f61ce3f55d30009213e56",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f437b5ac53b370009b9b925",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [
      {
        id: "5f43ef89feb1bc00081cc44c",
        "@baseType": "Agreement",
        name: "Contract Period",
        version: "0.1",
        type: "Legal",
        completionDate: "2023-08-23T18:30:00.000Z",
        engagedPartyRole: [],
        characteristic: [
          {
            id: "5f4415c0feb1bc00081cc453",
            name: "Months",
            value: "36",
          },
        ],
        associatedAgreement: [],
        agreementItem: [],
        agreementAuthorization: [],
        agreementPeriod: {
          endDateTime: "2023-08-23T18:30:00.000Z",
        },
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5f43ef89feb1bc00081cc44c",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
      },
    ],
    marketSegment: [
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5f441504c53b370009b9b98a",
        duration: {
          units: "months",
          amount: 36,
        },
        validFor: {
          startDateTime: "2020-08-24T19:15:56.166Z",
          endDateTime: "2023-08-24T18:30:00.000Z",
        },
        name: "Contract Period",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f441504c53b370009b9b98a",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f437b59c53b370009b9b923",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Monthly Charges Rental",
            chargeClass: "Recurring",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "f82ea115-9ad1-4934-bf39-05edd641e99f",
            glCode: "842988",
            time: "2020-07-16T06:01:23",
            value: "Monthly Charges Rental",
            label: "Monthly Charges Rental",
            chargeType: "RecurringInArrearsFixed",
            numberOfInstallments: "",
            periodicityExceptions: [],
          },
        ],
        name: "WiFi Service (MTNG) Rental",
        description: "Wifi Service for MTN Ghana",
        version: "17",
        lastUpdate: "2020-09-04T12:14:22.466Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-08-24T00:00:00.000Z",
          endDateTime: "2021-08-31T00:00:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "monthly",
        recurringChargePeriodLength: 1,
        percentage: 0,
        price: {
          value: 340,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 3.4,
              unit: "GHS",
            },
            taxCategory: "VAT",
            taxRate: 1,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        code: "POP503",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f437b59c53b370009b9b923",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f43ede2c53b370009b9b95b",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5f43ef03c53b370009b9b95c",
            name: "Instalment Term",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f43ef03c53b370009b9b95c",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [],
        price: {
          value: 25,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-08-24T15:48:44.744Z",
          endDateTime: "2021-02-24T15:48:44.744Z",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Monthly Instalment for Installation Cost",
        lifecycleStatus: "Launched",
        version: "24",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Rental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-04T12:14:35.068Z",
        code: "POP513",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f43ede2c53b370009b9b95b",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f43f180c53b370009b9b95f",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f43f1df40fa540008bf4edc",
            "@type": "PolicyRule",
            name: "WaiveOffWiFi",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f43f1df40fa540008bf4edc",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [],
        price: {
          value: 200,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-08-24T16:53:43.921Z",
          endDateTime: "2023-08-23T18:30:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Penalty Charges on Breaching Contract",
        lifecycleStatus: "Launched",
        version: "24",
        isBundle: false,
        isServiceActionPrice: true,
        priceType: "Penalty",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [
          {
            id: "5f44116dc53b370009b9b984",
            action: "delete",
          },
        ],
        agreementCharValueUse: [
          {
            id: "5f44116dc53b370009b9b985",
            agreement: {
              id: "5f43ef89feb1bc00081cc44c",
              name: "Contract Period",
              version: "0.1",
              href:
                "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5f43ef89feb1bc00081cc44c",
              "@schemaLocation":
                "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
            },
            characteristic: [
              {
                id: "5f44116dc53b370009b9b986",
                name: "Year",
                value: "3",
              },
            ],
          },
        ],
        tax: [],
        prodSpecCharValueUse: [],
        lastUpdate: "2020-09-04T12:14:38.090Z",
        code: "POP514",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f43f180c53b370009b9b95f",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f43f408c53b370009b9b969",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [],
        price: {
          value: 110,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-08-24T16:53:43.921Z",
          endDateTime: "2023-08-23T18:30:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "One Time Charge",
        lifecycleStatus: "Launched",
        version: "19",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-04T12:14:22.469Z",
        code: "POP515",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f43f408c53b370009b9b969",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "WiFi Service (MTNG)",
    description: "Wifi Service for MTN Ghana",
    isBundle: false,
    isSellable: true,
    version: "12",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-08-24T00:00:00.000Z",
      endDateTime: "2023-08-30T18:30:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-09-04T12:14:46.571Z",
    serviceLevelAgreement: null,
    productSpecification: {
      id: "5f43f752c53b370009b9b973",
      businessType: ["Postpaid"],
      technology: ["EnterpriseWiFi"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f43f79cc53b370009b9b974",
          name: "Business Model",
          version: "27",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f43f79cc53b370009b9b974",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f43fb47c53b370009b9b975",
          name: "Backhaul Solution",
          version: "21",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f43fb47c53b370009b9b975",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f4401b9c53b370009b9b976",
          name: "Customer Type",
          version: "21",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f4401b9c53b370009b9b976",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f44042dc53b370009b9b977",
          name: "Access Points",
          version: "24",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f44042dc53b370009b9b977",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f4407f3c53b370009b9b978",
          name: "Contract Period",
          version: "23",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f4407f3c53b370009b9b978",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f440b77c53b370009b9b979",
          name: "GPS Coordinates",
          version: "21",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f440b77c53b370009b9b979",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f440cf2c53b370009b9b97a",
          name: "Profile Abbreviation",
          version: "21",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f440cf2c53b370009b9b97a",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f440e0ac53b370009b9b97b",
          name: "Site Abbreviation",
          version: "22",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f440e0ac53b370009b9b97b",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f440fcac53b370009b9b97d",
          name: "Site Name",
          version: "20",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f440fcac53b370009b9b97d",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-08-24T16:53:43.921Z",
        endDateTime: "2023-08-23T18:30:00.000Z",
      },
      name: "WiFi Service",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "36",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      LoB: "ICTServices",
      productSpecificationRelationship: [
        {
          id: "5f61f98290e93f00092890ef",
          validFor: {
            startDateTime: "2020-09-16T11:39:19.835Z",
            endDateTime: "2021-07-31T11:39:00.000Z",
          },
          name: "Diligent",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f61f98290e93f00092890ef",
          type: "dependency",
        },
      ],
      productSpecCharacteristic: [],
      lastUpdate: "2020-09-30T14:18:42.318Z",
      code: "PS737",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f43f752c53b370009b9b973",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    code: "PO263",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f437b5ac53b370009b9b925",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f4386b1c53b370009b9b931",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [
      {
        id: "5f438e32feb1bc00081cc44a",
        "@baseType": "Agreement",
        agreementPeriod: {
          endDateTime: "2021-08-23T18:30:00.000Z",
        },
        name: "Contract Period",
        version: "0.1",
        completionDate: "2021-08-23T18:30:00.000Z",
        engagedPartyRole: [],
        characteristic: [],
        associatedAgreement: [],
        agreementItem: [],
        agreementAuthorization: [],
        type: "Legal",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5f438e32feb1bc00081cc44a",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
      },
    ],
    marketSegment: [
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f4386aec53b370009b9b92f",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Monthly Charges Rental",
            chargeClass: "Recurring",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "f82ea115-9ad1-4934-bf39-05edd641e99f",
            glCode: "842988",
            time: "2020-07-16T06:01:23",
            value: "Monthly Charges Rental",
            label: "Monthly Charges Rental",
            chargeType: "RecurringInArrearsFixed",
            numberOfInstallments: "",
            periodicityExceptions: [],
          },
        ],
        name: "GSM Service Rental",
        description:
          "This offer provides an iPhone SE along with a GSM postpaid service",
        version: "9",
        lastUpdate: "2020-08-25T19:02:36.170Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-08-24T00:00:00.000Z",
          endDateTime: "2021-08-25T18:59:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "monthly",
        recurringChargePeriodLength: 1,
        percentage: 0,
        price: {
          value: 10,
          unit: "OMR",
        },
        tax: [
          {
            taxAmount: {
              value: 0,
              unit: "OMR",
            },
            taxCategory: "VAT",
            taxRate: 0,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        code: "POP504",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f4386aec53b370009b9b92f",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f438db9c53b370009b9b942",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5f43910fc53b370009b9b946",
            name: "Contract Period",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f43910fc53b370009b9b946",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [],
        price: {
          value: 50,
          unit: "OMR",
        },
        validFor: {
          startDateTime: "2020-08-24T09:50:53.299Z",
          endDateTime: "2021-08-23T20:00:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Penalty Charges",
        lifecycleStatus: "Launched",
        version: "7",
        isBundle: false,
        isServiceActionPrice: true,
        priceType: "Penalty",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [
          {
            id: "5f4392eec53b370009b9b94b",
            action: "delete",
          },
        ],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-08-24T10:17:42.363Z",
        code: "POP507",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f438db9c53b370009b9b942",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f438df2c53b370009b9b944",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f46166240fa540008bf4ee7",
            "@type": "PolicyRule",
            name: "MM policy 260820",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f46166240fa540008bf4ee7",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5f439166c53b370009b9b948",
            name: "Instalment Term",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f439166c53b370009b9b948",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [],
        price: {
          value: 50,
          unit: "OMR",
        },
        validFor: {
          startDateTime: "2020-08-24T09:50:53.299Z",
          endDateTime: "2021-02-24T09:50:53.299Z",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "iPhone SE Instalment ",
        lifecycleStatus: "Launched",
        version: "10",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Recurring",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-08-26T07:59:36.189Z",
        code: "POP508",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f438df2c53b370009b9b944",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f439e58c53b370009b9b953",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [],
        price: {
          value: 20,
          unit: "OMR",
        },
        validFor: {
          startDateTime: "2020-08-24T10:56:09.188Z",
          endDateTime: "2021-02-24T10:56:09.188Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "One Time Charge",
        lifecycleStatus: "Launched",
        version: "1",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-08-24T14:45:58.178Z",
        code: "POP510",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f439e58c53b370009b9b953",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "5G Power Package",
    description:
      "This offer provides an iPhone SE in 12 Instalments along with a GSM postpaid service on a 12 month contract",
    isBundle: false,
    isSellable: true,
    version: "7",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-08-24T00:00:00.000Z",
      endDateTime: "2021-03-31T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-08-24T14:46:00.096Z",
    serviceLevelAgreement: null,
    productSpecification: {
      id: "5f4386afc53b370009b9b930",
      businessType: ["Postpaid"],
      technology: [],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f4386adc53b370009b9b92a",
          name: "Plan 1 - Daily 1GB Data Product",
          version: "13",
          "@type": "RatePlanProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f4386adc53b370009b9b92a",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f4386adc53b370009b9b92b",
          name: "Plan 1 - Daily 200 min Product",
          version: "13",
          "@type": "RatePlanProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f4386adc53b370009b9b92b",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f4386aec53b370009b9b92e",
          name: "Plan 1 - Daily 20 SMS Product",
          version: "14",
          "@type": "RatePlanProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f4386aec53b370009b9b92e",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f4386aec53b370009b9b92d",
          name: "MSISDN Product",
          version: "14",
          "@type": "MSISDNProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f4386aec53b370009b9b92d",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f4386adc53b370009b9b92c",
          name: "SIM Product",
          version: "13",
          "@type": "GoodsProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f4386adc53b370009b9b92c",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f438894c53b370009b9b93e",
          name: "iPhone SE",
          version: "19",
          "@type": "GoodsProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f438894c53b370009b9b93e",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [
        {
          id: "5ce4ffc4a9060a9e09433953",
          href:
            "https://host:port/partyManagement/organization/5ce4ffc4a9060a9e09433953",
          name: "Home Network",
          version: "1.0",
        },
        {
          id: "5ce52690a9060a9e09436fa0",
          href:
            "https://host:port/partyManagement/organization/5ce52690a9060a9e09436fa0",
          name: "InterCon Network",
          version: "1.0",
        },
        {
          id: "5ce526a0a9060a9e09436fbe",
          href:
            "https://host:port/partyManagement/organization/5ce526a0a9060a9e09436fbe",
          name: "Roaming Network",
          version: "1.0",
        },
        {
          id: "5ce534bea9060a9e0943838c",
          href:
            "https://host:port/partyManagement/organization/5ce534bea9060a9e0943838c",
          name: "End customer",
          version: "1.0",
        },
      ],
      attachment: [],
      name: "5G Power Package",
      description:
        "This offer provides an iPhone SE along with a GSM postpaid service",
      version: "11",
      brand: "Ooredoo",
      LoB: "Mobile",
      isBundle: true,
      lastUpdate: "2020-08-24T14:45:49.271Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-08-24T00:00:00.000Z",
        endDateTime: "2021-03-31T00:00:00.000Z",
      },
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      productSpecCharacteristic: [],
      productSpecificationRelationship: [],
      code: "PS727",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f4386afc53b370009b9b930",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    code: "PO265",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f4386b1c53b370009b9b931",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f44347ac53b370009b9b9b8",
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "modify", "delete", "nochange"],
          id: "5f44356fc53b370009b9b9c3",
          name: "CRM",
        },
      ],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f443542c53b370009b9b9be",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f4431dd40fa540008bf4edd",
            "@type": "PolicyRule",
            name: "Bulk SMS Subscription fee policy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f4431dd40fa540008bf4edd",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [],
        price: {
          unit: "IRR",
        },
        validFor: {
          startDateTime: "2020-08-24T21:17:43.749Z",
          endDateTime: "2021-02-24T22:17:43.749Z",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Subscription fee",
        description: "Subscription fee",
        lifecycleStatus: "Initial",
        version: "1",
        isBundle: false,
        isServiceActionPrice: true,
        priceType: "Recurring",
        recurringChargePeriodType: "Monthly",
        recurringChargePeriodLength: 24,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [
          {
            id: "5f443569c53b370009b9b9c1",
            action: "add",
          },
          {
            id: "5f443569c53b370009b9b9c2",
            action: "modify",
          },
        ],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 9,
            taxAmount: {
              value: 0,
              unit: "IRR",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-08-24T21:47:21.825Z",
        code: "POP522",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f443542c53b370009b9b9be",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    name: "MTN Iran Bulk Provider SMS A02",
    description: "MTN Iran Bulk Provider SMS A02",
    isBundle: false,
    isSellable: true,
    version: "5",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f442dacc53b370009b9b9b2",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: ["5f442e33d1aff90008315d33"],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-08-24T20:19:52.670Z",
        endDateTime: "2021-02-24T21:19:52.670Z",
      },
      name: "MTN Iran Bulk Provider SMS A01 product spefication",
      description: "MTN Iran Bulk Provider SMS A01",
      isBundle: false,
      lifecycleStatus: "Launched",
      version: "15",
      "@type": "NetworkProductSpec",
      "@baseType": "AtomicProductSpecification",
      LoB: "DigitalServices",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [
        {
          valueType: "string",
          name: "Short Code",
          description: "Short Code",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          regex: "^[0-9a-zA-Z]+$",
          extensible: false,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "string",
            },
          ],
        },
        {
          valueType: "number",
          name: "TPS",
          description: "TPS",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "",
          extensible: false,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "number",
            },
          ],
        },
        {
          valueType: "string",
          name: "DCLM Service ID",
          description: "DCLM Service ID",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          regex: "",
          extensible: false,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "string",
            },
          ],
        },
      ],
      lastUpdate: "2020-08-24T21:47:22.159Z",
      code: "PS749",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f442dacc53b370009b9b9b2",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-08-24T21:47:27.957Z",
    code: "PO270",
    validFor: {
      startDateTime: "2020-08-24T21:17:43.749Z",
      endDateTime: "2021-02-24T22:17:43.749Z",
    },
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f44347ac53b370009b9b9b8",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
    prodSpecCharUse: [
      {
        name: "Short Code",
        productSpecification: {
          id: "5f442dacc53b370009b9b9b2",
        },
        publicIdentifier: true,
      },
    ],
  },
  {
    id: "5f443607c53b370009b9b9c6",
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f4439d1c53b370009b9b9cc",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f443a0340fa540008bf4ede",
            "@type": "PolicyRule",
            name: "Cloud subscription fee policy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f443a0340fa540008bf4ede",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [],
        price: {
          unit: "IRR",
        },
        validFor: {
          startDateTime: "2020-08-24T21:17:43.749Z",
          endDateTime: "2021-02-24T22:17:43.749Z",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Subscription fee",
        description: "Subscription fee",
        lifecycleStatus: "Initial",
        version: "1",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Recurring",
        recurringChargePeriodType: "Monthly",
        recurringChargePeriodLength: 24,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [
          {
            id: "5f443c49c53b370009b9b9cf",
            action: "add",
          },
          {
            id: "5f443c49c53b370009b9b9d0",
            action: "modify",
          },
        ],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 9,
            taxAmount: {
              value: 0,
              unit: "IRR",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-08-24T22:16:41.859Z",
        code: "POP523",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f4439d1c53b370009b9b9cc",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    validFor: {
      startDateTime: "2020-08-24T21:17:43.749Z",
      endDateTime: "2021-02-24T22:17:43.749Z",
    },
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "modify", "delete", "nochange"],
          id: "5f443c50c53b370009b9b9d1",
          name: "CRM",
        },
      ],
    },
    name: "MTN Iran Cloud Storage A01",
    description: "MTN Iran Cloud Storage A01",
    isBundle: false,
    isSellable: true,
    version: "4",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f4435d3c53b370009b9b9c5",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: ["5f443626d1aff90008315d3d"],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-08-24T21:17:43.749Z",
        endDateTime: "2021-02-24T22:17:43.749Z",
      },
      name: "MTN Iran Cloud Storage A01 product spefication",
      description: "MTN Iran Cloud Storage A01",
      isBundle: false,
      lifecycleStatus: "Launched",
      version: "9",
      "@type": "NetworkProductSpec",
      "@baseType": "AtomicProductSpecification",
      LoB: "DigitalServices",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [
        {
          valueType: "number",
          name: "Disk Space",
          description: "Disk Space",
          configurable: true,
          "@type": "Number",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "",
          extensible: false,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "number",
              unitOfMeasure: "TB",
            },
          ],
        },
        {
          valueType: "number",
          name: "Number of user account",
          description: "Number of user account",
          configurable: true,
          "@type": "Number",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "",
          extensible: false,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "number",
              isDefault: false,
            },
          ],
        },
        {
          valueType: "string",
          name: "Email address as service identifier",
          description: "Email address as service identifier",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
          extensible: false,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "string",
            },
          ],
        },
      ],
      lastUpdate: "2020-08-24T22:16:42.181Z",
      code: "PS750",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f4435d3c53b370009b9b9c5",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-08-24T22:16:48.472Z",
    code: "PO271",
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f443607c53b370009b9b9c6",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f452e06c53b370009b9b9dc",
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f452d81c53b370009b9b9db",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [],
        price: {
          value: 10000,
          unit: "IRR",
        },
        validFor: {
          startDateTime: "2020-08-25T15:11:14.788Z",
          endDateTime: "2021-02-25T16:11:14.788Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "New price",
        description: "description",
        lifecycleStatus: "Launched",
        version: "3",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 9,
            taxAmount: {
              value: 900,
              unit: "IRR",
            },
          },
        ],
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-08-25T15:35:00.063Z",
        code: "POP525",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f452d81c53b370009b9b9db",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    validFor: {
      startDateTime: "2020-08-24T21:17:43.749Z",
      endDateTime: "2021-02-24T22:17:43.749Z",
    },
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "modify", "delete", "nochange"],
          id: "5f452e06c53b370009b9b9dd",
          name: "CRM",
        },
      ],
    },
    name: "MTN Iran Cloud Storage A02",
    description: "MTN Iran Cloud Storage A02",
    isBundle: false,
    isSellable: true,
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    code: "PO271",
    productSpecification: {
      id: "5f452ac3c53b370009b9b9d5",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f452b24c53b370009b9b9d6",
          name: "MTN Iran Cloud Storage A02 Installation product spefication",
          version: "4",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f452b24c53b370009b9b9d6",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f452baac53b370009b9b9d7",
          name: "MTN Iran Cloud Storage A02 provisioning product spefication",
          "@type": "FieldOperationProductSpec",
          version: "7",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f452baac53b370009b9b9d7",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-07-24T19:30:00.000Z",
        endDateTime: "2021-02-25T20:30:00.000Z",
      },
      name: "MTN Iran Cloud Storage Composite A02",
      description: "MTN Iran Cloud Storage Composite A02",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "12",
      "@type": "CompositeProductSpecification",
      "@baseType": "AtomicProductSpecification",
      LoB: "DigitalServices",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [],
      lastUpdate: "2020-08-25T15:35:04.000Z",
      code: "PS751",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f452ac3c53b370009b9b9d5",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-08-25T15:35:04.076Z",
    version: "3",
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f452e06c53b370009b9b9dc",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f455a01c53b370009b9b9e3",
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f455c33c53b370009b9b9e7",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [],
        price: {
          unit: "IRR",
          value: 10,
        },
        validFor: {
          startDateTime: "2020-08-25T18:22:20.189Z",
          endDateTime: "2021-02-25T19:22:20.189Z",
        },
        "@type": "SimpleUsageProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Charge",
        description: "Charge",
        lifecycleStatus: "Launched",
        version: "5",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "SimpleUsage",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 9,
            taxAmount: {
              value: 0.9,
              unit: "IRR",
            },
          },
        ],
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-24T10:10:04.863Z",
        code: "POP527",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f455c33c53b370009b9b9e7",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f6c701e659a1c0009ad846d",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:14",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 700,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-09-24T10:07:37.891Z",
          endDateTime: "2021-09-30T10:07:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Connection Fee",
        lifecycleStatus: "Launched",
        version: "5",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 35,
              unit: "GHS",
            },
          },
        ],
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-24T10:10:04.939Z",
        code: "POP691",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f6c701e659a1c0009ad846d",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    validFor: {
      startDateTime: "2020-08-25T18:22:20.189Z",
      endDateTime: "2022-08-30T19:22:00.000Z",
    },
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "modify", "nochange", "delete"],
          id: "5f6c714e659a1c0009ad8475",
          name: "CRM",
        },
      ],
    },
    name: "MTN Ghana M2M A01",
    description: "MTN Ghana M2M A01",
    isBundle: false,
    isSellable: true,
    version: "10",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f4559a7c53b370009b9b9e2",
      businessType: ["Postpaid"],
      technology: ["M2M"],
      resourceSpecification: [],
      serviceSpecification: ["5f455a1dd1aff90008315d44"],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-08-25T18:22:20.189Z",
        endDateTime: "2021-02-25T19:22:20.189Z",
      },
      name: "MTN Ghana M2M",
      description: "MTN Ghana M2M A01",
      isBundle: false,
      lifecycleStatus: "Launched",
      version: "14",
      "@type": "NetworkProductSpec",
      "@baseType": "AtomicProductSpecification",
      LoB: "M2M",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [
        {
          valueType: "number",
          name: "Credit Limit",
          description: "Credit Limit",
          configurable: true,
          "@type": "Number",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          regex: "",
          extensible: true,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "number",
              isDefault: true,
            },
          ],
        },
      ],
      lastUpdate: "2020-09-24T10:38:03.033Z",
      code: "PS754",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f4559a7c53b370009b9b9e2",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-09-24T10:13:34.033Z",
    code: "PO2726",
    pendingLifecycleStatus: "",
    externalSystem: [
      {
        id: "c9d44b5f-5136-4e9b-a966-ce84d6faeabc",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f455a01c53b370009b9b9e3",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f46607455f2b000094305b4",
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f46614e55f2b000094305c1",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [],
        price: {
          value: 20,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-08-26T13:05:40.584Z",
          endDateTime: "2021-02-26T14:05:40.584Z",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "New price",
        description: "description",
        lifecycleStatus: "Launched",
        version: "1",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Recurring",
        recurringChargePeriodType: "Monthly",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 9,
            taxAmount: {
              value: 1.8,
              unit: "GHS",
            },
          },
        ],
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-08T14:00:51.357Z",
        code: "POP552",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f46614e55f2b000094305c1",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    validFor: {
      startDateTime: "2020-08-28T19:30:00.000Z",
      endDateTime: "2020-12-25T20:30:00.000Z",
    },
    allowedProductAction: {
      channels: [],
    },
    name: "MTN Ghana SIP Link A03",
    description: "MTN Ghana SIP Link A03 dd",
    isBundle: false,
    isSellable: true,
    version: "6",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f45692dc53b370009b9b9fc",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: ["5f456a3bd1aff90008315d5e"],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-08-19T10:39:56.703Z",
        endDateTime: "2021-02-19T11:39:56.703Z",
      },
      name: "MTN Ghana SIP Link A01 product",
      description: "MTN Ghana SIP Link A01 product",
      isBundle: false,
      lifecycleStatus: "Initial",
      "@type": "NetworkProductSpec",
      "@baseType": "AtomicProductSpecification",
      productSpecificationRelationship: [],
      LoB: "DigitalServices",
      productSpecCharacteristic: [
        {
          valueType: "string",
          name: "Backhaul Solution",
          description: "Backhaul Solution",
          configurable: true,
          "@type": "string",
          minCardinality: 1,
          maxCardinality: 1,
          isUnique: false,
          regex: "",
          extensible: false,
          productSpecCharacteristicValue: [
            {
              valueType: "string",
              "@type": "Backhaul type",
              value: "Leased Line",
              isDefault: true,
            },
            {
              valueType: "string",
              "@type": "Backhaul type",
              value: "FBB",
            },
            {
              valueType: "string",
              "@type": "Backhaul type",
              value: "Turbonet",
            },
          ],
          ProductSpecCharRelationship: [],
        },
        {
          valueType: "number",
          name: "Bandwidth",
          description: "Bandwidth",
          configurable: true,
          "@type": "string",
          minCardinality: 1,
          maxCardinality: 1,
          isUnique: false,
          regex: "",
          extensible: false,
          productSpecCharacteristicValue: [
            {
              valueType: "number",
              "@type": "Bandwidth",
              unitOfMeasure: "MBPS",
            },
          ],
          ProductSpecCharRelationship: [],
        },
        {
          valueType: "number",
          name: "Number of DID's",
          description: "Number of DID's.",
          configurable: true,
          "@type": "string",
          minCardinality: 1,
          maxCardinality: 1,
          isUnique: false,
          regex: "",
          extensible: false,
          productSpecCharacteristicValue: [
            {
              valueType: "number",
              "@type": "Number of DID's",
              unitOfMeasure: "",
            },
          ],
          ProductSpecCharRelationship: [],
        },
        {
          valueType: "string",
          name: "Hosted services",
          description: "Hosted services",
          configurable: true,
          "@type": "string",
          isUnique: false,
          regex: "",
          extensible: false,
          productSpecCharacteristicValue: [
            {
              valueType: "string",
              "@type": "Hosted service",
              unitOfMeasure: "",
              value: "Extensions",
              isDefault: false,
            },
            {
              valueType: "string",
              "@type": "Hosted service",
              value: "IVR",
            },
            {
              valueType: "string",
              "@type": "Hosted service",
              value: "Call Centre",
            },
            {
              valueType: "string",
              "@type": "Hosted service",
              value: "Conference Bridge",
            },
            {
              valueType: "string",
              "@type": "Hosted service",
              value: "Video Calling",
            },
          ],
          ProductSpecCharRelationship: [],
        },
        {
          valueType: "number",
          name: "Number of extension",
          description: "Number of extension",
          configurable: true,
          "@type": "Number",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "",
          extensible: false,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "number",
            },
          ],
        },
        {
          valueType: "boolean",
          name: "Boolean Test",
          description: "Boolean Test",
          configurable: true,
          "@type": "Boolean",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "",
          extensible: false,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "boolean",
              unitOfMeasure: "111",
              value: true,
            },
            {
              valueType: "boolean",
              unitOfMeasure: "222",
              value: true,
            },
            {
              valueType: "boolean",
              unitOfMeasure: "333",
            },
            {
              valueType: "boolean",
              unitOfMeasure: "444",
            },
            {
              valueType: "boolean",
              unitOfMeasure: "555",
            },
          ],
        },
      ],
      lastUpdate: "2020-09-09T12:42:02.359Z",
      code: "PS758",
      version: "34",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f45692dc53b370009b9b9fc",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-09-08T14:00:51.437Z",
    code: "PO275",
    pendingLifecycleStatus: "",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f46607455f2b000094305b4",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f4665a455f2b000094305c5",
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5d0ca89fa9060a9e0988c380",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5d0ca89fa9060a9e0988c380",
        lastUpdate: "2020-10-11T11:00:44.613Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for Plan offerings",
        lifecycleStatus: "Active",
        version: "1",
        "@type": "Category",
        productOffering: [],
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5f59f751394b7ed8817bf842",
        href: "",
        name: "NGO",
        "@referredType": "Corporate",
      },
      {
        id: "5f59f77b394b7ed8817bf8d9",
        href: "",
        name: "Large Corporate",
        "@referredType": "Corporate",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f474d3655f2b000094305d9",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f71cdb3b764430008294bec",
            "@type": "PolicyRule",
            name: "Edifice Pricing Policy New",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f71cdb3b764430008294bec",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "b8cf9f7d-47a7-45fd-a120-2a631352b832",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:40:30",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 700,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-08-27T05:47:32.389Z",
          endDateTime: "2021-02-27T05:47:32.389Z",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Rental Charges",
        lifecycleStatus: "Launched",
        version: "32",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Recurring",
        recurringChargePeriodType: "Monthly",
        recurringChargePeriodLength: 12,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 7,
            taxAmount: {
              value: 49,
              unit: "GHS",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-08T11:37:13.533Z",
        code: "POP558",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f474d3655f2b000094305d9",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f7d5bb52427a10008beed43",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7d5be6a3029700065482d9",
            "@type": "OverrideRule",
            name: "Overrideedificenew",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7d5be6a3029700065482d9",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:14",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 300,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-10-07T06:09:01.172Z",
          endDateTime: "2021-06-30T06:09:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Subscription Fee",
        lifecycleStatus: "Launched",
        version: "14",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        tax: [],
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-08T11:35:52.615Z",
        code: "POP720",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7d5bb52427a10008beed43",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    validFor: {
      startDateTime: "2020-08-26T06:15:26.861Z",
      endDateTime: "2020-12-25T18:30:00.000Z",
    },
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "modify", "delete", "nochange"],
          id: "5f7ecc9a2427a10008beedb5",
          name: "CRM",
        },
        {
          allowedActionType: ["modify", "delete", "nochange"],
          id: "5f7ecc9a2427a10008beedb6",
          name: "Selfcare",
        },
      ],
    },
    name: "MTNG AT EB Edifice USSD",
    description: "USSD Service for MTNG",
    isBundle: false,
    isSellable: true,
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    code: "PO2660",
    productSpecification: {
      id: "5f60664e90e93f00092890a9",
      businessType: ["Postpaid"],
      technology: ["USSD"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f606fe790e93f00092890b3",
          name: "MTNG AT Digital Message Spec",
          version: "87",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f606fe790e93f00092890b3",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7db9212427a10008beed73",
          name: "Manual Provisioning",
          version: "12",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7db9212427a10008beed73",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7db94e2427a10008beed74",
          name: "Customer UAT Acceptance",
          version: "13",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7db94e2427a10008beed74",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-09-15T06:59:06.589Z",
        endDateTime: "2020-09-15T06:59:06.597Z",
      },
      name: "MTNG AT EB USSD Composite Spec",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "46",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      LoB: "DigitalServices",
      productSpecificationRelationship: [
        {
          id: "5f6c79db659a1c0009ad8478",
          name: "USSD VAS 400",
          validFor: {
            startDateTime: "2020-09-24T10:51:20.350Z",
            endDateTime: "2021-12-31T10:51:00.000Z",
          },
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f6c79db659a1c0009ad8478",
          type: "addon",
        },
      ],
      productSpecCharacteristic: [],
      lastUpdate: "2020-10-08T08:24:32.754Z",
      code: "PS900",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f60664e90e93f00092890a9",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-10-08T08:23:54.435Z",
    version: "37",
    externalSystem: [
      {
        id: "f16a969c-6333-4d38-9fe7-6012233a2707",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f4665a455f2b000094305c5",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f478a4c873bf60009b93262",
    businessType: ["Postpaid"],
    place: [
      {
        id: "5f45140b80fb8500094bd431",
        address: [
          {
            id: "5f3cd7c4f5e935000646a9b7",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/address-service/v1/address/5f3cd7c4f5e935000646a9b7",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/address-service/schema/v1/address",
          },
        ],
        geographicLocation: ["5f3cd937f5e935000646a9b9"],
        geographicSite: [
          {
            id: "5f3ce280f5e935000646a9bb",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/address-service/v1/geographic-site/5f3ce280f5e935000646a9bb",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/address-service/schema/v1/geographic-site",
          },
        ],
        name: "Bordeaux",
        lastUpdate: "2020-08-25T13:37:15.321Z",
        version: 0,
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/place/5f45140b80fb8500094bd431",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/place",
      },
    ],
    category: [
      {
        id: "5cfa5245a9060a9e0960beb9",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5cfa5245a9060a9e0960beb9",
        lastUpdate: "2020-10-11T11:00:42.124Z",
        parentId: "",
        isRoot: true,
        name: "Broadband",
        description: "A category for broadband",
        lifecycleStatus: "Active",
        version: "1",
        "@type": "Category",
        productOffering: [],
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [
      {
        id: "5f478af0feb1bc00081cc459",
        "@baseType": "Agreement",
        name: "Reliable Leased Line - Gold Agreement",
        description: "Master Agreement",
        characteristic: [],
        agreementAuthorization: [],
        engagedPartyRole: [],
        associatedAgreement: [],
        agreementItem: [],
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5f478af0feb1bc00081cc459",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
      },
      {
        id: "5f478af0feb1bc00081cc457",
        "@baseType": "Agreement",
        name: "Reliable Leased Line - Platinum agreement",
        description: "Description",
        characteristic: [
          {
            id: "5f478af0feb1bc00081cc458",
            name: "24x7 Support",
            value: "24x7 Support",
          },
        ],
        agreementAuthorization: [],
        documentNumber: "83884884",
        engagedPartyRole: [],
        associatedAgreement: [],
        agreementItem: [],
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5f478af0feb1bc00081cc457",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
      },
    ],
    marketSegment: [
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5f478ae9873bf60009b9326a",
        duration: {
          units: "months",
          amount: 12,
        },
        validFor: {
          startDateTime: "2020-08-22T08:14:48.718Z",
          endDateTime: "2021-02-22T09:14:48.718Z",
        },
        name: "Reliable Leased Line - 1 Year",
        description: "1 Year",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f478ae9873bf60009b9326a",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
      {
        id: "5f478ae9873bf60009b93269",
        duration: {
          units: "months",
          amount: 24,
        },
        validFor: {
          startDateTime: "2020-08-22T09:11:43.078Z",
          endDateTime: "2021-02-22T10:11:43.078Z",
        },
        name: "Reliable Leased Line - 2 year Term",
        description: "2 Year Term",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f478ae9873bf60009b93269",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f478ae9873bf60009b93264",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f478ae840fa540008bf4ee9",
            "@type": "PolicyRule",
            name: "Reliable Leased Line - Price of sites",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f478ae840fa540008bf4ee9",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Monthly Charges Rental",
            chargeClass: "Recurring",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "f82ea115-9ad1-4934-bf39-05edd641e99f",
            glCode: "842988",
            time: "2020-07-16T06:01:23",
          },
        ],
        name: "Monthly Rental",
        description: "Ghana version of the Leased Line Connection.",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-08-05T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "Recurring",
        percentage: 0,
        price: {
          value: 2102,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 0,
              unit: "GHS",
            },
            taxCategory: "VAT",
            taxRate: 0,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-08-27T10:45:37.240Z",
        code: "POP560",
        version: "7",
        unitOfMeasure: "Currency",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f478ae9873bf60009b93264",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f478ae9873bf60009b93265",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f478ae840fa540008bf4eea",
            "@type": "PolicyRule",
            name: "Reliable Leased Line - Ghana LL penalty",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f478ae840fa540008bf4eea",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "PenaltyOnetime",
            chargeClass: "OneTime",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "5ad171cf-e6e6-45c6-89b0-b57f9be084bc",
            glCode: "842988",
            time: "2020-08-25T07:31:59",
          },
        ],
        validFor: {
          startDateTime: "2020-08-07T09:16:56.797Z",
          endDateTime: "2021-02-07T10:16:56.797Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Penalty Charges",
        description: "description",
        lifecycleStatus: "Launched",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Penalty",
        percentage: 0,
        prodOfferPriceAction: [
          {
            id: "5f478ed8873bf60009b93272",
            action: "delete",
          },
        ],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 0,
            taxAmount: {
              value: 0,
              unit: "GHS",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-08-27T10:45:44.731Z",
        code: "POP560",
        version: "4",
        price: {
          value: 250,
          unit: "GHS",
        },
        unitOfMeasure: "Currency",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f478ae9873bf60009b93265",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f478ae9873bf60009b93266",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "3e65ca6b-0f31-4568-a81b-32054af22cb1",
            glCode: "842988",
            time: "2020-07-16T06:03:45",
          },
        ],
        validFor: {
          startDateTime: "2020-08-22T09:16:43.158Z",
          endDateTime: "2021-02-22T10:16:43.158Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Gold Agreement Price",
        description: "Gold Agreement Price",
        lifecycleStatus: "Launched",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        percentage: 0,
        agreementCharValueUse: [
          {
            id: "5f478e8d873bf60009b93270",
            agreement: {
              id: "5f40e1f5feb1bc00081cc442",
              name: "Platinum agreement",
              version: "0.1",
              href:
                "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5f40e1f5feb1bc00081cc442",
              "@schemaLocation":
                "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
            },
            characteristic: [
              {
                id: "5f478e8d873bf60009b93271",
                name: "24x7 Support",
                value: "24x7 Support",
              },
            ],
          },
        ],
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        lastUpdate: "2020-08-27T10:44:29.811Z",
        code: "POP561",
        version: "5",
        price: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f478ae9873bf60009b93266",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f648665f0730c00097d8c65",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f6486b75fca5d00064a7137",
            "@type": "OverrideRule",
            name: "Overridepolicyreliable",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f6486b75fca5d00064a7137",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:14",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 549,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-09-18T10:04:25.799Z",
          endDateTime: "2021-12-31T10:04:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Connection Fee",
        lifecycleStatus: "Initial",
        version: "2",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-18T10:07:09.199Z",
        code: "POP663",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f648665f0730c00097d8c65",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    validFor: {
      startDateTime: "2020-08-26T18:30:00.000Z",
      endDateTime: "2022-12-30T18:30:00.000Z",
    },
    allowedProductAction: {
      channels: [],
    },
    name: "Reliable Leased Line gh",
    description: "Leased line service for MTNG",
    isBundle: false,
    isSellable: true,
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    code: "PO29",
    productSpecification: {
      id: "5f478a2d873bf60009b93261",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: ["5f478ae565e936000657f6f8"],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-08-26T18:30:00.000Z",
        endDateTime: "2022-12-30T18:30:00.000Z",
      },
      name: "Reliable Leased Line",
      description: "DCM-536",
      isBundle: false,
      lifecycleStatus: "Launched",
      "@type": "CompositeProductSpecification",
      "@baseType": "AtomicProductSpecification",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [
        {
          valueType: "number",
          name: "Site Count",
          description: "Number of sites",
          configurable: true,
          "@type": "number",
          isUnique: true,
          regex: "",
          extensible: true,
          productSpecCharacteristicValue: [
            {
              valueType: "number",
            },
          ],
          ProductSpecCharRelationship: [],
        },
        {
          name: "Region type",
          description: "Region type",
          valueType: "string",
          configurable: true,
          "@type": "string",
          minCardinality: 1,
          maxCardinality: 1,
          isUnique: false,
          regex: "",
          extensible: false,
          productSpecCharacteristicValue: [
            {
              valueType: "string",
              value: "Inter",
              "@type": "Region type",
              isDefault: true,
            },
            {
              valueType: "string",
              "@type": "Region type",
              value: "Intra",
            },
          ],
          ProductSpecCharRelationship: [],
        },
        {
          valueType: "string",
          name: "Industry type",
          configurable: false,
          "@type": "string",
          minCardinality: 1,
          maxCardinality: -3,
          isUnique: false,
          regex: "",
          extensible: false,
          productSpecCharacteristicValue: [
            {
              valueType: "string",
              "@type": "Industry type",
              value: "NGO",
              isDefault: true,
            },
            {
              valueType: "string",
              "@type": "Industry type",
              value: "Large corporate",
            },
            {
              valueType: "string",
              "@type": "Industry type",
              value: "SME",
            },
            {
              valueType: "string",
              "@type": "Industry type",
              value: "Wholesale",
            },
          ],
          ProductSpecCharRelationship: [],
        },
        {
          valueType: "number",
          name: "Contract period",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "",
          extensible: true,
          productSpecCharacteristicValue: [
            {
              valueType: "number",
              "@type": "Contract period",
              value: 1,
              unitOfMeasure: "Year",
              isDefault: true,
            },
            {
              valueType: "number",
              value: 2,
              isDefault: false,
              unitOfMeasure: "Years",
            },
            {
              valueType: "number",
              value: 3,
              unitOfMeasure: "Years",
            },
          ],
          ProductSpecCharRelationship: [],
        },
        {
          valueType: "number",
          name: "Capacity",
          description: "description",
          configurable: true,
          "@type": "string",
          isUnique: false,
          regex: "",
          extensible: true,
          productSpecCharacteristicValue: [
            {
              valueType: "number",
              "@type": "Capacity",
              value: 512,
              unitOfMeasure: "Kbps",
              isDefault: true,
            },
            {
              valueType: "number",
              value: 1,
              unitOfMeasure: "Mbps",
            },
            {
              valueType: "number",
              value: 2,
              unitOfMeasure: "Mbps",
            },
          ],
          ProductSpecCharRelationship: [],
        },
        {
          name: "Last mile",
          description:
            "§  Choice of Microwave/Fibre is based on the capacity requested and the cost considerations that the customer has.\n§  The channel/technology enabled between the site to site connectivity.\n§  System should allow selection of Last Mile with either of the channel.",
          valueType: "string",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: -12,
          isUnique: false,
          regex: "",
          extensible: false,
          productSpecCharacteristicValue: [
            {
              valueType: "string",
              "@type": "Last mile",
              value: "Fibre",
              isDefault: true,
            },
            {
              valueType: "string",
              "@type": "Last mile",
              value: "Microwave",
            },
          ],
          ProductSpecCharRelationship: [],
        },
      ],
      lastUpdate: "2020-09-22T10:53:31.351Z",
      code: "PS775",
      version: "20",
      LoB: "ICTServices",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f478a2d873bf60009b93261",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-09-18T10:05:40.257Z",
    version: "10",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f478a4c873bf60009b93262",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f480116a5fa520009214cb9",
    businessType: ["Postpaid"],
    place: [
      {
        id: "5f5228e0394b7ed88163285a",
        name: "Accra",
        address: [
          {
            id: "5f5229d1394b7ed881632ca5",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/address-service/v1/address/5f5229d1394b7ed881632ca5",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/address-service/schema/v1/address",
          },
        ],
        lastUpdate: "2020-08-25T13:37:15.321Z",
        version: 1,
        geographicSite: [],
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/place/5f5228e0394b7ed88163285a",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/place",
      },
    ],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [
      {
        id: "5f480117feb1bc00081cc45a",
        "@baseType": "Agreement",
        name: "Diligent Internet Service - MPLS Agreement",
        description:
          "The contract period for which customer is bound to use the service.\nContract period need to hold the value in Years. Ex. 12, 24\n Minimum contract period for such service will be 1 Year.\nAfter contract period ends subscriber can continue or terminate the service at any time without any penalty fee.\nNotification and Reports need to be enabled for KAM, providing the list of Corporates whose contracts is about to expire.",
        type: "Commercial",
        characteristic: [
          {
            id: "5f480117feb1bc00081cc45b",
            name: "Platinum",
            value: "24x7",
          },
          {
            id: "5f480117feb1bc00081cc45c",
            name: "Gold",
            value: "8x5",
          },
          {
            id: "5f480117feb1bc00081cc45d",
            name: "Silver",
            value: "On Demand",
          },
        ],
        agreementAuthorization: [],
        engagedPartyRole: [],
        associatedAgreement: [],
        agreementItem: [],
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5f480117feb1bc00081cc45a",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
      },
    ],
    marketSegment: [
      {
        id: "5d4bdbff528c2425c23289b5",
        name: "Individual Customer",
        code: "I",
        "@referredType": "Retail",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38892b83ba2e1cba2de87b",
        href: "https://host:port/catalogManagement/channel/2",
        name: "Webshop",
        "@referredType": "CRM",
      },
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5f6aed17659a1c0009ad8416",
        duration: {
          units: "months",
          amount: 12,
        },
        name: "Contract Period - 12 months",
        description: "Contract Period - 12 months",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f6aed17659a1c0009ad8416",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
      {
        id: "5f6aed2c659a1c0009ad8417",
        duration: {
          units: "months",
          amount: 24,
        },
        name: "Contract Period - 24 months",
        description: "Contract Period - 24 months",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f6aed2c659a1c0009ad8417",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f480114a5fa520009214cb8",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7c95e20c9e6d000a17195d",
            "@type": "PolicyRule",
            name: "Dynamicdiligent",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7c95e20c9e6d000a17195d",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Monthly Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "3c6de6de-9f41-490d-961b-0d8fb5f81476",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:01",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        name: "Rental Charges",
        description: "MTN Ghana Dedicated internet for Industry",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-01T00:00:00.000Z",
          endDateTime: "2023-09-01T00:00:00.000Z",
        },
        priceType: "Rental",
        percentage: 0,
        price: {
          unit: "GHS",
          value: 1400,
        },
        tax: [
          {
            taxAmount: {
              value: 42,
              unit: "GHS",
            },
            taxCategory: "VAT",
            taxRate: 3,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        unitOfMeasure: "Currency",
        agreementCharValueUse: [],
        lastUpdate: "2020-10-06T16:11:45.240Z",
        code: "POP571",
        version: "25",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f480114a5fa520009214cb8",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f55b6bd3aba740009ae3157",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:14",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 99,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-09-07T04:20:14.324Z",
          endDateTime: "2021-03-07T04:20:14.324Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Change Plan Fee",
        lifecycleStatus: "Launched",
        version: "12",
        isBundle: false,
        isServiceActionPrice: true,
        priceType: "Fee",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [
          {
            id: "5f6adcb7659a1c0009ad83f6",
            action: "modify",
          },
        ],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 0,
            taxAmount: {
              value: 0,
              unit: "GHS",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-23T05:27:19.494Z",
        code: "POP595",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f55b6bd3aba740009ae3157",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f59fd7e4efb45000892a5bd",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7c98b40c9e6d000a17195e",
            "@type": "OverrideRule",
            name: "OverrideDiligent",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7c98b40c9e6d000a17195e",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:14",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 390,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-09-10T10:17:00.000Z",
          endDateTime: "2021-05-31T10:17:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Subscription Fee",
        lifecycleStatus: "Launched",
        version: "12",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 19.5,
              unit: "GHS",
            },
          },
        ],
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-06T16:18:02.177Z",
        code: "POP629",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f59fd7e4efb45000892a5bd",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    allowedProductAction: {
      channels: [],
    },
    name: "Diligent Dedicated Internet Service ",
    description: "Dedicated  Dedicated bandwidth service",
    isBundle: false,
    isSellable: true,
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-09-01T00:00:00.000Z",
      endDateTime: "2023-09-01T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    code: "PO2221",
    productSpecification: {
      id: "5f61f98290e93f00092890ef",
      businessType: ["Postpaid"],
      technology: ["DedicatedInternet"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f69eb92659a1c0009ad83e8",
          name: "Manual Provisioning",
          version: "15",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f69eb92659a1c0009ad83e8",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f69ec82659a1c0009ad83ea",
          name: "Internet Service",
          version: "29",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f69ec82659a1c0009ad83ea",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7c97d9bac0ae00071bacea",
          name: "Site Address",
          version: "6",
          "@type": "SiteProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7c97d9bac0ae00071bacea",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7eba412427a10008beed91",
          name: "Customer UAT Acceptance",
          version: "5",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7eba412427a10008beed91",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-09-16T11:39:19.835Z",
        endDateTime: "2021-07-31T11:39:00.000Z",
      },
      name: "Diligent",
      description: "Description",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "32",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [],
      lastUpdate: "2020-10-08T19:12:49.843Z",
      code: "PS909",
      LoB: "ICTServices",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f61f98290e93f00092890ef",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-10-08T19:12:50.546Z",
    version: "25",
    externalSystem: [
      {
        id: "b2fae091-bc90-4569-9999-3a52efb78c60",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f480116a5fa520009214cb9",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f4f3bd780c3df000782591e",
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [
      {
        id: "5f4f3bd78c966a00095596d0",
        "@baseType": "Agreement",
        name: "Enterprise Co-Location Service gh - Contract",
        characteristic: [
          {
            id: "5f5be803d1347400093aaef2",
            name: "Platinum",
            value: "24x7 Support",
          },
          {
            id: "5f5be803d1347400093aaef3",
            name: "Gold",
            value: "5 x 8 Support",
          },
        ],
        agreementAuthorization: [],
        type: "Commercial",
        engagedPartyRole: [],
        associatedAgreement: [],
        agreementItem: [],
        agreementPeriod: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5f4f3bd78c966a00095596d0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
      },
    ],
    marketSegment: [
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f4f3bd580c3df000782591c",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Advance Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "e5b1f20f-9a23-4cd7-8dbb-ed93c84a4022",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:35",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        validFor: {
          startDateTime: "2020-08-10T06:20:47.788Z",
          endDateTime: "2021-10-31T07:20:00.000Z",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Enterprise Co-Location Service gh - Co-location price",
        description: "description",
        lifecycleStatus: "Launched",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Recurring",
        percentage: 0,
        prodOfferPriceAction: [],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 90,
              unit: "GHS",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-24T10:05:06.132Z",
        code: "POP583",
        version: "14",
        price: {
          value: 1800,
          unit: "GHS",
        },
        recurringChargePeriodLength: 12,
        recurringChargePeriodType: "Monthly",
        unitOfMeasure: "Currency",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f4f3bd580c3df000782591c",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f4f3bd580c3df000782591d",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:14",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        validFor: {
          startDateTime: "2020-08-12T06:27:05.279Z",
          endDateTime: "2021-02-12T07:27:05.279Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Enterprise Co-Location Service gh - Penalty",
        description: "description",
        lifecycleStatus: "Launched",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        percentage: 0,
        prodOfferPriceAction: [
          {
            id: "5f6c6f29659a1c0009ad8469",
            action: "delete",
          },
        ],
        tax: [
          {
            taxCategory: "VAT",
            taxAmount: {
              value: 0,
              unit: "GHS",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-24T10:05:06.138Z",
        code: "POP583",
        version: "15",
        price: {
          value: 450,
          unit: "GHS",
        },
        unitOfMeasure: "Currency",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f4f3bd580c3df000782591d",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    bundledProductOffering: [],
    relatedParty: [],
    allowedProductAction: {
      channels: [],
    },
    name: "Enterprise Co-Location Service gh",
    description: "Enterprise Co-Location Service for MTNG",
    isBundle: false,
    isSellable: true,
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    code: "PO20411",
    validFor: {
      startDateTime: "2020-08-05T00:00:00.000Z",
      endDateTime: "2022-01-31T09:39:00.000Z",
    },
    productSpecification: {
      id: "5f4f3bd480c3df000782591b",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: ["5f4f3bd363cb840009a86a9a"],
      bundledProductSpecification: [],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-08-05T00:00:00.000Z",
        endDateTime: "2020-12-31T00:00:00.000Z",
      },
      name: "Datacenter",
      description: "Server Rack Space\nDCM-538",
      isBundle: false,
      lifecycleStatus: "Launched",
      "@type": "CompositeProductSpecification",
      "@baseType": "AtomicProductSpecification",
      productSpecificationRelationship: [],
      LoB: "ICTServices",
      brand: "",
      productNumber: "1",
      productSpecCharacteristic: [
        {
          valueType: "number",
          name: "Unit count",
          description: "\n",
          configurable: true,
          minCardinality: 1,
          maxCardinality: 1,
          isUnique: false,
          regex: "",
          extensible: false,
          productSpecCharacteristicValue: [
            {
              valueType: "number",
              "@type": "Unit count",
            },
          ],
          ProductSpecCharRelationship: [],
        },
        {
          name: "MTN Server",
          valueType: "string",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: false,
          regex: "",
          extensible: false,
          productSpecCharacteristicValue: [
            {
              valueType: "string",
              "@type": "MTN Server",
              value: "Yes",
              isDefault: true,
            },
            {
              valueType: "string",
              "@type": "MTN Server",
              value: "No",
            },
          ],
          ProductSpecCharRelationship: [],
        },
        {
          valueType: "number",
          name: "Storage Capacity",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          regex: "",
          extensible: true,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "number",
              value: 100,
              unitOfMeasure: "TB",
              isDefault: true,
            },
            {
              valueType: "number",
              value: 200,
              unitOfMeasure: "TB",
            },
            {
              valueType: "number",
              value: 300,
              unitOfMeasure: "TB",
            },
          ],
        },
        {
          valueType: "number",
          name: "Processing Capacity",
          configurable: true,
          "@type": "string",
          minCardinality: 0,
          maxCardinality: 0,
          isUnique: true,
          regex: "",
          extensible: true,
          ProductSpecCharRelationship: [],
          productSpecCharacteristicValue: [
            {
              valueType: "number",
              value: 3.2,
              unitOfMeasure: "Ghz",
              isDefault: true,
            },
            {
              valueType: "number",
              value: 5,
              unitOfMeasure: "GHz",
            },
            {
              valueType: "number",
              value: 8.7,
              unitOfMeasure: "Ghz",
            },
          ],
        },
      ],
      lastUpdate: "2020-09-24T10:05:06.049Z",
      code: "PS803",
      version: "32",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f4f3bd480c3df000782591b",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    lastUpdate: "2020-09-24T10:05:06.161Z",
    version: "16",
    externalSystem: [
      {
        id: "cfd0b2ab-6299-4727-8123-2083dcd202b0",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f4f3bd780c3df000782591e",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f55fc703aba740009ae3163",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [
      {
        id: "5f3fc7e5feb1bc00081cc43f",
        "@baseType": "Agreement",
        agreementPeriod: {
          endDateTime: "2021-08-20T18:30:00.000Z",
        },
        name: "Contract Period",
        version: "0.1",
        characteristic: [
          {
            id: "5f439db6feb1bc00081cc44b",
            name: "Months",
            value: "12",
          },
        ],
        engagedPartyRole: [],
        associatedAgreement: [],
        agreementItem: [],
        agreementAuthorization: [],
        "@type": "DATA",
        type: "Legal",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5f3fc7e5feb1bc00081cc43f",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
      },
    ],
    marketSegment: [
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5d3887e883ba2e1cba2de4e6",
        name: "12 months contract",
        description: "12 months contract",
        duration: {
          amount: 12,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
      },
      {
        id: "5d3887f883ba2e1cba2de512",
        name: "24 months contract",
        description: "24 months contract",
        duration: {
          amount: 24,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f55fc6d3aba740009ae3161",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
          {
            id: "5d3887f883ba2e1cba2de512",
            name: "24 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887f883ba2e1cba2de512",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [
          {
            name: "Monthly Charges Rental",
            chargeClass: "Recurring",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "f82ea115-9ad1-4934-bf39-05edd641e99f",
            glCode: "842988",
            time: "2020-07-16T06:01:23",
            value: "Monthly Charges Rental",
            label: "Monthly Charges Rental",
            chargeType: "RecurringInAdvanceFixed",
            numberOfInstallments: "",
            periodicityExceptions: [],
          },
        ],
        name: "STC M2M Offer AdvancedRental",
        description: "STC M2M Offer",
        version: "4",
        lastUpdate: "2020-09-10T05:21:45.752Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-07T00:00:00.000Z",
          endDateTime: "2020-12-31T00:00:00.000Z",
        },
        priceType: "Rental",
        recurringChargePeriodType: "Monthly",
        recurringChargePeriodLength: 1,
        percentage: 0,
        price: {
          value: 10,
          unit: "KWD",
        },
        tax: [
          {
            taxAmount: {
              value: 0.5,
              unit: "KWD",
            },
            taxCategory: "VAT",
            taxRate: 5,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        code: "POP596",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f55fc6d3aba740009ae3161",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f59b68f89726b0007707c81",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "DeviceInstallment",
            chargeClass: "OneTime",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "9eb1a2a1-8f70-4bae-857e-0dccacdeea2d",
            glCode: "842988",
            time: "2020-08-25T07:31:20",
          },
        ],
        price: {
          value: 30,
          unit: "KWD",
        },
        validFor: {
          startDateTime: "2020-09-10T05:12:33.747Z",
          endDateTime: "2021-03-10T05:12:33.747Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "One Time Charge",
        lifecycleStatus: "Launched",
        version: "3",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 0,
            taxAmount: {
              value: 0,
              unit: "KWD",
            },
          },
        ],
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-10T05:16:27.972Z",
        code: "POP628",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f59b68f89726b0007707c81",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    relatedParty: [],
    name: "STC M2M Offer",
    description: "STC M2M Offer",
    isBundle: false,
    isSellable: true,
    version: "6",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-09-07T00:00:00.000Z",
      endDateTime: "2020-12-31T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-09-10T05:16:02.846Z",
    bundledProductOffering: [],
    serviceLevelAgreement: null,
    productSpecification: {
      id: "5f55fc6e3aba740009ae3162",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f55fc6d3aba740009ae315f",
          name: "MTN Iran APN Product",
          version: "5",
          "@type": "AtomicProductSpecification",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f55fc6d3aba740009ae315f",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f55fc6d3aba740009ae3160",
          name: "IPTV IP Address Product",
          version: "6",
          "@type": "AtomicProductSpecification",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f55fc6d3aba740009ae3160",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      name: "STC M2M Offer",
      description: "STC M2M Offer",
      version: "5",
      brand: "STC",
      LoB: "DigitalServices",
      isBundle: true,
      lastUpdate: "2020-09-10T05:16:02.158Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-09-07T00:00:00.000Z",
        endDateTime: "2020-12-31T00:00:00.000Z",
      },
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      productSpecCharacteristic: [],
      productSpecificationRelationship: [],
      code: "PS831",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f55fc6e3aba740009ae3162",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    code: "PO296",
    pendingLifecycleStatus: "",
    externalSystem: [
      {
        id: "cf651610-942a-4f52-9f35-4bb61df488d5",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f55fc703aba740009ae3163",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f5dbc3390e93f0009289050",
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f5dc22890e93f000928905d",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7443b40c9e6d000a171950",
            "@type": "OverrideRule",
            name: "Override Policy IranA01MMP",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7443b40c9e6d000a171950",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:14",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 10000,
          unit: "IRR",
        },
        validFor: {
          startDateTime: "2020-09-14T06:53:00.000Z",
          endDateTime: "2020-10-12T07:53:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Installation fee",
        description: "description",
        lifecycleStatus: "Launched",
        version: "13",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 7,
            taxAmount: {
              value: 700,
              unit: "IRR",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-30T08:37:11.273Z",
        code: "POP635",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f5dc22890e93f000928905d",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f5f2e6690e93f0009289079",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f5f2f4c5fca5d00064a712b",
            "@type": "PolicyRule",
            name: "USSD Subscription Policy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f5f2f4c5fca5d00064a712b",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Monthly Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "3c6de6de-9f41-490d-961b-0d8fb5f81476",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:01",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          unit: "IRR",
        },
        validFor: {
          startDateTime: "2020-09-14T08:46:00.000Z",
          endDateTime: "2020-12-31T09:46:00.000Z",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Subscription Fee",
        description: "Subscription Fee",
        lifecycleStatus: "Launched",
        version: "9",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Rental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 0,
              unit: "IRR",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-23T07:34:58.070Z",
        code: "POP640",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f5f2e6690e93f0009289079",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    relatedParty: [],
    validFor: {
      startDateTime: "2020-09-14T06:28:00.000Z",
      endDateTime: "2020-10-12T07:28:00.000Z",
    },
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "modify", "delete"],
          id: "5f6873590454730009cbdad3",
          name: "CRM",
        },
      ],
    },
    name: "USSD Iran A01",
    description: "USSD Iran A01",
    isBundle: false,
    isSellable: true,
    version: "15",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f5dbb7990e93f000928904f",
      businessType: ["Postpaid"],
      technology: ["USSD"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f5dbc7190e93f0009289052",
          name: "USSD Manual provisioning",
          version: "25",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f5dbc7190e93f0009289052",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f0f0b6df6645e0008b45c87",
          name: "Dedicated USSD",
          version: "77",
          "@type": "UsageVolumeProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f0f0b6df6645e0008b45c87",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f632bd590e93f00092890fe",
          name: "Customer UAT Acceptance",
          version: "18",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f632bd590e93f00092890fe",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      name: "USSD Iran A01 product spefication",
      description: "USSD Iran A01",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "24",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      LoB: "DigitalServices",
      productSpecificationRelationship: [
        {
          id: "5f6c79db659a1c0009ad8478",
          name: "USSD VAS 400",
          validFor: {
            startDateTime: "2020-09-24T10:51:20.350Z",
            endDateTime: "2021-12-31T10:51:00.000Z",
          },
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f6c79db659a1c0009ad8478",
          type: "addon",
        },
      ],
      productSpecCharacteristic: [],
      lastUpdate: "2020-09-28T13:25:14.380Z",
      code: "PS897",
      validFor: {
        startDateTime: "2020-09-13T06:27:00.000Z",
        endDateTime: "2020-10-13T07:27:00.000Z",
      },
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f5dbb7990e93f000928904f",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    bundledProductOffering: [],
    prodSpecCharValueUse: [],
    lastUpdate: "2020-09-21T09:33:13.469Z",
    code: "PO322",
    externalSystem: [
      {
        id: "933ec931-239a-4ca3-b0bc-1db0106d13e7",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f5dbc3390e93f0009289050",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f60933e90e93f00092890c4",
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f60933e90e93f00092890c1",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f60933d5fca5d00064a7130",
            "@type": "PolicyRule",
            name: "USSD Ghana A01 - USSD Subscription Policy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f60933d5fca5d00064a7130",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Connection Charges",
            chargeClass: "OneTime",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "3e65ca6b-0f31-4568-a81b-32054af22cb1",
            glCode: "842988",
            time: "2020-07-16T06:03:45",
          },
        ],
        price: {
          unit: "GHS",
          value: 2000,
        },
        validFor: {
          startDateTime: "2020-09-14T08:46:00.000Z",
          endDateTime: "2021-03-31T09:46:00.000Z",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Subscription Fee",
        description: "Subscription Fee",
        lifecycleStatus: "Launched",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [
          {
            id: "5f60968d90e93f00092890d1",
            action: "add",
          },
          {
            id: "5f60968d90e93f00092890d2",
            action: "modify",
          },
        ],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 0,
            taxAmount: {
              value: 0,
              unit: "GHS",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-15T10:26:30.174Z",
        code: "POP651",
        version: "7",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f60933e90e93f00092890c1",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f60953c90e93f00092890cb",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Monthly Charges Rental",
            chargeClass: "Recurring",
            taxPlanId: "5f0c70f0-7a96-410c-8e5f-f545c2f124d4",
            taxPlanName: "GST 7.5 Percentage",
            id: "f82ea115-9ad1-4934-bf39-05edd641e99f",
            glCode: "842988",
            time: "2020-07-16T06:01:23",
          },
        ],
        price: {
          value: 1499,
          unit: "GHS",
        },
        validFor: {
          startDateTime: "2020-09-15T10:19:11.271Z",
          endDateTime: "2021-05-31T10:19:00.000Z",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Rental Charges",
        lifecycleStatus: "Launched",
        version: "6",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Recurring",
        recurringChargePeriodType: "Monthly",
        recurringChargePeriodLength: 12,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 0,
            taxAmount: {
              value: 0,
              unit: "GHS",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-09-15T10:26:29.979Z",
        code: "POP652",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f60953c90e93f00092890cb",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    relatedParty: [],
    validFor: {
      startDateTime: "2020-09-14T06:28:00.000Z",
      endDateTime: "2021-07-31T07:28:00.000Z",
    },
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "modify", "delete"],
          id: "5f6096d690e93f00092890d7",
          name: "CRM",
        },
      ],
    },
    name: "USSD Ghana A01",
    description: "USSD offering for Ghana.",
    isBundle: false,
    isSellable: true,
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    code: "PO322",
    productSpecification: {
      id: "5f60933d90e93f00092890bd",
      businessType: ["Postpaid"],
      technology: ["USSD"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f60933d90e93f00092890be",
          name: "USSD Ghana A01 - USSD Manual provisioning",
          "@type": "FieldOperationProductSpec",
          version: "11",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f60933d90e93f00092890be",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f60933d90e93f00092890bf",
          name: "USSD Ghana A01 - Dedicated USSD",
          "@type": "UsageVolumeProductSpec",
          version: "18",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f60933d90e93f00092890bf",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f60938790e93f00092890c7",
          name: "Customer UAT Acceptance",
          version: "13",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f60938790e93f00092890c7",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      name: "USSD Ghana A01 product spefication",
      description: "USSD Iran A01",
      isBundle: true,
      lifecycleStatus: "Launched",
      "@type": "CompositeProductSpecification",
      "@baseType": "AtomicProductSpecification",
      LoB: "DigitalServices",
      productSpecificationRelationship: [],
      validFor: {
        startDateTime: "2020-09-13T06:27:00.000Z",
        endDateTime: "2021-09-30T07:27:00.000Z",
      },
      productSpecCharacteristic: [],
      lastUpdate: "2020-09-15T10:26:30.376Z",
      code: "PS904",
      version: "8",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f60933d90e93f00092890bd",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    bundledProductOffering: [],
    prodSpecCharValueUse: [],
    lastUpdate: "2020-09-15T10:26:30.391Z",
    version: "5",
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f60933e90e93f00092890c4",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f686f830454730009cbdacc",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [
      {
        id: "5d3eb34d5a59cd197efceeea",
        name: "Terms and Conditions",
        "@referredType": "OfferingAgreement",
        "@baseType": "Agreement",
        agreementPeriod: {},
        characteristic: [
          {
            id: "5f0a4c186e1eba000635a82e",
            name: "Advance Termination Fee",
            value: "200",
          },
          {
            id: "5f0a4c186e1eba000635a82f",
            name: "Late Payment",
            value: "1% per day",
          },
          {
            id: "5f0a4c186e1eba000635a830",
            name: "No Payment",
            value: "Cancellation",
          },
        ],
        description: "6 Months Contract.\n1 TPS Peak\n100 TPS pero Month",
        documentNumber: "124",
        statementOfIntent: "A1 and A2 and S3",
        status: "Approved",
        type: "Commercial",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5d3eb34d5a59cd197efceeea",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
      },
    ],
    marketSegment: [
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5d3887e883ba2e1cba2de4e6",
        name: "12 months contract",
        description: "12 months contract",
        duration: {
          amount: 12,
          units: "months",
        },
        validFor: {
          startDateTime: "2019-01-01T00:00:20.000Z",
          endDateTime: "2022-12-31T00:00:20.000Z",
        },
        "@type": "ProductOfferingTerm",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f686f830454730009cbdac9",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [
          {
            name: "Plan Monthly Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "ab67337f-b4ba-4db9-8d80-3410b1fef329",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:40:43",
            value: "Plan Monthly Charges",
            label: "Plan Monthly Charges",
            chargeType: "RecurringInAdvanceFixed",
            numberOfInstallments: "",
            periodicityExceptions: [],
          },
        ],
        name: "Zain Bahrain MPLS Service AdvancedRental",
        description: "Test Offer",
        version: "3",
        lastUpdate: "2020-09-21T09:20:02.869Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-21T00:00:00.000Z",
          endDateTime: "2020-11-30T00:00:00.000Z",
        },
        priceType: "AdvancedRental",
        recurringChargePeriodType: "Monthly",
        recurringChargePeriodLength: 1,
        percentage: 0,
        price: {
          value: 100,
          unit: "GHS",
        },
        tax: [
          {
            taxAmount: {
              value: 1,
              unit: "GHS",
            },
            taxCategory: "",
            taxRate: 1,
          },
        ],
        "@baseType": "ProdOfferPriceCharge",
        "@type": "RecurringChargeProdOfferPriceCharge",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        code: "POP665",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f686f830454730009cbdac9",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f686f830454730009cbdaca",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [
          {
            id: "5d3887e883ba2e1cba2de4e6",
            name: "12 months contract",
            "@type": "ProductOfferingTerm",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5d3887e883ba2e1cba2de4e6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
          },
        ],
        charges: [],
        name: "Zain Bahrain MPLS Service OneTimeDiscount",
        description: "Test Offer",
        version: "3",
        lastUpdate: "2020-09-21T09:20:02.964Z",
        isBundle: false,
        isServiceActionPrice: false,
        lifecycleStatus: "Launched",
        validFor: {
          startDateTime: "2020-09-21T00:00:00.000Z",
          endDateTime: "2020-11-30T00:00:00.000Z",
        },
        priceType: "OneTimeDiscount",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 10,
        tax: [],
        "@baseType": "ProdOfferPriceChargeAlteration",
        "@type": "DiscountProdOfferPriceChargeAlteration",
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        code: "POP665",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f686f830454730009cbdaca",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    relatedParty: [],
    name: "Zain Bahrain MPLS Service",
    description: "Test Offer",
    isBundle: false,
    isSellable: true,
    version: "4",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    validFor: {
      startDateTime: "2020-09-21T00:00:00.000Z",
      endDateTime: "2020-11-30T00:00:00.000Z",
    },
    lifecycleStatus: "Launched",
    lastUpdate: "2020-09-21T09:20:03.296Z",
    bundledProductOffering: [],
    serviceLevelAgreement: {
      id: "5ed0a00fb4c40c00083bf7ee",
      relatedParty: [],
      rule: [],
      validFor: {
        startDateTime: "2020-08-30T21:00:00.000Z",
        endDateTime: "2025-08-30T21:00:00.000Z",
      },
      name: "MPLS SLA",
      description: "Platinum SLA",
      version: "0.1",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/service-level-agreement-service/v1/service-level-agreement/5ed0a00fb4c40c00083bf7ee",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/service-level-agreement-service/schema/v1/service-level-agreement",
    },
    productSpecification: {
      id: "5f686f830454730009cbdacb",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f686f820454730009cbdac6",
          name: "MTN Ghana Global MPLS Connection Product",
          version: "11",
          "@type": "AtomicProductSpecification",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f686f820454730009cbdac6",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f686f820454730009cbdac7",
          name: "MPLS Service (MTNG) Service Specification Product",
          version: "6",
          "@type": "AtomicProductSpecification",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f686f820454730009cbdac7",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f686f820454730009cbdac8",
          name: "MPLS Layer Type Product",
          version: "6",
          "@type": "AtomicProductSpecification",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f686f820454730009cbdac8",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      name: "Zain Bahrain MPLS Service",
      description: "Test Offer",
      version: "3",
      brand: "Eligendi quibusdam h",
      LoB: "DigitalServices",
      isBundle: true,
      lastUpdate: "2020-09-21T09:20:03.275Z",
      lifecycleStatus: "Launched",
      productNumber: "1",
      validFor: {
        startDateTime: "2020-09-21T00:00:00.000Z",
        endDateTime: "2020-11-30T00:00:00.000Z",
      },
      "@type": "CompositeProductSpecification",
      "@baseType": "AtomicProductSpecification",
      productSpecCharacteristic: [],
      productSpecificationRelationship: [],
      code: "PS925",
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f686f830454730009cbdacb",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    prodSpecCharValueUse: [],
    code: "PO324",
    pendingLifecycleStatus: "",
    externalSystem: [
      {
        id: "c93fea97-e06c-49bd-9adc-0e1ffa3c2e0f",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f686f830454730009cbdacc",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f7c974cbac0ae00071bace7",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5f59f77b394b7ed8817bf8d9",
        href: "",
        name: "Large Corporate",
        "@referredType": "Corporate",
      },
      {
        id: "5f59f751394b7ed8817bf842",
        href: "",
        name: "NGO",
        "@referredType": "Corporate",
      },
      {
        id: "5f59f78a394b7ed8817bf907",
        href: "",
        name: "SME",
        "@referredType": "Corporate",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5f7c9c5fbac0ae00071bacec",
        duration: {
          units: "months",
          amount: 12,
        },
        name: "Contract Period - 12 months",
        description: "Contract Period - 12 months",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f7c9c5fbac0ae00071bacec",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
      {
        id: "5f7c9c6ebac0ae00071baced",
        duration: {
          units: "months",
          amount: 24,
        },
        name: "Contract Period - 24 months",
        description: "Contract Period - 24 months",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f7c9c6ebac0ae00071baced",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f7c9d2cbac0ae00071bacee",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f32810aa5fd110008c5afa6",
            "@type": "PolicyRule",
            name: "GlobalMPLSConnectionPricePolicy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f32810aa5fd110008c5afa6",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Monthly Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "3c6de6de-9f41-490d-961b-0d8fb5f81476",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:01",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 10,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "MTNG AT MPLS Rental",
        description: "MTNG AT MPLS Rental",
        lifecycleStatus: "Launched",
        version: "32",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Rental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: -2,
        unitOfMeasure: "Currency",
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 0.5,
              unit: "GHS",
            },
          },
        ],
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-08T09:51:33.155Z",
        code: "POP712",
        validFor: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7c9d2cbac0ae00071bacee",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f7c9df2bac0ae00071bacf0",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f30dc10a5fd110008c5af9b",
            "@type": "PolicyRule",
            name: "Contract Terminate Penalty",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f30dc10a5fd110008c5af9b",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Additional OneTimeChargeInBill",
            chargeClass: "OneTime",
            taxPlanId: "aa915db2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            taxPlanName: "9 Percent Tax",
            id: "214f3fcf-bfb9-480d-9d6e-f54e01f5fbc3",
            glCode: "401",
            time: "2020-09-21T10:46",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 10,
          unit: "GHS",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Penalty",
        description: "Penalty",
        lifecycleStatus: "Launched",
        version: "26",
        isBundle: false,
        isServiceActionPrice: true,
        priceType: "Penalty",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        prodOfferPriceAction: [
          {
            id: "5f7ccdc5bac0ae00071bad09",
            action: "delete",
          },
          {
            id: "5f7ccdc5bac0ae00071bad0a",
            action: "modify",
          },
        ],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 0.5,
              unit: "GHS",
            },
          },
        ],
        unitOfMeasure: "Currency",
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-08T08:03:17.121Z",
        code: "POP714",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7c9df2bac0ae00071bacf0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    relatedParty: [],
    name: "MTNG AT Global MPLS Service",
    description: "MTNG AT Global MPLS Service",
    isBundle: false,
    isSellable: true,
    version: "32",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f7c96e3bac0ae00071bace5",
      businessType: ["Postpaid"],
      technology: ["GlobalMPLS"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f5b2a1b11c93c00087f0e1f",
          name: "Manual Provisioning",
          version: "132",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f5b2a1b11c93c00087f0e1f",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7c9b65bac0ae00071baceb",
          name: "Site Address",
          version: "53",
          "@type": "SiteProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7c9b65bac0ae00071baceb",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7c977bbac0ae00071bace9",
          name: "MTNG EB Internet Connectivity Backhaul",
          version: "130",
          "@type": "NetworkProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7c977bbac0ae00071bace9",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7ccbe1bac0ae00071bad08",
          name: "MTNG AT MPLS VPN Spec",
          version: "34",
          "@type": "NetworkProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7ccbe1bac0ae00071bad08",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7dbaba2427a10008beed75",
          name: "Customer UAT Acceptance",
          version: "32",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7dbaba2427a10008beed75",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      name: "MTNG AT Global MPLS Service product spefication",
      description: "MTNG AT Global MPLS Service",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "59",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      LoB: "ICTServices",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [],
      lastUpdate: "2020-10-10T07:40:38.879Z",
      code: "PS979",
      validFor: {},
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7c96e3bac0ae00071bace5",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    bundledProductOffering: [],
    prodSpecCharValueUse: [],
    lastUpdate: "2020-10-10T07:40:39.456Z",
    code: "PO361b",
    validFor: {
      startDateTime: "2020-10-08T06:54:46.318Z",
      endDateTime: "2021-06-30T06:54:00.000Z",
    },
    externalSystem: [
      {
        id: "7c565290-d91d-48b4-a824-07ae53224ef6",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f7c974cbac0ae00071bace7",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f7ccba4bac0ae00071bad06",
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "modify", "delete", "nochange"],
          id: "5f7cd1fabac0ae00071bad1b",
          name: "CRM",
        },
        {
          allowedActionType: ["modify", "delete", "nochange"],
          id: "5f7cd1fabac0ae00071bad1c",
          name: "Selfcare",
        },
      ],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5f59f77b394b7ed8817bf8d9",
        href: "",
        name: "Large Corporate",
        "@referredType": "Corporate",
      },
      {
        id: "5f59f78a394b7ed8817bf907",
        href: "",
        name: "SME",
        "@referredType": "Corporate",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5f7ccf76bac0ae00071bad0e",
        duration: {
          units: "months",
          amount: 12,
        },
        name: "Contract Period - 12 months",
        description: "Contract Period - 12 months",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f7ccf76bac0ae00071bad0e",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
      {
        id: "5f7ccf90bac0ae00071bad0f",
        duration: {
          units: "months",
          amount: 24,
        },
        name: "Contract Period - 24 months",
        description: "Contract Period - 24 months",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f7ccf90bac0ae00071bad0f",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f7ccff3bac0ae00071bad10",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7cd0cb0c9e6d000a171961",
            "@type": "PolicyRule",
            name: "MTNG AT EB Internet Line Rental",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7cd0cb0c9e6d000a171961",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Monthly Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "3c6de6de-9f41-490d-961b-0d8fb5f81476",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:01",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 100,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "MTNG AT EB Leased Line Rental",
        description: "MTNG AT EB Leased Line Rental",
        lifecycleStatus: "Launched",
        version: "4",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Rental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 5,
              unit: "GHS",
            },
          },
        ],
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-06T20:22:18.834Z",
        code: "POP716",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7ccff3bac0ae00071bad10",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f7cd05dbac0ae00071bad11",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f30dc10a5fd110008c5af9b",
            "@type": "PolicyRule",
            name: "Contract Terminate Penalty",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f30dc10a5fd110008c5af9b",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Additional OneTimeChargeInBill",
            chargeClass: "OneTime",
            taxPlanId: "aa915db2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            taxPlanName: "9 Percent Tax",
            id: "214f3fcf-bfb9-480d-9d6e-f54e01f5fbc3",
            glCode: "401",
            time: "2020-09-21T10:46",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 10,
          unit: "GHS",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Penalty",
        description: "Penalty",
        lifecycleStatus: "Launched",
        version: "5",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Penalty",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 0.5,
              unit: "GHS",
            },
          },
        ],
        prodOfferPriceAction: [
          {
            id: "5f81e803a737b3000661b355",
            action: "delete",
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-10T16:57:39.623Z",
        code: "POP717",
        validFor: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7cd05dbac0ae00071bad11",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    relatedParty: [],
    name: "MTNG AT EB Leased Line",
    description: "MTNG AT EB Leased Line",
    isBundle: false,
    isSellable: true,
    version: "11",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f7ccb06bac0ae00071bad04",
      businessType: ["Postpaid"],
      technology: [
        "DedicatedInternet",
        "GlobalMPLS",
        "BulkLease",
        "LeasedLine",
        "EnterpriseWiFi",
      ],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f7c977bbac0ae00071bace9",
          name: "MTNG EB Internet Connectivity Backhaul",
          version: "130",
          "@type": "NetworkProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7c977bbac0ae00071bace9",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f5b2a1b11c93c00087f0e1f",
          name: "Manual Provisioning",
          version: "132",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f5b2a1b11c93c00087f0e1f",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f607f1c90e93f00092890b9",
          name: "Customer UAT Acceptance",
          version: "137",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f607f1c90e93f00092890b9",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f69c391659a1c0009ad83b2",
          name: "Site Address",
          version: "65",
          "@type": "SiteProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f69c391659a1c0009ad83b2",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      name: "MTNG AT EB Internet Connectivity Specification",
      description: "MTNG AT EB Internet Connectivity Specification",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "15",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      LoB: "ICTServices",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [],
      lastUpdate: "2020-10-06T20:47:36.828Z",
      code: "PS984",
      validFor: {},
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7ccb06bac0ae00071bad04",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    bundledProductOffering: [],
    prodSpecCharValueUse: [],
    lastUpdate: "2020-10-06T20:22:18.951Z",
    code: "PO362",
    validFor: {},
    externalSystem: [
      {
        id: "415a0808-a492-4c04-a3f0-05e262a2ae8e",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f7ccba4bac0ae00071bad06",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f7cd42abac0ae00071bad1f",
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "modify", "delete", "nochange"],
          id: "5f7ef1d92427a10008beedb9",
          name: "CRM",
        },
        {
          allowedActionType: ["modify", "delete", "nochange"],
          id: "5f7ef1d92427a10008beedba",
          name: "Selfcare",
        },
      ],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [
      {
        id: "5f7ef1d69da1a800093ca6ef",
        "@baseType": "Agreement",
        name: "MTNG AT Dedicated Internet Master Agreement",
        description: "Description",
        version: "0.1",
        characteristic: [
          {
            id: "5f7ef1d69da1a800093ca6f0",
            name: "Support",
            value: "24x7 Support",
          },
        ],
        engagedPartyRole: [],
        associatedAgreement: [],
        agreementItem: [],
        agreementAuthorization: [],
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5f7ef1d69da1a800093ca6ef",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
      },
    ],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5f59f77b394b7ed8817bf8d9",
        href: "",
        name: "Large Corporate",
        "@referredType": "Corporate",
      },
      {
        id: "5f59f78a394b7ed8817bf907",
        href: "",
        name: "SME",
        "@referredType": "Corporate",
      },
      {
        id: "5f59f751394b7ed8817bf842",
        href: "",
        name: "NGO",
        "@referredType": "Corporate",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5f7cd607bac0ae00071bad23",
        duration: {
          units: "months",
          amount: 12,
        },
        name: "Contract Period - 12 months",
        description: "Contract Period - 12 months",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f7cd607bac0ae00071bad23",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
      {
        id: "5f7cd618bac0ae00071bad24",
        duration: {
          units: "months",
          amount: 26,
        },
        name: "Contract Period - 24 months",
        description: "Contract Period - 24 months",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f7cd618bac0ae00071bad24",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f7cd69bbac0ae00071bad27",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7cd0cb0c9e6d000a171961",
            "@type": "PolicyRule",
            name: "MTNG AT EB Internet Line Rental",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7cd0cb0c9e6d000a171961",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Monthly Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "3c6de6de-9f41-490d-961b-0d8fb5f81476",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:01",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 100,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "MTNG AT EB Dedicated Internet Rental",
        description: "MTNG AT EB Dedicated Internet Rental",
        lifecycleStatus: "Launched",
        version: "4",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Rental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-07T07:29:01.823Z",
        code: "POP718",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7cd69bbac0ae00071bad27",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f7cd6ffbac0ae00071bad2a",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f30dc10a5fd110008c5af9b",
            "@type": "PolicyRule",
            name: "Contract Terminate Penalty",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f30dc10a5fd110008c5af9b",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Additional OneTimeChargeInBill",
            chargeClass: "OneTime",
            taxPlanId: "aa915db2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            taxPlanName: "9 Percent Tax",
            id: "214f3fcf-bfb9-480d-9d6e-f54e01f5fbc3",
            glCode: "401",
            time: "2020-09-21T10:46",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 100,
          unit: "GHS",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Penalty",
        description: "Penalty",
        lifecycleStatus: "Launched",
        version: "4",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Penalty",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 1,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-07T07:29:01.828Z",
        code: "POP719",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7cd6ffbac0ae00071bad2a",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    relatedParty: [],
    name: "MTNG AT EB Dedicated Internet",
    description: "MTNG AT EB Dedicated Internet",
    isBundle: false,
    isSellable: true,
    version: "10",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f7cd408bac0ae00071bad1e",
      businessType: ["Postpaid"],
      technology: ["DedicatedInternet"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f7c977bbac0ae00071bace9",
          name: "MTNG EB Internet Connectivity Backhaul",
          version: "130",
          "@type": "NetworkProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7c977bbac0ae00071bace9",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f5b2a1b11c93c00087f0e1f",
          name: "Manual Provisioning",
          version: "132",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f5b2a1b11c93c00087f0e1f",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f607f1c90e93f00092890b9",
          name: "Customer UAT Acceptance",
          version: "137",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f607f1c90e93f00092890b9",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f8022dda737b3000661b2f2",
          name: "Site Address",
          version: "3",
          "@type": "SiteProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f8022dda737b3000661b2f2",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      name: "MTNG AT EB Dedicated Internet product Specification",
      description: "MTNG AT EB Dedicated Internet",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "62",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      LoB: "ICTServices",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [],
      lastUpdate: "2020-10-09T08:44:43.636Z",
      code: "PS988",
      validFor: {},
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7cd408bac0ae00071bad1e",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    bundledProductOffering: [],
    prodSpecCharValueUse: [],
    lastUpdate: "2020-10-08T11:02:49.128Z",
    code: "PO363",
    validFor: {},
    externalSystem: [
      {
        id: "d439f711-eb30-40f8-877c-43546f93bc42",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f7cd42abac0ae00071bad1f",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f7cd86cbac0ae00071bad31",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f7d72e92427a10008beed4b",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Monthly Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "3c6de6de-9f41-490d-961b-0d8fb5f81476",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:01",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 100,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Co Location Rental",
        description: "Co Location Rental",
        lifecycleStatus: "Launched",
        version: "3",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Rental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 5,
              unit: "GHS",
            },
          },
        ],
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-07T07:59:51.519Z",
        code: "POP721",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7d72e92427a10008beed4b",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    relatedParty: [],
    name: "MTNG AT EB Co-Location",
    description: "MTNG AT EB Co-Location",
    isBundle: false,
    isSellable: true,
    version: "7",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f27ecf72215e100092e2e6d",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f7cdac0bac0ae00071bad34",
          name: "MTNG Co-Location Rack/Unit Space",
          version: "17",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7cdac0bac0ae00071bad34",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7cdb1cbac0ae00071bad35",
          name: "MTNG Co-Location Storage Space",
          version: "15",
          "@type": "NetworkProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7cdb1cbac0ae00071bad35",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7cdb43bac0ae00071bad36",
          name: "MTNG Co-Location Processing Capacity",
          version: "14",
          "@type": "NetworkProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7cdb43bac0ae00071bad36",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7cdb64bac0ae00071bad37",
          name: "MTNG Co-Location Internet Connectivity",
          version: "15",
          "@type": "NetworkProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7cdb64bac0ae00071bad37",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7db4dc2427a10008beed6e",
          name: "Manual Provisioning",
          version: "3",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7db4dc2427a10008beed6e",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7db5022427a10008beed6f",
          name: "Customer UAT Acceptance",
          version: "4",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7db5022427a10008beed6f",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      validFor: {
        startDateTime: "2020-08-05T00:00:00.000Z",
        endDateTime: "2020-12-31T00:00:00.000Z",
      },
      name: "Enterprice Co-Location",
      description: "DCM-538",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "94",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [],
      lastUpdate: "2020-10-07T12:31:01.827Z",
      code: "PS585",
      LoB: "DigitalServices",
      brand: "",
      productNumber: "1",
      targetProductSchema: {
        "@type": "DOM",
        href: {},
      },
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f27ecf72215e100092e2e6d",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    bundledProductOffering: [],
    prodSpecCharValueUse: [],
    lastUpdate: "2020-10-07T07:59:52.309Z",
    code: "PO364",
    validFor: {},
    externalSystem: [
      {
        id: "b14dfc4e-fd1a-4925-b5e8-5f07398592bc",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f7cd86cbac0ae00071bad31",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f7d7e352427a10008beed51",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5d0ca89fa9060a9e0988c380",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5d0ca89fa9060a9e0988c380",
        lastUpdate: "2020-10-11T11:00:44.613Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for Plan offerings",
        lifecycleStatus: "Active",
        version: "1",
        "@type": "Category",
        productOffering: [],
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5f59f77b394b7ed8817bf8d9",
        href: "",
        name: "Large Corporate",
        "@referredType": "Corporate",
      },
      {
        id: "5f59f78a394b7ed8817bf907",
        href: "",
        name: "SME",
        "@referredType": "Corporate",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f7d87282427a10008beed54",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Plan Monthly Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "ab67337f-b4ba-4db9-8d80-3410b1fef329",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:40:43",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 100,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Toll Free SMS Usage Price",
        description: "Toll Free SMS Usage Price",
        lifecycleStatus: "Launched",
        version: "3",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Recurring",
        recurringChargePeriodType: "Monthly",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 5,
              unit: "GHS",
            },
          },
        ],
        prodOfferPriceAction: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-07T09:18:41.912Z",
        code: "POP722",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7d87282427a10008beed54",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    name: "MTNG AT EB Toll Free SMS",
    description: "MTNG AT EB Toll Free SMS",
    isBundle: false,
    isSellable: true,
    version: "7",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f7d7e322427a10008beed50",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f7d7e682427a10008beed53",
          name: "MTNG AT EB Toll Free SMS Prod Spec",
          version: "17",
          "@type": "NetworkProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7d7e682427a10008beed53",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f5b2a1b11c93c00087f0e1f",
          name: "Manual Provisioning",
          version: "132",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f5b2a1b11c93c00087f0e1f",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f607f1c90e93f00092890b9",
          name: "Customer UAT Acceptance",
          version: "137",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f607f1c90e93f00092890b9",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      place: [],
      name: "MTNG AT EB Toll Free SMS product spefication",
      description: "MTNG AT EB Toll Free SMS",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "12",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      LoB: "DigitalServices",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [],
      lastUpdate: "2020-10-07T10:48:42.216Z",
      code: "PS998",
      validFor: {},
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7d7e322427a10008beed50",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    bundledProductOffering: [],
    prodSpecCharValueUse: [],
    relatedParty: [],
    lastUpdate: "2020-10-07T10:48:42.535Z",
    code: "PO365",
    validFor: {},
    externalSystem: [
      {
        id: "5197845b-75af-4ac5-acb5-cdfa7473ea30",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f7d7e352427a10008beed51",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f7d8e9e2427a10008beed69",
    allowedProductAction: {
      channels: [],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5cfa5323a9060a9e0960c0f2",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5cfa5323a9060a9e0960c0f2",
        lastUpdate: "2020-10-11T11:00:42.413Z",
        parentId: "",
        isRoot: true,
        name: "VAS",
        description: "A category for VAS",
        lifecycleStatus: "Active",
        version: "1",
        "@type": "Category",
        productOffering: [],
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5f59f77b394b7ed8817bf8d9",
        href: "",
        name: "Large Corporate",
        "@referredType": "Corporate",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5f59f78a394b7ed8817bf907",
        href: "",
        name: "SME",
        "@referredType": "Corporate",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5f7e964d2427a10008beed79",
        duration: {
          units: "months",
          amount: 12,
        },
        name: "Contract Period - 12 months",
        description: "Contract Period - 12 months",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f7e964d2427a10008beed79",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
      {
        id: "5f7e96672427a10008beed7a",
        duration: {
          units: "months",
          amount: 24,
        },
        name: "Contract Period - 24 months",
        description: "Contract Period - 24 months",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f7e96672427a10008beed7a",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f7e955d2427a10008beed78",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7e957ca3029700065482dd",
            "@type": "PolicyRule",
            name: "MTNG AT Maintenance Policy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7e957ca3029700065482dd",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Advance Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "e5b1f20f-9a23-4cd7-8dbb-ed93c84a4022",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:35",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 100,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "MTNG AT EB WiFi Maintenance",
        description: "MTNG AT EB WiFi Maintenance",
        lifecycleStatus: "Launched",
        version: "9",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Recurring",
        recurringChargePeriodType: "Monthly",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-08T08:16:20.523Z",
        code: "POP723",
        validFor: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7e955d2427a10008beed78",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f7e96a22427a10008beed7b",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Installment OneTimeCharge",
            chargeClass: "OneTime",
            taxPlanId: "aa915db2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            taxPlanName: "9 Percent Tax",
            id: "aab95db2-7b1f-4456-a9b7-e6f78b0e4d8a",
            glCode: "401",
            time: "2020-09-21T10:45:57",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 1000,
          unit: "GHS",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Installation Charges",
        description: "Installation Charges",
        lifecycleStatus: "Launched",
        version: "7",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-08T08:16:20.247Z",
        code: "POP724",
        validFor: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7e96a22427a10008beed7b",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f7e97ec2427a10008beed7c",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7ef783a3029700065482e2",
            "@type": "PolicyRule",
            name: "MTNG AT Installment Price",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7ef783a3029700065482e2",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Plan Monthly Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "ab67337f-b4ba-4db9-8d80-3410b1fef329",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:40:43",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 100,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Installment",
        description: "Installment",
        lifecycleStatus: "Launched",
        version: "9",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Recurring",
        recurringChargePeriodType: "Monthly",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-08T11:29:34.503Z",
        code: "POP725",
        validFor: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7e97ec2427a10008beed7c",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    name: "MTNG AT EB Enterprise WiFi",
    description: "MTNG AT EB Enterprise WiFi",
    isBundle: false,
    isSellable: true,
    version: "13",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f7d8e9a2427a10008beed68",
      businessType: ["Postpaid"],
      technology: ["EnterpriseWiFi"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f7d8eb62427a10008beed6b",
          name: "Enterprise WiFi Backhaul",
          version: "18",
          "@type": "NetworkProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7d8eb62427a10008beed6b",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7d8ee12427a10008beed6c",
          name: "Access Point Equipment",
          version: "14",
          "@type": "NetworkProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7d8ee12427a10008beed6c",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7ec1192427a10008beed96",
          name: "Manual Provisioning",
          version: "14",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7ec1192427a10008beed96",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7ec16e2427a10008beed97",
          name: "Customer UAT Acceptance",
          version: "17",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7ec16e2427a10008beed97",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      place: [],
      name: "MTNG AT EB Enterprise WiFi product spefication",
      description: "MTNG AT EB Enterprise WiFi",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "21",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      LoB: "ICTServices",
      productSpecificationRelationship: [
        {
          id: "5f7cd408bac0ae00071bad1e",
          name: "MTNG AT EB Dedicated Internet product Specification",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7cd408bac0ae00071bad1e",
          type: "dependency",
        },
      ],
      productSpecCharacteristic: [],
      lastUpdate: "2020-10-08T08:16:53.727Z",
      code: "PS1005",
      validFor: {},
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7d8e9a2427a10008beed68",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    bundledProductOffering: [],
    prodSpecCharValueUse: [],
    relatedParty: [],
    lastUpdate: "2020-10-08T08:16:21.143Z",
    code: "PO369",
    validFor: {
      startDateTime: "2020-10-08T08:15:21.264Z",
      endDateTime: "2021-10-08T08:15:21.269Z",
    },
    serviceLevelAgreement: null,
    externalSystem: [
      {
        id: "578467d4-3f40-44d6-ac5e-2c64b890c22e",
        system: "NGB",
        "@type": "OptionalOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f7d8e9e2427a10008beed69",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f7ea92a2427a10008beed7e",
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "modify", "delete", "nochange"],
          id: "5f7f34eba737b3000661b2e5",
          name: "CRM",
        },
        {
          allowedActionType: ["modify", "delete", "nochange"],
          id: "5f7f34eba737b3000661b2e6",
          name: "Selfcare",
        },
      ],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5cfa5323a9060a9e0960c0f2",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5cfa5323a9060a9e0960c0f2",
        lastUpdate: "2020-10-11T11:00:42.413Z",
        parentId: "",
        isRoot: true,
        name: "VAS",
        description: "A category for VAS",
        lifecycleStatus: "Active",
        version: "1",
        "@type": "Category",
        productOffering: [],
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d43cbcc18adf5f90f2af544",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
        name: "Enterprise",
        "@referredType": "Corporate",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5d4beeb9528c2425c232c3e4",
        name: "Corporate",
        code: "B",
        "@referredType": "Corporate",
        default: "Y",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5f59f77b394b7ed8817bf8d9",
        href: "",
        name: "Large Corporate",
        "@referredType": "Corporate",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [],
    productOfferingPrice: [
      {
        id: "5f7eb1792427a10008beed84",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Installment OneTimeCharge",
            chargeClass: "OneTime",
            taxPlanId: "aa915db2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            taxPlanName: "9 Percent Tax",
            id: "aab95db2-7b1f-4456-a9b7-e6f78b0e4d8a",
            glCode: "401",
            time: "2020-09-21T10:45:57",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 900,
          unit: "GHS",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Hosted Security One Time Activation Charge",
        description: "Hosted Security One Time Activation Charge",
        lifecycleStatus: "Launched",
        version: "10",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "OneTimeCharge",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-08T11:50:43.529Z",
        code: "POP726",
        validFor: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7eb1792427a10008beed84",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f7eb2742427a10008beed85",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7eb28ca3029700065482e0",
            "@type": "PolicyRule",
            name: "MTNG AT Firewall Rental Policy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7eb28ca3029700065482e0",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f800e2c97ddd60009bf6f63",
            "@type": "OverrideRule",
            name: "MTNG AT Firewall Rental Policy - Override",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f800e2c97ddd60009bf6f63",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Monthly Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "3c6de6de-9f41-490d-961b-0d8fb5f81476",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:01",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 100,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Firewall Rental",
        description: "Firewall Rental",
        lifecycleStatus: "Launched",
        version: "12",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "AdvancedRental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-09T07:15:59.955Z",
        code: "POP727",
        validFor: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7eb2742427a10008beed85",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f7eb3812427a10008beed86",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7eb396a3029700065482e1",
            "@type": "PolicyRule",
            name: "MTNG AT Email Rental",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7eb396a3029700065482e1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f800f6597ddd60009bf6f64",
            "@type": "OverrideRule",
            name: "MTNG AT Email Rental - Override",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f800f6597ddd60009bf6f64",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Advance Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "e5b1f20f-9a23-4cd7-8dbb-ed93c84a4022",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:35",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 100,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Hosted Email Security",
        description: "Hosted Email Security",
        lifecycleStatus: "Launched",
        version: "8",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "AdvancedRental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-09T07:21:11.772Z",
        code: "POP728",
        validFor: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7eb3812427a10008beed86",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f7f01342427a10008beedc0",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7f0159a3029700065482e3",
            "@type": "PolicyRule",
            name: "Hosted Cloud Storage Price",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7f0159a3029700065482e3",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
          {
            id: "5f8011b197ddd60009bf6f65",
            "@type": "PolicyRule",
            name: "Hosted Cloud Storage Price - Override",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f8011b197ddd60009bf6f65",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [],
        price: {
          value: 100,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Hosted Cloud Storage Price",
        description: "Hosted Cloud Storage Price",
        lifecycleStatus: "Launched",
        version: "3",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "AdvancedRental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [
          {
            id: "5f8011e4a737b3000661b2ed",
            action: "add",
          },
        ],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-09T07:31:48.435Z",
        code: "POP729",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7f01342427a10008beedc0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f7f022d2427a10008beedc5",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Advance Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "e5b1f20f-9a23-4cd7-8dbb-ed93c84a4022",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:35",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 79,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Bandwidth Access Manager Rental",
        description: "Bandwidth Access Manager Rental",
        lifecycleStatus: "Launched",
        version: "1",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "AdvancedRental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [
          {
            id: "5f7f022d2427a10008beedc6",
            action: "add",
          },
        ],
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-08T15:48:59.439Z",
        code: "POP730",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7f022d2427a10008beedc5",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f7f34e8a737b3000661b2e3",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f80130397ddd60009bf6f66",
            "@type": "PolicyRule",
            name: "Penalty Waive Off",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f80130397ddd60009bf6f66",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Additional OneTimeChargeInBill",
            chargeClass: "OneTime",
            taxPlanId: "aa915db2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            taxPlanName: "9 Percent Tax",
            id: "214f3fcf-bfb9-480d-9d6e-f54e01f5fbc3",
            glCode: "401",
            time: "2020-09-21T10:46",
            chargeType: "OneTimeUpfront",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 900,
          unit: "GHS",
        },
        "@type": "OneTimeChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Hosted Security Penalty",
        description: "Hosted Security Penalty",
        lifecycleStatus: "Initial",
        version: "4",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "Penalty",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [
          {
            id: "5f801314a737b3000661b2ef",
            action: "delete",
          },
        ],
        tax: [
          {
            taxCategory: "VAT",
            taxRate: 5,
            taxAmount: {
              value: 45,
              unit: "GHS",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-09T07:36:52.832Z",
        code: "POP731",
        validFor: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f7f34e8a737b3000661b2e3",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    name: "MTNG AT Hosted Security Services",
    description: "MTNG AT Hosted Security Services",
    isBundle: false,
    isSellable: true,
    version: "17",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f7ea9262427a10008beed7d",
      businessType: ["Postpaid"],
      technology: [
        "DedicatedInternet",
        "LeasedLine",
        "GlobalMPLS",
        "BulkLease",
      ],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f7ea9872427a10008beed80",
          name: "Hosted Firewall",
          version: "16",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7ea9872427a10008beed80",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7ea9e62427a10008beed81",
          name: "Hosted Email Security",
          version: "20",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7ea9e62427a10008beed81",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7eaa382427a10008beed82",
          name: "Hosted Cloud Backup",
          version: "14",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7eaa382427a10008beed82",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7eaa632427a10008beed83",
          name: "Bandwidth Manager Access",
          version: "15",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7eaa632427a10008beed83",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f80184da737b3000661b2f0",
          name: "Manual Provisioning",
          version: "5",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f80184da737b3000661b2f0",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f801913a737b3000661b2f1",
          name: "Customer UAT Acceptance",
          version: "3",
          "@type": "FieldOperationProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f801913a737b3000661b2f1",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      place: [],
      name: "MTNG AT Hosted Security Services product spefication",
      description: "MTNG AT Hosted Security Services",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "30",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      LoB: "ICTServices",
      productSpecificationRelationship: [
        {
          id: "5f7cd408bac0ae00071bad1e",
          name: "MTNG AT EB Dedicated Internet product Specification",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7cd408bac0ae00071bad1e",
          type: "dependency",
        },
      ],
      productSpecCharacteristic: [],
      lastUpdate: "2020-10-09T08:02:45.858Z",
      code: "PS1018",
      validFor: {},
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7ea9262427a10008beed7d",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    bundledProductOffering: [],
    prodSpecCharValueUse: [],
    relatedParty: [],
    lastUpdate: "2020-10-08T15:48:59.566Z",
    code: "PO370",
    validFor: {
      startDateTime: "2020-10-08T08:19:00.000Z",
      endDateTime: "2021-10-08T08:19:12.922Z",
    },
    externalSystem: [
      {
        id: "fa8721c3-6775-4775-a4bc-5b3c7ccef1cc",
        system: "NGB",
        "@type": "OptionalOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f7ea92a2427a10008beed7e",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
  {
    id: "5f802329a737b3000661b2f4",
    allowedProductAction: {
      channels: [
        {
          allowedActionType: ["add", "modify", "delete", "nochange"],
          id: "5f804c2ea737b3000661b32f",
          name: "CRM",
        },
        {
          allowedActionType: ["modify", "delete", "nochange"],
          id: "5f804c2ea737b3000661b330",
          name: "Selfcare",
        },
      ],
    },
    businessType: ["Postpaid"],
    place: [],
    category: [
      {
        id: "5ce67563a9060a9e0944ad57",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5ce67563a9060a9e0944ad57",
        lastUpdate: "2020-10-11T11:00:37.496Z",
        parentId: "",
        isRoot: true,
        name: "Plan",
        description: "A category for mobile Plan",
        lifecycleStatus: "Active",
        productOffering: [
          {
            id: "5cebddbaa9060a9e094969bc",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5cebddbaa9060a9e094969bc",
            name: "Mobile Plan 1",
            "@type": "SimpleProductOffering",
            version: "1",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
          },
        ],
        version: "1",
        "@type": "Category",
        subCategory: [],
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
      {
        id: "5f47949d394b7ed88141dfa0",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5f47949d394b7ed88141dfa0",
        lastUpdate: "2020-08-27T00:00:00.000Z",
        parentId: "",
        isRoot: true,
        name: "Enterprise",
        description: "A category for Enterprises",
        lifecycleStatus: "Active",
        version: "0",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
      },
    ],
    agreement: [
      {
        id: "5f6edb801f011700078e2cdf",
        "@baseType": "Agreement",
        name: "Business Messenger Agreement",
        description: "Business Messenger Agreement",
        version: "0.1",
        type: "Commercial",
        characteristic: [
          {
            id: "5f6edb801f011700078e2ce0",
            name: "Uptime",
            value: "99%",
          },
        ],
        engagedPartyRole: [],
        associatedAgreement: [],
        agreementItem: [],
        agreementAuthorization: [],
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/v1/agreement/5f6edb801f011700078e2cdf",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/agreement-service/schema/v1/agreement",
      },
    ],
    marketSegment: [
      {
        id: "5efc56a6394b7ed88148c297",
        href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
        name: "EB",
        "@referredType": "EB",
        isRoot: true,
        parentId: "",
      },
      {
        id: "5f59f77b394b7ed8817bf8d9",
        href: "",
        name: "Large Corporate",
        "@referredType": "Corporate",
      },
      {
        id: "5f59f78a394b7ed8817bf907",
        href: "",
        name: "SME",
        "@referredType": "Corporate",
      },
      {
        id: "5f59f751394b7ed8817bf842",
        href: "",
        name: "NGO",
        "@referredType": "Corporate",
      },
    ],
    channel: [
      {
        id: "5d38891b83ba2e1cba2de852",
        href: "https://host:port/catalogManagement/channel/1",
        name: "CRM",
        "@referredType": "CRM",
      },
      {
        id: "5d38893c83ba2e1cba2de8a7",
        href: "https://host:port/catalogManagement/channel/3",
        name: "Selfcare",
        "@referredType": "CRM",
      },
    ],
    attachment: [],
    productOfferingTerm: [
      {
        id: "5f803c14a737b3000661b2fc",
        duration: {
          units: "months",
          amount: 12,
        },
        name: "Contract Period - 12 months",
        description: "Contract Period - 12 months",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f803c14a737b3000661b2fc",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
      {
        id: "5f803c29a737b3000661b2fd",
        duration: {
          units: "months",
          amount: 24,
        },
        name: "Contract Period - 24 months",
        description: "Contract Period - 24 months",
        "@type": "ProductOfferingTerm",
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-term/5f803c29a737b3000661b2fd",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-term",
      },
    ],
    productOfferingPrice: [
      {
        id: "5f803c94a737b3000661b300",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f6eddb880e4350009b64984",
            "@type": "PolicyRule",
            name: "SMS - TPS Based Usage Pricing Policy - MTN Ghana",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f6eddb880e4350009b64984",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Advance Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "e5b1f20f-9a23-4cd7-8dbb-ed93c84a4022",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:35",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 10,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "SMS - TPS Based Usage Pricing",
        description: "SMS - TPS Based Usage Pricing",
        lifecycleStatus: "Launched",
        version: "7",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "AdvancedRental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [
          {
            id: "5f804151a737b3000661b30c",
            action: "add",
          },
        ],
        tax: [
          {
            taxCategory: "CST",
            taxRate: 9,
            taxAmount: {
              value: 0.9,
              unit: "GHS",
            },
          },
          {
            taxCategory: "NHIL",
            taxRate: 2.5,
            taxAmount: {
              value: 0.25,
              unit: "GHS",
            },
          },
          {
            taxCategory: "GETFL",
            taxRate: 2.5,
            taxAmount: {
              value: 0.25,
              unit: "GHS",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-09T11:40:30.746Z",
        code: "POP732",
        validFor: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f803c94a737b3000661b300",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f803e06a737b3000661b306",
        pricingLogicAlgorithm: [],
        constraint: [
          {
            id: "5f7012b280e4350009b64985",
            "@type": "PolicyRule",
            name: "Email Quantity Based Pricing Policy",
            href:
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/v1/policy-rule/5f7012b280e4350009b64985",
            "@schemaLocation":
              "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/policy-service/schema/v1/policy-rule",
          },
        ],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Advance Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "e5b1f20f-9a23-4cd7-8dbb-ed93c84a4022",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:35",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 100,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "MTNG AT Email Quantity Based Pricing",
        description: "Email Quantity Based Pricing",
        lifecycleStatus: "Launched",
        version: "7",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "AdvancedRental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        unitOfMeasure: "Currency",
        prodOfferPriceAction: [],
        tax: [
          {
            taxCategory: "CST",
            taxRate: 9,
            taxAmount: {
              value: 9,
              unit: "GHS",
            },
          },
          {
            taxCategory: "NHIL",
            taxRate: 2.5,
            taxAmount: {
              value: 2.5,
              unit: "GHS",
            },
          },
          {
            taxCategory: "GETFL",
            taxRate: 2.5,
            taxAmount: {
              value: 2.5,
              unit: "GHS",
            },
          },
        ],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-09T11:40:30.736Z",
        code: "POP734",
        validFor: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f803e06a737b3000661b306",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
      {
        id: "5f8042e0a737b3000661b30d",
        pricingLogicAlgorithm: [],
        constraint: [],
        popRelationship: [],
        bundledPopRelationship: [],
        place: [],
        productOfferingTerm: [],
        charges: [
          {
            name: "Advance Rental Charges",
            chargeClass: "Recurring",
            taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
            taxPlanName: "5%  Tax Plan",
            id: "e5b1f20f-9a23-4cd7-8dbb-ed93c84a4022",
            glCode: "General Ledger Code",
            time: "2020-09-18T06:32:35",
            chargeType: "RecurringInArrearsFixed",
            offeringType: "MandatoryOffering",
          },
        ],
        price: {
          value: 1000,
          unit: "GHS",
        },
        "@type": "RecurringChargeProdOfferPriceCharge",
        "@baseType": "ProdOfferPriceCharge",
        name: "Social Media Broadcast Monthly Rental",
        description: "Social Media Broadcast Monthly Rental",
        lifecycleStatus: "Launched",
        version: "6",
        isBundle: false,
        isServiceActionPrice: false,
        priceType: "AdvancedRental",
        recurringChargePeriodType: "",
        recurringChargePeriodLength: 0,
        percentage: 0,
        prodOfferPriceAction: [
          {
            id: "5f8048a5a737b3000661b31a",
            action: "add",
          },
        ],
        unitOfMeasure: "Currency",
        tax: [],
        prodSpecCharValueUse: [],
        agreementCharValueUse: [],
        lastUpdate: "2020-10-09T11:40:30.457Z",
        code: "POP736",
        validFor: {},
        href:
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f8042e0a737b3000661b30d",
        "@schemaLocation":
          "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
      },
    ],
    name: "MTNG AT EB Business Messenger",
    description: "MTNG AT EB Business Messenger",
    isBundle: false,
    isSellable: true,
    version: "14",
    lifecycleStatus: "Launched",
    "@type": "SimpleProductOffering",
    "@baseType": "ProductOffering",
    productSpecification: {
      id: "5f802326a737b3000661b2f3",
      businessType: ["Postpaid"],
      technology: ["NonGSM"],
      resourceSpecification: [],
      serviceSpecification: [],
      bundledProductSpecification: [
        {
          id: "5f80236fa737b3000661b2f6",
          name: "MTNG AT EB Business Messenger Access",
          version: "13",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f80236fa737b3000661b2f6",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f7d55fcbac0ae00071bad38",
          name: "Bulk SMS Spec",
          version: "42",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f7d55fcbac0ae00071bad38",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f8028b3a737b3000661b2fa",
          name: "MTNG AT Email Broadcast",
          version: "19",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f8028b3a737b3000661b2fa",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
        {
          id: "5f802988a737b3000661b2fb",
          name: "MTNG AT Social Media Broadcast",
          version: "17",
          "@type": "ServiceLevelProductSpec",
          href:
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f802988a737b3000661b2fb",
          "@schemaLocation":
            "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
        },
      ],
      relatedParty: [],
      attachment: [],
      place: [],
      name: "MTNG AT EB Business Messenger product spefication",
      description: "MTNG AT EB Business Messenger",
      isBundle: true,
      lifecycleStatus: "Launched",
      version: "17",
      "@type": "CompositeProductSpecification",
      "@baseType": "ProductSpecification",
      LoB: "DigitalServices",
      productSpecificationRelationship: [],
      productSpecCharacteristic: [],
      lastUpdate: "2020-10-09T11:40:30.846Z",
      code: "PS1029",
      validFor: {},
      href:
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f802326a737b3000661b2f3",
      "@schemaLocation":
        "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
    },
    bundledProductOffering: [],
    prodSpecCharValueUse: [],
    relatedParty: [],
    lastUpdate: "2020-10-09T11:40:30.938Z",
    code: "PO371b",
    validFor: {
      startDateTime: "2020-10-09T11:26:28.300Z",
      endDateTime: "2021-10-09T11:26:28.306Z",
    },
    externalSystem: [
      {
        id: "396106e8-e397-457c-9446-c5e71325d4db",
        system: "NGB",
        "@type": "MandatoryOffering",
        "@baseType": "Offering",
      },
    ],
    href:
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f802329a737b3000661b2f4",
    "@schemaLocation":
      "http://mmp-dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
  },
];
