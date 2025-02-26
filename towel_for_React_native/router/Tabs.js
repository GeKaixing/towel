import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Post from '../components/Post';
import Add from '../components/Add';
import UserStack from './userRouter';
import Masssage from '../components/Masssage';
const Tab = createBottomTabNavigator();
export default function Tabs() {
  return (
    <Tab.Navigator
    
      screenOptions={{
        tabBarIcon: () => null,
        tabBarLabelStyle: {
          padding: 10,
          fontSize: 24,
          fontWeight: 'bold'

        }
      }}
    >
      <Tab.Screen name="post" component={Post} options={{  headerTitleAlign: 'center'  }} />
      <Tab.Screen name="add" component={Add} options={{  headerTitleAlign: 'center'  }}/>
      <Tab.Screen name="mas" component={Masssage} options={{  headerTitleAlign: 'center'  }}/>
      <Tab.Screen name="user" component={UserStack} options={{  headerTitleAlign: 'center'  }} />
    </Tab.Navigator>
  );
}
