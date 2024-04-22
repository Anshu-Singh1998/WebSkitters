import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
const AppSplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      Auth().onAuthStateChanged(user => {
        const routeName = user !== null ? 'Home' : 'Login';
        navigation.dispatch(StackActions.replace(routeName));

        // navigation.navigate(routeName);
      });
    }, 3000);
    return () => {};
  }, []);

  return (
    <View>
      <Text>Splash Screen</Text>
    </View>
  );
};

export default AppSplashScreen;
