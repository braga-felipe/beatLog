import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { getBeatTaps } from '../services';
import List from '../components/List';
import BackgroundImage from '../components/BackgroundImage';
import EditControl from '../components/EditControl';
export default EditBeat = ({ route, navigation }) => {
  /* get the beat from params */
  const { beat } = route.params;

  /* state to render taps */
  const [taps, setTaps] = useState([]);

  /* function to get taps from database */
  async function getTaps() {
    const res = await getBeatTaps(beat);
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
      <EditControl />
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
    position: 'absolute',
    top: '83.5%',
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
    fontSize: 30,
    fontWeight: 'bold',
  },
});
