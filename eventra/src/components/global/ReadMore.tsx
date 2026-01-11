import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';

type Props = {
  text: string;
  numberOfLines?: number;
  readMoreText?: string;
  modalTitle?: string;
};

const ReadMore: React.FC<Props> = ({
  text,
  numberOfLines = 3,
  readMoreText = 'Read more',
  modalTitle = 'Full Text',
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <Text
          style={styles.text}
          numberOfLines={numberOfLines}
          ellipsizeMode="tail">
          {text}
        </Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text style={styles.readMore}>{readMoreText}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalText}>{text}</Text>
            <Pressable
              style={styles.closeBtn}
              onPress={() => setShowModal(false)}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  readMore: {
    color: '#007BFF',
    marginTop: 4,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#444',
  },
  closeBtn: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  closeText: {
    color: '#007BFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ReadMore;
