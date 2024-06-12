import Text from './Text';
import { Spaces } from '@/styles/designSystem';
import Ionicons from '@expo/vector-icons/Ionicons';
import { memo, useState, type ComponentProps } from 'react';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { Platform } from 'react-native';

type Props = {
  labelName: string
}

function TabBarIcon({ color, labelName, style, onPress, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']> & Props) {
  const [pressed, setPressed] = useState(false)

  const handlePressIn = () => {
    setPressed(true)
  }

  const handlePressOut = () => {
    setTimeout(() => {
      setPressed(false)
    }, 100);
  }

  return (
    <GestureHandlerRootView>
      <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} style={{ alignItems: 'center' }}>
        <Ionicons color={color} size={Platform.OS === 'ios' ? 24 : 20} style={[{ marginTop: Spaces.sm, transform: [{ scale: pressed ? 0.85 : 1 }] }, style]} {...rest} />
        <Text fontWeight={700} style={{ color, fontSize: Platform.OS === 'ios' ? 12 : 11, transform: [{ scale: pressed ? 0.85 : 1 }] }}>{labelName}</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

export default memo(TabBarIcon)


