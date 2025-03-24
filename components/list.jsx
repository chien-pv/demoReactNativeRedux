import { FlatList, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fechTodo } from "../redux/actionThunk";
import { useGetTodosQuery } from "../redux/createAPI";

import Item from "./item";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
});
function List() {
  const { data, error, isLoading } = useGetTodosQuery();
  console.log(isLoading);
  console.log(data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fechTodo());
  }, []);
  let datas = useSelector((state) => state.todos);
  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={({ item }) => <Item item={item} />} />
    </View>
  );
}
export default List;
