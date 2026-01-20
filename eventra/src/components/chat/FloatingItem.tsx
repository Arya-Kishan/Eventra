import {AppConstants} from '@constants/AppConstants';
import {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ShinyBubble from './ShinyBubble';

interface FloatingItemProps {
  onFinish: any;
  item: {id: number; text: string; leftPos: number};
}

const FloatingItem: FC<FloatingItemProps> = ({onFinish, item}) => {
  const bottomPos = useSharedValue(0);
  const opacity = useSharedValue(1);

  const leftPosition =
    item.leftPos > AppConstants.screenWidth * 0.5
      ? {left: 10}
      : {right: item.leftPos};

  useEffect(() => {
    bottomPos.value = withTiming(AppConstants.screenHeight * 0.75, {
      duration: 5000,
    });
    opacity.value = withTiming(0, {duration: 5000}, finished => {
      if (finished) {
        runOnJS(onFinish)();
      }
    });
  }, []);

  const style = useAnimatedStyle(() => ({
    bottom: bottomPos.value,
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.main, leftPosition, style]}>
      <ShinyBubble text={item.text ?? 'arya'} />
    </Animated.View>
  );
};

export default FloatingItem;

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    width: '40%',
  },
});
