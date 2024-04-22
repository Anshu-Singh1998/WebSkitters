import * as React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const isUserCreated = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        setMessage('');
        // Navigate back to Login screen after successful registration
        navigation.navigate('Login');
      } else {
        Alert.alert('Enter all the data');
      }
      console.log('isUserCreated', isUserCreated);
    } catch (err) {
      setMessage(err.message);

      console.log(err);
    }
  };

  return (
    <SafeAreaView>
    <StatusBar barStyle="light-content" backgroundColor="#a6c8ff" />
      <View style={styles.container}>
        <View>
          <Text style={styles.AddProductTextHeading}>Register Screen</Text>
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#4d3235"
            value={email}
            onChangeText={setEmail}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            placeholderTextColor="#4d3235"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.ChooseImgBtnView}>
          <TouchableOpacity onPress={handleSignUp} style={styles.ChooseImgBtn}>
            <Text style={styles.ChooseImgText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.AddProductTextHeading}>{message}</Text>
        </View>
        <View style={styles.AddProductBtnView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.AddProductBtn}>
            <Text style={styles.AddProductText}>Already Have Account ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: -60,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputBox: {
    borderColor: '#000',
    borderWidth: 2,
    padding: 20,
    borderRadius: 28,
  },
  InputContainer: {padding: 20, width: '100%'},
  AddProductText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  AddProductBtn: {
    backgroundColor: '#b1e6fc',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddProductBtnView: {padding: 10, width: '100%'},
  ChooseImgText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  ChooseImgBtn: {
    backgroundColor: '#0b3547',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ChooseImgBtnView: {padding: 20, width: '100%'},
  ShowProductImg: {height: 100, width: 100},
  ProductImgView: {padding: 20},
  AddProductTextHeading: {fontSize: 20, fontWeight: 'bold', color: '#4d3235'},


});

export default Register;
