import { StyleSheet, TextInput, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { Box } from './Box';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const LOGICAL_ITEMS_COUNT = 1000;
const REAL_ITEMS_COUNT = 7;

const calculateIndex = (y: number, realIndex: number) => {
  'worklet';
  const logicalIndex = Math.floor(y / 100);
  const topLogicalIndex = logicalIndex - (logicalIndex % REAL_ITEMS_COUNT);
  const screens = topLogicalIndex / REAL_ITEMS_COUNT;
  const currentIndex = logicalIndex - realIndex - screens * REAL_ITEMS_COUNT;
  const localItemOffsetY = currentIndex > 0 ? REAL_ITEMS_COUNT : 0;

  return Math.min(
    localItemOffsetY + topLogicalIndex + realIndex,
    LOGICAL_ITEMS_COUNT - 1,
  );
};

const ListItem = ({
  index,
  offsetY,
}: {
  index: number;
  offsetY: SharedValue<number>;
}) => {
  const wrapperStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ translateY: calculateIndex(offsetY.value, index) * 100 }],
    };
  });
  const textProps = useAnimatedProps(() => {
    'worklet';
    const displayValue = String(calculateIndex(offsetY.value, index) + 1);
    return {
      text: displayValue,
      value: displayValue,
      defaultText: displayValue,
      defaultValue: displayValue,
    };
  });
  const componentTransform = useAnimatedStyle(() => {
    'worklet';
    const i = calculateIndex(offsetY.value, index);
    const mode = ((i >> 2) ^ i) % 3;

    return {
      opacity: 1,
      transform: [{ translateX: -100 * mode }],
    };
  });

  return (
    <Animated.View style={[styles.absoluteView, wrapperStyle]} key={index}>
      <AnimatedTextInput
        style={styles.itemNumber}
        animatedProps={textProps}
        editable={false}
        focusable={false}
        pointerEvents={'none'}
      />
      <Animated.View style={[styles.rowView, componentTransform]}>
        <Box />
        <Box />
        <Box />
      </Animated.View>
    </Animated.View>
  );
};

function EscalatorList() {
  const offsetY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    'worklet';
    offsetY.value = event.contentOffset.y;
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerSpacing} />
      <Animated.ScrollView
        contentContainerStyle={{
          height: 100 * LOGICAL_ITEMS_COUNT,
        }}
        onScroll={onScroll}
      >
        {Array.from({ length: REAL_ITEMS_COUNT }).map((_, index) => (
          <ListItem key={index} index={index} offsetY={offsetY} />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  itemNumber: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    position: 'absolute',
    zIndex: 10,
    width: 100,
    height: 100,
  },
  absoluteView: {
    position: 'absolute',
  },
  rowView: {
    flexDirection: 'row',
  },
  headerSpacing: {
    height: 120,
  },
});

export default EscalatorList;
