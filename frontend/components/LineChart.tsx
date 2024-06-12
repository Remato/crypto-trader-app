import { memo } from 'react';
import { StyleSheet } from 'react-native';
import * as haptics from 'expo-haptics';
import { Colors, FontSizes, Spaces } from '@/styles/designSystem';
import { LineChart } from 'react-native-wagmi-charts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Props = {
  data: Line[]
  color: string
  width?: number
  height?: number
  alignSelf?: 'center' | 'flex-end' | 'flex-start' | 'baseline' | 'auto' | 'stretch'
}

function LineChartBase({ 
  data, 
  color, 
  width, 
  height, 
  alignSelf = 'auto', 
}: Props) {
  function invokeHaptic() {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
  }

  return (
    <GestureHandlerRootView>
      <LineChart.Provider data={data}>
        <LineChart width={width} height={height} style={{ alignSelf }}>
          <LineChart.Path color={color} width={1}>
            <LineChart.Gradient />

            <LineChart.Dot 
              hasPulse 
              hasOuterDot={false}
              pulseDurationMs={4000} 
              color={color} at={data.length - 1}
            />
          </LineChart.Path>

          <LineChart.CursorCrosshair color={Colors.white} onActivated={invokeHaptic} onEnded={invokeHaptic}>
            <LineChart.Tooltip 
              textStyle={styles.tooltip}
            />

            <LineChart.Tooltip position="bottom">
              <LineChart.DatetimeText style={{
                color: Colors.white
              }}/>
            </LineChart.Tooltip>

          </LineChart.CursorCrosshair>

        </LineChart>
      </LineChart.Provider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  tooltip: {
    borderRadius: 4,
    fontWeight: '500',
    padding: Spaces.xs,
    color: Colors.white,
    fontSize: FontSizes.lg,
    backgroundColor: Colors.secondary
  }
});

export default memo(LineChartBase)