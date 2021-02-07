import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/Home';
import Mapa from '../components/Mapa';
import Table from '../components/Table';

import TabBar from '../components/TabBar';


const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name='Donadores'
        component={Home}
        initialParams={{ icon: 'home' }}
      />
      <Tab.Screen
        name='Rutas'
        component={Mapa}
        initialParams={{ icon: 'plus' }}
      />
      <Tab.Screen
        name='Tabla'
        component={Table}
        initialParams={{ icon: 'plus' }}
      />
      
    </Tab.Navigator>
  );
};

export default TabNavigator;
