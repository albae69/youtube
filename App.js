import React, {useState} from 'react';
import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';

const App = () => {
  const [state, setState] = useState({
    dataModal: {name: 'Hello'},
    visible: false,
  });

  const ModalView = () => {
    return (
      <Modal visible={state.visible}>
        <View>
          <Text>{state.dataModal.name}</Text>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <Pressable onPress={() => setState({...state, visible: true})}>
        <Text>Press me</Text>
      </Pressable>
      <ModalView />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
