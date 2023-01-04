import React from 'react';
import {ApiProvider} from '../context/ApiProvider';
import {AppointmentProvider} from '../context/AppointmentProvider';
import {AuthProvider} from '../context/AuthProvider';
import {DoctorProvider} from '../context/DoctorProvider';
import Routes from './Routes';

export default Providers = () => {
  return (
    <AuthProvider>
      <ApiProvider>
        <DoctorProvider>
          <AppointmentProvider>
            <Routes />
          </AppointmentProvider>
        </DoctorProvider>
      </ApiProvider>
    </AuthProvider>
  );
};
