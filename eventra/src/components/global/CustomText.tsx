import React from 'react';
import {Text, StyleSheet, TextStyle, StyleProp} from 'react-native';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type CustomTextProps = {
  numberOfLines?: number;
  ellipsizeMode?: 'tail';
  style?: StyleProp<TextStyle>;
  children: string;
  variant?: Variant;
  fontWeight?: FontWeight;
};

const variantStyles: Record<Variant, TextStyle> = {
  h1: {fontSize: 32, fontWeight: '700'},
  h2: {fontSize: 28, fontWeight: '700'},
  h3: {fontSize: 24, fontWeight: '600'},
  h4: {fontSize: 20, fontWeight: '600'},
  h5: {fontSize: 18, fontWeight: '500'},
  h6: {fontSize: 16, fontWeight: '500'},
  subtitle1: {fontSize: 16, fontWeight: '400'},
  subtitle2: {fontSize: 14, fontWeight: '400'},
  body1: {fontSize: 16, fontWeight: '400'},
  body2: {fontSize: 14, fontWeight: '400'},
  caption: {fontSize: 12, fontWeight: '300'},
  overline: {fontSize: 10, fontWeight: '400', textTransform: 'uppercase'},
};

const CustomText: React.FC<CustomTextProps> = ({
  children,
  numberOfLines = 1,
  ellipsizeMode = 'tail',
  style,
  variant = 'body1',
  fontWeight,
}) => {
  const variantStyle = variantStyles[variant];
  const mergedStyle = {
    ...variantStyle,
    ...(fontWeight ? {fontWeight} : {}),
  };

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[mergedStyle, style]}>
      {children}
    </Text>
  );
};

export default CustomText;
