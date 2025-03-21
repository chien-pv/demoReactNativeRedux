import { createSlice } from "@reduxjs/toolkit";

let list = [
  {
    key: "Học JS Redux",
  },
  {
    key: "Học TS",
  },
  {
    key: "Học React",
  },
];

const todoSlice = createSlice({
  name: "todos",
  initialState: list,
  reducers: {
    loadTodo(state, action) {
      console.log("..... reducer");
      console.log(action.payload);
      return action.payload;
    },
    addTodo(state, action) {
      let todo = { key: action.payload };
      state.push(todo);
    },
  },
});

export const { addTodo, loadTodo } = todoSlice.actions;
const todoReducer = todoSlice.reducer;
export default todoReducer;
