import React, { useState, useCallback, memo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from '@/components';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontSizes } from '@/styles/designSystem';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';

const Settings = () => {
  const [animationCount, setAnimationCount] = useState(1);

  const forceAnimation = useCallback(() => {
    setAnimationCount(prev => prev+1)
  }, [])

  useFocusEffect(
    useCallback(() => {
      forceAnimation()
    }, []),
  )

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style='light' translucent />
      
      <Animatable.View 
        duration={1000} 
        iterationCount={1}
        key={animationCount}
        animation="fadeInDown" 
      >
        <Text style={styles.text}>{'Hello world!\nthis is page Settings'}</Text>
      </Animatable.View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary
  },
  text: {
    fontSize: FontSizes['2xl'], 
    textAlign: 'center'
  }
});

export default memo(Settings)
