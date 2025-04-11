import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import List from "./components/list";
import { useState, useEffect } from "react";
import AddTodo from "./components/addTodo";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import { database, app, auth } from "./fribaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import { ref, onValue } from "firebase/database";

import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

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

WebBrowser.maybeCompleteAuthSession();

function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "",
    androidClientId:
      "",
    webClientId:
      "",
  });
  console.log(response);
  console.log(request);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("Đăng nhập thành công:", userCredential.user);
        })
        .catch((error) => {
          console.error("Lỗi đăng nhập:", error);
        });
    }
  }, [response]);

  const [data, setData] = useState(null);

  useEffect(() => {
    const starCountRef = ref(database, "products/");
    onValue(starCountRef, (snapshot) => {
      let db = snapshot.val();
      setData(db);
    });
  }, []);

  console.log(data);

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

    // let result = await ImagePicker.launchImageLibraryAsync();
    // console.log(result);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        "abc@gmail.com",
        "123456"
      );
      console.log(result.user);
    } catch (err) {
      console.error(err.message);
    }
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

      <Button title="Sign in with Google" onPress={() => promptAsync()} />
      <Button onPress={handlePress} title="login" />
      <Button onPress={playMusic} title="Phát Nhạc" />
      <Button onPress={stopMusic} title="Dừng Phát Nhạc" />
    </GestureHandlerRootView>
  );
}

export default App;
