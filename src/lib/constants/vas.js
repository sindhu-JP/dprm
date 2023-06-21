// export default [
//     {
//       id: "5f341ad9d12c54000839fe6b",
//       allowedProductAction: {
//         channels: [],
//       },
//       businessType: ["Postpaid"],
//       place: [],
//       category: [
//         {
//           id: "5cfa5323a9060a9e0960c0f2",
//           href:
//             "http://dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-category/5cfa5323a9060a9e0960c0f2",
//           lastUpdate: "2019-01-01T00:00:00.000Z",
//           parentId: "",
//           isRoot: true,
//           name: "VAS",
//           description: "A category for VAS",
//           lifecycleStatus: "Active",
//           version: "0",
//           "@schemaLocation":
//             "http://dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-category",
//         },
//       ],
//       agreement: [],
//       marketSegment: [
//         {
//           id: "5d43cbcc18adf5f90f2af544",
//           href: "https://host:port/productOfferingReferences/marketSegmentRef/2",
//           name: "Enterprise",
//           "@referredType": "Corporate",
//           isRoot: true,
//           parentId: "",
//         },
//         {
//           id: "5d4bdbff528c2425c23289b5",
//           name: "Individual Customer",
//           code: "I",
//           "@referredType": "Retail",
//           default: "Y",
//           isRoot: true,
//           parentId: "",
//         },
//         {
//           id: "5d4beeb9528c2425c232c3e4",
//           name: "Corporate",
//           code: "B",
//           "@referredType": "Corporate",
//           default: "Y",
//           isRoot: true,
//           parentId: "",
//         },
//         {
//           id: "5efc56a6394b7ed88148c297",
//           href: "https://host:port/productOfferingReferences/marketSegmentRef/10",
//           name: "EB",
//           "@referredType": "EB",
//           isRoot: true,
//           parentId: "",
//         },
//       ],
//       channel: [
//         {
//           id: "5d38891b83ba2e1cba2de852",
//           href: "https://host:port/catalogManagement/channel/1",
//           name: "CRM",
//           "@referredType": "CRM",
//         },
//         {
//           id: "5d38892b83ba2e1cba2de87b",
//           href: "https://host:port/catalogManagement/channel/2",
//           name: "Webshop",
//           "@referredType": "CRM",
//         },
//         {
//           id: "5d38893c83ba2e1cba2de8a7",
//           href: "https://host:port/catalogManagement/channel/3",
//           name: "Selfcare",
//           "@referredType": "CRM",
//         },
//       ],
//       attachment: [],
//       productOfferingTerm: [],
//       productOfferingPrice: [
//         {
//           id: "5f341ad8d12c54000839fe68",
//           pricingLogicAlgorithm: [],
//           constraint: [],
//           popRelationship: [],
//           bundledPopRelationship: [],
//           place: [],
//           productOfferingTerm: [],
//           charges: [
//             {
//               name: "Connection Charges",
//               chargeClass: "OneTime",
//               taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
//               taxPlanName: "5%  Tax Plan",
//               id: "2f68a953-9f54-4739-bf9c-34e60d57a25a",
//               glCode: "General Ledger Code",
//               time: "2020-09-18T06:32:14",
//               chargeType: "OneTimeUpfront",
//               offeringType: "MandatoryOffering",
//             },
//           ],
//           name: "USSD VAS OneTimeCharge",
//           description: "This VAS provides 200 TPS for USSD offers.",
//           version: "15",
//           lastUpdate: "2020-09-24T05:57:47.547Z",
//           isBundle: false,
//           isServiceActionPrice: false,
//           lifecycleStatus: "Launched",
//           validFor: {
//             startDateTime: "2020-08-12T00:00:00.000Z",
//             endDateTime: "2023-08-13T00:00:00.000Z",
//           },
//           priceType: "OneTimeCharge",
//           recurringChargePeriodType: "",
//           recurringChargePeriodLength: 0,
//           percentage: 0,
//           price: {
//             value: 100,
//             unit: "GHS",
//           },
//           tax: [
//             {
//               taxAmount: {
//                 value: 5,
//                 unit: "GHS",
//               },
//               taxCategory: "VAT",
//               taxRate: 5,
//             },
//           ],
//           "@baseType": "ProdOfferPriceCharge",
//           "@type": "OneTimeChargeProdOfferPriceCharge",
//           prodOfferPriceAction: [],
//           prodSpecCharValueUse: [],
//           agreementCharValueUse: [],
//           code: "POP461",
//           unitOfMeasure: "Currency",
//           href:
//             "http://dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f341ad8d12c54000839fe68",
//           "@schemaLocation":
//             "http://dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
//         },
//         {
//           id: "5f341ad8d12c54000839fe69",
//           pricingLogicAlgorithm: [],
//           constraint: [],
//           popRelationship: [],
//           bundledPopRelationship: [],
//           place: [],
//           productOfferingTerm: [],
//           charges: [
//             {
//               name: "Monthly Rental Charges",
//               chargeClass: "Recurring",
//               taxPlanId: "3b1d9dde-bead-439e-9892-af90d3a9d3f0",
//               taxPlanName: "5%  Tax Plan",
//               id: "3c6de6de-9f41-490d-961b-0d8fb5f81476",
//               glCode: "General Ledger Code",
//               time: "2020-09-18T06:32:01",
//               chargeType: "RecurringInArrearsFixed",
//               offeringType: "MandatoryOffering",
//             },
//           ],
//           name: "USSD VAS Rental",
//           description: "This VAS provides 200 TPS for USSD offers.",
//           version: "17",
//           lastUpdate: "2020-09-24T05:57:47.646Z",
//           isBundle: false,
//           isServiceActionPrice: false,
//           lifecycleStatus: "Launched",
//           validFor: {
//             startDateTime: "2020-08-12T00:00:00.000Z",
//             endDateTime: "2023-08-13T00:00:00.000Z",
//           },
//           priceType: "Rental",
//           recurringChargePeriodType: "monthly",
//           recurringChargePeriodLength: 1,
//           percentage: 0,
//           price: {
//             value: 200,
//             unit: "GHS",
//           },
//           tax: [
//             {
//               taxAmount: {
//                 value: 10,
//                 unit: "GHS",
//               },
//               taxCategory: "VAT",
//               taxRate: 5,
//             },
//           ],
//           "@baseType": "ProdOfferPriceCharge",
//           "@type": "RecurringChargeProdOfferPriceCharge",
//           prodOfferPriceAction: [],
//           prodSpecCharValueUse: [],
//           agreementCharValueUse: [],
//           code: "POP462",
//           href:
//             "http://dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering-price/5f341ad8d12c54000839fe69",
//           "@schemaLocation":
//             "http://dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering-price",
//         },
//       ],
//       bundledProductOffering: [],
//       relatedParty: [],
//       name: "USSD VAS (200 TPS)",
//       description: "This VAS provides 200 TPS for USSD offers.",
//       isBundle: false,
//       isSellable: true,
//       version: "16",
//       "@type": "SimpleProductOffering",
//       "@baseType": "ProductOffering",
//       validFor: {
//         startDateTime: "2020-08-12T00:00:00.000Z",
//         endDateTime: "2023-08-13T00:00:00.000Z",
//       },
//       lifecycleStatus: "Launched",
//       lastUpdate: "2020-09-24T05:57:47.728Z",
//       productSpecification: {
//         id: "5f341ad9d12c54000839fe6a",
//         businessType: ["Postpaid"],
//         technology: ["USSD"],
//         resourceSpecification: [],
//         serviceSpecification: ["5f341c5f4c4a140008d4b48a"],
//         bundledProductSpecification: [],
//         relatedParty: [],
//         attachment: [],
//         name: "TPS VAS",
//         description: "Mobile Data",
//         version: "55",
//         brand: "Airtalk",
//         lob: "DigitalServices",
//         isBundle: false,
//         lastUpdate: "2020-10-07T10:16:49.246Z",
//         lifecycleStatus: "Active",
//         productNumber: "1",
//         validFor: {
//           startDateTime: "2020-08-12T00:00:00.000Z",
//           endDateTime: "2023-08-13T00:00:00.000Z",
//         },
//         "@type": "ServiceLevelProductSpec",
//         "@baseType": "AtomicProductSpecification",
//         productSpecCharacteristic: [
//           {
//             valueType: "number",
//             name: "TPS",
//             configurable: true,
//             "@type": "numeric",
//             minCardinality: 0,
//             maxCardinality: 0,
//             isUnique: true,
//             regex: "",
//             extensible: false,
//             ProductSpecCharRelationship: [],
//             productSpecCharacteristicValue: [
//               {
//                 valueType: "number",
//                 value: 200,
//                 isDefault: true,
//                 unitOfMeasure: "TPS",
//               },
//             ],
//           },
//         ],
//         targetProductSchema: {
//           "@type": "DOM",
//         },
//         productSpecificationRelationship: [],
//         code: "PS667",
//         href:
//           "http://dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-specification/5f341ad9d12c54000839fe6a",
//         "@schemaLocation":
//           "http://dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-specification",
//       },
//       prodSpecCharValueUse: [],
//       code: "PO24002",
//       externalSystem: {
//         id: "edeb39eb-f46c-4773-ad71-c759e7eb05c8",
//         system: "NGB",
//         "@type": "OptionalOffering",
//         "@baseType": "Offering",
//       },
//       href:
//         "http://dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/v1/product-offering/5f341ad9d12c54000839fe6b",
//       "@schemaLocation":
//         "http://dcm.cluster1.devtestlab2.tecnotree.com/dcm/product-catalogue/schema/v1/product-offering",
//     },
// ];