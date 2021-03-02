import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const App = () => {
  const [state, setState] = useState({
    photo: '',
  });

  const option = {
    mediaType: 'photo',
    quality: 1,
    saveToPhotos: true,
  };

  const toast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const openCamera = () => {
    launchCamera(option, (res) => {
      if (res.didCancel) {
        toast('take a picture canceled');
      } else if (res.errorCode) {
        toast('error while open camera', res.errorCode);
      } else {
        setState({photo: res.uri});
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary(option, (res) => {
      if (res.didCancel) {
        toast('gallery open canceled');
      } else if (res.errorCode) {
        toast('error while open camera', res.errorCode);
      } else {
        setState({photo: res.uri});
      }
    });
  };

  return (
    <View style={styles.container}>
      {state.photo == '' ? (
        <Text>No Image</Text>
      ) : (
        <Image source={{uri: state.photo}} style={styles.image} />
      )}
      <View style={styles.wrapBtn}>
        <TouchableOpacity onPress={openCamera}>
          <Text>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery}>
          <Text>Open Galerry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  wrapBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginTop: 50,
  },
  image: {
    height: 250,
    width: 250,
  },
});
