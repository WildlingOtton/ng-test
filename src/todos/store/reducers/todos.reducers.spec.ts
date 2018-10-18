import * as todosReducers from '@todos/store/reducers/todos.reducers';
import * as todosActions from '@todos/store/actions/todos.actions';
import { Todo } from '@todos/models/todo';

describe('TodosReducer', () => {
  describe('undefined action', () => {
    const { initialState } = todosReducers;
    const action = {} as any;
    const state = todosReducers.todosReducer(undefined, action);

    test('should return the default state', () => {
      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_TODOS actions', () => {
    const { initialState } = todosReducers;
    const action = new todosActions.LoadTodos();
    const state = todosReducers.todosReducer(initialState, action);

    test('should return the initialState', () => {
      expect(state).toEqual({
        todos: []
      });
    });
  });

  describe('LOAD_TODOS_SUCCESS action', () => {
    test('should return array of todos', () => {
      const todos: Todo[] = [
        { id: 1, description: 'Todo #1', completed: false },
        { id: 2, description: 'Todo #2', completed: true }
      ];

      const { initialState } = todosReducers;
      const action = new todosActions.LoadTodosSuccess(todos);
      const state = todosReducers.todosReducer(initialState, action);

      expect(state.todos).toEqual(todos);
    });
  });

  describe('LOAD_SUCCESS_FAIL', () => {
    test('should return return the initial state', () => {
      const { initialState } = todosReducers;
      const action = new todosActions.LoadTodosFail({});
      const state = todosReducers.todosReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });
});
