import {NavigationContainer} from '@react-navigation/native';
import {COLORS} from '../assets/colors';
import RecuperarSenha from '../screens/RecuperarSenha';
import SignUp from '../screens/SignUp';
import SingIn from '../screens/SingIn';
import {signInOptions} from './appBarStyles';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      <Stack.Navigator initialRouteName="SingIn">
        <Stack.Screen
          name="SingIn"
          component={SingIn}
          options={signInOptions}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
