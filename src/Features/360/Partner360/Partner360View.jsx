import React from 'react';
import Partner360 from './Partner360';

export default function Partner360View() {
  React.useEffect(() => {
    if (props.location?.state?.detail) {
      props.DynamicMenulist();
      Details.setValue(props.location.state?.detail);
      const { details, mainlist } = props.location.state?.detail;
      if (details?.formIdentity === 'Partner_Profile') {
        // props.DcmProductlist({ id: mainlist.partnerId });
        // showTabs.setValue(constant.Patnertabs);
        // setTabname('PartnerDetails');
        // getPartnerId.setValue(mainlist.partnerId);
        // hideTenant.setTrue();
        // props.orderTracking({ id: mainlist.partnerId });
        // getwalletBal(mainlist.partnerId);
        // hideProducts.setTrue();
        // props.getproductLists({ id: mainlist.partnerId });
        // props.SearchAddContract({ id: mainlist.partnerId });
        // props.getTenantLists({ id: mainlist.partnerId });
        // props.getproductAll({ id: mainlist.partnerId });
      } else if (details?.formIdentity === 'Tenant_Partner_Profile') {
        // showTabs.setValue(constant.TenantTabs);
        // setTabname('PartnerDetails');
        // hideTabProducts.setTrue();
        // getwalletBal(mainlist.partnerId);
        // props.orderTracking({ id: mainlist.partnerId });
        // hideProducts.setTrue();
        // getPartnerId.setValue(mainlist.partnerUid);
        // props.SearchAddContract({ id: mainlist.partnerId });
        // props.getproductLists({ id: mainlist.partnerId });
        // props.getproductAll({ id: mainlist.partnerId });
      } else if (details?.formIdentity === 'Add_Product') {
        // hideTenant.setTrue()
        // setTabname('PartnerDetails');
        // hideTenant.setTrue();
        // hideProducts.setTrue();
        // getPartnerId.setValue(mainlist.partnerUid);
        // showTabs.setValue(constant.PartnerProduct);
        // props.orderTracking({ id: mainlist.partnerUid });
      }
    }
  }, [props.location]);
  // get
  return (
    <div>
      <Partner360 />
    </div>
  );
}
