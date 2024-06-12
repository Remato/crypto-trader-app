import Text from "./Text";
import { memo } from "react";
import { View } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { Colors, FontSizes } from "@/styles/designSystem";
import { StyleSheet, TouchableOpacity } from 'react-native';

function Header() {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity>
        <Ionicons 
          size={24} 
          color={Colors.white} 
          name="qr-code-outline"
        />
      </TouchableOpacity>

      <Text 
        fontWeight={700}
        style={{ fontSize: FontSizes.xl }}
      >
        Crypto Wave
      </Text>

      <TouchableOpacity>
        <Ionicons 
          size={24} 
          color={Colors.white} 
          name="person"
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row', 
    height: 40, 
    width: '100%', 
    backgroundColor: 'transparent', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  }
});


export default memo(Header)