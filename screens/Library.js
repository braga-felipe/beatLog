import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';

export default Library = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Library</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
