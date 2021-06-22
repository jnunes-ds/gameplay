import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, SingIn } from '../screens';
import { theme } from '../global/styles/theme';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(){
    return (
        <Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: theme.colors.secondary100
                }
            }}
        >
            <Screen
                name="SingIn"
                component={SingIn}
            />
            <Screen 
                name="Home"
                component={Home}
            />
        </Navigator>
    );
}