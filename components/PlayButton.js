import {Pressable, StyleSheet, Image, Text} from 'react-native';
import React from 'react';

export default PlayButton = ({icon, setter}) => {
  const size = icon === 'play' ? 80 : 65;
  const top = icon === 'play' ? 0 : 20;
  return (
    <Pressable
      style={[styles.button]}
      onPress={() => {
        if (icon === 'close') setter();
        else setter(false);
      }}>
      <Image
        source={
          icon === 'play'
            ? require('../assets/play.png')
            : icon === 'close'
            ? require('../assets/add-new.png')
            : require('../assets/add-new.png')
        }
        style={[
          icon === 'close' && {transform: [{rotate: '45deg'}]},
          {
            height: size,
            width: size,
            top: top,
          },
          styles.image,
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  image: {
    borderRadius: 50,
    backgroundColor: 'black',
  },
});
