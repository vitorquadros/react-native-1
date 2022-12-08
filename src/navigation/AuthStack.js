import Preload from '../screens/Preload';
import RecuperarSenha from '../screens/RecuperarSenha';
import SignUp from '../screens/SignUp';
import SingIn from '../screens/SingIn';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Preload">
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="SingIn" component={SingIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
    </Stack.Navigator>
  );
}
