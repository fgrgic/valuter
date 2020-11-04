import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { SettingsContext } from '../../DefaultContainer';
import AboutScreen from '../screens/AboutScreen';
import HomeScreen from '../screens/HomeScreen';

const TabbedNavigator = createBottomTabNavigator();

const Routes = () => {
  const { colors } = useContext(SettingsContext);

  return (
    colors && (
      <NavigationContainer>
        <TabbedNavigator.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              switch (route.name) {
                case 'Convert':
                  return (
                    <Feather name="refresh-cw" size={size} color={color} />
                  );
                case 'More':
                  return <Feather name="menu" size={size} color={color} />;
              }

              return <Feather name="x" size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: colors.primary,
            activeBackgroundColor: colors.white,
            inactiveTintColor: colors.primary30,
            inactiveBackgroundColor: colors.almostWhite,
          }}
        >
          <>
            <TabbedNavigator.Screen name="Convert" component={HomeScreen} />
            <TabbedNavigator.Screen name="More" component={AboutScreen} />
          </>
        </TabbedNavigator.Navigator>
      </NavigationContainer>
    )
  );
};

export default Routes;
