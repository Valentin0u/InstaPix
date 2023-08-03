import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useDispatch } from 'react-redux';
import { addPhoto } from '../reducers/user';
import React, { useState, useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SnapScreen() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.4 });
    dispatch(addPhoto(photo.uri));
  };

  return (
    <Camera
      style={styles.container}
      type={type}
      flashMode={flashMode}
      ref={(ref) => (cameraRef = ref)}
    >
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
        >
          <FontAwesome name="rotate-right" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setFlashMode(
              flashMode === FlashMode.off ? FlashMode.on : FlashMode.off
            )
          }
        >
          <FontAwesome
            name="flash"
            size={25}
            color={flashMode === FlashMode.on ? '#e8be4b' : '#fff'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => takePicture()}>
          <FontAwesome name="circle-thin" size={80} color="#fff" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(82,28,194,0.61)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
});


