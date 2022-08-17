import { Pressable, StyleSheet, TextInput, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useBeatContext } from '../context';

const SaveModal = ({ navigation }) => {
  const { beat, save } = useBeatContext();
  const [beatName, setBeatName] = useState('');

  //TODO: add cancel function

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.header]}>Save your Beat</Text>
      <TextInput
        style={styles.input}
        value={beatName}
        onChangeText={setBeatName}
        placeholder="Choose a name"
        autoFocus={true}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            save({ ...beat, name: beatName });
            navigation.goBack();
          }}>
          <Text style={styles.text}>Save</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={navigation.goBack}>
          <Text style={styles.text}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SaveModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
    top: '35%',
    height: '25%',
    width: '90%',
    backgroundColor: '#CFCFD5',
  },
  header: {
    fontSize: 30,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    width: '90%',
    height: '20%',
    marginBottom: '7%',
    fontSize: 20,
  },
  buttonContainer: {
    width: '70%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    top: -25,
    borderRadius: 2,
    backgroundColor: 'black',
    height: 35,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
