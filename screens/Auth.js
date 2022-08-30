import React from 'react';
import { StyleSheet, Image, Text, View, Pressable } from 'react-native';
import supabase from '../supabase';
export default Auth = ({ navigation }) => {
  async function logIn() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    });
    if (error) console.log(error);
    else {
      console.log({ user }, { session });
    }
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: '5%' }}>
        You need to be logged in for this.
      </Text>
      <Pressable onPress={logIn} style={styles.button}>
        <View style={styles.icon}>
          <Image
            source={require('../assets/google-logo.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.text}>Sign in with Google</Text>
      </Pressable>
      <Pressable onPress={() => navigation.goBack()} style={{ top: '10%' }}>
        <Text
          style={{
            fontSize: 15,
            color: '#4285F4',
            textDecorationLine: 'underline',
          }}>
          Cancel
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    top: '30%',
    height: '20%',
    width: '70%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: '85%',
    height: '30%',
    backgroundColor: '#4285F4',
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: '#DEDEDE',
    width: '15%',
    height: '65%',
    justifyContent: 'center',
    left: '-20%',
    borderRadius: 50,
  },
  image: {
    alignSelf: 'center',
    height: 30,
    width: 30,
  },
  text: {
    top: '5%',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '10%',
    color: 'white',
  },
});
