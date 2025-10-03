import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-paper';

interface ScanButtonProps {
  label: string;
  icon: string;
  onPress: () => void;
}

// Rounded CTA used across the content ingestion workflow.
const ScanButton: React.FC<ScanButtonProps> = ({ label, icon, onPress }) => (
  <Button
    mode="contained"
    icon={() => <Icon source={icon} size={24} />}
    style={styles.button}
    contentStyle={styles.content}
    onPress={onPress}
  >
    {label}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    marginVertical: 6,
  },
  content: {
    paddingVertical: 8,
  },
});

export default ScanButton;
