import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { getBeatTaps } from '../services';
import List from '../components/List';
import BackgroundImage from '../components/BackgroundImage';

export default EditBeat = ({ route, navigation }) => {
  /* get the beat from params */
  const { beat } = route.params;

  /* state to render taps */
  const [taps, setTaps] = useState([]);

  /* function to get taps from database */
  async function getTaps() {
    const res = await getBeatTaps(beat);
    console.log('TAPS IN EDIT: ', res);
    setTaps(res);
  }

  /* getting taps when component renders */
  useEffect(() => {
    getTaps();
  }, []);

  return (
    <BackgroundImage source={require('../assets/edit-bg.jpg')}>
      <Text style={styles.text}>{beat.name}</Text>
      <List name="Taps" list={taps} />
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/go-back.png')}
            style={styles.back}
          />
        </Pressable>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: '20%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    height: 85,
    width: 85,
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
});