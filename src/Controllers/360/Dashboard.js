import { createAsyncThunk } from '@reduxjs/toolkit';
import dashboardAPI from 'Http/360/Api/Dashboard';
import dprmDashboardAPI from 'Http/api/dashboard';
import Modal from 'Store/Modals';
import Alert from 'Store/Alert';
import { history } from 'Store';
import partnerList from 'Factory/Partner';
import update from 'update-immutable';
import auth from 'Http/api/auth';
import Modals from 'Store/Modals';
import Worlflowpayload from 'Factory/Worlflowpayload';

const SelfcarePartnerview = createAsyncThunk(
  'dashboard/SelfcarePartnerview',
  async ({ id }) => {
    // dispatch(Modal.close('leadView'));
    const data = await dashboardAPI.partnerView(id).catch((err) => {});

    let parnerDetails = partnerList.makePartnerList(_.get(data, '[0]', ''));

    let makeObj = {
      details: parnerDetails.searchlist,
      mainlist: parnerDetails.list
    };

    return makeObj;
  }
  // return data;
);

const SefcareTenantsOverview = createAsyncThunk(
  'dashboard/SefcareTenantsOverview',
  async ({ id }) => {
    const data = await dashboardAPI.getTenantdetails(id).catch((err) => {});

    let url = `Tenant_Partner_Profile/${data[0]._id}/${id}`;

    const data1 = await dprmDashboardAPI.getPartnerObj(url).catch((err) => {});

    let parnerDetails = partnerList.makeTenantsearchList(data1);

    return update(
      {},
      {
        $merge: {
          details: parnerDetails.searchlist,
          mainlist: parnerDetails.list
        }
      }
    );
  }

  // return data;
);

const getmenulist = createAsyncThunk(
  'dashboard/getmenulist',
  async ({ payload }) => {
    const data = await dashboardAPI.menuItemlist(payload).catch((err) => {});

    return data;
  }
);
const VerifyOTP = createAsyncThunk(
  'dashboard/VerifyOTP',
  async ({ payload, deactive }, { dispatch }) => {
    const data = await auth
      .VerifyOtpApi(payload, { dispatch })
      .catch((err) => {});

    if (data?.status === 200) {
      const data = await dashboardAPI
        .Deactivateaccount(deactive)
        .catch((err) => {});

      if (data.code === '200') {
        dispatch(
          Alert.open({
            type: 'success',
            message: 'Your Account successfully De-Activated'
          })
        );
        dispatch(Modals.close('OtpModal'));
        history.push('/');
      }
    }

    return data;
  }
);

const DeactivateAcc = createAsyncThunk(
  'dashboard/DeactivateAcc',
  async ({ payload }) => {
    return data;
  }
);

const MasterList_user = createAsyncThunk(
  'dashboard/MasterList_user',
  async ({ id }) => {
    const data = await dashboardAPI.User_MasterList(id).catch((err) => {});

    return data;
  }
);
const TenentList_user = createAsyncThunk(
  'dashboard/TenentList_user',
  async ({ id }) => {
    const data = await dashboardAPI.User_TenantList(id).catch((err) => {});

    return data;
  }
);

const Add_user = createAsyncThunk(
  'dashboard/Add_user',
  async ({ payload, partnerlist }, { dispatch }) => {
    const data = await dashboardAPI
      ._AddUser(payload, { dispatch })
      .catch((err) => {});

    if (data) {
      await dprmDashboardAPI.workflowTrigger(
        Worlflowpayload.addUserWorkFlow(data, partnerlist)
      );
      dispatch(
        Alert.open({
          type: 'Success',
          message: 'User Added Successfully !!!'
        })
      );

      dispatch(Modal.close('AddUser'));
      dispatch(Modal.close('AddProduct'));
      await dispatch(TenentList_user({ id: partnerlist?.mainlist?.partnerId }));
      await dispatch(MasterList_user({ id: partnerlist?.mainlist?.partnerId }));
      return data;
    }
  }
);

const Modify_user = createAsyncThunk(
  'dashboard/Modify_user',
  async ({ payload, partnerlist }, { dispatch }) => {
    const data = await dashboardAPI
      ._ModifyUser(payload, { dispatch })
      .catch((err) => {});

    if (data) {
      dispatch(
        Alert.open({
          type: 'Success',
          message: 'User Details Updated Successfully !!!'
        })
      );
      dispatch(Modal.close('AddUser'));
      dispatch(Modal.close('AddProduct'));
      await dispatch(TenentList_user({ id: partnerlist?.mainlist?.partnerId }));
      await dispatch(MasterList_user({ id: partnerlist?.mainlist?.partnerId }));
      return data;
    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: 'Please try again !!!'
        })
      );
    }
  }
);

const Create_Ticket = createAsyncThunk(
  'dashboard/Create_Ticket',
  async ({ payload, id }, { dispatch }) => {
    const data = await dashboardAPI._DTT_Workflow(payload).catch((err) => {});
    if (data?.apiResponse?.status === '200 OK') {
      // dispatch(Alert.open({
      //   type: "Success",
      //   message: "User Details Updated Successfully !!!"
      // }))
      dispatch(Modal.close('LogTicket'));
      dispatch(
        Modal.open({
          id: 'TicketSuccess',
          context: id
        })
      );
      // await dispatch(TenentList_user())
      // await dispatch(MasterList_user())
      return data;
    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: 'Please try again !!!'
        })
      );
    }
  }
);

export default {
  SelfcarePartnerview,
  SefcareTenantsOverview,
  getmenulist,
  DeactivateAcc,
  VerifyOTP,
  MasterList_user,
  TenentList_user,
  Add_user,
  Modify_user,
  Create_Ticket
};
