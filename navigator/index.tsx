import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { navigationRef } from './NavigationService';
import { RouteConfig, RouteNames } from './route-config';

let Stack = createStackNavigator();

function Navigator(props: any) {
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    console.log('Navigator-first', props);
  }, [props]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{}} initialRouteName={RouteNames.Splash}>
        {RouteConfig.map(({name, component, options}) => {
          return (
            <Stack.Screen
              key={name}
              name={name}
              component={component}
              options={options}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
