/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
import Day from './svgs/Day.svg';
import Night from './svgs/Night.svg';
import DayBg from './svgs/daybg.svg';
import NightBg from './svgs/nightbg.svg';
import Sun from './svgs/sun.svg';
import Stars from './svgs/stars.svg';
import Moon from './svgs/moon.svg';
import Clouds from './svgs/clouds.svg';
import ShootingStar from './svgs/shoot.svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const App = () => {
  //125 330
  //15 -280
  // 90 410
  // 200 -200
  const isDarkMode = useColorScheme() === 'dark';
  const [darkMode, setDarkMode] = useState(isDarkMode);
  const animation = useRef(new Animated.Value(0)).current;
  const sunLocation = useRef(new Animated.ValueXY({ x: 90, y: 410 })).current;
  const moonLocation = useRef(new Animated.ValueXY({ x: 15, y: -280 })).current;
  const shootLocation = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
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
  const nightOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const dayOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const windowColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#276B7E', '#FBE57F'],
  });
  const cloudX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -600]
  });
  const toDark = () => {
    Animated.parallel([
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(sunLocation, {
        toValue: { x: 200, y: -200 },
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(moonLocation, {
        toValue: { x: 125, y: 330 },
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(shootLocation, {
        toValue: { x: 0, y: 0 },
        duration: 1000,
        useNativeDriver: false,
      })
    ]).start();
  };
  const toLight = () => {
    Animated.parallel([
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(sunLocation, {
        toValue: { x: 90, y: 410 },
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(moonLocation, {
        toValue: { x: 15, y: 990 },
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(shootLocation, {
        toValue: { x: windowWidth, y: -200 },
        duration: 1000,
        useNativeDriver: false,
      })
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
      <Animated.View style={[styles.stars, {
        opacity: nightOpacity,
      }]}>
        <Stars width={windowWidth} height={windowWidth*228/241}/>
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
      <Animated.View style={[styles.clouds, {
        transform: [
          {
            translateX: cloudX
          }
        ]
      }]}>
        <Clouds width={windowWidth*1.4} height={windowWidth*125/370*1.4}/>
      </Animated.View>
      <Animated.View
        style={[
          styles.sun,
          {
            transform: [
              {
                translateX: sunLocation.x,
              },
              {
                translateY: sunLocation.y,
              }
            ],
            opacity: dayOpacity
          }
        ]}
      >
          <Sun width={94} height={95}/>
      </Animated.View>
      <Animated.View style={[
        styles.moon,
        {
          transform: [
            {
              translateX: moonLocation.x,
            }, {
              translateY: moonLocation.y,
            }
          ],
          opacity: nightOpacity,
        }
      ]}>
        <Moon width={41*3/2} height={48*3/2}/>
      </Animated.View>
      <Animated.View style={[
        styles.shootingstar,
        {
          transform: [
            {
              translateX: shootLocation.x,
            }, {
              translateY: shootLocation.y,
            }
          ],
        }
      ]}> 
        <ShootingStar width={windowWidth/4*3} height={windowWidth/4*3*139/216}/>
      </Animated.View>
      <Animated.View
        style={[
          styles.daynightContainer,
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
    top: 50,
    zIndex: 2,
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
  },
  daynightContainer: {
    flex: 1,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  window: {
    flex: 1,
    width: 15,
    height: 15,
    position: 'absolute',
    bottom: 304,
    right: 128,
  },
  daynightbgcontainer: {
    flex: 1,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  sun: {
    flex: 1,
    position: 'absolute',
  },
  stars: {
    flex: 1,
  },
  moon: {
    flex: 1,
    position: 'absolute'
  },
  clouds: {
    flex: 1,
    position: 'absolute',
    top: 200,
    right: -100,
  },
  shootingstar: {
    flex: 1,
    position: 'absolute',
    top: 390,
    right: -20,
  }
});

export default App;
