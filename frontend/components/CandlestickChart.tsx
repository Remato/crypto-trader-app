import Text from './Text';
import { memo } from 'react';
import * as haptics from 'expo-haptics';
import { Colors, Spaces } from '@/styles/designSystem';
import { Dimensions, View, StyleSheet } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Props = {
  data: Candle[]
  market: string
  height?: number
  alignSelf?: 'center' | 'flex-end' | 'flex-start' | 'baseline' | 'auto' | 'stretch'
}

function CandlestickChartBase({ 
  data, 
  market,
  height = 240, 
  alignSelf = 'auto', 
}: Props) {
  const { width: screenW } = Dimensions.get('window')

  function invokeHaptic() {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Soft);
  }

  return (
    <>
      <View style={{ width: screenW - 48, ...styles.topWrapper }}>
        <Text fontWeight={700} color={Colors.secondary}>{`${market} Market`}</Text>
      </View>
      
      <GestureHandlerRootView style={styles.wrapper}>
        <CandlestickChart.Provider data={data}>
          <CandlestickChart 
            height={height} 
            width={screenW - 48} 
            style={{ alignSelf }}
          >
        
            <CandlestickChart.Candles 
              negativeColor={Colors.status_error}
              positiveColor={Colors.status_success} 
            />

            <CandlestickChart.Crosshair 
              onCurrentXChange={invokeHaptic} 
            >
              <CandlestickChart.Tooltip 
                textStyle={styles.tooltip}
                style={{ backgroundColor: Colors.transparent }}
              />
            </CandlestickChart.Crosshair>

            <CandlestickChart.DatetimeText 
              style={{ color: 'white', alignSelf: 'flex-end', marginRight: 8, marginBottom: 4, fontWeight: '700' }}
            />
          </CandlestickChart>

          <View style={styles.bottomWrapper}>
            <CandlestickChart.PriceText 
              type="open" 
              style={{ color: 'white', fontWeight: '700' }}
              format={({ value }) => {
                'worklet';
                return `Open: $${value}`;
              }}
            />
            <CandlestickChart.PriceText 
              type="high" 
              style={{ color: 'white', fontWeight: '700' }}
              format={({ value }) => {
                'worklet';
                return `High: $${value}`;
              }}
            />
            <CandlestickChart.PriceText 
              type="low" 
              style={{ color: 'white', fontWeight: '700' }}
              format={({ value }) => {
                'worklet';
                return `Low: $${value}`;
              }}
            />
            <CandlestickChart.PriceText 
              type="close" 
              style={{ color: 'white', fontWeight: '700' }}
              format={({ value }) => {
                'worklet';
                return `Close: $${value}`;
              }}
            />
          </View>
        </CandlestickChart.Provider>
      </GestureHandlerRootView>
    </>
  )
}

const styles = StyleSheet.create({
  topWrapper: {
    height: 40, 
    opacity: 0.9,
    borderTopLeftRadius: 8, 
    borderTopRightRadius: 8,
    backgroundColor: Colors.primary,
    paddingLeft: Spaces.smd,
    justifyContent: 'center'
  },
  wrapper: {
    backgroundColor: Colors.card,
    paddingTop: Spaces.smd,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  tooltip: {
    backgroundColor: Colors.secondary,
    fontSize: 18,
    borderRadius: 4,
    fontWeight: '700',
    padding: Spaces.xs,
    color: Colors.white,
  },
  bottomWrapper: {
    borderTopWidth: 1,
    borderTopColor: Colors.surface,
    padding: Spaces.sm
  }
});

export default memo(CandlestickChartBase)