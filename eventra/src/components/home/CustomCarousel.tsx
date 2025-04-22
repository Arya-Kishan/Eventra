import { AppConstants } from "@constants/AppConstants";
import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
	Extrapolation,
	interpolate,
	useSharedValue,
} from "react-native-reanimated";
import Carousel, {
	ICarouselInstance,
	Pagination,
} from "react-native-reanimated-carousel";
import { s, vs } from "react-native-size-matters";

const defaultDataWith6Colors = [
	"https://i.pinimg.com/736x/9b/de/ff/9bdeff684a804fe96c95c429fff016b1.jpg",
	"https://i.pinimg.com/736x/28/1e/cc/281ecc32d7716c7e898ccaba87564b9b.jpg",
	"https://i.pinimg.com/736x/de/b8/62/deb862c94fede6e861cece54610d9dee.jpg",
	"https://i.pinimg.com/736x/69/6e/bb/696ebb7a89d2d5a0f354d4d5ac1f1b72.jpg",
	"https://i.pinimg.com/736x/b7/f7/f8/b7f7f880618687fd956efcf9f734878d.jpg",
	"https://i.pinimg.com/736x/6b/9d/12/6b9d129fefe082d62c5b1da8820156fa.jpg",
	"https://i.pinimg.com/736x/f2/df/c7/f2dfc73493b1e9a8c3c8c71bc0336b77.jpg",
	"https://i.pinimg.com/736x/65/d4/da/65d4da1513ae856db6de08eb6a2bc121.jpg"
];

const { width } = Dimensions.get('window');
const PAGE_WIDTH = width - s(32);

function CustomCarousel() {
	const progress = useSharedValue<number>(0);
	const baseOptions = {
		vertical: false,
		width: PAGE_WIDTH,
		height: PAGE_WIDTH * 0.6,
	} as const;

	const ref = React.useRef<ICarouselInstance>(null);

	const onPressPagination = (index: number) => {
		ref.current?.scrollTo({
			/**
			 * Calculate the difference between the current index and the target index
			 * to ensure that the carousel scrolls to the nearest index
			 */
			count: index - progress.value,
			animated: true,
		});
	};

	return (
		<View
			id="carousel-component"
			style={{ gap: vs(2) }}
		>
			<View style={{ marginBottom: 10 }}>
				<Carousel
					ref={ref}
					{...baseOptions}
					loop
					onProgressChange={progress}
					style={{ width: PAGE_WIDTH }}
					data={defaultDataWith6Colors}
					renderItem={({ item, index }) => (
						<View style={styles.card}>
							<Image source={{ uri: item }} style={styles.image} />
						</View>
					)}
				/>
			</View>

			<Pagination.Basic<{ color: string }>
				progress={progress}
				data={defaultDataWith6Colors.map((color) => ({ color }))}
				size={8}
				dotStyle={{
					borderRadius: 100,
					backgroundColor: AppConstants.grayColor,
				}}
				activeDotStyle={{
					borderRadius: 100,
					overflow: "hidden",
					backgroundColor: AppConstants.redColor,
				}}
				containerStyle={[
					{
						gap: 5,
						marginBottom: 10,
					},
				]}
				horizontal
				onPress={onPressPagination}
			/>

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
		overflow: "hidden"
	},
	text: {
		fontSize: 22,
		color: '#fff',
		fontWeight: 'bold',
	},
	image: {
		width: "100%",
		height: "100%",
		objectFit: "cover"
	}
});
