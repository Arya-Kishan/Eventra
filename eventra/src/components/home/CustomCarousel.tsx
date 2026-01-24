import CustomLoader from '@components/global/CustomLoader';
import {AppConstants} from '@constants/AppConstants';
import {getAllBannerApi} from '@services/BannerService';
import {openLinkSafely} from '@utils/DeviceHelper';
import * as React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Extrapolation,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import {s, vs} from 'react-native-size-matters';
import {BannerType} from 'types/AppTypes';

const {width} = Dimensions.get('window');
const PAGE_WIDTH = width - s(32);

function CustomCarousel() {
  const [banners, setBanners] = React.useState<BannerType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const progress = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 0.6,
  } as const;

  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const getAllBanner = async () => {
    setLoading(true);
    const {success, data} = await getAllBannerApi();
    console.log('BANNER RESULTS : ', data.data);
    if (success && data) {
      setBanners(data.data);
    }
    setLoading(false);
  };
  console.log(banners, 'banner');

  React.useEffect(() => {
    getAllBanner();
  }, []);

  return (
    <View id="carousel-component" style={{gap: vs(2), height: vs(200)}}>
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <View style={{marginBottom: 10}}>
            <Carousel
              ref={ref}
              {...baseOptions}
              loop
              onProgressChange={progress}
              style={{width: PAGE_WIDTH}}
              data={banners}
              renderItem={({item, index}) => (
                <Pressable
                  onPress={() => {
                    item.link && Linking.openURL(item.link);
                  }}
                  style={styles.card}>
                  <Image source={{uri: item.image}} style={styles.image} />
                </Pressable>
              )}
            />
          </View>

          <Pagination.Basic<{color: string}>
            progress={progress}
            data={banners.map(color => ({color}))}
            size={8}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            containerStyle={[styles.container]}
            horizontal
            onPress={onPressPagination}
          />
        </>
      )}
    </View>
  );
}

export default CustomCarousel;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  activeDot: {
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: AppConstants.redColor,
  },
  dot: {
    borderRadius: 100,
    backgroundColor: AppConstants.grayColor,
  },
  container: {
    gap: 5,
    marginBottom: 10,
  },
});
