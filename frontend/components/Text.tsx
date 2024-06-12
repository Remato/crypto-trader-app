import { memo } from "react";
import { Text as TextBase } from 'tamagui'
import { TextProps, TextStyle } from 'react-native'
import { Colors, FontFamily } from "@/styles/designSystem";

type Props = TextProps & {
  fontWeight?: number
  color?: string
}

function Text({ color, fontWeight, children, style, ...rest }: Props) {
  const selectWeight = () => {
    switch (fontWeight) {
      case 500:
        return FontFamily[500];
      case 700:
        return FontFamily[700];
      default:
        return FontFamily[400];
    }
  }

  return (
    <TextBase 
      {...rest}
      color={color ?? Colors.white} 
      style={{ fontFamily: selectWeight(), ...style as TextStyle }} 
    >
      {children}
    </TextBase>
  )
}

export default memo(Text)