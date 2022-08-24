import { FlatList, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import ListItem from './ListItem';

/* Dynamic list to render all types of data*/
export default List = ({ name, list, setSelectedTap }) => {
  /* Sort list for display */
  list = list.sort((a, b) => a.diff - b.diff);
  /* State to control scroll to end */
  const scrollRef = useRef(0);
  const listRef = useRef(null);
  /* State to control render of selected item */
  const [selectedId, setSelectedId] = useState(null);

  /* Animation variables for list */
  const opacity = useSharedValue(0);
  const animated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  /* Mount Component */
  function open() {
    setTimeout(() => (opacity.value = withTiming(1)), 200);
  }

  /* Render fucntion for FlatList */
  function render({ item, index }) {
    /* props for selected item */
    const props = {
      item,
      index,
      selectedId,
      backgroundColor: selectedId === item.id ? '#303134' : '#C7C7C7',
      color: selectedId === item.id ? 'white' : 'black',
      select: () => {
        /* When selected change color */
        setSelectedId(item.id);
        if (item.isTap) setSelectedTap(item);
      },
    };

    return <ListItem {...props} />;
  }

  useEffect(() => {
    listRef.current = list;
    console.log('LIST: ', listRef.current);

    open();
  }, []);
  return (
    <>
      <Text style={styles.text}>{name}</Text>
      <Animated.View style={[styles.container, animated]}>
        <FlatList
          data={list}
          renderItem={render}
          keyExtractor={item => item.id}
          ref={it => (scrollRef.current = it)}
          onContentSizeChange={(_, height) => {
            if (listRef.current.isTap && height > 355)
              scrollRef.current?.scrollToEnd({ animated: true });
          }}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginBottom: 10,
    borderRadius: 5,
    height: '38%',
    width: '95%',
    top: '5%',
    backgroundColor: '#f7f7f7',
  },
  text: {
    top: '5%',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    left: '3%',
    fontSize: 25,
  },
});
