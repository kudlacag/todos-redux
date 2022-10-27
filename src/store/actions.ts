import { Action } from "redux";
import { Todo, Store } from "./types";
import { ThunkAction } from "redux-thunk";

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SET_NEWTODO = "SET_NEWTODO";
export const SET_TODOS = "SET_TODOS";

export type ActionTypes =
  | {
      payload: any;
      type: typeof ADD_TODO;
    }
  | { type: typeof SET_TODOS; payload: Todo[] }
  | { type: typeof DELETE_TODO; payload: number }
  | { type: typeof UPDATE_TODO; payload: { id: number; text: string } }
  | { type: typeof TOGGLE_TODO; payload: number }
  | { type: typeof SET_NEWTODO; payload: string };

export const addTodo = () => {
  return { type: ADD_TODO };
};

export const deleteTodo = (id: number): ActionTypes => {
  return { type: DELETE_TODO, payload: id };
};

export const toggleTodo = (id: number): ActionTypes => {
  return { type: TOGGLE_TODO, payload: id };
};

export const setNewTodo = (text: string): ActionTypes => {
  return { type: SET_NEWTODO, payload: text };
};

export const setTodos = (todos: Todo[]): ActionTypes => {
  return {
    type: SET_TODOS,
    payload: todos,
  };
};
export const updateTodo = (id: number, text: string): ActionTypes => {
  return { type: UPDATE_TODO, payload: { id, text } };
};

export const getTodos =
  (url: string): ThunkAction<void, Store, unknown, Action<String>> =>
  async (dispatch) => {
    const resp = await fetch(url);
    const todos: Todo[] = await resp.json();
    dispatch(setTodos(todos));
  };
