import React, { memo, useMemo, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { YStack } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spaces } from '@/styles/designSystem';


type Props = {
  cards: React.ReactNode[]
}

function PaginationControl({ cards }: Props) {

  const [index, setIndex] = useState(0)
  const scrollRef = useRef<ScrollView>(null)
  const { width: screenWidth } = Dimensions.get('window');

  const scrollViewSize = useMemo(() => {
    return (screenWidth - 48) * (cards.length) + (24) * (cards.length - 1)
  }, [])
  
  const widthToMove = scrollViewSize/cards.length

  const handleNextCard = () => {
    if(index < cards.length - 1) {
      let newIndex = index + 1
      scrollRef.current?.scrollTo({x: (newIndex*widthToMove), animated: true})
      setIndex(newIndex)
    }
  }

  const handlePreviousCard = () => {
    if(index !== 0){
      let newIndex = index - 1
      scrollRef.current?.scrollTo({x: (widthToMove*newIndex), animated: true})
      setIndex(newIndex)
    }
  }

  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <ScrollView
        ref={scrollRef}
        horizontal
        scrollEnabled={false}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {cards.map((item, index) => (
          <View key={index}>{item}</View>
        ))}
      </ScrollView>

      <View style={styles.wrapper}>
        <TouchableOpacity onPress={handlePreviousCard} style={styles.arrowButton}>
          <Ionicons size={14} name="arrow-back" color={ Colors.white }/>
        </TouchableOpacity>

        <View style={styles.dotsWrapper}>
          {cards.map((_, dotIndex) => (
            <View key={dotIndex} style={{backgroundColor: index === dotIndex ? Colors.white : Colors.disabled, ...styles.dot}}></View>
          ))}
        </View>

        <TouchableOpacity  onPress={handleNextCard} style={styles.arrowButton}>
          <Ionicons size={14} name="arrow-forward" color={ Colors.white }/>
        </TouchableOpacity>
      </View>
    </YStack>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    gap: Spaces.lg
  },
  wrapper: {
    gap: Spaces.sm,
    marginTop: Spaces.smd, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  arrowButton: {
    borderRadius: 999,
    padding: Spaces.sm, 
    backgroundColor: Colors.surface,
  },
  dotsWrapper: {
    gap: Spaces.xs, 
    borderRadius: 8,
    padding: Spaces.sm, 
    flexDirection: 'row',
    backgroundColor: Colors.surface, 
  },
  dot: {
    width: 8, 
    height: 8, 
    borderRadius: 4
  }
});

export default memo(PaginationControl)
