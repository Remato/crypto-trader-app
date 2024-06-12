import Text from "./Text"
import { memo } from "react"
import LineChart from "./LineChart"
import { Colors, Spaces } from "@/styles/designSystem"
import { Dimensions, StyleSheet, View } from "react-native"
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons'


type Props = {
  data: Line[]
  ticker: string
  tickerColor: string
  positiveChart: boolean
}

const tickerIcon = new Map([
  ["BTC", "bitcoin"],
  ["ETH", "ethereum"]
]);


function MiniLineChart({ ticker, tickerColor, positiveChart, data }: Props) {
  const { width } = Dimensions.get('window')

  const cardSize = width/2 + 96
  const styles = dinamicStyles(positiveChart);
  const selectedColor = positiveChart ? Colors.status_success : Colors.status_error

  return (
    <>
      <View style={{width: cardSize, ...styles.cardIndicator}}></View>
      <View style={{ width: cardSize, ...styles.wrapper }}>
        <View style={styles.innerWrapper}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcon 
              size={32} 
              color={tickerColor}
              name={tickerIcon.get(ticker)} 
            />
            <View style={styles.labelWrapper}>
              <Text color={Colors.secondary} fontWeight={700}>{ticker}</Text>
            </View>
          </View>
          <LineChart color={selectedColor} data={data} width={width/2} height={120} alignSelf="flex-end"/>
        </View>

        <View style={styles.priceWrapper}>
          <Text fontWeight={700} style={styles.price}>{`$${data[data.length - 1].value}`}</Text>
        </View>
      </View>
    </>
  )
}

const dinamicStyles = (positiveCard: boolean) => {
  return StyleSheet.create({
    cardIndicator: {
      height: 4, 
      borderTopLeftRadius: 8, 
      borderTopRightRadius: 8, 
      backgroundColor: Colors.primary,
      opacity: 0.9
    },
    wrapper: {
      paddingBottom: Spaces.smd,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: Colors.card
    },
    innerWrapper: {
      flexDirection: 'row',
      paddingLeft: Spaces.smd,
      paddingRight: Spaces.lg,
      justifyContent: 'space-between'
    }, 
    labelWrapper: {
      borderRadius: 4,
      padding: Spaces.sxs,
      marginTop: Spaces.lg,
      backgroundColor: Colors.primary
    },
    priceWrapper: {
      alignSelf: 'flex-end', 
      paddingHorizontal: Spaces.lg
    },
    price: {
      color: positiveCard ? Colors.status_success : Colors.status_error,
    }
  });
}

export default memo(MiniLineChart)