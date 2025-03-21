import { loadTodo } from "./sliceTodo";

export function fechTodo() {
  return (dispatch) => {
    fetch("https://67dce415e00db03c40694362.mockapi.io/todos")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(loadTodo(json));
      });
  };
}
