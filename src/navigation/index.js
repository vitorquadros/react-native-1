import React from 'react';
import {AppointmentProvider} from '../context/AppointmentProvider';
import {AuthProvider} from '../context/AuthProvider';
import Routes from './Routes';

export default Providers = () => {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <Routes />
      </AppointmentProvider>
    </AuthProvider>
  );
};
