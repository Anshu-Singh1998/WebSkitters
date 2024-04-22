import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../Auth Screens/Register';
import Login from '../Auth Screens/Login';
import Home from '../Screens/Home';
import AddProduct from '../Screens/AddProduct';
import EditProduct from '../Screens/EditProduct';
import AppSplashScreen from '../Auth Screens/AppSplashScreen';


const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AppSplashScreen"
          component={AppSplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
