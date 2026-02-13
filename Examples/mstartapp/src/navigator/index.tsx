import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeContext} from '~/theme';
import {RouteConfig, RouteNames} from './route-config';
import {navigationRef} from './NavigationService';

let Stack = createStackNavigator();

function Navigator(props: any) {
  const {theme} = useContext(ThemeContext);
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    console.log('Navigator-first', props);
  }, []);

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
