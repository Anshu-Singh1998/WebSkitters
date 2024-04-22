import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';

const EditItem = ({navigation, route}) => {
  const {itemId, itemName, itemPrice, itemDescription, itemImageUrl} =
    route.params;
  console.log(route.params);

  const [newItemName, setNewItemName] = useState(itemName);
  const [newItemDesc, setNewItemDesc] = useState(itemDescription);
  const [newItemCost, setNewItemCost] = useState(itemPrice);
  const [newImageUri, setNewImageUri] = useState(itemImageUrl);

  const handleEditItem = async () => {
    try {
      if (newItemName.length > 0) {
        let imageUrl = newImageUri; // Use newImageUri if it exists, otherwise use the existing imageUri
        if (newImageUri) {
          const uploadUri =
            Platform.OS === 'ios'
              ? newImageUri.replace('file://', '')
              : newImageUri;
          const imageRef = storage().ref().child(`images/${newItemName}`);
          await imageRef.putFile(uploadUri);
          imageUrl = await imageRef.getDownloadURL();
        }
        await firestore().collection('webskittersCrudApp').doc(itemId).update({
          Name: newItemName,
          ImageUrl: imageUrl, // Use imageUrl instead of imageUri
          Description: newItemDesc,
          Price: newItemCost,
        });
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
      setNewImageUri(response.uri);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#a6c8ff" />
      <View style={styles.BackBtnView}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.BackBtn}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.AddProductTextHeading}>Edit Product</Text>
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            placeholder="Enter item Name"
            placeholderTextColor="#4d3235"
            value={newItemName}
            onChangeText={setNewItemName}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            placeholder="Enter item Description"
            placeholderTextColor="#4d3235"
            value={newItemDesc}
            onChangeText={setNewItemDesc}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            placeholder="Enter item Price"
            placeholderTextColor="#4d3235"
            value={newItemCost}
            onChangeText={setNewItemCost}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.ProductImgView}>
          {newImageUri ? (
            <Image
              source={{uri: newImageUri || imageUri}}
              style={styles.ShowProductImg}
            />
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
            onPress={handleEditItem}
            style={styles.AddProductBtn}>
            <Text style={styles.AddProductText}>Edit Product</Text>
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
  BackBtnView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
});
export default EditItem;
