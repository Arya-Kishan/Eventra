import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  ImageStyle,
  ViewStyle,
} from 'react-native';

interface CustomImageProps {
  source: string;
  width?: any;
  height?: any;
  borderRadius?: number;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  showShadow?: boolean;
}

export const CustomImage: React.FC<CustomImageProps> = ({
  source,
  width = 150,
  height = 150,
  borderRadius = 10,
  style,
  containerStyle,
  showShadow = false,
}) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          overflow: 'hidden',
          backgroundColor: '#eee',
        },
        showShadow ? styles.shadow : null,
        containerStyle,
      ]}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#999" />
        </View>
      )}
      <Image
        source={{uri: source}}
        style={[{width: '100%', height: '100%'}, style]}
        onLoadEnd={() => setLoading(false)}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
