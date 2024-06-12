import { useEffect } from 'react';
import { useRouter } from 'expo-router'
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native'
import splashArt from '@/assets/animations/splash.json'
import { Colors, FontFamily, FontSizes } from '@/styles/designSystem'
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_700Bold
} from '@expo-google-fonts/noto-sans'

export default function App() {
  const { replace } = useRouter()

  const opacity = useSharedValue(0);

  useFonts({
    NotoSans_400Regular,
    NotoSans_500Medium,
    NotoSans_700Bold
  })

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 3000,
      easing: Easing.inOut(Easing.ease),
    });

    setTimeout(() => {
      opacity.value = withTiming(0, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      });
    }, 3000);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.wrapper}>

      <StatusBar hidden />

      <LottieView
        autoPlay
        loop={false}
        duration={3500}
        source={splashArt}
        style={styles.splash}
        onAnimationFinish={() => replace('/(tabs)')}
      />

      <View style={{ position: 'absolute' }}>
        <Animated.Text style={[styles.logo, animatedStyle]}>
          Crypto Wave
        </Animated.Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
  },
  splash: {
    width: '100%',
    height: '100%',
  },
  logo: {
    color: Colors.white,
    fontSize: FontSizes.xl,
    fontFamily: FontFamily[700]
  }
})
