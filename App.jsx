import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import List from "./components/list";
import { useState } from "react";
import AddTodo from "./components/addTodo";
import { Provider } from "react-redux";
import store from "./redux/store";
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

  // let width = useSharedValue(100);
  let translateX = useSharedValue(0);
  const handlePress = () => {
    // width.value = withSpring(width.value + 50);
    translateX.value += 50;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? "#FFE04B" : "#B58DF1",
    transform: [{ translateX: withSpring(translateX.value * 2) }],
  }));

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
            animatedStyles,
          ]}
        />
      </GestureDetector>
      <Button onPress={handlePress} title="Click me" />
    </GestureHandlerRootView>
  );
}

export default App;
