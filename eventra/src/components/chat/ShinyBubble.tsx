import React, {useEffect, useRef} from 'react';
import {Text, StyleSheet, Pressable, Animated, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type ShinyBubbleProps = {
  text: string;
  onPress?: () => void;
  style?: ViewStyle;
};

const ShinyBubble: React.FC<ShinyBubbleProps> = ({text, onPress, style}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // 🌊 Pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.06,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[styles.wrapper, {transform: [{scale: scaleAnim}]}, style]}>
      <Pressable onPress={onPress}>
        <LinearGradient
          colors={['#6EE7F9', '#4e46e592']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.bubble}>
          {/* Shine */}
          <LinearGradient
            colors={['rgba(255,255,255,0.65)', 'transparent']}
            style={styles.shine}
          />

          <Text style={styles.text}>{text}</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

export default ShinyBubble;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    maxWidth: '100%',
  },

  bubble: {
    paddingHorizontal: 18,
    minHeight: 40,
    borderRadius: 999, // 🫧 bubble shape
    justifyContent: 'center',
    alignItems: 'center',

    // Shadow
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 5},

    overflow: 'hidden',
  },

  shine: {
    position: 'absolute',
    top: 4,
    left: 8,
    width: '80%',
    height: '45%',
    borderRadius: 999,
  },

  text: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
