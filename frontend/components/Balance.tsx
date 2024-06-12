import { Colors, FontSizes, Spaces } from "@/styles/designSystem";
import Text from "./Text";
import { StyleSheet } from 'react-native'
import { memo } from "react";
import { View, Button } from "tamagui";
import { Ionicons } from "@expo/vector-icons";

function Balance() {

  return (
    <View style={styles.wrapper}>      
      <View flexDirection='row' justifyContent='space-between' alignItems='center'>        
        <View>
          <View flexDirection="row" gap={12}>
            <Text fontWeight={700} style={{ fontSize: 24 }}>{`My wallet`}</Text>
            <View style={styles.walletAddressWrapper}>
              <Text style={{  }}>0x9c...320f</Text>
            </View>
          </View>

          <Text fontWeight={500} style={styles.balanceValue}>
            $16512.79
          </Text>    
        </View>

        <View style={styles.walletVariation}>
          <Text fontWeight={700}>+5,21%</Text>
        </View>
      </View>
      
      <View style={styles.buttonsWrapper}>
          <Button flex={1} fontSize={18} backgroundColor={Colors.white}>
            <Ionicons name="send" size={18} color={Colors.secondary} />
            Send
          </Button>

          <Button flex={1} fontSize={18} backgroundColor={Colors.white}>
            <Ionicons name="qr-code-outline" size={18} color={Colors.secondary} />
            Receive
          </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 160, 
    width: '100%', 
    borderRadius: 8, 
    padding: Spaces.md, 
    backgroundColor: Colors.card, 
    justifyContent: 'space-between'
  },
  balanceValue: {
    marginTop: Spaces.sm,
    fontSize: FontSizes.md, 
  },
  walletAddressWrapper: {
    borderRadius: 6, 
    padding: Spaces.sxs, 
    justifyContent: 'center',
    backgroundColor: Colors.secondary, 
  },
  walletAddress: {
    fontSize: FontSizes.xs, 
    color: Colors.disabled
  },
  walletVariation: {
    borderRadius: 16,
    padding: Spaces.sxs, 
    backgroundColor: Colors.status_success, 
  },
  buttonsWrapper: {
    gap: Spaces.md,
    flexDirection: 'row', 
  }
});

export default memo(Balance)