import { AppConstants } from '@constants/AppConstants';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

type Props<T> = {
    data: T[];
    itemsPerColumn?: number;
    renderItem: (item: T, index: number) => React.ReactNode;
};

const chunkData = <T,>(arr: T[], size: number): T[][] => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

function DoubleHorizontalFlatList<T>({ data, itemsPerColumn = 2, renderItem }: Props<T>) {
    const formattedData = chunkData(data, itemsPerColumn);

    return (
        <FlatList
            data={formattedData}
            horizontal
            keyExtractor={(_, index) => `column-${index}`}
            renderItem={({ item, index }) => (
                <View style={styles.column}>
                    {item.map((itemData, idx) => renderItem(itemData, idx + index * itemsPerColumn))}
                </View>
            )}
            contentContainerStyle={styles.container}
            showsHorizontalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        gap: AppConstants.defaultGap
    },
    column: {
        gap: AppConstants.defaultGap
    },
});

export default DoubleHorizontalFlatList;
