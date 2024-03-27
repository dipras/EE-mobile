import { spacing } from 'app/theme';
import React, { FC, useEffect, useRef, useState } from 'react';
import { FlatList, View, ListRenderItem, ViewStyle } from 'react-native';

export type CarouselType = {
    data: any[],
    renderItem: ListRenderItem<any>,
    width: number,
    /**
     * In milisecond
     */
    time?: number
}

const Carousel: FC<CarouselType> = ({ data, renderItem, width, time }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<any>(null);

  const autoRotate = () => {
    const nextIndex = (currentIndex + 1) % data.length;

    if (nextIndex >= 0 && nextIndex < data.length) {
      const nextItemOffset = (width) * nextIndex;
      flatListRef?.current?.scrollToOffset({
        animated: true,
        offset: nextItemOffset,
      });
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(autoRotate, time || 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        snapToInterval={width}
        decelerationRate="fast"
        style={{marginBottom: spacing.sm}}
      />
      <View style={$pagination}>
        {data.map((v, i) => (
          <View style={[$dot, (i == currentIndex ? $activeDot : {})]} key={i}></View>
        ))}
      </View>
    </>
  );
};

const $pagination : ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  columnGap: 5,
}

const $dot : ViewStyle = {
  height: 5,
  width: 5,
  backgroundColor: "#D9D9D9",
  borderRadius: 3
}

const $activeDot:ViewStyle = {
  backgroundColor: "#FBCF17"
}

export default Carousel;