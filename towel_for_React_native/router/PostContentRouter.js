import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import postContent from '../components/postComponents/postContent/PostContent';

const Stack = createStackNavigator();

export default function PostContentRouter() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="postContent" component={postContent} />
        </Stack.Navigator>
    );
}
