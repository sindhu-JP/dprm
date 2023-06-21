import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth )
  return <Route { ...rest } render={(props) => (
    auth.authenticated ?
    <Component { ...props } /> :
    <Redirect to="/login" />
  )} />
}

PrivateRoute.propTypes = {}
export default PrivateRoute
