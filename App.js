import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';

const App = () => {
  const [data, setData] = useState([
    {
      id: 1,
      bookName: 'Harry Potter',
    },
    {
      id: 2,
      bookName: 'Harry Potter 2',
    },
    {
      id: 3,
      bookName: 'Harry Potter 3',
    },
  ]);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({id: '', bookName: ''});
  const [text, setText] = useState('');

  const Card = ({item}) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => editData(item)}>
        <Text>{item.bookName}</Text>
        <TouchableOpacity onPress={() => deleteData(item.id)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const createData = () => {
    const datas = {id: data.length + 1, bookName: text};
    setData(data.concat(datas));
    setText('');
    Keyboard.dismiss();
  };

  const editData = (item) => {
    setEdit(true);
    setText(item.bookName);
    setForm(item);
  };

  const editTheData = () => {
    const datas = {id: form.id, bookName: text};
    const newDataUpdated = data.filter((item) => item.id !== form.id);
    setData(newDataUpdated.concat(datas));
  };

  const deleteData = (id) => {
    const datas = data.filter((item) => item.id !== id);
    setData(datas);
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={data}
        renderItem={({item}) => <Card item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      <View>
        <View style={styles.input}>
          <TextInput
            placeholder="input.."
            value={text}
            onChangeText={(value) => setText(value)}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => (edit ? editTheData() : createData())}>
          <Text style={styles.btnTitle}>{edit ? 'EDIT' : 'ADD'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 22,
  },
  flatList: {
    marginBottom: 50,
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    elevation: 5,
    height: 100,
    borderRadius: 5,
    padding: 16,
  },
  input: {
    height: 50,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 5,
    paddingLeft: 16,
  },
  btn: {
    height: 50,
    borderRadius: 8,
    backgroundColor: 'blue',
    elevation: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    fontSize: 16,
    color: 'white',
  },
});
