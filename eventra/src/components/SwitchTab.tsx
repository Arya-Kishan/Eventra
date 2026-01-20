import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {switchTabType} from 'types/AppTypes';

const {width} = Dimensions.get('window');

interface SwitchTabProps {
  tabs: switchTabType;
  onChange: (value: string) => void;
  containerWidth?: number;
}

const SwitchTab: React.FC<SwitchTabProps> = ({
  tabs,
  onChange,
  containerWidth,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const handlePress = (tab: any) => {
    setActiveTab(tab.value);
    onChange(tab.value);
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: containerWidth || width * 0.35,
        },
      ]}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.value}
          style={[styles.tab, activeTab === tab.value && styles.activeTab]}
          onPress={() => handlePress(tab)}
          activeOpacity={0.8}>
          {tab.icon}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SwitchTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 38,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    padding: 3,
    alignSelf: 'flex-end', // 🔹 right side support
  },
  tab: {
    flex: 1,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  activeTab: {
    backgroundColor: '#111827',
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  activeText: {
    color: '#FFFFFF',
  },
});
