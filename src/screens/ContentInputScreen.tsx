import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Divider, useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import ScanButton from '@components/ScanButton';
import api from '@services/api';
import type { RootStackParamList } from '@navigation/AppNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

// Screen handles camera permission, uploads, and URL input to kick off AI processing.
const ContentInputScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<Navigation>();
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);

  const handleCamera = async () => {
    if (!permission?.granted) {
      const status = await requestPermission();
      if (!status.granted) {
        Alert.alert('Camera permission required');
        return;
      }
    }
    setShowCamera(true);
  };

  const uploadToBackend = async (formData: FormData) => {
    const response = await api.post('/content/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const { contentId } = response.data;
    navigation.navigate('QuizGeneration', { contentId });
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      const asset = result.assets[0];
      const formData = new FormData();
      formData.append('file', {
        uri: asset.uri,
        name: asset.fileName ?? 'scan.jpg',
        type: asset.mimeType ?? 'image/jpeg',
      } as any);
      uploadToBackend(formData);
    }
  };

  const handleDocumentPick = async () => {
    const doc = await DocumentPicker.getDocumentAsync({ type: ['application/pdf', 'text/plain'] });
    if (doc.type === 'success') {
      const formData = new FormData();
      formData.append('file', {
        uri: doc.uri,
        name: doc.name,
        type: doc.mimeType ?? 'application/pdf',
      } as any);
      uploadToBackend(formData);
    }
  };

  const handleUrlSubmit = async (url: string) => {
    const formData = new FormData();
    formData.append('url', url);
    uploadToBackend(formData);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Add Content
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Scan books, upload files, or import videos. Our AI will handle the rest.
      </Text>
      <ScanButton label="Scan with Camera" icon="camera" onPress={handleCamera} />
      <ScanButton label="Upload from Gallery" icon="image" onPress={handleImagePick} />
      <ScanButton label="Upload Document" icon="file-upload" onPress={handleDocumentPick} />
      <ScanButton label="Paste URL" icon="link" onPress={() => handleUrlSubmit('https://example.com/article')} />
      <ScanButton label="Import YouTube" icon="youtube" onPress={() => handleUrlSubmit('https://youtu.be/demo')} />

      {showCamera && (
        <View style={styles.cameraWrapper}>
          <CameraView style={StyleSheet.absoluteFillObject} facing="back">
            <View style={[styles.cameraOverlay, { borderColor: colors.primary }]} />
          </CameraView>
        </View>
      )}

      <Divider style={styles.divider} />
      <Text variant="bodySmall" style={styles.helper}>
        Tip: You can queue multiple uploads and generate quizzes in batches.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  cameraWrapper: {
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 16,
  },
  cameraOverlay: {
    flex: 1,
    borderWidth: 2,
    borderStyle: 'dashed',
    margin: 16,
    borderRadius: 16,
  },
  divider: {
    marginVertical: 24,
  },
  helper: {
    textAlign: 'center',
    color: '#64748B',
  },
});

export default ContentInputScreen;
