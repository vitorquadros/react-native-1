import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../componentes/CustomDrawerContent';
import Appointment from '../screens/Appointment';
import Appointments from '../screens/Appointments';
import Home from '../screens/Home';
import Preload from '../screens/Preload';
import User from '../screens/User';
import Vaccine from '../screens/Vaccine';
import Vaccines from '../screens/Vaccines';
import {
  appointmentsOptions,
  doctorOptions,
  doctorsOptions,
  drawerOptions,
  homeOptions,
  preloadOptions,
  userOptions,
} from './appBarStyles';
import MapAppointments from '../screens/MapAppointments';
import Doctors from '../screens/Doctors';
import Doctor from '../screens/Doctor';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Preload"
      screenOptions={drawerOptions}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Preload"
        component={Preload}
        options={preloadOptions}
      />
      <Drawer.Screen name="User" component={User} options={userOptions} />
      <Drawer.Screen name="Home" component={Home} options={homeOptions} />
      <Drawer.Screen name="Vaccine" component={Vaccine} />
      <Drawer.Screen name="Vaccines" component={Vaccines} />
      <Drawer.Screen name="Doctor" component={Doctor} options={doctorOptions} />
      <Drawer.Screen
        name="Doctors"
        component={Doctors}
        options={doctorsOptions}
      />
      <Drawer.Screen name="Appointment" component={Appointment} />
      <Drawer.Screen
        name="Appointments"
        component={Appointments}
        options={appointmentsOptions}
      />
      <Drawer.Screen
        name="MapAppointments"
        component={MapAppointments}
        options={appointmentsOptions}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
