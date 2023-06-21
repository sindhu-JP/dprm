import React from 'react';
import { connect } from 'react-redux';
import HomeView from './Home';
import { Alert } from 'Components';
import AlertActions from 'Store/Alert';
import DashboardLayout from 'Layouts/Dashboard';
import Dashboard from '../../Features/360/components/Customer/Customer';

const Home = (props) => {
  React.useEffect(() => {}, []);

  console.log(props?.location,  "location props")
  return (
    <DashboardLayout>
      {props.authState?.user?.sub === 'dlpmbackofficemanager' ? (
        <Dashboard
          user={props.authState.user}
          alert={() => {}}
          profileCardHeading="Welcome to back office dashboard"
        />
      ) : (
        <HomeView
          user={props.authState.user}
          alert={() => {}}
          token={props.authState.token}
          location={props?.location}
          profileCardHeading="Welcome to presales dashboard"
        />
      )}

      <Alert
        open={props.alertState.open}
        onClose={props.closeAlert}
        message={props.alertState.message}
        type={props.alertState.type}
      />
      {/* <CopyRightFooter/> */}
    </DashboardLayout>
  );
};

export default connect(
  (state) => ({
    alertState: state.alert,
    authState: state.auth
  }),
  {
    closeAlert: AlertActions.close
  }
)(Home);
