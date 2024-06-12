import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { memo, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import useWebSocket from 'react-use-websocket'
import { useFocusEffect } from 'expo-router';
import { getCandles, getLines } from '@/services/getBinanceData'

import { 
  LineChart, 
  CandlestickChart, 
  MiniLineChart, 
  ToggleGroup, 
  Header, 
  Card, 
  PaginationControl,
  Text,
  Balance,
  Dropdown
} from '@/components'
import { Colors } from '@/styles/designSystem';
import { Spinner } from 'tamagui'
import Ionicons from '@expo/vector-icons/Ionicons';
import { ANIMATIONS, MARKETS } from '@/utils/enums';
import { marketsOptions } from '@/mock/markets.mock';

const Home = () => {
  const [candles, setCandles] = useState<Candle[]>([])
  const [lineChartOne, setLineChartOne] = useState<Line[]>([])
  const [lineChartTwo, setLineChartTwo] = useState<Line[]>([])

  const [isChartOnePositive, setIsChartOnePositive] = useState(false)
  const [isChartTwoPositive, setIsChartTwoPositive] = useState(false)

  const [chartOneInterval, setChartOneInterval] = useState('1m')
  const [chartTwoInterval, setChartTwoInterval] = useState('1m')

  const [openMarkets, setOpenMarkets] = useState(false);
  const [marketChart, setMarketChart] = useState('SOLUSDT');
  const [marketOptions, setMarketOptions] = useState(marketsOptions);

  type MarketKey = keyof typeof MARKETS;

  const { lastJsonMessage: socketBTC }: { lastJsonMessage: WebsocketResponse } = useWebSocket(
    `wss://stream.binance.com:9443/ws/btcusdt@kline_${chartOneInterval}`, 
    {
      onOpen: () => console.log('Connected to Binance'),
      onError: (err) => console.error(err),
      shouldReconnect: () => true,
      reconnectInterval: 3000,
      onMessage: () => {
        if(socketBTC) {
          const newLine = {
            timestamp: socketBTC.k.t,
            value: parseFloat(socketBTC.k.c)
          } as Line
          
          const bufferLines = [...lineChartOne]
          const isPositive = parseFloat(socketBTC.k.c) > bufferLines[0].value
          
          if(socketBTC.k.x === false) {
            bufferLines[bufferLines.length - 1] = newLine
          } else {
            bufferLines.splice(0, 1)
            bufferLines.push(newLine)
          }

          setLineChartOne(bufferLines)
          setIsChartOnePositive(isPositive)
        }
      }
    }
  )

  const { lastJsonMessage: socketETH }: { lastJsonMessage: WebsocketResponse } = useWebSocket(
    `wss://stream.binance.com:9443/ws/ethusdt@kline_${chartTwoInterval}`, 
    {
      onOpen: () => console.log('Connected to Binance'),
      onError: (err) => console.error(err),
      shouldReconnect: () => true,
      reconnectInterval: 3000,
      onMessage: () => {
        if(socketETH) {
          const newLine = {
            timestamp: socketETH.k.t,
            value: parseFloat(socketETH.k.c)
          } as Line

          const bufferLines = [...lineChartTwo]
          const isPositive = parseFloat(socketETH.k.c) > bufferLines[0].value
          
          if(socketETH.k.x === false) {
            bufferLines[bufferLines.length - 1] = newLine
          } else {
            bufferLines.splice(0, 1)
            bufferLines.push(newLine)
          }

          setLineChartTwo(bufferLines)
          setIsChartTwoPositive(isPositive)
        }
      }
    }
  )

  const { lastJsonMessage: lastJsonCandle }: { lastJsonMessage: WebsocketResponse } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${marketChart.toLowerCase()}@kline_1m`, 
    {
      onOpen: () => console.log('Connected to Binance'),
      onError: (err) => console.error(err),
      shouldReconnect: () => true,
      reconnectInterval: 3000,
      onMessage: () => {
        if(lastJsonCandle) {
          const newCandle = {
            timestamp: lastJsonCandle.k.t,
            open: parseFloat(lastJsonCandle.k.o),
            high: parseFloat(lastJsonCandle.k.h),
            low: parseFloat(lastJsonCandle.k.l),
            close: parseFloat(lastJsonCandle.k.c)
          } as Candle

          const bufferCandles = [...candles]

          if(lastJsonCandle.k.x === false) {
            bufferCandles[bufferCandles.length - 1] = newCandle
          } else {
            bufferCandles.splice(0, 1)
            bufferCandles.push(newCandle)
          }

          setCandles(bufferCandles)
        }
      }
    }
  )

  useEffect(() => {
    const updateChartOne = async () => {
      const fetchedLinesOne = await getLines('BTCUSDT', chartOneInterval);
      setLineChartOne(fetchedLinesOne)
    };
    updateChartOne();
  }, [chartOneInterval]);

  useEffect(() => {
    const updateChartTwo = async () => {
      const fetchedLinesTwo = await getLines('ETHUSDT', chartTwoInterval);
      setLineChartTwo(fetchedLinesTwo)
    };
    updateChartTwo();
  }, [chartTwoInterval]);

  useEffect(() => {
    const updateCandleChart = async () => {
      const fetchedCandles = await getCandles(`${marketChart}`, '1m');
      setCandles(fetchedCandles)
    };
    updateCandleChart();
  }, [marketChart]);

  useEffect(() => {
    const initialFetch = async () => {
      const fetchedLinesOne = await getLines('BTCUSDT', chartOneInterval)
      const fetchedLinesTwo = await getLines('ETHUSDT', chartTwoInterval)
      const fetchedCandles = await getCandles('SOLUSDT', '1m')
  
      setCandles(fetchedCandles)
      setLineChartOne(fetchedLinesOne)
      setLineChartTwo(fetchedLinesTwo)
    }
    initialFetch()
  }, [])
  
  return (
      <SafeAreaView style={styles.wrapper}>
        <StatusBar style='light' translucent />

        <Header />
        
        {lineChartOne.length > 0 && lineChartTwo.length > 0 && candles.length > 0 ? (
          <ScrollView contentContainerStyle={{ gap: 24 }} showsVerticalScrollIndicator={false}>
            
            <View style={{ marginTop: 24 }}>
              <Balance />
            </View>

            <Text fontWeight={700} style={{ fontSize: 20 }}>Assets</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <MiniLineChart 
                  ticker='BTC' 
                  data={lineChartOne}
                  tickerColor='#f7931a' 
                  positiveChart={isChartOnePositive} 
                />
              </View>

              <View>
                <ToggleGroup interval={chartOneInterval} setInterval={setChartOneInterval}/>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <MiniLineChart 
                  ticker='ETH' 
                  data={lineChartTwo}
                  tickerColor='#2953b5' 
                  positiveChart={isChartTwoPositive} 
                />
              </View>

              <View>
                <ToggleGroup interval={chartTwoInterval} setInterval={setChartTwoInterval}/>
              </View>
            </View>

            <Text fontWeight={700} style={{ fontSize: 20 }}>Discover</Text>

            <PaginationControl 
              cards={[
                <Card 
                  title={'Learn more about\nStake!'} 
                  description={'let your cryptos work for you.'} 
                  animationName={ANIMATIONS.STAKE}
                />,
                <Card 
                  color={Colors.surface_secondary}
                  title={'Earn with Defi be \nyour Bank!'} 
                  description={'let your cryptos work for you.'} 
                  animationName={ANIMATIONS.DEFI}
                />,
                <Card 
                  invertTextImage
                  title={'Active your 2FA!'} 
                  description={`stay safe, don't lose money.   `} 
                  animationName={ANIMATIONS.SECURITY}
                />,
                <Card 
                  invertTextImage
                  color={Colors.surface_secondary}
                  title={'Flexible earnings'} 
                  description={'let your cryptos work for you.'} 
                  animationName={ANIMATIONS.BANK}
                />
              ]}
            />

            <Text fontWeight={700} style={{ fontSize: 20 }}>Market</Text>

            <Dropdown 
              open={openMarkets}
              setOpen={setOpenMarkets}
              value={marketChart}
              setValue={setMarketChart}
              items={marketOptions}
              setItems={setMarketOptions}
            />

            <View>
              <CandlestickChart 
                market={MARKETS[marketChart as MarketKey]}
                data={candles} 
              />
            </View>
          </ScrollView>
        ) : (
          <Spinner size='large' color={Colors.white} marginTop={32} />
        )}
         
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: Colors.secondary
  }
});

export default memo(Home)
