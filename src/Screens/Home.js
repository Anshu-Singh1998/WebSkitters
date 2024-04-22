import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import Auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getDatabase();
  }, []);

  //   Fetch the Firestore Data

  const getDatabase = async () => {
    try {
      firestore()
        .collection('webskittersCrudApp')
        .onSnapshot(snap => {
          const tempArray = [];
          snap.forEach(item => {
            tempArray.push({
              ...item.data(),
              id: item.id,
            });
          });

          setList(tempArray);
        });

      // // const data = await database().ref('todo').once('value');
      // const data = await database()
      //   .ref('todo')
      //   .on('value', tempData => {
      //     console.log(data);
      //     setList(tempData.val());
      //   });
    } catch (err) {
      console.log(err);
    }
  };

  // Delete the selected  Item

  const handleDeleteItem = (itemId, itemName) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${itemName}"?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Deletion canceled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await firestore()
                .collection('webskittersCrudApp')
                .doc(itemId)
                .delete();
            } catch (error) {
              console.log(error);
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  //   Navigates to EditProduct Screen by taking all the elements from item as params

  const handleEditItem = (
    itemId,
    itemName,
    itemDescription,
    itemPrice,
    itemImageUrl,
  ) => {
    navigation.navigate('EditProduct', {
      itemId,
      itemName,
      itemDescription,
      itemPrice,
      itemImageUrl,
    });
  };

  //   Navigates to AddProduct Screen

  const handleAddItem = () => {
    navigation.navigate('AddProduct');
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#a6c8ff" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.Details}>
            <View>
              <Image
                source={{uri: Auth().currentUser.photoURL}}
                style={styles.UserImg}
              />
            </View>
            <View>
              <Text style={styles.UserMail}>{Auth().currentUser.email}</Text>
            </View>
          </View>
          <View style={styles.AddBtnView}>
            <TouchableOpacity onPress={handleAddItem} style={styles.AddBtn}>
              <Text style={styles.AddBtnText}>Add Item</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={list}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View style={styles.DetailsSpace}>
                  <View style={styles.ProductDetailsRow}>
                    <View>
                      <Image
                        source={{uri: item.ImageUrl}}
                        style={styles.ProductImg}
                      />
                    </View>
                    <View>
                      <Text style={styles.ProductName}>{item.Name}</Text>
                    </View>
                  </View>
                  <View style={styles.ActionView}>
                    <View style={styles.EditBtnView}>
                      <TouchableOpacity
                        style={styles.EditBtn}
                        onPress={() =>
                          handleEditItem(
                            item.id,
                            item.Name,
                            item.Description,
                            item.Price,
                            item.ImageUrl,
                          )
                        }>
                        <Text style={styles.EditBtnText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={styles.DeleteBtn}
                        onPress={() => handleDeleteItem(item.id, item.Name)}>
                        <Text style={styles.DeleteBtnText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />

          <View>
            <TouchableOpacity
              onPress={async () => {
                await Auth().signOut();
                navigation.dispatch(StackActions.popToTop());
              }}
              style={styles.LogOutBtn}>
              <Text style={styles.LogOutBtnText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8ffa6',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 120,
    paddingLeft: 20,
    paddingRight: 20,
  },

  cardContainer: {
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#c4ffc8',
    width: '100%',
    padding: 20,
    borderRadius: 30,
    marginVertical: 10,
  },
  LogOutBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  LogOutBtn: {
    backgroundColor: '#a6c8ff',
    padding: 20,
    borderRadius: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddBtn: {
    backgroundColor: '#77b4f2',
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    padding: 10,
  },
  AddBtnView: {justifyContent: 'flex-end', alignItems: 'flex-end'},
  AddBtnText: {color: '#fff', fontSize: 14, fontWeight: 'bold'},
  EditBtn: {
    backgroundColor: 'green',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    padding: 10,
  },
  EditBtnText: {color: '#fff', fontSize: 14, fontWeight: 'bold'},
  EditBtnView: {paddingRight: 20},
  DeleteBtn: {
    backgroundColor: 'red',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    padding: 10,
  },
  DeleteBtnText: {color: '#fff', fontSize: 14, fontWeight: 'bold'},
  ActionView: {flexDirection: 'row'},
  ProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4d3235',
  },
  ProductImg: {width: 40, height: 40, borderRadius: 20},
  ProductDetailsRow: {
    flexDirection: 'row',
  },
  DetailsSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  UserMail: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4d3235',
  },
  UserImg: {width: 50, height: 50, borderRadius: 25},
  Details: {flexDirection: 'row', paddingTop: 30},
});

export default Home;
