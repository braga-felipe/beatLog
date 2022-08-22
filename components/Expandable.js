import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { getCollectionBeats } from '../services';

export default Expandable = ({ data, backgroundColor, color, selectedId }) => {
  const [items, setItems] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const height = useSharedValue('0%');
  const opacity = useSharedValue(0);
  const expandable = useAnimatedStyle(() => {
    return {
      backgroundColor,
      height: height.value,
    };
  });
  const selectable = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  function handleExpand() {
    if (selectedId === data.id) {
      if (expanded) {
        /* fetching beats is Collection and setting state  */
        addItems();
        setTimeout(
          () => {
            height.value = withTiming('69%');
            setTimeout(() => (opacity.value = withTiming(1)), 300);
          },
          /* if it's a Collection we need to wait the fetching of beats to be done before expanding */
          data.isCollection ? 250 : 0,
        );
      }
    } else {
      height.value = withTiming('0%', { duration: 150 });
      setExpanded(!expanded);
    }
  }

  async function addItems() {
    if (!items.length) {
      if (data.isTap) {
        /* It it's a Tap update state with tap properties */
        setItems([{ name: data.volume }, { name: data.sound }]);
      } else {
        /* If it's a Collection, fetch beats and update state */
        const res = await getCollectionBeats(data);
        console.log('GET BEATS IN EXPANDABLE', { res });
        setItems(res);
      }
    }
  }

  function render({ item, index }) {
    let text;
    if (data.isTap) {
      /* If index is 0, then render Volume else render Sound */
      if (!index) text = `Volume: ${item.name * 10}`;
      else text = `Sound: ${item.name}`;
    } else {
      /* If data is Collection, then render item's name */
      text = item.name;
    }
    //TODO: create expandable item
    return (
      <Animated.View style={selectable}>
        <Text style={[styles.text, { color }]}>{text}</Text>
      </Animated.View>
    );
  }

  useEffect(() => {
    handleExpand();
  }, [selectedId]);
  return (
    <Animated.View style={[styles.expandable, expandable]}>
      <FlatList data={items} renderItem={render} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '0.5%',
    marginVertical: '1%',
  },
  button: {
    borderRadius: 3,
    left: '1%',
    width: '99.5%',
    height: 40,
  },
  text: {
    top: '25%',
    left: '2%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  expandable: {
    borderRadius: 3,
    left: '1.25%',
    top: 35,
    position: 'absolute',
    width: '97.5%',
    marginbottom: '1.5%',
  },
  item: {
    left: '3%',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
