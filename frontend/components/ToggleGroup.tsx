import Text from "./Text";
import { memo } from "react"
import { View} from 'tamagui'
import { ChartIntervals } from "@/utils/enums";
import { Colors, Spaces } from "@/styles/designSystem";
import { StyleSheet, TouchableOpacity } from "react-native"


type Props = {
  interval: string
  setInterval(interval: string): void
}

function ToggleGroup({ interval, setInterval }: Props) {

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity 
        onPress={() => setInterval(ChartIntervals["1m"])}
        style={{ 
          borderBottomWidth: 1, 
          borderTopLeftRadius: 4, 
          borderTopRightRadius: 4, 
          borderBottomColor: Colors.disabled, 
          backgroundColor: interval === ChartIntervals["1m"] ? 
            Colors.card : 
            Colors.white,
          ...styles.innerWrapper
        }}>
        <Text 
          fontWeight={700}
          style={{
            ...styles.option, 
            color: interval === ChartIntervals["1m"] ? 
              Colors.white : 
              Colors.card
            }}
          >
            {ChartIntervals["1m"]}
          </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => setInterval(ChartIntervals["15m"])}
        style={{ 
          borderBottomWidth: 1, 
          borderBottomColor: Colors.disabled, 
          backgroundColor: interval === ChartIntervals["15m"] ? 
            Colors.card : 
            Colors.white,
          ...styles.innerWrapper
        }}
      >
        <Text 
          fontWeight={700}
          style={{
            ...styles.option, 
            color: interval === ChartIntervals["15m"] ? 
              Colors.white : 
              Colors.card
          }}
        >
          {ChartIntervals["15m"]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => setInterval(ChartIntervals["1h"])}
        style={{ 
          borderBottomWidth: 1, 
          borderBottomColor: Colors.disabled, 
          backgroundColor: interval === ChartIntervals["1h"] ? 
            Colors.card : 
            Colors.white,
          ...styles.innerWrapper 
        }}
      >
        <Text 
          fontWeight={700}
          style={{
            ...styles.option,
            color: interval === ChartIntervals["1h"] ? 
              Colors.white : 
              Colors.card
          }}
        >
          {ChartIntervals["1h"]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => setInterval(ChartIntervals["1d"])}
        style={{ 
          borderBottomLeftRadius: 4, 
          borderBottomRightRadius: 4, 
          backgroundColor: interval === ChartIntervals["1d"] ? 
            Colors.card : 
            Colors.white,
          ...styles.innerWrapper 
        }}
      >
        <Text 
          fontWeight={700}
          style={{
            ...styles.option, 
            color: interval === ChartIntervals["1d"] ? 
              Colors.white : 
              Colors.card
          }}
        >
          {ChartIntervals["1d"]}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'column', 
    alignSelf: 'flex-start',
    borderColor: Colors.disabled,
  },
  innerWrapper: {
    minWidth: 40,
    alignItems: 'center',
    paddingVertical: Spaces.sm,
    paddingHorizontal: Spaces.xs,
  },
  option: {
    color: Colors.secondary
  }
});


export default memo(ToggleGroup)