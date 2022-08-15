import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BeatList from '../components/BeatList';

let beatlist = [
  {id: '1', name: 'Club'},
  {id: '2', name: 'Funk'},
  {id: '3', name: 'Hard Bop'},
  {id: '4', name: 'Samba'},
  {id: '5', name: 'Mambo'},
  {id: '6', name: 'Tresillo'},
];
let collectionlist = [
  {
    id: '7',
    name: 'Favorites',
    beats: [
      {id: '2', name: 'Funk'},
      {id: '4', name: 'Samba'},
    ],
  },
  {
    id: '8',
    name: 'Rhythm Study',
    beats: [
      {id: '3', name: 'Hard Bop'},
      {id: '5', name: 'Mambo'},
      {id: '6', name: 'Tresillo'},
    ],
  },
];

export default Library = ({setIsLibrary}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Library</Text>
      <BeatList name="Beats" list={beatlist} />
      <BeatList name="Collections" list={collectionlist} />
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 50,
          width: '20%',
          height: '9%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable onPress={() => setIsLibrary(false)}>
          <Text style={{fontSize: 50, fontWeight: 'bold'}}>{'<'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  text: {
    top: '5%',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
