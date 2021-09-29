/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {assertTSCallSignatureDeclaration} from '@babel/types';
import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Day from './svgs/Day.svg';
import Night from './svgs/Night.svg';
import DayBg from './svgs/daybg.svg';
import NightBg from './svgs/nightbg.svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [darkMode, setDarkMode] = useState(isDarkMode);
  const backgroundStyle = {
    backgroundColor: darkMode ? Colors.darker : Colors.lighter,
  };
  const animation = useRef(new Animated.Value(0)).current;
  const switchLocation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });
  const switchDotSmall = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 28],
  });
  const switchDotX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.25],
  });
  const dayOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const nightOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const windowColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#276B7E', '#FBE57F'],
  });
  const toDark = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };
  const toLight = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };
  useEffect(() => {
    if (darkMode) toDark();
    else toLight();
  }, [darkMode]);
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <Animated.View
        style={[
          styles.daynightbgcontainer,
          {
            opacity: dayOpacity,
          },
        ]}>
        <DayBg width={windowWidth + 1} height={windowHeight + 1} />
      </Animated.View>
      <Animated.View
        style={[
          styles.daynightbgcontainer,
          {
            opacity: nightOpacity,
          },
        ]}>
        <NightBg width={windowWidth + 1} height={windowHeight + 1} />
      </Animated.View>
      <Pressable
        onPress={() => setDarkMode(!darkMode)}
        style={[styles.switchContainer]}>
        <Animated.View
          style={[
            styles.switchDot,
            {
              transform: [
                {
                  translateX: switchLocation,
                },
              ],
            },
          ]}>
          <Animated.View
            style={[
              styles.switchDotDot,
              {
                transform: [
                  {
                    scale: switchDotSmall,
                  },
                  {
                    translateX: switchDotX,
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </Pressable>
      <Animated.View
        style={[
          styles.daynightContainer,
          {
            opacity: dayOpacity,
          },
        ]}>
        <Day style={styles.daynight} width={windowWidth} />
      </Animated.View>
      <Animated.View
        style={[
          styles.daynightContainer,
          {
            opacity: nightOpacity,
          },
        ]}>
        <Night style={styles.daynight} width={windowWidth} />
      </Animated.View>
      <Animated.View
        style={[
          styles.window,
          {
            backgroundColor: windowColor,
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchContainer: {
    width: 70,
    height: 40,
    backgroundColor: '#27173A',
    borderRadius: 20,
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 10,
  },
  switchDot: {
    height: 30,
    width: 30,
    backgroundColor: '#FFC207',
    borderRadius: 15,
    margin: 5,
    alignSelf: 'flex-start',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  switchDotDot: {
    height: 1,
    width: 1,
    marginLeft: -5,
    marginTop: 0,
    backgroundColor: '#27173A',
    borderRadius: 15,
    zIndex: 1,
  },
  daynight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    transform: [
      {
        scale: 1.2,
      },
      {
        translateY: -28,
      },
    ],
    zIndex: 2,
  },
  daynightContainer: {
    flex: 1,
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  window: {
    flex: 1,
    width: 15,
    height: 15,
    position: 'absolute',
    bottom: 304,
    right: 128,
    backgroundColor: 'black',
  },
  daynightbgcontainer: {
    flex: 1,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default App;
