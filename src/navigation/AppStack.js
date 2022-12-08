import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {COLORS} from '../assets/colors';
import Appointment from '../screens/Appointment';
import Appointments from '../screens/Appointments';
import Home from '../screens/Home';
import Preload from '../screens/Preload';
import User from '../screens/User';
import Vaccine from '../screens/Vaccine';
import Vaccines from '../screens/Vaccines';
import {homeOptions, preloadOptions, userOptions} from './appBarStyles';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer independent={true}>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      <Stack.Navigator initialRouteName="Preload">
        <Stack.Screen
          name="Preload"
          component={Preload}
          options={preloadOptions}
        />
        <Stack.Screen name="User" component={User} options={userOptions} />
        <Stack.Screen name="Home" component={Home} options={homeOptions} />

        <Stack.Screen name="Vaccine" component={Vaccine} />
        <Stack.Screen name="Vaccines" component={Vaccines} />

        <Stack.Screen name="Appointment" component={Appointment} />
        <Stack.Screen name="Appointments" component={Appointments} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
