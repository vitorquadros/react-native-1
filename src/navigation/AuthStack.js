import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecuperarSenha from '../screens/RecuperarSenha';
import SignUp from '../screens/SignUp';
import SingIn from '../screens/SingIn';
import {signInOptions} from './appBarStyles';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SingIn">
      <Stack.Screen name="SingIn" component={SingIn} options={signInOptions} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
    </Stack.Navigator>
  );
};

export default AuthStack;
