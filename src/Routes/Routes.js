import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import * as ds from '../constants/styles';
import AboutScreen from '../screens/AboutScreen';
import HomeScreen from '../screens/HomeScreen';

const TabbedNavigator = createBottomTabNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <TabbedNavigator.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case 'Convert':
                return <Feather name="refresh-cw" size={size} color={color} />;
              case 'More':
                return <Feather name="menu" size={size} color={color} />;
            }

            return <Feather name="x" size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: ds.primary,
          activeBackgroundColor: ds.white,
          inactiveTintColor: ds.grey,
        }}
      >
        <>
          <TabbedNavigator.Screen name="Convert" component={HomeScreen} />
          <TabbedNavigator.Screen name="More" component={AboutScreen} />
        </>
      </TabbedNavigator.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
