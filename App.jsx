import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import List from "./components/list";
import { useState } from "react";
import AddTodo from "./components/addTodo";
import { Provider } from "react-redux";
import store from "./redux/store";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

function App() {
  let width = useSharedValue(100);
  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: "violet",
        }}
      />
      <Button onPress={handlePress} title="Click me" />
    </View>
  );
}

export default App;
