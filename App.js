import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import SingIn from './src/screens/SingIn';
import SignUp from './src/screens/SignUp';
import RecuperarSenha from './src/screens/RecuperarSenha';
import OutraHome from './src/screens/OutraHome';
import Preload from './src/screens/Preload';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SingIn" component={SingIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
      </Stack.Navigator>
    );
  };

  const AppStack = () => (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="OutraHome" component={OutraHome} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppStack" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
