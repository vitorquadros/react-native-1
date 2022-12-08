import Home from '../screens/Home';
import User from '../screens/User';

const Drawer = createDrawerNavigator();

export default function AppStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="User" component={User} />
    </Drawer.Navigator>
  );
}
