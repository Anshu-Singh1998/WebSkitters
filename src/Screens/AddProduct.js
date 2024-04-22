import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';

const AddItem = ({navigation}) => {
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemCost, setItemCost] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleAddItem = async () => {
    try {
      if (itemName.length > 0) {
        let imageUrl = null;
        if (imageUri) {
          const imageRef = storage().ref().child(`images/${itemName}`);
          await imageRef.putFile(imageUri.uri);
          imageUrl = await imageRef.getDownloadURL();
        }
        await firestore().collection('webskittersCrudApp').add({
          Name: itemName,
          ImageUrl: imageUrl,
          Description: itemDesc,
          Price: itemCost,
        });
        setItemName('');
        setItemDesc('');
        setItemCost('');
        setImageUri(null);
        navigation.navigate('Home');
      } else {
        alert('Please enter a valid item name');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseImage = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setImageUri(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
    <StatusBar barStyle="light-content" backgroundColor="#a6c8ff" />
      <View
        style={styles.BackBtnView}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.BackBtn}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.AddProductTextHeading}>Add Product</Text>
        </View>

        <View style={styles.InputContainer}>
          <TextInput
            placeholder="Enter item Name"
            placeholderTextColor="#4d3235"
            value={itemName}
            onChangeText={setItemName}
            style={styles.inputBox}
          />
        </View>

        <View style={styles.InputContainer}>
          <TextInput
            placeholder="Enter item Description"
            placeholderTextColor="#4d3235"
            value={itemDesc}
            onChangeText={setItemDesc}
            style={styles.inputBox}
          />
        </View>

        <View style={styles.InputContainer}>
          <TextInput
            placeholder="Enter item Price"
            placeholderTextColor="#4d3235"
            value={itemCost}
            onChangeText={setItemCost}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.ProductImgView}>
          {imageUri ? (
            <Image source={{uri: imageUri.uri}} style={styles.ShowProductImg} />
          ) : null}
        </View>
        <View style={styles.ChooseImgBtnView}>
          <TouchableOpacity
            onPress={handleChooseImage}
            style={styles.ChooseImgBtn}>
            <Text style={styles.ChooseImgText}>Choose Image</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.AddProductBtnView}>
          <TouchableOpacity
            onPress={handleAddItem}
            style={styles.AddProductBtn}>
            <Text style={styles.AddProductText}>Add Product</Text>
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
  AddProductBtnView: {padding: 20, width: '100%'},
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
  BackBtn: {fontSize: 16, fontWeight: 'bold', color: '#4d3235'},
  BackBtnView:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  }
});
export default AddItem;
