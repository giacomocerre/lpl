// components/PrivateView.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context';
import Loader from '../components/loader/loader';

const PrivateView = ({ component }) => {
  const { userLoggedIn, loading } = useAuth();

  if (loading) {
    return <Loader/>;
  }

  const ComponentWithProps = React.cloneElement(component);

  return userLoggedIn ? ComponentWithProps : <Navigate to="/login" replace />;
};

export default PrivateView;
