const appRoutes = {
  baseurl: '/',
  dashboard: '/dashboard',
  dashboardRequests: '/dashboard/requests',
  dashboardOffers: '/registration/offers',
  dashboardTroubleTicket: '/dashboard/troubleTicket',
  oAuth: '/auth', // callback URL
  customer360: '/customer360',
  sideMenu360: {
    accountDetail: '/customer360/account',
    customerDetail: '/customer360'
  },
  registration: {
    offers: 'offers',
    productCapture: 'productcapture',
    customerCapture: 'customercapture',
    paymentCapture: 'paymentcapture'
  },
  customerRequest: {
    customerRequest: '/customerRequest',
    productAdd: 'offers',
    productCapture: 'productcapture',
    paymentCapture: 'paymentcapture',
    suspension: 'suspension'
  },
  dashboard2Request: '/dashboard2',
  troubleTicket: '/troubleTicket',
  tSat: '/tSat',
  serviceRequest: '/serviceRequest',
  dashboardBulkUpload: '/dashboard/bulkupload',
  dashboardAccountManagement: '/dashboard/accountManagement'
};

export default appRoutes;
