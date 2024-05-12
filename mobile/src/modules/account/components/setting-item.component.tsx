import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { AppTheme } from '../../../theme/theme';
import { Icon } from '../../../components/icon/icon.component';
import { useState } from 'react';

interface SettingItemProps {
  label: string;
  modalComponent: (toggleModalVisible: () => void) => React.JSX.Element;
}

export const SettingItem = ({ label, modalComponent }: SettingItemProps) => {
  const theme = useTheme();
  const styles = initStyles(theme);
  const [isOpen, setOpen] = useState(false);

  const toggleModalVisible = () => setOpen(!isOpen);

  return (
    <TouchableOpacity style={styles.itemWrapper} activeOpacity={0.8} onPress={toggleModalVisible}>
      <Text style={styles.text}>{label}</Text>
      <Icon name="chervon-right" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={toggleModalVisible}
      >
        <TouchableOpacity onPress={toggleModalVisible} style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            {modalComponent(toggleModalVisible)}
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    itemWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spaceM,
      paddingHorizontal: theme.spaceM,
      justifyContent: 'space-between',
    },
    text: {
      fontSize: theme.fontL,
      color: theme.neutralColor600,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
