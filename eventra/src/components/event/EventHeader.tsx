import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import SwitchTab from '@components/SwitchTab';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import {NavigationProps, switchTabType} from 'types/AppTypes';

interface EventHeaderProps {
  handleChangeTab: (val: any) => void;
  handleSearch: (val: any) => void;
}

const EventHeader: FC<EventHeaderProps> = ({handleChangeTab, handleSearch}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedSwitchTab, setSelectedSwitchTab] = useState<string>('all');

  const handleSwitchTab = (val: string) => {
    handleChangeTab(val);
    setSelectedSwitchTab(val);
  };

  const navigation = useNavigation<NavigationProps<'Main'>>();
  const switchTabs: switchTabType = [
    {
      icon: <Icon icon="list" iconType="Entypo" size={s(20)} />,
      title: 'all',
      value: 'all',
    },
    {
      icon: <Icon icon="location-pin" iconType="Entypo" size={s(20)} />,
      title: 'NearBy',
      value: 'nearBy',
    },
  ];

  return (
    <View>
      <View style={[styles.main]}>
        <View style={[styles.container1]}>
          <CustomText style={styles.header} numberOfLines={2}>
            Explore the amazing Event near you
          </CustomText>

          <TouchableOpacity onPress={() => navigation.navigate('VenueScreen')}>
            <Icon icon="codesandbox" iconType="Feather" size={s(30)} />
          </TouchableOpacity>
        </View>

        <View style={styles.container2}>
          <View style={styles.inputContainer}>
            <Icon
              iconType="Feather"
              icon="search"
              color={AppConstants.redColor}
              size={s(20)}
            />

            <TextInput
              value={searchText}
              onChangeText={val => setSearchText(val)}
              onSubmitEditing={() => {
                handleSearch(searchText);
              }}
              placeholder="Search events..."
              placeholderTextColor={AppConstants.black}
              style={styles.flex}
            />

            <Pressable
              onPress={() =>
                navigation.navigate('CreateEventScreen', {
                  event: null,
                  method: 'create',
                })
              }>
              <Icon
                icon="plus"
                iconType="Feather"
                color={AppConstants.redColor}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.headerRow}>
        <CustomText variant="h4">
          {selectedSwitchTab === 'all' ? 'All Events' : 'NearBy Events'}
        </CustomText>
        <SwitchTab onChange={handleSwitchTab} tabs={switchTabs} />
      </View>
    </View>
  );
};

export default EventHeader;

const styles = StyleSheet.create({
  flex: {flex: 1},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: AppConstants.screenPadding,
  },
  main: {
    gap: vs(30),
    backgroundColor: AppConstants.redColor,
    padding: AppConstants.screenPadding,
    borderBottomLeftRadius: s(30),
    borderBottomRightRadius: s(30),
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(10),
    alignItems: 'center',
  },
  container2: {
    flexDirection: 'row',
    gap: s(10),
    alignItems: 'center',
  },
  header: {
    fontWeight: '800',
    fontSize: s(24),
    color: AppConstants.whiteColor,
    width: '80%',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: s(20),
    paddingHorizontal: s(10),
    paddingVertical: s(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(5),
    flex: 1,
  },
});
