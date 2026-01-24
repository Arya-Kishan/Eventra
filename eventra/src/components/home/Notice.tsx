import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAllNoticeApi} from '@services/NoticeService';
import {useAppSelector} from '@store/hooks';
import {NoticeType} from 'types/AppTypes';

const Notice = () => {
  const {loggedInUser} = useAppSelector(store => store.user);
  const [notices, setNotices] = useState<NoticeType[] | null>(null);

  const fetchNotices = async () => {
    try {
      const {success, data} = await getAllNoticeApi({
        userId: loggedInUser!._id,
      });
      if (!success) return;
      const filteredNotices = data.data.filter(
        (item: NoticeType) =>
          !(item.type == 'user' && item.targetUserId === loggedInUser?._id),
      );
      setNotices(filteredNotices);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRead = () => {};

  useEffect(() => {
    fetchNotices();
  }, []);

  console.log('NOTIES ', notices);
  const read = true;

  return (
    <View>
      {notices &&
        notices.map(({title, description, _id}) => (
          <View key={_id} style={[styles.card, read && styles.readCard]}>
            <View style={styles.header}>
              <View style={styles.dot} />
              <Text style={styles.title}>{title}</Text>
            </View>

            <Text style={styles.description}>{description}</Text>

            {!read && (
              <Pressable style={styles.checkboxRow} onPress={handleRead}>
                <View style={styles.checkbox}>
                  <View style={styles.checkboxInner} />
                </View>
                <Text style={styles.checkboxText}>I already read</Text>
              </Pressable>
            )}

            {read && <Text style={styles.readText}>✔ Marked as read</Text>}
          </View>
        ))}
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },
  readCard: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B00',
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 14,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FF6B00',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: '#FF6B00',
  },
  checkboxText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  readText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#4CAF50',
  },
});
