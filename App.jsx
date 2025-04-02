import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import List from "./components/list";
import { useState } from "react";
import AddTodo from "./components/addTodo";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";

import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
function App() {
  const pressed = useSharedValue(false);

  let [music, setMusic] = useState(null);
  // let width = useSharedValue(100);
  let translateX = useSharedValue(0);
  const playMusic = async () => {
    // OR
    const { sound } = await Audio.Sound.createAsync({
      uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    });

    await sound.playAsync();
    setMusic(sound);
  };
  const stopMusic = async () => {
    await music.stopAsync();
  };
  const handlePress = async () => {
    // let result = await ImagePicker.launchCameraAsync({
    //   allowsEditing: true,
    // });

    let result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);
  };

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={tap}>
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              backgroundColor: "violet",
            },
          ]}
        />
      </GestureDetector>
      <Button onPress={handlePress} title="Chụp Hình" />
      <Button onPress={playMusic} title="Phát Nhạc" />
      <Button onPress={stopMusic} title="Dừng Phát Nhạc" />
    </GestureHandlerRootView>
  );
}

export default App;
