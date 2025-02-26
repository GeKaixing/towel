import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Tabs'
import postContent from '../components/postComponents/postContent/PostContent';
const Stack = createStackNavigator();

export default function indexRouter() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }}/>
        <Stack.Screen name="postContent" component={postContent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}