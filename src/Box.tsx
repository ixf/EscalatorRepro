import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export function Box() {
  const animatedScale = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: 1,
        },
      ],
      opacity: 1,
    };
  });
  const animatedBorder = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: 0.8,
        },
      ],
      opacity: 0.4,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Animated.View
          style={[
            styles.outerBorder,
            {
              height: 80,
              width: 80,
              backgroundColor: '#0F4137',
            },
            animatedBorder,
          ]}
        />
        <View
          style={[
            styles.innerBorder,
            {
              height: 72,
              width: 72,
              backgroundColor: '#0F4137',
            },
          ]}
        />
        <Animated.View
          style={[
            styles.wrapper,
            styles.fillAbsolute,
            animatedScale,
            {
              backgroundColor: '#199E59',
              width: 64,
              height: 64,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.fillAbsolute,
            {
              backgroundColor: '#1EC173',
              opacity: 0.9,
              width: 56,
              height: 56,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  fillAbsolute: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  outerBorder: {
    opacity: 0.6,
    position: 'absolute',
  },
  innerBorder: {
    position: 'absolute',
  },
});
