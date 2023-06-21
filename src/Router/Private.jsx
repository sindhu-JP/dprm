import React from 'react';
import { Route } from 'react-router-dom';

const Private = ({
  component: Component,
  isAuthenticated,
  redirectTo,
  callback,
  ...rest
}) => {
  React.useEffect(() => {
    if (!isAuthenticated) {
      callback();
    }
  }, []);

  return isAuthenticated ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : null;
};

export default Private;
