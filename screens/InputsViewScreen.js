import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  Button,
  Switch,
  Animated,
  Modal,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ImageBackground,
  InputAccessoryView,
  ActionSheetIOS,
  Alert,
  Linking,
  View,
  StyleSheet,
} from 'react-native';

export default function InputsViewScreen() {
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputAccessoryViewID = 'uniqueID';

  const startFadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Option 1'],
        cancelButtonIndex: 0,
      },
      index => {
        if (index === 1) Alert.alert('You picked Option 1');
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Inputs & Other Components</Text>

          <ImageBackground
            source={{ uri: 'https://placekitten.com/300/200' }}
            style={styles.imageBackground}>
            <Text style={styles.imageText}>Image Background</Text>
          </ImageBackground>

          <Image
            source={{ uri: 'https://placekitten.com/100/100' }}
            style={styles.image}
          />

          <Animated.View style={[styles.animatedBox, { opacity: fadeAnim }]}>
            <Text>Fading In</Text>
          </Animated.View>
          <Button title="Start Fade In" onPress={startFadeIn} />

          <Switch value={switchEnabled} onValueChange={setSwitchEnabled} />

          <TextInput
            style={styles.input}
            placeholder="Type here"
            value={text}
            onChangeText={setText}
            inputAccessoryViewID={inputAccessoryViewID}
          />
          <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View style={styles.accessory}>
              <Button title="Clear" onPress={() => setText('')} />
            </View>
          </InputAccessoryView>

          <Button title="Show Modal" onPress={() => setModalVisible(true)} />
          <Modal visible={modalVisible} animationType="slide">
            <View style={styles.modalView}>
              <Text>This is a Modal</Text>
              <Button title="Close Modal" onPress={() => setModalVisible(false)} />
            </View>
          </Modal>

          <Pressable onPress={() => Linking.openURL('https://reactnative.dev')}>
            <Text style={styles.linkText}>Open React Native Website</Text>
          </Pressable>

          <TouchableOpacity onPress={showActionSheet} style={styles.touchable}>
            <Text>Show Action Sheet</Text>
          </TouchableOpacity>

          <TouchableHighlight
            underlayColor="#ddd"
            onPress={() => Alert.alert('Touchable Highlight pressed')}>
            <View style={styles.touchable}>
              <Text>Touchable Highlight</Text>
            </View>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  image: { width: 100, height: 100, marginVertical: 10 },
  imageBackground: { width: '100%', height: 150, justifyContent: 'center' },
  imageText: { color: 'white', fontSize: 18, textAlign: 'center' },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 },
  animatedBox: { backgroundColor: '#ddd', padding: 10, marginVertical: 10 },
  linkText: { color: 'blue', marginVertical: 10 },
  touchable: { padding: 10, backgroundColor: '#eee', marginVertical: 5 },
  modalView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  accessory: { backgroundColor: '#eee', padding: 5 },
});
