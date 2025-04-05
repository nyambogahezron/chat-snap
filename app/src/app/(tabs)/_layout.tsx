import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Community from './community';
import Chats from './index';
import Status from './status';
import Calls from './calls';

const Tab = createMaterialTopTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator initialRouteName='chats' screenOptions={{}}>
      <Tab.Screen name='community' component={Community} />
      <Tab.Screen name='chats' component={Chats} />
      <Tab.Screen name='status' component={Status} />
      <Tab.Screen name='calls' component={Calls} />
    </Tab.Navigator>
  );
}
