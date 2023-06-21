import _ from "lodash";
const getField = (data) => (path, defaultvalue) => {
  return _.get(data, path, defaultvalue);
};



const Menuitem = {
  appTheme: "mtn",
  Partner_Profile: [
    {
      label: 'Partner Details',
      name: 'PartnerDetails',
      visible: true
      // action: () => {
      //   handleChange(null, 1);
      // }
    },
    {
      label: 'Tenants',
      name: 'Tenants',
      visible: true
      // action: () => {
      //   handleChange(null, 1);
      // }
    },
    {
      label: 'Products',
      name: 'Products',
      visible: true
      // action: () => {
      //   handleChange(null, 1);
      // }
    },

    {
      label: 'Contracts',
      name: 'Contracts',
      visible: true
      // action: () => {
      //   handleChange(null, 4);
      // }
    },

    {
      label: 'Requests',
      name: 'Requests',
      visible: true
      // action: () => {
      //   handleChange(null, 3);
      // }
    },

    {
      label: 'View Orders',
      name: 'View Orders',
      visible: true
      // action: () => {
      //   handleChange(null, 5);
      // }
    },
    {
      label: 'Financials',
      name: 'Financials',
      visible: true
      // action: () => {
      //   handleChange(null, 2);
      // }

    }


  ],
  Tenant_Partner_Profile: [

    {
      label: 'Tenant Details',
      name: 'PartnerDetails',
      // action: () => {
      //   handleChange(null, 1);
      // }
      visible: true
    },
    {
      label: 'Products',
      name: 'Products',
      // action: () => {
      //   handleChange(null, 1);
      // }
      visible: true
    },
    {
      label: 'Contracts',
      name: 'Contracts',
      // action: () => {
      //   handleChange(null, 5);
      // }
      visible: true
    },

    {
      label: 'Requests',
      name: 'Requests',
      // action: () => {
      //   handleChange(null, 3);
      // }
      visible: true
    },


    {
      label: 'View Orders',
      name: 'View Orders',
      // action: () => {
      //   handleChange(null, 5);
      // }
      visible: true
    },
    {
      label: 'Financials',
      name: 'Financials',
      // action: () => {
      //   handleChange(null, 2);
      // }
      visible: true
    }
  ],



  PartnerProduct: [


    {
      label: 'Product Details',
      name: 'PartnerDetails',
      // action: () => {
      //   handleChange(null, 1);
      // }
      visible: true
    },
    {
      label: 'Contracts',
      name: 'Contracts',
      // action: () => {
      //   handleChange(null, 5);
      // }
      visible: true
    },

    {
      label: 'Requests',
      name: 'Requests',
      // action: () => {
      //   handleChange(null, 3);
      // }
      visible: true
    },
    {
      label: 'View Orders',
      name: 'View Orders',
      // action: () => {
      //   handleChange(null, 5);
      // }
      visible: true
    }


  ],


}

export default { Menuitem, getField }