import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Achievement from 'pages/Achievement';
import Home from 'pages/Home';
import Courses from 'pages/Courses';
import SettingProfile from 'pages/Profile/Setting';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ColorScheme} from 'ColorScheme';

interface TabIcon {
  [key: string]: string;
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const iconTab: TabIcon = {
  Home: 'home',
  Courses: 'book',
  Achievement: 'trophy',
  'My Course': 'book-open-page-variant',
  Account: 'account',
};

function Dashboard() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: ColorScheme.primary,
        tabBarInactiveTintColor: '#202244',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: 'bold',
        },
        headerShown: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({color, size}) => {
          return <Icon name={iconTab[route.name]} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Courses" component={Courses} />
      <Tab.Screen name="Achievement" component={Achievement} />
      <Tab.Screen name="My Course" component={Courses} />
      <Tab.Screen name="Account" component={SettingProfile} />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
