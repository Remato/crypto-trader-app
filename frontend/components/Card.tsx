import Text from "./Text"
import { memo } from "react"
import { Colors, FontSizes, Spaces } from "@/styles/designSystem"
import { View, StyleSheet } from "react-native"
import LottieView from "lottie-react-native"
import { ANIMATIONS } from "@/utils/enums"

type Props = {
  title: string
  color?: string
  description: string
  animationName?: string
  invertTextImage?: boolean
}

function Card({ color, title, description, animationName, invertTextImage = false }: Props) {
  
  const selectAnimation = () => {
    switch (animationName) {
      case ANIMATIONS.DEFI:
        return require('@/assets/animations/defi.json')
      case ANIMATIONS.BANK:
        return require('@/assets/animations/bank.json')
      case ANIMATIONS.STAKE:
        return require('@/assets/animations/stake.json')
      case ANIMATIONS.WALLET:
        return require('@/assets/animations/wallet.json')
      case ANIMATIONS.SECURITY:
        return require('@/assets/animations/security.json')
    }
  }

  return (
    <View style={{...styles.wrapper, backgroundColor: color ?? Colors.primary}}>
      {invertTextImage ? (
        <>
          {animationName && <LottieView
            loop
            autoPlay
            source={selectAnimation()}
            style={styles.animation} 
          />}

          <View style={styles.textWrapper}>
            <Text color={Colors.secondary} style={{ fontSize: FontSizes.xl }} fontWeight={700}>{title}</Text>
            <Text color={Colors.secondary} style={{ fontSize: FontSizes.sm }}>{description}</Text>
          </View> 
        </>
      ) : (
        <>
          <View style={styles.textWrapper}>
            <Text color={Colors.secondary} style={{ fontSize: FontSizes.xl }} fontWeight={700}>{title}</Text>
            <Text color={Colors.secondary} style={{ fontSize: FontSizes.sm }}>{description}</Text>
          </View>

          {animationName && <LottieView
            loop
            autoPlay
            source={selectAnimation()}
            style={styles.animation} 
          />}
        </>
      )}

      
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    opacity: 0.9,
    maxHeight: 120,
    borderRadius: 8,
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  textWrapper: {
    padding: Spaces.xl,
    justifyContent: 'center',
  },
  animation: {
    flex: 1,
    width: 120,
    height: 120,
    alignContent: 'center'
  }
});

export default memo(Card)